<template>
  <!-- Form component implemented directly -->
  <div class="card">
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
              <option value="link_only">Sadece Link</option>
            </select>
            <label v-if="errors.status || form.errors.status" class="label">
              <span class="label-text-alt text-error">{{ errors.status || form.errors.status }}</span>
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
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

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
  seo_keywords: '',
  meta_description: '',
  tags: '',
});

// Tarih ve zaman parçaları için ayrı bir obje
const publishDateObj = ref({
  date: '',
  time: '',
});

// Form verilerini başlatırken, eğer published_at değeri varsa parçalara ayır
onMounted(() => {
  if (form.published_at) {
    const dateObj = new Date(form.published_at);
    if (!isNaN(dateObj.getTime())) {
      publishDateObj.value.date = dateObj.toISOString().split('T')[0];
      publishDateObj.value.time = dateObj.toTimeString().substring(0, 5);
    }
  }
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
</script>

<style>
/* Sadece overlay için gerekli stil */
.upload-loading-overlay {
  backdrop-filter: blur(2px);
}
</style>
