// https://nuxt.com/docs/api/configuration/nuxt-config

const meta = {
  title: "FormKit Themes",
  description:
    "Versatile, configurable, MIT-licensed Tailwind themes for use in your projects. Spend less time styling — more time building.",
};

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: meta.description,
        },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "og:description",
          content: meta.description,
        },
        {
          name: "og:site_name",
          content: "FormKit Themes",
        },
        {
          name: "og:title",
          content: meta.title,
        },
        {
          name: "og:image",
          content: "https://themes.formkit.com/og.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:image",
          content: "https://themes.formkit.com/og.png",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "FormKit Themes",
        },
      ],
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
