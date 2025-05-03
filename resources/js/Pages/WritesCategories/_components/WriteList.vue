<template>
  <div ref="scrollContainer" class="h-full w-full space-y-3 overflow-y-auto p-4">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="route('writes.show', { write: write.slug })"
      :class="getLinkClasses(`/writes/${write.slug}`)"
      class="block rounded-xl p-4 shadow transition hover:shadow-md"
      @click="saveScrollPosition"
    >
      <!-- Başlık ve kilit ikonu -->
      <div class="text-base-content flex items-center gap-2 font-semibold">
        <span v-if="write.status === 'private'" class="text-base-content">🔒</span>
        <span class="truncate">{{ write.title }}</span>
      </div>

      <!-- Tarih ve görüntülenme -->
      <div class="text-base-content mt-1 flex items-center justify-between text-sm opacity-70">
        <span>{{ formatDate(write.created_at) }}</span>
        <span>{{ write.views_count }} görüntülenme</span>
      </div>
    </Link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch, onActivated, onDeactivated } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

defineOptions({ name: 'WriteList' });

const props = defineProps({
  writes: Array,
  route: Function,
});

const page = usePage();
const isAdmin = page.props.isAdmin || false;
const scrollContainer = ref(null);
const STORAGE_KEY = 'writeList_scrollPosition';
let isActive = false;

const filteredWrites = computed(() => {
  return isAdmin ? props.writes : props.writes.filter((write) => write.status !== 'private');
});

defineExpose({ filteredWrites, scrollContainer });

const saveScrollPosition = () => {
  if (scrollContainer.value) {
    localStorage.setItem(STORAGE_KEY, scrollContainer.value.scrollTop.toString());
  }
};

const restoreScrollPosition = () => {
  if (!scrollContainer.value) return;
  const saved = parseInt(localStorage.getItem(STORAGE_KEY));
  if (!isNaN(saved)) scrollContainer.value.scrollTop = saved;
};

onActivated(() => {
  isActive = true;
  nextTick(restoreScrollPosition);
});

onDeactivated(() => {
  isActive = false;
  saveScrollPosition();
});

watch(
  () => props.writes,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      nextTick(restoreScrollPosition);
    }
  },
  { deep: true }
);

onMounted(() => {
  isActive = true;
  nextTick(restoreScrollPosition);

  scrollContainer.value?.addEventListener('scroll', saveScrollPosition);

  const handlePopState = () => {
    if (isActive) nextTick(restoreScrollPosition);
  };

  window.addEventListener('popstate', handlePopState);

  onUnmounted(() => {
    isActive = false;
    scrollContainer.value?.removeEventListener('scroll', saveScrollPosition);
    window.removeEventListener('popstate', handlePopState);
    saveScrollPosition();
  });
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getLinkClasses = (href) => {
  const isActive = window.location.pathname === href;
  return isActive ? 'bg-base-200 text-base-content' : 'bg-base-100 text-base-content hover:bg-base-200';
};
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
