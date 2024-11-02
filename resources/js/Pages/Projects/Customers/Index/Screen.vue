<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">Müşteriler</h1>

    <div class="w-full max-w-screen-lg overflow-x-auto rounded-lg bg-white shadow-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="table-header">ID</th>
            <th class="table-header">İlk İsmi</th>
            <th class="table-header">Soy Adı</th>
            <th class="table-header">E-posta</th>
            <th class="table-header">Oluşturulma Tarihi</th>
            <th class="table-header">Detay</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="customer in customers" :key="customer.id" class="transition-colors hover:bg-gray-50">
            <td class="ellipsis-cell table-cell">{{ customer.id }}</td>
            <td class="table-cell">{{ customer.first_name }}</td>
            <td class="table-cell">{{ customer.last_name }}</td>
            <td class="table-cell">{{ customer.email }}</td>
            <td class="table-cell text-gray-500">{{ formatDate(customer.created_at) }}</td>
            <!-- Details link -->
            <td class="table-cell text-blue-600">
              <Link :href="`/customers/${customer.id}`" class="hover:underline">Detaylar</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';

const { props } = usePage();
const customers = computed(() => props.customers || []);

const formatDate = (dateString) => {
  if (!dateString) return 'Not Available';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.table-header {
  padding: 0.75rem 1.5rem;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  color: #6b7280;
}

.table-cell {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  white-space: nowrap;
}

.ellipsis-cell {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
