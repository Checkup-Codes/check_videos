<template>
  <div ref="scrollContainer" class="write-list-container h-full space-y-1 overflow-y-auto p-3">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="route('writes.show', { write: write.slug })"
      :class="[
        'block items-center justify-between rounded-lg border px-1 py-2 backdrop-blur-md transition-all duration-200',
        activeWrite === `/writes/${write.slug}`
          ? 'border-primary bg-primary text-primary-content shadow-md'
          : 'border-base-200 bg-base-200 text-base-content hover:bg-base-300',
      ]"
      @click="handleWriteClick(write)"
    >
      <!-- Başlık + Kilit -->
      <div class="mb-1 flex items-center gap-2">
        <span v-if="write.status === 'private'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span
          v-if="write.status === 'link_only'"
          :class="[activeWrite === `/writes/${write.slug}` ? 'text-primary-content' : 'text-primary']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span>{{ write.title }}</span>
      </div>

      <!-- Tarih ve view bilgisi -->
      <div class="text-base-content/70 flex justify-between text-xs">
        <span>{{ formatDate(write.created_at) }}</span>
        <span class="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[14px] w-[14px]"
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
        </span>
      </div>
    </Link>

    <!-- Boş durum -->
    <div v-if="filteredWrites.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz yazı bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, onActivated, onDeactivated } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { useScrollManager } from '@/Pages/WritesCategories/_utils/useScrollManager';

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

// Initialize scroll manager
const { saveScrollPosition, getSavedScrollPosition, cleanup } = useScrollManager(STORAGE_KEY);

const filteredWrites = computed(() => {
  return isAdmin ? props.writes : props.writes.filter((write) => write.status !== 'private');
});

defineExpose({ filteredWrites, scrollContainer });

/**
 * Handle write click event
 */
const handleWriteClick = (write) => {
  const currentScroll = scrollContainer.value?.scrollTop || 0;
  if (currentScroll > 0) {
    saveScrollPosition(currentScroll, true); // Save immediately
  }
};

/**
 * Restore scroll position from storage
 */
const restoreScrollPosition = () => {
  if (!scrollContainer.value) return;

  const savedPosition = getSavedScrollPosition();
  if (savedPosition > 0) {
    scrollContainer.value.scrollTop = savedPosition;

    // Ensure the active write is visible without animation
    const activeWriteElement = document.querySelector('.border-primary');
    if (activeWriteElement) {
      const containerRect = scrollContainer.value.getBoundingClientRect();
      const elementRect = activeWriteElement.getBoundingClientRect();

      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        activeWriteElement.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }
};

/**
 * Handle component activation (from KeepAlive)
 */
onActivated(() => {
  isActive = true;
  restoreScrollPosition();
  updateActiveWrite();
});

/**
 * Handle component deactivation (from KeepAlive)
 */
onDeactivated(() => {
  isActive = false;
  const currentScroll = scrollContainer.value?.scrollTop || 0;
  if (currentScroll > 0) {
    saveScrollPosition(currentScroll, true);
  }
});

/**
 * Watch for changes in the writes array
 */
watch(
  () => props.writes,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      restoreScrollPosition();
    }
  },
  { deep: true }
);

/**
 * Update active write based on current URL
 */
const updateActiveWrite = () => {
  activeWrite.value = window.location.pathname;
};

/**
 * Handle component mount
 */
onMounted(() => {
  isActive = true;
  updateActiveWrite();
  restoreScrollPosition();

  // Add scroll event listener with passive option for better performance
  const handleScroll = () => {
    if (isActive && scrollContainer.value) {
      saveScrollPosition(scrollContainer.value.scrollTop);
    }
  };

  scrollContainer.value?.addEventListener('scroll', handleScroll, { passive: true });

  // Handle browser navigation
  const handlePopState = () => {
    if (isActive) {
      restoreScrollPosition();
      updateActiveWrite();
    }
  };

  // Handle Inertia navigation
  const handleNavigationStart = () => {
    if (isActive && scrollContainer.value) {
      const currentScroll = scrollContainer.value.scrollTop;
      if (currentScroll > 0) {
        saveScrollPosition(currentScroll, true);
      }
    }
  };

  const handleNavigationEnd = () => {
    if (isActive) {
      restoreScrollPosition();
      updateActiveWrite();
    }
  };

  // Add event listeners
  window.addEventListener('popstate', handlePopState);
  window.addEventListener('inertia:start', handleNavigationStart);
  window.addEventListener('inertia:finish', handleNavigationEnd);

  // Cleanup on unmount
  onUnmounted(() => {
    isActive = false;
    cleanup();
    scrollContainer.value?.removeEventListener('scroll', handleScroll);
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('inertia:start', handleNavigationStart);
    window.removeEventListener('inertia:finish', handleNavigationEnd);
  });
});

/**
 * Format date for display
 */
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.write-list-container {
  height: calc(100vh - 4rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* Remove smooth scroll behavior */
  /* scroll-behavior: smooth; */
}

/* Custom scrollbar styling */
.write-list-container::-webkit-scrollbar {
  width: 6px;
}

.write-list-container::-webkit-scrollbar-track {
  background: transparent;
}

.write-list-container::-webkit-scrollbar-thumb {
  background-color: rgba(var(--color-base-300), 0.5);
  border-radius: 3px;
}

@media (prefers-color-scheme: dark) {
  .write-list-container::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-base-100), 0.5);
  }
}
</style>
