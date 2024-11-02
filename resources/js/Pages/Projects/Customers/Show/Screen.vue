<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">Müşteri Detayı</h1>
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <p class="text-lg font-semibold text-gray-800">{{ customer.first_name }} {{ customer.last_name }}</p>
      <p class="text-gray-500">{{ customer.email }}</p>
      <div class="mt-4 space-y-2">
        <p><strong>Telefon:</strong> {{ customer.phone || 'N/A' }}</p>
        <p><strong>Adres:</strong> {{ customer.address || 'N/A' }}</p>
        <p><strong>Şehir:</strong> {{ customer.city || 'N/A' }}</p>
        <p><strong>Bölge:</strong> {{ customer.state || 'N/A' }}</p>
        <p><strong>Posta Kodu:</strong> {{ customer.postal_code || 'N/A' }}</p>
        <p><strong>Ülke:</strong> {{ customer.country || 'N/A' }}</p>
        <p><strong>Oluşturulma Tarihi:</strong> {{ formatDate(customer.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const customer = props.customer;

const formatDate = (dateString) => {
  if (!dateString) return 'Not Available';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
