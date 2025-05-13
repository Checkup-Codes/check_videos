<template>
  <aside class="flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 p-1 font-sans">
    <div>
      <ProfileCard :imagePath="imagePath" />
      <MainNavigation />
      <SocialLinks />
    </div>

    <div class="absolute inset-x-0 bottom-0 py-4 text-center">
      <ThemeSwitcher class="mx-auto" />
      <p class="text-base-content/60 mt-2 text-xs">CheckupCodes - Tüm Hakları Saklıdır</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ProfileCard from '@/Layouts/_composable/ProfileCard.vue';
import MainNavigation from '@/Layouts/_composable/MainNavigation.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import ThemeSwitcher from '@/Layouts/_components/ThemeSwitcher.vue';

const { props } = usePage();
const imagePath = ref('/images/checkup_codes_logo.png');
const auth = ref(props.auth);

watch(
  () => usePage().props.value,
  (newProps) => {
    auth.value = newProps.auth;
    if (auth.value.user) {
      imagePath.value = auth.value.user.imagePath || '/images/default.png';
    }
  }
);
</script>
