<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <div class="block px-4 pt-3 lg:hidden">
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
    <SidebarLayoutCategory class="hidden lg:block" />
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1>
      <form @submit.prevent="updateWrite">
        <div class="mb-4">
          <label for="title" class="mb-1 block text-sm font-bold">İsim:</label>
          <input v-model="form.name" type="text" id="title" class="mt-1 block w-full rounded" required />
        </div>
        <div class="mb-4">
          <label for="slug" class="mb-1 block text-sm font-bold">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" class="mt-1 block w-full rounded" required />
        </div>

        <div class="mb-4">
          <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            Kategoriyi güncelle
          </button>
        </div>
      </form>
      <div v-if="auth.user" class="flex">
        <button
          @click="deleteCategory(category.id)"
          class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"
        >
          Kategoriyi sil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';

const { props } = usePage();
const category = props.category;
const auth = props.auth;

const form = useForm({
  name: category.name,
  slug: category.slug,
});

const updateWrite = () => {
  form
    .put(route('categories.update', { category: props.category.id }))
    .then(() => {})
    .catch((error) => {});
};

const goBack = () => {
  window.history.back();
};

watch(
  () => form.title,
  (newTitle) => {
    form.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
);

const deleteCategory = (categoryId) => {
  if (confirm('Are you sure you want to delete this category?')) {
    form
      .delete(route('categories.destroy', { category: category }))
      .then(() => {})
      .catch((error) => {});
  }
};
</script>
