<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar
      title="KATEGORİLER"
      href="/categories/create"
      :showExpandCollapseButton="true"
      :isExpanded="areAllCategoriesExpanded"
      @toggle-expand="toggleAllCategories"
    />
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
import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_components/CategoryTree.vue';
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
  return url === href ? 'active' : '';
};

// Calculate counts for each category
const calculateCategoryCounts = () => {
  // Use writes_count from backend, or calculate based on category_id if needed
  // This is now handled by the backend
};

// Build hierarchical category tree from flat list
const buildCategoryTree = () => {
  const map = {};
  const roots = [];

  // Create map of categories with empty children arrays
  categories.value.forEach((category) => {
    map[category.id] = { ...category, children: [] };
  });

  // Populate children arrays and identify root categories
  categories.value.forEach((category) => {
    if (category.parent_id && map[category.parent_id]) {
      map[category.parent_id]?.children.push(map[category.id]);
    } else if (!category.parent_id) {
      roots.push(map[category.id]);
    }
  });

  parentCategories.value = roots;
};

onMounted(() => {
  calculateCategoryCounts();
  buildCategoryTree();
});
</script>
