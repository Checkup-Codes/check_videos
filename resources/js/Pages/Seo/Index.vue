<template>
  <Head title="SEO Yönetimi" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">SEO Yönetimi</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <div class="mb-6">
              <h3 class="text-lg font-semibold">SEO Ayarları</h3>
              <!-- Debug için veri kontrolü -->
              <div class="mt-2 text-sm text-gray-500">Toplam Kayıt: {{ seoData.length }}</div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    >
                      Route
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    >
                      Başlık
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    >
                      Açıklama
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    >
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="seo in seoData" :key="seo.id">
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ seo.route }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {{ seo.title }}
                    </td>
                    <td class="px-6 py-4">
                      {{ seo.description }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <div class="flex space-x-3">
                        <Link
                          v-if="seo.route === 'home'"
                          :href="route('seo.edit', seo.id)"
                          class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Düzenle
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { onMounted } from 'vue';

const props = defineProps({
  seoData: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  console.log('SEO Data:', props.seoData);
});
</script>
