<template>
  <!-- Form component implemented directly -->
  <div
    class="card mx-auto max-w-4xl border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
  >
    <div class="card-body p-6">
      <!-- Header with title and icon -->
      <div class="card-title flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <h2 class="text-gray-800 dark:text-white">Yazıyı Güncelle</h2>
        </div>
      </div>

      <form @submit.prevent="updateWrite" class="space-y-6">
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
                  v-model="form.title"
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
                  v-model="form.slug"
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

          <div class="md:col-span-2">
            <!-- TextField component (textarea) implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Özet</span>
              </label>
              <div class="relative">
                <textarea
                  v-model="form.summary"
                  rows="3"
                  placeholder="Yazının kısa özeti"
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
              <span class="label-text">Kategori</span>
            </label>
            <select
              v-model="form.category_id"
              class="select-bordered select w-full"
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
            <label class="label">
              <span class="label-text">Durumu</span>
            </label>
            <select
              v-model="form.status"
              class="select-bordered select w-full"
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
            <!-- TextField component implemented directly -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Kapak Resmi URL</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="form.cover_image"
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
                  v-model="form.tags"
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
                  v-model="form.seo_keywords"
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
                  v-model="form.meta_description"
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
                <input type="number" v-model="form.views_count" class="input-bordered input w-full" readonly />
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="form.hasDraw" class="checkbox checkbox-primary" />
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
            Güncelle
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
  name: 'WriteUpdateForm',
});

// Get data from page props
const { props } = usePage();
const categories = ref(props.categories);
const writeData = ref(props.write);

// Initialize form with write data
const form = useForm({
  title: writeData.value.title || '',
  slug: writeData.value.slug || '',
  content: writeData.value.content || '',
  published_at: writeData.value.published_at || '',
  summary: writeData.value.summary || '',
  status: writeData.value.status || 'draft',
  category_id: writeData.value.category_id || '',
  cover_image: writeData.value.cover_image || '',
  seo_keywords: writeData.value.seo_keywords || '',
  meta_description: writeData.value.meta_description || '',
  tags: writeData.value.tags || '',
  views_count: writeData.value.views_count || 0,
  hasDraw: writeData.value.hasDraw || false,
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

// Client-side form validation
const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.published_at = form.published_at ? '' : 'Yayınlama tarihi zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';
};

// Submit form and update write
const updateWrite = () => {
  validateForm();

  // Only submit if there are no validation errors
  if (!Object.values(errors.value).some((error) => error !== '')) {
    form.put(route('writes.update', { write: writeData.value.slug }), {
      onSuccess: () => {
        router.visit(route('writes.show', { write: form.slug }));
      },
    });
  }
};

// Auto-update slug from title if it hasn't been manually changed
let isSlugManuallyChanged = true;

watch(
  () => form.title,
  (newTitle) => {
    if (!isSlugManuallyChanged) {
      form.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  }
);

// Watch for manual changes to slug field
watch(
  () => form.slug,
  (newSlug, oldSlug) => {
    // If slug is changed to something other than auto-generated from title
    if (newSlug !== oldSlug) {
      isSlugManuallyChanged = true;
    }
  }
);

// Reset slug manual change flag if slug is cleared
watch(
  () => form.slug,
  (newSlug) => {
    if (newSlug === '') {
      isSlugManuallyChanged = false;
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

// DaisyUI ile uyumlu renkleri tanımlayalım
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

// Toast gösterme fonksiyonu
const showToastMessage = (message, type = 'alert-info') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  // Toast'ı 3 saniye sonra kapat
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Resim yükleme için handler oluşturalım
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  // Dosya seçildiğinde
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    // Dosya kontrolü
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showToastMessage('Sadece JPEG, PNG veya GIF formatları desteklenmektedir.', 'alert-error');
      return;
    }

    // Dosya boyutu kontrolü (10MB maksimum)
    if (file.size > 10 * 1024 * 1024) {
      showToastMessage("Resim boyutu 10MB'dan küçük olmalıdır.", 'alert-error');
      return;
    }

    editorLoading.value = true;
    errorMessage.value = '';

    try {
      // Önce bir placeholder skeleton ekle
      const range = quill.getSelection();
      // Benzersiz bir ID oluştur
      const placeholderId = 'img-loading-' + Date.now();

      // Özel bir div oluştur ve içine skeleton ekle (HTML olarak)
      const placeholderHtml = `
        <div id="${placeholderId}" class="skeleton-placeholder w-full my-4">
          <div class="skeleton h-32 w-full rounded-lg"></div>
          <div class="flex justify-center mt-2">
            <span class="loading loading-dots loading-md"></span>
          </div>
        </div>
      `;

      // HTML olarak placeholder ekle
      quill.clipboard.dangerouslyPasteHTML(range.index, placeholderHtml);

      // Resmi yükleme endpoint'ine gönder
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/image-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Resim başarıyla yüklendiyse
      if (response.data.success && response.data.url) {
        // Placeholder'ı bul ve kaldır
        const placeholderElement = document.getElementById(placeholderId);
        if (placeholderElement) {
          const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
          quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);

          // Editöre resmi URL olarak ekle
          quill.insertEmbed(placeholderIndex, 'image', response.data.url);
        } else {
          // Placeholder bulunamazsa, mevcut konuma ekle
          quill.insertEmbed(range.index, 'image', response.data.url);
        }
        showToastMessage('Resim başarıyla yüklendi', 'alert-success');
      } else {
        // Yükleme başarısız olursa placeholder'ı kaldır
        const placeholderElement = document.getElementById(placeholderId);
        if (placeholderElement) {
          const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
          quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);
        }
        console.error('Resim yüklenemedi');
        showToastMessage('Resim yüklenirken bir hata oluştu.', 'alert-error');
      }
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      showToastMessage(
        'Resim yüklenirken bir hata oluştu: ' + (error.response?.data?.message || error.message),
        'alert-error'
      );
    } finally {
      editorLoading.value = false;
    }
  };
};

onMounted(() => {
  // Editörü özelleştirilmiş yapılandırmayla başlat
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
          // Özel resim yükleme handler'ı
          image: imageHandler,
        },
      },
    },
    placeholder: 'İçeriği buraya yazın...',
    bounds: quillEditor.value,
    // Daha büyük içerikler için sınırlamaları kaldır
    maxLength: Infinity,
  });

  // İçerik değiştiğinde emit
  quill.on('text-change', () => {
    try {
      // İçeriği güncelle
      const content = quill.root.innerHTML;
      form.content = content;
    } catch (error) {
      console.error('Content update error:', error);
    }
  });

  // İlk içeriği yükle - timeout kullanarak daha güvenli yükle
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

  // Editörün yüksekliğini ayarla
  quillEditor.value.style.height = '400px';

  // Stil ayarlamalarını sonradan ekleyelim
  if (quillEditor.value) {
    quillEditor.value.classList.add('daisy-quill-editor');
  }
});

// form.content değiştiğinde editörü güncelle - debounce ekle
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
