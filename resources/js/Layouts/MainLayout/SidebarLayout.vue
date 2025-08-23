<template>
  <aside class="flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 p-1 font-sans">
    <div>
      <ProfileCard :is-compact="isCompact" />
      <MainNavigation :is-compact="isCompact" />
      <SocialLinks :is-compact="isCompact" />
    </div>

    <div class="absolute inset-x-0 bottom-0 py-4 text-center">
      <ThemeSwitcher class="mx-auto" />
      <p v-if="!isCompact" class="text-base-content/60 mt-2 text-xs">{{ seoTitle }} - Tüm Hakları Saklıdır</p>
    </div>
  </aside>
</template>

<script setup>
import ProfileCard from '@/Layouts/_composable/ProfileCard.vue';
import MainNavigation from '@/Layouts/_composable/MainNavigation.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import ThemeSwitcher from '@/Layouts/_components/ThemeSwitcher.vue';
import { usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const { props } = usePage();

const seoTitle = computed(() => {
  return props?.screen?.seo?.title ?? 'Check Videos';
});

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
