<template>
  <li class="border-base-300 mb-3 rounded-lg border shadow-sm">
    <div @click="toggle" class="flex cursor-pointer items-center justify-between p-4">
      <div>
        <div class="flex items-center">
          <div class="bg-primary/20 mr-3 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-primary h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="font-semibold">{{ service.name }}</span>
        </div>
        <p v-if="service.description" class="mt-1 pl-10 text-sm opacity-70">{{ service.description }}</p>
      </div>

      <div class="flex items-center space-x-3">
        <div v-if="service.price" class="badge badge-neutral">{{ formatPrice(service.price) }}</div>

        <div class="flex space-x-1">
          <Link :href="`/services/${service.id}`" class="btn btn-sm btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>

          <Link :href="`/services/${service.id}/edit`" class="btn btn-sm btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
        </div>

        <button v-if="hasChildren" class="btn btn-sm btn-circle btn-ghost" @click.stop="toggle">
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isOpen && children.length" class="bg-base-200 rounded-b-lg p-4 pt-2">
      <p class="my-2 text-sm font-medium opacity-70">Alt Kategoriler:</p>
      <ul class="ml-4 space-y-3">
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
