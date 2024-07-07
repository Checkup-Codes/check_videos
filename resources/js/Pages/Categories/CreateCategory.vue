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
      <h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1>
      <form @submit.prevent="createWrite">
        <div class="mb-4">
          <label for="title" :class="linkedStyle">İsim:</label>
          <input v-model="form.name" type="text" id="title" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="slug" :class="linkedStyle">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" required />
        </div>

        <div class="mb-4">
          <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            Kategori Oluştur
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';

const { props } = usePage();
const categories = ref(props.categories);

const form = useForm({
  name: '',
  slug: '',
});

const createWrite = () => {
  form.post(route('categories.store')).then(() => {});
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
