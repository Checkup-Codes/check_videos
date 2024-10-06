<template>
  <div class="container mx-auto bg-screen-bg p-6">
    <h1 class="mb-4 text-2xl font-bold">{{ form.version }} Versionu Düzenle</h1>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="space-y-2">
        <label for="version" class="block text-sm font-medium text-gray-700">Version</label>
        <input v-model="form.version" type="text" id="version" class="w-full rounded-md border-gray-300 shadow-sm" />
        <p v-if="errors.version" class="text-sm text-red-500">{{ errors.version }}</p>
      </div>

      <div class="space-y-2">
        <label for="release_date" class="block text-sm font-medium text-gray-700">Yayınlanma Tarihi</label>
        <input
          v-model="form.release_date"
          type="date"
          id="release_date"
          class="w-full rounded-md border-gray-300 shadow-sm"
        />
        <p v-if="errors.release_date" class="text-sm text-red-500">{{ errors.release_date }}</p>
      </div>

      <div class="space-y-2">
        <label for="description" class="block text-sm font-medium text-gray-700">Açıklama</label>
        <textarea
          v-model="form.description"
          id="description"
          class="w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
        <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
      </div>

      <!-- Features Input -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Yeni Özellikler</h3>
        <div v-for="(feature, index) in form.features" :key="index" class="space-y-2">
          <input
            v-model="feature.feature_name"
            placeholder="Yeni Özellik ismi"
            class="w-full rounded-md border-gray-300 shadow-sm"
          />
          <input
            v-model="feature.feature_detail"
            placeholder="Açıklaması"
            class="w-full rounded-md border-gray-300 shadow-sm"
          />
          <button type="button" @click="removeFeature(index)" class="text-red-600 hover:underline">Kaldır</button>
        </div>
        <p v-if="errors.features" class="text-sm text-red-500">{{ errors.features }}</p>
        <button type="button" @click="addFeature" class="text-blue-600 hover:underline">Yeni Özellik Ekle</button>
      </div>

      <!-- Bugs Input -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Çözülen Buglar</h3>
        <div v-for="(bug, index) in form.bugs" :key="index" class="space-y-2">
          <input
            v-model="bug.bug_name"
            placeholder="Yeni Bug İsmi"
            class="w-full rounded-md border-gray-300 shadow-sm"
          />
          <input
            v-model="bug.bug_detail"
            placeholder="Bug Çözüm Açıklaması"
            class="w-full rounded-md border-gray-300 shadow-sm"
          />
          <button type="button" @click="removeBug(index)" class="text-red-600 hover:underline">Kaldır</button>
        </div>
        <p v-if="errors.bugs" class="text-sm text-red-500">{{ errors.bugs }}</p>
        <button type="button" @click="addBug" class="text-blue-600 hover:underline">Yeni Bug ekle</button>
      </div>

      <button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white">Değişiklikleri Kaydet</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();

const form = useForm({
  version: props.version.version,
  release_date: props.version.release_date,
  description: props.version.description,
  features: props.version.features,
  bugs: props.version.bugs,
});

const errors = ref({
  version: '',
  release_date: '',
  description: '',
  features: '',
  bugs: '',
});

function validateForm() {
  errors.value.version = form.version ? '' : 'Version alanı zorunludur.';
  errors.value.release_date = form.release_date ? '' : 'Yayınlanma tarihi zorunludur.';
  errors.value.description = form.description ? '' : 'Açıklama alanı zorunludur.';
  errors.value.features = form.features.length > 0 ? '' : 'En az bir özellik eklenmelidir.';
  errors.value.bugs = form.bugs.length > 0 ? '' : 'En az bir bug eklenmelidir.';
}

function addFeature() {
  form.features.push({ feature_name: '', feature_detail: '' });
}

function removeFeature(index) {
  form.features.splice(index, 1);
}

function addBug() {
  form.bugs.push({ bug_name: '', bug_detail: '' });
}

function removeBug(index) {
  form.bugs.splice(index, 1);
}

function submitForm() {
  validateForm();

  if (!Object.values(errors.value).some((error) => error !== '')) {
    form.put(`/versions/${props.version.id}`, {
      onSuccess: () => {},
    });
  }
}
</script>
