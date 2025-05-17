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
            <!-- RichTextEditor component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">İçerik</span>
              </label>

              <div class="relative">
                <div
                  ref="quillEditor"
                  class="min-h-[300px] rounded border border-base-300 bg-base-100 p-3"
                  :class="{ 'border-error': errors.content || form.errors.content }"
                  style="height: 400px"
                ></div>

                <!-- Yükleme göstergesi -->
                <div
                  v-if="editorLoading"
                  class="upload-loading-overlay bg-base-100/50 absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div class="flex flex-col items-center gap-2">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                    <span class="text-sm">Resim yükleniyor...</span>
                  </div>
                </div>
              </div>

              <label v-if="errors.content || form.errors.content" class="label">
                <span class="label-text-alt text-error">{{ errors.content || form.errors.content }}</span>
              </label>

              <!-- Toast bildirim komponenti -->
              <div class="toast toast-end z-50" v-if="showToast">
                <div :class="`alert ${toastType}`">
                  <span>{{ toastMessage }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Durumu</span>
            </label>
            <select
              v-model="form.status"
              class="select-bordered select w-full bg-base-100 text-neutral-content"
              :class="{ 'select-error': errors.status || form.errors.status }"
            >
              <option value="draft">Şablon</option>
              <option value="published">Yayında</option>
              <option value="private">Gizli</option>
            </select>
            <label v-if="errors.status || form.errors.status" class="label">
              <span class="label-text-alt text-error">{{ errors.status || form.errors.status }}</span>
            </label>
          </div>

          <div>
            <label class="label">
              <span class="label-text">Kategori</span>
            </label>
            <select
              v-model="form.category_id"
              class="select-bordered select w-full bg-base-100 text-neutral-content"
              :class="{ 'select-error': errors.category_id || form.errors.category_id }"
            >
              <option value="" disabled>Kategori seç</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <label v-if="errors.category_id || form.errors.category_id" class="label">
              <span class="label-text-alt text-error">{{ errors.category_id || form.errors.category_id }}</span>
            </label>
          </div>

          <div>
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Kapak Resmi URL</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="form.cover_image"
                  @input="form.cover_image = $event.target.value"
                  placeholder="https://example.com/image.jpg"
                  class="input-bordered input w-full"
                  :class="{ 'input-error': errors.cover_image || form.errors.cover_image }"
                />
              </div>
              <label v-if="errors.cover_image || form.errors.cover_image" class="label">
                <span class="label-text-alt text-error">{{ errors.cover_image || form.errors.cover_image }}</span>
              </label>
            </div>
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
          <!-- Button component implemented directly -->
          <button
            type="submit"
            class="btn btn-primary"
            :class="{ loading: form.processing }"
            :disabled="form.processing"
          >
            Yazıyı Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '@/Shared/Css/quill-custom-styles.css';
import axios from 'axios';
import { debounce } from 'lodash';

// Component name definition for dev tools
defineOptions({
  name: 'WriteCreateForm',
});

// Get categories from page props
const { props } = usePage();
const categories = ref(props.categories);

// Initialize form with default values
const form = useForm({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: 'draft',
  category_id: '',
  cover_image: '',
  seo_keywords: '',
  meta_description: '',
  tags: '',
  views_count: 0,
  hasDraw: false,
});

// Form validation errors
const errors = ref({
  title: '',
  slug: '',
  content: '',
  published_at: '',
  summary: '',
  status: '',
  category_id: '',
  cover_image: '',
  seo_keywords: '',
  meta_description: '',
  tags: '',
});

// Tarih ve zaman parçaları için ayrı bir obje
const publishDateObj = ref({
  date: '',
  time: '',
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

// Client-side form validation
const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.published_at =
    publishDateObj.value.date && publishDateObj.value.time ? '' : 'Yayınlama tarihi zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';

  // Tüm doğrulamalar geçtiyse published_at formatını düzelt
  if (!errors.value.published_at) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  }
};

// Submit form handler
const submitForm = () => {
  validateForm();

  // Only submit if there are no validation errors
  if (!Object.values(errors.value).some((error) => error !== '')) {
    // Get a fresh CSRF token before submitting
    axios.get('/sanctum/csrf-cookie').then(() => {
      form.post(route('writes.store'), {
        onSuccess: () => {
          router.visit(route('dashboard'));
        },
        onError: (errors) => {
          // If still getting a 419 error, try to refresh the page and resubmit
          if (errors.hasOwnProperty('token') || errors.message === 'CSRF token mismatch') {
            window.location.reload();
          } else {
            console.error('Form submission errors:', errors);
          }
        },
      });
    });
  }
};

// Auto-generate slug from title
watch(
  () => form.title,
  (newTitle) => {
    if (!form.slug || form.slug === '') {
      form.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  }
);

// RichTextEditor implementation
const quillEditor = ref(null);
let quill;
let isInitialContentSet = false;
const editorLoading = ref(false);
const errorMessage = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('alert-info');

// Define colors compatible with DaisyUI theme
const daisyColors = [
  '#570DF8', // primary
  '#F000B8', // secondary
  '#37CDBE', // accent
  '#3ABFF8', // info
  '#36D399', // success
  '#FBBD23', // warning
  '#F87272', // error
  '#1f2937', // neutral
  '#2A303C', // base-100
  '#ffffff', // white
  '#000000', // black
];

/**
 * Display toast notification with auto-dismiss
 *
 * @param {string} message - Message to display
 * @param {string} type - Alert type (alert-info, alert-success, etc.)
 */
const showToastMessage = (message, type = 'alert-info') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  // Auto-dismiss toast after 3 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

/**
 * Custom image handler for Quill editor
 * Opens file selector and uploads selected image
 */
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  // Handle file selection
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showToastMessage('Only JPEG, PNG or GIF formats are supported.', 'alert-error');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToastMessage('Image size must be less than 10MB.', 'alert-error');
      return;
    }

    editorLoading.value = true;
    errorMessage.value = '';

    try {
      // Insert a placeholder skeleton while image uploads
      const range = quill.getSelection();
      const placeholderId = 'img-loading-' + Date.now();

      // Create placeholder with loading animation
      const placeholderHtml = `
        <div id="${placeholderId}" class="skeleton-placeholder w-full my-4">
          <div class="skeleton h-32 w-full rounded-lg"></div>
          <div class="flex justify-center mt-2">
            <span class="loading loading-dots loading-md"></span>
          </div>
        </div>
      `;

      // Insert placeholder HTML at cursor position
      quill.clipboard.dangerouslyPasteHTML(range.index, placeholderHtml);

      // Prepare and send upload request
      const formData = new FormData();
      formData.append('image', file);

      // Ensure we have the latest CSRF token
      const csrf = document.head.querySelector('meta[name="csrf-token"]');
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      if (csrf) {
        headers['X-CSRF-TOKEN'] = csrf.getAttribute('content');
      }

      const response = await axios.post('/image-upload', formData, {
        headers,
        withCredentials: true,
      });

      // Handle successful upload
      if (response.data.success && response.data.url) {
        // Find and remove placeholder
        const placeholderElement = document.getElementById(placeholderId);
        if (placeholderElement) {
          const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
          quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);

          // Insert actual image at placeholder position
          quill.insertEmbed(placeholderIndex, 'image', response.data.url);
        } else {
          // If placeholder not found, insert at current cursor position
          quill.insertEmbed(range.index, 'image', response.data.url);
        }
        showToastMessage('Image uploaded successfully', 'alert-success');
      } else {
        // Handle failed upload
        const placeholderElement = document.getElementById(placeholderId);
        if (placeholderElement) {
          const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
          quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);
        }
        console.error('Image upload failed');
        showToastMessage('Error uploading image.', 'alert-error');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      showToastMessage('Error uploading image: ' + (error.response?.data?.message || error.message), 'alert-error');
    } finally {
      editorLoading.value = false;
    }
  };
};

