<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="hover:bg-base-200/50 flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:scale-110"
    :title="label"
  >
    <font-awesome-icon :icon="icon" class="text-base-content/70 h-4 w-4 hover:text-base-content" />
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
    type: [String, Array],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
