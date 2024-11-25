<template>
  <div class="relative border-r border-color-one">
    <div class="border-b-2 border-color-one px-3 lg:relative">
      <div class="flex items-center justify-between">
        <div class="py-3 text-sm font-semibold">
          <span class="px-3 py-1">VERSİYONLAR</span>
        </div>
      </div>
    </div>

    <div v-if="flashSuccess" class="fixed right-4 top-4 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>

    <div ref="scrollContainer" class="h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-4rem)]">
      <div class="min-h-full">
        <div v-for="version in versions" :key="version.id" class="px-3 py-1">
          <Link
            :href="`/versions/${version.version}`"
            :class="getLinkClasses(`/versions/${version.version}`)"
            class="px-2 py-1"
          >
            <div class="py-1 font-bold">{{ version.version }}</div>
            <div class="flex">
              <div class="py-0.5 text-sm">{{ formatDate(version.updated_at) }}</div>
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
    ? 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 bg-primary-200 text-black shadow-inner'
    : 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 hover:shadow-inner';
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
