<template>
  <CheckScreen>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold">Kelime Listesi</h2>
          <p class="text-sm">Toplam Kelime Sayısı: {{ isLoading ? '...' : filteredWords.length }}</p>
        </div>
        <a
          v-if="isLoggedIn"
          :href="route('rendition.words.create')"
          class="rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        >
          Yeni Kelime Ekle
        </a>
      </div>

      <!-- Arama ve Filtre -->
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="border-b p-4">
          <div class="flex flex-wrap gap-4">
            <div class="min-w-[200px] flex-1">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Kelime veya anlam ara..."
                class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="min-w-[200px] flex-1">
              <select
                v-model="statusFilter"
                class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tüm Durumlar</option>
                <option value="0">Öğrenilmedi</option>
                <option value="1">Öğreniliyor</option>
                <option value="2">Öğrenildi</option>
              </select>
            </div>
            <button
              @click="clearFilters"
              class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        <!-- Yükleme Durumu -->
        <div v-if="isLoading" class="p-8 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p class="mt-2 text-gray-600">Kelime listesi yükleniyor...</p>
        </div>

        <!-- Tablo -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kelime</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Anlam</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Zorluk</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Durum</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">İşlemler</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-if="filteredWords.length === 0" class="text-center">
                <td colspan="5" class="px-6 py-4 text-sm text-gray-500">Arama kriterlerine uygun kelime bulunamadı</td>
              </tr>
              <tr v-for="word in filteredWords" :key="word.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ word.word }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ word.meaning }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {{ difficultyText(word.difficulty_level) }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {{ learningStatusText(word.learning_status) }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div class="flex space-x-2">
                    <button @click="confirmDelete(word)" class="text-red-600 hover:text-red-900">Sil</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Toplam Kelime Sayısı -->
        <div class="border-t bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-600">Toplam Kelime Sayısı: {{ filteredWords.length }}</p>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

// Props tanımı
const props = defineProps({
  languagePacks: Array,
  words: Array,
});

// Yükleme durumunu takip et
const isLoading = ref(true);

// Kullanıcının giriş yapıp yapmadığını kontrol et
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Arama ve filtreler
const searchQuery = ref('');
const statusFilter = ref('');

// Verilerin yüklenmesini simüle edelim
onMounted(() => {
  // Sayfa yüklendiğinde 500ms sonra yükleme durumunu kaldır
  setTimeout(() => {
    isLoading.value = false;
  }, 500);

  // Eğer kelime yoksa veya veriler yüklenemediyse hata konsola yazdırılabilir
  if (!props.words || props.words.length === 0) {
    console.warn('Kelime verileri yüklenmedi veya boş');
  } else {
    console.log(`${props.words.length} kelime yüklendi`);
    // İlk kelimeyi log'layarak inceleyebiliriz
    if (props.words[0]) {
      console.log('İlk kelime örneği:', props.words[0]);
    }
  }
});

// Güvenli filtreleme
const filteredWords = computed(() => {
  if (!props.words) return [];

  return props.words.filter((word) => {
    if (!word) return false;

    const matchesSearch =
      !searchQuery.value.trim() ||
      (word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesStatus =
      statusFilter.value === '' ||
      (word.learning_status !== undefined && word.learning_status === parseInt(statusFilter.value));

    return matchesSearch && matchesStatus;
  });
});

// Yardımcı fonksiyonlar
const difficultyText = (level) => ['Bilinmiyor', 'Kolay', 'Orta', 'Zor', 'Çok Zor'][level] || 'Bilinmiyor';

const learningStatusText = (status) => ['Öğrenilmedi', 'Öğreniliyor', 'Öğrenildi'][status] || 'Bilinmiyor';

// Silme işlemi
const confirmDelete = (word) => {
  if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
    router.delete(route('rendition.words.destroy', word.id));
  }
};

// Filtreleri temizleme
const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
};
</script>
