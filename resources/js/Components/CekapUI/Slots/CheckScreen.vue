<template>
  <div :class="computedClass">
    <div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]">
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
  return `${props.infoClass} h-full overflow-hidden`;
});
</script>
