<template>
  <button
    class="top-1/2 z-50 hidden h-8 w-8 translate-y-1/2 transform items-center rounded-full border-2 bg-base-300 text-base-content shadow-lg lg:absolute lg:block"
    @click="toggle"
    :class="[isCollapsed ? 'lg:left-60 xl:left-[270px]' : 'lg:right-[calc(100%-41rem)] xl:right-[calc(100%-43rem)]']"
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
