<template>
  <CheckScreen>
    <TopScreen title="Dil Paketi Düzenle" />

    <div class="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <label for="name" class="mb-1 block text-sm font-medium text-gray-700">Paket Adı</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <div v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</div>
        </div>

        <div class="mb-6">
          <label for="description" class="mb-1 block text-sm font-medium text-gray-700">Açıklama</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>
          <div v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</div>
        </div>

        <div class="mb-6">
          <label for="language" class="mb-1 block text-sm font-medium text-gray-700">Dil Kodu (2 karakter)</label>
          <select
            id="language"
            v-model="form.language"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
          <div v-if="errors.language" class="mt-1 text-sm text-red-500">{{ errors.language }}</div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="goBack"
            class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            İptal
          </button>
          <button
            type="submit"
            class="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            :disabled="processing"
          >
            {{ processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

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
