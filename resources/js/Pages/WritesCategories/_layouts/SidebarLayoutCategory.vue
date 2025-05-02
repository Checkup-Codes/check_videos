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
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_components/CategoryTree.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';

const { props, url } = usePage();
const categories = ref(props.categories || []);
const writes = ref(props.writes || []);
const parentCategories = ref([]);
const showCategories = ref(true);
const isCollapsed = ref(true);
const areAllCategoriesExpanded = ref(false);
const categoryTreeRef = ref(null);

const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};

// Tüm kategorileri genişlet veya daralt
const toggleAllCategories = () => {
  areAllCategoriesExpanded.value = !areAllCategoriesExpanded.value;

  if (categoryTreeRef.value) {
    categoryTreeRef.value.expandAllCategories(areAllCategoriesExpanded.value);
  }
};

const getLinkClasses = (href) => {
  return url === href ? 'active' : '';
};

const calculateCategoryCounts = () => {
  const counts = {};
  writes.value.forEach((write) => {
    if (write.category_id) {
      counts[write.category_id] = (counts[write.category_id] || 0) + 1;
    }
  });

  categories.value.forEach((category) => {
    category.writeCount = counts[category.id] || 0;
  });
};

const buildCategoryTree = () => {
  const map = {};
  const roots = [];

  categories.value.forEach((category) => {
    map[category.id] = { ...category, children: [] };
  });

  categories.value.forEach((category) => {
    if (category.parent_id) {
      map[category.parent_id]?.children.push(map[category.id]);
    } else {
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
