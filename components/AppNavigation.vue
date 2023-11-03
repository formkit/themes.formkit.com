<script setup lang="ts">
const route = useRoute();

const navItems = [
  {
    name: "Themes",
    path: "/",
  },
  {
    name: "Editor",
    path: "/editor",
  },
  // {
  //   name: "Gallery",
  //   subtext: "(Coming Soon)",
  //   path: "/gallery",
  //   disabled: true,
  // },
  {
    name: "Documentation",
    path: "https://formkit.com/essentials/styling",
    target: "_blank",
    icon: "external",
  },
];
</script>

<template>
  <ul class="flex">
    <li
      v-for="item in navItems"
      :key="item.path"
      :data-disabled="item.disabled"
      class="mx-0.5 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed"
    >
      <NuxtLink
        :to="item.path"
        :data-active="route.path === item.path || undefined"
        :target="item.target"
        class="flex items-center px-2 py-1 text-sm rounded data-[active]:bg-neutral-900 data-[active]:text-neutral-100 hover:underline data-[active]:hover:no-underline dark:data-[active]:bg-neutral-100 dark:data-[active]:text-neutral-900 transition-colors duration-150 dark:text-neutral-100"
      >
        {{ item.name }}
        <span
          v-if="item.subtext"
          class="text-xs ml-1 text-neutral-500 dark:text-neutral-200"
          >{{ item.subtext }}</span
        >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          size="inherit"
          class="ml-1.5"
        />
      </NuxtLink>
    </li>
  </ul>
</template>
