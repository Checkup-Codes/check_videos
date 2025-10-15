<template>
  <div :class="computedClass">
    <div class="h-screen-minus-12 overflow-y-auto overscroll-none">
      <div class="container mx-auto max-w-[920px]" :class="{ 'xl:mx-auto': isWideScreen }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: '',
  },
});

const isWideScreen = ref(false);

const checkScreenWidth = () => {
  isWideScreen.value = window.innerWidth >= 1800;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});

const computedClass = computed(() => {
  return `${props.infoClass} h-[calc(100h)] overflow-hidden`;
});
</script>
