<template>
  <div v-if="flashMessage" class="rounded bg-green-200 p-3 text-green-800">
    {{ flashMessage }}
  </div>
  <div class="flex justify-between rounded-md px-1 py-2 text-gray-400 shadow-inner sm:mx-3 md:mx-10">
    <div class="flex">
      <label for="versionDropdown" class="my-auto px-3 font-semibold text-gray-700">Versiyon Seç:</label>
      <select
        id="versionDropdown"
        v-model="selectedVersion"
        @change="loadSelectedVersion"
        class="mx-5 h-7 rounded-md border border-white bg-white py-0 pl-2 text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
      >
        <option v-for="draw in writeDraws" :key="draw.id" :value="draw.id">Versiyon {{ draw.version }}</option>
      </select>
    </div>
    <div class="ml-auto flex items-center justify-end space-x-2">
      <button v-if="props.auth.user" @click="deleteSelectedVersion" class="rounded px-5 text-black hover:underline">
        Sil
      </button>
      <button v-if="props.auth.user" @click="saveDrawToServer" class="rounded px-5 text-black hover:underline">
        Kaydet
      </button>
    </div>
  </div>

  <div id="excalidraw-container" class="relative h-[560px] w-full pb-10 pt-3 lg:pb-3">
    <div id="excali" class="h-full w-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

const { props } = usePage();
const elementsRef = ref([]);
const flashMessage = ref('');
const writeDraws = ref(props.write.write_draws);
const selectedVersion = ref(writeDraws.value.length > 0 ? writeDraws.value[0].id : null);

onMounted(() => {
  loadInitialVersion();
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
              }
            : {
                elements: [],
                scrollToContent: true,
              };

        const handleChange = (elements) => {
          elementsRef.value = elements;
        };

        root.render(
          React.createElement(Excalidraw, {
            initialData: initialData,
            onChange: handleChange,
            viewModeEnabled: !props.auth.user,
          })
        );
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
          };

          root.render(
            React.createElement(Excalidraw, {
              initialData: initialData,
              onChange: (elements) => {
                elementsRef.value = elements;
              },
              viewModeEnabled: !props.auth.user,
            })
          );
        });
      });
    });
  }
};

const saveDrawToServer = () => {
  const latestElements = elementsRef.value;
  const jsonString = JSON.stringify(latestElements);

  axios
    .post(`/writes/${props.write.id}/draw`, {
      elements: jsonString,
    })
    .then((response) => {
      flashMessage.value = 'Canvas durumu başarıyla kaydedildi!';
      writeDraws.value.push(response.data);
    })
    .catch((err) => {
      flashMessage.value = 'Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.';
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
</script>
