<template>
  <CheckScreen>
    <GoBackButton url="/rendition/language-packs" />
    <TopScreen title="Yeni Dil Paketi Oluştur" />

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

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Slug</span>
            </label>
            <input v-model="form.slug" type="text" class="input-bordered input w-full" required />
            <label v-if="errors.slug" class="label">
              <span class="label-text-alt text-error">{{ errors.slug }}</span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">JSON Dosyası İçe Aktar (Opsiyonel)</span>
            </label>
            <input
              type="file"
              accept=".json"
              @change="handleFileUpload"
              class="file-input-bordered file-input w-full"
            />
            <label class="label">
              <span class="label-text-alt"
                >Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe
                aktarabilirsiniz.</span
              >
            </label>
            <label v-if="errors.import_file" class="label">
              <span class="label-text-alt text-error">{{ errors.import_file }}</span>
            </label>
          </div>

          <div class="divider"></div>

          <div class="flex justify-end gap-2">
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
