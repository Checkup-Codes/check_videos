<template>
  <CheckScreen>
    <GoBackButton url="/rendition/words" />
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

    <div
      v-if="props.word"
      class="card dark:bg-base-100 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700"
    >
      <div class="card-body p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="divider">Temel Bilgiler</div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Kelime -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Kelime</span>
              </label>
              <input type="text" v-model="form.word" class="input input-bordered w-full" required />
              <label v-if="errors.word" class="label">
                <span class="label-text-alt text-error">{{ errors.word }}</span>
              </label>
            </div>

            <!-- Anlam -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Anlam</span>
              </label>
              <input type="text" v-model="form.meaning" class="input input-bordered w-full" required />
              <label v-if="errors.meaning" class="label">
                <span class="label-text-alt text-error">{{ errors.meaning }}</span>
              </label>
            </div>

            <!-- Tür -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Tür</span>
              </label>
              <select v-model="form.type" class="select select-bordered w-full" required>
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
              <label v-if="errors.type" class="label">
                <span class="label-text-alt text-error">{{ errors.type }}</span>
              </label>
            </div>

            <!-- Dil -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Dil</span>
              </label>
              <select v-model="form.language" class="select select-bordered w-full" required>
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
              <label v-if="errors.language" class="label">
                <span class="label-text-alt text-error">{{ errors.language }}</span>
              </label>
            </div>

            <!-- Zorluk Seviyesi -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Zorluk Seviyesi</span>
              </label>
              <select v-model="form.difficulty_level" class="select select-bordered w-full" required>
                <option value="" disabled>Zorluk seviyesi seçiniz</option>
                <option :value="1">Kolay</option>
                <option :value="2">Orta</option>
                <option :value="3">Zor</option>
                <option :value="4">Çok Zor</option>
              </select>
              <label v-if="errors.difficulty_level" class="label">
                <span class="label-text-alt text-error">{{ errors.difficulty_level }}</span>
              </label>
            </div>

            <!-- Öğrenme Durumu -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Öğrenme Durumu</span>
              </label>
              <select v-model="form.learning_status" class="select select-bordered w-full">
                <option :value="0">Öğrenilmedi</option>
                <option :value="1">Öğreniliyor</option>
                <option :value="2">Öğrenildi</option>
              </select>
            </div>

            <!-- Öne Çıkar -->
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Öne Çıkar</span>
                <input type="checkbox" v-model="form.flag" class="checkbox" />
              </label>
            </div>
          </div>

          <!-- İstatistikler -->
          <div class="divider">İstatistikler</div>

          <div
            class="card dark:bg-base-100 border border-gray-200 bg-white shadow transition-all duration-200 dark:border-gray-700"
          >
            <div class="card-body p-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="stats shadow">
                  <div class="stat">
                    <div class="stat-title">Yanlış Sayısı</div>
                    <div class="stat-value">{{ props.word.incorrect_count }}</div>
                  </div>
                </div>
                <div class="stats shadow">
                  <div class="stat">
                    <div class="stat-title">Toplam İnceleme</div>
                    <div class="stat-value">{{ props.word.review_count }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dil Paketleri -->
          <div class="divider">Dil Paketleri</div>

          <div
            class="card dark:bg-base-100 border border-gray-200 bg-white shadow transition-all duration-200 dark:border-gray-700"
          >
            <div class="card-body p-4">
              <div v-if="props.languagePacks.length === 0" class="text-sm opacity-70">
                Henüz dil paketi bulunmamaktadır.
              </div>
              <div v-else class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="pack in props.languagePacks" :key="pack.id" class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">
                      {{ pack.name }}
                      <span class="badge badge-sm badge-outline ml-1">{{ getLanguageName(pack.language) }}</span>
                    </span>
                    <input
                      type="checkbox"
                      v-model="form.language_pack_ids"
                      :value="pack.id"
                      class="checkbox checkbox-sm"
                    />
                  </label>
                </div>
              </div>
              <label v-if="errors.language_pack_ids" class="label">
                <span class="label-text-alt text-error">{{ errors.language_pack_ids }}</span>
              </label>
            </div>
          </div>

          <!-- Örnek Cümleler -->
          <div class="divider">Örnek Cümleler</div>

          <div
            class="card dark:bg-base-100 border border-gray-200 bg-white shadow transition-all duration-200 dark:border-gray-700"
          >
            <div class="card-body p-4">
              <div
                v-for="(sentence, index) in form.example_sentences"
                :key="index"
                class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text">Cümle {{ index + 1 }}</span>
                  </label>
                  <input v-model="form.example_sentences[index]" class="input input-bordered w-full" />
                </div>
                <div class="flex items-end gap-2">
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text">Çeviri</span>
                    </label>
                    <input v-model="form.example_translations[index]" class="input input-bordered w-full" />
                  </div>
                  <button
                    type="button"
                    @click="removeExampleSentence(index)"
                    class="btn btn-circle btn-outline btn-sm btn-error mb-2"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <button type="button" @click="addExampleSentence" class="btn btn-outline btn-sm">Örnek Cümle Ekle</button>
            </div>
          </div>

          <!-- Eş Anlamlılar -->
          <div class="divider">Eş Anlamlılar</div>

          <div
            class="card dark:bg-base-100 border border-gray-200 bg-white shadow transition-all duration-200 dark:border-gray-700"
          >
            <div class="card-body p-4">
              <div class="mb-4 flex flex-wrap gap-2">
                <div v-for="(synonym, index) in form.synonyms" :key="index" class="badge badge-lg badge-outline gap-1">
                  {{ synonym }}
                  <button type="button" @click="removeSynonym(index)" class="btn btn-circle btn-ghost btn-xs">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="newSynonym"
                  type="text"
                  class="input input-bordered w-full"
                  placeholder="Yeni eş anlamlı kelime"
                  @keyup.enter.prevent="addSynonym"
                />
                <button type="button" @click="addSynonym" class="btn btn-outline">Ekle</button>
              </div>
            </div>
          </div>

          <!-- Form Buttons -->
          <div class="divider"></div>

          <div class="flex justify-end gap-2">
            <Link :href="route('rendition.words.index')" class="btn btn-ghost">İptal</Link>
            <button type="submit" class="btn btn-primary" :disabled="processing">
              <span v-if="processing" class="loading loading-spinner loading-sm"></span>
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const props = defineProps({
  word: Object,
  languagePacks: Array,
  screen: Object,
  error: String,
});

// Mevcut dil paketlerinin ID'lerini al
const currentLanguagePackIds = props.word?.language_packs?.map((pack) => pack.id) || [];

// Mevcut örnek cümleleri al
const exampleSentences = props.word?.example_sentences?.map((sentence) => sentence.sentence) || [];
const exampleTranslations = props.word?.example_sentences?.map((sentence) => sentence.translation) || [];

// Mevcut eş anlamlıları al
const synonyms = props.word?.synonyms?.map((synonym) => synonym.synonym) || [];

const form = useForm({
  word: props.word?.word || '',
  meaning: props.word?.meaning || '',
  type: props.word?.type || '',
  language: props.word?.language || '',
  learning_status: props.word?.learning_status || 0,
  flag: props.word?.flag || false,
  difficulty_level: props.word?.difficulty_level || '',
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
