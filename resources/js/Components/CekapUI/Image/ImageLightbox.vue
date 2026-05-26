<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="currentImage?.alt || 'Görsel önizleme'"
        @click.self="close"
      >
        <button
          type="button"
          class="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
          title="Kapat (Esc)"
          @click="close"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          v-if="state.images.length > 1"
          type="button"
          class="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
          title="Önceki"
          @click.stop="prev"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="state.images.length > 1"
          type="button"
          class="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
          title="Sonraki"
          @click.stop="next"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="flex max-h-full max-w-full flex-col items-center gap-2" @click.stop>
          <img
            :src="currentImage?.src"
            :alt="currentImage?.alt || ''"
            class="max-h-[calc(100vh-6rem)] max-w-full rounded-lg object-contain shadow-2xl"
          />
          <p v-if="currentImage?.alt" class="max-w-lg truncate text-center text-xs text-white/80">
            {{ currentImage.alt }}
          </p>
          <p v-if="state.images.length > 1" class="text-xs text-white/60">
            {{ state.index + 1 }} / {{ state.images.length }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useImageLightbox } from '@/composables/useImageLightbox';

const { state, close, next, prev } = useImageLightbox();

const currentImage = computed(() => state.images[state.index] || null);

const onKeydown = (event) => {
  if (!state.open) return;

  if (event.key === 'Escape') {
    close();
  } else if (event.key === 'ArrowRight') {
    next();
  } else if (event.key === 'ArrowLeft') {
    prev();
  }
};

watch(
  () => state.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
);

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>
