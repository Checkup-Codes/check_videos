<template>
  <div class="keyboard-shortcut-disabler">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Keyboard keys to disable when focused in editor
const keysToDisable = ['1', '2', '3', '4', '5', '6', 'm', 't', 'l'];

const handleKeyDown = (event) => {
  if (keysToDisable.includes(event.key)) {
    // Prevent default and stop propagation to block the shortcut entirely
    event.preventDefault();
    event.stopPropagation();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown, true);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown, true);
});
</script>
