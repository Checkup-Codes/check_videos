<template>
  <div class="grid grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutCategory class="hidden lg:block" />
    <div class="mx-auto w-full rounded-lg bg-white p-2 shadow-md">
      <div class="flex items-center justify-between">
        <div class="hidden text-sm text-gray-500 lg:block">Kategori: {{ getCategoryName(write.category_id) }}</div>
        <div class="mt-10 block lg:mt-0 lg:hidden">
          <button @click="goBack" class="flex items-center p-2 text-black hover:text-gray-700">
            <GoBackSvg />
            Geri
          </button>
        </div>
        <div v-if="auth.user">
          <Link :href="`/writes/${write.id}/edit`">
            <div class="m-2 rounded p-2 text-center font-bold text-black underline">Yazıyı Düzenle</div>
          </Link>
        </div>
      </div>
      <div class="p-4 lg:p-8">
        <h1 class="mb-6 text-3xl font-bold">{{ write.title }}</h1>
        <div class="prose mb-6" v-html="write.content"></div>
        <div class="rounded-lg bg-gray-100 p-4">
          <h2 class="mb-2 text-xl font-semibold">Özet</h2>
          <p>{{ write.summary }}</p>
        </div>
        <div v-if="auth.user" class="flex">
          <button
            @click="deleteWrite(write.id)"
            class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"
          >
            Yazıyı sil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayoutCategory from '../SidebarLayoutCategory.vue';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';

const { props } = usePage();
const write = ref(props.write);
const categories = ref(props.categories);
const auth = props.auth;

const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};

const goBack = () => {
  window.history.back();
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};
</script>
