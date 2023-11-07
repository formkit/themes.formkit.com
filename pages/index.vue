<script lang="ts" setup>
import { themeManifest } from "~/src/manifest";
import { configSymbol } from "@formkit/vue";
import { rootClasses } from "@formkit/theme-creator";

const config = inject(configSymbol);
const activeTheme = ref("regenesis");

const themes = [
  {
    name: "regenesis",
    title: "Regenesis",
    description:
      "A highly customizable take on the classic FormKit Genesis theme.",
  },
  {
    name: "starter",
    title: "Starter",
    description:
      "A bare-bones theme for authors looking to create their own look.",
  },
  // {
  //   name: 'casper',
  //   title: 'Casper',
  //   description: 'A friendly, clean, low-contrast theme with transparency effects.',
  // },
  // {
  //   name: 'materially',
  //   title: 'Materially',
  //   description: 'A theme that feels at home inside of a Material Design application.',
  // },
  // {
  //   name: 'bitwise',
  //   title: 'Bitwise',
  //   description: 'A low-res pixel theme for the smallest of interfaces.',
  // },
];

const changeTheme = async () => {
  const theme = await themeManifest[
    activeTheme.value as keyof typeof themeManifest
  ]();
  if (!theme || !config) return;
  config.rootClasses = rootClasses(theme.default(parseVariables()).tailwind());
};

watch(activeTheme, changeTheme);
</script>

<template>
  <div class="md:pl-20 md:pr-0 flex flex-wrap">
    <div class="flex flex-col px-5 md:px-0 py-20 w-full md:w-[50%] shrink-0">
      <div class="my-auto">
        <div class="lg:pr-8 mb-20 md:max-w-[620px]">
          <h1
            class="text-6xl mb-5 font-bold text-neutral-900 dark:text-neutral-100"
          >
            Your&nbsp;forms,<br />your&nbsp;look.
          </h1>
          <p
            class="text-lg w-full max-w-[90%] lg:max-w-[80%] text-neutral-900 dark:text-neutral-100"
          >
            Versatile, configurable, MIT-licensed Tailwind themes for use in
            your projects. Spend less time styling — more time building.
          </p>

          <code
            class="inline-block bg-neutral-900 text-neutral-100 text-sm px-4 py-2 rounded mt-6 whitespace-nowrap dark:bg-neutral-800"
          >
            npx formkit theme --theme={{ activeTheme }}
          </code>

          <div class="mt-8">
            <NuxtLink
              :to="`/editor?theme=${activeTheme}`"
              :class="`
                inline-flex
                items-center
                px-4
                py-3
                bg-transparent
                text-neutral-900
                border
                border-neutral-900
                rounded
                hover:bg-neutral-100
                transition-colors
                duration-150
                dark:text-neutral-100
                dark:border-neutral-100
                dark:hover:bg-neutral-800`"
              >Customize <Icon class="ml-2" icon="submit"
            /></NuxtLink>
          </div>
        </div>

        <div
          class="theme-selector cursor-pointer max-w-[620px] flex flex-wrap -mb-8 text-neutral-900 dark:text-neutral-100"
        >
          <div
            v-for="theme in themes"
            @click="activeTheme = theme.name"
            class="w-40 mr-3 mb-8"
          >
            <div
              :data-active="activeTheme === theme.name || undefined"
              class="w-full mb-3 h-1 bg-neutral-200 data-[active]:bg-neutral-600 rounded-full dark:bg-neutral-600 data-[active]:dark:bg-neutral-200"
            ></div>
            <h2 class="text-sm font-bold">{{ theme.title }}</h2>
            <p class="text-xs">{{ theme.description }}</p>
          </div>

          <div class="w-40 mr-3 mb-8">
            <NuxtLink to="https://github.com/formkit/theme-starter">
              <div
                class="border-2 border-dashed p-5 text-xs border-neutral-200 dark:border-neutral-600"
              >
                Create and submit your own theme!
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <FormKitExampleScroller />
  </div>
</template>
