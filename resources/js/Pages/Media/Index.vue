<template>
  <Head title="Medya Yönetimi" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Medya Yönetimi</h2>
    </template>

    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Resim Yükleme Bölümü -->
        <div class="mb-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Resim Yükleme</h3>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitImages" class="space-y-6">
              <!-- Kategori Seçimi -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Kategori
                </label>
                <select
                  id="category"
                  v-model="form.category"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <option v-for="(name, value) in categories" :key="value" :value="value">
                    {{ name }}
                  </option>
                </select>
              </div>

              <!-- İlişkili İçerik Seçimi (Yazı seçimi kategori 'writes' olduğunda görünür) -->
              <div v-if="form.category === 'writes'">
                <label for="related_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Yazı Seçin
                </label>
                <select
                  id="related_id"
                  v-model="form.related_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="">Yazı Seçin (Opsiyonel)</option>
                  <option v-for="write in writes" :key="write.id" :value="write.id">
                    {{ write.title }}
                  </option>
                </select>
              </div>

              <!-- Resim Yükleme Alanı -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Resimler </label>
                <div
                  class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600"
                >
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        for="images"
                        class="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 dark:bg-gray-800 dark:text-blue-400"
                      >
                        <span>Resim Yükle</span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          class="sr-only"
                          @change="handleImageUpload"
                        />
                      </label>
                      <p class="pl-1">veya sürükleyip bırakın</p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF - max 5MB</p>
                  </div>
                </div>
              </div>

              <!-- Önizleme Resimleri -->
              <div v-if="previewImages.length > 0" class="preview-container space-y-4">
                <div
                  v-for="(image, index) in previewImages"
                  :key="index"
                  class="relative rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div class="flex gap-4">
                    <!-- Resim Önizleme -->
                    <div class="relative h-32 w-32">
                      <img
                        :src="image.preview"
                        class="h-full w-full rounded-lg object-cover"
                        :alt="`Preview ${index + 1}`"
                      />
                      <button
                        type="button"
                        @click="removePreviewImage(index)"
                        class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Başlık ve Alt Text Alanları -->
                    <div class="flex-1 space-y-4">
                      <div>
                        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"> Başlık </label>
                        <input
                          v-model="image.title"
                          type="text"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          placeholder="Resim başlığı"
                        />
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Alt Text
                        </label>
                        <input
                          v-model="image.alt_text"
                          type="text"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          placeholder="Resim açıklaması"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Hata ve Başarı Mesajları -->
              <div v-if="imageUploadError" class="rounded-md bg-red-50 p-4 dark:bg-red-900">
                <p class="text-sm text-red-700 dark:text-red-200">{{ imageUploadError }}</p>
              </div>
              <div v-if="uploadSuccess" class="rounded-md bg-green-50 p-4 dark:bg-green-900">
                <p class="text-sm text-green-700 dark:text-green-200">Resimler başarıyla yüklendi!</p>
              </div>

              <!-- Submit Butonu -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="form.processing || !form.images.length"
                  class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
                >
                  <svg v-if="form.processing" class="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {{ form.processing ? 'Yükleniyor...' : 'Resimleri Yükle' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Yüklenen Resimler Listesi -->
        <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Yüklenen Resimler</h3>
              <!-- Kategori Filtresi -->
              <select
                v-model="selectedCategory"
                class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Tüm Kategoriler</option>
                <option v-for="(name, value) in categories" :key="value" :value="value">
                  {{ name }}
                </option>
              </select>
            </div>
          </div>
          <div class="p-6">
            <div v-if="filteredImages.length > 0" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              <div
                v-for="image in filteredImages"
                :key="image.id"
                class="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <img :src="image.image_path" class="h-full w-full object-cover" :alt="image.alt_text" />

                <!-- Normal Görünüm -->
                <div
                  class="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 transition-all group-hover:translate-y-full"
                >
                  <p class="truncate text-sm text-white">{{ image.title }}</p>
                  <p class="mt-1 text-xs text-gray-300">{{ categories[image.category] }}</p>
                </div>

                <!-- Düzenleme Görünümü -->
                <div
                  class="absolute inset-0 flex flex-col bg-black bg-opacity-75 p-3 opacity-0 transition-all group-hover:opacity-100"
                >
                  <div class="flex-1 space-y-2">
                    <div>
                      <label class="block text-xs font-medium text-gray-300">Başlık</label>
                      <input
                        v-model="image.title"
                        type="text"
                        class="mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400"
                        @change="updateImage(image)"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-300">Alt Text</label>
                      <input
                        v-model="image.alt_text"
                        type="text"
                        class="mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400"
                        @change="updateImage(image)"
                      />
                    </div>
                  </div>
                  <div class="flex justify-end space-x-2 pt-2">
                    <!-- Copy Button -->
                    <button
                      @click="copyImagePath(image.full_url)"
                      class="rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600"
                      title="Resim URL'sini kopyala"
                    >
                      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path
                          d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                        />
                      </svg>
                    </button>
                    <!-- Delete Button -->
                    <button
                      @click="deleteImage(image.id)"
                      class="rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      title="Resmi sil"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 dark:text-gray-400">
              {{ selectedCategory ? 'Bu kategoride resim bulunamadı.' : 'Henüz resim yüklenmemiş.' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-800 px-4 py-2 text-white shadow-lg">
      <div class="flex items-center">
        <svg
          class="mr-2 h-5 w-5 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        {{ toastMessage }}
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import Sortable from 'sortablejs';
import axios from 'axios';
import { useForm } from '@inertiajs/vue3';

interface Write {
  id: string;
  title: string;
}

interface WriteImage {
  id: string;
  category: string;
  related_id: string | null;
  image_path: string;
  full_url: string;
  order: number;
  alt_text: string;
  title: string;
}

interface PreviewImage {
  file: File;
  preview: string;
  title: string;
  alt_text: string;
}

interface Props {
  writes: Write[];
  uploadedImages: WriteImage[];
  categories: Record<string, string>;
}

interface FormData {
  category: string;
  related_id: string | null;
  images: File[];
  processing: boolean;
}

const props = defineProps<Props>();

const form = ref<FormData>({
  category: 'base',
  related_id: null,
  images: [],
  processing: false,
});

const previewImages = ref<PreviewImage[]>([]);
const imageUploadError = ref<string | null>(null);
const uploadSuccess = ref(false);
const uploadedImages = ref<WriteImage[]>(props.uploadedImages);
const selectedCategory = ref('');
const showToast = ref(false);
const toastMessage = ref('');

// Filtrelenmiş resimler
const filteredImages = computed(() => {
  if (!selectedCategory.value) {
    return uploadedImages.value;
  }
  return uploadedImages.value.filter((img) => img.category === selectedCategory.value);
});

// Resim önizleme ve yükleme işlemleri
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    Array.from(input.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push({
          file,
          preview: e.target?.result as string,
          title: file.name,
          alt_text: file.name,
        });
        form.value.images.push(file);
      };
      reader.readAsDataURL(file);
    });
  }
  input.value = '';
};

