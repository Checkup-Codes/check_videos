<template>
  <div class="relative h-full w-full">
    <!-- Save button - only for authenticated users -->
    <div v-if="props.auth?.user" class="absolute left-32 top-[53px] z-10 lg:left-36 lg:top-4">
      <button
        @click="saveDrawToServer"
        :disabled="isSaving"
        class="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          v-if="!isSaving"
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
        <svg
          v-else
          class="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ isSaving ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
      
      <!-- Unsaved changes indicator -->
      <div
        v-if="hasUnsavedChanges && !isSaving"
        class="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Kaydedilmemiş değişiklikler
      </div>
    </div>

    <!-- Flash message -->
    <div
      v-if="flashMessage"
      class="absolute left-32 top-[101px] z-20 rounded-lg border px-3 py-2 text-sm shadow-lg lg:left-36 lg:top-16"
      :class="flashMessageType === 'success' 
        ? 'border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-200' 
        : 'border-red-300 bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-900/50 dark:text-red-200'"
    >
      {{ flashMessage }}
    </div>
    
    <!-- Unsaved changes dialog -->
    <div
      v-if="showUnsavedDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="cancelNavigation"
    >
      <div class="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl">
        <div class="mb-4 flex items-start gap-3">
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-foreground">Kaydedilmemiş Değişiklikler</h3>
            <p class="mt-2 text-sm text-muted-foreground">
              Çizimde kaydedilmemiş değişiklikleriniz var. Sayfadan ayrılırsanız bu değişiklikler kaybolacak.
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelNavigation"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            İptal
          </button>
          <button
            @click="confirmNavigation"
            class="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Yine de Ayrıl
          </button>
        </div>
      </div>
    </div>

    <!-- Excalidraw container -->
    <div id="excalidraw-container" class="h-full w-full">
      <div id="excali" class="h-full w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue';
import axios from 'axios';

const props = defineProps({
  write: {
    type: Object,
    default: () => ({})
  },
  auth: {
    type: Object,
    default: null
  }
});

const elementsRef = ref([]);
const filesRef = ref({}); // Excalidraw resimleri için
const flashMessage = ref('');
const flashMessageType = ref('success'); // 'success' or 'error'
const excalidrawInstance = ref(null);
const savedElements = ref(null);
const savedFiles = ref(null);
const isSaving = ref(false);
const isInitialized = ref(false);
const showUnsavedDialog = ref(false);
const pendingNavigation = ref(null);
const hasChanges = ref(false); // Track if any changes were made

// Theme detection
const isDarkTheme = ref(document.documentElement.getAttribute('data-theme') === 'dark');

// Get writeDraws from props
const writeDraws = computed(() => {
  return props.write?.writeDraws || props.write?.write_draws || [];
});

// Watch for theme changes
watch(isDarkTheme, (newValue) => {
  if (excalidrawInstance.value) {
    excalidrawInstance.value.updateScene({ theme: newValue ? 'dark' : 'light' });
  }
});

