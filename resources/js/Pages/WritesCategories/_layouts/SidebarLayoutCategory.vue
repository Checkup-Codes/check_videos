<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- Collapse/Expand Controls - Only for logged in users -->
    <div v-if="isLoggedIn" class="shrink-0 border-b border-border bg-background/95 p-2">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span v-if="!isNarrow">Kategori</span>
          </Link>
        </div>
        <!-- Collapse/Expand Button (Right) -->
        <div class="flex items-center gap-1">
          <button
            @click="toggleAllCategories"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            :class="{ 'bg-accent text-accent-foreground': areAllCategoriesExpanded }"
            :title="areAllCategoriesExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 transition-transform duration-200"
              :class="{ 'rotate-180': areAllCategoriesExpanded }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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
import { ref, watch, computed, onMounted, inject } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_composables/CategoryTree.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';

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
const isListView = computed(() => {
  const url = page.url;
  return url.startsWith('/writes') && !url.startsWith('/categories');
});

// Categories from inject or props
const injectedCategories = inject('categories', []);
const categories = computed(() => {
  if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
    return injectedCategories;
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

// On mount, sync with store
onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
});

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('categorySidebarScroll', scrollTop);
};

onMounted(() => {
  if (scrollableRef.value) {
    scrollableRef.value.addEventListener && scrollableRef.value.addEventListener('scroll', handleScroll);
    if (scrollableRef.value.$el) {
      scrollableRef.value.$el.addEventListener('scroll', handleScroll);
      // Scroll pozisyonunu geri yükle
      const savedScroll = localStorage.getItem('categorySidebarScroll');
      if (savedScroll) {
        scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }
});
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: hsl(var(--border)) !important;
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
