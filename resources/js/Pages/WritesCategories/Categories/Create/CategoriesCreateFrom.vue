<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1>
      <FormDesc>Kategorileriniz için kategoriler oluşturun.</FormDesc>
      <Form @submit="createWrite">
        <TextInput v-model="form.name" id="name" label="İsim" />
        <TextInput v-model="form.slug" id="slug" label="Slug" />
        <Button type="submit">Kategori Oluştur</Button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import TextInput from '@/Components/CekapUI/Inputs/TextInput.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import Form from '@/Components/CekapUI/Forms/Form.vue';
import FormDesc from '@/Components/CekapUI/Typography/FromDesc.vue';

const form = useForm({
  name: '',
  slug: '',
});

const createWrite = () => {
  form.post(route('categories.store')).then(() => {});
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
</script>
