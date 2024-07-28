<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <div v-if="screenName === 'writes'">
      <SidebarLayoutWrite :class="sidebarStyle" />
    </div>
    <div v-else-if="screenName === 'categories'">
      <SidebarLayoutCategory :class="sidebarStyle" />
    </div>
    <slot name="screen"></slot>
  </div>
</template>
<script setup>
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const sidebarStyle = props.screen.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.screen.name;
</script>
