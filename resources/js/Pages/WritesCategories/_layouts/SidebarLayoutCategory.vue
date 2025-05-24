<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="toggleSidebar" class="btn-ghost" />
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
import { ref } from 'vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_composables/CategoryTree.vue';
import PerformanceMonitorButton from '@/Pages/WritesCategories/_composables/PerformanceMonitorButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useCategoryTree } from '../_utils/useCategoryTree';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutCategory',
});

// Composables
const { isCollapsed, toggleSidebar, shouldShowPerformanceMonitor, performanceData } = useSidebar();
const { parentCategories, areAllCategoriesExpanded, getLinkClasses, toggleAllCategories } = useCategoryTree();

// Local state
const showCategories = ref(true);
const categoryTreeRef = ref(null);
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: var(--b2) !important;
}
</style>
