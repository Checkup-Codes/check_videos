<template>
  <div ref="containerRef" :class="[infoClass, 'subsidebarscreen-container']">
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: '',
  },
});

const containerRef = ref(null);

// Expose container ref for parent components to access scroll
defineExpose({
  $el: containerRef,
});
</script>

<style>
/* SubSidebarScreen is the scroll container */
.subsidebarscreen-container {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

/* Slot content should not have its own scroll */
.subsidebarscreen-container > * {
  flex-shrink: 0;
}
</style>
