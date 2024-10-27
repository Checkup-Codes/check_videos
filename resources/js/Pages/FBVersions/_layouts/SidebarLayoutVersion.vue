<template>
  <div class="relative">
    <div v-if="flashSuccess" class="fixed right-4 top-4 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>

    <div class="fixed z-30 mt-14 w-full shadow-lg shadow-subsidebar-shadow lg:mt-0 lg:w-[27%]">
      <div class="flex cursor-pointer justify-between text-sm text-black">
        <div class="flex justify-between p-2 text-sm font-bold text-black">
          <div class="rounded border-b-4 border-blue-100 p-2">Versiyonlar</div>
        </div>
        <div v-if="auth.user">
          <Link href="/versions/create">
            <div class="mx-2 rounded p-3 text-center font-bold text-black underline">Yeni Versiyon Ekle</div>
          </Link>
        </div>
      </div>

      <div class="h-[100vh] overflow-auto" @scroll="handleScroll" ref="scrollContainer">
        <div v-for="version in versions" :key="version.id" class="px-3 py-1">
          <Link
            :href="`/versions/${version.version}`"
            :class="getLinkClasses(`/versions/${version.version}`)"
            class="px-2 py-1"
          >
            <div class="py-1 font-bold">{{ version.version }}</div>
            <div class="flex">
              <div class="py-0.5 text-sm text-gray-400">{{ formatDate(version.updated_at) }}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const { props, url } = usePage();
const versions = ref(props.versions);
const flashSuccess = ref(props.flash.success);
const auth = props.auth;
const scrollContainer = ref(null);
const scrollPosition = ref(0);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getLinkClasses = (href) => {
  return url === href
    ? 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-gray-200 hover:shadow-lg';
};

const handleScroll = (event) => {
  scrollPosition.value = event.target.scrollTop;
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
});
</script>
