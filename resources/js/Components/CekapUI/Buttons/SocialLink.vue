<template>
  <a :href="href" target="_blank" class="btn btn-ghost text-base-content w-full justify-between px-4 py-3 normal-case">
    <div class="flex items-center">
      <font-awesome-icon :icon="icon" class="mr-3 w-5 text-center" />
      <span>{{ label }}</span>
    </div>
    <div v-if="shortcut" class="badge badge-sm">{{ shortcut }}</div>
  </a>
</template>

<script setup>
import { onMounted } from 'vue';
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

onMounted(() => {
  if (props.shortcut) {
    document.addEventListener('keydown', handleKeyPress);
  }
});

function handleKeyPress(event) {
  // Check if no input element is focused
  if (
    document.activeElement.tagName !== 'INPUT' &&
    document.activeElement.tagName !== 'TEXTAREA' &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    if (event.key === props.shortcut) {
      window.open(props.href, '_blank');
    }
  }
}
</script>
