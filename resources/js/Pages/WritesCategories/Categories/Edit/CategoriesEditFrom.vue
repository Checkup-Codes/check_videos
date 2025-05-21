<template>
  <div class="mx-auto mt-6 w-full max-w-full bg-base-100 px-3 sm:px-5 lg:mt-0">
    <div class="container mx-auto p-0 sm:p-4">
      <div class="card border border-base-200 bg-base-100 shadow-md">
        <div class="card-body p-4 sm:p-6">
          <h2 class="card-title text-primary">Kategori Düzenle</h2>
          <p class="text-xs opacity-70 sm:text-sm">
            Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz.
          </p>

          <div class="divider my-3"></div>

          <form @submit.prevent="updateCategory">
            <div class="form-control w-full">
              <label class="label py-1.5">
                <span class="label-text">İsim</span>
              </label>
              <input type="text" v-model="form.name" class="input-bordered input w-full" placeholder="Kategori ismi" />
              <label v-if="form.errors.name" class="label py-1">
                <span class="label-text-alt text-error">{{ form.errors.name }}</span>
              </label>
            </div>

            <div class="form-control mt-3 w-full">
              <label class="label py-1.5">
                <span class="label-text">Slug</span>
              </label>
              <input type="text" v-model="form.slug" class="input-bordered input w-full" placeholder="kategori-slug" />
              <label v-if="form.errors.slug" class="label py-1">
                <span class="label-text-alt text-error">{{ form.errors.slug }}</span>
              </label>
            </div>

            <div class="form-control mt-3 w-full">
              <label class="label py-1.5">
                <span class="label-text">Üst Kategori</span>
              </label>
              <div class="relative w-full">
                <input
                  type="text"
                  v-model="parentSearch"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @input="handleParentSearch"
                  @keydown.esc="showParentList = false"
                  class="input-bordered input w-full"
                  placeholder="Üst kategori ara"
                />

                <div v-if="showParentList && filteredCategories.length > 0" class="absolute z-30 mt-1 w-full">
                  <ul
                    class="menu max-h-60 w-full overflow-y-auto rounded-box border border-base-200 bg-base-100 p-2 shadow-md"
                  >
                    <li v-for="category in filteredCategories" :key="category.id">
                      <a @mousedown="selectParentCategory(category)" class="py-2 text-sm hover:bg-base-200">
                        {{ category.name }}
                      </a>
                    </li>
                  </ul>
                </div>

                <div v-if="form.parent_id" class="mt-2 flex items-center">
                  <div class="badge badge-sm">{{ parentCategoryName }}</div>
                  <button
                    type="button"
                    @click="clearParentCategory"
                    class="btn btn-ghost btn-xs ml-2"
                    aria-label="Üst kategoriyi kaldır"
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
              <label v-if="form.errors.parent_id" class="label py-1">
                <span class="label-text-alt text-error">{{ form.errors.parent_id }}</span>
              </label>
            </div>

            <div class="form-control mt-3 w-full">
              <label class="label py-1.5">
                <span class="label-text">Durum</span>
              </label>
              <select v-model="form.status" class="select-bordered select w-full">
                <option value="public">Açık</option>
                <option value="hidden">Gizli</option>
              </select>
              <label v-if="form.errors.status" class="label py-1">
                <span class="label-text-alt text-error">{{ form.errors.status }}</span>
              </label>
            </div>

            <div class="mt-5 flex flex-col justify-between gap-3 sm:flex-row">
              <button
                type="button"
                @click="deleteCategory(props.category.id)"
                class="btn btn-error btn-outline btn-sm order-2 sm:btn-md sm:order-1"
              >
                Kategoriyi Sil
              </button>
              <button
                type="submit"
                class="btn btn-primary btn-sm order-1 sm:btn-md sm:order-2"
                :disabled="form.processing || isFormDisabled"
              >
                <span v-if="form.processing" class="loading loading-spinner loading-xs sm:loading-sm"></span>
                Kategoriyi Güncelle
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
 * Component name definition
 */
defineOptions({
  name: 'CategoriesEditFrom',
});

/**
 * Get data from page props
 */
const { props } = usePage();
const categories = ref(props.categories || []);
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

/**
 * Parent category state management
 */
const parentSearch = ref(props.category.parent?.name || '');
const parentCategoryName = ref(props.category.parent?.name || '');
const showParentList = ref(false);
const isLoading = ref(false);
const dropdownTimer = ref(null);

/**
 * Filter categories, excluding the current category
 * to prevent creating circular references
 */
const filteredCategories = computed(() => {
  if (!categories.value || categories.value.length === 0) return [];

  return categories.value.filter(
    (category) =>
      category &&
      category.id !== currentCategory.value.id &&
      (!parentSearch.value || (category.name && category.name.toLowerCase().includes(parentSearch.value.toLowerCase())))
  );
});

/**
 * Check if form is valid for submission
 */
const isFormDisabled = computed(() => {
  return !form.name || !form.slug;
});

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
 * Component lifecycle - setup on mount
 */
onMounted(() => {
  // Fetch categories if not provided
  if (!categories.value || categories.value.length === 0) {
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
  parentSearch.value = category.name;
  parentCategoryName.value = category.name;
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
const updateCategory = () => {
  form.put(route('categories.update', { category: currentCategory.value.id }));
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
    categories.value = data.categories || [];
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
