<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Sortable from 'sortablejs';
import axios from 'axios';

interface Write {
  id: string; // UUID olduğu için string
  title: string;
  excerpt: string | null;
  status: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  writes_count: number;
}

interface Stats {
  categories_count: number;
  writes_count: number;
  public_writes_count: number;
  private_writes_count: number;
}

interface Props {
  stats: Stats;
  recentWrites: Write[];
  popularCategories: Category[];
  monthlyStats: Record<string, number>;
  allWrites: Write[];
}

// Define props for the data passed from the controller
const props = defineProps<Props>();

// Vuex store for font preferences
const store = useStore();

// Font preferences
const headingFont = computed(() => store.getters['Theme/getHeadingFont']);
const bodyFont = computed(() => store.getters['Theme/getBodyFont']);

const changeHeadingFont = (font: 'new' | 'classic') => {
  store.dispatch('Theme/changeHeadingFont', font);
};

const changeBodyFont = (font: 'new' | 'classic') => {
  store.dispatch('Theme/changeBodyFont', font);
};

// Chart setup
let chartLoaded = ref(false);

// TypeScript type augmentation for Chart.js
declare global {
  interface Window {
    Chart: any;
  }
}

onMounted(() => {
  if (window.Chart && props.monthlyStats) {
    renderChart();
    chartLoaded.value = true;
  } else {
    // Load Chart.js dynamically if not available
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    script.onload = () => {
      renderChart();
      chartLoaded.value = true;
    };
    document.head.appendChild(script);
  }
});

