<template>
  <div :class="sidebarClass">
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

const sidebarClass = computed(() => {
  console.log('activeMenu in sidebar:', activeMenu.value); // Bu, activeMenu'nun doğru ayarlanıp ayarlanmadığını kontrol eder.
  return activeMenu.value === 'about' || activeMenu.value.includes('writes')
    ? 'grid-cols-withsidebar grid h-screen'
    : 'grid-cols-withoutsidebar grid h-screen';
});

const showSubSidebarLayout = computed(() => {
  return activeMenu.value === 'writes' || activeMenu.value === 'about';
});
</script>
