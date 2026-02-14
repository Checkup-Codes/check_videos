<template>
  <CheckScreen>
    <div class="space-y-6 py-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-foreground">Yeni Kelime</h1>
        <p class="mt-1 text-sm text-muted-foreground">Tek kelime veya toplu olarak ekleyebilirsiniz</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 border-b border-border">
        <button
          @click="activeTab = 'single'"
          class="relative px-4 py-2 text-sm font-medium transition-colors"
          :class="activeTab === 'single' 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'"
        >
          Tek Kelime
          <div
            v-if="activeTab === 'single'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          />
        </button>
        <button
          @click="activeTab = 'bulk'"
          class="relative px-4 py-2 text-sm font-medium transition-colors"
          :class="activeTab === 'bulk' 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'"
        >
          Toplu Ekleme
          <div
            v-if="activeTab === 'bulk'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          />
        </button>
      </div>

      <!-- Single Word Tab -->
      <div v-if="activeTab === 'single'">
        <!-- Yarım Kalan Kelimeler Uyarısı -->
      <div 
        v-if="incompleteWordsCount > 0" 
        class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"
      >
        <div class="flex items-start gap-3">
          <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div class="flex-1">
            <h3 class="font-medium text-yellow-800 dark:text-yellow-200">
              {{ incompleteWordsCount }} yarım kalan kelime var
            </h3>
            <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Bu kelimelerin anlamları henüz girilmemiş.
            </p>
            <button 
              @click="showIncompleteList = !showIncompleteList"
              class="mt-2 text-sm font-medium text-yellow-800 underline hover:no-underline dark:text-yellow-200"
            >
              {{ showIncompleteList ? 'Gizle' : 'Tamamla' }}
            </button>
          </div>
        </div>

        <!-- Yarım Kalan Kelimeler Listesi (İlk 20) -->
        <div v-if="showIncompleteList" class="mt-4 space-y-2">
          <Link
            v-for="word in incompleteWords"
            :key="word.id"
            :href="`/rendition/words/${word.id}/edit`"
            class="flex items-center justify-between rounded-md border border-yellow-500/20 bg-background p-3 transition-colors hover:bg-accent"
          >
            <div>
              <span class="font-medium text-foreground">{{ word.word }}</span>
              <span class="ml-2 text-xs text-muted-foreground">{{ word.language.toUpperCase() }}</span>
              <span v-if="word.type" class="ml-2 text-xs text-muted-foreground">({{ getWordTypeLabel(word.type) }})</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{{ word.created_at }}</span>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <p v-if="incompleteWordsCount > 20" class="text-xs text-center text-muted-foreground pt-2">
            ... ve {{ incompleteWordsCount - 20 }} kelime daha
          </p>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Temel Bilgiler -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <h2 class="mb-4 text-lg font-semibold text-foreground">Temel Bilgiler</h2>
          
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Kelime -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">
                Kelime <span class="text-destructive">*</span>
              </label>
              <input
                v-model="form.word"
                type="text"
                placeholder="Kelimeyi girin..."
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-destructive': errors.word || duplicateCheck.exists }"
                required
              />
              <p v-if="errors.word" class="text-xs text-destructive">{{ errors.word }}</p>
              
              <!-- Duplicate Check Loading -->
              <p v-if="duplicateCheck.checking" class="text-xs text-muted-foreground">
                <span class="inline-block animate-spin">⏳</span> Kontrol ediliyor...
              </p>
              
              <!-- Duplicate Warning -->
              <div 
                v-if="duplicateCheck.exists" 
                class="rounded-lg border border-destructive/30 bg-destructive/10 p-3"
              >
                <div class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-destructive">{{ duplicateCheck.message }}</p>
                    <button
                      type="button"
                      @click="editExistingWord"
                      class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-destructive underline hover:no-underline"
                    >
                      Mevcut kelimeyi düzenle
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dil -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">
                Dil <span class="text-destructive">*</span>
              </label>
              <select 
                v-model="form.language" 
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">İngilizce (EN)</option>
                <option value="tr">Türkçe (TR)</option>
                <option value="de">Almanca (DE)</option>
                <option value="fr">Fransızca (FR)</option>
                <option value="es">İspanyolca (ES)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Anlam (Opsiyonel ama önerilen) -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-foreground">Anlam</h2>
              <p class="text-xs text-muted-foreground">Boş bırakırsanız "yarım kalan" olarak kaydedilir</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div v-for="(meaning, index) in form.meanings" :key="index" class="flex items-center gap-3">
              <input
                v-model="meaning.meaning"
                type="text"
                :placeholder="`${index + 1}. anlam`"
                class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                @keydown.enter.prevent="addMeaningAndFocus(index)"
              />
              <label class="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
                <input
                  type="radio"
                  name="primaryMeaning"
                  :checked="meaning.is_primary"
                  @change="setPrimaryMeaning(index)"
                  class="h-3.5 w-3.5"
                />
                Birincil
              </label>
              <button
                v-if="form.meanings.length > 1"
                type="button"
                @click="removeMeaning(index)"
                class="rounded-lg p-2 text-destructive hover:bg-destructive/10"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <button
              type="button"
              @click="addMeaning"
              class="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Anlam Ekle
            </button>
          </div>
        </div>

        <!-- Detaylar (Collapse) -->
        <details class="group rounded-xl bg-card ring-1 ring-border/50">
          <summary class="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
            <span>Detaylar (Opsiyonel)</span>
            <svg class="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div class="space-y-6 border-t border-border p-6">
            <!-- Definition (Tanım) -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">
                Definition (Öğrenilen Dilde Tanım)
              </label>
              <textarea
                v-model="form.definition"
                rows="3"
                placeholder="Enter the definition in the learning language (e.g., 'A vehicle with four wheels')"
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p class="text-xs text-muted-foreground">
                Kelimenin öğrenilen dildeki tanımını girin (örn: "Car" için "A vehicle with four wheels")
              </p>
            </div>

            <!-- Tür ve Zorluk -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">Tür</label>
                <select v-model="form.type" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Seçiniz</option>
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
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">Zorluk</label>
                <select v-model="form.difficulty_level" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option :value="1">Kolay</option>
                  <option :value="2">Orta</option>
                  <option :value="3">Zor</option>
                  <option :value="4">Çok Zor</option>
                </select>
              </div>
            </div>

            <!-- Dil Paketleri -->
            <div v-if="languagePacks.length > 0" class="space-y-3">
              <label class="text-sm font-medium text-foreground">Dil Paketleri</label>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  v-for="pack in languagePacks"
                  :key="pack.id"
                  type="button"
                  @click="togglePack(pack.id)"
                  class="flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors"
                  :class="form.language_pack_ids.includes(pack.id) 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border hover:border-primary/50'"
                >
                  <span>{{ pack.name }}</span>
                  <span class="text-xs opacity-70">{{ pack.language.toUpperCase() }}</span>
                </button>
              </div>
            </div>

            <!-- Örnek Cümleler -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-foreground">Örnek Cümleler</label>
              <div v-for="(_, index) in form.example_sentences" :key="index" class="flex gap-2">
                <input
                  v-model="form.example_sentences[index]"
                  type="text"
                  placeholder="Örnek cümle..."
                  class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  v-model="form.example_translations[index]"
                  type="text"
                  placeholder="Çeviri..."
                  class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  @click="removeExampleSentence(index)"
                  class="rounded-lg p-2 text-destructive hover:bg-destructive/10"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                @click="addExampleSentence"
                class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Örnek Cümle Ekle
              </button>
            </div>

            <!-- Eş Anlamlılar -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-foreground">Eş Anlamlılar</label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(synonym, index) in form.synonyms"
                  :key="index"
                  class="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {{ synonym }}
                  <button type="button" @click="removeSynonym(index)" class="ml-1 text-muted-foreground hover:text-destructive">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="newSynonym"
                  type="text"
                  placeholder="Eş anlamlı kelime..."
                  class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  @keydown.enter.prevent="addSynonym"
                />
                <button
                  type="button"
                  @click="addSynonym"
                  class="rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </details>

        <!-- Submit -->
        <div class="flex items-center justify-end gap-3">
          <Link 
            href="/rendition/words" 
            class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            İptal
          </Link>
          <button
            type="submit"
            :disabled="processing || !form.word.trim() || duplicateCheck.exists || duplicateCheck.checking"
            class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
      </div>

      <!-- Bulk Import Tab -->
      <BulkImportTab
        v-if="activeTab === 'bulk'"
        :language-packs="languagePacks"
        @cancel="activeTab = 'single'"
      />
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useForm, usePage, Link, router } from '@inertiajs/vue3';
import axios from 'axios';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import BulkImportTab from './BulkImportTab.vue';

