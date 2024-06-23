<template>
  <div id="sub-sidebar" class="sticky top-0 z-10 h-full bg-sidebar text-sm shadow-md">
    <div v-if="activeMenu === 'writes'">
      <SidebarLayoutWrite />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import SidebarLayoutWrite from '@/Pages/Write/SidebarLayoutWrite.vue';

const store = useStore();
const activeMenu = computed(() => store.getters['ActiveMenu/activeMenu']);


</script>