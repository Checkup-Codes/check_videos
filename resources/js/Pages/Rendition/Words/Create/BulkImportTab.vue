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

    <!-- Bulk import result (redirect back) -->
    <div
      v-if="bulkSummary"
      class="rounded-xl border p-4"
      :class="bulkSummary.isError
        ? 'border-destructive/30 bg-destructive/5'
        : 'border-primary/30 bg-primary/5'"
    >
      <h3 class="font-medium" :class="bulkSummary.isError ? 'text-destructive' : 'text-foreground'">
        {{ bulkSummary.title }}
      </h3>
      <p class="mt-1 text-sm text-muted-foreground">{{ bulkSummary.message }}</p>
      <ul v-if="bulkSummary.details.length" class="mt-3 max-h-40 space-y-1 overflow-y-auto text-sm">
        <li v-for="(detail, index) in bulkSummary.details" :key="index" class="break-words text-destructive">
          • {{ detail }}
        </li>
      </ul>
    </div>

    <!-- Server / validation errors -->
    <div
      v-if="serverErrors.length > 0"
      class="rounded-xl border border-destructive/30 bg-destructive/5 p-4"
    >
      <div class="flex items-start gap-3">
        <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div class="min-w-0 flex-1">
          <h3 class="font-medium text-destructive">Toplu ekleme başarısız</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ serverErrors.length }} doğrulama hatası bulundu. Aşağıdaki satırları düzeltip tekrar deneyin.
          </p>
          <ul class="mt-3 max-h-48 space-y-1 overflow-y-auto text-sm text-destructive">
            <li v-for="(error, index) in serverErrors" :key="`${error}-${index}`" class="break-words">
              • {{ error }}
            </li>
          </ul>
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

    <!-- Dil Paketleri -->
    <div v-if="languagePacks.length > 0" class="space-y-3">
      <div>
        <label class="text-sm font-medium text-foreground">Dil Paketine Ekle</label>
        <p class="mt-1 text-xs text-muted-foreground">
          Zorunlu değil ama önerilir. Sözlükte zaten kayıtlı kelimeler yalnızca seçtiğiniz pakete eklenir.
        </p>
      </div>
      <div
        v-if="selectedPacks.length === 0"
        class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200"
      >
        Henüz paket seçilmedi — mevcut kelimeler pakette görünmeyecek.
      </div>
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
import { router, usePage } from '@inertiajs/vue3';

const props = defineProps({
  languagePacks: { type: Array, default: () => [] },
});

defineEmits(['cancel']);

const page = usePage();
const jsonInput = ref('');
const jsonError = ref('');
const serverErrors = ref([]);
const processing = ref(false);
const showFormatInfo = ref(false);
const selectedPacks = ref([]);

const flattenValidationErrors = (errors) => {
  if (!errors || typeof errors !== 'object') {
    return [];
  }

  const lines = [];

  Object.entries(errors).forEach(([key, value]) => {
    const messages = Array.isArray(value) ? value : [value];

    messages.forEach((message) => {
      if (!message) return;

      const wordMatch = key.match(/^words\.(\d+)\.(.+)$/);
      if (wordMatch) {
        const wordIndex = Number(wordMatch[1]) + 1;
        const field = wordMatch[2];
        lines.push(`${wordIndex}. kelime (${field}): ${message}`);
        return;
      }

      if (key === 'words') {
        lines.push(String(message));
        return;
      }

      lines.push(`${key}: ${message}`);
    });
  });

  return lines;
};

const syncServerErrorsFromPage = () => {
  const pageErrors = flattenValidationErrors(page.props.errors);
  const flashError = page.props.flash?.error;
  const bulkResults = page.props.flash?.bulkResults;

  if (pageErrors.length > 0) {
    serverErrors.value = pageErrors;
    return;
  }

  if (bulkResults?.errors?.length) {
    serverErrors.value = bulkResults.errors.map(
      (item) => `${item.index + 1}. kelime (${item.word}): ${item.error}`
    );
    return;
  }

  if (flashError && !(bulkResults?.duplicates?.length || bulkResults?.linked?.length)) {
    serverErrors.value = [flashError];
    return;
  }

  serverErrors.value = [];
};

