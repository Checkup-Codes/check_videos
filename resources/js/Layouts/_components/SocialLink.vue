<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-base-100 hover:shadow-sm"
    :class="{
      'justify-center px-2': isCompact,
    }"
    :title="isCompact ? label : ''"
  >
    <!-- Sol kısım: İkon + Label -->
    <div class="flex items-center gap-3" :class="{ 'mx-auto gap-0': isCompact }">
      <font-awesome-icon :icon="icon" class="h-5 w-5 text-base-content" />
      <span v-if="!isCompact" class="text-sm font-medium text-base-content">{{ label }}</span>
    </div>
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
