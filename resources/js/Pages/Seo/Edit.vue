<template>
  <Head title="SEO Ayarları" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">SEO Ayarları</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <div class="mb-6">
              <h3 class="text-lg font-semibold">Ana Sayfa SEO Ayarları</h3>
              <p class="mt-2 text-sm text-gray-500">
                Bu ayarlar sitenizin ana sayfasında kullanılacak SEO bilgilerini içerir.
              </p>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <InputLabel for="route" value="Route" />
                <TextInput id="route" type="text" class="mt-1 block w-full bg-gray-100" v-model="form.route" disabled />
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
                <p class="mt-1 text-sm text-gray-500">Virgülle ayırarak birden fazla anahtar kelime girebilirsiniz.</p>
              </div>

              <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h4 class="mb-4 text-lg font-medium">Open Graph Ayarları</h4>

                <div class="space-y-4">
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
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h4 class="mb-4 text-lg font-medium">Gelişmiş Ayarlar</h4>

                <div class="space-y-4">
                  <div>
                    <InputLabel for="canonical_url" value="Canonical URL" />
                    <TextInput id="canonical_url" type="text" class="mt-1 block w-full" v-model="form.canonical_url" />
                    <InputError :message="form.errors.canonical_url" class="mt-2" />
                  </div>

                  <div>
                    <InputLabel for="robots" value="Robots" />
                    <TextInput id="robots" type="text" class="mt-1 block w-full" v-model="form.robots" />
                    <InputError :message="form.errors.robots" class="mt-2" />
                    <p class="mt-1 text-sm text-gray-500">Örnek: index, follow</p>
                  </div>

                  <div>
                    <InputLabel for="schema_org" value="Schema.org JSON" />
                    <TextArea id="schema_org" class="mt-1 block w-full font-mono" v-model="form.schema_org" />
                    <InputError :message="form.errors.schema_org" class="mt-2" />
                    <p class="mt-1 text-sm text-gray-500">Geçerli bir JSON formatında olmalıdır.</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
                <PrimaryButton :disabled="form.processing"> Değişiklikleri Kaydet </PrimaryButton>
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

const props = defineProps({
  seo: {
    type: Object,
    required: true,
  },
});

const form = useForm({
  route: props.seo.route,
  title: props.seo.title,
  description: props.seo.description,
  keywords: props.seo.keywords,
  og_title: props.seo.og_title,
  og_description: props.seo.og_description,
  og_image: props.seo.og_image,
  canonical_url: props.seo.canonical_url,
  robots: props.seo.robots,
  schema_org: props.seo.schema_org,
});

const submit = () => {
  form.put(route('seo.update', props.seo.id));
};
</script>
