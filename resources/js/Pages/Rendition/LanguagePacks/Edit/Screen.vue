<template>
  <CheckScreen>
    <GoBackButton url="/rendition/language-packs" />
    <TopScreen title="Dil Paketi Düzenle" />

    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Paket Adı</span>
            </label>
            <input v-model="form.name" type="text" class="input-bordered input w-full" required />
            <label v-if="errors.name" class="label">
              <span class="label-text-alt text-error">{{ errors.name }}</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Açıklama</span>
            </label>
            <textarea v-model="form.description" rows="3" class="textarea-bordered textarea w-full"></textarea>
            <label v-if="errors.description" class="label">
              <span class="label-text-alt text-error">{{ errors.description }}</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Dil Kodu (2 karakter)</span>
            </label>
            <select v-model="form.language" class="select-bordered select w-full" required>
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
            <label v-if="errors.language" class="label">
              <span class="label-text-alt text-error">{{ errors.language }}</span>
            </label>
          </div>

          <div class="divider"></div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="deleteLanguagePack" class="btn btn-error" :disabled="processing">
              <span v-if="processing" class="loading loading-spinner loading-sm"></span>
              {{ processing ? 'Siliniyor...' : 'Sil' }}
            </button>
            <button type="button" @click="goBack" class="btn btn-ghost">İptal</button>
            <button type="submit" class="btn btn-primary" :disabled="processing">
              <span v-if="processing" class="loading loading-spinner loading-sm"></span>
              {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
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
