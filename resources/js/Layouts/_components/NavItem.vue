<template>
  <Link
    :href="href"
    class="flex w-full items-center justify-between rounded-lg border px-3 py-1.5 backdrop-blur-md transition-all duration-200"
    :class="{
      // Aktif durumda: tema uyumlu ve zıt kontrast
      'border-primary bg-primary text-primary-content shadow-md': isActive,
      // Pasif durumda: yumuşak görünüm
      'border-base-200 bg-base-200 text-base-content hover:bg-base-300': !isActive,
    }"
  >
    <!-- Sol kısım: İkon + Label -->
    <div class="flex items-center gap-3">
      <font-awesome-icon
        :icon="dynamicIcon"
        class="h-4 w-4 transition-colors duration-200"
        :class="isActive ? 'text-primary-content' : 'text-base-content'"
      />
      <span
        class="font-sans text-sm transition-colors duration-200"
        :class="isActive ? 'text-primary-content' : 'text-base-content'"
      >
        {{ label }}
      </span>
    </div>

    <!-- Sağ kısım: Shortcut badge -->
    <div
      v-if="shortcut"
      class="rounded border px-2 py-0.5 text-xs transition-all"
      :class="
        isActive
          ? 'bg-primary/20 border-primary text-primary-content'
          : 'text-base-content/70 border-base-200 bg-base-100'
      "
    >
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
