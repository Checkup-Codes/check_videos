<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-foreground">{{ project.project_name }}</h1>
          <p v-if="project.customer" class="mt-1 text-sm text-muted-foreground">
            {{ project.customer.first_name }} {{ project.customer.last_name }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="exportToPDF"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-input bg-background px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF
          </button>
          <Link
            :href="`/projects/${project.id}/edit`"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-input bg-background px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Düzenle
          </Link>
        </div>
      </div>

      <div class="space-y-4" id="project-detail-content">
        <!-- Category Section -->
        <div v-if="project.category" class="rounded-lg border border-border bg-card p-4">
          <h3 class="mb-3 text-xs font-semibold text-foreground">Kategori Bağlantısı</h3>
          <div class="flex items-center justify-between rounded-md bg-muted/30 p-3">
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span class="text-sm font-medium text-foreground">{{ project.category.name }}</span>
            </div>
            <Link :href="`/categories/${project.category.slug}`" class="text-xs text-primary hover:underline">
              Görüntüle →
            </Link>
          </div>
        </div>

        <!-- Customer Section -->
        <div class="rounded-lg border border-border bg-card p-4">
          <h3 class="mb-3 text-xs font-semibold text-foreground">Müşteri Bilgileri</h3>
          <div v-if="project.customer" class="grid grid-cols-1 gap-3 rounded-md bg-muted/30 p-3 md:grid-cols-3">
            <div>
              <h4 class="text-xs font-medium text-muted-foreground">Ad Soyad</h4>
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
                {{ project.customer.phone || '-' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Services Section -->
        <div class="rounded-lg border border-border bg-card p-4">
          <h3 class="mb-3 text-xs font-semibold text-foreground">Hizmetler</h3>

          <div v-if="project.services && project.services.length" class="space-y-3">
            <div
              v-for="service in project.services"
              :key="service.id"
              class="rounded-lg border border-border bg-background p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                    <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-foreground">{{ service.name }}</h4>
                    <p v-if="service.description" class="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {{ stripHtml(service.description) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                    :class="getStatusClass(service.pivot?.status)"
                  >
                    {{ getStatusLabel(service.pivot?.status) }}
                  </span>
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                    :class="getPaymentStatusClass(service.pivot?.payment_status)"
                  >
                    {{ getPaymentStatusLabel(service.pivot?.payment_status) }}
                  </span>
                </div>
              </div>

              <div class="mt-3 space-y-3 border-t border-border pt-3">
                <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div v-if="service.pivot?.price">
                    <h5 class="text-xs font-medium text-muted-foreground">Fiyat</h5>
                    <p class="mt-1 text-sm font-semibold text-foreground">{{ formatPrice(service.pivot.price) }} ₺</p>
                  </div>
                  <div v-if="service.pivot?.service_start_date">
                    <h5 class="text-xs font-medium text-muted-foreground">Başlangıç</h5>
                    <p class="mt-1 text-sm font-semibold text-foreground">
                      {{ formatDate(service.pivot.service_start_date) }}
                    </p>
                  </div>
                  <div v-if="service.pivot?.service_end_date">
                    <h5 class="text-xs font-medium text-muted-foreground">Bitiş</h5>
                    <p class="mt-1 text-sm font-semibold text-foreground">
                      {{ formatDate(service.pivot.service_end_date) }}
                    </p>
                  </div>
                </div>

                <div v-if="service.pivot?.notes" class="rounded-md bg-muted/30 p-2.5">
                  <h5 class="mb-1 text-xs font-medium text-muted-foreground">Notlar</h5>
                  <p class="whitespace-pre-wrap text-xs text-foreground">{{ service.pivot.notes }}</p>
                </div>

                <div class="space-y-2 border-t border-border pt-3">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xs font-medium text-foreground">TO-DO'lar</h5>
                    <span class="text-xs font-semibold text-foreground">
                      {{ getServiceCompletionPercentage(service) }}%
                    </span>
                  </div>

                  <div v-if="service.todos && service.todos.length > 0" class="space-y-1.5">
                    <div
                      v-for="todo in service.todos"
                      :key="todo.id"
                      class="flex items-center gap-2 rounded-md border border-input bg-background p-2"
                    >
                      <input
                        type="checkbox"
                        :checked="todo.is_completed"
                        disabled
                        class="h-3.5 w-3.5 rounded border-input text-primary"
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
                    class="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/20 p-2.5 text-xs text-muted-foreground"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Henüz TO-DO eklenmemiş</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground"
          >
            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Bu projeye atanmış hizmet bulunmuyor</span>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed, nextTick } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import html2pdf from 'html2pdf.js';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

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
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const getServiceCompletionPercentage = (service) => {
  if (!service.todos || service.todos.length === 0) return 0;
  const completed = service.todos.filter((t) => t.is_completed).length;
  return Math.round((completed / service.todos.length) * 100);
};

// PDF Export Function - Basit ve çalışır versiyon
const exportToPDF = async () => {
  // DOM'un hazır olmasını bekle
  await nextTick();

  // Mevcut sayfadaki içeriği al
  const element = document.getElementById('project-detail-content');

  if (!element) {
    console.error('PDF element not found');
    alert('PDF oluşturulamadı: İçerik bulunamadı');
    return;
  }

  // Element'in içeriğini kontrol et
  if (!element.innerHTML || element.innerHTML.trim() === '') {
    console.error('PDF element is empty');
    alert('PDF oluşturulamadı: İçerik boş');
    return;
  }

  // PDF seçenekleri
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `proje-${project.value.project_name?.toLowerCase().replace(/\s+/g, '-') || 'detay'}-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  };

  try {
    // PDF oluştur
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF export error:', error);
    alert('PDF oluşturulurken bir hata oluştu: ' + error.message);
  }
};
</script>
