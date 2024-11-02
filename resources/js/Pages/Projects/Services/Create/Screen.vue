<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 p-6">
    <h1 class="mb-8 text-3xl font-bold text-gray-700">Yeni Hizmet Oluştur</h1>

    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-6">
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <label class="mb-2 block font-medium text-gray-700">Hizmet Adı</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Hizmet adı"
          required
        />

        <label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Kısa Adı</label>
        <input
          v-model="form.slug"
          type="text"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Hizmet kısa adı"
          required
        />

        <label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Açıklaması</label>
        <textarea
          v-model="form.description"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Hizmet açıklaması"
          rows="3"
          required
        ></textarea>

        <label class="mb-2 mt-4 block font-medium text-gray-700">Fiyat</label>
        <input
          v-model="form.price"
          type="number"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Fiyat (USD)"
        />

        <label class="mb-2 mt-4 block font-medium text-gray-700">Üst Kategori</label>
        <input
          v-model="searchQuery"
          type="text"
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Üst kategori arayın ve seçin"
          @focus="showDropdown = true"
          @blur="hideDropdownWithDelay"
        />

        <ul
          v-if="showDropdown && filteredCategories.length"
          class="absolute mt-1 w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <li
            v-for="parent in filteredCategories"
            :key="parent.id"
            @click="selectParent(parent)"
            class="cursor-pointer px-4 py-2 hover:bg-blue-100"
          >
            {{ parent.name }}
          </li>
        </ul>
      </div>

      <button
        type="submit"
        class="w-full rounded bg-blue-500 p-3 font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-600"
      >
        Hizmeti Oluştur
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const parentOptions = props.services;

const form = useForm({
  name: '',
  slug: '',
  description: '',
  price: null,
  parent_id: null,
});

const searchQuery = ref('');
const showDropdown = ref(false);

const filteredCategories = computed(() => {
  return parentOptions.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const selectParent = (parent) => {
  form.parent_id = parent.id;
  searchQuery.value = parent.name;
  showDropdown.value = false;
};

const hideDropdownWithDelay = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const handleSubmit = () => {
  form.post('/services');
};
</script>
