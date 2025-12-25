<template>
  <CheckScreen>
    <div class="space-y-4 py-6">
      <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- Category -->
          <div class="md:col-span-2" ref="categoryRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">
                Kategori <span class="text-destructive">*</span>
              </label>
              <select
                v-model="form.bookmark_category_id"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.bookmark_category_id }"
                required
              >
                <option value="">Kategori Seçin</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <p v-if="form.errors.bookmark_category_id" class="mt-1 text-xs text-destructive">
                {{ form.errors.bookmark_category_id }}
              </p>
            </div>
          </div>

          <!-- Name -->
          <div class="md:col-span-2" ref="nameRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">
                İsim <span class="text-destructive">*</span>
              </label>
              <input
                type="text"
                v-model="form.name"
                placeholder="Yer imi adı"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.name }"
                required
              />
              <p v-if="form.errors.name" class="mt-1 text-xs text-destructive">{{ form.errors.name }}</p>
            </div>
          </div>

          <!-- Link -->
          <div class="md:col-span-2" ref="linkRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">
                Link <span class="text-destructive">*</span>
              </label>
              <input
                type="url"
                v-model="form.link"
                placeholder="https://..."
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.link }"
                required
                @blur="fetchPreviewImage"
              />
              <p v-if="form.errors.link" class="mt-1 text-xs text-destructive">{{ form.errors.link }}</p>
            </div>
          </div>

          <!-- Preview Image -->
          <div class="md:col-span-2" ref="previewImageRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Ön İzleme Resmi (URL)</label>
              <input
                type="url"
                v-model="form.preview_image"
                placeholder="https://..."
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.preview_image }"
              />
              <p v-if="form.errors.preview_image" class="mt-1 text-xs text-destructive">
                {{ form.errors.preview_image }}
              </p>
              <p class="mt-1 text-xs text-muted-foreground">
                Link'ten otomatik olarak alınabilir veya manuel olarak eklenebilir
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="md:col-span-2" ref="descriptionRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label>
            <textarea
              v-model="form.description"
              placeholder="Kısa açıklama..."
              rows="2"
              class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.description }"
            ></textarea>
            <p v-if="form.errors.description" class="mt-1 text-xs text-destructive">
              {{ form.errors.description }}
            </p>
          </div>

          <!-- My Comment -->
          <div class="md:col-span-2" ref="myCommentRef">
            <label class="mb-1 block text-sm font-medium text-foreground">Kendi Yorumum</label>
            <textarea
              v-model="form.my_comment"
              placeholder="Bu yer imi hakkındaki düşünceleriniz, notlarınız..."
              rows="4"
              class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.my_comment }"
            ></textarea>
            <p v-if="form.errors.my_comment" class="mt-1 text-xs text-destructive">
              {{ form.errors.my_comment }}
            </p>
          </div>

          <!-- Extended Comment Link -->
          <div class="md:col-span-2" ref="extendedCommentLinkRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Genişletilmiş Yorum Linki</label>
              <input
                type="url"
                v-model="form.extended_comment_link"
                placeholder="https://..."
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.extended_comment_link }"
              />
              <p v-if="form.errors.extended_comment_link" class="mt-1 text-xs text-destructive">
                {{ form.errors.extended_comment_link }}
              </p>
              <p class="mt-1 text-xs text-muted-foreground">
                Bu yer imi ile ilgili detaylı yorumunuzun veya referansınızın linki
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Link
            :href="`/bookmarks/${bookmark.id}`"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :disabled="form.processing"
          >
            İptal
          </Link>
          <button
            type="submit"
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            :disabled="form.processing"
          >
            <svg
              v-if="form.processing"
              class="mr-1 h-4 w-4 animate-spin"
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
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ form.processing ? 'Güncelleniyor...' : 'Güncelle' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const form = useForm({
  name: props.bookmark.name || '',
  description: props.bookmark.description || '',
  my_comment: props.bookmark.my_comment || '',
  extended_comment_link: props.bookmark.extended_comment_link || '',
  link: props.bookmark.link || '',
  preview_image: props.bookmark.preview_image || '',
  bookmark_category_id: props.bookmark.bookmark_category_id || '',
  order: props.bookmark.order || 0,
  _method: 'PUT',
});

// Refs for error scrolling
const categoryRef = ref(null);
const nameRef = ref(null);
const linkRef = ref(null);
const previewImageRef = ref(null);
const descriptionRef = ref(null);
const myCommentRef = ref(null);
const extendedCommentLinkRef = ref(null);

// Fetch preview image from link (optional)
const fetchPreviewImage = () => {
  // This can be implemented to fetch og:image from the link
};

const submit = () => {
  form.post(`/bookmarks/${props.bookmark.id}`, {
    onError: (errors) => {
      console.error('Update errors:', errors);
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const refMap = {
        bookmark_category_id: categoryRef,
        name: nameRef,
        link: linkRef,
        preview_image: previewImageRef,
        description: descriptionRef,
        my_comment: myCommentRef,
        extended_comment_link: extendedCommentLinkRef,
      };
      if (refMap[firstErrorField]?.value) {
        refMap[firstErrorField].value.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  });
};
</script>
