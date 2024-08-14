<template>
  <div class="mx-auto min-h-screen p-8">
    <h1 class="mb-4 text-2xl font-bold">Ekipman Ekle</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="mb-1 block text-gray-700">İsim</label>
        <input v-model="form.name" type="text" class="w-full border border-gray-300 p-2" />
      </div>
      <div class="mb-4">
        <label class="mb-1 block text-gray-700">Slug</label>
        <input v-model="form.slug" type="text" class="w-full border border-gray-300 p-2" />
      </div>
      <div class="mb-4">
        <label class="mb-1 block text-gray-700">Özellikler</label>
        <textarea v-model="form.specs" class="w-full border border-gray-300 p-2"></textarea>
      </div>
      <div class="mb-4">
        <label class="mb-1 block text-gray-700">Link</label>
        <input v-model="form.link" type="url" class="w-full border border-gray-300 p-2" />
      </div>
      <button type="submit" class="bg-gray-600 px-4 py-2 text-white">Oluştur</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

const form = useForm({
  name: '',
  slug: '',
  specs: '',
  link: '',
});

const submit = () => {
  form.post(route('equipments.store'));
};
</script>
