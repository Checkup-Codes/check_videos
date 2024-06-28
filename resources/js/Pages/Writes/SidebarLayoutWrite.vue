<template>
  <div class="shadow-right z-10 h-full shadow-blue-100">
    <div class="z-10 flex cursor-pointer justify-between bg-sidebar text-sm text-black">
      <Link href="/writes">
        <div class="m-2 rounded p-1 text-center font-bold text-black underline">All Writes</div>
      </Link>
      <Link href="/writes/create">
        <div class="m-2 rounded p-1 text-center font-bold text-black underline">Create Write</div>
      </Link>
    </div>
    <div v-for="write in writes" :key="write.id" class="ml-2">
      <Link :href="`/writes/${write.slug}`" :class="linkClasses">
        <div class="font-bold">{{ write.title }}</div>
        <div class="font-light text-gray-500">{{ truncateSummary(write.summary) }}</div>
        <div class="text-sm text-gray-400">{{ formatDate(write.published_at) }}</div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const writes = ref(props.writes);
console.log(writes.value);
// watch(
//   () => props.writes,
//   (newWrites) => {
//     writes.value = newWrites;
//   }
// );

onMounted(() => {
  console.log('mounted');
});

const truncateSummary = (summary) => {
  return summary.length > 40 ? summary.slice(0, 40) + '...' : summary;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const linkClasses =
  'block cursor-pointer m-2 text-sm rounded p-1 text-black transition-all transition-colors duration-200 hover:bg-gray-900 hover:text-white hover:shadow-lg';
</script>
<!-- transition-all duration-200 hover:bg-gray-900 hover:px-2.5 hover:text-white hover:shadow-lg -->
