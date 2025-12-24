<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- View Toggle - Always visible -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-2">
      <div class="flex items-center justify-between gap-2">
        <!-- View Toggle (Left) -->
        <div class="flex items-center gap-1">
          <Link
            :href="route('writes.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              isListView
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Liste görünümü"
          >
            <IconMenu class="h-3 w-3" />
            <span v-if="!isNarrow">Liste</span>
          </Link>
          <Link
            :href="route('categories.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              !isListView
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Kategori görünümü"
          >
            <IconFolder class="h-3 w-3" />
            <span v-if="!isNarrow">Kategori</span>
          </Link>
        </div>
        <!-- Filter Controls (Right) - Only for logged in users -->
        <div v-if="isLoggedIn" class="flex items-center gap-1">
          <button
            v-if="writeFilter !== 'all'"
            @click="clearWriteFilter"
            class="inline-flex h-6 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Filtreyi temizle"
          >
            <IconX class="h-3 w-3" />
          </button>
          <div class="write-filter-dropdown-container relative">
            <button
              @click.stop="showWriteFilterDropdown = !showWriteFilterDropdown"
              class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent text-accent-foreground': showWriteFilterDropdown }"
              title="Filtrele"
            >
              <IconFilter class="h-3 w-3" />
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
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <WriteList ref="writeListRef" :writes="writes" :route="route" :isCollapsed="isNarrow" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import {
  ref,
  watch,
  inject,
  onMounted,
  onBeforeUnmount,
  computed,
  onUnmounted,
  onActivated,
  onDeactivated,
  nextTick,
} from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import WriteList from '@/Pages/WritesCategories/_composables/WriteList.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';
import IconMenu from '../_components/icons/IconMenu.vue';
import IconFolder from '../_components/icons/IconFolder.vue';
import IconX from '../_components/icons/IconX.vue';
import IconFilter from '../_components/icons/IconFilter.vue';

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

// Write filter state from store
const showWriteFilterDropdown = ref(false);
const writeFilter = computed({
  get: () => store.getters['Writes/filter'],
  set: (val) => store.dispatch('Writes/setFilter', val),
});

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
  store.dispatch('Writes/setFilter', filter);
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
let scrollHandler = null;

/**
 * Get scroll element - SubSidebarScreen exposes containerRef via $el
 */
const getScrollElement = () => {
  // Try to get the exposed $el ref first
  if (scrollableRef.value?.$el?.value) {
    return scrollableRef.value.$el.value;
  }
  // Fallback to component's root element
  if (scrollableRef.value?.$el) {
    return scrollableRef.value.$el;
  }
  return scrollableRef.value;
};

/**
 * Save scroll position to store
 */
const saveScrollPosition = () => {
  const scrollElement = getScrollElement();
  if (scrollElement) {
    const scrollTop = scrollElement.scrollTop || 0;
    store.dispatch('Writes/setScrollPosition', scrollTop);
  }
};

/**
 * Restore scroll position from store
 */
const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Writes/scrollPosition'];
      if (savedPosition > 0) {
        scrollElement.scrollTop = savedPosition;
      }
    }
  });
};

/**
 * Setup scroll listener
 */
const setupScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && !scrollHandler) {
    scrollHandler = () => saveScrollPosition();
    scrollElement.addEventListener('scroll', scrollHandler, { passive: true });
  }
};

/**
 * Remove scroll listener
 */
const removeScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && scrollHandler) {
    scrollElement.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
};

/**
 * Initialize component
 */
onMounted(() => {
  // Sync with store state
  isNarrow.value = store.getters['Writes/isCollapsed'];

  // Setup scroll handling
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });

  // Close dropdown when clicking outside
  clickOutsideHandler = (event) => {
    if (showWriteFilterDropdown.value && !event.target.closest('.write-filter-dropdown-container')) {
      showWriteFilterDropdown.value = false;
    }
  };
  document.addEventListener('click', clickOutsideHandler);
});

/**
 * KeepAlive activated - restore scroll position
 */
onActivated(() => {
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
});

/**
 * KeepAlive deactivated - save scroll position
 */
onDeactivated(() => {
  saveScrollPosition();
  removeScrollListener();
});

onBeforeUnmount(() => {
  saveScrollPosition();
  removeScrollListener();
});

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
});
</script>

<style scoped>
/* Ensure header background is not affected by parent bg-muted */
.shrink-0.border-b {
  background: hsl(var(--background)) !important;
}

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
