<template>
  <li class="border-b border-gray-100 py-3 transition-colors duration-150 hover:bg-gray-50">
    <div class="flex cursor-pointer items-center justify-between" @click="toggle">
      <div>
        <span class="block font-semibold text-gray-800">{{ service.name }}</span>
        <span v-if="service.description" class="block text-sm text-gray-500">{{ service.description }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <span v-if="service.price" class="text-sm font-medium text-gray-600">{{ formatPrice(service.price) }}</span>
        <span v-if="hasChildren" class="text-sm font-medium text-blue-500">
          {{ isOpen ? '▲' : '▼' }}
        </span>

        <Link :href="`/services/${service.slug}`" class="text-blue-400 hover:text-blue-500">
          <font-awesome-icon icon="fa-solid fa-share-alt" class="text-sm" />
        </Link>
      </div>
    </div>

    <ul v-if="isOpen && children.length" class="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
      <ServiceItem v-for="child in children" :key="child.id" :service="child" :all-services="allServices" />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import ServiceItem from './ServiceItem.vue';
import { Link } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
