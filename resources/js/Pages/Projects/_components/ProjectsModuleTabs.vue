<template>
  <div :class="embedded ? '' : 'shrink-0 border-b border-border bg-background px-2 py-2'">
    <div class="flex items-center gap-1">
      <Link
        :href="route('services.index')"
        class="inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors"
        :class="[
          compact ? 'h-5 px-1.5' : 'h-8 flex-1 px-2',
          currentView === 'services'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
      >
        <IconBolt class="h-3.5 w-3.5 shrink-0" />
        <span v-if="showLabels">Hizmetler</span>
      </Link>
      <Link
        :href="route('projects.index')"
        class="inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors"
        :class="[
          compact ? 'h-5 px-1.5' : 'h-8 flex-1 px-2',
          currentView === 'projects'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
      >
        <IconFolder class="h-3.5 w-3.5 shrink-0" />
        <span v-if="showLabels">Projeler</span>
      </Link>
      <Link
        v-if="showCustomers"
        :href="route('customers.index')"
        class="inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors"
        :class="[
          compact ? 'h-5 px-1.5' : 'h-8 flex-1 px-2',
          currentView === 'customers'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
      >
        <IconUsers class="h-3.5 w-3.5 shrink-0" />
        <span v-if="showLabels">Müşteriler</span>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import IconBolt from './icons/IconBolt.vue';
import IconFolder from './icons/IconFolder.vue';
import IconUsers from './icons/IconUsers.vue';
import { useModuleVisibility } from '@/composables/useModuleVisibility';

const showCustomers = useModuleVisibility('customers');

defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
  embedded: {
    type: Boolean,
    default: false,
  },
  showLabels: {
    type: Boolean,
    default: true,
  },
});

const page = usePage();

const currentView = computed(() => {
  const url = page.url || '';

  if (url.startsWith('/projects')) {
    return 'projects';
  }

  if (url.startsWith('/customers')) {
    return 'customers';
  }

  return 'services';
});
</script>
