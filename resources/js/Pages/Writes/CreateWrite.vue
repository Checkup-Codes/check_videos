<template>
  <div class="lg:grid-cols-subsidebar grid h-full grid-cols-1">
    <SidebarLayoutWrite class="hidden lg:block" />
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Create New Write</h1>
      <form @submit.prevent="createWrite">
        <div class="mb-4">
          <label for="title" :class="linkedStyle">Title:</label>
          <input v-model="form.title" type="text" id="title" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="slug" :class="linkedStyle">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="content" :class="linkedStyle">Content:</label>
          <ckeditor :editor="editor" v-model="form.content" class="h-96" :config="editorConfig"></ckeditor>
        </div>
        <div class="mb-4">
          <label for="author_id" :class="linkedStyle">Author ID:</label>
          <input v-model="form.author_id" type="number" id="author_id" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="published_at" :class="linkedStyle">Published At:</label>
          <input v-model="form.published_at" type="datetime-local" id="published_at" :class="linkedStyle2" />
        </div>
        <div class="mb-4">
          <label for="summary" :class="linkedStyle">Summary:</label>
          <textarea v-model="form.summary" id="summary" :class="linkedStyle2" rows="3"></textarea>
        </div>
        <div class="mb-4">
          <label for="status" :class="linkedStyle">Status:</label>
          <select v-model="form.status" id="status" class="mt-1 block w-full">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="cover_image" :class="linkedStyle">Cover Image:</label>
          <input v-model="form.cover_image" type="text" id="cover_image" :class="linkedStyle2" />
        </div>
        <div class="mb-4">
          <button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Create Write</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { watch } from 'vue';
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';

const form = useForm({
  title: '',
  slug: '',
  content: '',
  author_id: '',
  published_at: '',
  summary: '',
  status: 'draft',
  cover_image: '',
});

const createWrite = () => {
  form.post('/writes').then(() => {});
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

// Slug'ı dinamik olarak güncellemek için title'ı izleyin
watch(
  () => form.title,
  (newTitle) => {
    form.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Boşluk ve özel karakterleri tire ile değiştirir
      .replace(/^-+|-+$/g, ''); // Başında ve sonunda olan tireleri kaldırır
  }
);
</script>

<style scoped>
/* Stil dosyalarınızı buraya ekleyebilirsiniz */
</style>
