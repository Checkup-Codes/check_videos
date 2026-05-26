<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl px-1 py-4 sm:px-2">
      <div class="mb-4">
        <h1 class="text-lg font-semibold text-foreground">Müşteriler</h1>
        <p class="text-xs text-muted-foreground">{{ customers.length }} kayıt</p>
      </div>

      <div
        v-if="customers.length === 0"
        class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
      >
        Henüz müşteri yok.
      </div>

      <div v-else class="divide-y divide-border rounded-md border border-border">
        <Link
          v-for="customer in customers"
          :key="customer.id"
          :href="`/customers/${customer.id}`"
          class="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
            {{ getInitials(customer.first_name, customer.last_name) }}
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-foreground">
              {{ customer.first_name }} {{ customer.last_name }}
            </p>
            <p v-if="customer.email" class="truncate text-xs text-muted-foreground">{{ customer.email }}</p>
          </div>
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();
const customers = computed(() => page.props.customers || []);

const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last || '?';
};
</script>
