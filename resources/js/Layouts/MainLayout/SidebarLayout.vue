<template>
  <aside class="flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 p-1 font-sans">
    <div>
      <ProfileCard :imagePath="imagePath" />
      <MainNavigation />
      <SocialLinks />
    </div>

    <div class="absolute inset-x-0 bottom-0 py-4 text-center">
      <ThemeSwitcher class="mx-auto" />
      <p class="text-base-content/60 mt-2 text-xs">{{ seoTitle || appName }} - Tüm Hakları Saklıdır</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ProfileCard from '@/Layouts/_composable/ProfileCard.vue';
import MainNavigation from '@/Layouts/_composable/MainNavigation.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import ThemeSwitcher from '@/Layouts/_components/ThemeSwitcher.vue';
import axios from 'axios';

const { props } = usePage();
const imagePath = ref('');
const auth = ref(props.auth);
const appName = ref(props.app.name);
const seoTitle = ref('');

watch(
  () => usePage().props.value,
  (newProps) => {
    auth.value = newProps.auth;
    if (auth.value.user) {
      imagePath.value = auth.value.user.imagePath || '/images/default.png';
    }
  }
);

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
