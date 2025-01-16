<template>
  <button
    class="top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 transform items-center rounded-full border-2 bg-white pb-0.5 text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl lg:absolute lg:block"
    @click="toggle"
    :class="[isCollapsed ? 'left-52' : '-right-4']"
  >
    <span class="items-center text-xl"> &#8660;</span>
  </button>
</template>

<script setup>
const props = defineProps({
  isCollapsed: Boolean,
  toggle: Function,
});
</script>
