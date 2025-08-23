<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex w-full items-center justify-between rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200"
    :class="{
      'border-primary bg-primary text-primary-content shadow-md': isActive,
      'border-base-200 bg-base-200 text-base-content hover:bg-base-300': !isActive,
      'justify-center px-2': isCompact,
    }"
    :title="isCompact ? label : ''"
  >
    <!-- Sol kısım: İkon + Label -->
    <div class="flex items-center gap-3" :class="{ 'gap-0': isCompact }">
      <font-awesome-icon :icon="icon" class="h-5 w-5 text-base-content" />
      <span v-if="!isCompact" class="text-sm font-medium text-base-content">{{ label }}</span>
    </div>

    <!-- Sağ kısım: Shortcut badge -->
    <div v-if="shortcut && !isCompact" class="badge text-xs">
      {{ shortcut }}
    </div>
  </a>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, onBeforeUnmount, computed } from 'vue';

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
  shortcut: {
    type: String,
    default: null,
  },
  matchPath: {
    type: String,
    default: '', // örnek: '/twitter'
  },
  isCompact: {
    type: Boolean,
    default: false,
  },
});

// Aktiflik kontrolü sadece domain eşleşmesi ya da matchPath'e göre yapılır
const isActive = computed(() => {
  return props.matchPath && window.location.href.includes(props.matchPath);
});
</script>
