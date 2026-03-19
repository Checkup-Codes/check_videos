<template>
  <div class="pointer-events-none fixed inset-0 z-0">
    <!-- Subtle Gradient Orbs - Monochromatic -->
    <div
      class="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/8 via-primary/5 to-transparent blur-3xl transition-all duration-1000 ease-out"
      :style="{
        left: `${mouseX * 0.02}px`,
        top: `${mouseY * 0.02}px`,
      }"
    ></div>
    <div
      class="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/6 via-primary/4 to-transparent blur-3xl transition-all duration-1000 ease-out"
      :style="{
        right: `${mouseX * 0.015}px`,
        bottom: `${mouseY * 0.015}px`,
      }"
    ></div>
    <div
      class="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl transition-all duration-1000 ease-out"
      :style="{
        left: `${50 + mouseX * 0.01}%`,
        top: `${50 + mouseY * 0.01}%`,
        transform: 'translate(-50%, -50%)',
      }"
    ></div>

    <!-- Subtle Animated Grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] opacity-40"></div>

    <!-- Minimal Floating Particles -->
    <div class="absolute inset-0">
      <div
        v-for="i in 12"
        :key="i"
        class="absolute h-0.5 w-0.5 animate-float rounded-full bg-primary/15"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${8 + Math.random() * 12}s`,
        }"
      ></div>
    </div>

    <!-- Very Subtle Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(0,0,0,0.05)_100%)]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);

let handleMouseMove: ((e: MouseEvent) => void) | null = null;

onMounted(() => {
  handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
  };

  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  if (handleMouseMove) {
    window.removeEventListener('mousemove', handleMouseMove);
  }
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  50% {
    transform: translateY(-100vh) translateX(50px);
  }
}

.animate-float {
  animation: float linear infinite;
}
</style>
