<template>
  <a :href="href" target="_blank" class="btn btn-circle btn-xs text-base-content hover:bg-base-300" :title="label">
    <font-awesome-icon :icon="icon" class="h-3.5 w-3.5" />
  </a>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  icon: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  shortcut: {
    type: String,
    default: null,
  },
});
</script>
