<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="mb-8 text-2xl font-bold text-gray-800">Hizmetler</h1>
    <ul>
      <ServiceItem v-for="parent in parents" :key="parent.id" :service="parent" :all-services="services" />
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ServiceItem from './ServiceItem.vue';

const { props } = usePage();
const services = computed(() => props.services || []);

const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
</script>

<style scoped>
.text-gray-800 {
  color: #1f2937;
}
</style>
