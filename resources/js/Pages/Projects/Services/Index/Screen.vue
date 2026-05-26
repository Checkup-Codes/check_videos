<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl px-1 py-4 sm:px-2">
      <div class="mb-4">
        <h1 class="text-lg font-semibold text-foreground">Hizmetlerimiz</h1>
        <p class="text-xs text-muted-foreground">{{ services.length }} kayıt</p>
      </div>

      <div
        v-if="!parents.length"
        class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
      >
        Henüz hizmet yok.
      </div>

      <div v-else class="space-y-2">
        <ServiceItem v-for="parent in parents" :key="parent.id" :service="parent" :all-services="services" />
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ServiceItem from './ServiceItem.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();
const services = computed(() => page.props.services || []);
const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
</script>
