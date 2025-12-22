<template>
  <li class="mb-2 rounded-md border border-border bg-card shadow-sm transition-colors hover:bg-accent/50">
    <div @click="toggle" class="flex cursor-pointer items-center justify-between p-4">
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="font-semibold text-foreground">{{ service.name }}</span>
        </div>
        <p v-if="service.description" class="mt-1.5 pl-11 text-sm text-muted-foreground">
          {{ service.description }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div
          v-if="service.price"
          class="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
        >
          {{ formatPrice(service.price) }}
        </div>

        <div class="flex gap-1">
          <Link
            :href="`/services/${service.id}`"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Görüntüle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>

          <Link
            :href="`/services/${service.id}/edit`"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title="Düzenle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
        </div>

        <button
          v-if="hasChildren"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          @click.stop="toggle"
          :title="isOpen ? 'Daralt' : 'Genişlet'"
        >
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isOpen && children.length" class="rounded-b-md border-t border-border bg-muted/30 p-4 pt-3">
      <p class="mb-2 text-xs font-medium text-muted-foreground">Alt Kategoriler:</p>
      <ul class="ml-4 space-y-2">
        <ServiceItem v-for="child in children" :key="child.id" :service="child" :all-services="allServices" />
      </ul>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import ServiceItem from './ServiceItem.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
  allServices: {
    type: Array,
    required: true,
  },
});

const hasChildren = computed(() => {
  return props.allServices.some((child) => child.sub_category_id === props.service.id);
});

const children = computed(() => {
  return props.allServices.filter((child) => child.sub_category_id === props.service.id);
});

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const formatPrice = (price) => {
  return price ? `${parseFloat(price).toLocaleString()} USD` : 'Uygun Değil';
};
</script>

<style scoped>
.ml-4 {
  margin-left: 1rem;
}
</style>
