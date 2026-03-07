<template>
  <CheckScreen>
    <div class="min-h-screen bg-background">
      <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-foreground">Projeler</h1>
            <p class="mt-1 text-xs text-muted-foreground">Tüm projelerinizi görüntüleyin ve yönetin</p>
          </div>
          <Link
            href="/projects/create"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Yeni Proje
          </Link>
        </div>

        <!-- Stats -->
        <div v-if="projects.length > 0" class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Toplam</p>
                <p class="text-lg font-semibold text-foreground">{{ projects.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Devam Eden</p>
                <p class="text-lg font-semibold text-foreground">{{ activeProjects }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Tamamlanan</p>
                <p class="text-lg font-semibold text-foreground">{{ completedProjects }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card p-3">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10">
                <svg class="h-4 w-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Bekleyen</p>
                <p class="text-lg font-semibold text-foreground">{{ pendingProjects }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="projects.length === 0"
          class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-foreground">Henüz proje bulunmuyor</p>
          <p class="mt-1 text-xs text-muted-foreground">İlk projenizi oluşturmak için yukarıdaki butonu kullanın</p>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            v-for="project in projects"
            :key="project.id"
            :href="`/projects/${project.id}`"
            class="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <!-- Header -->
            <div class="mb-3 flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <h3 class="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {{ project.project_name }}
                </h3>
                <p v-if="project.description" class="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {{ project.description }}
                </p>
              </div>
              <span
                class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                :class="getStatusClass(project.status)"
              >
                {{ getStatusText(project.status) }}
              </span>
            </div>

            <!-- Customer -->
            <div v-if="project.customer" class="mb-3 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5">
              <svg class="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-xs text-foreground">
                {{ project.customer.first_name }} {{ project.customer.last_name }}
              </span>
            </div>

            <!-- Services -->
            <div v-if="project.services && project.services.length > 0" class="mb-3">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="service in project.services.slice(0, 3)"
                  :key="service.id"
                  class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ service.name }}
                </span>
                <span
                  v-if="project.services.length > 3"
                  class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  +{{ project.services.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <div class="flex items-center gap-1">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(project.created_at) }}</span>
              </div>
              <div class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <span>Detaylar</span>
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const activeProjects = computed(() => props.projects.filter(p => p.status === 1).length);
const completedProjects = computed(() => props.projects.filter(p => p.status === 2).length);
const pendingProjects = computed(() => props.projects.filter(p => p.status === 4).length);

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusText = (status) => {
  const statusMap = {
    1: 'Devam Ediyor',
    2: 'Tamamlandı',
    3: 'İptal',
    4: 'Beklemede',
  };
  return statusMap[status] || 'Bilinmiyor';
};

const getStatusClass = (status) => {
  const statusClassMap = {
    1: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    2: 'bg-green-500/10 text-green-600 dark:text-green-400',
    3: 'bg-red-500/10 text-red-600 dark:text-red-400',
    4: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  };
  return statusClassMap[status] || 'bg-muted text-muted-foreground';
};
</script>
