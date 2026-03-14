<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 block text-sm font-medium text-foreground">{{ label }}</label>
    <div 
      ref="editorContainer" 
      class="quill-editor-container rounded-md border border-input bg-background"
      :style="{ height: height }"
    ></div>
    <p v-if="error" class="mt-1 text-xs text-destructive">{{ error }}</p>
    
    <!-- Pending Images Info -->
    <div v-if="pendingImages.length > 0" class="mt-2 rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
      <div class="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
        <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ pendingImages.length }} resim kaydetme bekliyor (Formu kaydettiğinizde yüklenecek)</span>
      </div>
    </div>
    
    <!-- Max File Size Info -->
    <p class="mt-1 text-xs text-muted-foreground">
      Maksimum dosya boyutu: 2MB. Desteklenen formatlar: JPEG, PNG, GIF, WebP, SVG
    </p>
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
  height: { type: String, default: '500px' },
});

const emit = defineEmits(['update:modelValue', 'images-changed']);

const editorContainer = ref(null);
let quill = null;

// Blob URL'leri ve gerçek dosyaları sakla
const pendingImages = ref([]);
const blobUrlMap = new Map(); // blob URL -> File mapping

// Resim ekleme metodu - dışarıdan çağrılabilir
const insertImage = (imageUrl, altText = '') => {
  if (!quill) return;
  
  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'image', imageUrl);
  quill.setSelection(range.index + 1);
};

// Dosyadan blob URL oluştur ve editöre ekle
const insertImageFromFile = (file) => {
  if (!quill) {
    console.error('Quill editor not initialized');
    return;
  }
  
  // File size validation (2MB = 2 * 1024 * 1024 bytes)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    alert(`Resim boyutu çok büyük: ${sizeMB}MB\n\nMaksimum dosya boyutu: 2MB\n\nLütfen resmi küçültüp tekrar deneyin.`);
    return;
  }
  
  console.log('Inserting image from file:', file.name, file.type, file.size);
  
  // FileReader ile data URL oluştur (blob yerine)
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    console.log('Created data URL, length:', dataUrl.length);
    
    // Pending images'a ekle (file'ı sakla)
    const imageData = {
      dataUrl,
      file,
      fileName: file.name,
    };
    
    pendingImages.value.push(imageData);
    console.log('Pending images count:', pendingImages.value.length);
    
    // Editöre ekle
    const range = quill.getSelection(true) || { index: quill.getLength() };
    console.log('Inserting at position:', range.index);
    
    quill.insertEmbed(range.index, 'image', dataUrl);
    quill.setSelection(range.index + 1);
    
    // Parent'a bildir
    emit('images-changed', pendingImages.value);
    
    console.log('Image inserted successfully');
  };
  
  reader.onerror = (error) => {
    console.error('FileReader error:', error);
  };
  
  // Data URL olarak oku
  reader.readAsDataURL(file);
};

// Pending images'ı al (form submit için)
const getPendingImages = () => {
  return pendingImages.value;
};

// Data URL'leri gerçek URL'lerle değiştir
const replaceDataUrls = (urlMapping) => {
  if (!quill) return;
  
  const delta = quill.getContents();
  let changed = false;
  
  delta.ops.forEach((op) => {
    if (op.insert && op.insert.image) {
      const dataUrl = op.insert.image;
      if (urlMapping[dataUrl]) {
        op.insert.image = urlMapping[dataUrl];
        changed = true;
      }
    }
  });
  
  if (changed) {
    quill.setContents(delta);
    emit('update:modelValue', quill.root.innerHTML);
  }
};

// Backward compatibility
const replaceBlobUrls = replaceDataUrls;

// Pending images'ı temizle
const clearPendingImages = () => {
  // Data URL'ler için revoke gerekmez, sadece listeyi temizle
  pendingImages.value = [];
  blobUrlMap.clear();
  emit('images-changed', []);
};

// İçerikteki tüm resim URL'lerini al
const getImagesInContent = () => {
  if (!quill) return [];
  
  const delta = quill.getContents();
  const images = [];
  
  delta.ops.forEach((op) => {
    if (op.insert && op.insert.image) {
      images.push(op.insert.image);
    }
  });
  
  return images;
};

