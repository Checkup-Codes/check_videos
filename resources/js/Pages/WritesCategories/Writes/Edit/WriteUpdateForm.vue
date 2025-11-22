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
            <label class="mb-2 block text-sm font-medium text-foreground">Kategori</label>
            <select
              v-model="form.category_id"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id,
              }"
            >
              <option value="" disabled>Kategori seç</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-sm text-destructive">
              {{ errors.category_id || form.errors.category_id }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-foreground">Durumu</label>
            <select
              v-model="form.status"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.status || form.errors.status }"
            >
              <option value="draft">Şablon</option>
              <option value="published">Yayında</option>
              <option value="private">Gizli</option>
              <option value="link_only">Sadece Link</option>
            </select>
            <p v-if="errors.status || form.errors.status" class="mt-1 text-sm text-destructive">
              {{ errors.status || form.errors.status }}
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
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

defineOptions({
  name: 'WriteUpdateForm',
});

const { props } = usePage();
const categories = ref(props.categories);
const writeData = ref(props.write);

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

onMounted(() => {
  if (form.published_at) {
    const dateObj = new Date(form.published_at);
    if (!isNaN(dateObj.getTime())) {
      publishDateObj.value.date = dateObj.toISOString().split('T')[0];
      publishDateObj.value.time = dateObj.toTimeString().substring(0, 5);
    }
  }
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

watch(
  () => form.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      isSlugManuallyChanged = true;
    }
  }
);

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
