<template>
  <div :class="rootClass">
    <slot name="leading" />

    <div v-if="editHref || showDelete" :class="groupClass">
      <Link
        v-if="editHref"
        :href="editHref"
        :title="editLabel"
        :class="editClass"
        @click="onLinkClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          :class="iconClass"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <span :class="labelClass">{{ editLabel }}</span>
      </Link>

      <span
        v-if="editHref && showDelete && variant === 'desktop'"
        class="mx-0.5 h-4 w-px shrink-0 bg-border/70"
        aria-hidden="true"
      />

      <button
        v-if="showDelete"
        type="button"
        :title="deleteLabel"
        :class="deleteClass"
        @click="$emit('delete')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          :class="iconClass"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <span :class="labelClass">{{ deleteLabel }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  variant: {
    type: String,
    default: 'desktop',
    validator: (v) => ['desktop', 'inline', 'mobile'].includes(v),
  },
  editHref: {
    type: String,
    default: '',
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
  editLabel: {
    type: String,
    default: 'Düzenle',
  },
  deleteLabel: {
    type: String,
    default: 'Sil',
  },
  onLinkClick: {
    type: Function,
    default: () => {},
  },
});

defineEmits(['delete']);

const isMobile = computed(() => props.variant === 'mobile');
const isDesktop = computed(() => props.variant === 'desktop');

const rootClass = computed(() => {
  if (isMobile.value) {
    return 'flex flex-col gap-1.5';
  }
  return 'flex items-center gap-2';
});

const groupClass = computed(() => {
  if (isMobile.value) {
    return 'flex flex-col gap-1.5';
  }
  if (props.variant === 'inline') {
    return 'inline-flex items-center gap-1 rounded-lg border border-border/50 bg-muted/25 p-0.5';
  }
  return 'inline-flex items-center rounded-lg border border-border/50 bg-muted/25 p-0.5 shadow-sm';
});

const iconClass = computed(() => (isMobile.value ? 'h-4 w-4 shrink-0' : 'h-4 w-4 shrink-0'));

const labelClass = computed(() => {
  if (isMobile.value) {
    return 'text-sm font-medium';
  }
  if (isDesktop.value) {
    return 'sr-only';
  }
  return 'text-xs font-medium';
});

const editClass = computed(() => {
  if (isMobile.value) {
    return 'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-foreground transition-colors hover:bg-accent';
  }
  if (props.variant === 'inline') {
    return 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
  }
  return 'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
});

const deleteClass = computed(() => {
  if (isMobile.value) {
    return 'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-destructive transition-colors hover:bg-destructive/10';
  }
  if (props.variant === 'inline') {
    return 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive';
  }
  return 'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive';
});
</script>
