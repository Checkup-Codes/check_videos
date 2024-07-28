<template>
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
        <div ref="quillEditor" class="h-96"></div>
      </div>
      <div class="mb-4">
        <label for="summary" class="mb-1 block text-sm font-bold">Özet:</label>
        <textarea v-model="form.summary" id="summary" class="mt-1 block w-full rounded" rows="3"></textarea>
      </div>
      <div class="mb-4">
        <label for="category_id" class="mb-1 block text-sm font-bold">Kategori:</label>
        <select v-model="form.category_id" id="category_id" class="mt-1 block w-full">
          <option value="" disabled>Kategori seç</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const { props } = usePage();
const write = props.write;
const categories = ref(props.categories);
const auth = props.auth;

const form = useForm({
  title: write.title,
  slug: write.slug,
  content: write.content,
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

  quill.root.innerHTML = form.content;

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