const bulkSummary = computed(() => {
  const bulkResults = page.props.flash?.bulkResults;
  const flashError = page.props.flash?.error;
  const flashSuccess = page.props.flash?.success;

  if (flashError && bulkResults?.duplicates?.length && !bulkResults?.linked?.length) {
    return {
      isError: true,
      title: 'Kelime pakete eklenemedi',
      message: flashError,
      details: [
        'Bu kelimeler sözlükte zaten kayıtlı.',
        'Pakete eklemek için yukarıdan en az bir dil paketi seçip tekrar gönderin.',
      ],
    };
  }

  if (flashError && bulkResults) {
    return {
      isError: true,
      title: 'Toplu ekleme tamamlanamadı',
      message: flashError,
      details: (bulkResults.errors || []).map(
        (item) => `${item.index + 1}. kelime (${item.word}): ${item.error}`
      ),
    };
  }

  if (flashSuccess && bulkResults) {
    const duplicateWords = (bulkResults.duplicates || [])
      .slice(0, 5)
      .map((item) => `${item.index + 1}. ${item.word}`);

    return {
      isError: false,
      title: 'Toplu ekleme özeti',
      message: flashSuccess,
      details: duplicateWords.length
        ? [`Zaten kayıtlı örnekler: ${duplicateWords.join(', ')}${bulkResults.duplicates.length > 5 ? '…' : ''}`]
        : [],
    };
  }

  return null;
});

const normalizeWordsForSubmit = (words) =>
  words.map((word) => {
    const normalized = { ...word };

    if (!normalized.meanings?.length && normalized.meaning) {
      normalized.meanings = [{ meaning: normalized.meaning, is_primary: true }];
      delete normalized.meaning;
    }

    if (Array.isArray(normalized.meanings)) {
      normalized.meanings = normalized.meanings
        .map((meaning, index) => {
          if (typeof meaning === 'string') {
            return { meaning, is_primary: index === 0 };
          }
          return meaning;
        })
        .filter((meaning) => meaning?.meaning);
    }

    return normalized;
  });

watch(
  () => [page.props.errors, page.props.flash?.error, page.props.flash?.bulkResults],
  () => syncServerErrorsFromPage(),
  { deep: true, immediate: true }
);

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

      const hasMeaning =
        (Array.isArray(word.meanings) && word.meanings.some((m) => (typeof m === 'string' ? m : m?.meaning)?.trim())) ||
        (typeof word.meaning === 'string' && word.meaning.trim());

      if (!hasMeaning) {
        jsonError.value = `${i + 1}. kelimede anlam zorunludur. "meanings" veya "meaning" alanı ekleyin`;
        return [];
      }

      const language = String(word.language).trim().toLowerCase();
      if (language.length !== 2) {
        jsonError.value = `${i + 1}. kelimede dil kodu tam 2 harf olmalıdır (örn: en, tr). Gönderilen: "${word.language}"`;
        return [];
      }

      if (word.difficulty_level !== undefined && word.difficulty_level !== null && word.difficulty_level !== '') {
        const level = Number(word.difficulty_level);
        if (Number.isNaN(level) || level < 1 || level > 4) {
          jsonError.value = `${i + 1}. kelimede difficulty_level 1 ile 4 arasında olmalıdır`;
          return [];
        }
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

  if (selectedPacks.value.length === 0) {
    jsonError.value = 'Lütfen en az bir dil paketi seçin. Mevcut kelimeler pakete ancak bu şekilde eklenir.';
    return;
  }

  processing.value = true;
  serverErrors.value = [];
  jsonError.value = '';

  router.post(
    route('rendition.words.bulk-store'),
    {
      words: normalizeWordsForSubmit(parsedWords.value),
      language_pack_ids: selectedPacks.value,
    },
    {
      preserveScroll: true,
      onSuccess: () => {
        processing.value = false;
      },
      onError: (errors) => {
        processing.value = false;
        serverErrors.value = flattenValidationErrors(errors);

        if (serverErrors.value.length === 0) {
          serverErrors.value = ['Toplu kelime eklenirken bir hata oluştu.'];
        }
      },
      onFinish: () => {
        processing.value = false;
      },
    }
  );
};
</script>
