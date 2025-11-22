<template>
  <div class="card rounded-lg border border-border bg-card text-card-foreground shadow-sm">
    <div class="p-6">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <h2 class="text-lg font-semibold text-card-foreground">Yazıyı Güncelle</h2>
        </div>
      </div>

      <form @submit.prevent="updateWrite" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="md:col-span-2">
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Başlık</label>
              <div class="relative">
                <input
                  type="text"
                  v-model="form.title"
                  placeholder="Yazının başlığını girin"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.title || form.errors.title }"
                />
              </div>
              <p v-if="errors.title || form.errors.title" class="mt-1 text-sm text-destructive">
                {{ errors.title || form.errors.title }}
              </p>
            </div>
          </div>

          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Slug</label>
              <div class="relative">
                <input
                  type="text"
                  v-model="form.slug"
                  placeholder="örnek-yazı-slug"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
                />
              </div>
              <p v-if="errors.slug || form.errors.slug" class="mt-1 text-sm text-destructive">
                {{ errors.slug || form.errors.slug }}
              </p>
            </div>
          </div>

          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Yayınlama Tarihi</label>
              <div class="flex space-x-2">
                <input
                  type="date"
                  v-model="publishDateObj.date"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{
                    'border-destructive focus-visible:ring-destructive':
                      errors.published_at || form.errors.published_at,
                  }"
                />
                <input
                  type="time"
                  v-model="publishDateObj.time"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{
                    'border-destructive focus-visible:ring-destructive':
                      errors.published_at || form.errors.published_at,
                  }"
                />
              </div>
              <p v-if="errors.published_at || form.errors.published_at" class="mt-1 text-sm text-destructive">
                {{ errors.published_at || form.errors.published_at }}
              </p>
            </div>
          </div>

          <div class="md:col-span-2">
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Özet</label>
              <div class="relative">
                <textarea
                  v-model="form.summary"
                  rows="3"
                  placeholder="Yazının kısa özeti"
                  class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{
                    'border-destructive focus-visible:ring-destructive': errors.summary || form.errors.summary,
                  }"
                ></textarea>
              </div>
              <p v-if="errors.summary || form.errors.summary" class="mt-1 text-sm text-destructive">
                {{ errors.summary || form.errors.summary }}
              </p>
            </div>
          </div>

          <div class="md:col-span-2">
            <RichTextEditor
              v-model="form.content"
              label="İçerik"
              :error="errors.content || form.errors.content"
              placeholder="İçeriği buraya yazın..."
              height="400px"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-foreground">Durumu</label>
            <div class="relative w-full">
              <div class="relative">
                <input
                  type="text"
                  v-model="statusSearch"
                  @focus="handleStatusFocus"
                  @blur="handleStatusBlur"
                  @input="filterStatus"
                  @keydown.esc="showStatusList = false"
                  placeholder="Durum seçin veya arayın..."
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.status || form.errors.status }"
                  tabindex="0"
                />
                <button
                  v-if="statusSearch"
                  @click="clearStatus"
                  class="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  ✕
                </button>
              </div>
              <ul
                tabindex="0"
                class="absolute z-[1] mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"
                v-if="showStatusList && filteredStatuses.length > 0"
              >
                <li
                  v-for="status in filteredStatuses"
                  :key="status.value"
                  @mousedown="selectStatus(status)"
                  class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span class="font-medium">{{ status.label }}</span>
                </li>
              </ul>
            </div>
            <p v-if="errors.status || form.errors.status" class="mt-1 text-sm text-destructive">
              {{ errors.status || form.errors.status }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-foreground">Kategori</label>
            <div class="relative w-full">
              <div class="relative">
                <input
                  type="text"
                  v-model="categorySearch"
                  @focus="handleCategoryFocus"
                  @blur="handleCategoryBlur"
                  @input="filterCategories"
                  @keydown.esc="showCategoryList = false"
                  placeholder="Kategori seçin veya arayın..."
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id,
              }"
                  tabindex="0"
                />
                <button
                  v-if="categorySearch"
                  @click="clearCategory"
                  class="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  ✕
                </button>
              </div>
              <ul
                tabindex="0"
                class="absolute z-[1] mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"
                v-if="showCategoryList && filteredCategories && filteredCategories.length > 0"
              >
                <li
                  v-for="category in filteredCategories"
                  :key="category.id"
                  @mousedown="selectCategory(category)"
                  class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div class="flex flex-col gap-0.5">
                    <span class="font-medium">{{ category.name }}</span>
                    <span v-if="getCategoryPath(category.id)" class="text-xs text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-1 inline h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      {{ getCategoryPath(category.id) }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-sm text-destructive">
              {{ errors.category_id || form.errors.category_id }}
            </p>
          </div>


          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Etiketler</label>
              <div class="relative">
                <input
                  type="text"
                  v-model="form.tags"
                  placeholder="etiket1, etiket2, etiket3"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.tags || form.errors.tags }"
                />
              </div>
              <p v-if="errors.tags || form.errors.tags" class="mt-1 text-sm text-destructive">
                {{ errors.tags || form.errors.tags }}
              </p>
            </div>
          </div>

          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">SEO Anahtar Kelimeleri</label>
              <div class="relative">
                <input
                  type="text"
                  v-model="form.seo_keywords"
                  placeholder="anahtar1, anahtar2, anahtar3"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{
                    'border-destructive focus-visible:ring-destructive':
                      errors.seo_keywords || form.errors.seo_keywords,
                  }"
                />
              </div>
              <p v-if="errors.seo_keywords || form.errors.seo_keywords" class="mt-1 text-sm text-destructive">
                {{ errors.seo_keywords || form.errors.seo_keywords }}
              </p>
            </div>
          </div>

          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">SEO Meta Açıklaması</label>
              <div class="relative">
                <textarea
                  v-model="form.meta_description"
                  placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)"
                  class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{
                    'border-destructive focus-visible:ring-destructive':
                      errors.meta_description || form.errors.meta_description,
                  }"
                  maxlength="160"
                  rows="2"
                ></textarea>
                <div class="mt-1 text-xs text-muted-foreground">{{ form.meta_description?.length || 0 }}/160</div>
              </div>
              <p v-if="errors.meta_description || form.errors.meta_description" class="mt-1 text-sm text-destructive">
                {{ errors.meta_description || form.errors.meta_description }}
              </p>
              <div class="mt-1 text-xs text-muted-foreground">
                <span
                  >İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span
                >
              </div>
            </div>
          </div>

          <div>
            <div class="mb-4 w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Görüntülenme Sayısı</label>
              <div class="relative">
                <input
                  type="number"
                  v-model="form.views_count"
                  class="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                v-model="form.hasDraw"
                class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <span class="text-sm font-medium text-foreground">Çizim İçerir</span>
            </label>
          </div>
        </div>

        <div class="my-6 border-t border-border"></div>

        <div class="flex justify-end space-x-3">
          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :class="{ 'cursor-not-allowed opacity-50': form.processing }"
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed, nextTick } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

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
  { value: 'draft', label: 'Şablon' },
  { value: 'published', label: 'Yayında' },
  { value: 'private', label: 'Gizli' },
  { value: 'link_only', label: 'Sadece Link' },
];