const props = defineProps({
  languagePacks: { type: Array, default: () => [] },
  incompleteWords: { type: Array, default: () => [] },
  incompleteWordsCount: { type: Number, default: 0 }, // Toplam yarım kalan sayısı
  error: String,
  screen: Object,
});

const errors = computed(() => usePage().props.errors);
const processing = ref(false);
const newSynonym = ref('');
const showIncompleteList = ref(false);
const activeTab = ref('single'); // Tab state

const form = useForm({
  word: '',
  definition: '',
  meanings: [{ meaning: '', is_primary: true }],
  type: '',
  language: 'en',
  difficulty_level: 2,
  learning_status: 0,
  flag: false,
  language_pack_ids: [],
  example_sentences: [],
  example_translations: [],
  synonyms: [],
});

// Duplicate kontrolü için state
const duplicateCheck = ref({
  checking: false,
  exists: false,
  existingWord: null,
  message: '',
});

// Debounce timer
let checkTimer = null;

// Kelime, dil veya tür değiştiğinde duplicate kontrolü yap
const checkForDuplicate = async () => {
  // Kelime veya dil boşsa kontrol etme
  if (!form.word || !form.language) {
    duplicateCheck.value = {
      checking: false,
      exists: false,
      existingWord: null,
      message: '',
    };
    return;
  }

  duplicateCheck.value.checking = true;

  try {
    const response = await axios.post(route('rendition.words.check-duplicate'), {
      word: form.word,
      language: form.language,
      type: form.type || null,
    });

    if (response.data.exists) {
      duplicateCheck.value = {
        checking: false,
        exists: true,
        existingWord: response.data.word,
        message: response.data.message,
      };
    } else {
      duplicateCheck.value = {
        checking: false,
        exists: false,
        existingWord: null,
        message: '',
      };
    }
  } catch (error) {
    console.error('Duplicate check error:', error);
    duplicateCheck.value.checking = false;
  }
};

