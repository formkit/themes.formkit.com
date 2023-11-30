<script lang="ts" setup>
import { slugify } from "@formkit/utils";
import { FormKitKitchenSink, configSymbol } from "@formkit/vue";
import { themeManifest } from "~/src/manifest";
import { rootClasses } from "@formkit/theme-creator";

const activeTab = ref("kitchenSink");
const tabs = [
  {
    id: "kitchenSink",
    label: "Kitchen Sink",
  },
  {
    id: "login",
    label: "Login Form",
  },
  {
    id: "tshirt",
    label: "Order Form",
  },
  {
    id: "survey",
    label: "Survey Form",
  },
  {
    id: "registration",
    label: "Registration Form",
  },
  {
    id: "application",
    label: "Application Form",
  },
];
const config = inject(configSymbol);

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const themeName = route.query.theme || "regenesis";
  document.addEventListener("formkit-theme-update", ((e: CustomEvent) => {
    const { variables, theme } = e.detail;
    let vars = "";
    let i = 0;
    for (const variable in variables) {
      vars += `${i++ ? "," : ""}${variable}=${variables[variable]}`;
    }
    router.replace({
      query: {
        ...route.query,
        theme: slugify(theme.meta.name),
        variables: vars,
      },
    });
  }) as EventListener);

  if (typeof themeName === "string" && themeName in themeManifest && config) {
    window.__FORMKIT_AVAILABLE_THEMES__ = themeManifest;

    if (!customElements.get("formkit-theme-editor")) {
      const { createEditor } = await import("@formkit/theme-editor");
      const theme = await themeManifest[
        themeName as keyof typeof themeManifest
      ]();
      const variables = (route.query.variables as string) ?? "";
      config.rootClasses = rootClasses(
        theme.default(parseVariables(variables)).tailwind()
      );
      if (!document.getElementById("formkit-theme-editor")) {
        createEditor();
      }
    }

    document.dispatchEvent(
      new CustomEvent("formkit-available-themes", {
        detail: {
          themes: themeManifest,
        },
      })
    );

    const editor = document.getElementById("formkit-theme-editor");
    if (editor) {
      editor.classList.remove("hidden");
    }
  }
});

onBeforeRouteLeave((to, from, next) => {
  if (document.getElementById("formkit-theme-editor")) {
    const editor = document.getElementById("formkit-theme-editor");
    if (editor) {
      editor.classList.add("hidden");
    }
  }
  next();
});
</script>

<template>
  <div>
    <div class="tab-navigation mt-20 -mb-5 flex px-8">
      <div v-for="tab in tabs">
        <button
          :key="tab.id"
          :data-active="activeTab === tab.id || undefined"
          :class="`
            inline-flex
            items-center
            px-4
            py-3
            bg-transparent
            text-neutral-900
            border
            border-neutral-900
            data-[active]:bg-neutral-900
            data-[active]:text-neutral-100
            rounded
            hover:bg-neutral-100
            transition-colors
            duration-150
            mr-2
            mb-2
            dark:text-neutral-100
            dark:border-neutral-800
            dark:hover:bg-neutral-800
            dark:data-[active]:bg-neutral-100
            dark:data-[active]:text-neutral-900
          `"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'login'">
      <ClientOnly>
        <FormKitKitchenSink :schemas="['form/login']" />
      </ClientOnly>
    </div>

    <div v-if="activeTab === 'tshirt'">
      <ClientOnly>
        <FormKitKitchenSink :schemas="['form/tshirt']" />
      </ClientOnly>
    </div>

    <div v-if="activeTab === 'survey'">
      <ClientOnly>
        <FormKitKitchenSink :schemas="['form/survey']" />
      </ClientOnly>
    </div>

    <div v-if="activeTab === 'registration'">
      <ClientOnly>
        <FormKitKitchenSink :schemas="['form/registration']" />
      </ClientOnly>
    </div>

    <div v-if="activeTab === 'application'">
      <ClientOnly>
        <FormKitKitchenSink :schemas="['form/application']" />
      </ClientOnly>
    </div>

    <div v-if="activeTab === 'kitchenSink'">
      <ClientOnly>
        <FormKitKitchenSink
          :schemas="[
            'autocomplete',
            'button',
            'checkbox',
            'color',
            'colorpicker',
            'date',
            'datepicker',
            'datetime-local',
            'dropdown',
            'email',
            'file',
            'mask',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'rating',
            'repeater',
            'search',
            'select',
            'slider',
            'submit',
            'taglist',
            'telephone',
            'text',
            'textarea',
            'time',
            'toggle',
            'togglebuttons',
            'transferlist',
            'url',
            'week',
            'barcode',
            'multi-step',
          ]"
        />
      </ClientOnly>
    </div>
  </div>
</template>
