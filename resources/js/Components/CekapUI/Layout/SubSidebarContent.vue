<template>
  <div :class="['space-y-1 px-2 py-2 sm:px-3', props.class]">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>
