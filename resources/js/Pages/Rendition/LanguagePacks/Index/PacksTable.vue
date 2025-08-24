<template>
  <CheckScreen>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-base-content">Dil Paketleri</h2>
          <p class="text-sm text-base-content/70">Toplam Paket Sayısı: {{ languagePacks.length }}</p>
        </div>
        <a
          v-if="isLoggedIn"
          :href="route('rendition.language-packs.create')"
          class="btn btn-primary btn-sm"
        >
          Yeni Paket Oluştur
        </a>
      </div>

      <!-- Arama ve Filtre -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex flex-wrap gap-4">
            <div class="min-w-[200px] flex-1">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Kelime veya anlam ara..."
                class="input input-bordered w-full"
              />
            </div>
            <div class="min-w-[200px] flex-1">
              <select
                v-model="statusFilter"
                class="select select-bordered w-full"
              >
                <option value="">Tüm Durumlar</option>
                <option value="0">Öğrenilmedi</option>
                <option value="1">Öğreniliyor</option>
                <option value="2">Öğrenildi</option>
              </select>
            </div>
            <button
              @click="clearFilters"
              class="btn btn-outline btn-sm"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        <!-- Yükleme Durumu -->
        <div v-if="isLoading" class="p-8 text-center">
          <div class="loading loading-spinner loading-lg"></div>
          <p class="mt-2 text-base-content/70">Kelime listesi yükleniyor...</p>
        </div>

        <!-- Tablo -->
        <div v-else class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Paket Adı</th>
                <th>Dil</th>
                <th>Kelime Sayısı</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pack in languagePacks" :key="pack.id" class="hover">
                <td>
                  <div class="text-sm font-medium text-base-content">{{ pack.name }}</div>
                  <div class="text-sm text-base-content/70">{{ pack.description }}</div>
                </td>
                <td>
                  <span class="badge badge-primary">
                    {{ getLanguageName(pack.language) }}
                  </span>
                </td>
                <td class="text-sm text-base-content/70">
                  {{ pack.word_count }}
                </td>
                <td>
                  <div class="flex gap-2">
                    <a
                      :href="route('rendition.language-packs.words', pack.id)"
                      class="link link-primary"
                    >
                      Kelimeler
                    </a>
                    <a
                      v-if="isLoggedIn"
                      :href="route('rendition.language-packs.edit', pack.id)"
                      class="link link-secondary"
                    >
                      Düzenle
                    </a>
                    <a
                      v-if="isLoggedIn"
                      :href="route('rendition.language-packs.export', pack.id)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Dışa Aktar
                    </a>
                    <button v-if="isLoggedIn" @click="confirmDelete(pack)" class="text-red-600 hover:text-red-900">
                      Sil
                    </button>
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
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
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
const confirmDelete = (pack) => {
  if (confirm(`"${pack.name}" dil paketini silmek istediğinize emin misiniz?`)) {
    router.delete(route('rendition.language-packs.destroy', pack.id));
  }
};

// Filtreleri temizleme
const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
};

// Dil kodunu dil adına çevirme
const getLanguageName = (code) => {
  const languages = {
    tr: 'Türkçe',
    en: 'İngilizce',
    de: 'Almanca',
    fr: 'Fransızca',
    es: 'İspanyolca',
    it: 'İtalyanca',
    ru: 'Rusça',
    ar: 'Arapça',
  };

  return languages[code] || code;
};
</script>
