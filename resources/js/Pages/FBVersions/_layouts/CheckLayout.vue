<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <div>
      <SidebarLayoutVersion :class="sidebarStyle" />
    </div>
    <slot name="screen"></slot>
  </div>
</template>
<script setup>
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const sidebarStyle = props.isMobileSidebar ? '' : 'hidden lg:block';
</script>
