<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-bold text-gray-700">Hizmeti Düzenle</h1>

    <form @submit.prevent="handleSubmit" class="w-full max-w-lg space-y-8">
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <label class="mb-2 block font-medium text-gray-700">Hizmet Adı</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Hizmet adını girin"
        />

        <label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Açıklaması</label>
        <textarea
          v-model="form.description"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Hizmet açıklamasını girin"
          rows="3"
        ></textarea>

        <label class="mb-2 mt-4 block font-medium text-gray-700">Fiyat (USD)</label>
        <input
          v-model="form.price"
          type="number"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Fiyatı girin"
        />

        <label class="mb-2 mt-4 block font-medium text-gray-700">Üst Kategori</label>
        <select
          v-model="form.parent_id"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        >
          <option :value="null">Yok</option>
          <option v-for="parent in parentOptions" :key="parent.id" :value="parent.id">
            {{ parent.name }}
          </option>
        </select>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h2 class="mb-4 text-xl font-semibold text-blue-600">Alt Kategoriler</h2>

        <ul class="space-y-6">
          <li v-for="(subCategory, index) in form.subCategories" :key="index" class="border-l-4 border-gray-200 pl-4">
            <label class="block font-medium text-gray-700">Alt Kategori Adı</label>
            <input
              v-model="subCategory.name"
              type="text"
              class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Alt kategori adını girin"
            />

            <label class="mt-4 block font-medium text-gray-700">Fiyat (USD)</label>
            <input
              v-model="subCategory.price"
              type="number"
              class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Alt kategori fiyatını girin"
            />

            <button @click.prevent="removeSubCategory(index)" class="mt-3 text-red-500 hover:text-red-600">
              Alt Kategoriyi Kaldır
            </button>
          </li>
        </ul>

        <button
          @click.prevent="addSubCategory"
          class="mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Yeni Alt Kategori Ekle
        </button>
      </div>

      <div class="flex space-x-4">
        <button
          type="submit"
          class="flex-1 rounded bg-green-500 p-3 font-semibold text-white shadow-md hover:bg-green-600"
        >
          Değişiklikleri Kaydet
        </button>

        <button
          @click.prevent="deleteService"
          class="flex-1 rounded bg-red-500 p-3 font-semibold text-white shadow-md hover:bg-red-600"
        >
          Hizmeti Sil
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, useForm } from '@inertiajs/vue3';

const { props } = usePage();
const form = useForm({
  id: props.service.id,
  name: props.service.name || '',
  description: props.service.description || '',
  price: props.service.price || '',
  parent_id: props.service.parent_id || null,
  subCategories: props.service.subCategories || [],
});

const parentOptions = computed(() => {
  return props.services.filter((s) => s.id !== form.id);
});

const addSubCategory = () => {
  form.subCategories.push({ name: '', price: '' });
};

const removeSubCategory = (index) => {
  form.subCategories.splice(index, 1);
};

const handleSubmit = () => {
  form.put(`/services/${form.id}`);
};

const deleteService = () => {
  if (confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
    form.delete(`/services/${form.id}`);
  }
};
</script>
