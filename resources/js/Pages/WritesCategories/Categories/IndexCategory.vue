<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutCategory class="block" />
    <div class="hidden p-4 lg:block">Kategoriler</div>
  </div>
</template>

<script setup>
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
</script>
