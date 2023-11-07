<script setup lang="ts">
const darkMode = ref(false);
const showToggle = ref(false);
const route = useRoute();

watch(darkMode, () => {
  if (darkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

watch(
  () => route.path,
  () => {
    showToggle.value = route.path === "/";
    if (typeof window === "undefined") return;
    darkMode.value = document.documentElement.classList.contains("dark");
  },
  { immediate: true }
);
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 px-6 py-4 pt-32 -mt-28 flex items-center justify-between border-b border-neutral-100/80 bg-white/70 backdrop-blur-sm dark:bg-neutral-900/70 dark:border-neutral-900/80"
  >
    <NuxtLink to="/">
      <FormKitLogo />
    </NuxtLink>
    <AppNavigation />

    <div class="secondary-nav flex items-center">
      <a
        href="https://github.com/formkit/formkit"
        target="_blank"
        rel="noopener noreferrer"
        class="text-neutral-500 mr-2 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-200 transition-colors duration-150"
      >
        <Icon icon="github" />
      </a>
      <button
        v-if="showToggle"
        type="button"
        class="text-neutral-500 p-1.5 rounded border border-neutral-300 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-200 dark:border-neutral-600 transition-colors duration-150"
        aria-label="Toggle dark mode"
        @click="darkMode = !darkMode"
      >
        <Icon :icon="darkMode ? 'moon' : 'sun'" size="sm" />
      </button>
    </div>
  </header>
</template>
