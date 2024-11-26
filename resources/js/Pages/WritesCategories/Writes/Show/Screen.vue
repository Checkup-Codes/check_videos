<template>
  <Screen>
    <h1
      @click="toggleContent"
      class="flex h-16 select-none items-center px-3 text-xl text-gray-900 lg:h-20 lg:px-0 lg:text-2xl"
    >
      {{ write.title }}
    </h1>

    <div v-if="showDraw" class="rounded-lg bg-white shadow-sm">
      <ExcalidrawComponent :write />
    </div>

    <div v-else class="mt-3 h-[calc(80vh)] overflow-scroll rounded-lg bg-white p-5 shadow-sm lg:h-[calc(75vh)]">
      <div class="px-5" v-html="write.content"></div>
      <div class="p-7">
        <h2>Özet</h2>
        <p>{{ write.summary }}</p>
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
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import Screen from '@/Components/CekapUI/Modals/CScreen.vue';
import ShowDraw from '@/Shared/Svg/ShowDraw.vue';
import ShowWrite from '@/Shared/Svg/ShowWrite.vue';

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
});

const toggleContent = () => {
  showDraw.value = !showDraw.value;
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
