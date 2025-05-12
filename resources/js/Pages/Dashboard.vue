<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';

interface Write {
  id: number;
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
}

// Define props for the data passed from the controller
const props = defineProps<Props>();

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
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>
    </template>

    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Stats Cards -->
        <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Total Categories -->
          <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Kategori</dt>
                <dd class="mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  {{ stats.categories_count }}
                </dd>
              </dl>
            </div>
            <div class="bg-gray-50 px-4 py-3 dark:bg-gray-700">
              <Link
                :href="route('categories.index')"
                class="text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Tüm Kategorileri Gör &rarr;
              </Link>
            </div>
          </div>

          <!-- Total Articles -->
          <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Yazı</dt>
                <dd class="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
                  {{ stats.writes_count }}
                </dd>
              </dl>
            </div>
            <div class="bg-gray-50 px-4 py-3 dark:bg-gray-700">
              <Link
                :href="route('writes.index')"
                class="text-sm font-medium text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
              >
                Tüm Yazıları Gör &rarr;
              </Link>
            </div>
          </div>

          <!-- Public Articles -->
          <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Yayında Olan Yazılar</dt>
                <dd class="mt-1 text-3xl font-semibold text-purple-600 dark:text-purple-400">
                  {{ stats.public_writes_count }}
                </dd>
              </dl>
            </div>
            <div class="bg-gray-50 px-4 py-3 dark:bg-gray-700">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Toplam Yazıların
                {{
                  stats.writes_count > 0 ? Math.round((stats.public_writes_count / stats.writes_count) * 100) : 0
                }}%'si
              </div>
            </div>
          </div>

          <!-- Private Articles -->
          <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Özel Yazılar</dt>
                <dd class="mt-1 text-3xl font-semibold text-amber-600 dark:text-amber-400">
                  {{ stats.private_writes_count }}
                </dd>
              </dl>
            </div>
            <div class="bg-gray-50 px-4 py-3 dark:bg-gray-700">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Toplam Yazıların
                {{
                  stats.writes_count > 0 ? Math.round((stats.private_writes_count / stats.writes_count) * 100) : 0
                }}%'si
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Recent Articles -->
          <div class="overflow-hidden rounded-lg bg-white shadow lg:col-span-2 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-gray-700">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Son Yazılarınız</h3>
            </div>
            <div class="bg-white dark:bg-gray-800">
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li
                  v-for="write in recentWrites"
                  :key="write.id"
                  class="px-4 py-4 hover:bg-gray-50 sm:px-6 dark:hover:bg-gray-700"
                >
                  <Link :href="route('writes.show', write.id)" class="flex flex-col space-y-2">
                    <div class="flex items-center justify-between">
                      <p class="truncate text-sm font-medium text-blue-600 dark:text-blue-400">
                        {{ write.title }}
                      </p>
                      <div class="ml-2 flex flex-shrink-0">
                        <p
                          class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                          :class="
                            write.status === 'public'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          "
                        >
                          {{ write.status === 'public' ? 'Yayında' : 'Özel' }}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ write.excerpt ? write.excerpt.substring(0, 80) + '...' : 'İçerik yok' }}
                      </p>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      Güncellenme: {{ formatDate(write.updated_at) }}
                    </div>
                  </Link>
                </li>
                <li v-if="recentWrites.length === 0" class="px-4 py-4 text-gray-500 sm:px-6 dark:text-gray-400">
                  Henüz yazı eklenmemiş.
                </li>
              </ul>
              <div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700">
                <Link
                  :href="route('writes.create')"
                  class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Yeni Yazı Ekle
                </Link>
              </div>
            </div>
          </div>

          <!-- Popular Categories -->
          <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-gray-700">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Popüler Kategorileriniz</h3>
            </div>
            <div class="bg-white dark:bg-gray-800">
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li
                  v-for="category in popularCategories"
                  :key="category.id"
                  class="px-4 py-4 hover:bg-gray-50 sm:px-6 dark:hover:bg-gray-700"
                >
                  <Link :href="route('categories.show', category.id)" class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ category.name }}
                    </p>
                    <div class="ml-2 flex flex-shrink-0">
                      <p
                        class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {{ category.writes_count }} Yazı
                      </p>
                    </div>
                  </Link>
                </li>
                <li v-if="popularCategories.length === 0" class="px-4 py-4 text-gray-500 sm:px-6 dark:text-gray-400">
                  Henüz kategori eklenmemiş.
                </li>
              </ul>
              <div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700">
                <Link
                  :href="route('categories.create')"
                  class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Yeni Kategori Ekle
                </Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Stats Chart -->
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Bu Yılki Yazı İstatistikleri
          </h3>
          <div class="h-80">
            <canvas id="monthlyStatsChart"></canvas>
            <div v-if="!chartLoaded" class="flex h-full items-center justify-center">
              <svg
                class="h-8 w-8 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
