<template>
  <CheckScreen>
    <GoBackButton url="/projects" />
    <TopScreen title="Proje Detayı" />

    <!-- Card component directly implemented -->
    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">{{ project.project_name }}</h1>
          </div>
          <Link :href="`/projects/${project.id}/edit`" class="btn btn-outline btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-4 w-4"
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
            Düzenle
          </Link>
        </div>

        <div class="divider">Müşteri Bilgileri</div>

        <div v-if="project.customer" class="rounded-lg bg-base-200 p-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 class="text-sm opacity-70">Müşteri Adı</h3>
              <p class="font-semibold">{{ project.customer.first_name }} {{ project.customer.last_name }}</p>
            </div>
            <div>
              <h3 class="text-sm opacity-70">E-posta</h3>
              <p class="font-semibold">{{ project.customer.email }}</p>
            </div>
            <div>
              <h3 class="text-sm opacity-70">Telefon</h3>
              <p class="font-semibold">{{ project.customer.phone || 'Telefon bilgisi yok' }}</p>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning">
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
          <span>Bu projeye atanmış müşteri bulunmamaktadır.</span>
        </div>

        <div class="divider">Servisler</div>

        <div v-if="project.services && project.services.length" class="space-y-4">
          <div v-for="service in project.services" :key="service.id" class="rounded-lg border border-base-300 p-4">
            <div class="flex items-center">
              <div class="bg-primary/20 mr-3 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="text-md font-semibold">{{ service.name }}</h3>
            </div>
            <div class="mt-3 pl-10">
              <p class="whitespace-pre-wrap text-gray-600">{{ service.description || 'Açıklama bulunmamaktadır' }}</p>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Bu projeye atanmış servis bulunmamaktadır.</span>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
// Card component has been removed and implemented directly

const { props } = usePage();
const project = computed(() => props.project || {});
</script>
