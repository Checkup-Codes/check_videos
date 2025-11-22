<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link, usePage } from '@inertiajs/vue3';
// @ts-ignore
import { useStore } from 'vuex';

const showingNavigationDropdown = ref(false);
const store = useStore();
const page = usePage();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Prevent body scroll for authenticated pages
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div>
    <div class="bg-base-100 h-screen overflow-hidden">
      <!-- Page Heading -->
      <header class="bg-base-200 shadow" v-if="$slots.header">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <!-- Page Content -->
      <main class="overflow-y-auto" style="height: calc(100vh - 6rem)">
        <slot />
      </main>
    </div>
  </div>
</template>
