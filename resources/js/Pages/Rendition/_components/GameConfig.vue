<template>
  <div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold text-gray-900">Oyun Ayarları</h2>

    <!-- Soru Sayısı -->
    <div class="mb-4">
      <label for="questionCount" class="mb-1 block text-sm font-medium text-gray-700">Soru Sayısı</label>
      <div class="flex items-center gap-2">
        <input
          type="range"
          id="questionCount"
          v-model="config.questionCount"
          min="5"
          max="20"
          class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
        <span class="text-sm font-medium text-gray-700">{{ config.questionCount }}</span>
      </div>
    </div>

    <!-- Kelime Seçimi -->
    <div class="mb-4">
      <label class="mb-1 block text-sm font-medium text-gray-700">Kelime Seçimi</label>
      <div class="space-y-2">
        <div class="flex items-center">
          <input
            type="radio"
            id="random"
            v-model="config.wordSelection"
            value="random"
            class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
          />
          <label for="random" class="ml-2 block text-sm text-gray-700">Rastgele</label>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="difficult"
            v-model="config.wordSelection"
            value="difficult"
            class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
          />
          <label for="difficult" class="ml-2 block text-sm text-gray-700">Zor Kelimeler</label>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="easy"
            v-model="config.wordSelection"
            value="easy"
            class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
          />
          <label for="easy" class="ml-2 block text-sm text-gray-700">Kolay Kelimeler</label>
        </div>
      </div>
    </div>

    <!-- Zorluk Seviyesi -->
    <div class="mb-4">
      <label for="difficulty" class="mb-1 block text-sm font-medium text-gray-700">Zorluk Seviyesi</label>
      <select
        id="difficulty"
        v-model="config.difficulty"
        class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="all">Tüm Seviyeler</option>
        <option value="1">Kolay</option>
        <option value="2">Orta</option>
        <option value="3">Zor</option>
        <option value="4">Çok Zor</option>
      </select>
    </div>

    <!-- Öğrenme Durumu -->
    <div class="mb-6">
      <label for="learningStatus" class="mb-1 block text-sm font-medium text-gray-700">Öğrenme Durumu</label>
      <select
        id="learningStatus"
        v-model="config.learningStatus"
        class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="all">Tüm Durumlar</option>
        <option value="0">Öğrenilmedi</option>
        <option value="1">Öğreniliyor</option>
        <option value="2">Öğrenildi</option>
      </select>
    </div>

    <!-- Başlat Butonu -->
    <button
      @click="startGame"
      class="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
    >
      Oyunu Başlat
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['start-game']);

const config = ref({
  questionCount: 10,
  wordSelection: 'random',
  difficulty: 'all',
  learningStatus: 'all',
});

const startGame = () => {
  emit('start-game', config.value);
};
</script>
