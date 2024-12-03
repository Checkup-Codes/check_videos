<template>
  <div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5">
    <div class="container mx-auto p-4">
      <CForm @submit="updateWrite">
        <TextInput v-model="form.title" id="title" label="Başlık" :error="errors.title" />
        <TextInput v-model="form.slug" id="slug" label="Slug" :error="errors.slug" />
        <RichTextEditor v-model="form.content" label="İçerik" :error="errors.content" />
        <TextInput v-model="form.summary" id="summary" label="Özet" textarea rows="3" :error="errors.summary" />

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

        <TextInput v-model="form.cover_image" id="cover_image" label="Kapak resmi" :error="errors.cover_image" />
        <TextInput
          v-model="form.seo_keywords"
          id="seo_keywords"
          label="SEO Anahtar Kelimeleri"
          :error="errors.seo_keywords"
        />
        <TextInput v-model="form.tags" id="tags" label="Etiketler" :error="errors.tags" />
        <TextInput v-model="form.views_count" id="views_count" label="Görüntülenme Sayısı" type="number" readonly />
        <div class="mb-4 flex items-center">
          <label for="hasDraw" class="mb-1 mr-2 text-sm font-bold text-gray-700">Çizim Var Mı?</label>
          <input v-model="form.hasDraw" type="checkbox" id="hasDraw" />
        </div>
        <Button type="submit">Yazıyı Güncelle</Button>
      </CForm>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import CForm from '@/Components/CekapUI/Forms/Form.vue';
import TextInput from '@/Components/CekapUI/Inputs/TextInput.vue';
import RichTextEditor from '@/Components/CekapUI/Inputs/RichTextEditor.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

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
