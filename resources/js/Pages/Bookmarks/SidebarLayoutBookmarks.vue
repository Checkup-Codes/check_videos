<template>
  <div class="flex justify-between">
    <Link href="/bookmarks">
      <div class="m-2 rounded p-2 text-center font-bold text-black underline">All Bookmarks</div>
    </Link>
    <Link href="/bookmarks/create">
      <div class="m-2 rounded p-2 text-center font-bold text-black underline">Create Bookmark</div>
    </Link>
  </div>
  <div v-for="bookmark in bookmarks" :key="bookmark.id" class="ml-2 border-l-4">
    <div>{{ bookmark }}</div>
    <Link :href="`/bookmarks/${bookmark.slug}`" :class="linkClasses">
      <div class="font-bold">{{ bookmark.title }}</div>
    </Link>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { useStore } from 'vuex';

const store = useStore();
const bookmarks = computed(() => store.getters['Bookmarks/bookmarkCategories']);

onMounted(() => {
  if (!bookmarks.value.length) {
    store.dispatch('Bookmarks/fetchBookmarkCategories');
  }
});

const linkClasses =
  'm-2 block cursor-pointer rounded p-1 text-black transition-all transition-colors duration-200 hover:bg-gray-900 hover:text-white hover:shadow-lg';
</script>
