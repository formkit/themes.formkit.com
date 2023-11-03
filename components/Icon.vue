<script setup lang="ts">
import { FormKitIcon } from "@formkit/vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "base",
  },
});

const computedSize = computed(() => {
  switch (props.size) {
    case "inherit":
      return "[&>svg]:block [&>svg]:w-[0.75em] [&>svg]:h-[0.75em]";
    case "xs":
      return "[&>svg]:block [&>svg]:w-3 [&>svg]:h-3";
    case "sm":
      return "[&>svg]:block [&>svg]:w-4 [&>svg]:h-4";
    case "base":
      return "[&>svg]:block [&>svg]:w-5 [&>svg]:h-5";
    case "lg":
      return "[&>svg]:block [&>svg]:w-6 [&>svg]:h-6";
    case "xl":
      return "[&>svg]:block [&>svg]:w-8 [&>svg]:h-8";
    default:
      return "[&>svg]:block [&>svg]:w-5 [&>svg]:h-5";
  }
});
</script>

<template>
  <FormKitIcon :icon="icon" :class="computedSize" />
</template>
