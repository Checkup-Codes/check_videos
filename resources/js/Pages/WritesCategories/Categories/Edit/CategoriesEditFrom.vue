<template>
  <div class="bg-base-100 mx-auto mt-10 w-full max-w-full px-5 lg:mt-0">
    <div class="container mx-auto p-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-primary">Kategori Düzenle</h2>
          <p class="text-sm opacity-80">
            Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz.
          </p>

          <div class="divider"></div>

          <form @submit.prevent="updateCategory">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">İsim</span>
              </label>
              <input type="text" v-model="form.name" class="input input-bordered w-full" placeholder="Kategori ismi" />
              <label v-if="form.errors.name" class="label">
                <span class="label-text-alt text-error">{{ form.errors.name }}</span>
              </label>
            </div>

            <div class="form-control mt-4 w-full">
              <label class="label">
                <span class="label-text">Slug</span>
              </label>
              <input type="text" v-model="form.slug" class="input input-bordered w-full" placeholder="kategori-slug" />
              <label v-if="form.errors.slug" class="label">
                <span class="label-text-alt text-error">{{ form.errors.slug }}</span>
              </label>
            </div>

            <div class="form-control mt-4 w-full">
              <label class="label">
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
                  class="input input-bordered w-full"
                  placeholder="Üst kategori ara"
                />

                <div v-if="showParentList && filteredCategories.length > 0" class="absolute z-30 mt-1 w-full">
                  <ul
                    class="menu bg-base-100 rounded-box border-base-300 max-h-60 w-full overflow-y-auto border p-2 shadow-lg"
                  >
                    <li v-for="category in filteredCategories" :key="category.id">
                      <a
                        @mousedown="selectParentCategory(category)"
                        class="hover:bg-primary hover:text-primary-content"
                      >
                        {{ category.name }}
                      </a>
                    </li>
                  </ul>
                </div>

                <div v-if="form.parent_id" class="mt-2 flex items-center">
                  <div class="badge badge-primary">{{ parentCategoryName }}</div>
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
              <label v-if="form.errors.parent_id" class="label">
                <span class="label-text-alt text-error">{{ form.errors.parent_id }}</span>
              </label>
            </div>

            <div class="form-control mt-4 w-full">
              <label class="label">
                <span class="label-text">Durum</span>
              </label>
              <select v-model="form.status" class="select select-bordered w-full">
                <option value="public">Açık</option>
                <option value="hidden">Gizli</option>
              </select>
              <label v-if="form.errors.status" class="label">
                <span class="label-text-alt text-error">{{ form.errors.status }}</span>
              </label>
            </div>

            <div class="mt-6 flex justify-between">
              <button type="button" @click="deleteCategory(props.category.id)" class="btn btn-error btn-outline">
                Kategoriyi Sil
              </button>
              <button type="submit" class="btn btn-primary" :disabled="form.processing || isFormDisabled">
                <span v-if="form.processing" class="loading loading-spinner loading-sm"></span>
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

const { props } = usePage();

// Mevcut kategoriler ve düzenlenen kategori
const categories = ref(props.categories || []);
const currentCategory = ref(props.category || {});

// Form verileri
const form = useForm({
  name: currentCategory.value.name || '',
  slug: currentCategory.value.slug || '',
  parent_id: currentCategory.value.parent_id || null,
  status: currentCategory.value.status || 'public',
});

// Parent kategori arama ve seçme
const parentSearch = ref(props.category.parent?.name || '');
const parentCategoryName = ref(props.category.parent?.name || '');
const showParentList = ref(false);
const isLoading = ref(false);
const dropdownTimer = ref(null);

// Focus ve blur işlemleri
const handleFocus = () => {
  clearTimeout(dropdownTimer.value);
  if (filteredCategories.value.length > 0) {
    showParentList.value = true;
  }
};

const handleBlur = () => {
  dropdownTimer.value = setTimeout(() => {
    showParentList.value = false;
  }, 100);
};

// Filtrelenmiş kategoriler - kendisi hariç
const filteredCategories = computed(() => {
  if (!categories.value || categories.value.length === 0) return [];

  return categories.value.filter(
    (category) =>
      category &&
      category.id !== currentCategory.value.id &&
      (!parentSearch.value || (category.name && category.name.toLowerCase().includes(parentSearch.value.toLowerCase())))
  );
});

// Form durumu
const isFormDisabled = computed(() => {
  return !form.name || !form.slug;
});

// Üst kategori araması
const handleParentSearch = () => {
  if (parentSearch.value.length >= 1) {
    showParentList.value = true;
  } else if (parentSearch.value === '') {
    form.parent_id = null;
  }
};

// Üst kategori seçme
const selectParentCategory = (category) => {
  if (!category || !category.id || category.id === currentCategory.value.id) return;

  form.parent_id = category.id;
  parentSearch.value = category.name;
  parentCategoryName.value = category.name;
  nextTick(() => {
    showParentList.value = false;
  });
};

// Üst kategoriyi temizleme
const clearParentCategory = () => {
  form.parent_id = null;
  parentSearch.value = '';
  parentCategoryName.value = '';
};

// Slug oluşturma
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

// Kategori güncelleme
const updateCategory = () => {
  form
    .put(route('categories.update', { category: currentCategory.value.id }))
    .then(() => {
      console.log('Kategori başarıyla güncellendi');
    })
    .catch((error) => {
      console.error('Kategori güncellenirken hata:', error);
    });
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

// Component yüklendiğinde kategorileri getir
onMounted(() => {
  if (!categories.value || categories.value.length === 0) {
    fetchCategories();
  }

  // Escape tuşu ile dropdownı kapatma için global listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showParentList.value = false;
    }
  });
});

// Kategorileri getir
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
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.categories) {
      categories.value = data.categories;
      console.log('Kategoriler yüklendi:', categories.value.length);
    }
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
