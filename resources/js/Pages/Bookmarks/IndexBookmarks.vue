<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutBookmarks class="block" />
    <div class="hidden p-4 lg:block">Bookmarks</div>
  </div>
</template>

<script setup>
import SidebarLayoutBookmarks from './SidebarLayoutBookmarks.vue';
</script>
