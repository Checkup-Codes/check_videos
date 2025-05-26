<template>
  <Head title="Yeni SEO Kaydı" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Yeni SEO Kaydı</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <InputLabel for="route" value="Route" />
                <TextInput id="route" type="text" class="mt-1 block w-full" v-model="form.route" required />
                <InputError :message="form.errors.route" class="mt-2" />
              </div>

              <div>
                <InputLabel for="title" value="Başlık" />
                <TextInput id="title" type="text" class="mt-1 block w-full" v-model="form.title" required />
                <InputError :message="form.errors.title" class="mt-2" />
              </div>

              <div>
                <InputLabel for="description" value="Açıklama" />
                <TextArea id="description" class="mt-1 block w-full" v-model="form.description" required />
                <InputError :message="form.errors.description" class="mt-2" />
              </div>

              <div>
                <InputLabel for="keywords" value="Anahtar Kelimeler" />
                <TextInput id="keywords" type="text" class="mt-1 block w-full" v-model="form.keywords" />
                <InputError :message="form.errors.keywords" class="mt-2" />
              </div>

              <div>
                <InputLabel for="og_title" value="OG Başlık" />
                <TextInput id="og_title" type="text" class="mt-1 block w-full" v-model="form.og_title" />
                <InputError :message="form.errors.og_title" class="mt-2" />
              </div>

              <div>
                <InputLabel for="og_description" value="OG Açıklama" />
                <TextArea id="og_description" class="mt-1 block w-full" v-model="form.og_description" />
                <InputError :message="form.errors.og_description" class="mt-2" />
              </div>

              <div>
                <InputLabel for="og_image" value="OG Görsel URL" />
                <TextInput id="og_image" type="text" class="mt-1 block w-full" v-model="form.og_image" />
                <InputError :message="form.errors.og_image" class="mt-2" />
              </div>

              <div>
                <InputLabel for="canonical_url" value="Canonical URL" />
                <TextInput id="canonical_url" type="text" class="mt-1 block w-full" v-model="form.canonical_url" />
                <InputError :message="form.errors.canonical_url" class="mt-2" />
              </div>

              <div>
                <InputLabel for="robots" value="Robots" />
                <TextInput id="robots" type="text" class="mt-1 block w-full" v-model="form.robots" />
                <InputError :message="form.errors.robots" class="mt-2" />
              </div>

              <div>
                <InputLabel for="schema_org" value="Schema.org JSON" />
                <TextArea id="schema_org" class="mt-1 block w-full" v-model="form.schema_org" />
                <InputError :message="form.errors.schema_org" class="mt-2" />
              </div>

              <div class="mt-4 flex items-center justify-end">
                <PrimaryButton class="ms-4" :disabled="form.processing"> Kaydet </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';

const form = useForm({
  route: '',
  title: '',
  description: '',
  keywords: '',
  og_title: '',
  og_description: '',
  og_image: '',
  canonical_url: '',
  robots: 'index, follow',
  schema_org: '',
});

const submit = () => {
  form.post(route('seo.store'));
};
</script>
