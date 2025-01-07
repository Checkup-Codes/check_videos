<template>
  <CheckScreen>
    <h1
      @click="toggleContent"
      :class="[
        'group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md',
        write.title.length > 30 ? 'text-xl' : 'text-2xl',
      ]"
    >
      <span class="">{{ write.title }}</span>
    </h1>

    <div v-if="showDraw" class="rounded-lg bg-white shadow-sm">
      <ExcalidrawComponent :write />
    </div>

    <div v-else class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5">
      <div class="prose prose-lg ql-container-custom mb-8 p-5 lg:pl-1" v-html="write.content"></div>
      <div class="rounded-lg bg-gray-100 p-7 shadow-inner">
        <h2 class="mb-3 text-xl font-semibold text-gray-800">Özet</h2>
        <div class="break-words rounded-md p-4 text-gray-700">
          {{ write.summary }}
        </div>
      </div>
      <div v-if="auth.user" class="mt-5 flex justify-end space-x-3">
        <Link :href="`/writes/${write.id}/edit`">
          <Button> Yazıyı Düzenle </Button>
        </Link>
        <Button @click="deleteWrite(write.id)"> Yazıyı Sil </Button>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';

const { props } = usePage();
const write = ref(props.write);
const categories = ref(props.categories);
const auth = props.auth;

const showDraw = ref(false);

onMounted(() => {
  if (window.location.pathname.includes('categories')) {
    showDraw.value = true;
  } else {
    showDraw.value = props.showDraw || false;
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');
});

const toggleContent = () => {
  showDraw.value = !showDraw.value;
  const url = new URL(window.location.href);

  if (showDraw.value) {
    url.searchParams.set('draw', '1'); // `draw=1` ekler
  } else {
    url.searchParams.delete('draw'); // `draw` parametresini kaldırır
  }

  window.history.pushState({}, '', url); // URL'i günceller
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');
});

const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};
</script>

<style>
/* Styles moved to global quill-custom-styles.css */
</style>
