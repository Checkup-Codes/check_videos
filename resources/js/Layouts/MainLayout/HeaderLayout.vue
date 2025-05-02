<template>
  <header class="sticky top-0 z-50 flex min-h-10 items-center justify-between border-b-2 px-5 lg:hidden">
    <Link v-if="basePath" :href="`/${basePath}`" class="hover:underline">
      <GoBackSvg class="text-gray-800" />
    </Link>
    <div class="bg-black px-2 font-extrabold uppercase text-white">
      <Link href="/">{{ seoTitle }}</Link>
    </div>
    <div class="flex items-center space-x-4">
      <button @click="$emit('toggle-sidebar')" class="lg:hidden">
        <svg
          class="h-6 w-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';
import axios from 'axios';

const seoTitle = ref('');

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

const basePath = computed(() => {
  const url = usePage().url;
  const parts = url.split('/').filter((part) => part);

  if (!parts.length) return null;

  const pathMap = {
    rendition: 'rendition/words',
    //  academy: 'academy/courses',
  };

  return pathMap[parts[0]] || parts[0];
});

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
