<script lang="ts" setup></script>

<template>
  <div class="pl-20 flex">
    <div class="flex flex-col py-20 w-[50%] shrink-0">
      <div class="my-auto">
        <div class="pr-8 mb-20 max-w-[620px]">
          <h1
            class="text-6xl mb-5 font-bold text-neutral-900 dark:text-neutral-100"
          >
            Your forms, your look.
          </h1>
          <p class="text-lg max-w-[80%] text-neutral-900 dark:text-neutral-100">
            Versatile, configurable, MIT-licensed themes for use in your
            projects. Spend less time styling — more time building.
          </p>

          <code
            class="inline-block bg-neutral-900 text-neutral-100 text-sm px-4 py-2 rounded mt-6 whitespace-nowrap dark:bg-neutral-800"
          >
            npx formkit theme --theme=regenesis
          </code>

          <div class="mt-8">
            <NuxtLink
              to="/editor"
              class="inline-flex items-center px-4 py-3 bg-transparent text-neutral-900 border border-neutral-900 rounded hover:bg-neutral-100 transition-colors duration-150 dark:text-neutral-100 dark:border-neutral-100 dark:hover:bg-neutral-800"
              >Customize <Icon class="ml-2" icon="submit"
            /></NuxtLink>
          </div>
        </div>

        <div
          class="theme-selector max-w-[620px] flex flex-wrap -mb-8 text-neutral-900 dark:text-neutral-100"
        >
          <div class="w-40 mr-3 mb-8">
            <div
              class="w-full mb-3 h-1 bg-neutral-600 rounded-full dark:bg-neutral-300"
            ></div>
            <h2 class="text-sm font-bold">Regenesis</h2>
            <p class="text-xs">
              A highly customizable take on the classic FormKit Genesis theme.
            </p>
          </div>
          <div class="w-40 mr-3 mb-8">
            <div
              class="w-full mb-3 h-1 bg-neutral-200 rounded-full dark:bg-neutral-600"
            ></div>
            <h2 class="text-sm font-bold">Starter</h2>
            <p class="text-xs">
              A bare-bones theme for authors looking to create their own look.
            </p>
          </div>
          <div class="w-40 mr-3 mb-8">
            <div
              class="w-full mb-3 h-1 bg-neutral-200 rounded-full dark:bg-neutral-600"
            ></div>
            <h2 class="text-sm font-bold">
              Casper
              <span class="text-xs font-normal text-neutral-400"
                >(coming soon)</span
              >
            </h2>
            <p class="text-xs">
              A friendly, clean, low-contrast theme with transparency effects.
            </p>
          </div>
          <div class="w-40 mr-3 mb-8">
            <div
              class="w-full mb-3 h-1 bg-neutral-200 rounded-full dark:bg-neutral-600"
            ></div>
            <h2 class="text-sm font-bold">
              Materially
              <span class="text-xs font-normal text-neutral-400"
                >(coming soon)</span
              >
            </h2>
            <p class="text-xs">
              A theme that feels at home inside of a Material Design
              application.
            </p>
          </div>
          <div class="w-40 mr-3 mb-8">
            <div
              class="w-full mb-3 h-1 bg-neutral-200 rounded-full dark:bg-neutral-600"
            ></div>
            <h2 class="text-sm font-bold">
              Bitwise
              <span class="text-xs font-normal text-neutral-400"
                >(coming soon)</span
              >
            </h2>
            <p class="text-xs">
              A low-res pixel theme for the smallest of interfaces.
            </p>
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
