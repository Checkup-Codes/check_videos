<template>
  <form @submit.prevent="create">
    <div class="grid grid-cols-6 gap-4 p-5">
      <!-- Name and Slug Fields -->
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.name" class="input-error">{{ form.errors.name }}</div>
      </div>
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Slug</label>
        <input
          v-model="form.slug"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.slug" class="input-error">{{ form.errors.slug }}</div>
      </div>

      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Category</label>
        <input
          v-model="form.category"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.category" class="input-error">{{ form.errors.category }}</div>
      </div>

      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Price</label>
        <input
          v-model.number="form.price"
          type="number"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.price" class="input-error">{{ form.errors.price }}</div>
      </div>

      <div class="col-span-6">
        <label class="mb-1 block font-medium text-gray-800">Description</label>
        <ckeditor :editor="editor" v-model="form.description" class="h-96" :config="editorConfig"></ckeditor>

        <div v-if="form.errors.description" class="input-error">{{ form.errors.description }}</div>
      </div>

      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Stock</label>
        <input
          v-model.number="form.stock"
          type="number"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.stock" class="input-error">{{ form.errors.stock }}</div>
      </div>

      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Subscription Duration</label>
        <input
          v-model.number="form.subscription_duration"
          type="number"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.subscription_duration" class="input-error">{{ form.errors.subscription_duration }}</div>
      </div>

      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">License Key</label>
        <input
          v-model="form.license_key"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.license_key" class="input-error">{{ form.errors.license_key }}</div>
      </div>
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Version</label>
        <input
          v-model="form.version"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.version" class="input-error">{{ form.errors.version }}</div>
      </div>

      <!-- Platform and Subscription Duration Fields -->
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Platform</label>
        <input
          v-model="form.platform"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.platform" class="input-error">{{ form.errors.platform }}</div>
      </div>

      <!-- Download URL and Is Subscription Fields -->
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Download URL</label>
        <input
          v-model="form.download_url"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.download_url" class="input-error">{{ form.errors.download_url }}</div>
      </div>
      <div class="col-span-3">
        <label class="mb-1 block font-medium text-gray-800">Is Subscription</label>
        <input
          v-model="form.is_subscription"
          type="checkbox"
          class="block rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.is_subscription" class="input-error">{{ form.errors.is_subscription }}</div>
      </div>

      <!-- System Requirements Field -->
      <div class="col-span-6">
        <label class="mb-1 block font-medium text-gray-800">System Requirements</label>
        <input
          v-model="form.system_requirements"
          type="text"
          class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600"
        />
        <div v-if="form.errors.system_requirements" class="input-error">{{ form.errors.system_requirements }}</div>
      </div>

      <!-- Submit Button -->
      <div class="col-span-6">
        <button type="submit" class="btn-primary">Create</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { props } = usePage();

const form = useForm({
  name: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  platform: '',
  version: '',
  license_key: '',
  is_subscription: false,
  subscription_duration: 0,
  download_url: '',
  system_requirements: '',
});

const create = () => form.post(route('software-products.store'));

const flashSuccess = ref(props.flash);

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});

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
