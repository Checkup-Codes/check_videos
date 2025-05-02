<template>
  <CheckScreen>
    <TopScreen title="Projeler" />

    <Card elevated>
      <template #action>
        <Link href="/projects/create" class="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1 h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni Proje
        </Link>
      </template>

      <div v-if="!projects || projects.length === 0" class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Henüz proje bulunmamaktadır.</span>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table-zebra table">
          <thead>
            <tr>
              <th>Proje Adı</th>
              <th>Müşteri</th>
              <th>E-posta</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="hover">
              <td class="font-semibold">{{ project.project_name }}</td>
              <td>
                {{ project.customer ? `${project.customer.first_name} ${project.customer.last_name}` : 'N/A' }}
              </td>
              <td>{{ project.customer ? project.customer.email : 'N/A' }}</td>
              <td class="space-x-2">
                <Link :href="`/projects/${project.id}`" class="btn btn-sm btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
                <Link :href="`/projects/${project.id}/edit`" class="btn btn-sm btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import Card from '@/Pages/WritesCategories/_components/Card.vue';

const { props } = usePage();
const projects = computed(() => props.projects || []);
</script>

<style scoped>
.whitespace-nowrap {
  white-space: nowrap;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>
