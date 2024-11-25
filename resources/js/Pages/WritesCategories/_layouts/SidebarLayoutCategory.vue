<template>
  <div class="relative h-screen overflow-hidden">
    <div v-if="flashSuccess" class="fixed right-4 top-10 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>
    <div class="fixed z-30 h-screen w-full lg:w-[27%]">
      <div class="bg-white shadow-sm">
        <div class="flex justify-between p-4">
          <div class="flex items-center space-x-2">
            <Button @click="toggleCategoryMenu"> Kategori: {{ category ? category.name : 'Seçiniz' }} </Button>
            <Link v-if="category" :href="route('writes.index')" class="rounded-full p-1 hover:bg-gray-100">
              <CloseXSvg class="h-4 w-4" />
            </Link>
          </div>
          <div v-if="auth.user" class="space-x-2">
            <Link href="/writes/create" class="text-sm font-medium hover:underline">Yeni Yazı</Link>
            <Link href="/categories/create" class="text-sm font-medium hover:underline">Yeni Kategori</Link>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-4rem)] overflow-y-auto" ref="scrollContainer" @scroll="handleScroll">
        <div v-show="showCategories" class="bg-white p-4">
          <div class="grid grid-cols-2 gap-2">
            <Link
              v-for="category in categories"
              :key="category.id"
              :href="route('categories.show', { category: category.slug })"
              :class="getLinkCategoryClasses(`/categories/${category.slug}`)"
              class="rounded-lg border p-2 text-center"
            >
              {{ category.name }}
            </Link>
          </div>
        </div>
        <div class="space-y-1 p-4">
          <Link
            v-for="write in writes"
            :key="write.id"
            :href="
              route('categories.showByCategory', {
                category: getCategoryName(write.category_id),
                slug: write.slug,
              })
            "
            :class="getLinkClasses(`/categories/${getCategoryName(write.category_id)}/${write.slug}`)"
            class="block rounded-lg p-3 hover:bg-gray-50"
          >
            <div class="font-medium">{{ write.title }}</div>
            <div class="mt-1 text-sm text-gray-500">{{ formatDate(write.created_at) }}</div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import DropdownSvg from '@/Shared/Svg/Dropdown.vue';
import CloseXSvg from '@/Shared/Svg/CloseX.vue';
import Button from '@/Components/CekapUI/Buttons/CButton.vue';

const { props, url } = usePage();
const writes = ref(props.writes);
const categories = ref(props.categories);
const category = ref(props.category);
const showCategories = ref(true);
const scrollPosition = ref(0);
const scrollContainer = ref(null);

const truncateSummary = (summary) => {
  return summary.length > 40 ? summary.slice(0, 40) + '...' : summary;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const flashSuccess = ref(props.flash.success);
const auth = props.auth;

const getLinkClasses = (href) => {
  return url === href
    ? 'border-b border-color-one px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md bg-color-one'
    : 'border-b border-color-one px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all duration-200';
};

const getLinkCategoryClasses = (href) => {
  return url === href
    ? 'block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg';
};

const toggleCategoryMenu = () => {
  // showCategories.value = !showCategories.value;
  // @checkupcodes bu kısım için issue tanımlandı : https://github.com/Checkup-Codes/check_videos/issues/4
};

const handleScroll = () => {
  scrollPosition.value = scrollContainer.value.scrollTop;
  localStorage.setItem('scrollPosition', scrollPosition.value);
};

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }

  const savedScrollPosition = localStorage.getItem('scrollPosition');
  if (savedScrollPosition) {
    scrollContainer.value.scrollTop = savedScrollPosition;
  }

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const getCategoryName = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.slug : 'Unknown';
};
</script>

<style scoped>
.input-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-primary {
  @apply rounded bg-gray-500 px-4 py-2 font-bold text-white;
}
</style>
