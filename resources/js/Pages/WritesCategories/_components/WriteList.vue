<template>
  <div ref="scrollContainer">
    <Link
      v-for="write in writes"
      :key="write.id"
      :href="route('writes.show', { write: write.slug })"
      :class="getLinkClasses(`/writes/${write.slug}`)"
    >
      <div class="font-semibold">{{ write.title }}</div>
      <div class="flex items-center justify-between text-xs">
        <span>{{ formatDate(write.created_at) }}</span>
        <span>{{ write.views_count }} görüntülenme</span>
      </div>
    </Link>
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
  const container = event.target;
  const maxScroll = container.scrollHeight - container.clientHeight;

  if (container.scrollTop < 0) {
    container.scrollTop = 0;
  } else if (container.scrollTop > maxScroll) {
    container.scrollTop = maxScroll;
  }

  localStorage.setItem('scrollPosition', container.scrollTop);
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
    block px-4 py-2 transition-colors duration-200
    text-sm font-medium
    ${isActive ? ' bg-base-300' : ' bg-base-100 border-base-300 text-base-content'}
  `;
};
</script>
