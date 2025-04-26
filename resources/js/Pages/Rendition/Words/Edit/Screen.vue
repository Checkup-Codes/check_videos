<template>
  <CheckScreen>
    <TopScreen title="Kelime Düzenle" />

    <!-- Error Alert -->
    <div v-if="props.error" class="mx-6 mt-6 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">{{ props.error }}</h3>
        </div>
      </div>
    </div>

    <div v-if="!props.word && !props.error" class="mx-6 mt-6 rounded-md bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">Kelime bulunamadı veya yüklenemedi.</h3>
          <div class="mt-2">
            <a href="/rendition/words" class="text-sm font-medium text-yellow-800 underline">Kelime listesine dön</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="props.word" class="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Temel Bilgiler -->
          <div class="col-span-1 md:col-span-2">
            <h3 class="mb-3 text-lg font-semibold text-gray-700">Temel Bilgiler</h3>
          </div>

          <!-- Kelime -->
          <div class="mb-4">
            <label for="word" class="mb-1 block text-sm font-medium text-gray-700">Kelime</label>
            <input
              id="word"
              v-model="form.word"
              type="text"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              required
            />
            <div v-if="errors.word" class="mt-1 text-sm text-red-500">{{ errors.word }}</div>
          </div>

          <!-- Anlam -->
          <div class="mb-4">
            <label for="meaning" class="mb-1 block text-sm font-medium text-gray-700">Anlam</label>
            <input
              id="meaning"
              v-model="form.meaning"
              type="text"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              required
            />
            <div v-if="errors.meaning" class="mt-1 text-sm text-red-500">{{ errors.meaning }}</div>
          </div>

          <!-- Tür -->
          <div class="mb-4">
            <label for="type" class="mb-1 block text-sm font-medium text-gray-700">Tür</label>
            <select
              id="type"
              v-model="form.type"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              required
            >
              <option value="" disabled>Tür seçiniz</option>
              <option value="noun">İsim (Noun)</option>
              <option value="verb">Fiil (Verb)</option>
              <option value="adjective">Sıfat (Adjective)</option>
              <option value="adverb">Zarf (Adverb)</option>
              <option value="pronoun">Zamir (Pronoun)</option>
              <option value="preposition">Edat (Preposition)</option>
              <option value="conjunction">Bağlaç (Conjunction)</option>
              <option value="interjection">Ünlem (Interjection)</option>
              <option value="phrase">Deyim (Phrase)</option>
            </select>
            <div v-if="errors.type" class="mt-1 text-sm text-red-500">{{ errors.type }}</div>
          </div>

          <!-- Dil -->
          <div class="mb-4">
            <label for="language" class="mb-1 block text-sm font-medium text-gray-700">Dil</label>
            <select
              id="language"
              v-model="form.language"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              required
            >
              <option value="" disabled>Dil seçiniz</option>
              <option value="tr">Türkçe (TR)</option>
              <option value="en">İngilizce (EN)</option>
              <option value="de">Almanca (DE)</option>
              <option value="fr">Fransızca (FR)</option>
              <option value="es">İspanyolca (ES)</option>
              <option value="it">İtalyanca (IT)</option>
              <option value="ru">Rusça (RU)</option>
              <option value="ar">Arapça (AR)</option>
            </select>
            <div v-if="errors.language" class="mt-1 text-sm text-red-500">{{ errors.language }}</div>
          </div>

          <!-- Zorluk Seviyesi -->
          <div class="mb-4">
            <label for="difficulty_level" class="mb-1 block text-sm font-medium text-gray-700">Zorluk Seviyesi</label>
            <select
              id="difficulty_level"
              v-model="form.difficulty_level"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              required
            >
              <option value="" disabled>Zorluk seviyesi seçiniz</option>
              <option :value="1">Kolay</option>
              <option :value="2">Orta</option>
              <option :value="3">Zor</option>
              <option :value="4">Çok Zor</option>
            </select>
            <div v-if="errors.difficulty_level" class="mt-1 text-sm text-red-500">{{ errors.difficulty_level }}</div>
          </div>

          <!-- Öğrenme Durumu -->
          <div class="mb-4">
            <label for="learning_status" class="mb-1 block text-sm font-medium text-gray-700">Öğrenme Durumu</label>
            <select
              id="learning_status"
              v-model="form.learning_status"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
            >
              <option :value="0">Öğrenilmedi</option>
              <option :value="1">Öğreniliyor</option>
              <option :value="2">Öğrenildi</option>
            </select>
            <div v-if="errors.learning_status" class="mt-1 text-sm text-red-500">{{ errors.learning_status }}</div>
          </div>

          <!-- Öne Çıkar -->
          <div class="mb-4">
            <div class="flex items-center">
              <input id="flag" v-model="form.flag" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black" />
              <label for="flag" class="ml-2 block text-sm text-gray-700">Öne Çıkar</label>
            </div>
            <div v-if="errors.flag" class="mt-1 text-sm text-red-500">{{ errors.flag }}</div>
          </div>

          <!-- İstatistikler -->
          <div class="col-span-1 mb-4 md:col-span-2">
            <h3 class="mb-3 text-lg font-semibold text-gray-700">İstatistikler</h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="rounded-md bg-gray-50 p-3">
                <div class="text-sm text-gray-500">Yanlış Sayısı</div>
                <div class="text-lg font-semibold">{{ props.word.incorrect_count }}</div>
              </div>
              <div class="rounded-md bg-gray-50 p-3">
                <div class="text-sm text-gray-500">Toplam İnceleme</div>
                <div class="text-lg font-semibold">{{ props.word.review_count }}</div>
              </div>
            </div>
          </div>

          <!-- Dil Paketleri -->
          <div class="col-span-1 mb-4 md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-gray-700">Dil Paketleri</label>
            <div class="max-h-60 overflow-y-auto rounded-md border border-gray-300 p-3">
              <div v-if="props.languagePacks.length === 0" class="text-sm text-gray-500">
                Henüz dil paketi bulunmamaktadır.
              </div>
              <div v-else class="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div v-for="pack in props.languagePacks" :key="pack.id" class="flex items-center">
                  <input
                    :id="`pack-${pack.id}`"
                    v-model="form.language_pack_ids"
                    :value="pack.id"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-500"
                  />
                  <label :for="`pack-${pack.id}`" class="ml-2 block text-sm text-gray-700">
                    {{ pack.name }} ({{ getLanguageName(pack.language) }})
                  </label>
                </div>
              </div>
            </div>
            <div v-if="errors.language_pack_ids" class="mt-1 text-sm text-red-500">{{ errors.language_pack_ids }}</div>
          </div>

          <!-- Örnek Cümleler -->
          <div class="col-span-1 md:col-span-2">
            <h3 class="mb-3 text-lg font-semibold text-gray-700">Örnek Cümleler</h3>
            <div
              v-for="(sentence, index) in form.example_sentences"
              :key="index"
              class="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div>
                <label :for="`sentence-${index}`" class="mb-1 block text-sm font-medium text-gray-700">Cümle</label>
                <input
                  :id="`sentence-${index}`"
                  v-model="form.example_sentences[index]"
                  type="text"
                  class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div class="flex items-end">
                <div class="flex-grow">
                  <label :for="`translation-${index}`" class="mb-1 block text-sm font-medium text-gray-700"
                    >Çeviri</label
                  >
                  <input
                    :id="`translation-${index}`"
                    v-model="form.example_translations[index]"
                    type="text"
                    class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
                  />
                </div>
                <button
                  type="button"
                  @click="removeExampleSentence(index)"
                  class="ml-2 px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="addExampleSentence"
              class="mt-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Örnek Cümle Ekle
            </button>
          </div>

          <!-- Eş Anlamlılar -->
          <div class="col-span-1 mb-6 md:col-span-2">
            <h3 class="mb-3 text-lg font-semibold text-gray-700">Eş Anlamlılar</h3>
            <div class="mb-2 flex flex-wrap gap-2">
              <div
                v-for="(synonym, index) in form.synonyms"
                :key="index"
                class="flex items-center rounded-full bg-gray-100 px-3 py-1"
              >
                <span>{{ synonym }}</span>
                <button
                  type="button"
                  @click="removeSynonym(index)"
                  class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex">
              <input
                v-model="newSynonym"
                type="text"
                placeholder="Eş anlamlı kelime ekleyin"
                class="flex-grow rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                @keydown.enter.prevent="addSynonym"
              />
              <button
                type="button"
                @click="addSynonym"
                class="rounded-r-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="goBack"
            class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            İptal
          </button>
          <button
            type="submit"
            class="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            :disabled="processing"
          >
            {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

const props = defineProps({
  word: Object,
  languagePacks: Array,
  screen: Object,
  error: String,
});

// Mevcut dil paketlerinin ID'lerini al
const currentLanguagePackIds = props.word.language_packs.map((pack) => pack.id);

// Mevcut örnek cümleleri al
const exampleSentences = props.word.example_sentences.map((sentence) => sentence.sentence);
const exampleTranslations = props.word.example_sentences.map((sentence) => sentence.translation);

// Mevcut eş anlamlıları al
const synonyms = props.word.synonyms.map((synonym) => synonym.synonym);

const form = useForm({
  word: props.word.word,
  meaning: props.word.meaning,
  type: props.word.type,
  language: props.word.language,
  learning_status: props.word.learning_status,
  flag: props.word.flag,
  difficulty_level: props.word.difficulty_level,
  language_pack_ids: currentLanguagePackIds,
  example_sentences: exampleSentences,
  example_translations: exampleTranslations,
  synonyms: synonyms,
});

const processing = ref(false);
const newSynonym = ref('');

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

// Örnek cümle ekleme
const addExampleSentence = () => {
  form.example_sentences.push('');
  form.example_translations.push('');
};

// Örnek cümle silme
const removeExampleSentence = (index) => {
  form.example_sentences.splice(index, 1);
  form.example_translations.splice(index, 1);
};

// Eş anlamlı ekleme
const addSynonym = () => {
  if (newSynonym.value.trim()) {
    form.synonyms.push(newSynonym.value.trim());
    newSynonym.value = '';
  }
};

// Eş anlamlı silme
const removeSynonym = (index) => {
  form.synonyms.splice(index, 1);
};

// Form gönderme
const submitForm = () => {
  processing.value = true;
  form.put(route('rendition.words.update', props.word.id), {
    onSuccess: () => {
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    },
  });
};

// Geri dönme
const goBack = () => {
  router.visit(route('rendition.words.index'));
};

const errors = usePage().props.errors;
</script>
