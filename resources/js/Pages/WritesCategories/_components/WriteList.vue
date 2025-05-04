<template>
  <div ref="scrollContainer" class="h-full w-full overflow-y-auto px-2 py-3">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="route('writes.show', { write: write.slug })"
      :class="[
        activeWrite === `/writes/${write.slug}`
          ? 'border-l-4 border-l-primary bg-base-200'
          : 'border-l border-l-base-200',
        'mb-2 block rounded-r p-3 transition-all hover:bg-base-200',
      ]"
      @click="saveScrollPosition"
    >
      <!-- Başlık ve kilit ikonu -->
      <div class="flex items-center gap-2 font-medium">
        <span v-if="write.status === 'private'" class="text-base-content opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span class="truncate text-sm">{{ write.title }}</span>
      </div>

      <!-- Tarih ve görüntülenme -->
      <div class="mt-1.5 flex justify-between text-xs opacity-60">
        <span>{{ formatDate(write.created_at) }}</span>
        <div class="inline-flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {{ write.views_count }}
        </div>
      </div>
    </Link>

    <!-- Boş durum -->
    <div v-if="filteredWrites.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz yazı bulunmuyor</div>
    </div>
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
const activeWrite = ref('');

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
  nextTick(() => {
    restoreScrollPosition();
    updateActiveWrite();
  });
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

const updateActiveWrite = () => {
  activeWrite.value = window.location.pathname;
};

onMounted(() => {
  isActive = true;
  updateActiveWrite();
  nextTick(restoreScrollPosition);

  scrollContainer.value?.addEventListener('scroll', saveScrollPosition);

  const handlePopState = () => {
    if (isActive) {
      nextTick(() => {
        restoreScrollPosition();
        updateActiveWrite();
      });
    }
  };

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('inertia:success', updateActiveWrite);

  onUnmounted(() => {
    isActive = false;
    scrollContainer.value?.removeEventListener('scroll', saveScrollPosition);
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('inertia:success', updateActiveWrite);
    saveScrollPosition();
  });
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 3px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .overflow-y-auto {
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
