<script lang="ts" setup>
import type { Theme, ThemeOptions } from "@formkit/theme-creator"
import { rootClasses } from "@formkit/theme-creator"
import { FormKitProvider, defaultConfig, FormKitKitchenSink } from '@formkit/vue';
import { genesisIcons } from '@formkit/icons';
import { createProPlugin, inputs } from "@formkit-enterprise/pro";
import { themeManifest } from '~/src/manifest';

const config = ref()
onMounted(async () => {
  const route = useRoute()
  const themeName = route.query.theme || 'regenesis'
  const t = themeName
  const pro = createProPlugin(useRuntimeConfig().public.formkitProKey, inputs);
  if (typeof t === 'string' && t in themeManifest) {
    const theme = await themeManifest[t as keyof typeof themeManifest]()
    config.value = defaultConfig({
      plugins: [pro],
      icons: genesisIcons,
      config: {
        rootClasses: rootClasses(theme.default().tailwind()),
      }
    })
    const { createEditor } = await import('@formkit/theme-editor')
    createEditor()
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

