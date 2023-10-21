// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
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
});
