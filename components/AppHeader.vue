<script setup lang="ts"></script>

<template>
  <header
    class="fixed top-0 w-full z-50 px-6 py-4 pt-32 -mt-28 flex items-center justify-between border-b border-white/50 bg-white/70 backdrop-blur-sm"
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
        class="text-gray-500 hover:text-gray-600"
      >
        <Icon icon="brands/github" />
      </a>
    </div>
  </header>
</template>
