<template>
  <div :class="computedClass">
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
  const baseClasses = `${props.infoClass} bg-base-100/95 backdrop-blur-md overscroll-none border-r border-base-300/50 subsidebar-enhanced`;
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

/* Enhanced sidebar design with inner shadow and depth */
.subsidebar-enhanced {
  box-shadow:
    inset 0 0 20px rgba(0, 0, 0, 0.08),
    inset 0 4px 12px rgba(0, 0, 0, 0.04),
    4px 0 12px rgba(0, 0, 0, 0.08),
    -2px 0 8px rgba(0, 0, 0, 0.04);
  position: relative;
}

.subsidebar-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--b3) / 0.5), transparent);
  pointer-events: none;
  z-index: 1;
}

/* Dark theme adjustments */
[data-theme*='dark'] .subsidebar-enhanced,
html[data-theme*='dark'] .subsidebar-enhanced {
  box-shadow:
    inset 0 0 30px rgba(0, 0, 0, 0.3),
    inset 0 4px 16px rgba(0, 0, 0, 0.2),
    4px 0 20px rgba(0, 0, 0, 0.4),
    -2px 0 12px rgba(0, 0, 0, 0.2);
  border-color: hsl(var(--b3) / 0.4);
}

[data-theme*='dark'] .subsidebar-enhanced::before,
html[data-theme*='dark'] .subsidebar-enhanced::before {
  background: linear-gradient(to right, transparent, hsl(var(--b2) / 0.6), transparent);
}
</style>
