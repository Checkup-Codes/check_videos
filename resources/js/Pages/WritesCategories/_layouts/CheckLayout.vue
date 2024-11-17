<template>
  <Head :title="titleName" />
  <ToggleButton v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <SidebarLayoutWrite
      v-if="isSidebarCollapsed && screenName === 'writes'"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <SidebarLayoutCategory v-else-if="isSidebarCollapsed && screenName === 'categories'" :class="sidebarStyle" />
    <slot name="screen"></slot>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Modals/CCheckLayout.vue';
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import { usePage, Head } from '@inertiajs/vue3';
import ToggleButton from '@/Components/CekapUI/Buttons/CToggleButton.vue';
import { ref } from 'vue';

const { props } = usePage();
const sidebarStyle = props.screen.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.screen.name;
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ';

const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
  console.log('Sidebar collapsed state updated:', newState);
};

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
