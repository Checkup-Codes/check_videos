<template>
  <div :class="computedClass">
    <div class="min-h-0 flex-1 overflow-y-auto overscroll-none">
      <div class="mx-auto max-w-full sm:max-w-[920px]" :class="{ 'xl:mx-auto': isWideScreen }">
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
  return `${props.infoClass} flex h-full min-h-0 flex-col overflow-hidden px-2 sm:px-4 lg:px-8`;
});
</script>
