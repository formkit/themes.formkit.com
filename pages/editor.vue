<script lang="ts" setup>
import type { Theme, ThemeOptions } from "@formkit/theme-creator"
import { rootClasses } from "@formkit/theme-creator"
import { slugify } from "@formkit/utils"
import { FormKitProvider, defaultConfig, FormKitKitchenSink } from '@formkit/vue';
import { genesisIcons } from '@formkit/icons';
import { createProPlugin, inputs } from "@formkit-enterprise/pro";
import { themeManifest } from '~/src/manifest';

const config = ref()
onMounted(async () => {
  const route = useRoute()
  const router = useRouter()
  const themeName = route.query.theme || 'regenesis'
  const variables = parseVariables(route.query.variables as string || '')
  const t = themeName
  const pro = createProPlugin(useRuntimeConfig().public.formkitProKey, inputs);
  document.addEventListener('formkit-theme-update', ((e: CustomEvent) => {
    const { variables, theme } = e.detail
    let vars = ''
    let i = 0;
    for (const variable in variables) {
      vars += `${i++ ? ',' : ''}${variable}=${variables[variable]}`
    }
    router.replace({
      query: {
        ...route.query,
        theme: slugify(theme.meta.name),
        variables: vars
      }
    })
  }) as EventListener)
  if (typeof t === 'string' && t in themeManifest) {
    const theme = await themeManifest[t as keyof typeof themeManifest]()
    config.value = defaultConfig({
      plugins: [pro],
      icons: genesisIcons,
      config: {
        rootClasses: rootClasses(theme.default(variables).tailwind()),
      }
    })
    if (!customElements.get('formkit-theme-editor')) {
      const { createEditor } = await import('@formkit/theme-editor')
      createEditor() // create the editor dialog
    }
  }
})
</script>

<template>
  <div>
    <FormKitProvider v-if="config" :config="config">
      <FormKitKitchenSink />
    </FormKitProvider>
  </div>
</template>


<style>

</style>

