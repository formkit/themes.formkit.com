import { object, string, parse, enumType, optional, Output } from "valibot";
import { generate } from "@formkit/cli";
import { themeManifest } from "~/src/manifest";
import { parseVariables } from "~/utils/parseVariables";
import type { Theme, ThemeOptions } from "@formkit/theme-creator";

const ThemeRequest = object({
  theme: string(),
  variables: optional(string()),
  ts: optional(enumType(["true", "false"])),
  semantic: optional(enumType(["true", "false"])),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const themeRequest = parse(ThemeRequest, body);
  const themeName = themeRequest.theme as keyof typeof themeManifest;

  if (!(themeName in themeManifest)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Theme was not found`,
    });
  }

  const themeResolver = themeManifest[themeName];
  const { default: theme } = await themeResolver();
  const isTS = themeRequest.ts === "false" ? false : true;
  const isSemantic = themeRequest.semantic === "true" ? true : false;
  await themeAnalytics(themeRequest, theme);
  setHeader(event, "Content-Type", "application/js");
  return generate(theme, themeRequest.variables, isTS, isSemantic);
});

async function themeAnalytics(
  themeRequest: Output<typeof ThemeRequest>,
  theme: Theme<ThemeOptions>
) {
  const analytics =
    ((await useStorage("kv").getItem(themeRequest.theme)) as
      | Record<string, number>
      | undefined) ?? {};
  const vars = parseVariables(themeRequest.variables ?? "");
  const definedVars = theme(vars).editorControls();
  // Increment analytics for each variable — this data is collected anonymously
  // and is used to determine which variables are most commonly used to help
  // determine which variables should be included in the theme generator UI.
  Object.keys(definedVars).forEach((varName) => {
    const value = definedVars[varName].value;
    const key = `var:${varName}:${value}`;
    const count = analytics[key] ?? 0;
    analytics[key] = count + 1;
  });

  analytics.total = (analytics.total ?? 0) + 1;
  await useStorage("kv").setItem(themeRequest.theme, JSON.stringify(analytics));
}
