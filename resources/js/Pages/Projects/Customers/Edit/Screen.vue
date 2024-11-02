<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">Müşteri Bilgisini Güncelle</h1>

    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <div>
        <label class="block text-gray-700">İlk İsmi</label>
        <input v-model="form.first_name" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-gray-700">Soy İsmi</label>
        <input v-model="form.last_name" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-gray-700">E-posta</label>
        <input v-model="form.email" type="email" class="input" required />
      </div>

      <div>
        <label class="block text-gray-700">Telefon</label>
        <input v-model="form.phone" type="text" class="input" />
      </div>

      <div>
        <label class="block text-gray-700">Adres</label>
        <input v-model="form.address" type="text" class="input" />
      </div>

      <div>
        <label class="block text-gray-700">Şehir</label>
        <input v-model="form.city" type="text" class="input" />
      </div>

      <div>
        <label class="block text-gray-700">Bölge</label>
        <input v-model="form.state" type="text" class="input" />
      </div>

      <div>
        <label class="block text-gray-700">Posta Kodu</label>
        <input v-model="form.postal_code" type="text" class="input" />
      </div>

      <div>
        <label class="block text-gray-700">Ülke</label>
        <input v-model="form.country" type="text" class="input" />
      </div>

      <button type="submit" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        Müşteriyi Güncelle
      </button>
    </form>
  </div>
</template>

<script setup>
import { useForm, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const customer = props.customer;

const form = useForm({
  first_name: customer.first_name || '',
  last_name: customer.last_name || '',
  email: customer.email || '',
  phone: customer.phone || '',
  address: customer.address || '',
  city: customer.city || '',
  state: customer.state || '',
  postal_code: customer.postal_code || '',
  country: customer.country || '',
});

const handleSubmit = () => {
  form.put(`/customers/${customer.id}`);
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
</style>
