<template>
  <div class="mx-auto w-full max-w-full bg-screen-bg px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Yeni yazı oluştur</h1>
      <CForm @submit="createWrite">
        <TextInput v-model="form.title" id="title" label="Başlık" :error="errors.title" />
        <TextInput v-model="form.slug" id="slug" label="Slug" :error="errors.slug" />
        <RichTextEditor v-model="form.content" label="İçerik" :error="errors.content" />
        <TextInput
          v-model="form.published_at"
          id="published_at"
          label="Yayınlama tarihi"
          type="datetime-local"
          :error="errors.published_at"
        />
        <TextInput v-model="form.summary" id="summary" label="Özet" textarea rows="3" :error="errors.summary" />

        <div class="mb-4">
          <label for="status" class="mb-1 block text-sm font-bold text-gray-700">Durumu:</label>
          <select v-model="form.status" id="status" class="mt-1 block w-full rounded border-gray-300">
            <option value="draft">Şablon</option>
            <option value="published">Yayında</option>
          </select>
          <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
        </div>

        <div class="mb-4">
          <label for="category_id" class="mb-1 block text-sm font-bold text-gray-700">Kategori:</label>
          <select v-model="form.category_id" id="category_id" class="mt-1 block w-full rounded border-gray-300">
            <option value="" disabled>Kategori seç</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.category_id" class="text-sm text-red-500">{{ errors.category_id }}</p>
        </div>

        <TextInput v-model="form.cover_image" id="cover_image" label="Kapak resmi" :error="errors.cover_image" />
        <TextInput
          v-model="form.seo_keywords"
          id="seo_keywords"
          label="SEO Anahtar Kelimeleri"
          :error="errors.seo_keywords"
        />
        <TextInput v-model="form.tags" id="tags" label="Etiketler" :error="errors.tags" />

        <div class="mb-4">
          <label for="views_count" class="mb-1 block text-sm font-bold text-gray-700">Görüntülenme Sayısı:</label>
          <input
            v-model="form.views_count"
            type="number"
            id="views_count"
            class="mt-1 block w-full rounded border-gray-300"
            readonly
          />
        </div>

        <div class="mb-4 flex items-center">
          <label for="hasDraw" class="mb-1 mr-2 text-sm font-bold text-gray-700">Çizim Var Mı?</label>
          <input v-model="form.hasDraw" type="checkbox" id="hasDraw" />
        </div>

        <Button type="submit">Create Write</Button>
      </CForm>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import CForm from '@/Components/CekapUI/Forms/CForm.vue';
import TextInput from '@/Components/CekapUI/Inputs/CTextInput.vue';
import RichTextEditor from '@/Components/CekapUI/Inputs/CRichTextEditor.vue';
import Button from '@/Components/CekapUI/Buttons/CButton.vue';

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
