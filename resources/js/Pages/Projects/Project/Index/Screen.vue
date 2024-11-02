<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="mb-8 text-3xl font-semibold text-gray-700">Projeler</h1>

    <div class="max-w-full overflow-hidden rounded-lg shadow">
      <table class="w-full divide-gray-200 bg-white">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Proje Adı</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Müşteri Adı</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">E-posta</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Servisler</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="project in projects" :key="project.id" class="transition-colors hover:bg-gray-50">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              {{ project.project_name }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
              {{ project.customer ? `${project.customer.first_name} ${project.customer.last_name}` : 'N/A' }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
              {{ project.customer ? project.customer.email : 'N/A' }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
              <Link :href="`/projects/${project.id}`" class="hover:underline">Detaylar</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';

const { props } = usePage();
const projects = props.projects;
</script>

<style scoped>
.whitespace-nowrap {
  white-space: nowrap;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>
