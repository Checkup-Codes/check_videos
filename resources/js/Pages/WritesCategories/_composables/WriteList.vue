<template>
  <div ref="scrollContainer" class="write-list-container space-y-1 overflow-y-auto p-3">
    <!-- Search bar for all users -->
    <div class="mb-3">
      <input v-model="searchQuery" type="text" class="input-bordered input w-full" placeholder="Yazı başlığı ara..." />
    </div>
    <!-- Responsive filter buttons for logged-in users -->
    <div v-if="isAdmin" class="mb-3">
      <div class="hidden gap-2 sm:flex">
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-primary': adminFilter === 'all' }"
          @click="adminFilter = 'all'"
        >
          <span v-if="props.isCollapsed">
            <!-- List icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
          <span v-else>Tümü</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-primary': adminFilter === 'published' }"
          @click="adminFilter = 'published'"
        >
          <span v-if="props.isCollapsed">
            <!-- Globe icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
              />
            </svg>
          </span>
          <span v-else>Herkese Açık</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-primary': adminFilter === 'link_only' }"
          @click="adminFilter = 'link_only'"
        >
          <span v-if="props.isCollapsed">
            <!-- Link icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
              />
            </svg>
          </span>
          <span v-else>Sadece Link</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-primary': adminFilter === 'private' }"
          @click="adminFilter = 'private'"
        >
          <span v-if="props.isCollapsed">
            <!-- Lock icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
              />
            </svg>
          </span>
          <span v-else>Gizli</span>
        </button>
      </div>
      <!-- Mobile: show filter icon -->
      <div class="relative inline-block sm:hidden">
        <button @click="showFilterMenu = !showFilterMenu" class="btn btn-ghost btn-xs">
          <!-- Heroicons funnel icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
            />
          </svg>
        </button>
        <div
          v-if="showFilterMenu"
          class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="flex flex-col gap-1 py-1">
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-primary': adminFilter === 'all' }"
              @click="
                adminFilter = 'all';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-primary': adminFilter === 'published' }"
              @click="
                adminFilter = 'published';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-primary': adminFilter === 'link_only' }"
              @click="
                adminFilter = 'link_only';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-primary': adminFilter === 'private' }"
              @click="
                adminFilter = 'private';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
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
import { ref, onMounted, onUnmounted, computed, watch, onActivated, onDeactivated, inject } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';

defineOptions({ name: 'WriteList' });

const props = defineProps({
  writes: { type: Array, default: () => [] },
  route: { type: Function, default: null },
  isCollapsed: { type: Boolean, default: false },
});

const writes = props.writes.length ? props.writes : inject('writes', []);
const page = usePage();
const isAdmin = page.props.isAdmin || false;
const scrollContainer = ref(null);
let isActive = false;
const activeWrite = ref('');

// Search and filter state
const searchQuery = ref('');
const adminFilter = ref('all');
const showFilterMenu = ref(false);

const filteredWrites = computed(() => {
  let result = writes;
  // Search filter for all users
  if (searchQuery.value) {
    result = result.filter((write) => write.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (!isAdmin) {
    // Guest: hide private
    result = result.filter((write) => write.status !== 'private');
    return result;
  } else {
    // Admin: filter by selected status
    if (adminFilter.value === 'published') {
      result = result.filter((write) => write.status === 'published');
    } else if (adminFilter.value === 'link_only') {
      result = result.filter((write) => write.status === 'link_only');
    } else if (adminFilter.value === 'private') {
      result = result.filter((write) => write.status === 'private');
    }
    return result;
  }
});

defineExpose({ filteredWrites, scrollContainer });

/**
 * Handle component activation (from KeepAlive)
 */
onActivated(() => {
  isActive = true;
  updateActiveWrite();
});

/**
 * Handle component deactivation (from KeepAlive)
 */
onDeactivated(() => {
  isActive = false;
});

/**
 * Watch for changes in the writes array
 */
watch(
  () => writes,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
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
  const handlePopState = () => {
    if (isActive) {
      updateActiveWrite();
    }
  };

  // Handle Inertia navigation
  const handleNavigationStart = () => {};

  const handleNavigationEnd = () => {
    if (isActive) {
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
