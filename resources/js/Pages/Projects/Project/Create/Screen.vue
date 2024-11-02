<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">Yeni Proje Oluştur</h1>

    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <div>
        <label class="block text-gray-700">Proje Adı</label>
        <input v-model="form.project_name" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-gray-700">Müşteri Seçin</label>
        <select v-model="form.customer_id" class="input" required>
          <option disabled value="">Bir müşteri seçin</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.first_name }} {{ customer.last_name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700">Servis Seçin</label>
        <div v-for="service in services" :key="service.id" class="flex items-center space-x-2">
          <input type="checkbox" :value="service.id" v-model="form.services" class="checkbox" />
          <span>{{ service.name }}</span>
        </div>
      </div>

      <button type="submit" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        Projeyi Kaydet
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const services = props.services;
const customers = props.customers;

const form = useForm({
  project_name: '',
  customer_id: '',
  services: [],
});

const handleSubmit = () => {
  form.post('/projects');
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #3b82f6;
}

.checkbox {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
