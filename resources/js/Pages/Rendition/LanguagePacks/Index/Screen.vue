<template>
  <CheckScreen>
    <TopScreen title="Dil Paketleri" />

    <MultipleChoice
      v-if="queryParams.game == 'multiple-choice'"
      :gameType="queryParams.game"
      :packId="queryParams.pack_id"
    />
    <TranslateWord
      v-else-if="queryParams.game == 'fill-in-the-blank'"
      :gameType="queryParams.game"
      :packId="queryParams.pack_id"
    />

    <PacksTable v-else :languagePacks="languagePacks" />
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import PacksTable from '@/Pages/Rendition/LanguagePacks/Index/PacksTable.vue';
import MultipleChoice from '@/Pages/Rendition/_components/MultipleChoice.vue';
import TranslateWord from '../../_components/TranslateWord.vue';

// URL'deki query parametrelerini al
const queryParams = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return {
    game: params.get('game') || null,
    pack_id: params.get('pack_id') || null,
  };
});

const props = defineProps({
  languagePacks: Array,
  screen: Object,
});

const games = ref([
  { name: 'Çoktan Seçmeli', route: 'multiple-choice' },
  { name: 'Boşluk Doldurma', route: 'fill-in-the-blank' },
  { name: 'Çeviri', route: 'translation' },
  { name: 'Eşleştirme', route: 'matching' },
  { name: 'Hızlı Yanıt', route: 'fast-response' },
  { name: 'Kelime Tahmini', route: 'word-guess' },
]);

// URL'e oyun parametresi ekle
const updateQuery = (gameRoute) => {
  const currentQuery = new URLSearchParams(window.location.search);
  currentQuery.set('game', gameRoute);

  Inertia.visit(`${window.location.pathname}?${currentQuery.toString()}`, {
    method: 'get',
    preserveState: true,
    replace: true,
  });
};
</script>
