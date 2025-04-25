<template>
  <CheckScreen>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Kelime Listesi</h2>
          <p class="text-sm text-gray-600">Toplam Kelime Sayısı: {{ filteredWords.length }}</p>
        </div>
        <a
          v-if="isLoggedIn"
          :href="route('rendition.words.create')"
          class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        >
          Yeni Kelime Ekle
        </a>
      </div>

      <!-- Arama ve Filtre -->
      <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700">Kelime Ara</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Öğrenme Durumu</label>
          <select
            v-model="statusFilter"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tümü</option>
            <option value="0">Öğrenilmedi</option>
            <option value="1">Öğreniliyor</option>
            <option value="2">Öğrenildi</option>
          </select>
        </div>
      </div>

      <!-- Kelime Tablosu -->
      <div class="overflow-x-auto">
        <table class="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Kelime</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Anlam</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Tür</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Zorluk</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Öğrenme Durumu</th>
              <th v-if="isLoggedIn" class="border-b px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredWords.length === 0">
              <td colspan="6" class="border-b px-4 py-6 text-center text-gray-500">
                {{
                  searchQuery || statusFilter
                    ? 'Arama kriterlerine uygun kelime bulunamadı.'
                    : 'Henüz kelime bulunmamaktadır.'
                }}
              </td>
            </tr>
            <tr v-for="word in filteredWords" :key="word.id" class="text-sm transition hover:bg-gray-100">
              <td class="border-b px-4 py-3 font-medium">{{ word.word }}</td>
              <td class="border-b px-4 py-3">{{ word.meaning }}</td>
              <td class="border-b px-4 py-3 capitalize">{{ word.type }}</td>
              <td class="border-b px-4 py-3">{{ difficultyText(word.difficulty_level) }}</td>
              <td class="border-b px-4 py-3">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="{
                    'bg-red-100 text-red-800': word.learning_status === 0,
                    'bg-yellow-100 text-yellow-800': word.learning_status === 1,
                    'bg-green-100 text-green-800': word.learning_status === 2,
                  }"
                >
                  {{ learningStatusText(word.learning_status) }}
                </span>
              </td>
              <td class="border-b px-4 py-3" v-if="isLoggedIn">
                <div class="flex space-x-2">
                  <a
                    :href="route('rendition.words.edit', word.id)"
                    class="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                  >
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
                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-6-6l6 6M15 3l6 6"
                      />
                    </svg>
                  </a>
                  <button
                    @click="confirmDelete(word)"
                    class="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

// Props tanımı
const props = defineProps({
  languagePacks: Array,
});

console.log('Props:', props.languagePacks[0].words);

const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Arama ve filtreler
const searchQuery = ref('');
const statusFilter = ref('');

// Güvenli filtreleme
const filteredWords = computed(() => {
  if (!props.languagePacks[0] || !props.languagePacks[0].words) return [];

  return props.languagePacks[0].words.filter((word) => {
    const matchesSearch =
      !searchQuery.value.trim() ||
      word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus = statusFilter.value === '' || word.learning_status === parseInt(statusFilter.value);

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
</script>
