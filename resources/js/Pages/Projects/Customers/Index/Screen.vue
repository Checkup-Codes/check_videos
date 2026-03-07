<template>
  <CheckScreen>
    <div class="min-h-screen bg-background">
      <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-foreground">Müşteriler</h1>
            <p class="mt-1 text-xs text-muted-foreground">Müşterilerinizi görüntüleyin ve yönetin</p>
          </div>
          <Link
            href="/customers/create"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Yeni Müşteri
          </Link>
        </div>

        <!-- Stats -->
        <div v-if="customers.length > 0" class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Toplam Müşteri</p>
                <p class="text-lg font-semibold text-foreground">{{ customers.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Aktif Proje</p>
                <p class="text-lg font-semibold text-foreground">{{ activeCustomersCount }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">E-posta Kayıtlı</p>
                <p class="text-lg font-semibold text-foreground">{{ customersWithEmail }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="customers.length === 0"
          class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-foreground">Henüz müşteri bulunmuyor</p>
          <p class="mt-1 text-xs text-muted-foreground">İlk müşterinizi eklemek için yukarıdaki butonu kullanın</p>
        </div>

        <!-- Customers Grid -->
        <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            v-for="customer in customers"
            :key="customer.id"
            :href="`/customers/${customer.id}`"
            class="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <!-- Avatar & Name -->
            <div class="mb-3 flex items-center gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {{ getInitials(customer.first_name, customer.last_name) }}
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {{ customer.first_name }} {{ customer.last_name }}
                </h3>
                <p v-if="customer.email" class="text-xs text-muted-foreground truncate">
                  {{ customer.email }}
                </p>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-1.5 mb-3">
              <div v-if="customer.phone" class="flex items-center gap-2 text-xs text-muted-foreground">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="truncate">{{ customer.phone }}</span>
              </div>
              <div v-if="customer.city || customer.country" class="flex items-center gap-2 text-xs text-muted-foreground">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="truncate">{{ [customer.city, customer.country].filter(Boolean).join(', ') }}</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <div class="flex items-center gap-1">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(customer.created_at) }}</span>
              </div>
              <div class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <span>Detaylar</span>
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const customers = computed(() => props.customers || []);

const activeCustomersCount = computed(() => {
  // Count customers who have at least one active project
  return customers.value.filter(customer => {
    // This would need projects data to be accurate
    return true; // Placeholder
  }).length;
});

const customersWithEmail = computed(() => {
  return customers.value.filter(c => c.email).length;
});

const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last || '?';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
};
</script>
