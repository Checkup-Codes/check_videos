<template>
  <CheckScreen>
    <div class="min-h-screen bg-background">
      <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-xl font-semibold text-foreground">Hizmetlerimiz</h1>
          <p class="mt-1 text-xs text-muted-foreground">Sunduğumuz profesyonel hizmetler</p>
        </div>

        <!-- Stats -->
        <div v-if="services.length > 0" class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Toplam</p>
                <p class="text-lg font-semibold text-foreground">{{ services.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Ana Hizmet</p>
                <p class="text-lg font-semibold text-foreground">{{ parents.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Alt Hizmet</p>
                <p class="text-lg font-semibold text-foreground">{{ services.length - parents.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                <svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Ort. Fiyat</p>
                <p class="text-lg font-semibold text-foreground">{{ averagePrice }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!parents || parents.length === 0"
          class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-foreground">Henüz hizmet bulunmuyor</p>
          <p class="mt-1 text-xs text-muted-foreground">İlk hizmetinizi oluşturmak için yukarıdaki butonu kullanın</p>
        </div>

        <!-- Services List -->
        <div v-else class="space-y-2">
          <ServiceItem v-for="parent in parents" :key="parent.id" :service="parent" :all-services="services" />
        </div>
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

const averagePrice = computed(() => {
  const servicesWithPrice = services.value.filter(s => s.price && s.price > 0);
  if (servicesWithPrice.length === 0) return '₺0';
  const total = servicesWithPrice.reduce((sum, s) => sum + parseFloat(s.price), 0);
  const avg = total / servicesWithPrice.length;
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(avg);
});
</script>
