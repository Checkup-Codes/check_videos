<template>
  <div class="space-y-6">
    <!-- Info Card -->
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div class="flex items-start gap-3">
        <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="flex-1">
          <h3 class="font-medium text-foreground">Toplu Test Ekleme</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            JSON formatında test ve sorularını ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın.
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
          <h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Tek Doğru Cevap)</h4>
          <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  "title": "JavaScript Temelleri Testi",
  "slug": "javascript-temelleri-testi",
  "description": "JavaScript temel konularını test edin",
  "status": "published",
  "questions": [
    {
      "question_text": "JavaScript hangi tür bir dildir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "Derlenmiş dil", "is_correct": false },
        { "option_text": "Yorumlanmış dil", "is_correct": true },
        { "option_text": "Makine dili", "is_correct": false },
        { "option_text": "Assembly dili", "is_correct": false }
      ]
    },
    {
      "question_text": "let ve const arasındaki fark nedir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "let yeniden atanabilir, const atanamaz", "is_correct": true },
        { "option_text": "Fark yoktur", "is_correct": false },
        { "option_text": "const daha hızlıdır", "is_correct": false }
      ]
    }
  ]
}</code></pre>
        </div>

        <!-- Detaylı Format -->
        <div>
          <h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Karışık Soru Tipleri)</h4>
          <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  "title": "Web Geliştirme Quiz",
  "slug": "web-gelistirme-quiz",
  "description": "HTML, CSS ve JavaScript bilginizi test edin",
  "status": "published",
  "category_id": null,
  "questions": [
    {
      "question_text": "HTML'de başlık etiketi hangisidir?",
      "question_type": "single_choice",
      "points": 10,
      "order": 1,
      "explanation": "h1-h6 etiketleri başlık için kullanılır",
      "options": [
        { "option_text": "&lt;title&gt;", "is_correct": false },
        { "option_text": "&lt;h1&gt;", "is_correct": true },
        { "option_text": "&lt;header&gt;", "is_correct": false },
        { "option_text": "&lt;head&gt;", "is_correct": false }
      ]
    },
    {
      "question_text": "CSS'de renk tanımlamak için kullanılabilecek formatlar nelerdir?",
      "question_type": "multiple_choice",
      "points": 15,
      "order": 2,
      "explanation": "Birden fazla doğru cevap var",
      "options": [
        { "option_text": "HEX (#FF0000)", "is_correct": true },
        { "option_text": "RGB (rgb(255,0,0))", "is_correct": true },
        { "option_text": "HSL (hsl(0,100%,50%))", "is_correct": true },
        { "option_text": "BIN (bin(11111111))", "is_correct": false }
      ]
    },
    {
      "question_text": "JavaScript'te değişken tanımlamak için var, let ve const kullanılır",
      "question_type": "true_false",
      "points": 5,
      "order": 3,
      "correct_answer": true,
      "explanation": "var, let ve const kullanılır"
    }
  ]
}</code></pre>
        </div>

        <!-- Alan Açıklamaları -->
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4>
          <dl class="space-y-2 text-xs">
            <div class="border-b border-border pb-2">
              <dt class="font-semibold text-foreground">Test Alanları:</dt>
            </div>
            <div>
              <dt class="font-medium text-foreground">title <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">Test başlığı (zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">slug <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">URL dostu slug (zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">description</dt>
              <dd class="text-muted-foreground">Test açıklaması (opsiyonel)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">status</dt>
              <dd class="text-muted-foreground">Durum: draft, published, private (varsayılan: draft)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">category_id</dt>
              <dd class="text-muted-foreground">Kategori ID'si (opsiyonel)</dd>
            </div>
            
            <div class="border-b border-border pb-2 pt-3">
              <dt class="font-semibold text-foreground">Soru Alanları:</dt>
            </div>
            <div>
              <dt class="font-medium text-foreground">question_text <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">Soru metni (zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">question_type <span class="text-destructive">*</span></dt>
              <dd class="text-muted-foreground">Soru tipi: single_choice (tek doğru), multiple_choice (çoklu doğru), true_false (doğru/yanlış) - zorunlu</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">points</dt>
              <dd class="text-muted-foreground">Puan (varsayılan: 10)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">order</dt>
              <dd class="text-muted-foreground">Sıra numarası (opsiyonel)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">explanation</dt>
              <dd class="text-muted-foreground">Açıklama (opsiyonel)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">options</dt>
              <dd class="text-muted-foreground">Seçenekler dizisi (single_choice ve multiple_choice için zorunlu)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">correct_answer</dt>
              <dd class="text-muted-foreground">Doğru cevap (true_false için: true/false - zorunlu)</dd>
            </div>
          </dl>
        </div>

        <!-- Hızlı Şablon Butonları -->
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            @click="loadTemplate('simple')"
            class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"
          >
            Basit Şablon Yükle
          </button>
          <button
            type="button"
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
        rows="20"
        placeholder='{"title": "Test Başlığı", "slug": "test-basligi", "questions": [...]}'
        class="w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        :class="{ 'border-destructive': jsonError }"
      />
      <p v-if="jsonError" class="text-xs text-destructive">{{ jsonError }}</p>
      <p v-else-if="parsedTest" class="text-xs text-green-600 dark:text-green-400">
        ✓ Test geçerli: {{ parsedTest.questions?.length || 0 }} soru tespit edildi
      </p>
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
        type="button"
        @click="submitBulk"
        :disabled="processing || !jsonInput.trim() || jsonError || !parsedTest"
        class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {{ processing ? 'Ekleniyor...' : 'Test Oluştur' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

defineEmits(['cancel']);

const jsonInput = ref('');
const jsonError = ref('');
const processing = ref(false);
const showFormatInfo = ref(false);

// Parse JSON and validate
const parsedTest = computed(() => {
  if (!jsonInput.value.trim()) {
    jsonError.value = '';
    return null;
  }

  try {
    const parsed = JSON.parse(jsonInput.value);
    
    // Validate test structure
    if (!parsed.title) {
      jsonError.value = "'title' alanı zorunludur";
      return null;
    }
    
    if (!parsed.slug) {
      jsonError.value = "'slug' alanı zorunludur";
      return null;
    }
    
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      jsonError.value = "'questions' alanı zorunludur ve bir dizi olmalıdır";
      return null;
    }
    
    if (parsed.questions.length === 0) {
      jsonError.value = "En az 1 soru eklenmelidir";
      return null;
    }

    // Validate each question
    for (let i = 0; i < parsed.questions.length; i++) {
      const q = parsed.questions[i];
      
      if (!q.question_text) {
        jsonError.value = `${i + 1}. soruda 'question_text' alanı zorunludur`;
        return null;
      }
      
      if (!q.question_type) {
        jsonError.value = `${i + 1}. soruda 'question_type' alanı zorunludur`;
        return null;
      }
      
      if (!['single_choice', 'multiple_choice', 'true_false'].includes(q.question_type)) {
        jsonError.value = `${i + 1}. soruda geçersiz 'question_type': ${q.question_type}`;
        return null;
      }
      
      // Validate single_choice and multiple_choice questions
      if (q.question_type === 'single_choice' || q.question_type === 'multiple_choice') {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          jsonError.value = `${i + 1}. soru (çoktan seçmeli) en az 2 seçenek içermelidir`;
          return null;
        }
        
        const hasCorrect = q.options.some(opt => opt.is_correct);
        if (!hasCorrect) {
          jsonError.value = `${i + 1}. soruda en az 1 doğru seçenek olmalıdır`;
          return null;
        }
      }
      
      // Validate true/false questions
      if (q.question_type === 'true_false') {
        if (q.correct_answer === undefined || q.correct_answer === null) {
          jsonError.value = `${i + 1}. soru (doğru/yanlış) 'correct_answer' alanı içermelidir`;
          return null;
        }
      }
    }

    jsonError.value = '';
    return parsed;
  } catch (e) {
    jsonError.value = 'Geçersiz JSON formatı: ' + e.message;
    return null;
  }
});

