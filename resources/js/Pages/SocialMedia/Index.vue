<template>
  <Head title="Sosyal Medya Yönetimi" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Sosyal Medya Yönetimi</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Flash Messages -->
        <div v-if="$page.props.flash.message" class="mb-4">
          <div class="rounded-md bg-green-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">{{ $page.props.flash.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="$page.props.flash.error" class="mb-4">
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ $page.props.flash.error }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <!-- Add/Edit Form -->
            <form @submit.prevent="submitForm" class="mb-8 space-y-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <InputLabel for="platform" value="Platform" />
                  <select
                    id="platform"
                    v-model="form.platform"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    required
                  >
                    <option value="">Platform Seçin</option>
                    <option v-for="(icon, platform) in availablePlatforms" :key="platform" :value="platform">
                      {{ platform }}
                    </option>
                  </select>
                  <InputError :message="form.errors.platform" class="mt-2" />
                </div>

                <div>
                  <InputLabel for="url" value="URL" />
                  <TextInput id="url" v-model="form.url" type="url" class="mt-1 block w-full" required />
                  <InputError :message="form.errors.url" class="mt-2" />
                </div>

                <div class="flex items-end space-x-2">
                  <PrimaryButton :disabled="form.processing">
                    {{ editingId ? 'Güncelle' : 'Ekle' }}
                  </PrimaryButton>
                  <SecondaryButton v-if="editingId" @click="cancelEdit" type="button"> İptal </SecondaryButton>
                </div>
              </div>
            </form>

            <!-- Social Media Links List -->
            <div class="mt-6 overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"
                    >
                      Platform
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"
                    >
                      URL
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"
                    >
                      Durum
                    </th>
                    <th
                      class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"
                    >
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="link in socialMedia" :key="link.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="whitespace-nowrap px-4 py-4 md:px-6">
                      <div class="flex items-center">
                        <i :class="['mr-2', `fab fa-${getPlatformIcon(link.platform)}`]"></i>
                        {{ formatPlatformName(link.platform) }}
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 md:px-6">
                      <a
                        :href="link.url"
                        target="_blank"
                        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {{ link.url }}
                      </a>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 md:px-6">
                      <button
                        @click="toggleStatus(link)"
                        :class="[
                          'rounded px-2 py-1 text-sm font-medium',
                          link.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                        ]"
                      >
                        {{ link.is_active ? 'Aktif' : 'Pasif' }}
                      </button>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-right md:px-6">
                      <button
                        @click="startEdit(link)"
                        class="mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Düzenle
                      </button>
                      <button
                        @click="deleteLink(link)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Sil
                      </button>
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
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const availablePlatforms = {
  Instagram: 'instagram',
  Youtube: 'youtube',
  Github: 'github',
  Linkedin: 'linkedin',
  Medium: 'medium',
  Twitter: 'twitter',
  X: 'twitter',
  Facebook: 'facebook',
  Tiktok: 'tiktok',
  Pinterest: 'pinterest',
};

const getPlatformIcon = (platform) => {
  return availablePlatforms[platform]?.toLowerCase() || 'link';
};

const formatPlatformName = (platform) => {
  return platform || '';
};

const props = defineProps({
  socialMedia: {
    type: Array,
    default: () => [],
  },
});

const editingId = ref(null);

const form = useForm({
  platform: '',
  url: '',
  is_active: true,
  order: 0,
});

const submitForm = () => {
  if (editingId.value) {
    form.put(`/social-media/${editingId.value}`, {
      preserveScroll: true,
      onSuccess: () => {
        editingId.value = null;
        form.reset();
      },
    });
  } else {
    form.post('/social-media', {
      preserveScroll: true,
      onSuccess: () => form.reset(),
    });
  }
};

const startEdit = (link) => {
  editingId.value = link.id;
  form.platform = link.platform;
  form.url = link.url;
  form.is_active = link.is_active;
  form.order = link.order;
};

const cancelEdit = () => {
  editingId.value = null;
  form.reset();
};

const toggleStatus = (link) => {
  form.put(
    `/social-media/${link.id}`,
    {
      ...link,
      is_active: !link.is_active,
    },
    {
      preserveScroll: true,
    }
  );
};

const deleteLink = (link) => {
  if (confirm('Bu sosyal medya linkini silmek istediğinizden emin misiniz?')) {
    form.delete(`/social-media/${link.id}`, {
      preserveScroll: true,
    });
  }
};
</script>
