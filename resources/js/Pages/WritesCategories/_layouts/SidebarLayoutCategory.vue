<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" class="btn-ghost" />
    <TopSubsidebar
      title="KATEGORİLER"
      href="/categories/create"
      :showExpandCollapseButton="true"
      :isExpanded="areAllCategoriesExpanded"
      @toggle-expand="toggleAllCategories"
      class="border-base-200"
    >
      <template #actions>
        <PerformanceMonitorButton v-if="shouldShowPerformanceMonitor" :performance="performanceData" />
      </template>
    </TopSubsidebar>
    <SubSidebarScreen>
      <CategoryTree
        v-if="showCategories"
        ref="categoryTreeRef"
        :parentCategories="parentCategories"
        :getLinkClasses="getLinkClasses"
        :expandAll="areAllCategoriesExpanded"
      />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_composable/CategoryTree.vue';
import PerformanceMonitorButton from '@/Pages/WritesCategories/_composable/PerformanceMonitorButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutCategory',
});

// Get page props
const { props, url } = usePage();
const categories = ref(props.categories || []);
const writes = ref(props.writes || []);
const parentCategories = ref([]);
const showCategories = ref(true);
const isCollapsed = ref(true);
const areAllCategoriesExpanded = ref(false);
const categoryTreeRef = ref(null);

const emit = defineEmits(['update:isCollapsed']);

// Only show performance monitor for admins and when data is available
const shouldShowPerformanceMonitor = computed(() => {
  return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
});

// Access performance data with safe fallback
const performanceData = computed(() => props.performance || {});

// Toggle sidebar collapse state
const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};

// Toggle expansion state of all categories
const toggleAllCategories = () => {
  areAllCategoriesExpanded.value = !areAllCategoriesExpanded.value;

  if (categoryTreeRef.value) {
    categoryTreeRef.value.expandAllCategories(areAllCategoriesExpanded.value);
  }
};

// Determine active link style based on current URL
const getLinkClasses = (href) => {
  return url === href ? 'font-medium !text-primary' : '';
};

// Build hierarchical category tree from flat list
const buildCategoryTree = () => {
  if (!categories.value || !categories.value.length) {
    parentCategories.value = [];
    return;
  }

  const map = {};
  const roots = [];

  // Create map of categories with empty children arrays
  categories.value.forEach((category) => {
    if (category && category.id) {
      map[category.id] = { ...category, children: [] };
    }
  });

  // Populate children arrays and identify root categories
  categories.value.forEach((category) => {
    if (!category) return;

    if (category.parent_id && map[category.parent_id]) {
      map[category.parent_id]?.children.push(map[category.id]);
    } else if (!category.parent_id) {
      roots.push(map[category.id]);
    }
  });

  parentCategories.value = roots;
};

onMounted(() => {
  buildCategoryTree();
});

onBeforeUnmount(() => {
  // Clear references to prevent memory leaks and null reference issues
  categoryTreeRef.value = null;
  parentCategories.value = [];
});
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: var(--b2) !important;
}
</style>
