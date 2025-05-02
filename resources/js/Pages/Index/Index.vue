<template>
  <CheckScreen>
    <div ref="vantaRef" class="h-screen w-full">
      <header class="relative z-10 flex h-full items-center justify-center text-gray-800">
        <div class="text-center">
          <img
            src="../../../../public/images/checkup_codes_logo.png"
            alt="Yakup Sarı"
            class="mx-auto h-96 w-96 rounded-full"
          />
          <h2 class="animate__animated animate__fadeInDown text-4xl font-bold">{{ seoTitle }}</h2>
          <p class="animate__animated animate__fadeInUp text-lg">{{ seoDescription }}</p>
        </div>
      </header>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import axios from 'axios';

const seoTitle = ref('');
const seoDescription = ref('');
const vantaRef = ref(null);
let vantaEffect = null;

onMounted(() => {
  // SEO verilerini çek
  axios
    .get('/api/seo/home')
    .then(({ data }) => {
      if (data?.title) seoTitle.value = data.title;
      if (data?.description) seoDescription.value = data.description;
    })
    .catch((err) => console.error('SEO fetch error:', err));

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
    });
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>
