<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const seoTitle = ref('Check-up Codes');

onMounted(async () => {
  try {
    const response = await axios.get('/api/seo/home');
    if (response.data?.title) {
      seoTitle.value = response.data.title;
    }
  } catch (error) {
    console.error('Error fetching SEO title:', error);
  }
});
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    <div>
      <Link href="/">
        <ApplicationLogo class="h-20 w-20 fill-current text-gray-500" />
      </Link>
    </div>

    <div class="text-2xl font-bold">{{ seoTitle }} Admin</div>

    <div class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
      <slot />
    </div>
  </div>
</template>
