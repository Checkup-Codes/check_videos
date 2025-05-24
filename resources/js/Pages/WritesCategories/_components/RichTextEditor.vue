<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <div class="relative">
      <div
        ref="quillEditor"
        class="ql-editor min-h-[300px] rounded border border-base-300 bg-base-100 p-3"
        :class="{ 'border-error': error }"
        :style="{ height }"
      ></div>
    </div>
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, defineProps, defineEmits } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '@/Shared/Css/quill-custom-styles.css';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  placeholder: { type: String, default: 'İçeriği buraya yazın...' },
  height: { type: String, default: '400px' },
});
const emit = defineEmits(['update:modelValue']);

const quillEditor = ref(null);
let quill;
let isInitialContentSet = false;

onMounted(() => {
  quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['clean'],
      ],
    },
    placeholder: props.placeholder,
    bounds: quillEditor.value,
  });

  quill.on('text-change', () => {
    try {
      const content = quill.root.innerHTML;
      emit('update:modelValue', content);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Content update error:', error);
    }
  });

  setTimeout(() => {
    if (props.modelValue && !isInitialContentSet) {
      try {
        quill.root.innerHTML = props.modelValue;
        isInitialContentSet = true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Initial content load error:', error);
      }
    }
  }, 100);

  quillEditor.value.style.height = props.height;
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (quill && newValue !== quill.root.innerHTML) {
      try {
        quill.root.innerHTML = newValue || '';
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Content update error in watcher:', error);
      }
    }
  }
);

onUnmounted(() => {
  if (quill) {
    quill = null;
  }
});
</script>
