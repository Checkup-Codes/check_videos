<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <p class="mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700">
        Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz.
      </p>
      <CForm @submit="updateCategory">
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
        <Button type="submit" class="mt-4">Kategoriyi Güncelle</Button>
      </CForm>
      <Button @click="deleteCategory(props.category.id)" variant="outline" class="m-2 ml-auto text-black">
        Kategoriyi Sil
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import CForm from '@/Components/CekapUI/Forms/Form.vue';
import TextInput from '@/Components/CekapUI/Inputs/TextInput.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

const { props } = usePage();

const categories = ref(props.categories || []);
const form = useForm({
  name: props.category.name || '',
  slug: props.category.slug || '',
  parent_id: props.category.parent_id || null,
});

const parentSearch = ref(props.category.parent?.name || '');

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

const fetchCategories = async () => {
  const response = await fetch(route('categories.index'), { headers: { Accept: 'application/json' } });
  const data = await response.json();
  categories.value = data.categories || [];
};

const updateCategory = () => {
  form.put(route('categories.update', { category: props.category.id })).then(() => {
    fetchCategories();
  });
};

const deleteCategory = (categoryId) => {
  if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
    form.delete(route('categories.destroy', { category: categoryId })).then(() => {
      fetchCategories();
    });
  }
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

fetchCategories();
</script>
