<script setup lang="ts"></script>

<template>
  <div
    class="fixed top-0 right-0 flex flex-nowrap overflow-visible w-[calc(85%-420px)] h-full shrink-0 z-[0]"
  >
    <div class="demo-container flex flex-nowrap">
      <div class="scroller-column mr-5 w-[400px] shrink-0">
        <div
          v-for="i in 50"
          class="input-wrapper mb-4 bg-white border border-gray-200 p-5 rounded-xl"
        >
          <FormKit
            type="text"
            label="Your Name"
            help="Please enter your full name"
            placeholder="John Doe"
          />
        </div>
      </div>
      <div class="scroller-column mr-5 w-[400px] shrink-0">
        <div
          v-for="i in 50"
          class="input-wrapper mb-4 bg-white border border-gray-200 p-5 rounded-xl"
        >
          <FormKit
            type="text"
            label="Your Name"
            help="Please enter your full name"
            placeholder="John Doe"
          />
        </div>
      </div>
      <div class="scroller-column w-[400px] shrink-0">
        <div
          v-for="i in 50"
          class="input-wrapper mb-4 bg-white border border-gray-200 p-5 rounded-xl"
        >
          <FormKit
            type="text"
            label="Your Name"
            help="Please enter your full name"
            placeholder="John Doe"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  transform: perspective(2000px) skewX(-5deg) rotateY(-8deg) rotateX(10deg);
}
</style>
