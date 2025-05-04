<template>
  <aside class="border-r-2 border-base-300 bg-base-200">
    <ProfileCard :imagePath="imagePath" />
    <MainNavigation />
    <SocialLinks />
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ProfileCard from '@/Layouts/_components/ProfileCard.vue';
import MainNavigation from '@/Layouts/_components/MainNavigation.vue';
import SocialLinks from '@/Layouts/_components/SocialLinks.vue';

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
