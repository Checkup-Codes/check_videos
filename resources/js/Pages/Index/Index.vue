<template>
  <div class="h-[calc(100h)] overflow-hidden">
    <div class="h-screen-minus-12 overflow-y-auto overscroll-none lg:h-screen-minus">
      <div ref="vantaRef" class="h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1">
        <header class="relative z-10 flex h-full items-center justify-center text-gray-800">
          <div class="text-center">
            <div class="relative mx-auto h-96 w-96">
              <template v-if="!isLoading">
                <img
                  :src="logoPath"
                  :alt="logoAlt"
                  class="h-full w-full rounded-full object-cover"
                  @error="handleImageError"
                />
              </template>
              <!-- Skeleton Loading -->
              <div v-else class="animate-pulse">
                <div class="h-96 w-96 rounded-full bg-base-200">
                  <div
                    class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200"
                  ></div>
                </div>
                <!-- Skeleton for title -->
                <div class="mx-auto mt-4 h-8 w-64 rounded bg-base-200"></div>
                <!-- Skeleton for description -->
                <div class="mx-auto mt-2 h-4 w-48 rounded bg-base-200"></div>
              </div>
            </div>
            <h2 v-if="!isLoading" class="animate__animated animate__fadeInDown text-4xl font-bold">{{ seoTitle }}</h2>
            <p v-if="!isLoading" class="animate__animated animate__fadeInUp text-lg">{{ seoDescription }}</p>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();

const seoTitle = ref(props.screen.seo.title);
const seoDescription = ref(props.screen.seo.description);
const logoPath = ref(props.screen.seo.logo);
const logoAlt = ref('Logo');
const vantaRef = ref(null);
let vantaEffect = null;
const isLoading = ref(false);

const handleImageError = () => {
  logoPath.value = '/images/default-logo.png'; // Varsayılan bir resim yolu
};

onMounted(async () => {
  // Vanta animasyonu başlat
  if (!vantaEffect) {
    vantaEffect = NET({
      el: vantaRef.value,
      THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x88ccff,
      backgroundColor: 0xf8fafc,
      points: 12.0,
      maxDistance: 25.0,
      spacing: 15.0,
      material: {
        vertexColors: true,
      },
    });
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background-size: 1000px 100%;
}
</style>
