<template>
  <nav class="w-full bg-base-200 px-2">
    <h3 class="border-t-2 border-base-300 px-3 py-3 text-xs">Hesaplar</h3>
    <template v-for="link in socialLinks" :key="link.id">
      <SocialLink v-if="link.is_active" :href="link.url" :icon="getSocialIcon(link.platform)" :label="link.platform" />
    </template>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SocialLink from '../_components/SocialLink.vue';
import axios from 'axios';

const socialLinks = ref([]);

const platformIcons = {
  Instagram: ['fab', 'instagram'],
  Youtube: ['fab', 'youtube'],
  Github: ['fab', 'github'],
  Linkedin: ['fab', 'linkedin'],
  Medium: ['fab', 'medium'],
  Twitter: ['fab', 'twitter'],
  X: ['fab', 'twitter'],
  Facebook: ['fab', 'facebook'],
  Tiktok: ['fab', 'tiktok'],
  Pinterest: ['fab', 'pinterest'],
  default: ['fas', 'link'],
};

const getSocialIcon = (platform) => {
  return platformIcons[platform] || platformIcons.default;
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/social-media');
    socialLinks.value = response.data;
  } catch (error) {
    console.error('Sosyal medya linkleri yüklenirken hata oluştu:', error);
  }
});
</script>
