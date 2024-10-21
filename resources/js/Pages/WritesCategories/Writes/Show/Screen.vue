<template>
  <div class="mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-screen-bg p-2 shadow-md lg:mt-0">
    <div class="block lg:hidden">
      <GoBackButton />
    </div>
    <div class="pl-3 sm:px-10 md:grid md:grid-cols-12 lg:px-10 lg:pt-5">
      <div class="my-auto md:col-span-9">
        <h1 class="text-3xl font-bold">{{ write.title }}</h1>
        <div class="hidden text-sm text-gray-500 lg:block">Kategori: {{ getCategoryName(write.category_id) }}</div>
      </div>

      <div class="flex items-end justify-end space-x-5 text-center md:col-span-3">
        <div v-if="write.hasDraw" class="flex justify-end">
          <button @click="toggleContent" class="rounded-md px-3 py-1 text-black shadow-md shadow-blue-200">
            {{ showMerhaba ? 'Yazıya Dön' : 'Drawina Git' }}
          </button>
        </div>
        <div v-if="auth.user" class="flex justify-end pt-2">
          <Link :href="`/writes/${write.id}/edit`">
            <div class="rounded-md px-3 py-1 text-black shadow-md shadow-blue-200">Yazıyı Düzenle</div>
          </Link>
        </div>
      </div>
    </div>

    <div v-if="showMerhaba">
      <ExcalidrawComponent :write />
    </div>

    <div v-else>
      <div class="flex items-center justify-between"></div>
      <div class="p-4 lg:p-8">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import GoBackButton from '@/Pages/WritesCategories/_components/GoBackButton.vue';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';

const { props } = usePage();
const write = ref(props.write);
const categories = ref(props.categories);
const auth = props.auth;

const showMerhaba = ref(false);

const toggleContent = () => {
  showMerhaba.value = !showMerhaba.value;
};

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
