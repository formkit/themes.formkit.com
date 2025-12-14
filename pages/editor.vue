<script lang="ts" setup>
import { slugify } from "@formkit/utils";
import { configSymbol } from "@formkit/vue";
import { themeManifest, baseThemes } from "~/src/manifest";
import { rootClasses } from "@formkit/theme-creator";

// Create a filtered manifest with only base themes (no TW3 variants) for UI display
const displayThemes = Object.fromEntries(
  baseThemes.map((name) => [name, themeManifest[name]])
) as typeof themeManifest;

const config = inject(configSymbol);

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const themeName = slugify(
    (route.query.theme as string | undefined) ||
      (typeof window !== "undefined" && __FORMKIT_THEME__?.meta?.name) ||
      "regenesis"
  );
  document.addEventListener("formkit-theme-update", ((e: CustomEvent) => {
    const { variables, theme } = e.detail;
    let vars = "";
    let i = 0;
    for (const variable in variables) {
      vars += `${i++ ? "," : ""}${variable}=${variables[variable]}`;
    }
    router.replace({
      query: {
        ...route.query,
        theme: slugify(theme.meta.name),
        variables: vars,
      },
    });
  }) as EventListener);

  if (typeof themeName === "string" && themeName in themeManifest && config) {
    window.__FORMKIT_AVAILABLE_THEMES__ = displayThemes;

    if (!customElements.get("formkit-theme-editor")) {
      const { createEditor } = await import("@formkit/theme-editor");
      const theme = await themeManifest[
        themeName as keyof typeof themeManifest
      ]();
      const variables = (route.query.variables as string) ?? "";
      config.rootClasses = rootClasses(
        theme.default(parseVariables(variables)).tailwind()
      );
      if (!document.getElementById("formkit-theme-editor")) {
        createEditor();
      }
    }

    document.dispatchEvent(
      new CustomEvent("formkit-available-themes", {
        detail: {
          themes: displayThemes,
        },
      })
    );

    const editor = document.getElementById("formkit-theme-editor");
    if (editor) {
      editor.classList.remove("hidden");
    }
  }
});

onBeforeRouteLeave((to, from, next) => {
  if (document.getElementById("formkit-theme-editor")) {
    const editor = document.getElementById("formkit-theme-editor");
    if (editor) {
      editor.classList.add("hidden");
    }
  }
  next();
});
</script>

<template>
  <ClientOnly>
    <FormKitKitchenSink />
  </ClientOnly>
</template>
