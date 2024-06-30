<template>
  <div class="grid grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutBookmarks class="hidden lg:block" />
    <div class="mx-auto w-[97%] rounded-lg bg-white p-2 shadow-md">
      <div class="flex items-center justify-between">
        <div class="hidden text-sm text-gray-500 lg:block">Category: {{ category.name }}</div>
        <div class="block lg:hidden">
          <button @click="goBack" class="flex items-center p-2 text-black hover:text-gray-700">
            <svg
              class="mr-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Geri
          </button>
        </div>
        <a :href="`/writes/${category.id}/edit`">
          <div class="m-2 rounded p-2 text-center font-bold text-black underline">Edit Write</div>
        </a>
      </div>
      <div class="p-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div v-for="bookmark in bookmarks" :key="bookmark.id" class="rounded-lg border p-4 shadow-sm">
            <a :href="bookmark.link">
              <img
                v-if="bookmark.img_src"
                :src="`${baseUrl}/${bookmark.img_src}`"
                alt="Bookmark Image"
                class="h-32 w-full rounded-t-lg object-cover"
              />
              <div class="mt-4">
                <div class="text-lg font-bold">{{ bookmark.title }}</div>
                <p class="mt-2 text-gray-600">{{ bookmark.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          @click="deleteWrite(category.id)"
          class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"
        >
          Delete Write
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayoutBookmarks from './SidebarLayoutBookmarks.vue';

const { props } = usePage();
const category = ref(props.category);
const bookmarks = ref(props.bookmarks);
const baseUrl = 'http://check_videos.test/storage/bookmarks';

const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};

const goBack = () => {
  window.history.back();
};
</script>
