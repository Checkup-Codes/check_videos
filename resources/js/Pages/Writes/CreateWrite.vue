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
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Yeni yazı oluştur</h1>
      <form @submit.prevent="createWrite">
        <div class="mb-4">
          <label for="title" :class="linkedStyle">Başlık:</label>
          <input v-model="form.title" type="text" id="title" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="slug" :class="linkedStyle">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="content" :class="linkedStyle">İçerik:</label>
          <ckeditor :editor="editor" v-model="form.content" class="h-96" :config="editorConfig"></ckeditor>
        </div>
        <div class="mb-4">
          <label for="published_at" :class="linkedStyle">Yayınlama tarihi:</label>
          <input v-model="form.published_at" type="datetime-local" id="published_at" :class="linkedStyle2" />
        </div>
        <div class="mb-4">
          <label for="summary" :class="linkedStyle">Özet:</label>
          <textarea v-model="form.summary" id="summary" :class="linkedStyle2" rows="3"></textarea>
        </div>
        <div class="mb-4">
          <label for="status" :class="linkedStyle">Durumu:</label>
          <select v-model="form.status" id="status" class="mt-1 block w-full">
            <option value="draft">Şablon</option>
            <option value="published">Yayında</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="category_id" :class="linkedStyle">Kategori:</label>
          <select v-model="form.category_id" id="category_id" class="mt-1 block w-full">
            <option value="" disabled>Kategori seç</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="cover_image" :class="linkedStyle">Kapak resmi:</label>
          <input v-model="form.cover_image" type="text" id="cover_image" :class="linkedStyle2" />
        </div>
        <div class="mb-4">
          <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Create Write</button>
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
const categories = ref(props.categories);

const form = useForm({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: 'draft',
  category_id: '',
  cover_image: '',
});

const createWrite = () => {
  form.post(route('writes.store')).then(() => {});
};

const linkedStyle = 'block font-bold mb-1 text-sm rounded';
const linkedStyle2 = 'mt-1 block w-full rounded';

const editor = ClassicEditor;
const editorConfig = {
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
    ],
  },
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

const goBack = () => {
  window.history.back();
};
</script>
