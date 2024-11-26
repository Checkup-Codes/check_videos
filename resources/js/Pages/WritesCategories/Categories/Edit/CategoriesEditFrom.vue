<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1>
      <p class="mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700">Kategorileri için düzenle.</p>
      <CForm @submit="updateWrite">
        <TextInput v-model="form.name" id="title" label="İsim" />
        <TextInput v-model="form.slug" id="slug" label="Slug" />
        <Button type="submit">Kategoriyi Güncelle</Button>
      </CForm>
      <Button @click="deleteCategory(props.category.id)" variant="outline" class="m-2 ml-auto text-black">
        Kategoriyi Sil
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import CForm from '@/Components/CekapUI/Forms/CForm.vue';
import TextInput from '@/Components/CekapUI/Inputs/CTextInput.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

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
