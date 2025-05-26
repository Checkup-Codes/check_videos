<template>
  <div class="flex w-fit cursor-pointer items-center gap-4 rounded-lg p-4" @click="redirectToLogin">
    <div class="avatar" @contextmenu.prevent="downloadLogo" data-tooltip-id="logo-tooltip">
      <div class="h-10 w-10 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100">
        <template v-if="!isLoading">
          <img
            v-if="currentLogo !== '/images/checkup_codes_logo.png'"
            :src="currentLogo"
            :alt="logoAlt"
            class="h-full w-full rounded-full object-cover"
          />
          <img
            v-else
            src="/images/checkup_codes_logo.png"
            alt="Default Logo"
            class="h-full w-full rounded-full object-cover"
          />
        </template>
        <!-- Skeleton Loading -->
        <div v-else class="h-full w-full rounded-full bg-base-200">
          <div
            class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <template v-if="!isLoading">
        <div class="font-semibold text-base-content">{{ seoTitle }}</div>
        <div class="text-sm font-thin text-base-content">{{ seoDescription }}</div>
      </template>
      <!-- Skeleton for text -->
      <div v-else class="space-y-2">
        <div class="h-5 w-32 animate-pulse rounded bg-base-200"></div>
        <div class="h-4 w-40 animate-pulse rounded bg-base-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  imagePath: {
    type: String,
    default: '/images/checkup_codes_logo.png',
  },
});

const seoTitle = ref('');
const seoDescription = ref('');
const currentLogo = ref(props.imagePath);
const logoAlt = ref('Logo');
const isLoading = ref(true);

const downloadLogo = (event) => {
  event.stopPropagation();
  const link = document.createElement('a');
  link.href = currentLogo.value;
  link.download = 'logo' + currentLogo.value.substring(currentLogo.value.lastIndexOf('.'));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const redirectToLogin = () => {
  router.visit('/login');
};

onMounted(async () => {
  try {
    // Fetch SEO data
    const seoResponse = await axios.get('/api/seo/home');
    if (seoResponse.data) {
      seoTitle.value = seoResponse.data.title;
      seoDescription.value = seoResponse.data.description;
    }

    // Fetch logo data
    const logoResponse = await axios.get('/api/logo');
    if (logoResponse.data?.image_path) {
      currentLogo.value = logoResponse.data.image_path;
      logoAlt.value = logoResponse.data.alt_text;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback values
    seoTitle.value = 'Checkup Codes';
    seoDescription.value = 'Your daily dose of live dev';
    currentLogo.value = props.imagePath;
    logoAlt.value = 'Default Logo';
  } finally {
    // Kısa bir gecikme ekleyerek skeleton'un görünmesini sağlayalım
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background-size: 200px 100%;
}
</style>
