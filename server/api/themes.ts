import { themeManifest } from "~/src/manifest";
export default defineEventHandler(async (event) => {
  const themes = Object.keys(themeManifest) as (keyof typeof themeManifest)[];
  const data = await Promise.all(
    themes.map(async (themeName) => {
      const theme = await themeManifest[themeName]();
      return { slug: themeName, ...theme.default.meta };
    })
  );
  return data;
});
