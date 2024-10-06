<template>
  <div class="mx-auto max-w-[97%] rounded-lg bg-screen-bg p-6 shadow-md">
    <h1 class="mb-6 text-3xl font-bold">Yazıyı Güncelle</h1>
    <form @submit.prevent="updateWrite">
      <div class="mb-4">
        <label for="title" class="mb-1 block text-sm font-bold">Başlık:</label>
        <input v-model="form.title" type="text" id="title" class="mt-1 block w-full rounded" />
        <p v-if="errors.title" class="text-sm text-red-500">{{ errors.title }}</p>
      </div>

      <div class="mb-4">
        <label for="slug" class="mb-1 block text-sm font-bold">Slug:</label>
        <input v-model="form.slug" type="text" id="slug" class="mt-1 block w-full rounded" />
        <p v-if="errors.slug" class="text-sm text-red-500">{{ errors.slug }}</p>
      </div>

      <div class="mb-4">
        <label for="content" class="mb-1 block text-sm font-bold">İçerik:</label>
        <div ref="quillEditor" class="h-96"></div>
        <p v-if="errors.content" class="text-sm text-red-500">{{ errors.content }}</p>
      </div>

      <div class="mb-4">
        <label for="summary" class="mb-1 block text-sm font-bold">Özet:</label>
        <textarea v-model="form.summary" id="summary" class="mt-1 block w-full rounded" rows="3"></textarea>
        <p v-if="errors.summary" class="text-sm text-red-500">{{ errors.summary }}</p>
      </div>

      <div class="mb-4">
        <label for="category_id" class="mb-1 block text-sm font-bold">Kategori:</label>
        <select v-model="form.category_id" id="category_id" class="mt-1 block w-full">
          <option value="" disabled>Kategori seç</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <p v-if="errors.category_id" class="text-sm text-red-500">{{ errors.category_id }}</p>
      </div>

      <div class="mb-4">
        <label for="status" class="mb-1 block text-sm font-bold">Durum:</label>
        <select v-model="form.status" id="status" class="mt-1 block w-full">
          <option value="draft">Şablon</option>
          <option value="published">Yayında</option>
        </select>
        <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
      </div>

      <div class="mb-4">
        <label for="cover_image" class="mb-1 block text-sm font-bold">Kapak resmi:</label>
        <input v-model="form.cover_image" type="text" id="cover_image" class="mt-1 block w-full" />
        <p v-if="errors.cover_image" class="text-sm text-red-500">{{ errors.cover_image }}</p>
      </div>

      <div class="mb-4">
        <label for="seo_keywords" class="mb-1 block text-sm font-bold">SEO Anahtar Kelimeleri:</label>
        <input v-model="form.seo_keywords" type="text" id="seo_keywords" class="mt-1 block w-full" />
        <p v-if="errors.seo_keywords" class="text-sm text-red-500">{{ errors.seo_keywords }}</p>
      </div>

      <div class="mb-4">
        <label for="tags" class="mb-1 block text-sm font-bold">Etiketler:</label>
        <input v-model="form.tags" type="text" id="tags" class="mt-1 block w-full" />
        <p v-if="errors.tags" class="text-sm text-red-500">{{ errors.tags }}</p>
      </div>

      <div class="mb-4">
        <label for="views_count" class="mb-1 block text-sm font-bold">Görüntülenme Sayısı:</label>
        <input v-model="form.views_count" type="number" id="views_count" class="mt-1 block w-full" readonly />
      </div>

      <div class="mb-4">
        <label for="hasDraw" class="mb-1 block text-sm font-bold">Çizim Var Mı? </label>
        <input v-model="form.hasDraw" type="checkbox" id="hasDraw" />
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

const form = useForm({
  title: write.title,
  slug: write.slug,
  content: write.content,
  summary: write.summary,
  status: write.status,
  category_id: write.category_id,
  cover_image: write.cover_image,
  seo_keywords: write.seo_keywords,
  tags: write.tags,
  views_count: write.views_count,
  hasDraw: write.hasDraw ? true : false,
});

const errors = ref({
  title: '',
  slug: '',
  content: '',
  summary: '',
  category_id: '',
  status: '',
  cover_image: '',
  seo_keywords: '',
  tags: '',
  views_count: '',
  hasDraw: '',
});

const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';
  errors.value.status = form.status ? '' : 'Durum seçilmelidir.';
};

const updateWrite = () => {
  validateForm();

  if (!Object.values(errors.value).some((error) => error !== '')) {
    form
      .put(route('writes.update', { write: props.write.id }))
      .then(() => {})
      .catch((error) => {});
  }
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
