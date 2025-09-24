<template>
  <CheckScreen>
    <GoBackButton url="/rendition/words" />
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-base-content">Yeni Kelime Ekle</h1>
            <p class="text-base-content/70">Kelime bilgilerini girin ve dil paketlerini seçin</p>
          </div>

          <!-- Temel Bilgiler -->
          <div class="space-y-4">
            <!-- Kelime -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-semibold">Kelime</span>
                </label>
                <input
                  type="text"
                  v-model="form.word"
                  class="input-bordered input w-full"
                  placeholder="Kelimeyi girin..."
                  required
                />
                <label v-if="errors.word" class="label">
                  <span class="label-text-alt text-error">{{ errors.word }}</span>
                </label>
              </div>

              <!-- Tür -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-semibold">Tür</span>
                </label>
                <select v-model="form.type" class="select-bordered select w-full">
                  <option value="">Tür seçiniz</option>
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
            </div>

            <!-- Anlamlar -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Anlamlar</span>
              </label>

              <div class="space-y-3">
                <div v-for="(meaning, index) in form.meanings" :key="index" class="flex items-center gap-3">
                  <input
                    type="text"
                    v-model="meaning.meaning"
                    class="input-bordered input w-full"
                    :placeholder="`${index + 1}. anlam`"
                    :data-index="index"
                    @keydown.enter.prevent="addMeaningAndFocus(index)"
                    required
                  />
                  <div class="form-control">
                    <label class="label cursor-pointer gap-2">
                      <span class="label-text text-xs">Birincil</span>
                      <input
                        type="radio"
                        name="primaryMeaning"
                        :checked="meaning.is_primary"
                        @change="setPrimaryMeaning(index)"
                        class="h-4 w-4 border border-base-300 bg-base-100 text-base-content focus:ring-1 focus:ring-base-content"
                      />
                    </label>
                  </div>
                  <button
                    v-if="form.meanings.length > 1"
                    type="button"
                    @click="removeMeaning(index)"
                    class="rounded border border-red-300 bg-red-50 p-1 text-red-700 transition hover:bg-red-100"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <label v-if="errors.meanings" class="label">
                <span class="label-text-alt text-error">{{ errors.meanings }}</span>
              </label>

              <!-- Anlam Ekleme Butonu -->
              <div class="mt-3">
                <button
                  type="button"
                  @click="addMeaning"
                  class="w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                >
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Yeni Anlam Ekle
                </button>
              </div>
            </div>
          </div>

          <!-- Dil Paketleri -->
          <div class="space-y-4">
            <div class="divider">
              <span class="font-semibold text-base-content">Dil Paketleri</span>
            </div>

            <div v-if="props.languagePacks.length === 0" class="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Henüz dil paketi bulunmamaktadır.</span>
            </div>

            <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="pack in props.languagePacks"
                :key="pack.id"
                class="card cursor-pointer bg-base-200 transition-colors hover:bg-base-300"
                :class="{ 'ring-2 ring-base-content': form.language_pack_ids.includes(pack.id) }"
                @click="togglePack(pack.id)"
              >
                <div class="card-body p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-semibold text-base-content">{{ pack.name }}</h3>
                      <p class="text-base-content/70 text-sm">{{ pack.description }}</p>
                    </div>
                    <div
                      class="rounded border border-base-300 bg-base-content px-2 py-1 text-xs font-medium text-base-100"
                    >
                      {{ pack.language.toUpperCase() }}
                    </div>
                  </div>
                  <div class="text-base-content/60 mt-2 text-xs">{{ pack.word_count || 0 }} kelime</div>
                </div>
              </div>
            </div>

            <label v-if="errors.language_pack_ids" class="label">
              <span class="label-text-alt text-error">{{ errors.language_pack_ids }}</span>
            </label>
          </div>

          <!-- Daha Fazla Seçenek -->
          <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" v-model="showAdvancedOptions" />
            <div class="collapse-title font-semibold text-base-content">Daha Fazla Seçenek</div>
            <div class="collapse-content">
              <div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                <!-- Dil -->
                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text">Dil</span>
                  </label>
                  <select v-model="form.language" class="select-bordered select w-full">
                    <option value="en">İngilizce (EN)</option>
                    <option value="tr">Türkçe (TR)</option>
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
                  <select v-model="form.difficulty_level" class="select-bordered select w-full">
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
                  <select v-model="form.learning_status" class="select-bordered select w-full">
                    <option :value="0">Öğrenilmedi</option>
                    <option :value="1">Öğreniliyor</option>
                    <option :value="2">Öğrenildi</option>
                  </select>
                </div>

                <!-- Öne Çıkar -->
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Öne Çıkar</span>
                    <input
                      type="checkbox"
                      v-model="form.flag"
                      class="h-4 w-4 rounded border border-base-300 bg-base-100 text-base-content focus:ring-1 focus:ring-base-content"
                    />
                  </label>
                </div>
              </div>

              <!-- Örnek Cümleler -->
              <div class="divider">Örnek Cümleler</div>
              <div class="space-y-4">
                <div
                  v-for="(sentence, index) in form.example_sentences"
                  :key="index"
                  class="grid grid-cols-1 gap-3 md:grid-cols-2"
                >
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text">Cümle {{ index + 1 }}</span>
                    </label>
                    <input
                      v-model="form.example_sentences[index]"
                      class="input-bordered input w-full"
                      placeholder="Örnek cümle..."
                    />
                  </div>
                  <div class="flex items-end gap-2">
                    <div class="form-control w-full">
                      <label class="label">
                        <span class="label-text">Çeviri</span>
                      </label>
                      <input
                        v-model="form.example_translations[index]"
                        class="input-bordered input w-full"
                        placeholder="Cümle çevirisi..."
                      />
                    </div>
                    <button
                      type="button"
                      @click="removeExampleSentence(index)"
                      class="mb-2 rounded border border-red-300 bg-red-50 p-1 text-red-700 transition hover:bg-red-100"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addExampleSentence"
                  class="rounded border border-base-300 bg-base-100 px-3 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                >
                  <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Örnek Cümle Ekle
                </button>
              </div>

              <!-- Eş Anlamlılar -->
              <div class="divider">Eş Anlamlılar</div>
              <div class="space-y-4">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(synonym, index) in form.synonyms"
                    :key="index"
                    class="flex items-center gap-1 rounded border border-base-300 bg-base-200 px-2 py-1 text-sm text-base-content"
                  >
                    {{ synonym }}
                    <button
                      type="button"
                      @click="removeSynonym(index)"
                      class="rounded border border-base-300 bg-base-100 p-1 text-base-content transition hover:bg-base-200"
                    >
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newSynonym"
                    type="text"
                    class="input-bordered input w-full"
                    placeholder="Yeni eş anlamlı kelime"
                    @keyup.enter.prevent="addSynonym"
                    @keydown.enter.prevent="addSynonym"
                  />
                  <button
                    type="button"
                    @click="addSynonym"
                    class="rounded border border-base-300 bg-base-100 px-3 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                  >
                    <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Buttons -->
          <div class="divider"></div>

          <div class="flex justify-end gap-3">
            <Link
              :href="route('rendition.words.index')"
              class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              İptal
            </Link>
            <button
              type="submit"
              class="rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"
              :disabled="processing"
            >
              <span
                v-if="processing"
                class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"
              ></span>
              <span v-if="!processing">Kelimeyi Kaydet</span>
              <span v-else>Kaydediliyor...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const props = defineProps({
  languagePacks: Array,
  error: String,
  screen: Object,
});

