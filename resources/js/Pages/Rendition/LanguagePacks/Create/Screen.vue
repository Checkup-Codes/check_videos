<template>
  <CheckScreen>
    <div class="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-xl font-bold text-foreground sm:text-2xl">Yeni Dil Paketi Oluştur</h1>
        <p class="text-muted-foreground mt-1 text-sm">Yeni bir dil paketi oluşturun ve kelimelerinizi organize edin</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Paket Adı -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-foreground">Paket Adı</label>
          <input
            v-model="form.name"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Örn: Temel İngilizce Kelimeler"
            required
          />
          <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
        </div>

        <!-- Dil Kodu -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-foreground">Dil Kodu</label>
          <select
            v-model="form.language"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          <p v-if="errors.language" class="text-xs text-destructive">{{ errors.language }}</p>
        </div>

        <!-- Slug -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-foreground">Slug</label>
          <input
            v-model="form.slug"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="temel-ingilizce-kelimeler"
            required
          />
          <p v-if="errors.slug" class="text-xs text-destructive">{{ errors.slug }}</p>
        </div>

        <!-- Açıklama -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-foreground">Açıklama</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Bu paket hakkında kısa bir açıklama yazın..."
          ></textarea>
          <p v-if="errors.description" class="text-xs text-destructive">{{ errors.description }}</p>
        </div>

        <!-- Dosya Yükleme -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-foreground">JSON Dosyası İçe Aktar</label>
          <div class="relative">
            <input
              type="file"
              accept=".json"
              @change="handleFileUpload"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:hover:bg-accent file:hover:text-accent-foreground"
            />
          </div>
          <p class="text-muted-foreground text-xs">
            Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz.
          </p>
          <p v-if="errors.import_file" class="text-xs text-destructive">{{ errors.import_file }}</p>
        </div>

        <!-- Butonlar -->
        <div class="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            @click="goBack"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            İptal
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            :disabled="processing"
          >
            <svg
              v-if="processing"
              class="mr-2 h-3 w-3 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

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
