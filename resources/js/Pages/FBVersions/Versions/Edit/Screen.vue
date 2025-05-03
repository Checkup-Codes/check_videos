<template>
  <CheckScreen>
    <GoBackButton url="/versions" />

    <!-- Card component directly implemented -->
    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="divider">Temel Bilgiler</div>

          <!-- Version Input -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Version</span>
            </label>
            <input v-model="form.version" type="text" class="input-bordered input w-full" />
            <label v-if="errors.version" class="label">
              <span class="label-text-alt text-error">{{ errors.version }}</span>
            </label>
          </div>

          <!-- Release Date Input -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Yayınlanma Tarihi</span>
            </label>
            <input v-model="form.release_date" type="date" class="input-bordered input w-full" />
            <label v-if="errors.release_date" class="label">
              <span class="label-text-alt text-error">{{ errors.release_date }}</span>
            </label>
          </div>

          <!-- Description Input -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Açıklama</span>
            </label>
            <textarea v-model="form.description" class="textarea-bordered textarea min-h-[120px] w-full"></textarea>
            <label v-if="errors.description" class="label">
              <span class="label-text-alt text-error">{{ errors.description }}</span>
            </label>
          </div>

          <!-- Features Section -->
          <div class="divider">Yeni Özellikler</div>

          <!-- Card component directly implemented -->
          <div
            class="card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
          >
            <div class="card-body p-6">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-semibold">Yeni Özellikler</h3>
                <button type="button" @click="addFeature" class="btn btn-outline btn-sm">
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

              <div v-if="form.features.length === 0" class="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.</span>
              </div>

              <div
                v-for="(feature, index) in form.features"
                :key="index"
                class="mb-4 rounded-lg border border-base-300 p-4"
              >
                <div class="space-y-3">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Özellik Adı</span>
                    </label>
                    <input
                      v-model="feature.feature_name"
                      placeholder="Yeni Özellik ismi"
                      class="input-bordered input w-full"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Açıklama</span>
                    </label>
                    <textarea
                      v-model="feature.feature_detail"
                      placeholder="Açıklaması"
                      class="textarea-bordered textarea min-h-[100px] w-full"
                    ></textarea>
                  </div>
                </div>
                <div class="mt-3">
                  <button type="button" @click="removeFeature(index)" class="btn btn-error btn-outline btn-sm">
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
              <label v-if="errors.features" class="label">
                <span class="label-text-alt text-error">{{ errors.features }}</span>
              </label>
            </div>
          </div>

          <!-- Bugs Section -->
          <div class="divider">Düzeltilen Hatalar</div>

          <!-- Card component directly implemented -->
          <div
            class="card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
          >
            <div class="card-body p-6">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-semibold">Bugs</h3>
                <button type="button" @click="addBug" class="btn btn-outline btn-sm">
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

              <div v-if="form.bugs.length === 0" class="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.</span>
              </div>

              <div v-for="(bug, index) in form.bugs" :key="index" class="mb-4 rounded-lg border border-base-300 p-4">
                <div class="space-y-3">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Hata Adı</span>
                    </label>
                    <input v-model="bug.bug_name" placeholder="Yeni Bug İsmi" class="input-bordered input w-full" />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Çözüm Açıklaması</span>
                    </label>
                    <textarea
                      v-model="bug.bug_detail"
                      placeholder="Bug Çözüm Açıklaması"
                      class="textarea-bordered textarea min-h-[100px] w-full"
                    ></textarea>
                  </div>
                </div>
                <div class="mt-3">
                  <button type="button" @click="removeBug(index)" class="btn btn-error btn-outline btn-sm">
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
              <label v-if="errors.bugs" class="label">
                <span class="label-text-alt text-error">{{ errors.bugs }}</span>
              </label>
            </div>
          </div>

          <div class="divider"></div>

          <div class="flex justify-end gap-2">
            <Link :href="`/versions/${props.version.id}`" class="btn btn-ghost">İptal</Link>
            <button type="submit" class="btn btn-primary">
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
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();

const form = useForm({
  version: '',
  release_date: '',
  description: '',
  features: [],
  bugs: [],
});

onMounted(() => {
  if (props.version) {
    form.version = props.version.version || '';
    form.release_date = props.version.release_date || '';
    form.description = props.version.description || '';
    form.features = props.version.features || [];
    form.bugs = props.version.bugs || [];
  }
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
        // Yönlendirme işlemi kaldırıldı çünkü server tarafında yapılıyor
      },
    });
  }
}
</script>