const loadTemplate = (type) => {
  if (type === 'simple') {
    jsonInput.value = `{
  "title": "JavaScript Temelleri Testi",
  "slug": "javascript-temelleri-testi",
  "description": "JavaScript temel konularını test edin",
  "status": "published",
  "questions": [
    {
      "question_text": "JavaScript hangi tür bir dildir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "Derlenmiş dil", "is_correct": false },
        { "option_text": "Yorumlanmış dil", "is_correct": true },
        { "option_text": "Makine dili", "is_correct": false },
        { "option_text": "Assembly dili", "is_correct": false }
      ]
    },
    {
      "question_text": "let ve const arasındaki fark nedir?",
      "question_type": "single_choice",
      "points": 10,
      "options": [
        { "option_text": "let yeniden atanabilir, const atanamaz", "is_correct": true },
        { "option_text": "Fark yoktur", "is_correct": false },
        { "option_text": "const daha hızlıdır", "is_correct": false }
      ]
    }
  ]
}`;
  } else {
    jsonInput.value = `{
  "title": "Web Geliştirme Quiz",
  "slug": "web-gelistirme-quiz",
  "description": "HTML, CSS ve JavaScript bilginizi test edin",
  "status": "published",
  "category_id": null,
  "questions": [
    {
      "question_text": "HTML'de başlık etiketi hangisidir?",
      "question_type": "single_choice",
      "points": 10,
      "order": 1,
      "explanation": "h1-h6 etiketleri başlık için kullanılır",
      "options": [
        { "option_text": "<title>", "is_correct": false },
        { "option_text": "<h1>", "is_correct": true },
        { "option_text": "<header>", "is_correct": false },
        { "option_text": "<head>", "is_correct": false }
      ]
    },
    {
      "question_text": "CSS'de renk tanımlamak için kullanılabilecek formatlar nelerdir?",
      "question_type": "multiple_choice",
      "points": 15,
      "order": 2,
      "explanation": "Birden fazla doğru cevap var",
      "options": [
        { "option_text": "HEX (#FF0000)", "is_correct": true },
        { "option_text": "RGB (rgb(255,0,0))", "is_correct": true },
        { "option_text": "HSL (hsl(0,100%,50%))", "is_correct": true },
        { "option_text": "BIN (bin(11111111))", "is_correct": false }
      ]
    },
    {
      "question_text": "JavaScript'te değişken tanımlamak için var, let ve const kullanılır",
      "question_type": "true_false",
      "points": 5,
      "order": 3,
      "correct_answer": true,
      "explanation": "var, let ve const kullanılır"
    }
  ]
}`;
  }
};

const submitBulk = () => {
  if (!parsedTest.value) return;

  processing.value = true;
  
  console.log('Submitting test:', parsedTest.value);

  router.post(
    route('tests.bulk-store'),
    parsedTest.value,
    {
      onSuccess: (page) => {
        processing.value = false;
        console.log('Success:', page);
      },
      onError: (errors) => {
        processing.value = false;
        console.error('Error:', errors);
        
        // Show error message
        if (errors && typeof errors === 'object') {
          const firstError = Object.values(errors)[0];
          jsonError.value = Array.isArray(firstError) ? firstError[0] : firstError;
        } else {
          jsonError.value = 'Test oluşturulurken bir hata oluştu';
        }
      },
    }
  );
};
</script>
