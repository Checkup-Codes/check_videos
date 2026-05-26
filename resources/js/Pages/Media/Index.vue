<template>
  <Head title="Medya Yönetimi" />

  <CheckScreen>
    <PageShell width="wide" class="space-y-6">
      <PageHeader title="Medya Yönetimi" description="Tüm görselleri yükleyin, düzenleyin ve yönetin" />

      <!-- Yükleme -->
      <section class="rounded-lg border border-border bg-card">
        <div class="border-b border-border px-4 py-3 sm:px-6">
          <h2 class="text-sm font-semibold text-foreground">Resim Yükle</h2>
        </div>
        <div class="p-4 sm:p-6">
          <form class="space-y-5" @submit.prevent="submitImages">
            <div class="space-y-2">
              <label for="category" class="text-xs font-medium text-foreground">Kategori</label>
              <select id="category" v-model="form.category" :class="inputClass">
                <option v-for="(name, value) in categories" :key="value" :value="value">{{ name }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <span class="text-xs font-medium text-foreground">Dosyalar</span>
              <label
                class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-primary/40 hover:bg-muted/50"
              >
                <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="mt-2 text-sm font-medium text-foreground">Resim seç veya sürükle</span>
                <span class="mt-1 text-xs text-muted-foreground">PNG, JPG, GIF, WEBP — en fazla 5MB</span>
                <input id="images" type="file" multiple accept="image/*" class="sr-only" @change="handleImageUpload" />
              </label>
            </div>

            <div v-if="previewImages.length > 0" class="preview-container space-y-3">
              <div
                v-for="(image, index) in previewImages"
                :key="index"
                class="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div class="flex gap-4">
                  <div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border">
                    <img :src="image.preview" class="h-full w-full object-cover" :alt="`Önizleme ${index + 1}`" />
                    <button
                      type="button"
                      class="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-muted-foreground shadow-sm hover:text-destructive"
                      @click="removePreviewImage(index)"
                    >
                      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                    <div class="space-y-1.5">
                      <label class="text-xs font-medium text-foreground">Başlık</label>
                      <input v-model="image.title" type="text" :class="inputClass" placeholder="Resim başlığı" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-medium text-foreground">Alt metin</label>
                      <input v-model="image.alt_text" type="text" :class="inputClass" placeholder="Açıklama" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="imageUploadError" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {{ imageUploadError }}
            </div>
            <div
              v-if="uploadSuccess"
              class="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400"
            >
              Resimler başarıyla yüklendi.
            </div>

            <div class="flex justify-end">
              <button type="submit" :disabled="form.processing || !form.images.length" :class="primaryBtnClass">
                <svg v-if="form.processing" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ form.processing ? 'Yükleniyor...' : 'Yükle' }}
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Galeri -->
      <section class="rounded-lg border border-border bg-card">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
          <div>
            <h2 class="text-sm font-semibold text-foreground">Tüm Resimler</h2>
            <p class="text-xs text-muted-foreground">{{ filteredImages.length }} kayıt</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <select v-model="selectedSource" :class="[inputClass, 'w-auto min-w-[140px]']">
              <option value="">Tüm kaynaklar</option>
              <option v-for="(name, value) in sources" :key="value" :value="value">{{ name }}</option>
            </select>
            <select v-model="selectedCategory" :class="[inputClass, 'w-auto min-w-[140px]']">
              <option value="">Tüm kategoriler</option>
              <option v-for="(name, value) in allCategories" :key="value" :value="value">{{ name }}</option>
            </select>
          </div>
        </div>

        <div class="p-4 sm:p-6">
          <div
            v-if="filteredImages.length > 0"
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <div
              v-for="(image, imageIndex) in filteredImages"
              :key="image.id"
              class="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20"
            >
              <ZoomableImage
                :src="image.image_path"
                :alt="image.alt_text || image.title || ''"
                :gallery="filteredImages"
                :index="imageIndex"
                wrapper-class="h-full w-full"
                img-class="h-full w-full object-cover"
              />

              <div class="pointer-events-none absolute left-2 top-2">
                <span :class="['inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium', getSourceBadgeClass(image.source)]">
                  {{ image.source_label }}
                </span>
              </div>

              <div
                class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-2 pb-2 pt-6 opacity-100 transition-opacity group-hover:opacity-0"
              >
                <p class="truncate text-xs font-medium text-foreground">{{ image.title }}</p>
                <p class="truncate text-[10px] text-muted-foreground">{{ image.category_label }}</p>
              </div>

              <div
                class="absolute inset-0 flex flex-col bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <div v-if="image.editable" class="min-h-0 flex-1 space-y-2 overflow-y-auto">
                  <div class="space-y-1">
                    <label class="text-[10px] font-medium text-muted-foreground">Başlık</label>
                    <input
                      v-model="image.title"
                      type="text"
                      :class="[inputClass, 'h-8 text-xs']"
                      @change="updateImage(image)"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-medium text-muted-foreground">Alt metin</label>
                    <input
                      v-model="image.alt_text"
                      type="text"
                      :class="[inputClass, 'h-8 text-xs']"
                      @change="updateImage(image)"
                    />
                  </div>
                </div>
                <div v-else class="min-h-0 flex-1 overflow-y-auto">
                  <p class="text-xs font-medium text-foreground">{{ image.title }}</p>
                  <p v-if="image.related_title" class="mt-0.5 text-[10px] text-muted-foreground">{{ image.related_title }}</p>
                  <p class="mt-2 text-[10px] text-muted-foreground">{{ image.source_label }} üzerinden yönetilir</p>
                </div>

                <div class="mt-2 flex justify-end gap-1 pt-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    title="URL kopyala"
                    @click="copyImagePath(image.full_url)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="image.deletable"
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
                    title="Sil"
                    @click="deleteImage(image.id)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-12 text-center"
          >
            <svg class="h-10 w-10 text-muted-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p class="mt-3 text-sm text-muted-foreground">
              {{ selectedSource || selectedCategory ? 'Bu filtreye uygun resim yok.' : 'Henüz resim yüklenmemiş.' }}
            </p>
          </div>
        </div>
      </section>
    </PageShell>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="translate-y-2 opacity-0"
      leave-active-class="transition-all duration-150"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-popover px-4 py-2.5 text-sm text-popover-foreground shadow-lg"
      >
        <svg class="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ toastMessage }}
      </div>
    </Transition>
  </CheckScreen>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import Sortable from 'sortablejs';
