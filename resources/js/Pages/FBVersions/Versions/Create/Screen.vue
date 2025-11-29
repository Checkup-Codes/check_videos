<template>
  <CheckScreen>
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 font-semibold text-foreground">Temel Bilgiler</span>
          </div>
        </div>

        <!-- Version Input -->
        <div class="w-full space-y-2">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Version
          </label>
          <input
            v-model="form.version"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p v-if="errors.version" class="text-xs text-destructive">{{ errors.version }}</p>
        </div>

        <!-- Release Date Input -->
        <div class="w-full space-y-2">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Yayınlanma Tarihi
          </label>
          <input
            v-model="form.release_date"
            type="date"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p v-if="errors.release_date" class="text-xs text-destructive">{{ errors.release_date }}</p>
        </div>

        <!-- Description Input -->
        <div class="w-full space-y-2">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Açıklama
          </label>
          <textarea
            v-model="form.description"
            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
          <p v-if="errors.description" class="text-xs text-destructive">{{ errors.description }}</p>
        </div>

        <!-- Features Section -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 font-semibold text-foreground">Yeni Özellikler</span>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-card shadow-sm transition-all duration-200">
          <div class="p-6">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-foreground">Yeni Özellikler</h3>
              <button
                type="button"
                @click="addFeature"
                class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-4 w-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Ekle
              </button>
            </div>

            <div v-if="form.features.length === 0" class="rounded-lg border border-border bg-muted p-4">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="text-foreground">Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.</span>
              </div>
            </div>

            <div
              v-for="(feature, index) in form.features"
              :key="index"
              class="mb-4 rounded-lg border border-border bg-muted p-4"
            >
              <div class="space-y-3">
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Özellik Adı
                  </label>
                  <input
                    v-model="feature.feature_name"
                    placeholder="Yeni Özellik ismi"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Açıklama
                  </label>
                  <textarea
                    v-model="feature.feature_detail"
                    placeholder="Açıklaması"
                    class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  @click="removeFeature(index)"
                  class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Kaldır
                </button>
              </div>
            </div>
            <p v-if="errors.features" class="text-xs text-destructive">{{ errors.features }}</p>
          </div>
        </div>

        <!-- Bugs Section -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 font-semibold text-foreground">Düzeltilen Hatalar</span>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-card shadow-sm transition-all duration-200">
          <div class="p-6">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-foreground">Bugs</h3>
              <button
                type="button"
                @click="addBug"
                class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-4 w-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Ekle
              </button>
            </div>

            <div v-if="form.bugs.length === 0" class="rounded-lg border border-border bg-muted p-4">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="text-foreground">Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.</span>
              </div>
            </div>

            <div v-for="(bug, index) in form.bugs" :key="index" class="mb-4 rounded-lg border border-border bg-muted p-4">
              <div class="space-y-3">
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Hata Adı
                  </label>
                  <input
                    v-model="bug.bug_name"
                    placeholder="Yeni Bug İsmi"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="w-full space-y-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Çözüm Açıklaması
                  </label>
                  <textarea
                    v-model="bug.bug_detail"
                    placeholder="Bug Çözüm Açıklaması"
                    class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  @click="removeBug(index)"
                  class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Kaldır
                </button>
              </div>
            </div>
            <p v-if="errors.bugs" class="text-xs text-destructive">{{ errors.bugs }}</p>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border"></span>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Link
            href="/versions"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            İptal
          </Link>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const form = useForm({
  version: '',
  release_date: '',
  description: '',
  features: [],
  bugs: [],
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
    form.post('/versions', {
      onSuccess: () => {
        form.reset();
      },
    });
  }
}
</script>
