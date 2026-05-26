<template>
  <div class="mb-6">
    <div v-if="$slots.actions" class="flex flex-wrap items-center justify-between gap-3 gap-y-2">
      <div class="min-w-0 flex-1">
        <h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{{ title }}</h1>
        <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
      </div>
      <div class="flex shrink-0 items-center">
        <slot name="actions" />
      </div>
    </div>
    <template v-else>
      <h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{{ title }}</h1>
      <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
    </template>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
