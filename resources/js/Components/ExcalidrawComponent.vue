<template>
  <div class="relative h-full w-full">
    <!-- Save button - only for authenticated users -->
    <div v-if="props.auth.user" class="absolute right-4 top-4 z-10">
      <button
        @click="saveDrawToServer"
        class="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content shadow-lg transition-all duration-200 hover:bg-base-200"
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
      class="absolute right-4 top-16 z-20 rounded-lg border border-green-300 bg-green-100 px-3 py-2 text-sm text-green-800 shadow-lg"
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
import { onMounted, ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

const { props } = usePage();
const elementsRef = ref([]);
const flashMessage = ref('');
const writeDraws = ref(props.write.write_draws);
const excalidrawInstance = ref(null);

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

        const initialData =
          writeDraws.value.length > 0
            ? {
                elements: JSON.parse(writeDraws.value[0].elements),
                scrollToContent: true,
                theme: isDarkTheme.value ? 'dark' : 'light',
              }
            : {
                elements: [],
                scrollToContent: true,
                theme: isDarkTheme.value ? 'dark' : 'light',
              };

        const handleChange = (elements) => {
          elementsRef.value = elements;
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

const saveDrawToServer = () => {
  const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
  const jsonString = JSON.stringify(latestElements);

  axios
    .post(`/writes/${props.write.id}/draw`, {
      elements: jsonString,
      version: 1,
    })
    .then((response) => {
      setFlashMessage('Canvas durumu başarıyla kaydedildi!');
      // Update the first draw version or create it if it doesn't exist
      if (writeDraws.value.length > 0) {
        writeDraws.value[0] = response.data;
      } else {
        writeDraws.value.push(response.data);
      }
    })
    .catch(() => {
      setFlashMessage('Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    });
};

const setFlashMessage = (message) => {
  flashMessage.value = message;
  setTimeout(() => {
    flashMessage.value = '';
  }, 3000);
};
</script>
