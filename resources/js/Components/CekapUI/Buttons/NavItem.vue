<template>
  <Link
    :href="href"
    class="flex w-full items-center justify-between rounded-md px-4 py-2 transition-colors duration-150 hover:bg-base-200"
    :class="{ 'bg-base-300': isActive }"
  >
    <!-- Sol kısım: İkon + Label -->
    <div class="flex items-center gap-3">
      <font-awesome-icon :icon="dynamicIcon" class="h-5 w-5 text-base-content" />
      <span class="text-sm font-medium text-base-content">{{ label }}</span>
    </div>

    <!-- Sağ kısım: Shortcut badge -->
    <div v-if="shortcut" class="badge text-xs">
      {{ shortcut }}
    </div>
  </Link>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  href: String,
  icon: [String, Array],
  label: String,
  shortcut: String,
  external: Boolean,
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

function handleKeyPress(event) {
  if (
    document.activeElement.tagName !== 'INPUT' &&
    document.activeElement.tagName !== 'TEXTAREA' &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    event.key === props.shortcut
  ) {
    router.visit(props.href);
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
