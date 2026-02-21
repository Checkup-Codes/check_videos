<template>
  <div class="space-y-4 py-6">
    <form @submit.prevent="updateWrite" class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="md:col-span-2" ref="titleRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Başlık</label>
          <input
            type="text"
            v-model="form.title"
            placeholder="Yazının başlığını girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.title || form.errors.title }"
          />
          <p v-if="errors.title || form.errors.title" class="mt-1 text-xs text-destructive">
            {{ errors.title || form.errors.title }}
          </p>
        </div>

        <div ref="slugRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Slug</label>
          <input
            type="text"
            v-model="form.slug"
            placeholder="örnek-yazı-slug"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
          />
          <p v-if="errors.slug || form.errors.slug" class="mt-1 text-xs text-destructive">
            {{ errors.slug || form.errors.slug }}
          </p>
        </div>

        <div ref="publishedAtRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Yayınlama Tarihi</label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="publishDateObj.date"
              class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at,
              }"
            />
            <input
              type="time"
              v-model="publishDateObj.time"
              class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.published_at || form.errors.published_at,
              }"
            />
          </div>
          <p v-if="errors.published_at || form.errors.published_at" class="mt-1 text-xs text-destructive">
            {{ errors.published_at || form.errors.published_at }}
          </p>
        </div>

        <div class="md:col-span-2" ref="summaryRef">
          <label class="mb-1 block text-sm font-medium text-foreground">Özet (SEO Meta Açıklaması)</label>
          <textarea
            v-model="form.summary"
            @input="handleSummaryInput"
            rows="2"
            maxlength="160"
            placeholder="Yazının kısa özeti (arama motorları için de kullanılacaktır, max 160 karakter)"
            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.summary || form.errors.summary }"
          ></textarea>
          <div class="mt-1 flex items-center justify-between">
            <p v-if="errors.summary || form.errors.summary" class="text-xs text-destructive">
              {{ errors.summary || form.errors.summary }}
            </p>
            <span class="text-xs text-muted-foreground">{{ form.summary?.length || 0 }}/160 karakter</span>
          </div>
        </div>

        <div class="md:col-span-2" ref="contentRef">
          <RichTextEditor
            ref="richTextEditorRef"
            v-model="form.content"
            label="İçerik"
            :error="errors.content || form.errors.content"
            placeholder="İçeriği buraya yazın..."
            height="600px"
          />
        </div>

        <!-- Resim Yükleme Paneli -->
        <div class="md:col-span-2">
          <WriteImageUploader
            :write-id="writeData.id"
            category="writes"
            @insert-image="handleInsertImage"
          />
        </div>

        <div ref="statusRef" class="md:col-span-2">
          <label class="mb-2 block text-sm font-medium text-foreground">Durumu</label>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label
              v-for="status in statusOptions"
              :key="status.value"
              class="relative flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all hover:bg-accent/50"
              :class="{
                'border-primary bg-primary/5': form.status === status.value,
                'border-border': form.status !== status.value,
              }"
            >
              <input
                type="radio"
                :value="status.value"
                v-model="form.status"
                class="h-4 w-4 border-input text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <svg
                    v-if="status.value === 'published'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg
                    v-else-if="status.value === 'private'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span class="text-sm font-semibold text-foreground">{{ status.label }}</span>
                </div>
                <p class="mt-1 text-xs text-muted-foreground">{{ status.description }}</p>
              </div>
            </label>
          </div>
          <p v-if="errors.status || form.errors.status" class="mt-2 text-xs text-destructive">
            {{ errors.status || form.errors.status }}
          </p>
        </div>

        <div ref="categoryRef" class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-foreground">Kategori</label>
          <div class="relative">
            <input
              type="text"
              v-model="categorySearch"
              @focus="handleCategoryFocus"
              @blur="handleCategoryBlur"
              @input="filterCategories"
              @keydown.esc="showCategoryList = false"
              placeholder="Kategori ara veya seç..."
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.category_id || form.errors.category_id,
              }"
              tabindex="0"
            />
            <button
              v-if="categorySearch"
              @click="clearCategory"
              class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"
            >
              ✕
            </button>
            <ul
              tabindex="0"
              class="absolute z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-md border border-border bg-popover shadow-lg"
              v-if="showCategoryList && filteredCategories && filteredCategories.length > 0"
            >
              <li
                v-for="category in filteredCategories"
                :key="category.id"
                @mousedown="selectCategory(category)"
                class="cursor-pointer border-b border-border px-3 py-2.5 transition-colors last:border-b-0 hover:bg-accent"
              >
                <div class="flex items-center justify-between gap-3">
                  <!-- Sol: Kategori İsmi -->
                  <div class="flex-1">
                    <span class="text-sm font-medium text-foreground">{{ category.name }}</span>
                  </div>
                  
                  <!-- Sağ: Breadcrumb (Üst Kategoriler) -->
                  <div v-if="getCategoryPath(category.id)" class="flex items-center gap-1 text-xs text-muted-foreground">
                    <template v-for="(pathPart, index) in getCategoryPathArray(category.id)" :key="index">
                      <span class="rounded bg-muted px-1.5 py-0.5 font-medium">
                        {{ getInitials(pathPart) }}
                      </span>
                      <svg
                        v-if="index < getCategoryPathArray(category.id).length - 1"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </template>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <p v-if="errors.category_id || form.errors.category_id" class="mt-1 text-xs text-destructive">
            {{ errors.category_id || form.errors.category_id }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">Etiketler</label>
          <input
            type="text"
            :value="form.tags"
            @input="handleTagsInput"
            @blur="formatTags"
            placeholder="etiket1, etiket2, etiket3"
            class="flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive': errors.tags || form.errors.tags }"
          />
          <p class="mt-1 text-xs text-muted-foreground">Virgülle ayırın. Otomatik olarak # eklenecek.</p>
          <p v-if="errors.tags || form.errors.tags" class="mt-1 text-xs text-destructive">
            {{ errors.tags || form.errors.tags }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">SEO Anahtar Kelimeleri</label>
          <input
            type="text"
            :value="form.seo_keywords"
            @input="handleKeywordsInput"
            @blur="formatKeywords"
            placeholder="anahtar1, anahtar2, anahtar3"
            class="flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive': errors.seo_keywords || form.errors.seo_keywords }"
          />
          <p class="mt-1 text-xs text-muted-foreground">Virgülle ayırın. Otomatik olarak # eklenecek.</p>
          <p v-if="errors.seo_keywords || form.errors.seo_keywords" class="mt-1 text-xs text-destructive">
            {{ errors.seo_keywords || form.errors.seo_keywords }}
          </p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-foreground">Görüntülenme Sayısı</label>
          <input
            type="number"
            v-model="form.views_count"
            class="flex h-9 w-full rounded border border-input bg-muted px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            readonly
          />
        </div>

        <!-- Çizim ve Youtube Video Seçenekleri -->
        <div class="space-y-3 rounded-lg border border-border bg-card p-4 md:col-span-2">
          <h3 class="text-sm font-semibold text-foreground">Ek İçerik Seçenekleri</h3>

          <!-- Çizim İçerir -->
          <label
            class="group relative flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all"
            :class="
              form.hasDraw
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
            "
          >
            <input
              type="checkbox"
              v-model="form.hasDraw"
              class="mt-0.5 h-4 w-4 rounded border-2 border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-muted-foreground"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5"
                  :class="form.hasDraw ? 'text-primary' : 'text-muted-foreground'"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21h-4.5A2.25 2.25 0 019 18.75V15.5m9-1.125v-4.5"
                  />
                </svg>
                <span class="text-sm font-semibold" :class="form.hasDraw ? 'text-foreground' : 'text-muted-foreground'">
                  Çizim İçerir
                </span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">
                Bu yazı interaktif çizim içeriyor. Kullanıcılar çizim moduna geçebilir.
              </p>
            </div>
            <div
              v-if="form.hasDraw"
              class="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </label>

          <!-- Youtube Video -->
          <label
            class="group relative flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all"
            :class="
              form.hasYoutubeVideo
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-background hover:border-primary/50 hover:bg-accent/50'
            "
          >
            <input
              type="checkbox"
              v-model="form.hasYoutubeVideo"
              class="mt-0.5 h-4 w-4 rounded border-2 border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-muted-foreground"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5"
                  :class="form.hasYoutubeVideo ? 'text-primary' : 'text-muted-foreground'"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.258.232-.414.557-.328l5.603 3.112z"
                  />
                </svg>
                <span class="text-sm font-semibold" :class="form.hasYoutubeVideo ? 'text-foreground' : 'text-muted-foreground'">
                  Youtube Videosu Var
                </span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">
                Bu yazı ile ilgili bir Youtube videosu ekleyin. Video yazının en üstünde gösterilecektir.
              </p>
            </div>
            <div
              v-if="form.hasYoutubeVideo"
              class="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </label>

          <!-- Youtube URL Input -->
          <div
            v-if="form.hasYoutubeVideo"
            class="animate-in slide-in-from-top-2 space-y-2 rounded-lg border-2 border-primary/20 bg-primary/5 p-4"
          >
            <label class="block text-sm font-medium text-foreground">Youtube Video URL</label>
            <input
              type="url"
              v-model="form.youtube_url"
              placeholder="https://www.youtube.com/watch?v=..."
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'border-destructive focus-visible:ring-destructive': errors.youtube_url || form.errors.youtube_url,
              }"
            />
            <p v-if="errors.youtube_url || form.errors.youtube_url" class="text-xs text-destructive">
              {{ errors.youtube_url || form.errors.youtube_url }}
            </p>
            <p class="text-xs text-muted-foreground">
              Geçerli bir Youtube URL'si girin (örn: https://www.youtube.com/watch?v=VIDEO_ID veya
              https://youtu.be/VIDEO_ID)
            </p>
          </div>
        </div>
      </div>

      <!-- Base64 Uyarısı -->
      <div v-if="hasBase64Images" class="rounded-md border border-destructive bg-destructive/10 p-3">
        <div class="flex items-center gap-2 text-sm text-destructive">
          <svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>İçerikte base64 formatında resim var. Lütfen resimleri yukarıdaki "Resim Yükle" panelinden yükleyin ve editöre ekleyin.</span>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :disabled="form.processing || hasBase64Images"
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
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed, nextTick } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';
import WriteImageUploader from '@/Components/WriteImageUploader.vue';
import DiagramGeneratorModal from '@/Components/DiagramGeneratorModal.vue';