const statusSearch = ref('');
const showStatusList = ref(false);
const statusDropdownTimer = ref(null);

const filteredStatuses = computed(() => {
  if (!statusSearch.value) return statusOptions;
  const searchTerm = statusSearch.value.toLowerCase();
  return statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
});

const form = useForm({
  title: writeData.value.title || '',
  slug: writeData.value.slug || '',
  content: writeData.value.content || '',
  published_at: writeData.value.published_at || '',
  summary: writeData.value.summary || '',
  status: writeData.value.status || 'draft',
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
  if (filteredStatuses.value.length > 0) {
    showStatusList.value = true;
  }
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
});

watch(
  publishDateObj.value,
  () => {
    if (publishDateObj.value.date && publishDateObj.value.time) {
      form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
    }
  },
  { deep: true }
);

const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.published_at =
    publishDateObj.value.date && publishDateObj.value.time ? '' : 'Yayınlama tarihi zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';

  if (!errors.value.published_at) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  }
};

const LOCAL_STORAGE_KEY = `write_edit_form_${writeData.value.id || writeData.value.slug || 'unknown'}`;

watch(
  form,
  (newVal) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

onMounted(() => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(form, parsed);
  }
});

const updateWrite = () => {
  validateForm();
  if (!Object.values(errors.value).some((error) => error !== '')) {
    form.put(route('writes.update', { write: writeData.value.slug }), {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        router.visit(route('writes.show', { write: form.slug }));
      },
    });
  }
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
