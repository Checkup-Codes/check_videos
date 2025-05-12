<template>
  <div class="flex w-fit cursor-pointer items-center gap-4 rounded-lg p-4" @click="redirectToLogin">
    <div class="avatar" @contextmenu.prevent="downloadLogo" data-tooltip-id="logo-tooltip">
      <div class="h-10 w-10 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100">
        <img :src="imagePath" alt="Logo" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="font-semibold text-base-content">{{ seoTitle }}</div>
      <div class="text-sm font-thin text-base-content">Your daily dose of live dev</div>
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

const downloadLogo = (event) => {
  event.stopPropagation(); // Prevent the click from triggering the redirectToLogin function
  const link = document.createElement('a');
  link.href = props.imagePath;
  link.download = 'checkup_codes_logo.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const redirectToLogin = () => {
  router.visit('/login');
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/seo/home');
    if (response.data && response.data.title) {
      seoTitle.value = response.data.title;
    }
  } catch (error) {
    console.error('Error fetching SEO title:', error);
  }
});
</script>
