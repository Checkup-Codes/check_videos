<template>
  <div class="relative">
    <div v-if="flashSuccess" class="fixed right-4 top-10 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>
    <div class="fixed z-30 mt-14 w-full shadow-lg shadow-subsidebar-shadow lg:mt-0 lg:w-[27%]">
      <div class="flex cursor-pointer justify-between text-sm text-black">
        <div>
          <div class="m-2 space-y-4 rounded p-1 font-bold text-black">
            <div class="flex">
              <div
                :class="category ? 'w-auto' : 'w-32'"
                class="flex content-center items-center rounded-lg border-2 border-sidebar bg-gray-200 p-1 pl-3 hover:border-black"
                @click="toggleCategoryMenu"
              >
                Kategori seç
                <span v-if="category">
                  : <span class="px-1"> {{ category.name }}</span>
                  <span></span>
                </span>
                <span class="pr-1">
                  <DropdownSvg />
                </span>
              </div>
              <div class="duration-50 mx-3 flex content-center items-center rounded-lg transition-all" v-if="category">
                <Link
                  :href="route('writes.index')"
                  class="rounded-lg border-2 bg-gray-200 p-0.5 text-center font-bold text-black underline hover:border-black hover:bg-gray-300"
                >
                  <CloseXSvg />
                </Link>
              </div>
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

      <div class="h-[100vh] overflow-auto" ref="scrollContainer" @scroll="handleScroll">
        <div class="sticky top-0 z-20 bg-sidebar">
          <div v-show="showCategories" class="grid grid-cols-3 gap-1 bg-sidebar px-4 pb-3 text-sm">
            <div v-for="category in categories" :key="category.id" class="transition-all duration-100">
              <Link
                :href="route('categories.show', { category: category.slug })"
                :class="getLinkClasses(`/categories/${category.slug}`)"
                class="border-2 hover:border-black hover:bg-sidebar hover:text-black"
              >
                <div class="rounded p-1 text-center font-bold">{{ category.name }}</div>
              </Link>
            </div>
          </div>
        </div>
        <div v-for="write in writes" :key="write.id" class="px-3 py-1">
          <Link
            :href="
              route('categories.showByCategory', { category: getCategoryName(write.category_id), slug: write.slug })
            "
            :class="getLinkClasses(`/categories/${getCategoryName(write.category_id)}/${write.slug}`)"
            class="px-3 py-1"
          >
            <div class="py-0.5 font-bold">{{ write.title }}</div>
            <div class="py-1 text-sm text-gray-400">{{ formatDate(write.published_at) }}</div>
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
  return url.includes(href)
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
