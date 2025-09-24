<template>
  <CheckScreen>
    <GoBackButton url="/rendition/language-packs" />
    <TopScreen title="Dil Paketi Düzenle" />

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

          <!-- Butonlar -->
          <div class="flex justify-between gap-3 pt-4">
            <button
              type="button"
              @click="deleteLanguagePack"
              class="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
              :disabled="processing"
            >
              <span
                v-if="processing"
                class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-red-700 border-t-transparent"
              ></span>
              {{ processing ? 'Siliniyor...' : 'Sil' }}
            </button>

            <div class="flex gap-3">
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
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

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
