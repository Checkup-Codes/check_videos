<template>
  <div class="container mx-auto bg-screen-bg p-6">
    <h1 class="mb-4 text-2xl font-bold">Yeni yazı oluştur</h1>
    <form @submit.prevent="createWrite">
      <div class="mb-4">
        <label for="title" :class="linkedStyle">Başlık:</label>
        <input v-model="form.title" type="text" id="title" :class="linkedStyle2" />
        <p v-if="errors.title" class="text-sm text-red-500">{{ errors.title }}</p>
      </div>

      <div class="mb-4">
        <label for="slug" :class="linkedStyle">Slug:</label>
        <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" />
        <p v-if="errors.slug" class="text-sm text-red-500">{{ errors.slug }}</p>
      </div>

      <div class="mb-4">
        <label for="content" :class="linkedStyle">İçerik:</label>
        <div ref="quillEditor" class="quill-editor h-96"></div>
        <p v-if="errors.content" class="text-sm text-red-500">{{ errors.content }}</p>
      </div>

      <div class="mb-4">
        <label for="published_at" :class="linkedStyle">Yayınlama tarihi:</label>
        <input v-model="form.published_at" type="datetime-local" id="published_at" :class="linkedStyle2" />
        <p v-if="errors.published_at" class="text-sm text-red-500">{{ errors.published_at }}</p>
      </div>

      <div class="mb-4">
        <label for="summary" :class="linkedStyle">Özet:</label>
        <textarea v-model="form.summary" id="summary" :class="linkedStyle2" rows="3"></textarea>
        <p v-if="errors.summary" class="text-sm text-red-500">{{ errors.summary }}</p>
      </div>

      <div class="mb-4">
        <label for="status" :class="linkedStyle">Durumu:</label>
        <select v-model="form.status" id="status" class="mt-1 block w-full">
          <option value="draft">Şablon</option>
          <option value="published">Yayında</option>
        </select>
        <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
      </div>

      <div class="mb-4">
        <label for="category_id" :class="linkedStyle">Kategori:</label>
        <select v-model="form.category_id" id="category_id" class="mt-1 block w-full">
          <option value="" disabled>Kategori seç</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <p v-if="errors.category_id" class="text-sm text-red-500">{{ errors.category_id }}</p>
      </div>

      <div class="mb-4">
        <label for="cover_image" :class="linkedStyle">Kapak resmi:</label>
        <input v-model="form.cover_image" type="text" id="cover_image" :class="linkedStyle2" />
        <p v-if="errors.cover_image" class="text-sm text-red-500">{{ errors.cover_image }}</p>
      </div>

      <div class="mb-4">
        <label for="seo_keywords" :class="linkedStyle">SEO Anahtar Kelimeleri:</label>
        <input v-model="form.seo_keywords" type="text" id="seo_keywords" :class="linkedStyle2" />
        <p v-if="errors.seo_keywords" class="text-sm text-red-500">{{ errors.seo_keywords }}</p>
      </div>

      <div class="mb-4">
        <label for="tags" :class="linkedStyle">Etiketler:</label>
        <input v-model="form.tags" type="text" id="tags" :class="linkedStyle2" />
        <p v-if="errors.tags" class="text-sm text-red-500">{{ errors.tags }}</p>
      </div>

      <div class="mb-4">
        <label for="views_count" :class="linkedStyle">Görüntülenme Sayısı:</label>
        <input v-model="form.views_count" type="number" id="views_count" :class="linkedStyle2" readonly />
      </div>

      <div class="mb-4">
        <label for="hasDraw" :class="linkedStyle">Çizim Var Mı?</label>
        <input v-model="form.hasDraw" type="checkbox" id="hasDraw" />
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
  seo_keywords: '',
  tags: '',
  views_count: 0,
  hasDraw: false,
});

const errors = ref({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: '',
  category_id: '',
  cover_image: '',
  seo_keywords: '',
  tags: '',
});

const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.published_at = form.published_at ? '' : 'Yayınlama tarihi zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';
};

const createWrite = () => {
  validateForm();

  if (!Object.values(errors.value).some((error) => error !== '')) {
    form.post(route('writes.store')).then(() => {});
  }
};

watch(
  form,
  (newForm) => {
    if (newForm.title) errors.value.title = '';
    if (newForm.slug) errors.value.slug = '';
    if (newForm.content) errors.value.content = '';
    if (newForm.published_at) errors.value.published_at = '';
    if (newForm.summary) errors.value.summary = '';
    if (newForm.category_id) errors.value.category_id = '';
  },
  { deep: true }
);

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
