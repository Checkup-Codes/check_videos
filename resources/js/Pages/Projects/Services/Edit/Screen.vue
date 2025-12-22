<template>
  <CheckScreen>
    <GoBackButton :url="`/services/${form.id}`" />
    <TopScreen title="Servisi Düzenle" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-foreground">Servis Bilgileri</h3>

            <div ref="nameRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Servis Adı</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Servis adı"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.name || form.errors.name }"
                required
              />
              <p v-if="errors.name || form.errors.name" class="mt-1 text-xs text-destructive">
                {{ errors.name || form.errors.name }}
              </p>
            </div>

            <div ref="descriptionRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Servis Açıklaması</label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Servis açıklaması"
                class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.description || form.errors.description }"
              ></textarea>
              <p v-if="errors.description || form.errors.description" class="mt-1 text-xs text-destructive">
                {{ errors.description || form.errors.description }}
              </p>
            </div>

            <div ref="priceRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Fiyat</label>
              <div class="flex">
                <input
                  v-model="form.price"
                  type="number"
                  placeholder="Fiyat"
                  class="flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.price || form.errors.price }"
                />
                <span class="inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  USD
                </span>
              </div>
              <p v-if="errors.price || form.errors.price" class="mt-1 text-xs text-destructive">
                {{ errors.price || form.errors.price }}
              </p>
            </div>

            <div ref="parentIdRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Üst Kategori</label>
              <select
                v-model="form.parent_id"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.parent_id || form.errors.parent_id }"
              >
                <option :value="null">Yok</option>
                <option v-for="parent in parentOptions" :key="parent.id" :value="parent.id">
                  {{ parent.name }}
                </option>
              </select>
              <p v-if="errors.parent_id || form.errors.parent_id" class="mt-1 text-xs text-destructive">
                {{ errors.parent_id || form.errors.parent_id }}
              </p>
            </div>
          </div>

          <div class="space-y-4 border-t border-border pt-6">
            <h3 class="text-sm font-semibold text-foreground">Alt Kategoriler</h3>

            <div
              v-if="form.subCategories.length === 0"
              class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Henüz alt kategori bulunmamaktadır. "Alt Kategori Ekle" butonuyla ekleyebilirsiniz.</span>
            </div>

            <div
              v-for="(subCategory, index) in form.subCategories"
              :key="index"
              class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4 shadow-sm"
            >
              <div class="space-y-4">
                <div>
                  <label class="mb-1 block text-sm font-medium text-foreground">Alt Kategori Adı</label>
                  <input
                    v-model="subCategory.name"
                    type="text"
                    placeholder="Alt kategori adı"
                    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-foreground">Fiyat</label>
                  <div class="flex">
                    <input
                      v-model="subCategory.price"
                      type="number"
                      placeholder="Fiyat"
                      class="flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span class="inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                      USD
                    </span>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    @click.prevent="removeSubCategory(index)"
                    type="button"
                    class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                    Kaldır
                  </button>
                </div>
              </div>
            </div>

            <button
              @click.prevent="addSubCategory"
              type="button"
              class="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Alt Kategori Ekle
            </button>
          </div>

          <div class="flex items-center justify-between border-t border-border pt-4">
            <button
              @click.prevent="deleteService"
              type="button"
              class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              Servisi Sil
            </button>
            <div class="flex gap-2">
              <Link
                :href="`/services/${form.id}`"
                class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                İptal
              </Link>
              <button
                type="submit"
                class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, useForm, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const service = computed(() => props.service || {});

// Field refs for scroll to error
const nameRef = ref(null);
const descriptionRef = ref(null);
const priceRef = ref(null);
const parentIdRef = ref(null);

// Frontend validation errors
const errors = ref({
  name: '',
  description: '',
  price: '',
  parent_id: '',
});

const form = useForm({
  id: service.value.id,
  name: service.value.name || '',
  description: service.value.description || '',
  price: service.value.price || '',
  parent_id: service.value.parent_id || null,
  subCategories: service.value.subCategories || [],
});

form.processing = false;

const parentOptions = computed(() => {
  return (props.services || []).filter((s) => s.id !== form.id);
});

const addSubCategory = () => {
  form.subCategories.push({ name: '', price: '' });
};

const removeSubCategory = (index) => {
  form.subCategories.splice(index, 1);
};

const handleSubmit = () => {
  form.put(`/services/${form.id}`, {
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
    form.delete(`/services/${form.id}`);
  }
};
</script>
