<template>
  <div class="lg:grid-cols-sidebar grid h-screen grid-cols-1">
    <SidebarLayout class="hidden lg:block" />

    <div class="flex flex-1 flex-col">
      <HeaderLayout />
      <div class="flex-1 overflow-auto">
        <slot>Default Content</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderLayout from './CheckLayout/HeaderLayout.vue';
import SidebarLayout from './CheckLayout/SidebarLayout.vue';
</script>
