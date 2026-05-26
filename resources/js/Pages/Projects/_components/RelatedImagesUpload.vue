<template>
  <div class="space-y-2">
    <label class="block text-xs font-medium text-foreground">{{ label }}</label>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="(image, imageIndex) in images"
        :key="image.id"
        class="group relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30"
      >
        <ZoomableImage
          :src="image.image_path"
          :alt="image.alt_text || label"
          :gallery="images"
          :index="imageIndex"
          wrapper-class="h-full w-full"
          img-class="h-full w-full object-cover"
        />
        <button
          type="button"
          class="absolute right-0.5 top-0.5 z-[2] flex h-5 w-5 items-center justify-center rounded-full bg-background/90 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
          :disabled="deletingId === image.id"
          @click="removeImage(image)"
        >
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <label
        class="flex h-16 w-16 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        :class="{ 'pointer-events-none opacity-50': uploading }"
      >
        <input type="file" multiple accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml" class="hidden" @change="handleUpload" />
        <svg v-if="!uploading" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <svg v-else class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </label>
    </div>

    <p v-if="error" class="text-xs text-destructive">{{ error }}</p>
    <p class="text-xs text-muted-foreground">İlk görsel kapak olarak kullanılır. PNG, JPG, WEBP — en fazla 2MB</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';

const props = defineProps({
  entityId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Görseller',
  },
  initialImages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['updated']);

const images = ref([...props.initialImages]);
const uploading = ref(false);
const deletingId = ref(null);
const error = ref('');

watch(
  () => props.initialImages,
  (value) => {
    images.value = [...(value || [])];
  },
  { deep: true }
);

const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

const handleUpload = async (event) => {
  const files = Array.from(event.target.files || []);
  event.target.value = '';

  if (!files.length || !props.entityId) {
    return;
  }

  uploading.value = true;
  error.value = '';

  const formData = new FormData();
  formData.append('category', props.category);
  formData.append('related_id', props.entityId);
  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });

  try {
    const response = await axios.post(route('write-images.store'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken(),
      },
    });

    const uploaded = response.data?.images || [];
    images.value = [...images.value, ...uploaded];
    emit('updated', images.value);
  } catch (uploadError) {
    error.value = uploadError.response?.data?.message || 'Görseller yüklenemedi.';
  } finally {
    uploading.value = false;
  }
};

const removeImage = async (image) => {
  deletingId.value = image.id;
  error.value = '';

  try {
    await axios.delete(route('write-images.destroy', image.id), {
      headers: { 'X-CSRF-TOKEN': csrfToken() },
    });

    images.value = images.value.filter((item) => item.id !== image.id);
    emit('updated', images.value);
  } catch (deleteError) {
    error.value = deleteError.response?.data?.message || 'Görsel silinemedi.';
  } finally {
    deletingId.value = null;
  }
};
</script>
