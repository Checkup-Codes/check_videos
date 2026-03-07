<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <div class="mb-6">
        <h1 class="text-xl font-semibold text-foreground">Yeni Hizmet</h1>
        <p class="mt-1 text-xs text-muted-foreground">Yeni bir hizmet oluşturun</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div class="space-y-4">
            <div>
              <label class="mb-1.5 block text-xs font-medium text-foreground">Hizmet Adı</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Örn: Web Geliştirme"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.name || form.errors.name }"
                required
              />
              <p v-if="errors.name || form.errors.name" class="mt-1 text-xs text-destructive">
                {{ errors.name || form.errors.name }}
              </p>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-medium text-foreground">Açıklama</label>
              <RichTextEditor
                v-model="form.description"
                placeholder="Hizmet hakkında detaylı açıklama yazın..."
                height="300px"
                :error="errors.description || form.errors.description"
              />
              <p v-if="errors.description || form.errors.description" class="mt-1 text-xs text-destructive">
                {{ errors.description || form.errors.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-xs font-medium text-foreground">Fiyat</label>
                <div class="relative">
                  <input
                    v-model="form.price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.price || form.errors.price }"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₺</span>
                </div>
                <p v-if="errors.price || form.errors.price" class="mt-1 text-xs text-destructive">
                  {{ errors.price || form.errors.price }}
                </p>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-medium text-foreground">Üst Kategori</label>
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Ara ve seç..."
                    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.parent_id || form.errors.parent_id }"
                    @focus="showDropdown = true"
                    @blur="hideDropdownWithDelay"
                  />
                  <ul
                    v-if="showDropdown && filteredCategories.length"
                    class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-lg"
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
          </div>
        </div>

        <div class="flex items-center justify-end gap-2">
          <Link
            href="/services"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-xs font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            İptal
          </Link>
          <button
            type="submit"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :disabled="form.processing"
          >
            <svg
              v-if="form.processing"
              class="h-3.5 w-3.5 animate-spin"
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
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ form.processing ? 'Oluşturuluyor...' : 'Oluştur' }}
          </button>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import RichTextEditor from '@/Pages/WritesCategories/_components/RichTextEditor.vue';

const { props } = usePage();
const parentOptions = computed(() => props.services || []);

const errors = ref({
  name: '',
  slug: '',
  description: '',
  price: '',
  parent_id: '',
});

const form = useForm({
  name: '',
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
