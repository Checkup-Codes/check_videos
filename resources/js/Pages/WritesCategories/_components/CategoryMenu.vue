<template>
  <div class="border-b-2 border-color-one lg:relative">
    <div class="flex items-center justify-between">
      <div class="py-3 text-sm font-semibold">
        <span class="px-3 py-1">YAZILAR</span>
      </div>
      <!-- <Link href="/categories">
        <Button size="small" @click="toggleMenu"> Kategori Seç </Button>
      </Link> -->
    </div>

    <!-- <div
      v-show="show"
      class="absolute z-50 w-full bg-white shadow-2xl shadow-active-one lg:right-0 lg:top-auto lg:mt-2 lg:max-h-96 lg:w-3/5 lg:overflow-y-auto lg:rounded-md"
    >
      <div class="grid max-h-64 grid-cols-1 gap-1 overflow-y-auto p-4 lg:max-h-96">
        <div v-for="category in categories" :key="category.id" class="border-2 transition-all duration-100">
          <Link
            :href="route('categories.show', { category: category.slug })"
            :class="getLinkCategoryClasses(`/categories/${category.slug}`)"
            class="block w-full px-4 py-2 text-center font-semibold hover:bg-gray-100"
            @click="toggleMenu"
          >
            {{ category.name }}
          </Link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import Button from '@/Components/CekapUI/Buttons/CButton.vue';

const props = defineProps({
  categories: Array,
  route: Function,
});
const { url } = usePage();
const { props: pageProps } = usePage();

const auth = pageProps.auth;
const show = ref(false);

const toggleMenu = () => {
  show.value = !show.value;
};

const getLinkCategoryClasses = (href) => {
  return url === href
    ? 'block cursor-pointer text-sm text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer text-sm text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg';
};
</script>
