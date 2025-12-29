<template>
  <CheckScreen>
    <!-- Error Alert -->
    <div v-if="props.error" class="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <div class="flex items-center gap-3">
        <svg class="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-sm text-destructive">{{ props.error }}</span>
      </div>
    </div>

    <div v-if="!props.word && !props.error" class="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
      <p class="text-sm text-yellow-800 dark:text-yellow-200">Kelime bulunamadı.</p>
      <Link href="/rendition/words" class="mt-2 inline-block text-sm underline">Kelime listesine dön</Link>
    </div>

    <div v-if="props.word" class="space-y-6 py-6">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-foreground">{{ props.word.word }}</h1>
          <p class="mt-1 text-sm text-muted-foreground">Kelime bilgilerini düzenleyin</p>
        </div>
        <!-- Yarım Kalan Badge -->
        <span 
          v-if="!props.word.is_complete" 
          class="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300"
        >
          Yarım Kalan
        </span>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Temel Bilgiler -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <h2 class="mb-4 text-lg font-semibold text-foreground">Temel Bilgiler</h2>
          
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Kelime -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Kelime</label>
              <input
                v-model="form.word"
                type="text"
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-destructive': errors.word }"
                required
              />
              <p v-if="errors.word" class="text-xs text-destructive">{{ errors.word }}</p>
            </div>

            <!-- Dil -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Dil</label>
              <select v-model="form.language" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="en">İngilizce (EN)</option>
                <option value="tr">Türkçe (TR)</option>
                <option value="de">Almanca (DE)</option>
                <option value="fr">Fransızca (FR)</option>
                <option value="es">İspanyolca (ES)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Anlam -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <div class="mb-4">
            <h2 class="text-lg font-semibold text-foreground">Anlam</h2>
            <p v-if="!props.word.is_complete" class="text-xs text-yellow-600 dark:text-yellow-400">
              En az bir anlam girerek kelimeyi tamamlayın
            </p>
          </div>
          
          <div class="space-y-3">
            <div v-for="(meaning, index) in form.meanings" :key="index" class="flex items-center gap-3">
              <input
                v-model="meaning.meaning"
                type="text"
                :placeholder="`${index + 1}. anlam`"
                class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-yellow-500': !props.word.is_complete && index === 0 && !meaning.meaning }"
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

        <!-- Detaylar -->
        <details class="group rounded-xl bg-card ring-1 ring-border/50" open>
          <summary class="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
            <span>Detaylar</span>
            <svg class="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div class="space-y-6 border-t border-border p-6">
            <!-- Tür ve Zorluk -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">Öğrenme Durumu</label>
                <select v-model="form.learning_status" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option :value="0">Öğrenilmedi</option>
                  <option :value="1">Öğreniliyor</option>
                  <option :value="2">Öğrenildi</option>
                </select>
              </div>
            </div>

            <!-- İstatistikler -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div class="rounded-lg bg-muted/50 p-3 text-center">
                <div class="text-2xl font-bold text-foreground">{{ props.word.review_count || 0 }}</div>
                <div class="text-xs text-muted-foreground">İnceleme</div>
              </div>
              <div class="rounded-lg bg-muted/50 p-3 text-center">
                <div class="text-2xl font-bold text-destructive">{{ props.word.incorrect_count || 0 }}</div>
                <div class="text-xs text-muted-foreground">Yanlış</div>
              </div>
              <div class="rounded-lg bg-muted/50 p-3 text-center">
                <div class="text-lg font-bold text-foreground">{{ props.word.language?.toUpperCase() }}</div>
                <div class="text-xs text-muted-foreground">Dil</div>
              </div>
              <div class="rounded-lg bg-muted/50 p-3 text-center">
                <label class="flex cursor-pointer flex-col items-center gap-1">
                  <input type="checkbox" v-model="form.flag" class="h-5 w-5 rounded" />
                  <span class="text-xs text-muted-foreground">Öne Çıkar</span>
                </label>
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
            :disabled="processing || !form.word.trim()"
            class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {{ processing ? 'Kaydediliyor...' : 'Güncelle' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  word: Object,
  languagePacks: { type: Array, default: () => [] },
  screen: Object,
  error: String,
});

const errors = computed(() => usePage().props.errors);
const processing = ref(false);
const newSynonym = ref('');

// Mevcut verileri al
const currentLanguagePackIds = props.word?.language_packs?.map((pack) => pack.id) || [];
const exampleSentences = props.word?.example_sentences?.map((s) => s.sentence) || [];
const exampleTranslations = props.word?.example_sentences?.map((s) => s.translation) || [];
const synonyms = props.word?.synonyms?.map((s) => s.synonym) || [];

const form = useForm({
  word: props.word?.word || '',
  meanings: props.word?.meanings?.length > 0
    ? props.word.meanings.map((m) => ({ meaning: m.meaning, is_primary: m.is_primary }))
    : [{ meaning: '', is_primary: true }],
  type: props.word?.type || '',
  language: props.word?.language || 'en',
  learning_status: props.word?.learning_status || 0,
  flag: props.word?.flag || false,
  difficulty_level: props.word?.difficulty_level || 2,
  language_pack_ids: currentLanguagePackIds,
  example_sentences: exampleSentences,
  example_translations: exampleTranslations,
  synonyms: synonyms,
});

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

  form.put(route('rendition.words.update', props.word.id), {
    onSuccess: () => {
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    },
  });
};
</script>