const loadExcalidraw = () => {
  if (isInitialized.value) return;
  isInitialized.value = true;
  
  import('@excalidraw/excalidraw').then(({ Excalidraw }) => {
    import('react').then((React) => {
      import('react-dom/client').then((ReactDOMClient) => {
        const container = document.getElementById('excali');
        if (!container) return;
        
        const root = ReactDOMClient.createRoot(container);

        const draws = writeDraws.value || [];
        let initialElements = [];
        let initialFiles = {};
        
        if (draws.length > 0 && draws[0]) {
          // Parse elements
          if (draws[0].elements) {
            try {
              initialElements = typeof draws[0].elements === 'string' 
                ? JSON.parse(draws[0].elements) 
                : draws[0].elements;
            } catch (e) {
              console.warn('Elements parse error:', e);
              initialElements = [];
            }
          }
          
          // Parse files
          if (draws[0].files) {
            try {
              initialFiles = typeof draws[0].files === 'string'
                ? JSON.parse(draws[0].files)
                : draws[0].files;
            } catch (e) {
              console.warn('Files parse error:', e);
              initialFiles = {};
            }
          }
        }

        savedElements.value = JSON.stringify(initialElements);
        savedFiles.value = JSON.stringify(initialFiles);
        filesRef.value = initialFiles;
        elementsRef.value = initialElements;

        const initialData = {
          elements: initialElements,
          files: initialFiles,
          scrollToContent: true,
          theme: isDarkTheme.value ? 'dark' : 'light',
        };

        const handleChange = (elements, appState, files) => {
          elementsRef.value = elements;
          if (files) {
            filesRef.value = files;
          }
          // Mark that changes have been made
          if (props.auth?.user) {
            hasChanges.value = true;
          }
        };

        const excalidrawElement = React.createElement(Excalidraw, {
          initialData: initialData,
          onChange: handleChange,
          viewModeEnabled: !props.auth?.user,
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

// Watch for writeDraws changes (when lazy loaded)
watch(writeDraws, (newDraws) => {
  if (newDraws && newDraws.length > 0 && !isInitialized.value) {
    loadExcalidraw();
  }
}, { deep: true });

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

  // Load excalidraw if writeDraws already available or write exists
  if (writeDraws.value.length > 0 || props.write?.id) {
    loadExcalidraw();
  }
  
  // Add beforeunload listener for browser navigation
  if (props.auth?.user) {
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Listen for Inertia navigation attempts
    document.addEventListener('inertia:before', handleInertiaNavigate);
  }

  // Cleanup observer on component unmount
  return () => observer.disconnect();
});

onBeforeUnmount(() => {
  if (props.auth?.user) {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('inertia:before', handleInertiaNavigate);
  }
});

// Check if there are unsaved changes
const hasUnsavedChanges = computed(() => {
  if (!savedElements.value || !hasChanges.value) return false;
  const currentElements = JSON.stringify(elementsRef.value);
  const currentFiles = JSON.stringify(filesRef.value);
  return currentElements !== savedElements.value || currentFiles !== savedFiles.value;
});

const saveDrawToServer = async () => {
  if (!props.write?.id) {
    setFlashMessage('Yazı bulunamadı, kaydetme başarısız.', 'error');
    return;
  }
  
  if (isSaving.value) {
    return;
  }
  
  const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
  const elementsJson = JSON.stringify(latestElements);
  const filesJson = JSON.stringify(filesRef.value || {});
  isSaving.value = true;

  try {
    await axios.post(`/writes/${props.write.id}/draw`, {
      elements: elementsJson,
      files: filesJson,
      version: 1,
    });
    
    // Update saved elements and files ONLY after successful save
    savedElements.value = elementsJson;
    savedFiles.value = filesJson;
    hasChanges.value = false; // Reset changes flag
    
    setFlashMessage('Canvas durumu başarıyla kaydedildi!', 'success');
  } catch (error) {
    console.error('Save error:', error);
    setFlashMessage('Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.', 'error');
  } finally {
    isSaving.value = false;
  }
};

// Navigation guard
const handleBeforeUnload = (e) => {
  if (props.auth?.user && hasUnsavedChanges.value) {
    e.preventDefault();
    e.returnValue = '';
    return '';
  }
};

// Inertia navigation guard
const handleInertiaNavigate = (event) => {
  if (props.auth?.user && hasUnsavedChanges.value && !showUnsavedDialog.value) {
    event.preventDefault();
    pendingNavigation.value = event.detail.visit;
    showUnsavedDialog.value = true;
  }
};

const confirmNavigation = () => {
  showUnsavedDialog.value = false;
  hasChanges.value = false; // Allow navigation
  if (pendingNavigation.value) {
    pendingNavigation.value();
    pendingNavigation.value = null;
  }
};

const cancelNavigation = () => {
  showUnsavedDialog.value = false;
  pendingNavigation.value = null;
};

const setFlashMessage = (message, type = 'success') => {
  flashMessage.value = message;
  flashMessageType.value = type;
  setTimeout(() => {
    flashMessage.value = '';
  }, 3000);
};
</script>
