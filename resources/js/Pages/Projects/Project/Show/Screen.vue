<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">{{ project.project_name }}</h1>

    <div class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <div>
        <h2 class="text-lg font-semibold text-gray-800">Müşteri Bilgileri</h2>
        <p><strong>Ad:</strong> {{ project.customer.first_name }} {{ project.customer.last_name }}</p>
        <p><strong>E-posta:</strong> {{ project.customer.email }}</p>
        <p><strong>Telefon:</strong> {{ project.customer.phone }}</p>
      </div>

      <div>
        <h2 class="text-lg font-semibold text-gray-800">Servisler</h2>
        <ul v-if="project.services.length" class="space-y-2">
          <li v-for="service in project.services" :key="service.id">
            <strong>{{ service.name }}</strong> - {{ service.description || 'Açıklama bulunmamaktadır' }}
          </li>
        </ul>
        <p v-else class="text-gray-500">Bu projeye atanmış servis bulunmamaktadır.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const project = props.project;
</script>
