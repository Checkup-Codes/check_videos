<template>
  <div class="flex w-fit cursor-pointer items-center gap-4 rounded-lg p-4" @click="redirectToLogin">
    <div class="avatar" @contextmenu.prevent="downloadLogo" data-tooltip-id="logo-tooltip">
      <div class="h-10 w-10 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100">
        <template v-if="!isLoading">
          <img
            :src="currentLogo"
            :alt="logoAlt"
            class="h-full w-full rounded-full object-cover"
            @error="handleImageError"
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
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { router, usePage } from '@inertiajs/vue3';

const props = defineProps({
  imagePath: {
    type: String,
    default: '/images/checkup_codes_logo.png',
  },
});

const page = usePage();
const seoTitle = ref('');
const seoDescription = ref('');
const currentLogo = ref(props.imagePath);
const logoAlt = ref('Logo');
const isLoading = ref(true);

// Kullanıcının login durumunu kontrol et
const isLoggedIn = computed(() => !!page.props.auth?.user);

// Props değişikliklerini izle
watch(
  () => props.imagePath,
  (newPath) => {
    if (newPath && newPath !== '/images/checkup_codes_logo.png') {
      currentLogo.value = newPath;
    }
  },
  { immediate: true }
);

// Login durumu değişikliklerini izle
watch(isLoggedIn, async (newLoginStatus) => {
  if (!newLoginStatus) {
    // Kullanıcı logout olduğunda default logo'ya dön
    try {
      const logoResponse = await axios.get('/api/logo');
      if (logoResponse.data?.image_path) {
        currentLogo.value = logoResponse.data.image_path;
        logoAlt.value = logoResponse.data.alt_text;
      } else {
        currentLogo.value = '/images/checkup_codes_logo.png';
        logoAlt.value = 'Default Logo';
      }
    } catch (error) {
      currentLogo.value = '/images/checkup_codes_logo.png';
      logoAlt.value = 'Default Logo';
    }
  } else if (props.imagePath && props.imagePath !== '/images/checkup_codes_logo.png') {
    // Kullanıcı login olduğunda ve özel resmi varsa onu kullan
    currentLogo.value = props.imagePath;
    logoAlt.value = 'User Profile Image';
  }
});

const downloadLogo = (event) => {
  event.stopPropagation();
  const link = document.createElement('a');
  link.href = currentLogo.value;
  link.download = 'logo' + currentLogo.value.substring(currentLogo.value.lastIndexOf('.'));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleImageError = () => {
  // Resim yüklenemezse default logo'ya geç
  currentLogo.value = '/images/checkup_codes_logo.png';
  logoAlt.value = 'Default Logo';
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

    // Eğer kullanıcı login ise ve props'tan gelen imagePath varsa onu kullan
    if (isLoggedIn.value && props.imagePath && props.imagePath !== '/images/checkup_codes_logo.png') {
      currentLogo.value = props.imagePath;
      logoAlt.value = 'User Profile Image';
    } else {
      // Kullanıcı login değilse veya özel resim yoksa, API'den logo bilgisini çek
      try {
        const logoResponse = await axios.get('/api/logo');
        if (logoResponse.data?.image_path) {
          currentLogo.value = logoResponse.data.image_path;
          logoAlt.value = logoResponse.data.alt_text;
        } else {
          // API'den logo gelmezse default logo kullan
          currentLogo.value = '/images/checkup_codes_logo.png';
          logoAlt.value = 'Default Logo';
        }
      } catch (logoError) {
        console.error('Error fetching logo:', logoError);
        // Logo API'si başarısız olursa default logo kullan
        currentLogo.value = '/images/checkup_codes_logo.png';
        logoAlt.value = 'Default Logo';
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback values
    seoTitle.value = 'Checkup Codes';
    seoDescription.value = 'Your daily dose of live dev';
    currentLogo.value = '/images/checkup_codes_logo.png';
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
