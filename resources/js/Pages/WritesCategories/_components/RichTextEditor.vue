<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 block text-sm font-medium text-foreground">{{ label }}</label>
    <div ref="editorContainer" class="quill-editor-container"></div>
    <p v-if="error" class="mt-1 text-xs text-destructive">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue';
import Quill from 'quill';
import '@/Shared/Css/quill-styles.css';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  placeholder: { type: String, default: 'İçeriği buraya yazın...' },
  height: { type: String, default: '400px' },
});

const emit = defineEmits(['update:modelValue']);

const editorContainer = ref(null);
let quill = null;

// Resim ekleme metodu - dışarıdan çağrılabilir
const insertImage = (imageUrl, altText = '') => {
  if (!quill) return;
  
  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'image', imageUrl);
  quill.setSelection(range.index + 1);
};

onMounted(async () => {
  await nextTick();

  if (!editorContainer.value) return;

  // Quill'i özelleştirilmiş toolbar ile oluştur
  quill = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: props.placeholder,
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
  });

  // Height ayarla
  if (props.height) {
    const container = editorContainer.value.querySelector('.ql-container');
    if (container) {
      container.style.height = props.height;
    }
  }

  // İlk içeriği yükle
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue;
  }

  // İçerik değişikliklerini dinle
  quill.on('text-change', () => {
    const content = quill.root.innerHTML;
    if (content === '<p><br></p>') {
      emit('update:modelValue', '');
    } else {
      emit('update:modelValue', content);
    }
  });
});

// ModelValue değişikliklerini dinle
watch(
  () => props.modelValue,
  (newValue) => {
    if (quill && quill.root.innerHTML !== newValue) {
      quill.root.innerHTML = newValue || '';
    }
  }
);

onUnmounted(() => {
  if (quill) {
    quill = null;
  }
});

// Dışarıya metodları aç
defineExpose({
  insertImage,
});
</script>
