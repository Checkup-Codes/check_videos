<template>
  <div class="mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-white p-2 shadow-md lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1>
      <form @submit.prevent="updateWrite">
        <div class="mb-4">
          <label for="title" class="mb-1 block text-sm font-bold">İsim:</label>
          <input v-model="form.name" type="text" id="title" class="mt-1 block w-full rounded" required />
        </div>
        <div class="mb-4">
          <label for="slug" class="mb-1 block text-sm font-bold">Slug:</label>
          <input v-model="form.slug" type="text" id="slug" class="mt-1 block w-full rounded" required />
        </div>

        <div class="mb-4">
          <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            Kategoriyi güncelle
          </button>
        </div>
      </form>
      <div v-if="auth.user" class="flex">
        <button
          @click="deleteCategory(category.id)"
          class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"
        >
          Kategoriyi sil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const auth = props.auth;
const form = useForm({
  name: '',
  slug: '',
});

watch(
  () => props.category,
  (newCategory) => {
    form.name = newCategory.name;
    form.slug = newCategory.slug;
  },
  { immediate: true }
);

const updateWrite = () => {
  form
    .put(route('categories.update', { category: props.category.id }))
    .then(() => {
      // Güncelleme başarılı olursa yapılacaklar
    })
    .catch((error) => {
      // Hata varsa yapılacaklar
    });
};

const deleteCategory = (categoryId) => {
  if (confirm('Bu kategoriyi çöpe mi atıyoruz ?')) {
    form
      .delete(route('categories.destroy', { category: props.category.id }))
      .then(() => {
        // Silme başarılı olursa yapılacaklar
      })
      .catch((error) => {
        // Hata varsa yapılacaklar
      });
  }
};
</script>
