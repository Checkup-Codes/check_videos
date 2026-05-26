<template>
  <div :class="['group relative', wrapperClass]">
    <img
      :src="src"
      :alt="alt"
      :class="[imgClass, 'cursor-zoom-in']"
      @click="onImageClick"
    />
    <button
      type="button"
      class="absolute bottom-1 right-1 z-[1] flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background"
      title="Büyüt"
      @click.stop="openLightbox"
    >
      <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useImageLightbox } from '@/composables/useImageLightbox';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  imgClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
  gallery: {
    type: Array,
    default: () => [],
  },
  index: {
    type: Number,
    default: 0,
  },
});

const { open } = useImageLightbox();

const galleryImages = computed(() => {
  if (props.gallery?.length) {
    return props.gallery;
  }
  return [{ src: props.src, alt: props.alt }];
});

const openLightbox = () => {
  open(galleryImages.value, props.index);
};

const onImageClick = (event) => {
  event.stopPropagation();
  openLightbox();
};
</script>
