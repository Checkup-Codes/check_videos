<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg p-2 shadow-md lg:mt-0">
    <div class="flex items-center justify-between">
      <div class="hidden text-sm text-gray-500 lg:block">Kategori: {{ getCategoryName(write.category_id) }}</div>
      <div class="block lg:hidden">
        <GoBackButton />
      </div>
      <div v-if="auth.user">
        <Link :href="`/writes/${write.id}/edit`">
          <div class="m-2 rounded p-2 text-center font-bold text-black underline">Yazıyı Düzenle</div>
        </Link>
      </div>
    </div>
    <div class="p-4 lg:p-8">
      <h1 class="mb-6 text-3xl font-bold">{{ write.title }}</h1>
      <div class="prose prose-lg ql-container-custom mb-6" v-html="write.content"></div>
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
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import GoBackButton from '@/Pages/WritesCategories/_components/GoBackButton.vue';

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

const getCategoryName = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};
</script>

<style>
.prose h1 {
  @apply my-4 text-2xl font-bold;
}
.prose h2 {
  @apply my-4 text-xl font-semibold;
}
.prose h3 {
  @apply my-4 text-lg font-semibold;
}
.prose p {
  @apply my-2;
}
.ql-container-custom .ql-code-block-container {
  @apply rounded bg-gray-800 p-4 text-white;
}
.ql-container-custom .ql-code-block {
  @apply whitespace-pre;
}
</style>
