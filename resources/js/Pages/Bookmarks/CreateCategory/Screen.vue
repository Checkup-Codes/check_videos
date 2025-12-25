<template>
  <CheckScreen>
    <div class="space-y-4 py-6">
      <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- Name -->
          <div class="md:col-span-2" ref="nameRef">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">
                Kategori Adı <span class="text-destructive">*</span>
              </label>
              <input
                type="text"
                v-model="form.name"
                placeholder="Örn: Reading, VS Code, App & Tools"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.name }"
                required
              />
              <p v-if="form.errors.name" class="mt-1 text-xs text-destructive">{{ form.errors.name }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Link
            href="/bookmarks"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :disabled="form.processing"
          >
            İptal
          </Link>
          <button
            type="submit"
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            :disabled="form.processing"
          >
            <svg
              v-if="form.processing"
              class="mr-1 h-4 w-4 animate-spin"
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
              class="mr-1 h-4 w-4"
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
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const form = useForm({
  name: '',
  order: 0,
});

const nameRef = ref(null);

const submit = () => {
  form.post('/bookmark-categories', {
    onError: (errors) => {
      console.error('Create errors:', errors);
      // Scroll to first error
      if (nameRef.value && errors.name) {
        nameRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  });
};
</script>
