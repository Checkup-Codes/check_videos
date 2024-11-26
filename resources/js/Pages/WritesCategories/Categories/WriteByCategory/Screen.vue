<template>
  <div class="bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg p-2 shadow-sm lg:mt-0">
    <div class="block lg:hidden">
      <div class="flex items-center justify-between">
        <GoBackButton :url="categoryUrl" />
        <div v-if="write.hasDraw" class="flex items-center px-3 pt-4">
          <Link :href="`/writes/${write.slug}?showDraw=${showDraw ? 0 : 1}`">
            <Button>
              {{ showDraw ? 'Yazıya Dön' : 'Çizimine Git' }}
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <div class="rounded-lg bg-white p-4 shadow-sm sm:px-10 md:grid md:grid-cols-12 lg:px-10 lg:pt-5">
      <div class="my-auto md:col-span-9">
        <h1 class="text-3xl font-bold text-gray-900">{{ write.title }}</h1>
        <div class="mt-2 hidden text-sm text-gray-500 lg:block">
          <span class="font-medium">Kategori:</span> {{ getCategoryName(write.category_id).name }}
        </div>
      </div>

      <div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex">
        <div v-if="write.hasDraw" class="flex items-center">
          <Link :href="`/writes/${write.slug}?showDraw=${showDraw ? 0 : 1}`">
            <Button>
              {{ showDraw ? 'Yazıya Dön' : 'Çizimine Git' }}
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <div class="mt-6 rounded-lg bg-white p-4 shadow-sm lg:p-8">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import GoBackButton from '@/Components/GoBackButton.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

const { props } = usePage();
const write = ref(props.write);
const categories = ref(props.categories);
const auth = props.auth;

const navigateToWrite = () => {
  Inertia.visit(route('writes.show', { write: write.value.slug }));
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
  console.log(category);

  return category ? category.name : null;
};

const categoryUrl = computed(() => {
  const categoryName = getCategoryName(write.category_id);
  return categoryName ? `/categories/${categoryName}` : '/writes';
});
</script>
