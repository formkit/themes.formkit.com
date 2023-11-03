<script setup lang="ts"></script>

<template>
  <header
    class="fixed top-0 w-full z-50 px-6 py-4 pt-32 -mt-28 flex items-center justify-between border-b border-neutral-100/80 bg-white/70 backdrop-blur-sm dark:bg-neutral-900/70 dark:border-neutral-900/80"
  >
    <NuxtLink to="/">
      <FormKitLogo />
    </NuxtLink>
    <AppNavigation />

    <div class="secondary-nav">
      <a
        href="https://github.com/formkit/formkit"
        target="_blank"
        rel="noopener noreferrer"
        class="text-neutral-500 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-200 transition-colors duration-150"
      >
        <Icon icon="github" />
      </a>
    </div>
  </header>
</template>
