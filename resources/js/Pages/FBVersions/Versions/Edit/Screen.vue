<template>
  <CheckScreen>
    <TopScreen title="Versionu Düzenle" />

    <div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5">
      <div class="container mx-auto">
        <form @submit.prevent="submitForm" class="space-y-5 p-5">
          <!-- Version Input -->
          <div class="space-y-2">
            <label
              for="version"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Version
            </label>
            <input
              v-model="form.version"
              type="text"
              id="version"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p v-if="errors.version" class="text-sm font-medium text-red-500">{{ errors.version }}</p>
          </div>

          <!-- Release Date Input -->
          <div class="space-y-2">
            <label
              for="release_date"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Yayınlanma Tarihi
            </label>
            <input
              v-model="form.release_date"
              type="date"
              id="release_date"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p v-if="errors.release_date" class="text-sm font-medium text-red-500">{{ errors.release_date }}</p>
          </div>

          <!-- Description Input -->
          <div class="space-y-2">
            <label
              for="description"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Açıklama
            </label>
            <textarea
              v-model="form.description"
              id="description"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
            <p v-if="errors.description" class="text-sm font-medium text-red-500">{{ errors.description }}</p>
          </div>

          <!-- Features Section -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Yeni Özellikler</h3>
              <button
                type="button"
                @click="addFeature"
                class="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
              >
                Yeni Özellik Ekle
              </button>
            </div>

            <div
              v-for="(feature, index) in form.features"
              :key="index"
              class="border-border space-y-4 rounded-lg border p-4"
            >
              <div class="space-y-2">
                <input
                  v-model="feature.feature_name"
                  placeholder="Yeni Özellik ismi"
                  class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                />
                <textarea
                  v-model="feature.feature_detail"
                  placeholder="Açıklaması"
                  class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                ></textarea>
              </div>
              <button
                type="button"
                @click="removeFeature(index)"
                class="text-destructive hover:text-destructive/80 text-sm font-medium"
              >
                Kaldır
              </button>
            </div>
            <p v-if="errors.features" class="text-sm font-medium text-red-500">{{ errors.features }}</p>
          </div>

          <!-- Bugs Section -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Bugs</h3>
              <button
                type="button"
                @click="addBug"
                class="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
              >
                Yeni Bug ekle
              </button>
            </div>

            <div v-for="(bug, index) in form.bugs" :key="index" class="border-border space-y-4 rounded-lg border p-4">
              <div class="space-y-2">
                <input
                  v-model="bug.bug_name"
                  placeholder="Yeni Bug İsmi"
                  class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                />
                <textarea
                  v-model="bug.bug_detail"
                  placeholder="Bug Çözüm Açıklaması"
                  class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                ></textarea>
              </div>
              <button
                type="button"
                @click="removeBug(index)"
                class="text-destructive hover:text-destructive/80 text-sm font-medium"
              >
                Kaldır
              </button>
            </div>
            <p v-if="errors.bugs" class="text-sm font-medium text-red-500">{{ errors.bugs }}</p>
          </div>

          <button
            type="submit"
            class="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();

const form = useForm({
  version: props.version.version,
  release_date: props.version.release_date,
  description: props.version.description,
  features: props.version.features || [{ feature_name: '', feature_detail: '' }],
  bugs: props.version.bugs || [{ bug_name: '', bug_detail: '' }],
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

  if (form.features.some((f) => !f.feature_name || !f.feature_detail)) {
    errors.value.features = 'Tüm özellik alanları doldurulmalıdır.';
  } else {
    errors.value.features = '';
  }

  if (form.bugs.some((b) => !b.bug_name || !b.bug_detail)) {
    errors.value.bugs = 'Tüm bug alanları doldurulmalıdır.';
  } else {
    errors.value.bugs = '';
  }

  return !Object.values(errors.value).some((error) => error !== '');
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
  if (validateForm()) {
    form.put(`/versions/${props.version.id}`, {
      onSuccess: () => {
        form.reset();
      },
    });
  }
}
</script>
