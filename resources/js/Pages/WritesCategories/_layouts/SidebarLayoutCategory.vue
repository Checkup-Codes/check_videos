<template>
  <CheckSubsidebar :isNarrow="isNarrow" :class="currentTheme">
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded">
      <CategoryTree
        v-if="showCategories"
        ref="categoryTreeRef"
        :getLinkClasses="getLinkClasses"
        :expandAll="areAllCategoriesExpanded"
        :isCollapsed="isNarrow"
        :enableExpandCollapse="true"
        @toggle-expand="toggleAllCategories"
      />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, computed, onMounted } from 'vue';
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

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Global categories'i inject ile al
const categories = inject('categories', []);
const parentCategories = computed(() =>
  categories.filter(
    (cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === 'null' || cat.parent_id === 0
  )
);

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

// On mount, sync with store
onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
});

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('categorySidebarScroll', scrollTop);
};

// Helper function to get all category IDs recursively
const getAllCategoryIds = (categories) => {
  let ids = [];
  categories.forEach((category) => {
    ids.push(category.id);
    if (category.children && category.children.length > 0) {
      ids = ids.concat(getAllCategoryIds(category.children));
    }
  });
  return ids;
};

const toggleAllCategories = () => {
  if (areAllCategoriesExpanded.value) {
    // If expanded, collapse all
    const allIds = getAllCategoryIds(categories);
    store.dispatch('CategorySidebar/collapseAll', allIds);
  } else {
    // If collapsed, expand all
    store.dispatch('CategorySidebar/expandAll');
  }
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
  border-color: var(--b2) !important;
}

/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--b1) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--b2) / 0.3), transparent);
  pointer-events: none;
}
</style>
