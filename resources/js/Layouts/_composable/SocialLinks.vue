<template>
  <div class="space-y-1" :class="{ 'text-center': isCompact }">
    <!-- <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
      {{ isCompact ? '-----' : 'Sosyal Medya' }}
    </h4>
    -->
    <template v-for="link in socialLinks" :key="link.id">
      <SocialLink
        v-if="link.is_active"
        :href="link.url"
        :icon="getSocialIcon(link.platform)"
        :label="link.platform"
        :is-compact="isCompact"
      />
    </template>
  </div>
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

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});

onMounted(async () => {
  try {
    const response = await axios.get('/api/social-media');
    socialLinks.value = response.data;
  } catch (error) {
    console.error('Sosyal medya linkleri yüklenirken hata oluştu:', error);
    // Fallback sosyal medya linkleri
    socialLinks.value = [
      {
        id: 1,
        platform: 'Instagram',
        url: 'https://instagram.com/notiriel',
        is_active: true,
      },
      {
        id: 2,
        platform: 'Youtube',
        url: 'https://youtube.com/@notiriel',
        is_active: true,
      },
      {
        id: 3,
        platform: 'Github',
        url: 'https://github.com/notiriel',
        is_active: true,
      },
    ];
  }
});
</script>
