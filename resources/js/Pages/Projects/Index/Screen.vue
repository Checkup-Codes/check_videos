<template>
  <CheckScreen>
    <TopScreen title="PROJELER">
      <Link href="/projects/create" class="btn btn-primary btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Yeni Proje
      </Link>
    </TopScreen>

    <div class="mb-5 w-full">
      <Card class="card-compact w-full shadow-md">
        <div v-if="projects.length === 0" class="p-4">
          <div class="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Henüz proje bulunamadı.</span>
          </div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table-zebra table">
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">İsim</th>
                <th class="text-center">Durum</th>
                <th class="text-center">Müşteri</th>
                <th class="text-center">Oluşturma Tarihi</th>
                <th class="text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id" class="hover">
                <td>{{ project.id }}</td>
                <td>
                  <div class="font-medium">{{ project.name }}</div>
                  <div v-if="project.description" class="text-sm opacity-70">
                    {{ truncateText(project.description, 50) }}
                  </div>
                </td>
                <td class="text-center">
                  <div class="badge" :class="getStatusClass(project.status)">
                    {{ getStatusText(project.status) }}
                  </div>
                </td>
                <td class="text-center">
                  <Link
                    v-if="project.customer"
                    :href="`/customers/${project.customer.id}`"
                    class="link link-hover link-primary"
                  >
                    {{ project.customer.first_name }} {{ project.customer.last_name }}
                  </Link>
                  <span v-else class="opacity-70">-</span>
                </td>
                <td class="text-center">{{ formatDate(project.created_at) }}</td>
                <td class="text-center">
                  <div class="flex justify-center space-x-1">
                    <Link :href="`/projects/${project.id}`" class="btn btn-xs btn-ghost">
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
                    <Link :href="`/projects/${project.id}/edit`" class="btn btn-xs btn-ghost">
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
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import TopScreen from '@/Components/molecules/TopScreen.vue';
import CheckScreen from '@/Components/templates/CheckScreen.vue';
import Card from '@/Components/molecules/Card.vue';

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const formatDate = (date) => {
  if (!date) return '-';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('tr-TR', options);
};

const getStatusText = (status) => {
  const statusMap = {
    1: 'Devam Ediyor',
    2: 'Tamamlandı',
    3: 'İptal Edildi',
    4: 'Beklemede',
  };
  return statusMap[status] || 'Bilinmiyor';
};

const getStatusClass = (status) => {
  const statusClassMap = {
    1: 'badge-primary',
    2: 'badge-success',
    3: 'badge-error',
    4: 'badge-warning',
  };
  return statusClassMap[status] || 'badge-neutral';
};

const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};
</script>