// Resimleri yükle
const submitImages = async () => {
  if (form.value.category === 'writes' && !form.value.related_id) {
    form.value.related_id = null;
  }

  form.value.processing = true;
  const formData = new FormData();
  formData.append('category', form.value.category);
  if (form.value.related_id) {
    formData.append('related_id', form.value.related_id);
  }

  // Resimleri ve ilgili bilgileri ekle
  form.value.images.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
    formData.append(`titles[${index}]`, previewImages.value[index].title);
    formData.append(`alt_texts[${index}]`, previewImages.value[index].alt_text);
  });

  try {
    const response = await axios.post(route('write-images.store'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    uploadedImages.value = [...uploadedImages.value, ...response.data.images];
    previewImages.value = [];
    form.value.images = [];
    form.value.related_id = null;
    uploadSuccess.value = true;
    setTimeout(() => {
      uploadSuccess.value = false;
    }, 3000);
  } catch (error: any) {
    const message = error.response?.data?.message || 'Resimler yüklenirken bir hata oluştu.';
    imageUploadError.value = message;
  } finally {
    form.value.processing = false;
  }
};

// Resim sil
const deleteImage = async (imageId: string) => {
  try {
    await axios.delete(route('write-images.destroy', imageId));
    uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId);
  } catch (error: any) {
    const message = error.response?.data?.message || 'Resim silinirken bir hata oluştu.';
    imageUploadError.value = message;
  }
};

// Önizleme resmini kaldır
const removePreviewImage = (index: number) => {
  previewImages.value.splice(index, 1);
  form.value.images.splice(index, 1);
};

// Önizleme resimlerini sıralama
onMounted(() => {
  const previewContainer = document.querySelector('.preview-container');
  if (previewContainer instanceof HTMLElement) {
    new Sortable(previewContainer, {
      animation: 150,
      onEnd(evt) {
        if (typeof evt.oldIndex === 'number' && typeof evt.newIndex === 'number') {
          const items = [...previewImages.value];
          const movedItem = items[evt.oldIndex];
          items.splice(evt.oldIndex, 1);
          items.splice(evt.newIndex, 0, movedItem);
          previewImages.value = items;

          // Form'daki resimleri de güncelle
          form.value.images = previewImages.value.map((item) => item.file);
        }
      },
    });
  }
});

// Toast gösterme fonksiyonu
const showToastMessage = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Resim yolunu kopyalama fonksiyonu
const copyImagePath = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    showToastMessage("Resim URL'si kopyalandı!");
  } catch (err) {
    showToastMessage("Resim URL'si kopyalanırken bir hata oluştu.");
  }
};

// Resim bilgilerini güncelle
const updateImage = async (image: WriteImage) => {
  try {
    const response = await axios.put(route('write-images.update', image.id), {
      title: image.title,
      alt_text: image.alt_text,
    });

    // Başarılı güncelleme mesajı göster
    showToastMessage('Resim bilgileri güncellendi');

    // Resmi listede güncelle
    const index = uploadedImages.value.findIndex((img) => img.id === image.id);
    if (index !== -1) {
      uploadedImages.value[index] = response.data.image;
    }
  } catch (error: any) {
    const message = error.response?.data?.message || 'Resim bilgileri güncellenirken bir hata oluştu.';
    showToastMessage(message);
  }
};
</script>
