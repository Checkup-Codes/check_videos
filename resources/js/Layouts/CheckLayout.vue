<template>
  <div :class="layoutClass">
    <SidebarLayout />
    <SubSidebarLayout v-if="showSubSidebarLayout" />
    <div>
      <HeaderLayout />
      <slot>Default Content</slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import HeaderLayout from './CheckLayout/HeaderLayout.vue';
import SubSidebarLayout from './CheckLayout/SubSidebarLayout.vue';
import SidebarLayout from './CheckLayout/SidebarLayout.vue';

import { useStore } from 'vuex';

const store = useStore();

const activeMenu = computed(() => store.getters['ActiveMenu/activeMenu']);

const layoutClass = computed(() => {
  return activeMenu.value === 'writes' || activeMenu.value === 'about'
    ? 'grid-cols-withsidebar grid h-screen'
    : 'grid-cols-withoutsidebar grid h-screen';
});

const showSubSidebarLayout = computed(() => {
  return activeMenu.value === 'writes' || activeMenu.value === 'about';
});
</script>