// Field refs for scroll to error
const titleRef = ref(null);
const slugRef = ref(null);
const publishedAtRef = ref(null);
const summaryRef = ref(null);
const contentRef = ref(null);
const statusRef = ref(null);
const categoryRef = ref(null);
const richTextEditorRef = ref(null);

// AI Diagram Modal
const showDiagramModal = ref(false);

const handleDiagramSuccess = () => {
  // Modal will handle page reload
  console.log('Diagram generated successfully');
};

// Base64 resim kontrolü
const hasBase64Images = computed(() => {
  if (!form.content) return false;
  // data:image ile başlayan base64 resimleri kontrol et
  return /data:image\/[^;]+;base64,/.test(form.content);
});

// Resim ekleme handler
const handleInsertImage = (image) => {
  if (richTextEditorRef.value) {
    richTextEditorRef.value.insertImage(image.full_url, image.alt_text);
  }
};

// Özet input handler - aynı zamanda meta_description'ı da günceller
const handleSummaryInput = (event) => {
  form.summary = event.target.value;
  form.meta_description = event.target.value; // Özet aynı zamanda SEO meta açıklaması
};

/**
 * Get category path as array
 * @param {String} categoryId - The category ID
 * @returns {Array} Category path array
 */
const getCategoryPathArray = (categoryId) => {
  if (!categoryId || !categories.value || categories.value.length === 0) return [];

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
    return path.slice(0, -1);
  }

  return [];
};

