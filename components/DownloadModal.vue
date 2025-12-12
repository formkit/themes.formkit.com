<script lang="ts" setup>
const props = defineProps<{
  themeName: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const tw4Command = computed(() => `npx formkit theme --theme=${props.themeName}`);
const tw3Command = computed(() => `npx formkit theme --theme=${props.themeName}-tw3`);

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit("close");
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Download {{ themeName }}
            </h2>
            <button
              @click="emit('close')"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Tailwind CSS 4 <span class="text-emerald-600 dark:text-emerald-400">(Recommended)</span>
              </h3>
              <div class="flex items-center gap-2">
                <code
                  class="flex-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm px-3 py-2 rounded font-mono overflow-x-auto"
                >
                  {{ tw4Command }}
                </code>
                <button
                  @click="copyToClipboard(tw4Command)"
                  class="shrink-0 p-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <svg class="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Tailwind CSS 3 <span class="text-neutral-500">(Legacy)</span>
              </h3>
              <div class="flex items-center gap-2">
                <code
                  class="flex-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm px-3 py-2 rounded font-mono overflow-x-auto"
                >
                  {{ tw3Command }}
                </code>
                <button
                  @click="copyToClipboard(tw3Command)"
                  class="shrink-0 p-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <svg class="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Not sure? The CLI will auto-detect your Tailwind version.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
