<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <ToggleSubSidebarButtonOpen v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <SidebarLayoutWrite
      v-if="isSidebarCollapsed && screenName === 'writes'"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <SidebarLayoutCategory
      v-else-if="isSidebarCollapsed && screenName === 'categories'"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Modals/CheckLayout.vue';
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();
const isMobile = props.screen.isMobileSidebar;
const sidebarStyle = isMobile ? '' : 'hidden lg:block';
const screenName = props.screen.name;
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ';
const flashSuccess = ref(props.flash.success);
const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