/**
 * Get initials from category name
 * @param {String} name - Category name
 * @returns {String} Initials (max 3 chars)
 */
const getInitials = (name) => {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return name.substring(0, 3).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

/**
 * Format tags - add # prefix if not present
 * @param {String} tags - Comma separated tags
 * @returns {String} Formatted tags with # prefix
 */
const formatTagsString = (tags) => {
  if (!tags) return '';
  return tags
    .split(',')
    .map((tag) => {
      const trimmed = tag.trim();
      if (!trimmed) return '';
      return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    })
    .filter(Boolean)
    .join(', ');
};

/**
 * Handle tags input
 */
const handleTagsInput = (event) => {
  form.tags = event.target.value;
};

/**
 * Format tags on blur
 */
const formatTags = () => {
  if (form.tags) {
    form.tags = formatTagsString(form.tags);
  }
};

/**
 * Handle keywords input
 */
const handleKeywordsInput = (event) => {
  form.seo_keywords = event.target.value;
};

/**
 * Format keywords on blur
 */
const formatKeywords = () => {
  if (form.seo_keywords) {
    form.seo_keywords = formatTagsString(form.seo_keywords);
  }
};

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
  { value: 'published', label: 'Herkese Açık', description: 'Herkes görebilir' },
  { value: 'private', label: 'Gizli', description: 'Sadece siz görebilirsiniz' },
  { value: 'link_only', label: 'Sadece Link', description: 'Link ile erişilebilir' },
];

