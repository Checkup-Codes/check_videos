<template>
  <Screen class="pt-3">
    <div class="bg-white sm:px-10 lg:grid lg:grid-cols-12 lg:px-10">
      <div class="my-auto w-auto lg:col-span-9">
        <h1 class="flex h-20 items-center text-2xl font-bold text-gray-900">{{ write.title }}</h1>
        <div class="mt-2 hidden text-sm text-gray-500 lg:block">
          <span class="font-medium">Kategori:</span> {{ getCategoryName(write.category_id) }}
        </div>
        <div class="block lg:hidden">
          <div class="absolute right-0 top-14 justify-between px-1">
            <div v-if="write.hasDraw" class="flex w-full justify-end">
              <Link :href="`/writes/${write.slug}?showDraw=${showDraw ? 0 : 1}`">
                <Button class="flex w-full items-center justify-between rounded-full">
                  <span>{{ showDraw ? '' : '' }}</span>

                  <svg
                    v-if="!showDraw"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.63-.35 3.74-.96 1.02-.55 1.26-1.94.47-2.76-.63-.66-.4-1.84.43-2.02 2.94-.64 5.36-3.21 5.36-6.26C22 6.48 17.52 2 12 2z"
                    />
                    <circle cx="6.5" cy="11.5" r="1.5" />
                    <circle cx="9.5" cy="7.5" r="1.5" />
                    <circle cx="14.5" cy="7.5" r="1.5" />
                    <circle cx="17.5" cy="11.5" r="1.5" />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-auto h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 5.879l-6.364 6.364A2 2 0 004 13.757V17a2 2 0 002 2h3.243a2 2 0 001.414-.586l6.364-6.364a2 2 0 000-2.828l-2.828-2.828a2 2 0 00-2.828 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7l1.586-1.586a2 2 0 112.828 2.828L18 10"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex">
        <div v-if="write.hasDraw" class="flex items-center">
          <Link :href="`/writes/${write.slug}?showDraw=${showDraw ? 0 : 1}`">
            <Button class="flex w-full items-center justify-between space-x-2">
              <span>{{ showDraw ? 'Yazıya Dön' : 'Çizimine Git' }}</span>
              <svg
                v-if="!showDraw"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-auto h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8m0 0l-4 4m4-4l-4-4" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="ml-auto h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m4 6H4" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <div v-if="showDraw" class="rounded-lg bg-white shadow-sm">
      <ExcalidrawComponent :write />
    </div>

    <div v-else class="mt-3 h-[calc(80vh)] overflow-scroll rounded-lg bg-white p-5 shadow-sm lg:h-[calc(75vh)]">
      <div v-html="write.content"></div>
      <div>
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
import Button from '@/Components/CekapUI/Buttons/CButton.vue';
import Screen from '@/Components/CekapUI/Modals/CScreen.vue';

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
