<template>
  <div class="mx-auto mt-10 w-full max-w-full overflow-auto bg-screen-bg p-2 shadow-md lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1>
      <form @submit.prevent="createWrite">
        <div class="mb-4">
          <label for="name" :class="linkedStyle">İsim:</label>
          <input v-model="form.name" type="text" id="name" :class="linkedStyle2" required />
        </div>
        <div class="mb-4">
          <label for="slug" :class="linkedStyle">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" required />
        </div>

        <div class="mb-4">
          <label for="description" :class="linkedStyle">Açıklama:</label>
          <div ref="quillEditor" class="h-96"></div>
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
import { watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const { props } = usePage();
const categories = ref(props.categories);

const form = useForm({
  name: '',
  slug: '',
  description: '',
});

const createWrite = () => {
  form.post(route('categories.store')).then(() => {});
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
    form.description = quill.root.innerHTML;
  });
});

watch(
  () => form.name,
  (newName) => {
    form.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
);

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.input-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-primary {
  @apply rounded bg-gray-500 px-4 py-2 font-bold text-white;
}
</style>
