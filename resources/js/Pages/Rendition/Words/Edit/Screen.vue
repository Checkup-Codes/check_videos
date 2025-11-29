<template>
  <CheckScreen>
    <GoBackButton url="/rendition/words" />
    <!-- Error Alert -->
    <div v-if="props.error" class="mx-6 mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-destructive">{{ props.error }}</h3>
        </div>
      </div>
    </div>

    <div v-if="!props.word && !props.error" class="mx-6 mt-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Kelime bulunamadı veya yüklenemedi.</h3>
          <div class="mt-2">
            <a href="/rendition/words" class="text-sm font-medium text-yellow-800 dark:text-yellow-200 underline">Kelime listesine dön</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="props.word" class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-foreground">Kelime Düzenle</h1>
          <p class="text-muted-foreground">{{ props.word.word }} kelimesinin bilgilerini güncelleyin</p>
        </div>

          <!-- Temel Bilgiler -->
          <div class="space-y-4">
            <!-- Kelime -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="w-full space-y-2">
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Kelime
                </label>
                <input
                  type="text"
                  v-model="form.word"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Kelimeyi girin..."
                  required
                />
                <p v-if="errors.word" class="text-xs text-destructive">{{ errors.word }}</p>
              </div>

              <!-- Tür -->
              <div class="w-full space-y-2">
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Tür
                </label>
                <select v-model="form.type" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                <p v-if="errors.type" class="text-xs text-destructive">{{ errors.type }}</p>
              </div>
            </div>

            <!-- Anlamlar -->
            <div class="w-full space-y-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Anlamlar
              </label>

              <div class="space-y-3">
                <div v-for="(meaning, index) in form.meanings" :key="index" class="flex items-center gap-3">
                  <input
                    type="text"
                    v-model="meaning.meaning"
                    class="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :placeholder="`${index + 1}. anlam`"
                    :data-index="index"
                    @keydown.enter.prevent="addMeaningAndFocus(index)"
                    required
                  />
                  <div class="flex items-center gap-2">
                    <label class="flex cursor-pointer items-center gap-2">
                      <span class="text-xs text-foreground">Birincil</span>
                      <input
                        type="radio"
                        name="primaryMeaning"
                        :checked="meaning.is_primary"
                        @change="setPrimaryMeaning(index)"
                        class="h-4 w-4 border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </label>
                  </div>
                  <button
                    v-if="form.meanings.length > 1"
                    type="button"
                    @click="removeMeaning(index)"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <p v-if="errors.meanings" class="text-xs text-destructive">{{ errors.meanings }}</p>

              <!-- Anlam Ekleme Butonu -->
              <div class="mt-3">
                <button
                  type="button"
                  @click="addMeaning"
                  class="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-border"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 font-semibold text-foreground">Dil Paketleri</span>
              </div>
            </div>

            <div v-if="props.languagePacks.length === 0" class="rounded-lg border border-border bg-muted p-4">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="text-foreground">Henüz dil paketi bulunmamaktadır.</span>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="pack in props.languagePacks"
                :key="pack.id"
                class="cursor-pointer rounded-lg border border-border bg-muted p-4 transition-colors hover:bg-muted/80"
                :class="{ 'ring-2 ring-primary': form.language_pack_ids.includes(pack.id) }"
                @click="togglePack(pack.id)"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-semibold text-foreground">{{ pack.name }}</h3>
                    <p class="text-muted-foreground text-sm">{{ pack.description }}</p>
                  </div>
                  <div
                    class="rounded border border-border bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"
                  >
                    {{ pack.language.toUpperCase() }}
                  </div>
                </div>
                <div class="text-muted-foreground/60 mt-2 text-xs">{{ pack.word_count || 0 }} kelime</div>
              </div>
            </div>

            <p v-if="errors.language_pack_ids" class="text-xs text-destructive">{{ errors.language_pack_ids }}</p>
          </div>

          <!-- Daha Fazla Seçenek -->
          <details class="group rounded-lg border border-border bg-muted">
            <summary class="flex cursor-pointer items-center justify-between p-4 font-semibold text-foreground">
              <span>Daha Fazla Seçenek</span>
              <svg class="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div class="p-4 pt-0">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- Dil -->
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Dil
                  </label>
                  <select v-model="form.language" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="en">İngilizce (EN)</option>
                    <option value="tr">Türkçe (TR)</option>
                    <option value="de">Almanca (DE)</option>
                    <option value="fr">Fransızca (FR)</option>
                    <option value="es">İspanyolca (ES)</option>
                    <option value="it">İtalyanca (IT)</option>
                    <option value="ru">Rusça (RU)</option>
                    <option value="ar">Arapça (AR)</option>
                  </select>
                  <p v-if="errors.language" class="text-xs text-destructive">{{ errors.language }}</p>
                </div>

                <!-- Zorluk Seviyesi -->
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Zorluk Seviyesi
                  </label>
                  <select v-model="form.difficulty_level" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option :value="1">Kolay</option>
                    <option :value="2">Orta</option>
                    <option :value="3">Zor</option>
                    <option :value="4">Çok Zor</option>
                  </select>
                  <p v-if="errors.difficulty_level" class="text-xs text-destructive">{{ errors.difficulty_level }}</p>
                </div>

                <!-- Öğrenme Durumu -->
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Öğrenme Durumu
                  </label>
                  <select v-model="form.learning_status" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option :value="0">Öğrenilmedi</option>
                    <option :value="1">Öğreniliyor</option>
                    <option :value="2">Öğrenildi</option>
                  </select>
                </div>

                <!-- Öne Çıkar -->
                <div class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    v-model="form.flag"
                    id="flag"
                    class="h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <label for="flag" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    Öne Çıkar
                  </label>
                </div>
              </div>

              <!-- İstatistikler -->
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t border-border"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-background px-2 font-semibold text-foreground">İstatistikler</span>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="rounded-lg border border-border bg-muted p-4">
                  <div class="text-sm font-medium text-muted-foreground">Yanlış Sayısı</div>
                  <div class="text-2xl font-bold text-foreground">{{ props.word.incorrect_count }}</div>
                </div>
                <div class="rounded-lg border border-border bg-muted p-4">
                  <div class="text-sm font-medium text-muted-foreground">Toplam İnceleme</div>
                  <div class="text-2xl font-bold text-foreground">{{ props.word.review_count }}</div>
                </div>
              </div>

              <!-- Örnek Cümleler -->
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t border-border"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-background px-2 font-semibold text-foreground">Örnek Cümleler</span>
                </div>
              </div>
              <div class="space-y-4">
                <div
                  v-for="(sentence, index) in form.example_sentences"
                  :key="index"
                  class="grid grid-cols-1 gap-3 md:grid-cols-2"
                >
                  <div class="w-full space-y-2">
                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Cümle {{ index + 1 }}
                    </label>
                    <input
                      v-model="form.example_sentences[index]"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Örnek cümle..."
                    />
                  </div>
                  <div class="flex items-end gap-2">
                    <div class="w-full space-y-2">
                      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Çeviri
                      </label>
                      <input
                        v-model="form.example_translations[index]"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Cümle çevirisi..."
                      />
                    </div>
                    <button
                      type="button"
                      @click="removeExampleSentence(index)"
                      class="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
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
                  class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t border-border"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-background px-2 font-semibold text-foreground">Eş Anlamlılar</span>
                </div>
              </div>
              <div class="space-y-4">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(synonym, index) in form.synonyms"
                    :key="index"
                    class="flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-sm text-foreground"
                  >
                    {{ synonym }}
                    <button
                      type="button"
                      @click="removeSynonym(index)"
                      class="rounded-md border border-border bg-background p-1 text-foreground transition-colors hover:bg-muted"
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
                    class="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Yeni eş anlamlı kelime"
                    @keyup.enter.prevent="addSynonym"
                    @keydown.enter.prevent="addSynonym"
                  />
                  <button
                    type="button"
                    @click="addSynonym"
                    class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
          </details>

          <!-- Form Buttons -->
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-border"></span>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <Link
              :href="route('rendition.words.index')"
              class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              İptal
            </Link>
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
              :disabled="processing"
            >
              <svg
                v-if="processing"
                class="mr-2 h-3 w-3 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!processing">Değişiklikleri Kaydet</span>
              <span v-else>Kaydediliyor...</span>
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
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const props = defineProps({
  word: Object,
  languagePacks: Array,
  screen: Object,
  error: String,
});

const errors = computed(() => usePage().props.errors);
const processing = ref(false);
const newSynonym = ref('');

// Mevcut dil paketlerinin ID'lerini al
const currentLanguagePackIds = props.word?.language_packs?.map((pack) => pack.id) || [];

// Mevcut örnek cümleleri al
const exampleSentences = props.word?.example_sentences?.map((sentence) => sentence.sentence) || [];
const exampleTranslations = props.word?.example_sentences?.map((sentence) => sentence.translation) || [];

// Mevcut eş anlamlıları al
const synonyms = props.word?.synonyms?.map((synonym) => synonym.synonym) || [];

const form = useForm({
  word: props.word?.word || '',
  meanings:
    props.word?.meanings?.length > 0
      ? props.word.meanings.map((meaning) => ({
          meaning: meaning.meaning,
          is_primary: meaning.is_primary,
        }))
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
