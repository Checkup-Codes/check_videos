<template>
  <button
    class="fixed top-1/2 z-50 h-8 w-8 -translate-y-1/2 transform items-center rounded-full bg-black pb-0.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600 hover:shadow-xl"
    @click="toggle"
    :class="[isCollapsed ? 'left-[611px]' : 'left-[211px]']"
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

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
