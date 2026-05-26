import { reactive, readonly } from 'vue';

const state = reactive({
  open: false,
  images: [],
  index: 0,
});

function normalizeImages(images) {
  const list = Array.isArray(images) ? images : [images];

  return list
    .map((item) => {
      if (!item) return null;
      if (typeof item === 'string') {
        return { src: item, alt: '' };
      }
      return {
        src: item.src || item.image_path || '',
        alt: item.alt || item.alt_text || '',
      };
    })
    .filter((item) => item?.src);
}

export function useImageLightbox() {
  function open(images, index = 0) {
    const normalized = normalizeImages(images);
    if (!normalized.length) return;

    state.images = normalized;
    state.index = Math.min(Math.max(0, index), normalized.length - 1);
    state.open = true;
  }

  function close() {
    state.open = false;
  }

  function next() {
    if (state.images.length <= 1) return;
    state.index = (state.index + 1) % state.images.length;
  }

  function prev() {
    if (state.images.length <= 1) return;
    state.index = (state.index - 1 + state.images.length) % state.images.length;
  }

  return {
    state: readonly(state),
    open,
    close,
    next,
    prev,
  };
}
