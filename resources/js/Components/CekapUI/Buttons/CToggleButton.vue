<template>
  <button
    class="top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 transform items-center rounded-full bg-black pb-0.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600 hover:shadow-xl lg:absolute lg:block"
    @click="toggle"
    :class="[isCollapsed ? 'left-52' : '-right-4']"
  >
    <span class="items-center text-xl"> &#8660;</span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isCollapsed: Boolean,
  toggle: Function,
});
</script>
