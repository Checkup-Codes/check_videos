<template>
  <div class="relative h-full w-full">
    <!-- Save button - only for authenticated users -->
    <div v-if="props.auth.user" class="absolute left-32 top-[53px] z-10 lg:left-36 lg:top-4">
      <button
        @click="saveDrawToServer"
        class="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
          />
        </svg>
        Kaydet
      </button>
    </div>

    <!-- Flash message -->
    <div
      v-if="flashMessage"
      class="absolute left-32 top-[101px] z-20 rounded-lg border border-green-300 bg-green-100 px-3 py-2 text-sm text-green-800 shadow-lg lg:left-36 lg:top-16"
    >
      {{ flashMessage }}
    </div>

    <!-- Excalidraw container -->
    <div id="excalidraw-container" class="h-full w-full">
      <div id="excali" class="h-full w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

const { props } = usePage();
const elementsRef = ref([]);
const filesRef = ref({}); // Excalidraw resimleri için
const flashMessage = ref('');
const writeDraws = ref(props.write.write_draws);
const excalidrawInstance = ref(null);
const savedElements = ref(null);
const savedFiles = ref(null);
const isSaving = ref(false);

// Theme detection
const isDarkTheme = ref(document.documentElement.getAttribute('data-theme') === 'dark');

// Watch for theme changes
watch(isDarkTheme, (newValue) => {
  if (excalidrawInstance.value) {
    excalidrawInstance.value.updateScene({ theme: newValue ? 'dark' : 'light' });
  }
});

// Observe theme changes in the DOM
onMounted(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        isDarkTheme.value = document.documentElement.getAttribute('data-theme') === 'dark';
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  loadInitialVersion();

  // Cleanup observer on component unmount
  return () => observer.disconnect();
});

const loadInitialVersion = () => {
  import('@excalidraw/excalidraw').then(({ Excalidraw }) => {
    import('react').then((React) => {
      import('react-dom/client').then((ReactDOMClient) => {
        const container = document.getElementById('excali');
        const root = ReactDOMClient.createRoot(container);

        const initialElements =
          writeDraws.value.length > 0 ? JSON.parse(writeDraws.value[0].elements) : [];
        
        // Kaydedilmiş resimleri yükle
        let initialFiles = {};
        if (writeDraws.value.length > 0 && writeDraws.value[0].files) {
          try {
            initialFiles = JSON.parse(writeDraws.value[0].files);
          } catch (e) {
            console.warn('Files parse error:', e);
          }
        }

        savedElements.value = JSON.stringify(initialElements);
        savedFiles.value = JSON.stringify(initialFiles);
        filesRef.value = initialFiles;

        const initialData = {
          elements: initialElements,
          files: initialFiles,
          scrollToContent: true,
          theme: isDarkTheme.value ? 'dark' : 'light',
        };

        const handleChange = (elements, appState, files) => {
          elementsRef.value = elements;
          // Excalidraw files objesini güncelle
          if (files) {
            filesRef.value = files;
          }
        };

        const excalidrawElement = React.createElement(Excalidraw, {
          initialData: initialData,
          onChange: handleChange,
          viewModeEnabled: !props.auth.user,
          theme: isDarkTheme.value ? 'dark' : 'light',
          onMount: (excalidrawApi) => {
            excalidrawInstance.value = excalidrawApi;
          },
        });

        root.render(excalidrawElement);
      });
    });
  });
};

// Check if there are unsaved changes
const hasUnsavedChanges = computed(() => {
  if (!savedElements.value) return false;
  const currentElements = JSON.stringify(elementsRef.value);
  const currentFiles = JSON.stringify(filesRef.value);
  return currentElements !== savedElements.value || currentFiles !== savedFiles.value;
});

// Otomatik kaydetme - Promise döndürür
const saveIfNeeded = async () => {
  if (!hasUnsavedChanges.value || isSaving.value) {
    return Promise.resolve(true);
  }
  
  const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
  const elementsJson = JSON.stringify(latestElements);
  const filesJson = JSON.stringify(filesRef.value || {});
  isSaving.value = true;

  try {
    const response = await axios.post(`/writes/${props.write.id}/draw`, {
      elements: elementsJson,
      files: filesJson,
      version: 1,
    });
    
    // Update saved elements and files
    savedElements.value = elementsJson;
    savedFiles.value = filesJson;
    
    // Update the first draw version or create it if it doesn't exist
    if (writeDraws.value.length > 0) {
      writeDraws.value[0] = response.data;
    } else {
      writeDraws.value.push(response.data);
    }
    
    setFlashMessage('Otomatik kaydedildi!');
    return true;
  } catch (error) {
    console.error('Auto-save failed:', error);
    setFlashMessage('Otomatik kaydetme başarısız oldu.');
    return false;
  } finally {
    isSaving.value = false;
  }
};

const saveDrawToServer = () => {
  const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
  const elementsJson = JSON.stringify(latestElements);
  const filesJson = JSON.stringify(filesRef.value || {});
  isSaving.value = true;

  axios
    .post(`/writes/${props.write.id}/draw`, {
      elements: elementsJson,
      files: filesJson,
      version: 1,
    })
    .then((response) => {
      setFlashMessage('Canvas durumu başarıyla kaydedildi!');
      // Update saved elements and files
      savedElements.value = elementsJson;
      savedFiles.value = filesJson;
      // Update the first draw version or create it if it doesn't exist
      if (writeDraws.value.length > 0) {
        writeDraws.value[0] = response.data;
      } else {
        writeDraws.value.push(response.data);
      }
    })
    .catch(() => {
      setFlashMessage('Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    })
    .finally(() => {
      isSaving.value = false;
    });
};

// Expose methods to parent component
defineExpose({
  hasUnsavedChanges,
  saveIfNeeded,
});

const setFlashMessage = (message) => {
  flashMessage.value = message;
  setTimeout(() => {
    flashMessage.value = '';
  }, 3000);
};
</script>
