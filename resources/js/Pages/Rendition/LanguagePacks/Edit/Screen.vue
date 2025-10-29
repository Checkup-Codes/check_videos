<template>
  <CheckScreen>
    <div class="card-body p-4 sm:p-6">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-xl font-bold sm:text-2xl">Dil Paketi Düzenle</h1>
        <p class="text-base-content/60 mt-1 text-sm">Paket bilgilerini güncelleyin</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Paket Adı -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-base-content">Paket Adı</label>
          <input
            v-model="form.name"
            type="text"
            class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1"
            placeholder="Örn: Temel İngilizce Kelimeler"
            required
          />
          <p v-if="errors.name" class="text-xs text-error">{{ errors.name }}</p>
        </div>

        <!-- Slug -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-base-content">Slug</label>
          <input
            v-model="form.slug"
            type="text"
            class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1"
            placeholder="temel-ingilizce-kelimeler"
            required
          />
          <p v-if="errors.slug" class="text-xs text-error">{{ errors.slug }}</p>
        </div>

        <!-- Dil Kodu -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-base-content">Dil Kodu</label>
          <select
            v-model="form.language"
            class="border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1"
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
          <p v-if="errors.language" class="text-xs text-error">{{ errors.language }}</p>
        </div>

        <!-- Açıklama -->
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-base-content">Açıklama</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full resize-none rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1"
            placeholder="Bu paket hakkında kısa bir açıklama yazın..."
          ></textarea>
          <p v-if="errors.description" class="text-xs text-error">{{ errors.description }}</p>
        </div>

        <!-- Butonlar -->
        <div class="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between">
          <button
            type="button"
            @click="deleteLanguagePack"
            class="border-error/30 bg-error/10 hover:bg-error/20 rounded-lg border px-4 py-2 text-sm font-medium text-error transition-colors disabled:opacity-50"
            :disabled="processing"
          >
            <span
              v-if="processing"
              class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-error border-t-transparent"
            ></span>
            {{ processing ? 'Siliniyor...' : 'Sil' }}
          </button>

          <div class="flex gap-2">
            <button
              type="button"
              @click="goBack"
              class="border-base-300/50 rounded-lg border bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-200"
            >
              İptal
            </button>
            <button
              type="submit"
              class="rounded-lg bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition-colors hover:bg-base-300 hover:text-base-content disabled:opacity-50"
              :disabled="processing"
            >
              <span
                v-if="processing"
                class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"
              ></span>
              {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  languagePack: Object,
  screen: Object,
});

const form = useForm({
  name: props.languagePack.name,
  slug: props.languagePack.slug || '',
  description: props.languagePack.description || '',
  language: props.languagePack.language,
});

const processing = ref(false);

const deleteLanguagePack = () => {
  if (confirm('Bu dil paketini silmek istediğinizden emin misiniz?')) {
    processing.value = true;
    router.delete(route('rendition.language-packs.destroy', props.languagePack.id), {
      onSuccess: () => {
        processing.value = false;
      },
      onError: () => {
        processing.value = false;
      },
    });
  }
};

const submitForm = () => {
  processing.value = true;
  form.put(route('rendition.language-packs.update', props.languagePack.id), {
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

const errors = usePage().props.errors;
</script>
