<template>
  <div class="lg:grid-cols-subsidebar grid h-full grid-cols-1">
    <SidebarLayoutBookmarks class="block" />
    <div class="hidden p-4 lg:block">Bookmarks</div>
  </div>
</template>

<script setup>
import SidebarLayoutBookmarks from './SidebarLayoutBookmarks.vue';
</script>
