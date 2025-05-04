<template>
  <CheckScreen>
    <!-- Card component directly implemented -->
    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex-1">
            <h1 class="text-2xl font-bold">Kelimeler</h1>
            <p class="text-sm opacity-70">
              Toplam: {{ isLoading ? '...' : props.words ? props.words.length : 0 }} kelime
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <Link
              v-if="isLoggedIn"
              :href="route('rendition.words.create')"
              class="btn btn-primary btn-sm whitespace-nowrap"
            >
              Yeni Kelime
            </Link>
          </div>
        </div>

        <div class="divider my-2"></div>

        <!-- Filtreler -->
        <div class="mb-4 flex flex-col flex-wrap gap-3 sm:flex-row">
          <!-- Arama Kutusu -->
          <div class="form-control min-w-[200px] flex-1">
            <div class="input-group w-full">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Kelime ara..."
                class="input-bordered input input-sm w-full"
                @keyup.enter="search"
              />
              <button class="btn btn-sm btn-square" @click="search">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Dil Filtresi -->
          <select
            v-model="filterLanguage"
            class="select-bordered select select-sm min-w-[150px] flex-1"
            @change="search"
          >
            <option value="">Tüm Diller</option>
            <option value="tr">Türkçe</option>
            <option value="en">İngilizce</option>
            <option value="de">Almanca</option>
            <option value="fr">Fransızca</option>
            <option value="es">İspanyolca</option>
          </select>

          <!-- Durum Filtresi -->
          <select v-model="filterStatus" class="select-bordered select select-sm min-w-[150px] flex-1" @change="search">
            <option value="">Tüm Durumlar</option>
            <option value="0">Öğrenilmedi</option>
            <option value="1">Öğreniliyor</option>
            <option value="2">Öğrenildi</option>
          </select>
        </div>

        <!-- Tablo -->
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Kelime</th>
                <th>Anlam</th>
                <th>Tür</th>
                <th>Dil</th>
                <th>Durum</th>
                <th v-if="isLoggedIn"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="text-center">
                  <span class="loading loading-spinner loading-md"></span>
                </td>
              </tr>
              <tr v-else-if="props.words && props.words.length === 0">
                <td colspan="6" class="text-center">Sonuç bulunamadı</td>
              </tr>
              <tr v-for="word in props.words" :key="word.id">
                <td>
                  <div class="font-medium">{{ word.word }}</div>
                </td>
                <td>{{ truncateText(word.meaning, 50) }}</td>
                <td>
                  <div class="badge badge-sm">{{ word.type }}</div>
                </td>
                <td>
                  <div class="badge badge-outline">{{ word.language }}</div>
                </td>
                <td>
                  <div class="badge badge-sm" :class="getLearningStatusBadgeClass(word.learning_status)">
                    {{ getLearningStatusLabel(word.learning_status) }}
                  </div>
                </td>
                <td v-if="isLoggedIn">
                  <div class="flex gap-1">
                    <Link :href="route('rendition.words.edit', word.id)" class="btn btn-ghost btn-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div>
            <span class="text-sm opacity-70">{{ paginationInfo }}</span>
          </div>
          <div class="join">
            <button class="btn btn-sm join-item" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
              «
            </button>
            <button class="btn btn-sm join-item">{{ currentPage }}</button>
            <button
              class="btn btn-sm join-item"
              :disabled="currentPage >= totalPages"
              @click="changePage(currentPage + 1)"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  error: {
    type: String,
    default: null,
  },
  filters: Object,
  pagination: Object,
});

// Yükleme durumu
const isLoading = ref(true);

// Kullanıcı durumu
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Pagination ve filtreler
const currentPage = ref(props.pagination?.current_page || 1);
const totalPages = ref(props.pagination?.last_page || 1);
const searchQuery = ref(props.filters?.search || '');
const filterLanguage = ref(props.filters?.language || '');
const filterStatus = ref(props.filters?.status || '');

const paginationInfo = computed(() => {
  if (!props.pagination) return '';
  const from = props.pagination.from || 0;
  const to = props.pagination.to || 0;
  const total = props.pagination.total || 0;
  return `${from}-${to} / ${total}`;
});

// Arama yapılınca
const search = () => {
  router.visit(route('rendition.words.index'), {
    data: {
      search: searchQuery.value,
      language: filterLanguage.value,
      status: filterStatus.value,
      page: 1, // Her aramada ilk sayfaya dön
    },
    preserveState: true,
    replace: true,
    onBefore: () => {
      isLoading.value = true;
    },
    onSuccess: () => {
      isLoading.value = false;
    },
  });
};

// Sayfa değiştirme
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
  router.visit(route('rendition.words.index'), {
    data: {
      search: searchQuery.value,
      language: filterLanguage.value,
      status: filterStatus.value,
      page: page,
    },
    preserveState: true,
    replace: true,
    onBefore: () => {
      isLoading.value = true;
    },
    onSuccess: () => {
      isLoading.value = false;
    },
  });
};

// Metin kısaltma
const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Öğrenme durumu için stil ve etiket
const getLearningStatusBadgeClass = (status) => {
  switch (Number(status)) {
    case 0:
      return 'badge-ghost';
    case 1:
      return 'badge-warning';
    case 2:
      return 'badge-success';
    default:
      return 'badge-ghost';
  }
};

const getLearningStatusLabel = (status) => {
  switch (Number(status)) {
    case 0:
      return 'Öğrenilmedi';
    case 1:
      return 'Öğreniliyor';
    case 2:
      return 'Öğrenildi';
    default:
      return 'Belirsiz';
  }
};

// Sayfa yüklendiğinde
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>
