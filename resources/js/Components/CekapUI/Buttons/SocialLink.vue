<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex w-full items-center justify-between px-4 py-2 transition-colors duration-150"
    :class="{ 'border-l-4 border-primary bg-base-200': isActive }"
    :title="label"
  >
    <!-- Sol kısım: İkon + Label -->
    <div class="flex items-center gap-3">
      <font-awesome-icon :icon="icon" class="h-5 w-5 text-base-content" />
      <span class="text-sm font-medium text-base-content">{{ label }}</span>
    </div>

    <!-- Sağ kısım: Shortcut badge -->
    <div v-if="shortcut" class="badge text-xs">
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
});

// Aktiflik kontrolü sadece domain eşleşmesi ya da matchPath'e göre yapılır
const isActive = computed(() => {
  return props.matchPath && window.location.href.includes(props.matchPath);
});

// Kısayol tuşuyla aç
function handleKeyPress(event) {
  if (
    props.shortcut &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    event.key === props.shortcut &&
    document.activeElement.tagName !== 'INPUT' &&
    document.activeElement.tagName !== 'TEXTAREA'
  ) {
    window.open(props.href, '_blank');
  }
}

onMounted(() => {
  if (props.shortcut) {
    document.addEventListener('keydown', handleKeyPress);
  }
});

onBeforeUnmount(() => {
  if (props.shortcut) {
    document.removeEventListener('keydown', handleKeyPress);
  }
});
</script>