onMounted(async () => {
  await nextTick();

  if (!editorContainer.value) return;

  // Quill'i özelleştirilmiş toolbar ile oluştur
  quill = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: props.placeholder,
    modules: {
      toolbar: {
        container: [
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
          ['link', 'image', 'video'], // Image button'ı geri ekledik
          ['clean'],
        ],
        handlers: {
          image: imageHandler, // Custom image handler
        },
      },
    },
  });

  // Toolbar'ı sticky yap ve container'a height ayarla
  const toolbar = editorContainer.value.querySelector('.ql-toolbar');
  const container = editorContainer.value.querySelector('.ql-container');
  const editor = editorContainer.value.querySelector('.ql-editor');
  
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
    container.style.overflow = 'hidden';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
  }
  
  if (editor) {
    // Editor should scroll independently
    editor.style.overflowY = 'auto';
    editor.style.overflowX = 'hidden';
    editor.style.flex = '1';
    editor.style.maxHeight = '100%';
  }

  // İlk içeriği yükle
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue;
  }

  // Scroll pozisyonunu sakla
  let preventScroll = false;
  let savedScrollTop = 0;

  // İçerik değişikliklerini dinle
  quill.on('text-change', (delta, oldDelta, source) => {
    const content = quill.root.innerHTML;
    if (content === '<p><br></p>') {
      emit('update:modelValue', '');
    } else {
      emit('update:modelValue', content);
    }
    
    // Eğer paste işlemi sonrası scroll engellenmişse, geri yükle
    if (preventScroll && editor) {
      requestAnimationFrame(() => {
        editor.scrollTop = savedScrollTop;
        preventScroll = false;
      });
    }
  });

  // Paste event - resim yapıştırma ve scroll önleme
  quill.root.addEventListener('paste', (e) => {
    // Mevcut scroll pozisyonunu kaydet
    if (editor) {
      savedScrollTop = editor.scrollTop;
      preventScroll = true;
    }
    
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Resim kontrolü
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          insertImageFromFile(file);
        }
        return; // Resim varsa diğer işlemleri yapma
      }
    }
    
    // Metin paste işlemi için scroll'u engelle
    setTimeout(() => {
      if (editor && preventScroll) {
        editor.scrollTop = savedScrollTop;
        preventScroll = false;
      }
    }, 0);
  });

  // Drop event - resim sürükleme
  quill.root.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.indexOf('image') !== -1) {
        insertImageFromFile(file);
      }
    }
  });

  // Drag over - drop için gerekli
  quill.root.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // Window scroll'unu engelle - editör focus'tayken
  let isEditorFocused = false;
  
  quill.on('selection-change', (range) => {
    isEditorFocused = range !== null;
  });
  
  // Global scroll event'ini yakala ve engelle
  const preventWindowScroll = (e) => {
    if (isEditorFocused && e.target === document) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };
  
  window.addEventListener('scroll', preventWindowScroll, { passive: false, capture: true });
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', preventWindowScroll, { capture: true });
  });
});

// Custom image handler - toolbar'daki image button'ı için
const imageHandler = () => {
  // Hidden file input oluştur
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.setAttribute('multiple', 'multiple'); // Çoklu seçim
  
  input.onchange = () => {
    const files = input.files;
    if (files && files.length > 0) {
      // Her dosyayı ekle
      Array.from(files).forEach(file => {
        if (file.type.indexOf('image') !== -1) {
          insertImageFromFile(file);
        }
      });
    }
  };
  
  input.click();
};

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
  // Pending images'ı temizle (data URL'ler için revoke gerekmez)
  clearPendingImages();
  
  if (quill) {
    quill = null;
  }
});

// Dışarıya metodları aç
defineExpose({
  insertImage,
  insertImageFromFile,
  getPendingImages,
  replaceBlobUrls,
  clearPendingImages,
  getImagesInContent,
  pendingImages,
});
</script>

<style scoped>
.quill-editor-container {
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent container from expanding */
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
  overflow: hidden; /* Prevent container from expanding */
  display: flex;
  flex-direction: column;
}

/* Ensure editor content scrolls independently */
.quill-editor-container :deep(.ql-editor) {
  overflow-y: auto !important;
  overflow-x: hidden;
  flex: 1;
  max-height: 100%;
}

/* Custom scrollbar for better UX */
.quill-editor-container :deep(.ql-editor)::-webkit-scrollbar {
  width: 8px;
}

.quill-editor-container :deep(.ql-editor)::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 4px;
}

.quill-editor-container :deep(.ql-editor)::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

.quill-editor-container :deep(.ql-editor)::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Also add scrollbar to container as fallback */
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
