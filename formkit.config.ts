import { defineFormKitConfig } from "@formkit/vue";
import { genesisIcons } from "@formkit/icons";
import { createProPlugin, inputs } from "@formkit-enterprise/pro";
import { rootClasses } from "@formkit/theme-creator";
import theme from "@formkit/theme-regenesis";

export default defineFormKitConfig(() => {
  const pro = createProPlugin(useRuntimeConfig().public.formkitProKey, inputs);

  return {
    plugins: [pro],
    icons: genesisIcons,
    config: {
      rootClasses: rootClasses(theme().tailwind()),
    },
  };
});
