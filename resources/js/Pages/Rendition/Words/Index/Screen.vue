<template>
  <CheckScreen>
    <TopScreen title="Kelimeler" />

    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Kelime Listesi</h2>
          <p class="text-sm text-gray-600">
            Toplam Kelime Sayısı: {{ isLoading ? '...' : props.words ? props.words.length : 0 }}
          </p>
        </div>
        <a
          v-if="isLoggedIn"
          :href="route('rendition.words.create')"
          class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        >
          Yeni Kelime Ekle
        </a>
      </div>

      <WordsTable :words="props.words" :isLoading="isLoading" :showActions="isLoggedIn" />
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import WordsTable from '@/Pages/Rendition/_components/WordsTable.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  error: {
    type: String,
    default: null,
  },
});

// Yükleme durumunu takip et
const isLoading = ref(true);

// Kullanıcı durumu
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Verilerin yüklenmesini simüle edelim
onMounted(() => {
  // Sayfa yüklendiğinde 500ms sonra yükleme durumunu kaldır
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>
