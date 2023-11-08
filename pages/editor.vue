<script lang="ts" setup>
import { slugify } from "@formkit/utils";
import { FormKitKitchenSink, configSymbol } from "@formkit/vue";
import { themeManifest } from "~/src/manifest";
import { rootClasses } from "@formkit/theme-creator";

const config = inject(configSymbol);

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const themeName = route.query.theme || "regenesis";
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
    window.__FORMKIT_AVAILABLE_THEMES__ = themeManifest

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

    document.dispatchEvent(new CustomEvent('formkit-available-themes', { detail: {
      themes: themeManifest
    }}))

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
  <div>
    <ClientOnly>
      <FormKitKitchenSink :schemas="['form/login']" />
      <FormKitKitchenSink :schemas="['form/tshirt']" />
      <FormKitKitchenSink :schemas="['form/survey']" />
      <FormKitKitchenSink :schemas="['form/registration']" />
      <FormKitKitchenSink :schemas="['form/application']" />
      <FormKitKitchenSink :pro="true" />
    </ClientOnly>
  </div>
</template>
