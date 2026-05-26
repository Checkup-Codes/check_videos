<template>
  <div class="relative z-10 shrink-0 border-b border-border bg-background px-2 py-1.5">
    <!-- Tam genişlik özel içerik (ör. proje sekmeleri) -->
    <slot v-if="isCustomOnly" />

    <!-- Başlık + aksiyonlar tek satır -->
    <div v-else class="flex min-w-0 flex-nowrap items-center gap-1.5">
      <div v-if="hasTitle" class="min-w-0 flex-1 truncate leading-none">
        <span v-if="title" class="text-xs font-semibold text-foreground">{{ title }}</span>
        <span v-if="description" class="text-[10px] text-muted-foreground">
          {{ title ? ' · ' : '' }}{{ description }}
        </span>
      </div>
      <div v-if="$slots.actions" class="ml-auto flex shrink-0 flex-nowrap items-center gap-1 overflow-x-auto scrollbar-hide">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});

const slots = useSlots();

const hasTitle = computed(() => !!(props.title || props.description));
const isCustomOnly = computed(() => !!slots.default && !hasTitle.value && !slots.actions);
</script>

<style scoped>
.relative.z-10.shrink-0 {
  background: hsl(var(--background)) !important;
}
</style>
