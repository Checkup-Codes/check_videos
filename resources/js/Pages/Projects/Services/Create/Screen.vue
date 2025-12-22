<template>
  <CheckScreen>
    <GoBackButton url="/services" />
    <TopScreen title="Yeni Servis Oluştur" />

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

            <div ref="slugRef">
              <label class="mb-1 block text-sm font-medium text-foreground">Servis Kısa Adı</label>
              <input
                v-model="form.slug"
                type="text"
                placeholder="Servis kısa adı"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.slug || form.errors.slug }"
                required
              />
              <p v-if="errors.slug || form.errors.slug" class="mt-1 text-xs text-destructive">
                {{ errors.slug || form.errors.slug }}
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
                required
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
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Üst kategori arayın ve seçin"
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.parent_id || form.errors.parent_id }"
                  @focus="showDropdown = true"
                  @blur="hideDropdownWithDelay"
                />
                <ul
                  v-if="showDropdown && filteredCategories.length"
                  class="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"
                >
                  <li
                    v-for="parent in filteredCategories"
                    :key="parent.id"
                    @mousedown.prevent="selectParent(parent)"
                    class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {{ parent.name }}
                  </li>
                </ul>
              </div>
              <p v-if="errors.parent_id || form.errors.parent_id" class="mt-1 text-xs text-destructive">
                {{ errors.parent_id || form.errors.parent_id }}
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-border pt-4">
            <Link
              href="/services"
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
              {{ form.processing ? 'Oluşturuluyor...' : 'Servisi Oluştur' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const parentOptions = computed(() => props.services || []);

// Field refs for scroll to error
const nameRef = ref(null);
const slugRef = ref(null);
const descriptionRef = ref(null);
const priceRef = ref(null);
const parentIdRef = ref(null);

// Frontend validation errors
const errors = ref({
  name: '',
  slug: '',
  description: '',
  price: '',
  parent_id: '',
});

const form = useForm({
  name: '',
  slug: '',
  description: '',
  price: null,
  parent_id: null,
});

form.processing = false;

const searchQuery = ref('');
const showDropdown = ref(false);

const filteredCategories = computed(() => {
  if (!searchQuery.value) return parentOptions.value;
  return parentOptions.value.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const selectParent = (parent) => {
  form.parent_id = parent.id;
  searchQuery.value = parent.name;
  showDropdown.value = false;
};

const hideDropdownWithDelay = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const handleSubmit = () => {
  form.post('/services', {
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
</script>
