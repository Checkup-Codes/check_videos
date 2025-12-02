<template>
  <div class="space-y-6 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-foreground">Yeni Test Oluştur</h1>
      <p class="mt-2 text-sm text-muted-foreground">Test bilgilerini ve sorularını ekleyin</p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Test Basic Info -->
      <div class="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 class="text-xl font-semibold text-foreground">Test Bilgileri</h2>
        
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="md:col-span-2" ref="titleRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Test Başlığı *</label>
            <input
              type="text"
              v-model="form.title"
              @input="autoGenerateSlug"
              placeholder="Test başlığını girin"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.title || form.errors.title }"
            />
            <p v-if="errors.title || form.errors.title" class="mt-1 text-xs text-destructive">
              {{ errors.title || form.errors.title }}
            </p>
          </div>

          <div ref="slugRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Slug *</label>
            <input
              type="text"
              v-model="form.slug"
              placeholder="test-slug"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
            />
            <p v-if="errors.slug || form.errors.slug" class="mt-1 text-xs text-destructive">
              {{ errors.slug || form.errors.slug }}
            </p>
          </div>

          <div ref="statusRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Durum *</label>
            <select
              v-model="form.status"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.status || form.errors.status }"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayınlandı</option>
              <option value="private">Gizli</option>
            </select>
            <p v-if="errors.status || form.errors.status" class="mt-1 text-xs text-destructive">
              {{ errors.status || form.errors.status }}
            </p>
          </div>

          <div class="md:col-span-2" ref="descriptionRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Test hakkında kısa bir açıklama"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.description || form.errors.description }"
            ></textarea>
            <p v-if="errors.description || form.errors.description" class="mt-1 text-xs text-destructive">
              {{ errors.description || form.errors.description }}
            </p>
          </div>

          <div ref="categoryRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Kategori</label>
            <div class="relative">
              <input
                type="text"
                v-model="categorySearch"
                @focus="handleCategoryFocus"
                @blur="handleCategoryBlur"
                @input="filterCategories"
                @keydown.esc="showCategoryList = false"
                placeholder="Kategori seçin..."
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id }"
                tabindex="0"
              />
              <button
                v-if="categorySearch"
                @click="clearCategory"
                class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"
              >
                ✕
              </button>
              <ul
                tabindex="0"
                class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-border bg-popover shadow-lg"
                v-if="showCategoryList && filteredCategories.length > 0"
              >
                <li
                  v-for="category in filteredCategories"
                  :key="category.id"
                  @mousedown="selectCategory(category)"
                  class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent"
                >
                  {{ category.name }}
                </li>
              </ul>
            </div>
            <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-xs text-destructive">
              {{ errors.category_id || form.errors.category_id }}
            </p>
          </div>

          <div ref="timeLimitRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Süre Limiti (dakika)</label>
            <input
              type="number"
              v-model.number="form.time_limit"
              min="0"
              placeholder="Boş bırakılabilir"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.time_limit || form.errors.time_limit }"
            />
            <p v-if="errors.time_limit || form.errors.time_limit" class="mt-1 text-xs text-destructive">
              {{ errors.time_limit || form.errors.time_limit }}
            </p>
          </div>

          <div ref="publishedAtRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Yayınlama Tarihi</label>
            <div class="flex gap-2">
              <input
                type="date"
                v-model="publishDateObj.date"
                class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at }"
              />
              <input
                type="time"
                v-model="publishDateObj.time"
                class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at }"
              />
            </div>
            <p v-if="errors.published_at || form.errors.published_at" class="mt-1 text-xs text-destructive">
              {{ errors.published_at || form.errors.published_at }}
            </p>
          </div>
        </div>
      </div>

      <!-- Questions Section -->
      <div class="space-y-4 rounded-lg border border-border bg-card p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-foreground">Sorular</h2>
          <button
            type="button"
            @click="addQuestion"
            class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Soru Ekle
          </button>
        </div>

        <p v-if="form.questions.length === 0" class="text-sm text-muted-foreground">
          Henüz soru eklenmedi. "Soru Ekle" butonuna tıklayarak soru ekleyin.
        </p>

        <div v-for="(question, questionIndex) in form.questions" :key="questionIndex" class="space-y-4 rounded-lg border border-border bg-background p-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-foreground">Soru {{ questionIndex + 1 }}</h3>
            <button
              type="button"
              @click="removeQuestion(questionIndex)"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Soru Metni *</label>
              <textarea
                v-model="question.question_text"
                rows="3"
                placeholder="Soruyu buraya yazın..."
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                :class="{
                  'border-destructive focus-visible:ring-destructive':
                    errors[`questions.${questionIndex}.question_text`] ||
                    form.errors[`questions.${questionIndex}.question_text`],
                }"
              ></textarea>
              <p
                v-if="errors[`questions.${questionIndex}.question_text`] || form.errors[`questions.${questionIndex}.question_text`]"
                class="mt-1 text-xs text-destructive"
              >
                {{ errors[`questions.${questionIndex}.question_text`] || form.errors[`questions.${questionIndex}.question_text`] }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-foreground">Puan</label>
                <input
                  type="number"
                  v-model.number="question.points"
                  min="1"
                  placeholder="10"
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label>
                <input
                  type="text"
                  v-model="question.explanation"
                  placeholder="Doğru cevap açıklaması (opsiyonel)"
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <!-- Options -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-foreground">Şıklar *</label>
                <button
                  type="button"
                  @click="addOption(questionIndex)"
                  class="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Şık Ekle
                </button>
              </div>

              <div
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                class="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
              >
                <div class="flex-1 space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {{ String.fromCharCode(65 + optionIndex) }}
                    </span>
                    <input
                      type="text"
                      v-model="option.option_text"
                      :placeholder="`Şık ${optionIndex + 1} metni`"
                      class="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      :class="{
                        'border-destructive focus-visible:ring-destructive':
                          errors[`questions.${questionIndex}.options.${optionIndex}.option_text`] ||
                          form.errors[`questions.${questionIndex}.options.${optionIndex}.option_text`],
                      }"
                    />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <label class="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      :name="`question-${questionIndex}-correct`"
                      :checked="option.is_correct"
                      @change="setCorrectAnswer(questionIndex, optionIndex)"
                      class="h-4 w-4 cursor-pointer text-primary focus:ring-primary"
                    />
                    <span class="text-xs text-muted-foreground">Doğru</span>
                  </label>
                  <button
                    v-if="question.options.length > 2"
                    type="button"
                    @click="removeOption(questionIndex, optionIndex)"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <p
                v-if="errors[`questions.${questionIndex}.options`] || form.errors[`questions.${questionIndex}.options`]"
                class="text-xs text-destructive"
              >
                {{ errors[`questions.${questionIndex}.options`] || form.errors[`questions.${questionIndex}.options`] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-4">
        <button
          type="submit"
          :disabled="form.processing"
          class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span v-if="form.processing">Kaydediliyor...</span>
          <span v-else>Testi Kaydet</span>
        </button>
        <Link
          href="/tests"
          class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          İptal
        </Link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useForm, usePage, router, Link } from '@inertiajs/vue3';

const { props } = usePage();

// Flatten categories
const flattenCategories = (categories) => {
  const flat = [];
  const seenIds = new Set();

  const traverse = (cats) => {
    if (!cats || !Array.isArray(cats)) return;
    cats.forEach((cat) => {
      if (cat && cat.id && !seenIds.has(cat.id)) {
        seenIds.add(cat.id);
        flat.push(cat);
        if (cat.children && Array.isArray(cat.children) && cat.children.length > 0) {
          traverse(cat.children);
        }
      }
    });
  };
  traverse(categories);
  return flat;
};

const categoriesRaw = ref(props.categories || []);
const categories = computed(() => flattenCategories(categoriesRaw.value));

// Category search
const categorySearch = ref('');
const showCategoryList = ref(false);
const categoryDropdownTimer = ref(null);

const filteredCategories = computed(() => {
  if (!categorySearch.value) return categories.value.slice(0, 10);
  const search = categorySearch.value.toLowerCase();
  return categories.value.filter((cat) => cat.name.toLowerCase().includes(search)).slice(0, 10);
});

const handleCategoryFocus = () => {
  clearTimeout(categoryDropdownTimer.value);
  showCategoryList.value = true;
};

const handleCategoryBlur = () => {
  categoryDropdownTimer.value = setTimeout(() => {
    showCategoryList.value = false;
  }, 200);
};

const filterCategories = () => {
  showCategoryList.value = true;
};

const selectCategory = (category) => {
  form.category_id = category.id;
  categorySearch.value = category.name;
  showCategoryList.value = false;
};

const clearCategory = () => {
  form.category_id = null;
  categorySearch.value = '';
};

// Published date
const publishDateObj = ref({
  date: '',
  time: '',
});

// Form
const form = useForm({
  title: '',
  slug: '',
  description: '',
  category_id: null,
  status: 'draft',
  time_limit: null,
  published_at: null,
  questions: [],
});

// Auto generate slug from title
const autoGenerateSlug = () => {
  if (!form.slug || form.slug === '') {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
  }
};

// Questions management
const addQuestion = () => {
  form.questions.push({
    question_text: '',
    question_type: 'multiple_choice',
    points: 10,
    explanation: '',
    order: form.questions.length,
    options: [
      { option_text: '', is_correct: false, order: 0 },
      { option_text: '', is_correct: false, order: 1 },
      { option_text: '', is_correct: false, order: 2 },
      { option_text: '', is_correct: false, order: 3 },
    ],
  });
};

const removeQuestion = (index) => {
  form.questions.splice(index, 1);
  // Update order
  form.questions.forEach((q, i) => {
    q.order = i;
  });
};

const addOption = (questionIndex) => {
  const question = form.questions[questionIndex];
  question.options.push({
    option_text: '',
    is_correct: false,
    order: question.options.length,
  });
};

const removeOption = (questionIndex, optionIndex) => {
  const question = form.questions[questionIndex];
  if (question.options.length > 2) {
    question.options.splice(optionIndex, 1);
    // Update order
    question.options.forEach((opt, i) => {
      opt.order = i;
    });
  }
};

const setCorrectAnswer = (questionIndex, optionIndex) => {
  const question = form.questions[questionIndex];
  question.options.forEach((opt, i) => {
    opt.is_correct = i === optionIndex;
  });
};

// Errors
const errors = ref({});

// Validation
const validateForm = () => {
  errors.value = {};

  if (!form.title || form.title.trim() === '') {
    errors.value.title = 'Başlık zorunludur.';
  }

  if (!form.slug || form.slug.trim() === '') {
    errors.value.slug = 'Slug zorunludur.';
  }

  if (form.questions.length === 0) {
    errors.value.questions = 'En az bir soru eklenmelidir.';
  }

  form.questions.forEach((question, qIndex) => {
    if (!question.question_text || question.question_text.trim() === '') {
      errors.value[`questions.${qIndex}.question_text`] = 'Soru metni zorunludur.';
    }

    if (!question.options || question.options.length < 2) {
      errors.value[`questions.${qIndex}.options`] = 'En az 2 şık eklenmelidir.';
    }

    const hasCorrectAnswer = question.options.some((opt) => opt.is_correct);
    if (!hasCorrectAnswer) {
      errors.value[`questions.${qIndex}.options`] = 'En az bir doğru cevap seçilmelidir.';
    }

    question.options.forEach((option, oIndex) => {
      if (!option.option_text || option.option_text.trim() === '') {
        errors.value[`questions.${qIndex}.options.${oIndex}.option_text`] = 'Şık metni zorunludur.';
      }
    });
  });

  return Object.keys(errors.value).length === 0;
};

// Submit
const submitForm = () => {
  if (!validateForm()) {
    return;
  }

  // Handle published_at
  if (publishDateObj.value.date && publishDateObj.value.time) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  } else {
    form.published_at = null;
  }

  // Prepare questions data
  const questionsData = form.questions.map((q, index) => ({
    question_text: q.question_text,
    question_type: q.question_type || 'multiple_choice',
    points: q.points || 10,
    explanation: q.explanation || null,
    order: index,
    options: q.options.map((opt, optIndex) => ({
      option_text: opt.option_text,
      is_correct: opt.is_correct || false,
      order: optIndex,
    })),
  }));

  form.questions = questionsData;

  form.post(route('tests.store'), {
    onSuccess: (page) => {
      if (page?.props?.test?.slug) {
        router.visit(route('tests.show', { test: page.props.test.slug }));
      }
    },
    onError: (serverErrors) => {
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          if (errors.value.hasOwnProperty(key)) {
            errors.value[key] = serverErrors[key];
          }
        });
      }
    },
  });
};

