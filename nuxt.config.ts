// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  runtimeConfig: {
    public: {
      formkitProKey: process.env.FORMKIT_PRO_KEY,
    },
  },
});
