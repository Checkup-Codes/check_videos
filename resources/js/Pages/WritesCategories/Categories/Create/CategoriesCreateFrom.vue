<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1>
      <FormDesc>Kategorileriniz için kategoriler oluşturun. İsterseniz bir üst kategori seçebilirsiniz.</FormDesc>
      <Form @submit="createCategory">
        <TextInput v-model="form.name" id="name" label="İsim" />
        <TextInput v-model="form.slug" id="slug" label="Slug" />
        <div class="mt-4">
          <label for="parent_id_input" class="block text-sm font-medium text-gray-700">Üst Kategori</label>
          <input
            type="text"
            id="parent_id_input"
            v-model="parentSearch"
            placeholder="Üst kategori arayın"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ul
            v-if="filteredCategories.length"
            class="mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm"
          >
            <li
              v-for="category in filteredCategories"
              :key="category.id"
              @click="selectParentCategory(category)"
              class="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {{ category.name }}
            </li>
          </ul>
          <p v-else class="mt-2 text-sm text-gray-500">Sonuç bulunamadı.</p>
        </div>
        <Button type="submit" class="mt-4">Kategori Oluştur</Button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import TextInput from '@/Components/CekapUI/Inputs/TextInput.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import Form from '@/Components/CekapUI/Forms/Form.vue';
import FormDesc from '@/Components/CekapUI/Typography/FromDesc.vue';

const props = defineProps({
  categories: Array,
});

const categories = ref(props.categories);
const form = useForm({
  name: '',
  slug: '',
  parent_id: '',
});

const parentSearch = ref('');

const filteredCategories = computed(() => {
  if (!parentSearch.value) {
    return categories.value;
  }
  return categories.value.filter((category) => category.name.toLowerCase().includes(parentSearch.value.toLowerCase()));
});

const selectParentCategory = (category) => {
  form.parent_id = category.id;
  parentSearch.value = category.name;
};

watch(
  () => form.name,
  (newName) => {
    form.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
);

const fetchCategories = async () => {
  const response = await fetch(route('categories.index'), { headers: { Accept: 'application/json' } });
  const data = await response.json();
  categories.value = data.categories || [];
};

const createCategory = () => {
  form.post(route('categories.store')).then(() => {
    form.reset();
    parentSearch.value = '';
    fetchCategories();
  });
};

fetchCategories();
</script>
