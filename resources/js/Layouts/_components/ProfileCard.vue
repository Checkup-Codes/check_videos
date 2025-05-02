<template>
  <div class="card p-4">
    <div class="flex flex-col items-center">
      <div class="avatar mb-3 cursor-pointer" @contextmenu.prevent="downloadLogo" data-tooltip-id="logo-tooltip">
        <div class="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
          <img :src="imagePath" alt="Logo" />
        </div>
      </div>
      <div class="mb-1 flex items-center gap-2">
        <h2 class="text-base-content text-lg font-medium">{{ seoTitle }}</h2>
        <ThemeSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ThemeSwitcher from '../../Components/CekapUI/Buttons/ThemeSwitcher.vue';

const props = defineProps({
  imagePath: {
    type: String,
    default: '/images/checkup_codes_logo.png',
  },
});

const seoTitle = ref('');

// Function to download the logo when right-clicked
const downloadLogo = () => {
  const link = document.createElement('a');
  link.href = props.imagePath;
  link.download = 'checkup_codes_logo.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
