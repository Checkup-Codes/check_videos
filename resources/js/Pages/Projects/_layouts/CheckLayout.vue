<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <div>
      <SidebarLayoutProject :class="sidebarStyle" />
    </div>
    <slot name="screen"></slot>
  </div>
</template>
<script setup>
import SidebarLayoutProject from '@/Pages/Projects/_layouts/SidebarLayoutProject.vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const sidebarStyle = props.screen.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.screen.name;
</script>