const statusSearch = ref('');
const showStatusList = ref(false);
const statusDropdownTimer = ref(null);

const filteredStatuses = computed(() => {
  // If search is empty or matches the current selected status label, show all options
  if (!statusSearch.value) return statusOptions;

  // Check if the search value matches the currently selected status label
  const currentStatus = statusOptions.find((s) => s.value === form.status);
  if (currentStatus && statusSearch.value === currentStatus.label) {
    return statusOptions; // Show all options when clicking on already selected value
  }

  // Otherwise filter by search term
  const searchTerm = statusSearch.value.toLowerCase();
  return statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
});

const form = useForm({
  title: writeData.value.title || '',
  slug: writeData.value.slug || '',
  content: writeData.value.content || '',
  published_at: writeData.value.published_at || '',
  summary: writeData.value.summary || '',
  status: writeData.value.status || 'published',
  category_id: writeData.value.category_id || '',
  seo_keywords: writeData.value.seo_keywords || '',
  meta_description: writeData.value.meta_description || '',
  tags: writeData.value.tags || '',
  views_count: writeData.value.views_count || 0,
  hasDraw: writeData.value.hasDraw || false,
  hasYoutubeVideo: !!(writeData.value.youtube_url && writeData.value.youtube_url.trim() !== ''),
  youtube_url: writeData.value.youtube_url || '',
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
  youtube_url: '',
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
  // Always show all options when focusing, regardless of current search value
  showStatusList.value = true;
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

// Flag to prevent watch from triggering during initial mount
const isInitialMount = ref(true);

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

  // Mark initial mount as complete after a short delay
  nextTick(() => {
    setTimeout(() => {
      isInitialMount.value = false;
    }, 100);
  });
});

watch(
  publishDateObj.value,
  () => {
    // Don't trigger during initial mount
    if (isInitialMount.value) {
      return;
    }
    if (publishDateObj.value.date && publishDateObj.value.time) {
      form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
    }
  },
  { deep: true }
);

