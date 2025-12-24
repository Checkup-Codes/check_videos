<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-foreground">Servisi Düzenle</h1>
        <p class="mt-1 text-sm text-muted-foreground">{{ service.name }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div class="space-y-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Servis Adı</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Örn: Web Geliştirme"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.name || form.errors.name }"
                required
              />
              <p v-if="errors.name || form.errors.name" class="mt-1.5 text-xs text-destructive">
                {{ errors.name || form.errors.name }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Açıklama</label>
              <textarea
                v-model="form.description"
                rows="8"
                placeholder="Servis hakkında detaylı açıklama yazabilirsiniz..."
                class="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.description || form.errors.description }"
              ></textarea>
              <p v-if="errors.description || form.errors.description" class="mt-1.5 text-xs text-destructive">
                {{ errors.description || form.errors.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Fiyat</label>
                <div class="relative">
                  <input
                    v-model="form.price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.price || form.errors.price }"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₺</span>
                </div>
                <p v-if="errors.price || form.errors.price" class="mt-1.5 text-xs text-destructive">
                  {{ errors.price || form.errors.price }}
                </p>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">Üst Kategori</label>
                <select
                  v-model="form.parent_id"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.parent_id || form.errors.parent_id }"
                >
                  <option :value="null">Yok</option>
                  <option v-for="parent in parentOptions" :key="parent.id" :value="parent.id">
                    {{ parent.name }}
                  </option>
                </select>
                <p v-if="errors.parent_id || form.errors.parent_id" class="mt-1.5 text-xs text-destructive">
                  {{ errors.parent_id || form.errors.parent_id }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3">
          <button
            @click.prevent="deleteService"
            type="button"
            class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Sil
          </button>
          <div class="flex gap-3">
            <Link
              :href="`/services/${serviceId}`"
              class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              İptal
            </Link>
            <button
              type="submit"
              class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              :disabled="form.processing"
            >
              <svg
                v-if="form.processing"
                class="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, useForm, Link, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const service = computed(() => props.service || {});

// Frontend validation errors
const errors = ref({
  name: '',
  description: '',
  price: '',
  parent_id: '',
});

const serviceId = computed(() => service.value.id);

const form = useForm({
  name: service.value.name || '',
  description: service.value.description || '',
  price: service.value.price || null,
  parent_id: service.value.sub_category_id || null,
});

form.processing = false;

const parentOptions = computed(() => {
  return (props.services || []).filter((s) => s.id !== serviceId.value);
});

const handleSubmit = () => {
  form.put(`/services/${serviceId.value}`, {
    onSuccess: () => {
      router.visit('/services');
    },
    onError: (serverErrors) => {
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          if (errors.value.hasOwnProperty(key)) {
            errors.value[key] = serverErrors[key];
          }
        });
      }
    },
  });
};

const deleteService = () => {
  if (confirm('Bu servisi silmek istediğinize emin misiniz?')) {
    router.delete(`/services/${serviceId.value}`, {
      onSuccess: () => {
        router.visit('/services');
      },
    });
  }
};
</script>
