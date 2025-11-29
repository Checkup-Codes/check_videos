<template>
  <div class="space-y-4 py-6">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="md:col-span-2" ref="nameRef">
          <div>
            <label class="mb-1 block text-sm font-medium text-foreground">İsim</label>
            <input
              type="text"
              :value="form.name"
              @input="form.name = $event.target.value"
              placeholder="Kategori ismi"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.name || form.errors.name }"
            />
            <p v-if="errors.name || form.errors.name" class="mt-1 text-xs text-destructive">
              {{ errors.name || form.errors.name }}
            </p>
          </div>
        </div>

        <div ref="slugRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            :value="form.slug"
            @input="form.slug = $event.target.value"
            placeholder="kategori-slug"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
          />
          <p v-if="errors.slug || form.errors.slug" class="mt-1 text-xs text-destructive">
            {{ errors.slug || form.errors.slug }}
          </p>
        </div>

        <div ref="parentIdRef">
          <div class="mb-1 flex items-center gap-2">
            <label class="text-sm font-medium text-foreground">Üst Kategori</label>
            <!-- Selected parent category preview -->
            <div v-if="form.parent_id" class="flex items-center gap-1.5">
              <span class="text-xs text-muted-foreground">:</span>
              <span class="text-sm text-foreground">{{ parentCategoryName }}</span>
              <span v-if="getCategoryPath(form.parent_id)" class="text-xs text-muted-foreground">
                ({{ getCategoryPath(form.parent_id) }})
              </span>
              <button
                type="button"
                @click="clearParentCategory"
                class="flex h-4 w-4 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive"
                aria-label="Kaldır"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="relative w-full">
            <input
              type="text"
              v-model="parentSearch"
              @focus="handleFocus"
              @blur="handleBlur"
              @input="handleParentSearch"
              @keydown.esc="showParentList = false"
              placeholder="Üst kategori ara (opsiyonel)"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.parent_id || form.errors.parent_id }"
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
          </div>
          <p v-if="errors.parent_id || form.errors.parent_id" class="mt-1 text-xs text-destructive">
            {{ errors.parent_id || form.errors.parent_id }}
          </p>
        </div>

        <div ref="statusRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Durum</label>
          <select
            :value="form.status"
            @change="form.status = $event.target.value"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.status || form.errors.status }"
          >
            <option value="public">Açık</option>
            <option value="hidden">Gizli</option>
          </select>
          <p v-if="errors.status || form.errors.status" class="mt-1 text-xs text-destructive">
            {{ errors.status || form.errors.status }}
          </p>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          @click="deleteCategory(currentCategory.id)"
          class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :disabled="form.processing"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Sil
        </button>
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
          {{ form.processing ? 'Güncelleniyor...' : 'Kategoriyi Güncelle' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';

/**
 * Component name definition
 */
defineOptions({
  name: 'CategoriesEditFrom',
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
 * Get data from page props
 */
const { props } = usePage();
const categoriesRaw = ref(props.categories || []);
const categories = computed(() => flattenCategories(categoriesRaw.value));
const currentCategory = ref(props.category || {});

/**
 * Initialize form with category data
 */
const form = useForm({
  name: currentCategory.value.name || '',
  slug: currentCategory.value.slug || '',
  parent_id: currentCategory.value.parent_id || null,
  status: currentCategory.value.status || 'public',
});

form.processing = false;

// Field refs for scroll to error
const nameRef = ref(null);
const slugRef = ref(null);
const parentIdRef = ref(null);
const statusRef = ref(null);

// Frontend validation errors
const errors = ref({
  name: '',
  slug: '',
  parent_id: '',
  status: '',
});

/**
 * Parent category state management
 */
const parentSearch = ref(props.category.parent?.name || '');
const parentCategoryName = ref(props.category.parent?.name || '');
const showParentList = ref(false);
const isLoading = ref(false);
const dropdownTimer = ref(null);

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
 * Filter categories, excluding the current category and its children
 * to prevent creating circular references
 * Also filters by search term and shows hierarchy
 */
const filteredCategories = computed(() => {
  if (!categories.value || categories.value.length === 0) return [];

  // Get all child category IDs recursively
  const getChildIds = (categoryId, childIds = new Set()) => {
    const children = categories.value.filter((cat) => cat.parent_id === categoryId);
    children.forEach((child) => {
      childIds.add(child.id);
      getChildIds(child.id, childIds);
    });
    return childIds;
  };

  const excludedIds = new Set([currentCategory.value.id]);
  const childIds = getChildIds(currentCategory.value.id);
  childIds.forEach((id) => excludedIds.add(id));

  let filtered = categories.value.filter(
    (category) => category && category.id && !excludedIds.has(category.id)
  );

  // Filter by search term if provided
  if (parentSearch.value) {
    const searchTerm = parentSearch.value.toLowerCase();
    const uniqueCategories = [];
    const seenIds = new Set();

    filtered.forEach((category) => {
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
  }

  // Remove duplicates even when no search term
  const uniqueCategories = [];
  const seenIds = new Set();
  filtered.forEach((category) => {
    if (category && category.id && !seenIds.has(category.id)) {
      seenIds.add(category.id);
      uniqueCategories.push(category);
    }
  });

  return uniqueCategories;
});

/**
 * Validate form and set error messages
 * @returns {Boolean} Whether form has errors
 */
const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });
  
  let hasErrors = false;

  if (!form.name || form.name.trim() === '') {
    errors.value.name = 'İsim zorunludur.';
    hasErrors = true;
  }

  if (!form.slug || form.slug.trim() === '') {
    errors.value.slug = 'Slug zorunludur.';
    hasErrors = true;
  }

  if (hasErrors) {
    scrollToError();
  }

  return hasErrors;
};

/**
 * Scroll to first error field
 */
const scrollToError = () => {
  nextTick(() => {
    const errorFields = [
      { ref: nameRef, error: errors.value.name },
      { ref: slugRef, error: errors.value.slug },
      { ref: parentIdRef, error: errors.value.parent_id },
      { ref: statusRef, error: errors.value.status },
    ];

    for (const field of errorFields) {
      if (field.error && field.ref.value) {
        field.ref.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nextTick(() => {
          const inputElement = field.ref.value.querySelector('input, select');
          if (inputElement) {
            inputElement.focus();
          }
        });
        break;
      }
    }
  });
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

// Listen for sidebar form actions
let sidebarSubmitHandler = null;

/**
 * Component lifecycle - setup on mount
 */
onMounted(() => {
  form.processing = false;
  
  // Fetch categories if not provided
  if (!categoriesRaw.value || categoriesRaw.value.length === 0) {
    fetchCategories();
  }

  // Set initial parent category name with full path
  if (form.parent_id) {
    const category = categories.value.find((c) => c.id === form.parent_id);
    if (category) {
      const fullPath = getFullCategoryPath(category.id);
      parentSearch.value = fullPath;
      parentCategoryName.value = category.name;
    }
  }

  // Add global escape key listener to close dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showParentList.value = false;
    }
  });

  // Listen for sidebar form submit
  sidebarSubmitHandler = () => {
    submitForm();
  };
  window.addEventListener('sidebarFormSubmit', sidebarSubmitHandler);
});

onUnmounted(() => {
  if (sidebarSubmitHandler) {
    window.removeEventListener('sidebarFormSubmit', sidebarSubmitHandler);
  }
});

// Watch form processing state and notify sidebar
watch(
  () => form.processing,
  (processing) => {
    window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing } }));
  }
);

/**
 * Handle input focus event
 */
const handleFocus = () => {
  clearTimeout(dropdownTimer.value);
  if (filteredCategories.value.length > 0) {
    showParentList.value = true;
  }
};

/**
 * Handle input blur event
 */
const handleBlur = () => {
  dropdownTimer.value = setTimeout(() => {
    showParentList.value = false;
  }, 100);
};

/**
 * Handle parent category search input
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
 * Submit form to update category
 */
const submitForm = () => {
  const hasErrors = validateForm();

  if (!hasErrors) {
    form.put(route('categories.update', { category: currentCategory.value.id }), {
      onSuccess: () => {
        router.visit(route('categories.index'));
      },
      onError: (serverErrors) => {
        Object.assign(errors.value, serverErrors);
        scrollToError();
      },
    });
  }
};

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

// Kategori silme
const deleteCategory = (categoryId) => {
  if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
    form
      .delete(route('categories.destroy', { category: categoryId }))
      .then(() => {
        console.log('Kategori başarıyla silindi');
      })
      .catch((error) => {
        console.error('Kategori silinirken hata:', error);
      });
  }
};
</script>
