<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl px-1 py-4 sm:px-2">
      <header v-if="title || description || $slots.header" class="mb-4">
        <slot name="header">
          <h1 v-if="title" class="text-lg font-semibold text-foreground">{{ title }}</h1>
          <p v-if="description" class="text-xs text-muted-foreground">{{ description }}</p>
        </slot>
      </header>
      <slot />
    </div>
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
