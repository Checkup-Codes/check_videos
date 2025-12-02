<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- Filter Controls - Only for logged in users -->
    <div v-if="isLoggedIn" class="shrink-0 border-b border-border bg-background/95 p-2">
      <div class="flex items-center justify-between gap-2">
        <!-- View Toggle (Left) -->
        <div class="flex items-center gap-1">
          <Link
            :href="route('writes.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="isListView ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
            title="Liste görünümü"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span v-if="!isNarrow">Liste</span>
          </Link>
          <Link
            :href="route('categories.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="!isListView ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
            title="Kategori görünümü"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span v-if="!isNarrow">Kategori</span>
          </Link>
        </div>
        <!-- Filter Controls (Right) -->
        <div class="flex items-center gap-1">
          <button
            v-if="writeFilter !== 'all'"
            @click="clearWriteFilter"
            class="inline-flex h-6 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Filtreyi temizle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="relative write-filter-dropdown-container">
            <button
              @click.stop="showWriteFilterDropdown = !showWriteFilterDropdown"
              class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent text-accent-foreground': showWriteFilterDropdown }"
              title="Filtrele"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" />
              </svg>
              <span class="text-xs">{{ getFilterLabel(writeFilter) }}</span>
            </button>
            <div
              v-if="showWriteFilterDropdown"
              class="absolute left-0 top-full z-50 mt-1 w-32 rounded-md border border-border bg-popover shadow-md"
            >
              <div class="flex flex-col p-1">
                <button
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': writeFilter === 'all' }"
                  @click="setWriteFilter('all')"
                >
                  Tümü
                </button>
                <button
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': writeFilter === 'published' }"
                  @click="setWriteFilter('published')"
                >
                  Herkese Açık
                </button>
                <button
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': writeFilter === 'link_only' }"
                  @click="setWriteFilter('link_only')"
                >
                  Sadece Link
                </button>
                <button
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': writeFilter === 'private' }"
                  @click="setWriteFilter('private')"
                >
                  Gizli
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SubSidebarScreen ref="scrollableRef" class="flex-1 min-h-0 sidebar-content-embedded" :infoClass="'flex flex-col h-full min-h-0'">
      <WriteList ref="writeListRef" :writes="writes" :route="route" :isCollapsed="isNarrow" class="flex-1 min-h-0" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted, computed, onUnmounted } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import WriteList from '@/Pages/WritesCategories/_composables/WriteList.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutWrite',
});

// Composables
const { isCollapsed, toggleSidebar } = useSidebar();
const store = useStore();
const page = usePage();

// Authentication status
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Check if we're on list view (writes) or category view
const isListView = computed(() => {
  const url = page.url;
  return url.startsWith('/writes') && !url.startsWith('/categories');
});

// Write filter state
const showWriteFilterDropdown = ref(false);
const writeFilter = ref('all');

// Get filter label
const getFilterLabel = (filter) => {
  const filterLabels = {
    all: 'Tümü',
    published: 'Herkese Açık',
    link_only: 'Sadece Link',
    private: 'Gizli',
  };
  return filterLabels[filter] || 'Tümü';
};

// Set write filter
const setWriteFilter = (filter) => {
  writeFilter.value = filter;
  localStorage.setItem('writeListFilter', filter);
  showWriteFilterDropdown.value = false;
  window.dispatchEvent(new CustomEvent('writeFilterChanged', { detail: filter }));
};

// Clear write filter
const clearWriteFilter = () => {
  setWriteFilter('all');
};

// Local state
const { props } = usePage();
const writes = inject('writes', []);
const writeListRef = ref(null);
const scrollableRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);

const emit = defineEmits(['update:isNarrow']);

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

// Click outside handler
let clickOutsideHandler = null;

/**
 * Handle scroll events and save position to localStorage
 */
const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('writeSidebarScroll', scrollTop.toString());
};

/**
 * Initialize component and restore scroll position
 */
onMounted(() => {
  // Load filter from localStorage
  const savedFilter = localStorage.getItem('writeListFilter');
  if (savedFilter) {
    writeFilter.value = savedFilter;
  }

  // Sync with store state
  isNarrow.value = store.getters['Writes/isCollapsed'];

  // Setup scroll handling
  if (scrollableRef.value) {
    // Try both direct element and Vue component element
    const element = scrollableRef.value.$el || scrollableRef.value;

    if (element && element.addEventListener) {
      element.addEventListener('scroll', handleScroll);

      // Restore saved scroll position
      const savedScroll = localStorage.getItem('writeSidebarScroll');
      if (savedScroll) {
        element.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }

  // Close dropdown when clicking outside
  clickOutsideHandler = (event) => {
    if (showWriteFilterDropdown.value && !event.target.closest('.write-filter-dropdown-container')) {
      showWriteFilterDropdown.value = false;
    }
  };
  document.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
});
</script>

<style scoped>
/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--muted) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--border) / 0.3), transparent);
  pointer-events: none;
}
</style>
