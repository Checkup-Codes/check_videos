<template>
  <Link
    :href="href"
    :class="[
      'btn btn-ghost w-full justify-between px-4 py-3 normal-case text-base-content',
      { 'bg-base-200': isActive },
    ]"
  >
    <div class="flex items-center">
      <font-awesome-icon :icon="dynamicIcon" class="mr-3 w-5 text-center" />
      <span>{{ label }}</span>
    </div>
    <div v-if="shortcut" class="badge badge-sm">{{ shortcut }}</div>
  </Link>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
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
  shortcut: {
    type: String,
    default: null,
  },
  external: {
    type: Boolean,
    default: false,
  },
});

const dynamicIcon = computed(() => {
  return Array.isArray(props.icon) ? props.icon : props.icon;
});

const page = usePage();
const currentUrl = computed(() => page.url);

const isActive = computed(() => {
  const isRoot = props.href === '/';
  return isRoot ? currentUrl.value === props.href : currentUrl.value.startsWith(props.href);
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
      router.visit(props.href);
    }
  }
}
</script>
