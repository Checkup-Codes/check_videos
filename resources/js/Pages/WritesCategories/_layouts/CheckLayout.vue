<template>
  <Head :title="titleName" />
  <ToggleButton :isCollapsed="isCollapsed" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isCollapsed">
    <div v-if="screenName === 'writes'">
      <SidebarLayoutWrite v-if="isCollapsed" :class="sidebarStyle" />
    </div>
    <div v-else-if="screenName === 'categories'">
      <SidebarLayoutCategory :class="sidebarStyle" />
    </div>
    <slot name="screen"></slot>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Modals/CCheckLayout.vue';
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import ToggleButton from '@/Components/CekapUI/Buttons/CToggleButton.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();
const sidebarStyle = props.screen.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.screen.name;
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ';

const isCollapsed = ref(true);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
