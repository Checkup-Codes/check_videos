<template>
  <div v-if="flashMessage" class="rounded bg-green-200 p-3 text-green-800">
    {{ flashMessage }}
  </div>
  <div class="bg-base-100 px-2 lg:p-3">
    <div class="flex justify-between rounded-md px-1 py-2 text-base-content sm:mx-3 md:mx-5">
      <div class="flex">
        <label for="versionDropdown" class="my-auto text-nowrap px-3 font-semibold">Versiyon Seç:</label>
        <select
          id="versionDropdown"
          v-model="selectedVersion"
          @change="loadSelectedVersion"
          class="select-bordered select select-sm mx-5 bg-base-100 text-base-content"
        >
          <option v-for="draw in writeDraws" :key="draw.id" :value="draw.id">Versiyon {{ draw.version }}</option>
        </select>
      </div>
      <div class="ml-auto flex items-center justify-end space-x-2">
        <button v-if="props.auth.user" @click="deleteSelectedVersion" class="btn btn-ghost btn-sm">Sil</button>
        <button v-if="props.auth.user" @click="saveDrawToServer" class="btn btn-primary btn-sm">Kaydet</button>
      </div>
    </div>
    <div id="excalidraw-container" class="h-[calc(79vh)] w-full">
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
const selectedVersion = ref(writeDraws.value.length > 0 ? writeDraws.value[0].id : null);
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

const loadSelectedVersion = () => {
  const selectedDraw = writeDraws.value.find((draw) => draw.id === selectedVersion.value);
  if (selectedDraw) {
    import('@excalidraw/excalidraw').then(({ Excalidraw }) => {
      import('react').then((React) => {
        import('react-dom/client').then((ReactDOMClient) => {
          const container = document.getElementById('excali');
          const root = ReactDOMClient.createRoot(container);

          const initialData = {
            elements: JSON.parse(selectedDraw.elements),
            scrollToContent: true,
            theme: isDarkTheme.value ? 'dark' : 'light',
          };

          const excalidrawElement = React.createElement(Excalidraw, {
            initialData: initialData,
            onChange: (elements) => {
              elementsRef.value = elements;
            },
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
  }
};

const saveDrawToServer = () => {
  const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
  const jsonString = JSON.stringify(latestElements);

  axios
    .post(`/writes/${props.write.id}/draw`, {
      elements: jsonString,
    })
    .then((response) => {
      setFlashMessage('Canvas durumu başarıyla kaydedildi!');
      writeDraws.value.push(response.data);
    })
    .catch(() => {
      setFlashMessage('Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    });
};

const deleteSelectedVersion = () => {
  const selectedDraw = writeDraws.value.find((draw) => draw.id === selectedVersion.value);
  if (selectedDraw && confirm('Bu versiyonu silmek istediğinizden emin misiniz?')) {
    axios
      .delete(`/writes/${props.write.id}/draw/${selectedVersion.value}`)
      .then(() => {
        flashMessage.value = 'Versiyon başarıyla silindi.';
        writeDraws.value = writeDraws.value.filter((draw) => draw.id !== selectedVersion.value);
        if (writeDraws.value.length > 0) {
          selectedVersion.value = writeDraws.value[0].id;
          loadSelectedVersion();
        } else {
          elementsRef.value = [];
          selectedVersion.value = null;
        }
      })
      .catch((err) => {
        flashMessage.value = 'Silme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      });
  }
};

const setFlashMessage = (message) => {
  flashMessage.value = message;
  setTimeout(() => {
    flashMessage.value = '';
  }, 3000);
};
</script>
