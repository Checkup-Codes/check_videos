<template>
  <div class="-z-10 h-screen overflow-auto pb-8 lg:py-0" ref="scrollContainer" @scroll="handleScroll">
    <div v-for="write in writes" :key="write.id" class="border-r-2">
      <Link :href="route('writes.show', { write: write.slug })" :class="getLinkClasses(`/writes/${write.slug}`)">
        <div class="font-semibold">{{ write.title }}</div>
        <div class="mt-1 flex justify-between text-xs text-gray-500">
          <span>{{ formatDate(write.created_at) }}</span>
          <span>{{ write.views_count }} Görüntülenme</span>
        </div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  writes: Array,
  route: Function,
});

const scrollContainer = ref(null);

const handleScroll = (event) => {
  localStorage.setItem('scrollPosition', event.target.scrollTop);
};

onMounted(() => {
  const savedScrollPosition = localStorage.getItem('scrollPosition');
  if (savedScrollPosition && scrollContainer.value) {
    scrollContainer.value.scrollTop = savedScrollPosition;
  }

  scrollContainer.value?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getLinkClasses = (href) => {
  const isActive = window.location.pathname === href;
  return `
    border-b border-color-one px-4 py-3 block cursor-pointer p-2 text-sm rounded-sm transition-all duration-200
    ${isActive ? 'bg-active-one hover:bg-hover-one text-gray-700' : 'text-gray-700 hover:bg-color-one '}
  `;
};
</script>
