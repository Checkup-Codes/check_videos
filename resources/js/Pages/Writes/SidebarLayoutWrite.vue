<template>
  <div v-if="flashSuccess" class="fixed right-4 top-4 z-50">
    <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
      <strong class="font-bold">Success! </strong>
      <span class="block sm:inline">{{ flashSuccess }}</span>
    </div>
  </div>
  <div class="z-10 h-screen shadow-right shadow-gray-100">
    <div class="z-10 flex cursor-pointer justify-between bg-sidebar text-sm text-black">
      <div>
        <div class="m-2 space-y-4 rounded p-1 font-bold text-black">
          <div
            :class="category ? 'w-auto' : 'w-32'"
            class="flex content-center items-center rounded bg-gray-200 p-1 pl-3"
            @click="toggleCategoryMenu"
          >
            Kategori seç
            <span v-if="category"> : {{ category.name }} </span>
            <span class="pl-2"
              ><svg class="h-6 w-6">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path></svg
            ></span>
          </div>
        </div>
      </div>
      <div v-if="auth.user">
        <Link href="/writes/create">
          <div class="mx-2 rounded p-1 text-center font-bold text-black underline">Yeni Yazı Ekle</div>
        </Link>
        <Link href="/categories/create">
          <div class="mx-2 rounded p-1 text-center font-bold text-black underline">Kategori Ekle</div>
        </Link>
      </div>
    </div>
    <div v-show="showCategories" class="grid grid-cols-4 bg-sidebar py-2 text-sm">
      <div v-for="category in categories" :key="category.id" class="transition-all duration-100">
        <Link
          :href="route('categories.show', { category: category.slug })"
          :class="getLinkClasses(`/categories/${category.slug}`)"
        >
          <div class="rounded p-1 text-center font-bold">{{ category.name }}</div>
        </Link>
      </div>
    </div>
    <div v-for="write in writes" :key="write.id" class="">
      <Link
        :href="route('writes.show', { write: write.slug })"
        :class="getLinkClasses(`/writes/${write.slug}`)"
        class="p-3"
      >
        <div class="font-bold">{{ write.title }}</div>
        <div class="font-light text-gray-500">{{ truncateSummary(write.summary) }}</div>
        <div class="text-sm text-gray-400">{{ formatDate(write.published_at) }}</div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const { props, url } = usePage();
const writes = ref(props.writes);
const categories = ref(props.categories);
const category = ref(props.category);
const showCategories = ref(false);

const truncateSummary = (summary) => {
  return summary.length > 40 ? summary.slice(0, 40) + '...' : summary;
};

const toggleCategoryMenu = () => {
  showCategories.value = !showCategories.value;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const flashSuccess = ref(props.flash.success);
const auth = props.auth;

const getLinkClasses = (href) => {
  return url === href
    ? 'block cursor-pointer text-sm rounded text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer text-sm rounded text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg';
};

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});
</script>
