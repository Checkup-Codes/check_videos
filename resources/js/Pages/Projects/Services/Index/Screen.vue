<template>
  <CheckScreen>
    <TopScreen title="Servisler" />

    <Card elevated>
      <template #action>
        <Link href="/services/create" class="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1 h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni Servis
        </Link>
      </template>

      <div v-if="!parents || parents.length === 0" class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Henüz servis bulunmamaktadır.</span>
      </div>

      <ul v-else class="menu bg-base-100 w-full">
        <ServiceItem v-for="parent in parents" :key="parent.id" :service="parent" :all-services="services" />
      </ul>
    </Card>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import ServiceItem from './ServiceItem.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import Card from '@/Pages/WritesCategories/_components/Card.vue';

const { props } = usePage();
const services = computed(() => props.services || []);
const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
</script>

<style scoped>
.text-gray-800 {
  color: #1f2937;
}
</style>
