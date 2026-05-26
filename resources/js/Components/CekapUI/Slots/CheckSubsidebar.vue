<template>
  <div :class="computedClass" class="relative z-10 flex flex-col h-full">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: '',
  },
  isNarrow: {
    type: Boolean,
    default: false,
  },
});

const computedClass = computed(() => {
  const baseClasses = `${props.infoClass} bg-muted overscroll-none border-r border-border subsidebar-enhanced`;
  return props.isNarrow ? `${baseClasses} subsidebar-narrow` : baseClasses;
});
</script>

<style>
.subsidebar-narrow {
  width: 200px;
  transition: width 0.3s ease;
}

.subsidebar-narrow .overflow-hidden {
  width: 200px;
}

/* Ensure consistent height across all pages */
.subsidebar-enhanced {
  min-height: 0;
  height: 100%;
}

/* Sidebar depth — light */
.subsidebar-enhanced {
  position: relative;
  box-shadow:
    inset -1px 0 0 hsl(var(--border) / 0.5),
    4px 0 16px -4px rgb(0 0 0 / 0.06);
}

.subsidebar-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--border)), transparent);
  pointer-events: none;
  z-index: 1;
}

/* Sidebar depth — dark */
.dark .subsidebar-enhanced {
  background-color: hsl(var(--muted)) !important;
  border-color: hsl(var(--border)) !important;
  box-shadow:
    inset -1px 0 0 hsl(0 0% 100% / 0.05),
    4px 0 24px -4px rgb(0 0 0 / 0.55),
    0 0 0 1px hsl(var(--border) / 0.4);
}

.dark .subsidebar-enhanced::before {
  background: linear-gradient(to right, transparent, hsl(0 0% 100% / 0.08), transparent);
}
</style>
