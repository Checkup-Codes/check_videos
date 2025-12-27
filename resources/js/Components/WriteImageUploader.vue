<template>
  <div class="rounded-lg border border-border bg-card">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border px-4 py-3">
      <h3 class="text-sm font-medium text-foreground">Resim Yükle</h3>
      <button
        type="button"
        @click="isExpanded = !isExpanded"
        class="text-muted-foreground hover:text-foreground"
      >
        <svg
          class="h-5 w-5 transition-transform"
          :class="{ 'rotate-180': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div v-show="isExpanded" class="p-4 space-y-4">
      <!-- Upload Area -->
      <div
        class="flex justify-center rounded-md border-2 border-dashed border-border px-4 py-6 transition-colors"
        :class="{ 'border-primary bg-primary/5': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-10 w-10 text-muted-foreground" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex text-sm text-muted-foreground">
            <label
              class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
            >
              <span>Resim Seç</span>
              <input
                type="file"
                multiple
                accept="image/*"
                class="sr-only"
                @change="handleFileSelect"
              />
            </label>
            <p class="pl-1">veya sürükle bırak</p>
          </div>
          <p class="text-xs text-muted-foreground">PNG, JPG, GIF - max 5MB</p>
        </div>
      </div>

      <!-- Upload Progress -->
      <div v-if="isUploading" class="flex items-center gap-2 text-sm text-muted-foreground">
        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Yükleniyor...
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
        {{ errorMessage }}
      </div>

      <!-- Uploaded Images Grid -->
      <div v-if="uploadedImages.length > 0" class="space-y-2">
        <p class="text-xs font-medium text-muted-foreground">Yüklenen Resimler (Editöre sürükleyin)</p>
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="image in uploadedImages"
            :key="image.id"
            class="group relative aspect-square overflow-hidden rounded-md border border-border cursor-grab active:cursor-grabbing"
            draggable="true"
            @dragstart="handleImageDragStart($event, image)"
          >
            <img
              :src="image.image_path"
              :alt="image.alt_text"
              class="h-full w-full object-cover"
            />
            <!-- Overlay -->
            <div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <!-- Copy URL -->
              <button
                type="button"
                @click="copyImageUrl(image.full_url)"
                class="rounded-full bg-primary p-1.5 text-primary-foreground hover:bg-primary/90"
                title="URL Kopyala"
              >
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <!-- Insert to Editor -->
              <button
                type="button"
                @click="insertToEditor(image)"
                class="rounded-full bg-green-600 p-1.5 text-white hover:bg-green-700"
                title="Editöre Ekle"
              >
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <!-- Delete -->
              <button
                type="button"
                @click="deleteImage(image.id)"
                class="rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90"
                title="Sil"
              >
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div
        v-if="toastMessage"
        class="fixed bottom-4 right-4 z-50 rounded-lg bg-foreground px-4 py-2 text-background shadow-lg"
      >
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  writeId: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    default: 'writes',
  },
});

const emit = defineEmits(['insert-image']);

const isExpanded = ref(true);
const isDragging = ref(false);
const isUploading = ref(false);
const errorMessage = ref('');
const toastMessage = ref('');
const uploadedImages = ref([]);

// Load existing images for this write
onMounted(async () => {
  if (props.writeId) {
    await loadImages();
  }
});

const loadImages = async () => {
  try {
    const response = await axios.get('/api/write-images', {
      params: {
        category: props.category,
        related_id: props.writeId,
      },
    });
    uploadedImages.value = response.data.images || [];
  } catch (error) {
    console.error('Failed to load images:', error);
  }
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    uploadFiles(Array.from(files));
  }
  event.target.value = '';
};

const handleDrop = (event) => {
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    uploadFiles(Array.from(files));
  }
};

const uploadFiles = async (files) => {
  isUploading.value = true;
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('category', props.category);
  if (props.writeId) {
    formData.append('related_id', props.writeId);
  }

  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
    formData.append(`titles[${index}]`, file.name);
    formData.append(`alt_texts[${index}]`, file.name);
  });

  try {
    const response = await axios.post('/write-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    uploadedImages.value = [...uploadedImages.value, ...response.data.images];
    showToast('Resimler yüklendi!');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Yükleme başarısız oldu.';
  } finally {
    isUploading.value = false;
  }
};

const deleteImage = async (imageId) => {
  try {
    await axios.delete(`/write-images/${imageId}`);
    uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId);
    showToast('Resim silindi');
  } catch (error) {
    errorMessage.value = 'Silme başarısız oldu.';
  }
};

const copyImageUrl = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    showToast('URL kopyalandı!');
  } catch (error) {
    showToast('Kopyalama başarısız');
  }
};

const insertToEditor = (image) => {
  emit('insert-image', image);
  showToast('Resim editöre eklendi');
};

const handleImageDragStart = (event, image) => {
  // Set data for drag operation - Quill can use this
  event.dataTransfer.setData('text/plain', image.full_url);
  event.dataTransfer.setData('text/html', `<img src="${image.full_url}" alt="${image.alt_text}" />`);
  event.dataTransfer.effectAllowed = 'copy';
};

const showToast = (message) => {
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = '';
  }, 2000);
};

// Expose method to add images from parent
defineExpose({
  uploadedImages,
  loadImages,
});
</script>
