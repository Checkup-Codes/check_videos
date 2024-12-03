<template>
  <div class="border-color-one overflow-hidden border-b-2 lg:relative">
    <div class="flex items-center justify-between">
      <div class="py-3 text-sm font-semibold">
        <span class="px-3 py-1">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
