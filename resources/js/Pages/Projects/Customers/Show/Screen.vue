<template>
  <CheckScreen>
    <GoBackButton url="/customers" />
    <TopScreen title="Müşteri Detayı" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ customer.first_name }} {{ customer.last_name }}</h1>
            <p class="mt-1 text-sm text-muted-foreground">{{ customer.email }}</p>
          </div>
          <Link
            :href="`/customers/${customer.id}/edit`"
            class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            Düzenle
          </Link>
        </div>

        <div class="space-y-6 border-t border-border pt-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Telefon</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.phone || 'N/A' }}</p>
            </div>
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Oluşturulma Tarihi</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ formatDate(customer.created_at) }}</p>
            </div>
            <div class="md:col-span-2">
              <h4 class="text-xs font-medium text-muted-foreground">Adres</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.address || 'N/A' }}</p>
            </div>
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Şehir</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.city || 'N/A' }}</p>
            </div>
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Bölge</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.state || 'N/A' }}</p>
            </div>
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Posta Kodu</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.postal_code || 'N/A' }}</p>
            </div>
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Ülke</h4>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ customer.country || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const customer = props.customer;

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};
</script>
