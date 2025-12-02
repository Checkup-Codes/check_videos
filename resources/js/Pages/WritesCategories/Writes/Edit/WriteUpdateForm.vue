<template>
  <div class="space-y-4 py-6">
    <form @submit.prevent="updateWrite" class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="md:col-span-2" ref="titleRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Başlık</label>
          <input
            type="text"
            v-model="form.title"
            placeholder="Yazının başlığını girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.title || form.errors.title }"
          />
          <p v-if="errors.title || form.errors.title" class="mt-1 text-xs text-destructive">
            {{ errors.title || form.errors.title }}
          </p>
        </div>

        <div ref="slugRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            v-model="form.slug"
            placeholder="örnek-yazı-slug"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
          />
          <p v-if="errors.slug || form.errors.slug" class="mt-1 text-xs text-destructive">
            {{ errors.slug || form.errors.slug }}
          </p>
        </div>

        <div ref="publishedAtRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Yayınlama Tarihi</label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="publishDateObj.date"
              class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at,
              }"
            />
            <input
              type="time"
              v-model="publishDateObj.time"
              class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at,
              }"
            />
          </div>
          <p v-if="errors.published_at || form.errors.published_at" class="mt-1 text-xs text-destructive">
            {{ errors.published_at || form.errors.published_at }}
          </p>
        </div>

        <div class="md:col-span-2" ref="summaryRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Özet</label>
          <textarea
            v-model="form.summary"
            rows="2"
            placeholder="Yazının kısa özeti"
            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.summary || form.errors.summary }"
          ></textarea>
          <p v-if="errors.summary || form.errors.summary" class="mt-1 text-xs text-destructive">
            {{ errors.summary || form.errors.summary }}
          </p>
        </div>

        <div class="md:col-span-2" ref="contentRef">
          <RichTextEditor
            v-model="form.content"
            label="İçerik"
            :error="errors.content || form.errors.content"
            placeholder="İçeriği buraya yazın..."
            height="400px"
          />
        </div>

        <div ref="statusRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Durumu</label>
          <div class="relative">
            <input
              type="text"
              v-model="statusSearch"
              @focus="handleStatusFocus"
              @blur="handleStatusBlur"
              @input="filterStatus"
              @keydown.esc="showStatusList = false"
              placeholder="Durum seçin..."
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.status || form.errors.status }"
              tabindex="0"
            />
            <button
              v-if="statusSearch"
              @click="clearStatus"
              class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"
            >
              ✕
            </button>
            <ul
              tabindex="0"
              class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-border bg-popover shadow-lg"
              v-if="showStatusList && filteredStatuses.length > 0"
            >
              <li
                v-for="status in filteredStatuses"
                :key="status.value"
                @mousedown="selectStatus(status)"
                class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent"
              >
                {{ status.label }}
              </li>
            </ul>
          </div>
          <p v-if="errors.status || form.errors.status" class="mt-1 text-xs text-destructive">
            {{ errors.status || form.errors.status }}
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
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id,
              }"
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
              v-if="showCategoryList && filteredCategories && filteredCategories.length > 0"
            >
              <li
                v-for="category in filteredCategories"
                :key="category.id"
                @mousedown="selectCategory(category)"
                class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent"
              >
                <div class="flex flex-col">
                  <span>{{ category.name }}</span>
                  <span v-if="getCategoryPath(category.id)" class="text-xs text-muted-foreground">
                    {{ getCategoryPath(category.id) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-xs text-destructive">
            {{ errors.category_id || form.errors.category_id }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">Etiketler</label>
          <input
            type="text"
            v-model="form.tags"
            placeholder="etiket1, etiket2, etiket3"
            class="flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive': errors.tags || form.errors.tags }"
          />
          <p v-if="errors.tags || form.errors.tags" class="mt-1 text-xs text-destructive">
            {{ errors.tags || form.errors.tags }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">SEO Anahtar Kelimeleri</label>
          <input
            type="text"
            v-model="form.seo_keywords"
            placeholder="anahtar1, anahtar2, anahtar3"
            class="flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive': errors.seo_keywords || form.errors.seo_keywords }"
          />
          <p v-if="errors.seo_keywords || form.errors.seo_keywords" class="mt-1 text-xs text-destructive">
            {{ errors.seo_keywords || form.errors.seo_keywords }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">SEO Meta Açıklaması</label>
          <textarea
            v-model="form.meta_description"
            placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)"
            class="flex min-h-[60px] w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive': errors.meta_description || form.errors.meta_description }"
            maxlength="160"
            rows="2"
          ></textarea>
          <div class="mt-1 flex items-center justify-between">
            <p v-if="errors.meta_description || form.errors.meta_description" class="text-xs text-destructive">
              {{ errors.meta_description || form.errors.meta_description }}
            </p>
            <span class="text-xs text-muted-foreground">{{ form.meta_description?.length || 0 }}/160</span>
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">Görüntülenme Sayısı</label>
          <input
            type="number"
            v-model="form.views_count"
            class="flex h-9 w-full rounded border border-input bg-muted px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            readonly
          />
        </div>

        <div class="flex items-center">
          <label class="flex cursor-pointer items-center gap-2">
            <input type="checkbox" v-model="form.hasDraw" class="h-4 w-4 rounded border-input text-primary" />
            <span class="text-xs text-foreground">Çizim İçerir</span>
          </label>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :disabled="form.processing"
        >
          <svg
            v-if="form.processing"
            class="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ form.processing ? 'Güncelleniyor...' : 'Güncelle' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed, nextTick } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

// Field refs for scroll to error
const titleRef = ref(null);
const slugRef = ref(null);
const publishedAtRef = ref(null);
const summaryRef = ref(null);
const contentRef = ref(null);
const statusRef = ref(null);
const categoryRef = ref(null);

defineOptions({
  name: 'WriteUpdateForm',
});

const { props } = usePage();

/**
 * Flatten nested categories to a flat array (removes duplicates)
 * @param {Array} categories - Nested categories array
 * @returns {Array} Flat categories array without duplicates
 */
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
const writeData = ref(props.write);

const categorySearch = ref('');
const showCategoryList = ref(false);
const categoryDropdownTimer = ref(null);

const statusOptions = [
  { value: 'published', label: 'Herkese Açık' },
  { value: 'private', label: 'Gizli' },
  { value: 'link_only', label: 'Sadece Link' },
];

const statusSearch = ref('');
const showStatusList = ref(false);
const statusDropdownTimer = ref(null);

const filteredStatuses = computed(() => {
  // If search is empty or matches the current selected status label, show all options
  if (!statusSearch.value) return statusOptions;

  // Check if the search value matches the currently selected status label
  const currentStatus = statusOptions.find((s) => s.value === form.status);
  if (currentStatus && statusSearch.value === currentStatus.label) {
    return statusOptions; // Show all options when clicking on already selected value
  }

  // Otherwise filter by search term
  const searchTerm = statusSearch.value.toLowerCase();
  return statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
});

const form = useForm({
  title: writeData.value.title || '',
  slug: writeData.value.slug || '',
  content: writeData.value.content || '',
  published_at: writeData.value.published_at || '',
  summary: writeData.value.summary || '',
  status: writeData.value.status || 'published',
  category_id: writeData.value.category_id || '',
  seo_keywords: writeData.value.seo_keywords || '',
  meta_description: writeData.value.meta_description || '',
  tags: writeData.value.tags || '',
  views_count: writeData.value.views_count || 0,
  hasDraw: writeData.value.hasDraw || false,
});

const errors = ref({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: '',
  category_id: '',
  seo_keywords: '',
  meta_description: '',
  tags: '',
});

const publishDateObj = ref({
  date: '',
  time: '',
});

/**
 * Get category path (parent > child > subchild)
 * @param {String} categoryId - The category ID
 * @returns {String} Category path string
 */
const getCategoryPath = (categoryId) => {
  if (!categoryId || !categories.value || categories.value.length === 0) return '';

  const findCategory = (id) => {
    return categories.value.find((cat) => cat.id === id);
  };

  const buildPath = (id, path = []) => {
    const category = findCategory(id);
    if (!category) return path;

    path.unshift(category.name);

    if (category.parent_id) {
      return buildPath(category.parent_id, path);
    }

    return path;
  };

  const path = buildPath(categoryId);
  // Remove the last item (current category) and return parent path
  if (path.length > 1) {
    return path.slice(0, -1).join(' > ');
  }

  return '';
};

/**
 * Get full category path including the category itself
 * @param {String} categoryId - The category ID
 * @returns {String} Full category path string
 */
const getFullCategoryPath = (categoryId) => {
  if (!categoryId || !categories.value || categories.value.length === 0) return '';

  const findCategory = (id) => {
    return categories.value.find((cat) => cat.id === id);
  };

  const buildPath = (id, path = []) => {
    const category = findCategory(id);
    if (!category) return path;

    path.unshift(category.name);

    if (category.parent_id) {
      return buildPath(category.parent_id, path);
    }

    return path;
  };

  const path = buildPath(categoryId);
  return path.join(' > ');
};

/**
 * Filter categories based on search input (searches in name and path)
 * @returns {Array} Filtered category list without duplicates
 */
const filteredCategories = computed(() => {
  if (!categories.value || categories.value.length === 0) return [];
  if (!categorySearch.value) {
    // Remove duplicates even when no search term
    const uniqueCategories = [];
    const seenIds = new Set();
    categories.value.forEach((category) => {
      if (category && category.id && !seenIds.has(category.id)) {
        seenIds.add(category.id);
        uniqueCategories.push(category);
      }
    });
    return uniqueCategories;
  }

  const searchTerm = categorySearch.value.toLowerCase();
  const uniqueCategories = [];
  const seenIds = new Set();

  categories.value.forEach((category) => {
    if (!category || !category.name || seenIds.has(category.id)) return;

    // Search in category name
    const nameMatch = category.name.toLowerCase().includes(searchTerm);

    // Search in category path
    const path = getCategoryPath(category.id);
    const pathMatch = path.toLowerCase().includes(searchTerm);

    // Search in full path (including category name)
    const fullPath = getFullCategoryPath(category.id);
    const fullPathMatch = fullPath.toLowerCase().includes(searchTerm);

    if (nameMatch || pathMatch || fullPathMatch) {
      seenIds.add(category.id);
      uniqueCategories.push(category);
    }
  });

  return uniqueCategories;
});

const filterCategories = () => {
  if (categorySearch.value.length >= 1) {
    showCategoryList.value = true;
  }
};

const handleCategoryFocus = () => {
  clearTimeout(categoryDropdownTimer.value);
  if (filteredCategories.value.length > 0) {
    showCategoryList.value = true;
  }
};

const handleCategoryBlur = () => {
  categoryDropdownTimer.value = setTimeout(() => {
    showCategoryList.value = false;
  }, 100);
};

const selectCategory = (category) => {
  if (!category || !category.id) return;
  form.category_id = category.id;
  const fullPath = getFullCategoryPath(category.id);
  categorySearch.value = fullPath;
  nextTick(() => {
    showCategoryList.value = false;
  });
};

const clearCategory = () => {
  categorySearch.value = '';
  form.category_id = '';
  showCategoryList.value = false;
};

const filterStatus = () => {
  if (statusSearch.value.length >= 1) {
    showStatusList.value = true;
  }
};

const handleStatusFocus = () => {
  clearTimeout(statusDropdownTimer.value);
  // Always show all options when focusing, regardless of current search value
  showStatusList.value = true;
};

const handleStatusBlur = () => {
  statusDropdownTimer.value = setTimeout(() => {
    showStatusList.value = false;
  }, 100);
};

const selectStatus = (status) => {
  if (!status || !status.value) return;
  form.status = status.value;
  statusSearch.value = status.label;
  nextTick(() => {
    showStatusList.value = false;
  });
};

const clearStatus = () => {
  statusSearch.value = '';
  form.status = '';
  showStatusList.value = false;
};

// Flag to prevent watch from triggering during initial mount
const isInitialMount = ref(true);

onMounted(() => {
  if (form.published_at) {
    const dateObj = new Date(form.published_at);
    if (!isNaN(dateObj.getTime())) {
      publishDateObj.value.date = dateObj.toISOString().split('T')[0];
      publishDateObj.value.time = dateObj.toTimeString().substring(0, 5);
    }
  }

  // Set initial category name with full path
  if (form.category_id) {
    const category = categories.value.find((c) => c.id === form.category_id);
    if (category) {
      const fullPath = getFullCategoryPath(category.id);
      categorySearch.value = fullPath;
    }
  }

  // Set initial status label
  const currentStatus = statusOptions.find((s) => s.value === form.status);
  if (currentStatus) {
    statusSearch.value = currentStatus.label;
  }

  // Set initial slug manually changed state based on whether slug was pre-filled
  if (form.slug && form.slug !== '') {
    isSlugManuallyChanged.value = true;
  }

  // Add global escape key listener to close dropdowns
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showCategoryList.value = false;
      showStatusList.value = false;
    }
  });

  // Mark initial mount as complete after a short delay
  nextTick(() => {
    setTimeout(() => {
      isInitialMount.value = false;
    }, 100);
  });
});

watch(
  publishDateObj.value,
  () => {
    // Don't trigger during initial mount
    if (isInitialMount.value) {
      return;
    }
    if (publishDateObj.value.date && publishDateObj.value.time) {
      form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
    }
  },
  { deep: true }
);

// Scroll to first error field
const scrollToError = () => {
  nextTick(() => {
    const errorFields = [
      { ref: titleRef, error: errors.value.title || form.errors.title },
      { ref: slugRef, error: errors.value.slug || form.errors.slug },
      { ref: contentRef, error: errors.value.content || form.errors.content },
      { ref: categoryRef, error: errors.value.category_id || form.errors.category_id },
      { ref: publishedAtRef, error: errors.value.published_at || form.errors.published_at },
      { ref: summaryRef, error: errors.value.summary || form.errors.summary },
      { ref: statusRef, error: errors.value.status || form.errors.status },
    ];

    const firstError = errorFields.find((field) => field.error);
    if (firstError && firstError.ref?.value) {
      firstError.ref.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // Focus the input if it exists
      const input = firstError.ref.value.querySelector('input, textarea');
      if (input) {
        setTimeout(() => input.focus(), 300);
      }
    }
  });
};

const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });

  let hasErrors = false;

  if (!form.title || form.title.trim() === '') {
    errors.value.title = 'Başlık zorunludur.';
    hasErrors = true;
  }

  if (!form.slug || form.slug.trim() === '') {
    errors.value.slug = 'Slug zorunludur.';
    hasErrors = true;
  }

  if (!form.content || form.content.trim() === '' || form.content === '<p><br></p>') {
    errors.value.content = 'İçerik zorunludur.';
    hasErrors = true;
  }

  if (!form.category_id) {
    errors.value.category_id = 'Kategori seçilmelidir.';
    hasErrors = true;
  }

  // Handle published_at
  if (publishDateObj.value.date && publishDateObj.value.time) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  } else {
    form.published_at = null; // Make it optional
  }

  if (hasErrors) {
    scrollToError();
  }

  return !hasErrors;
};