function renderChart() {
  const ctx = document.getElementById('monthlyStatsChart');
  if (!ctx) return;

  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  const data = Object.keys(props.monthlyStats).map((month) => props.monthlyStats[month]);

  new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: monthNames,
      datasets: [
        {
          label: 'Yazı Sayısı',
          data: data,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <div class="py-6">
      <div class="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <!-- Stats Cards - Shadcn UI Style -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Total Categories -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between space-x-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-muted-foreground">Toplam Kategori</p>
                  <p class="text-2xl font-bold">{{ stats.categories_count }}</p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3">
              <Link
                :href="route('categories.index')"
                class="text-sm font-medium text-primary hover:underline"
              >
                Tüm Kategorileri Gör →
              </Link>
            </div>
          </div>

          <!-- Total Articles -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between space-x-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-muted-foreground">Toplam Yazı</p>
                  <p class="text-2xl font-bold">{{ stats.writes_count }}</p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3">
              <Link
                :href="route('writes.index')"
                class="text-sm font-medium text-primary hover:underline"
              >
                Tüm Yazıları Gör →
              </Link>
            </div>
          </div>

          <!-- Public Articles -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between space-x-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-muted-foreground">Yayında</p>
                  <p class="text-2xl font-bold">{{ stats.public_writes_count }}</p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                </div>
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3">
              <p class="text-sm text-muted-foreground">
                {{
                  stats.writes_count > 0 ? Math.round((stats.public_writes_count / stats.writes_count) * 100) : 0
                }}% toplam yazılardan
              </p>
            </div>
          </div>

          <!-- Private Articles -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between space-x-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-muted-foreground">Özel</p>
                  <p class="text-2xl font-bold">{{ stats.private_writes_count }}</p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3">
              <p class="text-sm text-muted-foreground">
                {{
                  stats.writes_count > 0 ? Math.round((stats.private_writes_count / stats.writes_count) * 100) : 0
                }}% toplam yazılardan
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Recent Articles -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm lg:col-span-2">
            <div class="border-b px-6 py-4">
              <h3 class="text-lg font-semibold">Son Yazılarınız</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="write in recentWrites"
                :key="write.id"
                class="px-6 py-4 transition-colors hover:bg-accent"
              >
                <Link :href="route('writes.show', write.id)" class="block space-y-2">
                  <div class="flex items-start justify-between gap-4">
                    <p class="font-medium text-foreground">{{ write.title }}</p>
                    <span
                      class="inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium"
                      :class="
                        write.status === 'public'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      "
                    >
                      {{ write.status === 'public' ? 'Yayında' : 'Özel' }}
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {{ write.excerpt ? write.excerpt.substring(0, 80) + '...' : 'İçerik yok' }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ formatDate(write.updated_at) }}
                  </p>
                </Link>
              </div>
              <div v-if="recentWrites.length === 0" class="px-6 py-8 text-center text-sm text-muted-foreground">
                Henüz yazı eklenmemiş.
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3 text-right">
              <Link
                :href="route('writes.create')"
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Yeni Yazı Ekle
              </Link>
            </div>
          </div>

          <!-- Popular Categories -->
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="border-b px-6 py-4">
              <h3 class="text-lg font-semibold">Popüler Kategoriler</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="category in popularCategories"
                :key="category.id"
                class="px-6 py-4 transition-colors hover:bg-accent"
              >
                <Link :href="route('categories.show', category.id)" class="flex items-center justify-between">
                  <p class="font-medium text-foreground">{{ category.name }}</p>
                  <span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {{ category.writes_count }}
                  </span>
                </Link>
              </div>
              <div v-if="popularCategories.length === 0" class="px-6 py-8 text-center text-sm text-muted-foreground">
                Henüz kategori eklenmemiş.
              </div>
            </div>
            <div class="border-t bg-muted/50 px-6 py-3 text-right">
              <Link
                :href="route('categories.create')"
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Yeni Kategori
              </Link>
            </div>
          </div>
        </div>

        <!-- Monthly Stats Chart -->
        <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 class="mb-4 text-lg font-semibold">Bu Yılki Yazı İstatistikleri</h3>
          <div class="h-80">
            <canvas id="monthlyStatsChart"></canvas>
            <div v-if="!chartLoaded" class="flex h-full items-center justify-center">
              <div class="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Font Preferences Section -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div class="border-b px-6 py-4">
            <h3 class="text-lg font-semibold">Font Tercihleri</h3>
            <p class="text-sm text-muted-foreground">Başlık ve içerik fontlarını özelleştirin</p>
          </div>
          <div class="space-y-6 p-6">
            <!-- Heading Font Selection -->
            <div class="space-y-3">
              <label class="text-sm font-medium">Başlık Fontu</label>
              <div class="grid grid-cols-3 gap-3">
                <!-- Inter Option -->
                <button
                  @click="changeHeadingFont('inter')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    headingFont === 'inter'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">Inter</span>
                    <div
                      v-if="headingFont === 'inter'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Tech şirketi standardı</p>
                  <p class="font-inter-semibold text-lg">Örnek Başlık</p>
                </button>

                <!-- Clash Display Option -->
                <button
                  @click="changeHeadingFont('new')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    headingFont === 'new'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">Clash Display</span>
                    <div
                      v-if="headingFont === 'new'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Minimalist ve modern</p>
                  <p class="font-clash text-lg">Örnek Başlık</p>
                </button>

                <!-- System Font Option -->
                <button
                  @click="changeHeadingFont('classic')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    headingFont === 'classic'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">System</span>
                    <div
                      v-if="headingFont === 'classic'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Klasik sistem fontları</p>
                  <p class="text-lg" style="font-family: system-ui, -apple-system, sans-serif">Örnek Başlık</p>
                </button>
              </div>
            </div>

            <!-- Body Font Selection -->
            <div class="space-y-3">
              <label class="text-sm font-medium">İçerik Fontu</label>
              <div class="grid grid-cols-3 gap-3">
                <!-- Inter Option -->
                <button
                  @click="changeBodyFont('inter')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    bodyFont === 'inter'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">Inter</span>
                    <div
                      v-if="bodyFont === 'inter'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Mükemmel okunabilirlik</p>
                  <p class="font-inter text-sm">Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p>
                </button>

                <!-- Satoshi Option -->
                <button
                  @click="changeBodyFont('new')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    bodyFont === 'new'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">Satoshi</span>
                    <div
                      v-if="bodyFont === 'new'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Okunabilir ve şık</p>
                  <p class="font-satoshi text-sm">Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p>
                </button>

                <!-- System Font Option -->
                <button
                  @click="changeBodyFont('classic')"
                  :class="[
                    'flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all',
                    bodyFont === 'classic'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent',
                  ]"
                >
                  <div class="flex w-full items-center justify-between">
                    <span class="font-medium">System</span>
                    <div
                      v-if="bodyFont === 'classic'"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground">Klasik sistem fontları</p>
                  <p class="text-sm" style="font-family: system-ui, -apple-system, sans-serif">Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
