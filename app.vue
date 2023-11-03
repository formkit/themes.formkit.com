<script setup lang="ts">
const router = useRouter();
const isHome = computed(
  () => router.currentRoute.value.path === "/" || undefined
);
</script>

<template>
  <div :data-is-home="isHome" class="min-h-[100dvh] flex flex-col">
    <AppHeader />
    <NuxtPage class="grow" />
  </div>
</template>

<style>
[data-is-home]:before {
  content: "";
  position: fixed;
  z-index: -1;
  inset: 0;
  min-height: 100dvh;
  background: url("/bg.svg") no-repeat center center fixed;
  background-size: cover;
}
</style>
