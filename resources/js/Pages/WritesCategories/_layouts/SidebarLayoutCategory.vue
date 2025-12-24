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
        <!-- Collapse/Expand Button (Right) - Only for logged in users -->
        <div v-if="isLoggedIn" class="flex items-center gap-1">
          <button
            @click="toggleAllCategories"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            :class="{ 'bg-accent text-accent-foreground': areAllCategoriesExpanded }"
            :title="areAllCategoriesExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
          >
            <IconChevronDown
              class="h-3 w-3 transition-transform duration-200"
              :class="{ 'rotate-180': areAllCategoriesExpanded }"
            />
            <span class="text-xs">{{ areAllCategoriesExpanded ? 'Daralt' : 'Genişlet' }}</span>
          </button>
        </div>
      </div>
    </div>
    <SubSidebarScreen
      ref="scrollableRef"
      class="sidebar-content-embedded min-h-0 flex-1"
      :infoClass="'flex-1 min-h-0 overflow-y-auto overscroll-none'"
    >
      <CategoryTree
        v-if="showCategories"
        ref="categoryTreeRef"
        :getLinkClasses="getLinkClasses"
        :expandAll="areAllCategoriesExpanded"
        :isCollapsed="isNarrow"
      />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, inject, nextTick } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_composables/CategoryTree.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';
import IconMenu from '../_components/icons/IconMenu.vue';
import IconFolder from '../_components/icons/IconFolder.vue';
import IconChevronDown from '../_components/icons/IconChevronDown.vue';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutCategory',
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
// For SidebarLayoutCategory component, we're always in category view
// So isListView should always be false to keep the category button active
const isListView = computed(() => {
  // This component is only used for category view, so always return false
  // This ensures consistent styling across /categories and /categories/* pages
  return false;
});

// Categories from inject or props - handle both computed ref and plain array
const injectedCategories = inject('categories', []);
const categories = computed(() => {
  // Handle both computed ref and plain array
  const categoriesValue = injectedCategories?.value ?? injectedCategories;
  if (categoriesValue && Array.isArray(categoriesValue) && categoriesValue.length > 0) {
    return categoriesValue;
  }
  if (page.props.categories && Array.isArray(page.props.categories) && page.props.categories.length > 0) {
    return page.props.categories;
  }
  return [];
});

// Diğer local state
const areAllCategoriesExpanded = computed(() => store.getters['CategorySidebar/collapsedSet'].size === 0);
const getLinkClasses = () => '';

const showCategories = ref(true);
const categoryTreeRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const emit = defineEmits(['update:isNarrow']);

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

// Helper function to get all category IDs recursively
const getAllCategoryIds = (categories) => {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return [];
  }

  let ids = [];
  categories.forEach((category) => {
    if (category && category.id) {
      ids.push(category.id);
      // Recursively get children IDs
      if (category.children && Array.isArray(category.children) && category.children.length > 0) {
        ids = ids.concat(getAllCategoryIds(category.children));
      }
    }
  });
  return ids;
};

// Toggle all categories expand/collapse
const toggleAllCategories = () => {
  const cats = categories.value;
  if (!cats || cats.length === 0) {
    console.warn('Categories not available for toggle');
    return;
  }

  if (areAllCategoriesExpanded.value) {
    // If expanded, collapse all
    const allIds = getAllCategoryIds(cats);
    if (allIds.length > 0) {
      store.dispatch('CategorySidebar/collapseAll', allIds);
    }
  } else {
    // If collapsed, expand all
    store.dispatch('CategorySidebar/expandAll');
  }
};

// Scroll handling
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
    store.dispatch('CategorySidebar/setScrollPosition', scrollTop);
  }
};

/**
 * Restore scroll position from store
 */
const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['CategorySidebar/scrollPosition'];
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

// On mount, sync with store and setup scroll
onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];

  // Setup scroll handling
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
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

// Cleanup scroll listener
onBeforeUnmount(() => {
  saveScrollPosition();
  removeScrollListener();
});
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: hsl(var(--border)) !important;
}

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
