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
  // TW4 themes (default)
  regenesis: () => import("@formkit/theme-regenesis"),
  starter: () => import("@formkit/theme-starter"),
  // TW3 themes (legacy)
  "regenesis-tw3": () => import("@formkit/theme-regenesis-tw3"),
  "starter-tw3": () => import("@formkit/theme-starter-tw3"),
};

/**
 * Base theme names (without TW version suffix) for UI display.
 * Use this to list themes in the UI without showing TW3 variants separately.
 */
export const baseThemes = ["regenesis", "starter"] as const;

/**
 * Get the TW3 variant name for a base theme.
 */
export function getTw3ThemeName(baseTheme: string): string {
  return `${baseTheme}-tw3`;
}