// Debounced duplicate check
const debouncedCheck = () => {
  clearTimeout(checkTimer);
  checkTimer = setTimeout(() => {
    checkForDuplicate();
  }, 500); // 500ms bekle
};

// Watch for changes
watch([() => form.word, () => form.language, () => form.type], () => {
  debouncedCheck();
});

// Mevcut kelimeyi düzenle
const editExistingWord = () => {
  if (duplicateCheck.value.existingWord) {
    router.visit(duplicateCheck.value.existingWord.edit_url);
  }
};

const getWordTypeLabel = (type) => {
  const types = {
    noun: 'İsim',
    verb: 'Fiil',
    adjective: 'Sıfat',
    adverb: 'Zarf',
    pronoun: 'Zamir',
    preposition: 'Edat',
    conjunction: 'Bağlaç',
    interjection: 'Ünlem',
    phrase: 'Deyim',
  };
  return types[type] || type;
};

const togglePack = (packId) => {
  const index = form.language_pack_ids.indexOf(packId);
  if (index > -1) {
    form.language_pack_ids.splice(index, 1);
  } else {
    form.language_pack_ids.push(packId);
  }
};

const addMeaning = () => {
  form.meanings.push({ meaning: '', is_primary: false });
};

const addMeaningAndFocus = async (currentIndex) => {
  form.meanings.push({ meaning: '', is_primary: false });
  await nextTick();
  const inputs = document.querySelectorAll('input[placeholder*="anlam"]');
  if (inputs[currentIndex + 1]) {
    inputs[currentIndex + 1].focus();
  }
};

const removeMeaning = (index) => {
  form.meanings.splice(index, 1);
};

const setPrimaryMeaning = (index) => {
  form.meanings.forEach((m, i) => {
    m.is_primary = i === index;
  });
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

const submitForm = () => {
  if (!form.word.trim()) return;
  
  processing.value = true;

  // Boş örnek cümleleri temizle
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
