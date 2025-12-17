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
          src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          id: "formkit-tailwind-script",
        },
      ],
      style: [
        {
          type: "text/tailwindcss",
          innerHTML: `@custom-variant dark (&:where(.dark, .dark *));`,
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
    // Inline aliased TW3 packages - npm aliases don't resolve in serverless
    externals: {
      inline: [
        '@formkit/theme-regenesis-tw3',
        '@formkit/theme-starter-tw3',
      ],
    },
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
