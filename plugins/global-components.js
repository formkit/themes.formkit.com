import { defineNuxtPlugin } from "nuxt/app";
import { FormKitKitchenSink, FormKitSummary } from "@formkit/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FormKitKitchenSink", FormKitKitchenSink);
  nuxtApp.vueApp.component("FormKitSummary", FormKitSummary);
});
