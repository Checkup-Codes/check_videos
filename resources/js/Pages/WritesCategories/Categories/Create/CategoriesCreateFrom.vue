<template>
  <div class="mx-auto mt-6 w-full max-w-full px-3 sm:px-5 lg:mt-0">
    <div class="container mx-auto p-0 sm:p-4">
      <div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <div class="p-4 sm:p-6">
          <div class="mb-4">
            <h2 class="text-lg font-semibold text-card-foreground">Yeni Kategori</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Kategorileriniz için kategoriler oluşturun. İsterseniz bir üst kategori seçebilirsiniz.
            </p>
          </div>

          <div class="my-4 border-t border-border"></div>

          <form @submit.prevent="createCategory" class="space-y-6">
            <!-- Category Name Field -->
            <div class="w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">İsim</label>
              <input
                type="text"
                v-model="form.name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.name }"
                placeholder="Kategori ismi"
              />
              <p v-if="form.errors.name" class="mt-1 text-sm text-destructive">{{ form.errors.name }}</p>
            </div>

            <!-- Category Slug Field -->
            <div class="w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Slug</label>
              <input
                type="text"
                v-model="form.slug"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.slug }"
                placeholder="kategori-slug"
              />
              <p v-if="form.errors.slug" class="mt-1 text-sm text-destructive">{{ form.errors.slug }}</p>
            </div>

            <!-- Parent Category Field with Search Dropdown -->
            <div class="w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Üst Kategori</label>
              <div class="relative w-full">
                <input
                  type="text"
                  v-model="parentSearch"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @input="handleParentSearch"
                  @keydown.esc="showParentList = false"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.parent_id }"
                  placeholder="Üst kategori ara"
                />

                <!-- Dropdown for search results -->
                <div
                  v-if="showParentList && filteredCategories.length > 0"
                  class="absolute z-30 mt-1 w-full rounded-md border border-border bg-popover shadow-lg"
                >
                  <ul class="max-h-60 w-full overflow-y-auto p-1">
                    <li
                      v-for="category in filteredCategories"
                      :key="category.id"
                      @mousedown="selectParentCategory(category)"
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

                <!-- Selected parent category badge -->
                <div v-if="form.parent_id" class="mt-2 flex items-center gap-2">
                  <div
                    class="inline-flex flex-col items-start rounded-full border border-border bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                  >
                    <span>{{ parentCategoryName }}</span>
                    <span v-if="getCategoryPath(form.parent_id)" class="text-[10px] font-normal opacity-80">
                      {{ getCategoryPath(form.parent_id) }}
                    </span>
                  </div>
                  <button
                    type="button"
                    @click="clearParentCategory"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label="Remove parent category"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <p v-if="form.errors.parent_id" class="mt-1 text-sm text-destructive">{{ form.errors.parent_id }}</p>
            </div>

            <!-- Category Status Field -->
            <div class="w-full">
              <label class="mb-2 block text-sm font-medium text-foreground">Durum</label>
              <select
                v-model="form.status"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.status }"
              >
                <option value="public">Açık</option>
                <option value="hidden">Gizli</option>
              </select>
              <p v-if="form.errors.status" class="mt-1 text-sm text-destructive">{{ form.errors.status }}</p>
            </div>

            <!-- Form Actions -->
            <div class="mt-5 flex justify-end">
              <button
                type="submit"
                class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                :disabled="form.processing || isFormDisabled"
              >
                <svg
                  v-if="form.processing"
                  class="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Kategori Oluştur
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';

/**
 * Component props definition
 */
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

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

/**
 * Form state and initialization
 */
const categoriesRaw = ref(props.categories || []);
const categories = computed(() => flattenCategories(categoriesRaw.value));
const form = useForm({
  name: '',
  slug: '',
  parent_id: '',
  status: 'public',
});

/**
 * Parent category search and selection state
 */
const parentSearch = ref('');
const parentCategoryName = ref('');
const showParentList = ref(false);
const isLoading = ref(false);
const dropdownTimer = ref(null);

/**
 * Handle input focus event
 * Shows dropdown if filtered categories exist
 */
const handleFocus = () => {
  clearTimeout(dropdownTimer.value);
  if (filteredCategories.value.length > 0) {
    showParentList.value = true;
  }
};

/**
 * Handle input blur event
 * Delays hiding dropdown to allow clicking options
 */
const handleBlur = () => {
  dropdownTimer.value = setTimeout(() => {
    showParentList.value = false;
  }, 100);
};

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
  if (!parentSearch.value) {
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

  const searchTerm = parentSearch.value.toLowerCase();
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

/**
 * Check if form is valid for submission
 * @returns {Boolean} Whether form is disabled
 */
const isFormDisabled = computed(() => {
  return !form.name || !form.slug;
});

/**
 * Handle parent category search input
 * Resets parent_id and shows dropdown when input changes
 */
const handleParentSearch = () => {
  form.parent_id = '';
  if (parentSearch.value.length >= 1) {
    showParentList.value = true;
  }
};

/**
 * Select a parent category from dropdown
 * @param {Object} category - The selected category
 */
const selectParentCategory = (category) => {
  if (!category || !category.id) return;

  form.parent_id = category.id;
  parentCategoryName.value = category.name;
  // Show full path in search input
  const fullPath = getFullCategoryPath(category.id);
  parentSearch.value = fullPath;
  nextTick(() => {
    showParentList.value = false;
  });
};

/**
 * Clear selected parent category
 */
const clearParentCategory = () => {
  form.parent_id = '';
  parentSearch.value = '';
  parentCategoryName.value = '';
};

/**
 * Auto-generate slug from name
 */
watch(
  () => form.name,
  (newName) => {
    if (!newName) return;

    form.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
);

/**
 * Submit form to create new category
 */
const createCategory = () => {
  form
    .post(route('categories.store'))
    .then(() => {
      console.log('Category created successfully');
      form.reset();
      parentSearch.value = '';
      parentCategoryName.value = '';
    })
    .catch((error) => {
      console.error('Error creating category:', error);
    });
};

/**
 * Component lifecycle - setup on mount
 */
onMounted(() => {
  // Fetch categories if not provided
  if (!categoriesRaw.value || categoriesRaw.value.length === 0) {
    fetchCategories();
  }

  // Add global escape key listener to close dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showParentList.value = false;
    }
  });
});

/**
 * Fetch categories from API
 */
const fetchCategories = async () => {
  isLoading.value = true;

  try {
    const response = await fetch(route('categories.index'), {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    categoriesRaw.value = data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