import axios from 'axios';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import PageShell from '@/Components/CekapUI/Layout/PageShell.vue';
import PageHeader from '@/Components/CekapUI/Layout/PageHeader.vue';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';

const inputClass =
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

const primaryBtnClass =
  'inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50';

interface Write {
  id: string;
  title: string;
}

interface MediaImage {
  id: string;
  source: string;
  source_label: string;
  category: string;
  category_label: string;
  image_path: string;
  full_url: string;
  title: string;
  alt_text: string;
  related_title: string | null;
  created_at: string;
  deletable: boolean;
  editable: boolean;
}

interface PreviewImage {
  file: File;
  preview: string;
  title: string;
  alt_text: string;
}

interface Props {
  writes: Write[];
  uploadedImages: MediaImage[];
  categories: Record<string, string>;
  sources: Record<string, string>;
}

const props = defineProps<Props>();

const form = ref({
  category: 'base',
  related_id: null as string | null,
  images: [] as File[],
  processing: false,
});

const previewImages = ref<PreviewImage[]>([]);
const imageUploadError = ref<string | null>(null);
const uploadSuccess = ref(false);
const uploadedImages = ref<MediaImage[]>(props.uploadedImages);
const selectedCategory = ref('');
const selectedSource = ref('');
const showToast = ref(false);
const toastMessage = ref('');

const allCategories = computed(() => {
  const cats = { ...props.categories };
  cats['journey'] = 'Yolculuk';
  cats['workspace'] = 'Çalışma Alanı';
  cats['certificates'] = 'Sertifikalar';
  cats['seo'] = 'SEO';
  return cats;
});

const filteredImages = computed(() => {
  let images = uploadedImages.value;

  if (selectedSource.value) {
    images = images.filter((img) => img.source === selectedSource.value);
  }

  if (selectedCategory.value) {
    images = images.filter((img) => img.category === selectedCategory.value);
  }

  return images;
});

const getSourceBadgeClass = (source: string) => {
  const classes: Record<string, string> = {
    write_images: 'border-primary/30 bg-primary/10 text-primary',
    journey: 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300',
    workspace: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    seo: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
  };
  return classes[source] || 'border-border bg-muted text-muted-foreground';
};

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

const submitImages = async () => {
  form.value.processing = true;
  imageUploadError.value = null;

  const formData = new FormData();
  formData.append('category', form.value.category);
  if (form.value.related_id) {
    formData.append('related_id', form.value.related_id);
  }

  form.value.images.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
    formData.append(`titles[${index}]`, previewImages.value[index].title);
    formData.append(`alt_texts[${index}]`, previewImages.value[index].alt_text);
  });

  try {
    const response = await axios.post(route('write-images.store'), formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest' },
    });

    const newImages = response.data.images.map((img: any) => ({
      id: img.id,
      source: 'write_images',
      source_label: 'Medya',
      category: img.category,
      category_label: props.categories[img.category] || img.category,
      image_path: img.image_path,
      full_url: img.full_url,
      title: img.title,
      alt_text: img.alt_text,
      related_title: null,
      created_at: new Date().toISOString(),
      deletable: true,
      editable: true,
    }));

    uploadedImages.value = [...newImages, ...uploadedImages.value];
    previewImages.value = [];
    form.value.images = [];
    form.value.related_id = null;
    uploadSuccess.value = true;
    setTimeout(() => {
      uploadSuccess.value = false;
    }, 3000);
  } catch (error: any) {
    imageUploadError.value = error.response?.data?.message || 'Resimler yüklenirken bir hata oluştu.';
  } finally {
    form.value.processing = false;
  }
};

const deleteImage = async (imageId: string) => {
  try {
    await axios.delete(route('write-images.destroy', imageId));
    uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId);
    showToastMessage('Resim silindi');
  } catch (error: any) {
    showToastMessage(error.response?.data?.message || 'Resim silinirken bir hata oluştu.');
  }
};

const removePreviewImage = (index: number) => {
  previewImages.value.splice(index, 1);
  form.value.images.splice(index, 1);
};

const showToastMessage = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const copyImagePath = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    showToastMessage('URL kopyalandı');
  } catch {
    showToastMessage('Kopyalama başarısız');
  }
};

const updateImage = async (image: MediaImage) => {
  if (!image.editable) return;

  try {
    await axios.put(route('write-images.update', image.id), {
      title: image.title,
      alt_text: image.alt_text,
    });
    showToastMessage('Güncellendi');
  } catch (error: any) {
    showToastMessage(error.response?.data?.message || 'Güncelleme başarısız');
  }
};

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
          form.value.images = previewImages.value.map((item) => item.file);
        }
      },
    });
  }
});
</script>
