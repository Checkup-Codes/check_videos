<template>
  <KeyboardShortcutDisabler>
    <Form title="Yazıyı Güncelle" submitText="Güncelle" :loading="form.processing" @submit="updateWrite">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </template>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="md:col-span-2">
          <TextField
            v-model="form.title"
            label="Başlık"
            placeholder="Yazının başlığını girin"
            :error="errors.title || form.errors.title"
          />
        </div>

        <div>
          <TextField
            v-model="form.slug"
            label="Slug"
            placeholder="örnek-yazı-slug"
            :error="errors.slug || form.errors.slug"
          />
        </div>

        <div class="md:col-span-2">
          <TextField
            v-model="form.summary"
            label="Özet"
            type="textarea"
            rows="3"
            placeholder="Yazının kısa özeti"
            :error="errors.summary || form.errors.summary"
          />
        </div>

        <div class="md:col-span-2">
          <RichTextEditor
            v-model="form.content"
            label="İçerik"
            height="400px"
            :error="errors.content || form.errors.content"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Kategori</span>
          </label>
          <select
            v-model="form.category_id"
            class="select select-bordered w-full"
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
            class="select select-bordered w-full"
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
          <TextField
            v-model="form.cover_image"
            label="Kapak Resmi URL"
            placeholder="https://example.com/image.jpg"
            :error="errors.cover_image || form.errors.cover_image"
          />
        </div>

        <div>
          <TextField
            v-model="form.tags"
            label="Etiketler"
            placeholder="etiket1, etiket2, etiket3"
            :error="errors.tags || form.errors.tags"
          />
        </div>

        <div>
          <TextField
            v-model="form.seo_keywords"
            label="SEO Anahtar Kelimeleri"
            placeholder="anahtar1, anahtar2, anahtar3"
            :error="errors.seo_keywords || form.errors.seo_keywords"
          />
        </div>

        <div>
          <TextField v-model="form.views_count" label="Görüntülenme Sayısı" type="number" readonly />
        </div>

        <div class="flex items-center space-x-2">
          <label class="label cursor-pointer justify-start gap-2">
            <input type="checkbox" v-model="form.hasDraw" class="checkbox checkbox-primary" />
            <span class="label-text">Çizim İçerir</span>
          </label>
        </div>
      </div>
    </Form>
  </KeyboardShortcutDisabler>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import { Form, TextField, RichTextEditor, KeyboardShortcutDisabler } from '@/Pages/WritesCategories/_components';

const { props } = usePage();
const write = props.write;
const categories = ref(props.categories);

const form = useForm({
  title: write.title,
  slug: write.slug,
  content: write.content,
  summary: write.summary,
  status: write.status,
  category_id: write.category_id,
  cover_image: write.cover_image,
  seo_keywords: write.seo_keywords,
  tags: write.tags,
  views_count: write.views_count,
  hasDraw: write.hasDraw ? true : false,
});

const errors = ref({
  title: '',
  slug: '',
  content: '',
  summary: '',
  category_id: '',
  status: '',
  cover_image: '',
  seo_keywords: '',
  tags: '',
  views_count: '',
  hasDraw: '',
});

const validateForm = () => {
  errors.value.title = form.title ? '' : 'Başlık zorunludur.';
  errors.value.slug = form.slug ? '' : 'Slug zorunludur.';
  errors.value.content = form.content ? '' : 'İçerik zorunludur.';
  errors.value.summary = form.summary ? '' : 'Özet zorunludur.';
  errors.value.category_id = form.category_id ? '' : 'Kategori seçilmelidir.';
  errors.value.status = form.status ? '' : 'Durum seçilmelidir.';
};

const updateWrite = () => {
  validateForm();

  if (!Object.values(errors.value).some((error) => error !== '')) {
    form.put(route('writes.update', write.id), {
      onSuccess: () => {
        router.visit(route('dashboard'));
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
      },
    });
  }
};

watch(
  () => form.title,
  (newTitle) => {
    form.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
);
</script>
