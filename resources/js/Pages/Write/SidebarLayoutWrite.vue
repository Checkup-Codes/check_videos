<template>
  <div class="flex justify-between">
    <Link href="/writes">
      <div class="m-2 rounded p-2 text-center font-bold text-black underline">All Writes</div>
    </Link>
    <Link href="/writes/create">
      <div class="m-2 rounded p-2 text-center font-bold text-black underline">Create Write</div>
    </Link>
  </div>
  <div v-for="write in writes" :key="write.id" class="ml-2 border-l-4">
    <Link :href="`/writes/${write.slug}`" :class="linkClasses">
      <div class="font-bold">{{ write.title }}</div>
      <div class="font-light text-gray-500">{{ truncateSummary(write.summary) }}</div>
      <div class="text-sm text-gray-400">{{ formatDate(write.published_at) }}</div>
    </Link>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useStore } from 'vuex';

const store = useStore();
const writes = computed(() => store.getters['Writes/writes']);

onMounted(() => {
  if (!writes.value.length) {
    store.dispatch('Writes/fetchWrites');
  }
});

const truncateSummary = (summary) => {
  return summary.length > 40 ? summary.slice(0, 40) + '...' : summary;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const linkClasses =
  'm-2 block cursor-pointer rounded p-1 text-black transition-all transition-colors duration-200 hover:bg-gray-900 hover:text-white hover:shadow-lg';
</script>
