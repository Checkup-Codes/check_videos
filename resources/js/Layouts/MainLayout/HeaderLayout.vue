<template>
  <header
    class="sticky top-0 z-50 flex min-h-10 items-center justify-between border-b-2 border-gray-300 bg-sidebar px-5 lg:hidden"
  >
    <Link v-if="basePath" :href="`/${basePath}`" class="hover:underline">
      <GoBackSvg class="text-theme-text" />
    </Link>
    <div class="rounded bg-black px-2 font-extrabold text-white">
      <Link href="/">CHECK-UP CODES</Link>
    </div>
    <div class="flex items-center space-x-4">
      <button @click="$emit('toggle-sidebar')" class="lg:hidden">
        <svg
          class="h-6 w-6 text-theme-text"
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
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';

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
</script>
