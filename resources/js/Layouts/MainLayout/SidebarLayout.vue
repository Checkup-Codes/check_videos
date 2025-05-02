<template>
  <aside class="bg-base-200 p-3">
    <ProfileCard :imagePath="imagePath" />
    <Divider />
    <MainNavigation />
    <Divider />
    <SocialLinks />
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import ProfileCard from '@/Layouts/_components/ProfileCard.vue';
import MainNavigation from '@/Layouts/_components/MainNavigation.vue';
import SocialLinks from '@/Layouts/_components/SocialLinks.vue';
import Divider from '@/Layouts/_components/Divider.vue';

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
