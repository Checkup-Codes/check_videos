<template>
  <CheckScreen>
    <GoBackButton url="/projects" />
    <TopScreen title="Proje Detayı" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ project.project_name }}</h1>
          </div>
          <Link
            :href="`/projects/${project.id}/edit`"
            class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Düzenle
          </Link>
        </div>

        <div class="space-y-6 border-t border-border pt-6">
          <div>
            <h3 class="mb-4 text-sm font-semibold text-foreground">Kategori/Yazı Bağlantısı</h3>
            <div v-if="project.category" class="rounded-md border border-border bg-muted/30 p-4">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span class="text-sm font-medium text-foreground">{{ project.category.name }}</span>
                <Link
                  :href="`/categories/${project.category.slug}`"
                  class="ml-auto text-xs text-primary hover:underline"
                >
                  Kategoriyi Görüntüle →
                </Link>
              </div>
            </div>
            <div
              v-else
              class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Bu projeye atanmış kategori bulunmamaktadır.</span>
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-foreground">Müşteri Bilgileri</h3>

            <div v-if="project.customer" class="rounded-md border border-border bg-muted/30 p-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 class="text-xs font-medium text-muted-foreground">Müşteri Adı</h4>
                  <p class="mt-1 text-sm font-semibold text-foreground">
                    {{ project.customer.first_name }} {{ project.customer.last_name }}
                  </p>
                </div>
                <div>
                  <h4 class="text-xs font-medium text-muted-foreground">E-posta</h4>
                  <p class="mt-1 text-sm font-semibold text-foreground">{{ project.customer.email }}</p>
                </div>
                <div>
                  <h4 class="text-xs font-medium text-muted-foreground">Telefon</h4>
                  <p class="mt-1 text-sm font-semibold text-foreground">
                    {{ project.customer.phone || 'Telefon bilgisi yok' }}
                  </p>
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Bu projeye atanmış müşteri bulunmamaktadır.</span>
            </div>
          </div>

          <div class="space-y-4 border-t border-border pt-6">
            <h3 class="text-sm font-semibold text-foreground">Servisler</h3>

            <div v-if="project.services && project.services.length" class="space-y-4">
              <div
                v-for="service in project.services"
                :key="service.id"
                class="rounded-md border border-border bg-card p-4"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-sm font-semibold text-foreground">{{ service.name }}</h4>
                      <p v-if="service.description" class="mt-1 text-xs text-muted-foreground">
                        {{ service.description }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      :class="getStatusClass(service.pivot?.status)"
                    >
                      {{ getStatusLabel(service.pivot?.status) }}
                    </span>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      :class="getPaymentStatusClass(service.pivot?.payment_status)"
                    >
                      {{ getPaymentStatusLabel(service.pivot?.payment_status) }}
                    </span>
                  </div>
                </div>

                <div class="mt-4 space-y-3 border-t border-border pt-4">
                  <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div v-if="service.pivot?.price">
                      <h5 class="text-xs font-medium text-muted-foreground">Fiyat</h5>
                      <p class="mt-1 text-sm font-semibold text-foreground">{{ formatPrice(service.pivot.price) }} ₺</p>
                    </div>
                    <div v-if="service.pivot?.service_start_date">
                      <h5 class="text-xs font-medium text-muted-foreground">Başlangıç Tarihi</h5>
                      <p class="mt-1 text-sm font-semibold text-foreground">
                        {{ formatDate(service.pivot.service_start_date) }}
                      </p>
                    </div>
                    <div v-if="service.pivot?.service_end_date">
                      <h5 class="text-xs font-medium text-muted-foreground">Bitiş Tarihi</h5>
                      <p class="mt-1 text-sm font-semibold text-foreground">
                        {{ formatDate(service.pivot.service_end_date) }}
                      </p>
                    </div>
                  </div>

                  <div v-if="service.pivot?.notes" class="rounded-md bg-muted/30 p-3">
                    <h5 class="mb-1 text-xs font-medium text-muted-foreground">Notlar</h5>
                    <p class="whitespace-pre-wrap text-sm text-foreground">{{ service.pivot.notes }}</p>
                  </div>

                  <div class="space-y-3 border-t border-border pt-4">
                    <div class="flex items-center justify-between">
                      <h5 class="text-xs font-medium text-foreground">TO-DO'lar</h5>
                      <span class="text-xs font-semibold text-foreground">
                        Tamamlanma: {{ getServiceCompletionPercentage(service) }}%
                      </span>
                    </div>

                    <div v-if="service.todos && service.todos.length > 0" class="space-y-2">
                      <div
                        v-for="todo in service.todos"
                        :key="todo.id"
                        class="flex items-center gap-2 rounded-md border border-input bg-background p-2"
                      >
                        <input
                          type="checkbox"
                          :checked="todo.is_completed"
                          disabled
                          class="h-4 w-4 rounded border-input text-primary"
                        />
                        <span
                          class="flex-1 text-xs"
                          :class="todo.is_completed ? 'text-muted-foreground line-through' : 'text-foreground'"
                        >
                          {{ todo.title }}
                        </span>
                        <span v-if="todo.completed_at" class="text-xs text-muted-foreground">
                          {{ formatDate(todo.completed_at) }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Henüz TO-DO eklenmemiş</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Bu projeye atanmış servis bulunmamaktadır.</span>
            </div>
          </div>
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

const { props } = usePage();
const project = computed(() => props.project || {});

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return classes[status] || classes.pending;
};

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Beklemede',
    active: 'Aktif',
    completed: 'Tamamlandı',
    cancelled: 'İptal Edildi',
  };
  return labels[status] || 'Bilinmiyor';
};

const getPaymentStatusClass = (status) => {
  const classes = {
    unpaid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };
  return classes[status] || classes.unpaid;
};

const getPaymentStatusLabel = (status) => {
  const labels = {
    unpaid: 'Ödenmedi',
    partial: 'Kısmi Ödendi',
    paid: 'Ödendi',
  };
  return labels[status] || 'Bilinmiyor';
};

const formatPrice = (price) => {
  if (!price) return '0';
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
};

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getServiceCompletionPercentage = (service) => {
  if (!service.todos || service.todos.length === 0) return 0;
  const completed = service.todos.filter((t) => t.is_completed).length;
  return Math.round((completed / service.todos.length) * 100);
};
</script>
