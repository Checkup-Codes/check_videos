<template>
  <div class="space-y-6">
    <!-- Info Card -->
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div class="flex items-start gap-3">
        <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="flex-1">
          <h3 class="font-medium text-foreground">Toplu Kelime Ekleme</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            JSON formatında birden fazla kelime ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın.
          </p>
          <button
            @click="showFormatInfo = !showFormatInfo"
            class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ showFormatInfo ? 'Formatı Gizle' : 'Format Bilgisi' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Format Info Modal/Collapsible -->
    <div v-if="showFormatInfo" class="rounded-xl border border-border bg-card p-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">JSON Format Örneği</h3>
      
      <div class="space-y-4">
        <!-- Basit Format -->
        <div>
          <h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Sadece Kelime + Anlam)</h4>
          <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    "word": "hello",
    "language": "en",
    "meanings": [
      { "meaning": "merhaba", "is_primary": true }
    ]
  },
  {
    "word": "goodbye",
    "language": "en",
    "meanings": [
      { "meaning": "hoşça kal", "is_primary": true }
    ]
  }
]</code></pre>
        </div>

        <!-- Detaylı Format -->
        <div>
          <h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Tüm Alanlar)</h4>
          <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    "word": "run",
    "definition": "to move at a speed faster than a walk",
    "language": "en",
    "type": "verb",
    "difficulty_level": 2,
    "meanings": [
      { "meaning": "koşmak", "is_primary": true },
      { "meaning": "çalıştırmak", "is_primary": false }
    ],
    "example_sentences": ["I run every morning", "The program runs smoothly"],
    "example_translations": ["Her sabah koşarım", "Program sorunsuz çalışıyor"],
    "synonyms": ["jog", "sprint"]
  }
]</code></pre>
        </div>

        <!-- Alan Açıklamaları -->
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4>
          <dl class="space-y-2 text-xs">
            <div>
              <dt class="font-medium text-foreground">word <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">Kelime (zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">definition</dt>
              <dd class="text-muted-foreground">Kelimenin öğrenilen dildeki tanımı (opsiyonel)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">language <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">Dil kodu: en, tr, de, fr, es (zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">type</dt>
              <dd class="text-muted-foreground">Tür: noun, verb, adjective, adverb, vb. (opsiyonel)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">difficulty_level</dt>
              <dd class="text-muted-foreground">Zorluk: 1-4 arası (varsayılan: 2)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">meanings</dt>
              <dd class="text-muted-foreground">Anlamlar dizisi (opsiyonel ama önerilen)</dd>
            </div>
          </dl>
        </div>

        <!-- Hızlı Şablon Butonları -->
        <div class="flex flex-wrap gap-2">
          <button
            @click="loadTemplate('simple')"
            class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"
          >
            Basit Şablon Yükle
          </button>
          <button
            @click="loadTemplate('detailed')"
            class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"
          >
            Detaylı Şablon Yükle
          </button>
        </div>
      </div>
    </div>

    <!-- JSON Input -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-foreground">
        JSON Verisi <span class="text-destructive">*</span>
      </label>
      <textarea
        v-model="jsonInput"
        rows="15"
        placeholder='[{"word": "hello", "language": "en", "meanings": [{"meaning": "merhaba"}]}]'
        class="w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        :class="{ 'border-destructive': jsonError }"
      />
      <p v-if="jsonError" class="text-xs text-destructive">{{ jsonError }}</p>
      <p v-else-if="parsedWords.length > 0" class="text-xs text-green-600 dark:text-green-400">
        ✓ {{ parsedWords.length }} kelime tespit edildi
      </p>
    </div>

    <!-- Dil Paketleri (Opsiyonel) -->
    <div v-if="languagePacks.length > 0" class="space-y-3">
      <label class="text-sm font-medium text-foreground">Dil Paketlerine Ekle (Opsiyonel)</label>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="pack in languagePacks"
          :key="pack.id"
          type="button"
          @click="togglePack(pack.id)"
          class="flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors"
          :class="selectedPacks.includes(pack.id) 
            ? 'border-primary bg-primary/10 text-primary' 
            : 'border-border hover:border-primary/50'"
        >
          <span>{{ pack.name }}</span>
          <span class="text-xs opacity-70">{{ pack.language.toUpperCase() }}</span>
        </button>
      </div>
    </div>

    <!-- Submit -->
    <div class="flex items-center justify-end gap-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
      >
        İptal
      </button>
      <button
        @click="submitBulk"
        :disabled="processing || !jsonInput.trim() || jsonError || parsedWords.length === 0"
        class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {{ processing ? 'Ekleniyor...' : `${parsedWords.length} Kelime Ekle` }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  languagePacks: { type: Array, default: () => [] },
});

defineEmits(['cancel']);

const jsonInput = ref('');
const jsonError = ref('');
const processing = ref(false);
const showFormatInfo = ref(false);
const selectedPacks = ref([]);

// Parse JSON and validate
const parsedWords = computed(() => {
  if (!jsonInput.value.trim()) {
    jsonError.value = '';
    return [];
  }

  try {
    const parsed = JSON.parse(jsonInput.value);
    
    if (!Array.isArray(parsed)) {
      jsonError.value = 'JSON bir dizi (array) olmalıdır';
      return [];
    }

    // Validate each word
    for (let i = 0; i < parsed.length; i++) {
      const word = parsed[i];
      if (!word.word || !word.language) {
        jsonError.value = `${i + 1}. kelimede 'word' ve 'language' alanları zorunludur`;
        return [];
      }
    }

    jsonError.value = '';
    return parsed;
  } catch (e) {
    jsonError.value = 'Geçersiz JSON formatı: ' + e.message;
    return [];
  }
});

const togglePack = (packId) => {
  const index = selectedPacks.value.indexOf(packId);
  if (index > -1) {
    selectedPacks.value.splice(index, 1);
  } else {
    selectedPacks.value.push(packId);
  }
};

const loadTemplate = (type) => {
  if (type === 'simple') {
    jsonInput.value = `[
  {
    "word": "hello",
    "language": "en",
    "meanings": [
      { "meaning": "merhaba", "is_primary": true }
    ]
  },
  {
    "word": "goodbye",
    "language": "en",
    "meanings": [
      { "meaning": "hoşça kal", "is_primary": true }
    ]
  },
  {
    "word": "thank you",
    "language": "en",
    "meanings": [
      { "meaning": "teşekkür ederim", "is_primary": true }
    ]
  }
]`;
  } else {
    jsonInput.value = `[
  {
    "word": "run",
    "definition": "to move at a speed faster than a walk",
    "language": "en",
    "type": "verb",
    "difficulty_level": 2,
    "meanings": [
      { "meaning": "koşmak", "is_primary": true },
      { "meaning": "çalıştırmak", "is_primary": false }
    ],
    "example_sentences": ["I run every morning", "The program runs smoothly"],
    "example_translations": ["Her sabah koşarım", "Program sorunsuz çalışıyor"],
    "synonyms": ["jog", "sprint"]
  }
]`;
  }
};

const submitBulk = () => {
  if (parsedWords.value.length === 0) return;

  processing.value = true;

  router.post(
    route('rendition.words.bulk-store'),
    {
      words: parsedWords.value,
      language_pack_ids: selectedPacks.value,
    },
    {
      onSuccess: () => {
        processing.value = false;
      },
      onError: () => {
        processing.value = false;
      },
    }
  );
};
</script>
