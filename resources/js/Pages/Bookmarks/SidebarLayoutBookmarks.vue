<template>
  <div class="z-10 h-screen shadow-right shadow-gray-100">
    <div class="bg-sidebar z-10 flex cursor-pointer justify-between text-sm text-black">
      <Link href="/bookmarks">
        <div class="m-2 rounded p-1 text-center font-bold text-black underline">All Writes</div>
      </Link>
      <Link href="/bookmarks/create">
        <div class="m-2 rounded p-1 text-center font-bold text-black underline">Create Write</div>
      </Link>
    </div>
    <div v-for="bookmarkCategory in bookmarkCategories" :key="bookmarkCategory.id" class="ml-2">
      <Link
        :href="`/bookmarks/${bookmarkCategory.slug}`"
        :class="getLinkClasses(`/bookmarks/${bookmarkCategory.slug}`)"
      >
        <div class="font-bold">{{ bookmarkCategory.name }}</div>
        <div class="text-sm text-gray-400">{{ formatDate(bookmarkCategory.published_at) }}</div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const { props, url } = usePage();
const bookmarkCategories = ref(props.bookmarkCategories);

const truncateSummary = (summary) => {
  return summary.length > 40 ? summary.slice(0, 40) + '...' : summary;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getLinkClasses = (href) => {
  return url === href
    ? 'block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg hover:px-4';
};
</script>
