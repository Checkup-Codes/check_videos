<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Servisler</h1>
          <p class="mt-1 text-sm text-muted-foreground">Tüm servisleri görüntüleyin ve yönetin</p>
        </div>
        <Link
          href="/services/create"
          class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni Servis
        </Link>
      </div>

      <div
        v-if="!parents || parents.length === 0"
        class="flex items-center gap-3 rounded-lg border border-border bg-card p-8 text-center"
      >
        <div class="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="mx-auto h-12 w-12 text-muted-foreground/50"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="mt-4 text-sm font-medium text-foreground">Henüz servis bulunmamaktadır</p>
          <p class="mt-1 text-xs text-muted-foreground">Yeni bir servis oluşturmak için yukarıdaki butonu kullanın</p>
        </div>
      </div>

      <div v-else class="space-y-3">
        <ServiceItem v-for="parent in parents" :key="parent.id" :service="parent" :all-services="services" />
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import ServiceItem from './ServiceItem.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const services = computed(() => props.services || []);
const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
</script>
