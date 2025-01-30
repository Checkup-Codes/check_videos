<template>
  <div ref="scrollContainer" class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]">
    <div class="min-h-full">
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
    bg-theme-background text-theme-text px-4 py-3 block cursor-pointer p-2 text-sm
    ${isActive ? 'border-l-4 border-primary-500 bg-primary-100 shadow-inner hover:bg-primary-100' : 'hover:bg-primary-100'}
    
  `;
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(203, 213, 225, 0.5) transparent;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(203, 213, 225, 0.5);
    border-radius: 3px;
  }
}

@media (max-width: 1023px) {
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
  }
}
</style>
