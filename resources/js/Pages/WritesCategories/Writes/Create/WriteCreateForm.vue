<template>
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
        <div ref="quillEditor" class="quill-editor h-96"></div>
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
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

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

const quillEditor = ref(null);

onMounted(() => {
  const quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
  });

  quill.on('text-change', () => {
    form.content = quill.root.innerHTML;
  });
});

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

<style>
.quill-editor {
  height: 400px;
}
</style>
