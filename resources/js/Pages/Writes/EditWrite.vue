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
    <SidebarLayoutWrite class="hidden lg:block" />
    <div class="mx-auto max-w-[97%] rounded-lg bg-white p-6 shadow-md">
      <h1 class="mb-6 text-3xl font-bold">Yazıyı Güncelle</h1>
      <form @submit.prevent="updateWrite">
        <div class="mb-4">
          <label for="title" class="mb-1 block text-sm font-bold">Başlık:</label>
          <input v-model="form.title" type="text" id="title" class="mt-1 block w-full rounded" required />
        </div>
        <div class="mb-4">
          <label for="slug" class="mb-1 block text-sm font-bold">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" class="mt-1 block w-full rounded" required />
        </div>
        <div class="mb-4">
          <label for="content" class="mb-1 block text-sm font-bold">İçerik:</label>
          <ckeditor :editor="editor" v-model="form.content" :config="editorConfig" />
        </div>
        <div class="mb-4">
          <label for="author_id" class="mb-1 block text-sm font-bold">Yazar id:</label>
          <input v-model="form.author_id" type="number" id="author_id" class="mt-1 block w-full rounded" required />
        </div>
        <div class="mb-4">
          <label for="published_at" class="mb-1 block text-sm font-bold">Yayınlanma Tarihi:</label>
          <input
            v-model="form.published_at"
            type="datetime-local"
            id="published_at"
            class="mt-1 block w-full rounded"
          />
        </div>
        <div class="mb-4">
          <label for="summary" class="mb-1 block text-sm font-bold">Özet:</label>
          <textarea v-model="form.summary" id="summary" class="mt-1 block w-full rounded" rows="3"></textarea>
        </div>
        <div class="mb-4">
          <label for="category_id" :class="linkedStyle">Kategori:</label>
          <select v-model="form.category_id" id="category_id" class="mt-1 block w-full">
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="status" class="mb-1 block text-sm font-bold">Durum:</label>
          <select v-model="form.status" id="status" class="mt-1 block w-full">
            <option value="draft">Şablon</option>
            <option value="published">Yayında</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="cover_image" class="mb-1 block text-sm font-bold">Kapak resmi:</label>
          <input v-model="form.cover_image" type="text" id="cover_image" class="mt-1 block w-full rounded" />
        </div>
        <div class="mb-4">
          <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Update Write</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';

const { props } = usePage();
const write = props.write;
const categories = props.categories;

const form = useForm({
  title: write.title,
  slug: write.slug,
  content: write.content,
  author_id: write.author_id,
  published_at: write.published_at,
  summary: write.summary,
  status: write.status,
  category_id: write.category_id,
  cover_image: write.cover_image,
});

const updateWrite = () => {
  form
    .put(route('writes.update', { write: props.write.id }))
    .then(() => {})
    .catch((error) => {});
};

const editor = ClassicEditor;
const editorConfig = {
  height: '400px',
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
</script>
