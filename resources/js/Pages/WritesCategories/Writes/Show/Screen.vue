<template>
  <Screen>
    <div class="block px-3 lg:hidden">
      <div class="flex justify-between px-3">
        <GoBackButton url="/writes" />
        <div v-if="write.hasDraw" class="">
          <Link :href="`/writes/${write.slug}?showMerhaba=${showMerhaba ? 0 : 1}`">
            <Button>
              {{ showMerhaba ? 'Yazıya Dön' : 'Çizimine Git' }}
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <div class="rounded-lg bg-white p-4 shadow-sm sm:px-10 lg:grid lg:grid-cols-12 lg:px-10 lg:pt-5">
      <div class="my-auto w-auto lg:col-span-9">
        <h1 class="text-3xl font-bold text-gray-900">{{ write.title }}</h1>
        <div class="mt-2 hidden text-sm text-gray-500 lg:block">
          <span class="font-medium">Kategori:</span> {{ getCategoryName(write.category_id) }}
        </div>
      </div>

      <div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex">
        <div v-if="write.hasDraw" class="flex items-center">
          <Link :href="`/writes/${write.slug}?showMerhaba=${showMerhaba ? 0 : 1}`">
            <Button>
              {{ showMerhaba ? 'Yazıya Dön' : 'Çizimine Git' }}
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <div v-if="showMerhaba" class="rounded-lg bg-white shadow-sm">
      <ExcalidrawComponent :write />
    </div>

    <div v-else class="mt-3 rounded-lg bg-white p-4 shadow-sm lg:pb-10">
      <div class="prose prose-lg ql-container-custom mb-8 lg:pl-1" v-html="write.content"></div>

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
  </Screen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import GoBackButton from '@/Components/GoBackButton.vue';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import Button from '@/Components/CekapUI/Buttons/CButton.vue';
import Screen from '@/Components/CekapUI/Modals/CScreen.vue';

const { props } = usePage();
const write = ref(props.write);
const categories = ref(props.categories);
const auth = props.auth;

const showMerhaba = ref(false);

onMounted(() => {
  if (window.location.pathname.includes('categories')) {
    showMerhaba.value = true;
  } else {
    showMerhaba.value = props.showMerhaba || false;
  }
});

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
