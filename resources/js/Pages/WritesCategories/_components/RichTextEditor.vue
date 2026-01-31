<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 block text-sm font-medium text-foreground">{{ label }}</label>
    <div 
      ref="editorContainer" 
      class="quill-editor-container rounded-md border border-input bg-background"
      :style="{ height: height }"
    ></div>
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
  height: { type: String, default: '500px' }, // Increased default height
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

  // Toolbar'ı sticky yap ve container'a height ayarla
  const toolbar = editorContainer.value.querySelector('.ql-toolbar');
  const container = editorContainer.value.querySelector('.ql-container');
  
  if (toolbar) {
    toolbar.style.position = 'sticky';
    toolbar.style.top = '0';
    toolbar.style.zIndex = '10';
    toolbar.style.backgroundColor = 'hsl(var(--background))';
    toolbar.style.borderBottom = '1px solid hsl(var(--border))';
  }
  
  if (container) {
    // Container height = total height - toolbar height
    const toolbarHeight = toolbar ? toolbar.offsetHeight : 42;
    container.style.height = `calc(${props.height} - ${toolbarHeight}px)`;
    container.style.overflowY = 'auto';
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

<style scoped>
.quill-editor-container {
  display: flex;
  flex-direction: column;
}

/* Ensure toolbar stays at top */
.quill-editor-container :deep(.ql-toolbar) {
  flex-shrink: 0;
  border-radius: 0.375rem 0.375rem 0 0;
}

/* Ensure container scrolls */
.quill-editor-container :deep(.ql-container) {
  flex: 1;
  border-radius: 0 0 0.375rem 0.375rem;
}

/* Custom scrollbar for better UX */
.quill-editor-container :deep(.ql-container)::-webkit-scrollbar {
  width: 8px;
}

.quill-editor-container :deep(.ql-container)::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 4px;
}

.quill-editor-container :deep(.ql-container)::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

.quill-editor-container :deep(.ql-container)::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>
