<template>
  <ProjectsPageFrame>
    <template #header>
      <h1 class="text-lg font-semibold text-foreground">{{ project.project_name }}</h1>
      <p v-if="!isGuestView && project.customer" class="text-xs text-muted-foreground">
        {{ project.customer.first_name }} {{ project.customer.last_name }}
      </p>
    </template>

    <div class="space-y-4" id="project-detail-content">
      <div v-if="project.images?.length" class="flex gap-2 overflow-x-auto pb-1">
        <ZoomableImage
          v-for="(image, imageIndex) in project.images"
          :key="image.id"
          :src="image.image_path"
          :alt="image.alt_text || project.project_name"
          :gallery="project.images"
          :index="imageIndex"
          :wrapper-class="isGuestView ? 'h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-border sm:h-40 sm:w-40' : 'h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border'"
          img-class="h-full w-full object-cover"
        />
      </div>

      <!-- Ziyaretçi görünümü -->
      <template v-if="isGuestView">
        <div class="rounded-lg border border-border bg-card p-4">
          <h3 class="mb-3 text-xs font-semibold text-foreground">Verilen Hizmetler</h3>

          <div v-if="project.services?.length" class="space-y-4">
            <div
              v-for="service in project.services"
              :key="service.id"
              class="rounded-lg border border-border bg-background p-4"
            >
              <h4 class="text-sm font-semibold text-foreground">{{ service.name }}</h4>
              <div
                v-if="getPublicServiceDescription(service)"
                class="quill-content prose prose-sm dark:prose-invert mt-3 max-w-none text-sm"
                v-html="getPublicServiceDescription(service)"
              />
            </div>
          </div>
          <p v-else class="text-sm text-muted-foreground">Bu projede henüz hizmet bilgisi yok.</p>
        </div>
      </template>

      <!-- Yönetici görünümü -->
      <template v-else>
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

        <div class="rounded-lg border border-border bg-card p-4">
          <h3 class="mb-3 text-xs font-semibold text-foreground">Hizmetler</h3>

          <div v-if="project.services?.length" class="space-y-3">
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

              <div
                v-if="getPublicServiceDescription(service)"
                class="mt-3 rounded-md border border-border/60 bg-muted/20 p-3"
              >
                <h5 class="mb-2 text-xs font-medium text-muted-foreground">Ziyaretçi açıklaması</h5>
                <div
                  class="quill-content prose prose-sm dark:prose-invert max-w-none text-sm"
                  v-html="getPublicServiceDescription(service)"
                />
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
                  <h5 class="mb-1 text-xs font-medium text-muted-foreground">İç notlar</h5>
                  <p class="whitespace-pre-wrap text-xs text-foreground">{{ service.pivot.notes }}</p>
                </div>

                <div class="space-y-2 border-t border-border pt-3">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xs font-medium text-foreground">TO-DO'lar</h5>
                    <span class="text-xs font-semibold text-foreground">
                      {{ getServiceCompletionPercentage(service) }}%
                    </span>
                  </div>

                  <div v-if="service.todos?.length" class="space-y-1.5">
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
            <span>Bu projeye atanmış hizmet bulunmuyor</span>
          </div>
        </div>
      </template>
    </div>
  </ProjectsPageFrame>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import html2pdf from 'html2pdf.js';
import ProjectsPageFrame from '@/Pages/Projects/_components/ProjectsPageFrame.vue';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';
import { registerProjectPdfExport, unregisterProjectPdfExport } from '@/composables/useProjectPdfExport';
import '@/Shared/Css/quill-styles.css';

const page = usePage();
const project = computed(() => page.props.project || {});
const isGuestView = computed(() => !!page.props.isGuestView);

const getPublicServiceDescription = (service) => {
  const guestHtml = service.pivot?.guest_description?.trim();
  if (guestHtml) {
    return guestHtml;
  }
  const catalogHtml = service.description?.trim();
  return catalogHtml || '';
};

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

const getServiceCompletionPercentage = (service) => {
  if (!service.todos || service.todos.length === 0) return 0;
  const completed = service.todos.filter((t) => t.is_completed).length;
  return Math.round((completed / service.todos.length) * 100);
};

const exportToPDF = async () => {
  await nextTick();

  const element = document.getElementById('project-detail-content');

  if (!element) {
    alert('PDF oluşturulamadı: İçerik bulunamadı');
    return;
  }

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
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF export error:', error);
    alert('PDF oluşturulurken bir hata oluştu: ' + error.message);
  }
};

onMounted(() => {
  if (!isGuestView.value) {
    registerProjectPdfExport(exportToPDF);
  }
});

onUnmounted(() => {
  unregisterProjectPdfExport(exportToPDF);
});
</script>