onMounted(() => {
  // Initialize Quill editor with custom configuration
  quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: daisyColors }, { background: daisyColors }],
          [{ font: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          // Custom image upload handler
          image: imageHandler,
        },
      },
    },
    placeholder: 'Write content here...',
    bounds: quillEditor.value,
    // Remove limits for larger content
    maxLength: Infinity,
  });

  // Update form content when editor changes
  quill.on('text-change', () => {
    try {
      const content = quill.root.innerHTML;
      form.content = content;
    } catch (error) {
      console.error('Content update error:', error);
    }
  });

  // Load initial content with slight delay for stability
  setTimeout(() => {
    if (form.content && !isInitialContentSet) {
      try {
        quill.root.innerHTML = form.content;
        isInitialContentSet = true;
      } catch (error) {
        console.error('Initial content load error:', error);
      }
    }
  }, 100);

  // Set editor height
  quillEditor.value.style.height = '400px';

  // Apply additional styles
  if (quillEditor.value) {
    quillEditor.value.classList.add('daisy-quill-editor');
  }
});

// Update editor when form.content changes (with debounce)
let debounceTimer = null;
watch(
  () => form.content,
  (newValue) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (quill && newValue !== quill.root.innerHTML) {
        try {
          quill.root.innerHTML = newValue || '';
        } catch (error) {
          console.error('Content update error in watcher:', error);
        }
      }
    }, 300);
  }
);

// Bellekten temizlik
onUnmounted(() => {
  if (quill) {
    quill = null;
  }
});
</script>

<style>
/* Sadece overlay için gerekli stil */
.upload-loading-overlay {
  backdrop-filter: blur(2px);
}
</style>