// Initialize with one question
if (form.questions.length === 0) {
  addQuestion();
}

// Watch form processing state and notify sidebar
watch(
  () => form.processing,
  (processing) => {
    window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing } }));
  }
);

// Listen for sidebar form actions
let sidebarSubmitHandler = null;
let sidebarResetHandler = null;

// Reset form function
const resetForm = () => {
  form.reset();
  form.processing = false;
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });
  publishDateObj.value = { date: '', time: '' };
  categorySearch.value = '';
  form.category_id = null;
  // Reset questions to initial state
  form.questions = [];
  addQuestion();
};

onMounted(() => {
  form.processing = false;
  window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing: false } }));

  // Listen for sidebar form submit
  sidebarSubmitHandler = () => {
    submitForm();
  };
  window.addEventListener('sidebarFormSubmit', sidebarSubmitHandler);

  // Listen for sidebar form reset
  sidebarResetHandler = () => {
    resetForm();
  };
  window.addEventListener('sidebarFormReset', sidebarResetHandler);
});

onUnmounted(() => {
  if (sidebarSubmitHandler) {
    window.removeEventListener('sidebarFormSubmit', sidebarSubmitHandler);
  }
  if (sidebarResetHandler) {
    window.removeEventListener('sidebarFormReset', sidebarResetHandler);
  }
});
</script>

