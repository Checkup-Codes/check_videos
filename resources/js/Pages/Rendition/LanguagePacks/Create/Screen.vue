<template>
  <CheckScreen>
    <GoBackButton url="/rendition/language-packs" />
    <TopScreen title="Yeni Dil Paketi Oluştur" />

    <div class="mx-auto max-w-2xl">
      <div class="rounded-lg border border-base-300 bg-base-100 p-6">
        <form @submit.prevent="submitForm" class="space-y-5">
          <!-- Paket Adı -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-base-content">Paket Adı</label>
            <input
              v-model="form.name"
              type="text"
              class="placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
              placeholder="Örn: Temel İngilizce Kelimeler"
              required
            />
            <p v-if="errors.name" class="text-sm text-error">{{ errors.name }}</p>
          </div>

          <!-- Açıklama -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-base-content">Açıklama</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="placeholder-base-content/50 w-full resize-none rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
              placeholder="Bu paket hakkında kısa bir açıklama yazın..."
            ></textarea>
            <p v-if="errors.description" class="text-sm text-error">{{ errors.description }}</p>
          </div>

          <!-- Dil Kodu -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-base-content">Dil Kodu</label>
            <select
              v-model="form.language"
              class="w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
              required
            >
              <option value="" disabled>Dil seçiniz</option>
              <option value="tr">Türkçe (TR)</option>
              <option value="en">İngilizce (EN)</option>
              <option value="de">Almanca (DE)</option>
              <option value="fr">Fransızca (FR)</option>
              <option value="es">İspanyolca (ES)</option>
              <option value="it">İtalyanca (IT)</option>
              <option value="ru">Rusça (RU)</option>
              <option value="ar">Arapça (AR)</option>
            </select>
            <p v-if="errors.language" class="text-sm text-error">{{ errors.language }}</p>
          </div>

          <!-- Slug -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-base-content">Slug</label>
            <input
              v-model="form.slug"
              type="text"
              class="placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
              placeholder="temel-ingilizce-kelimeler"
              required
            />
            <p v-if="errors.slug" class="text-sm text-error">{{ errors.slug }}</p>
          </div>

          <!-- Dosya Yükleme -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-base-content">JSON Dosyası İçe Aktar</label>
            <div class="relative">
              <input
                type="file"
                accept=".json"
                @change="handleFileUpload"
                class="w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content file:mr-3 file:rounded file:border-0 file:bg-base-content file:px-3 file:py-1 file:text-sm file:font-medium file:text-base-100 hover:file:bg-base-300 hover:file:text-base-content"
              />
            </div>
            <p class="text-base-content/70 text-xs">
              Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz.
            </p>
            <p v-if="errors.import_file" class="text-sm text-error">{{ errors.import_file }}</p>
          </div>

          <!-- Butonlar -->
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="goBack"
              class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
            >
              İptal
            </button>
            <button
              type="submit"
              class="rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"
              :disabled="processing"
            >
              <span
                v-if="processing"
                class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"
              ></span>
              {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const props = defineProps({
  screen: Object,
});

const form = useForm({
  name: '',
  slug: '',
  description: '',
  language: '',
  import_file: null,
});

const processing = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.import_file = file;
  }
};

const submitForm = () => {
  processing.value = true;
  form.post(route('rendition.language-packs.store'), {
    onSuccess: () => {
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    },
  });
};

const goBack = () => {
  router.visit(route('rendition.language-packs.index'));
};

watch(
  () => form.name,
  (newName) => {
    form.slug = generateSlug(newName);
  }
);

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Boşlukları tire yap
    .replace(/[^\w\-]+/g, '') // Alfasayısal ve tire dışındakileri sil
    .replace(/\-\-+/g, '-') // Birden fazla tire varsa teke indir
    .replace(/^-+|-+$/g, ''); // Baştaki ve sondaki tireleri sil
};
const errors = usePage().props.errors;
</script>