const errors = computed(() => usePage().props.errors);
const processing = ref(false);
const showAdvancedOptions = ref(false);
const newSynonym = ref('');

const form = useForm({
  word: '',
  meanings: [{ meaning: '', is_primary: true }],
  type: '',
  language: 'en', // Default: İngilizce
  difficulty_level: 2, // Default: Orta
  learning_status: 0,
  flag: false,
  language_pack_ids: [],
  example_sentences: [''],
  example_translations: [''],
  synonyms: [],
});

const togglePack = (packId) => {
  const index = form.language_pack_ids.indexOf(packId);
  if (index > -1) {
    form.language_pack_ids.splice(index, 1);
  } else {
    form.language_pack_ids.push(packId);
  }
};

const addExampleSentence = () => {
  form.example_sentences.push('');
  form.example_translations.push('');
};

const removeExampleSentence = (index) => {
  form.example_sentences.splice(index, 1);
  form.example_translations.splice(index, 1);
};

const addSynonym = () => {
  if (newSynonym.value.trim()) {
    form.synonyms.push(newSynonym.value.trim());
    newSynonym.value = '';
  }
};

const removeSynonym = (index) => {
  form.synonyms.splice(index, 1);
};

const addMeaning = () => {
  form.meanings.push({ meaning: '', is_primary: false });
};

const addMeaningAndFocus = async (currentIndex) => {
  // Add new meaning
  form.meanings.push({ meaning: '', is_primary: false });

  // Wait for Vue to update the DOM
  await nextTick();

  // Focus on the newly added meaning
  const nextIndex = currentIndex + 1;
  const nextMeaningInput = document.querySelector(`input[data-index="${nextIndex}"]`);
  if (nextMeaningInput) {
    nextMeaningInput.focus();
    nextMeaningInput.select(); // Select the input content
  }
};

const removeMeaning = (index) => {
  form.meanings.splice(index, 1);
};

const setPrimaryMeaning = (index) => {
  form.meanings.forEach((meaning, i) => {
    meaning.is_primary = i === index;
  });
};

const submitForm = () => {
  processing.value = true;

  // Remove empty example sentences
  const validSentences = [];
  const validTranslations = [];

  form.example_sentences.forEach((sentence, index) => {
    if (sentence.trim()) {
      validSentences.push(sentence);
      validTranslations.push(form.example_translations[index] || '');
    }
  });

  form.example_sentences = validSentences;
  form.example_translations = validTranslations;

  form.post(route('rendition.words.store'), {
    onSuccess: () => {
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    },
  });
};
</script>