const LOCAL_STORAGE_KEY = `write_edit_form_${writeData.value.id || writeData.value.slug || 'unknown'}`;

watch(
  form,
  (newVal) => {
    // Don't save to localStorage during initial mount
    if (isInitialMount.value) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

// Watch form processing state and notify sidebar
watch(
  () => form.processing,
  (processing) => {
    window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing } }));
  }
);

// Listen for sidebar form actions
let sidebarSubmitHandler = null;

// Load saved form data from localStorage (before the first onMounted)
// IMPORTANT: Only load from localStorage if user explicitly wants to restore draft
// For now, we'll skip auto-loading to prevent accidental updates
// Users can manually restore drafts if needed
// const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
// if (saved) {
//   try {
//     const parsed = JSON.parse(saved);
//     // Only restore if data exists and is valid
//     if (parsed && typeof parsed === 'object') {
//       // Don't restore processing state - it should always start as false
//       const { processing, ...formData } = parsed;
//       Object.assign(form, formData);
//     }
//   } catch (e) {
//     console.error('Error loading saved form data:', e);
//   }
// }

// Listen for sidebar form submit
onMounted(() => {
  // Reset form processing state when component mounts
  form.processing = false;
  window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing: false } }));

  sidebarSubmitHandler = () => {
    updateWrite();
  };
  window.addEventListener('sidebarFormSubmit', sidebarSubmitHandler);
});

onUnmounted(() => {
  if (sidebarSubmitHandler) {
    window.removeEventListener('sidebarFormSubmit', sidebarSubmitHandler);
  }
});

const updateWrite = () => {
  if (!validateForm()) {
    return;
  }

  form.put(route('writes.update', { write: writeData.value.slug }), {
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      router.visit(route('writes.show', { write: form.slug }));
    },
    onError: (serverErrors) => {
      // Handle server errors and scroll to first error
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          if (errors.value.hasOwnProperty(key)) {
            errors.value[key] = serverErrors[key];
          }
        });
        scrollToError();
      }
    },
  });
};

let isSlugManuallyChanged = ref(false);

watch(
  () => form.title,
  (newTitle) => {
    if (!isSlugManuallyChanged.value && newTitle) {
      form.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim();
    }
  }
);

watch(
  () => form.slug,
  (newSlug, oldSlug) => {
    if (oldSlug !== undefined && newSlug !== oldSlug && oldSlug !== '') {
      isSlugManuallyChanged.value = true;
    }
  }
);
</script>

<style>
/* Sadece overlay için gerekli stil */
.upload-loading-overlay {
  backdrop-filter: blur(2px);
}
</style>
