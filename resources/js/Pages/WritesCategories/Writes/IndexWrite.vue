<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutWrite class="" />
    <div class="hidden lg:block">
      <div class="min-h-screen bg-gray-100">
        <header class="flex h-screen items-center justify-center bg-gray-100 text-black">
          <div class="text-center">
            <h2 class="mb-4 text-4xl font-bold">Yazılar</h2>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';
</script>
