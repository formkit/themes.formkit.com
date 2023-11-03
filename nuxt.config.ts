// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://cdn.tailwindcss.com",
          id: "formkit-tailwind-script",
        },
        {
          innerHTML: `
          tailwind.config = {
            darkMode: 'class',
          }
          `,
        },
      ],
    },
  },
  devtools: { enabled: false },
  modules: ["@formkit/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      formkitProKey: process.env.FORMKIT_PRO_KEY,
    },
  },
  nitro: {
    storage: {
      kv: {
        driver: process.env.KV_DRIVER,
        accountId: process.env.KV_ACCOUNT_ID,
        namespaceId: process.env.KV_NAMESPACE_ID,
        apiToken: process.env.KV_API_TOKEN,
      },
    },
  },
  colorMode: {
    classSuffix: "",
  },
});
