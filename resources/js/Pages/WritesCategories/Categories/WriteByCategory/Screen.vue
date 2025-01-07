<template>
  <CheckScreen>
    <h1
      @click="navigateToWriteWithDraw"
      :class="[
        'group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md',
        write.title.length > 30 ? 'text-xl' : 'text-2xl',
      ]"
    >
      <span class="">{{ write.title }}</span>
    </h1>
    <div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5">
      <div class="prose prose-lg ql-container-custom mb-8 p-5 lg:pl-1" v-html="write.content"></div>

      <div class="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Özet</h2>
        <p class="leading-relaxed text-gray-700">{{ write.summary }}</p>
      </div>

      <div v-if="auth.user" class="mt-5 flex justify-end">
        <Link :href="`/writes/${write.id}/edit`">
          <Button> Yazıyı Düzenle </Button>
        </Link>
        <Button @click="deleteWrite(write.id)"> Yazıyı Sil </Button>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';

const { props } = usePage();
const write = ref(props.write);
const auth = props.auth;

// Yazıya draw parametresiyle gitme
const navigateToWriteWithDraw = () => {
  const slug = write.value.slug;
  const url = `/writes/${slug}?draw=1`;
  Inertia.visit(url); // Inertia ile yeni sayfaya git
};

// Yazıyı silme fonksiyonu
const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};
</script>
