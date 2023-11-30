import type { Theme, ThemeOptions } from "@formkit/theme-creator";
/**
 * This is a public manifest of themes that can be used with FormKit. To get
 * your theme on this list, please submit a PR to:
 *
 * @link https://github.com/formkit/theme.formkit.com
 */
export const themeManifest: Record<
  string,
  () => Promise<{ default: Theme<ThemeOptions> }>
> = {
  regenesis: () => import("@formkit/theme-regenesis"),
  starter: () => import("@formkit/theme-starter"),
};
