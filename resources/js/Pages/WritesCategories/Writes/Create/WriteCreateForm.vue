<template>
  <!-- Form component implemented directly -->
  <div class="card">
    <div class="card-body p-6">
      <!-- Header with optional icon and title -->
      <div class="card-title flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- Icon slot -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <h2 class="text-gray-800 dark:text-white">Yeni Yazı Oluştur</h2>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="md:col-span-2">
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Başlık</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="form.title"
                  @input="form.title = $event.target.value"
                  placeholder="Yazının başlığını girin"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.title || form.errors.title }"
                />
              </div>
              <label v-if="errors.title || form.errors.title" class="label">
                <span class="label-text-alt text-error">{{ errors.title || form.errors.title }}</span>
              </label>
            </div>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Slug</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="form.slug"
                  @input="form.slug = $event.target.value"
                  placeholder="örnek-yazı-slug"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.slug || form.errors.slug }"
                />
              </div>
              <label v-if="errors.slug || form.errors.slug" class="label">
                <span class="label-text-alt text-error">{{ errors.slug || form.errors.slug }}</span>
              </label>
            </div>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Yayınlama Tarihi</span>
              </label>
              <div class="flex space-x-2">
                <input
                  type="date"
                  v-model="publishDateObj.date"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.published_at || form.errors.published_at }"
                />
                <input
                  type="time"
                  v-model="publishDateObj.time"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.published_at || form.errors.published_at }"
                />
              </div>
              <label v-if="errors.published_at || form.errors.published_at" class="label">
                <span class="label-text-alt text-error">{{ errors.published_at || form.errors.published_at }}</span>
              </label>
            </div>
          </div>

          <div class="md:col-span-2">
            <!-- TextField component implemented directly (textarea) -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Özet</span>
              </label>
              <div class="relative">
                <textarea
                  :value="form.summary"
                  @input="form.summary = $event.target.value"
                  placeholder="Yazının kısa özeti"
                  rows="3"
                  class="textarea-bordered textarea w-full"
                  :class="{ 'textarea-error': errors.summary || form.errors.summary }"
                ></textarea>
              </div>
              <label v-if="errors.summary || form.errors.summary" class="label">
                <span class="label-text-alt text-error">{{ errors.summary || form.errors.summary }}</span>
              </label>
            </div>
          </div>

          <div class="md:col-span-2">
            <!-- RichTextEditor component merkezi olarak kullanılıyor -->
            <RichTextEditor
              v-model="form.content"
              label="İçerik"
              :error="errors.content || form.errors.content"
              placeholder="İçeriği buraya yazın..."
              height="400px"
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text">Durumu</span>
            </label>
            <div class="dropdown w-full">
              <div class="relative">
                <input
                  type="text"
                  v-model="statusSearch"
                  @input="filterStatus"
                  placeholder="Durum seçin veya arayın..."
                  class="input-bordered input w-full pr-10"
                  :class="{ 'input-error': errors.status || form.errors.status }"
                  tabindex="0"
                />
                <button
                  v-if="statusSearch"
                  @click="clearStatus"
                  class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                >
                  ✕
                </button>
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu z-[1] max-h-60 w-full overflow-y-auto rounded-box bg-base-100 p-2 shadow"
                v-if="filteredStatuses.length > 0"
              >
                <li v-for="status in filteredStatuses" :key="status.value">
                  <a @click="selectStatus(status)">{{ status.label }}</a>
                </li>
              </ul>
            </div>
            <label v-if="errors.status || form.errors.status" class="label">
              <span class="label-text-alt text-error">{{ errors.status || form.errors.status }}</span>
            </label>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Kategori</span>
            </label>
            <div class="dropdown w-full">
              <div class="relative">
                <input
                  type="text"
                  v-model="categorySearch"
                  @input="filterCategories"
                  placeholder="Kategori seçin veya arayın..."
                  class="input-bordered input w-full pr-10"
                  :class="{ 'input-error': errors.category_id || form.errors.category_id }"
                  tabindex="0"
                />
                <button
                  v-if="categorySearch"
                  @click="clearCategory"
                  class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                >
                  ✕
                </button>
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu z-[1] max-h-60 w-full overflow-y-auto rounded-box bg-base-100 p-2 shadow"
                v-if="filteredCategories && filteredCategories.length > 0"
              >
                <li v-for="category in filteredCategories" :key="category.id">
                  <a @click="selectCategory(category)">{{ category.name }}</a>
                </li>
              </ul>
            </div>
            <label v-if="errors.category_id || form.errors.category_id" class="label">
              <span class="label-text-alt text-error">{{ errors.category_id || form.errors.category_id }}</span>
            </label>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Etiketler</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="form.tags"
                  @input="form.tags = $event.target.value"
                  placeholder="etiket1, etiket2, etiket3"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.tags || form.errors.tags }"
                />
              </div>
              <label v-if="errors.tags || form.errors.tags" class="label">
                <span class="label-text-alt text-error">{{ errors.tags || form.errors.tags }}</span>
              </label>
            </div>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">SEO Anahtar Kelimeleri</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="form.seo_keywords"
                  @input="form.seo_keywords = $event.target.value"
                  placeholder="anahtar1, anahtar2, anahtar3"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.seo_keywords || form.errors.seo_keywords }"
                />
              </div>
              <label v-if="errors.seo_keywords || form.errors.seo_keywords" class="label">
                <span class="label-text-alt text-error">{{ errors.seo_keywords || form.errors.seo_keywords }}</span>
              </label>
            </div>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">SEO Meta Açıklaması</span>
              </label>
              <div class="relative">
                <textarea
                  :value="form.meta_description"
                  @input="form.meta_description = $event.target.value"
                  placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)"
                  class="textarea-bordered textarea w-full"
                  :class="{ 'textarea-error': errors.meta_description || form.errors.meta_description }"
                  maxlength="160"
                  rows="2"
                ></textarea>
                <div class="mt-1 text-xs text-gray-500">{{ form.meta_description?.length || 0 }}/160</div>
              </div>
              <label v-if="errors.meta_description || form.errors.meta_description" class="label">
                <span class="label-text-alt text-error">{{
                  errors.meta_description || form.errors.meta_description
                }}</span>
              </label>
              <div class="mt-1 text-xs text-gray-500">
                <span
                  >İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span
                >
              </div>
            </div>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Görüntülenme Sayısı</span>
              </label>
              <div class="relative">
                <input
                  type="number"
                  :value="form.views_count"
                  @input="form.views_count = $event.target.value"
                  class="input-bordered input w-full"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="form.hasDraw" class="checkbox checkbox-neutral" />
              <span class="label-text">Çizim İçerir</span>
            </label>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex justify-end space-x-3">
          <!-- Reset button -->
          <button type="button" @click="resetForm" class="btn btn-outline" :disabled="form.processing">Sıfırla</button>

          <!-- Button component implemented directly -->
          <button
            type="submit"
            class="btn btn-primary"
            :class="{ loading: form.processing }"
            :disabled="form.processing || !form.title || !form.slug || !form.content || !form.category_id"
            :title="
              form.processing
                ? 'Kaydediliyor...'
                : !form.title || !form.slug || !form.content || !form.category_id
                  ? 'Lütfen gerekli alanları doldurun'
                  : 'Yazıyı kaydet'
            "
          >
            {{ form.processing ? 'Kaydediliyor...' : 'Yazıyı Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

// Component name definition for dev tools
defineOptions({
  name: 'WriteCreateForm',
});

// Get categories from page props
const { props } = usePage();
const categories = ref(props.categories || []);

// Initialize form with default values
const form = useForm({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: 'draft',
  category_id: '',
  seo_keywords: '',
  meta_description: '',
  tags: '',
  views_count: 0,
  hasDraw: false,
});

// Force reset processing state on form creation
form.processing = false;

// Form validation errors
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

// Tarih ve zaman parçaları için ayrı bir obje
const publishDateObj = ref({
  date: '',
  time: '',
});

// Status options with labels
const statusOptions = [
  { value: 'draft', label: 'Şablon' },
  { value: 'published', label: 'Yayında' },
  { value: 'private', label: 'Gizli' },
  { value: 'link_only', label: 'Sadece Link' },
];

// Search and filtered states
const statusSearch = ref('');
const categorySearch = ref('');
const filteredStatuses = ref(statusOptions);
const filteredCategories = ref(props.categories || []);

// Filter functions
const filterStatus = () => {
  const searchTerm = statusSearch.value.toLowerCase();
  filteredStatuses.value = statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
};

const filterCategories = () => {
  const searchTerm = categorySearch.value.toLowerCase();
  filteredCategories.value = props.categories.filter((category) => category.name.toLowerCase().includes(searchTerm));
};

// Selection functions
const selectStatus = (status) => {
  form.status = status.value;
  statusSearch.value = status.label;
  filteredStatuses.value = statusOptions;
};

const selectCategory = (category) => {
  form.category_id = category.id;
  categorySearch.value = category.name;
  filteredCategories.value = props.categories;
};

// Clear functions
const clearStatus = () => {
  statusSearch.value = '';
  form.status = '';
  filteredStatuses.value = statusOptions;
};

const clearCategory = () => {
  categorySearch.value = '';
  form.category_id = '';
  filteredCategories.value = props.categories;
};

// Initialize values if they exist
onMounted(() => {
  // Set initial status label
  const currentStatus = statusOptions.find((s) => s.value === form.status);
  if (currentStatus) {
    statusSearch.value = currentStatus.label;
  }

  // Set initial category name
  if (form.category_id) {
    const category = props.categories.find((c) => c.id === form.category_id);
    if (category) {
      categorySearch.value = category.name;
    }
  }
});

// Set current date and time as default when component is mounted
onMounted(() => {
  const now = new Date();
  publishDateObj.value.date = now.toISOString().split('T')[0];
  publishDateObj.value.time = now.toTimeString().slice(0, 5);
});

// publishDateObj değiştiğinde form.published_at'i güncelle
watch(
  publishDateObj.value,
  () => {
    if (publishDateObj.value.date && publishDateObj.value.time) {
      form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
    }
  },
  { deep: true }
);

const LOCAL_STORAGE_KEY = 'write_create_form';

// Formu localStorage'a kaydet
watch(
  form,
  (newVal) => {
    // Don't save processing state to localStorage
    const { processing, ...formData } = newVal;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  },
  { deep: true }
);

// Sayfa açıldığında localStorage'dan oku
onMounted(() => {
  // Force reset processing state
  form.processing = false;

  // Clear any existing processing state from localStorage
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Don't restore processing state from localStorage
      const { processing, ...formData } = parsed;

      // Only restore if we have actual form data (not just processing state)
      if (Object.keys(formData).length > 0 && (formData.title || formData.content || formData.category_id)) {
        Object.assign(form, formData);
      } else {
        // Clear localStorage if it only contains processing state
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  // Ensure processing is false
  form.processing = false;

  // Debug: Check form state
  console.log('Form mounted. Processing:', form.processing);
  console.log('Form data:', form.data());
});

// Client-side form validation
const validateForm = () => {
  // Reset all errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });

  // Required fields
  if (!form.title || form.title.trim() === '') {
    errors.value.title = 'Başlık zorunludur.';
  }

  if (!form.slug || form.slug.trim() === '') {
    errors.value.slug = 'Slug zorunludur.';
  }

  if (!form.content || form.content.trim() === '') {
    errors.value.content = 'İçerik zorunludur.';
  }

  if (!form.category_id) {
    errors.value.category_id = 'Kategori seçilmelidir.';
  }

  // Optional fields with warnings
  if (!form.summary || form.summary.trim() === '') {
    errors.value.summary = 'Özet önerilir (opsiyonel).';
  }

  // Handle published_at
  if (publishDateObj.value.date && publishDateObj.value.time) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  } else {
    form.published_at = null; // Make it optional
  }

  console.log('Validation completed. Errors:', errors.value);
};

// Submit form handler
const submitForm = () => {
  validateForm();

  // Debug: Log validation errors
  console.log('Form errors:', errors.value);
  console.log('Form data:', form.data());
  console.log('Publish date obj:', publishDateObj.value);

  // Only submit if there are no critical validation errors
  const criticalErrors = ['title', 'slug', 'content', 'category_id'];
  const hasCriticalErrors = criticalErrors.some((field) => errors.value[field] !== '');

  if (!hasCriticalErrors) {
    form.post(route('writes.store'), {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Temizle
        router.visit(route('dashboard'));
      },
      onError: (errors) => {
        console.log('Server errors:', errors);
      },
    });
  } else {
    console.log('Form validation failed - critical errors present');
  }
};

// Reset form function
const resetForm = () => {
  form.reset();
  form.processing = false; // Ensure processing is reset
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });
  publishDateObj.value = { date: '', time: '' };
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  console.log('Form reset completed');
};

// Auto-generate slug from title
watch(
  () => form.title,
  (newTitle) => {
    // Turkish character mapping
    const turkishToEnglish = {
      ı: 'i',
      İ: 'i',
      ğ: 'g',
      Ğ: 'g',
      ü: 'u',
      Ü: 'u',
      ş: 's',
      Ş: 's',
      ö: 'o',
      Ö: 'o',
      ç: 'c',
      Ç: 'c',
    };

    // Convert Turkish characters to English
    let slug = newTitle;
    Object.entries(turkishToEnglish).forEach(([turkish, english]) => {
      slug = slug.replace(new RegExp(turkish, 'g'), english);
    });

    // Convert to lowercase and replace special characters
    form.slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove all special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }
);
</script>

<style>
/* Sadece overlay için gerekli stil */
.upload-loading-overlay {
  backdrop-filter: blur(2px);
}
</style>