// Scroll to first error field
const scrollToError = () => {
  nextTick(() => {
    const errorFields = [
      { ref: titleRef, error: errors.value.title || form.errors.title },
      { ref: slugRef, error: errors.value.slug || form.errors.slug },
      { ref: contentRef, error: errors.value.content || form.errors.content },
      { ref: categoryRef, error: errors.value.category_id || form.errors.category_id },
      { ref: publishedAtRef, error: errors.value.published_at || form.errors.published_at },
      { ref: summaryRef, error: errors.value.summary || form.errors.summary },
      { ref: statusRef, error: errors.value.status || form.errors.status },
    ];

    const firstError = errorFields.find((field) => field.error);
    if (firstError && firstError.ref?.value) {
      firstError.ref.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // Focus the input if it exists
      const input = firstError.ref.value.querySelector('input, textarea');
      if (input) {
        setTimeout(() => input.focus(), 300);
      }
    }
  });
};

const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });

  let hasErrors = false;

  if (!form.title || form.title.trim() === '') {
    errors.value.title = 'Başlık zorunludur.';
    hasErrors = true;
  }

  if (!form.slug || form.slug.trim() === '') {
    errors.value.slug = 'Slug zorunludur.';
    hasErrors = true;
  }

  if (!form.content || form.content.trim() === '' || form.content === '<p><br></p>') {
    errors.value.content = 'İçerik zorunludur.';
    hasErrors = true;
  }

  if (!form.category_id) {
    errors.value.category_id = 'Kategori seçilmelidir.';
    hasErrors = true;
  }

  // Validate Youtube URL if hasYoutubeVideo is true
  if (form.hasYoutubeVideo) {
    if (!form.youtube_url || form.youtube_url.trim() === '') {
      errors.value.youtube_url = 'Youtube videosu seçildiğinde URL zorunludur.';
      hasErrors = true;
    } else {
      // Validate Youtube URL format
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
      if (!youtubeRegex.test(form.youtube_url)) {
        errors.value.youtube_url = 'Geçerli bir Youtube URL\'si girin.';
        hasErrors = true;
      }
    }
  }

  // Handle published_at
  if (publishDateObj.value.date && publishDateObj.value.time) {
    form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
  } else {
    form.published_at = null; // Make it optional
  }

  if (hasErrors) {
    scrollToError();
  }

  return !hasErrors;
};

const LOCAL_STORAGE_KEY = `write_edit_form_${writeData.value.id || writeData.value.slug || 'unknown'}`;

watch(
  form,
  (newVal) => {
    // Don't save to localStorage during initial mount
    if (isInitialMount.value) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

// Watch form processing state and notify sidebar
watch(
  () => form.processing,
  (processing) => {
    window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing } }));
  }
);

// Listen for sidebar form actions
let sidebarSubmitHandler = null;

// Load saved form data from localStorage (before the first onMounted)
// IMPORTANT: Only load from localStorage if user explicitly wants to restore draft
// For now, we'll skip auto-loading to prevent accidental updates
// Users can manually restore drafts if needed
// const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
// if (saved) {
//   try {
//     const parsed = JSON.parse(saved);
//     // Only restore if data exists and is valid
//     if (parsed && typeof parsed === 'object') {
//       // Don't restore processing state - it should always start as false
//       const { processing, ...formData } = parsed;
//       Object.assign(form, formData);
//     }
//   } catch (e) {
//     console.error('Error loading saved form data:', e);
//   }
// }

// Listen for sidebar form submit
onMounted(() => {
  // Reset form processing state when component mounts
  form.processing = false;
  window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing: false } }));

  sidebarSubmitHandler = () => {
    updateWrite();
  };
  window.addEventListener('sidebarFormSubmit', sidebarSubmitHandler);
});

onUnmounted(() => {
  if (sidebarSubmitHandler) {
    window.removeEventListener('sidebarFormSubmit', sidebarSubmitHandler);
  }
});

const updateWrite = () => {
  if (!validateForm()) {
    return;
  }

  form.put(route('writes.update', { write: writeData.value.slug }), {
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      router.visit(route('writes.show', { write: form.slug }));
    },
    onError: (serverErrors) => {
      // Handle server errors and scroll to first error
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          if (errors.value.hasOwnProperty(key)) {
            errors.value[key] = serverErrors[key];
          }
        });
        scrollToError();
      }
    },
  });
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
