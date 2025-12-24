<template>
  <LayoutJourney>
    <template #screen>
      <CheckScreen>
        <div class="mx-auto max-w-2xl py-8">
          <!-- Header -->
          <div class="mb-8">
            <Link
              :href="`/journey/${entry.id}`"
              class="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Geri
            </Link>
            <h1 class="text-3xl font-bold tracking-tight text-foreground">Kaydı Düzenle</h1>
            <p class="mt-2 text-muted-foreground">Yolculuk kaydını güncelleyin.</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="submit" class="space-y-6">
            <!-- Date -->
            <div>
              <label for="entry_date" class="mb-2 block text-sm font-medium text-foreground">
                Tarih <span class="text-destructive">*</span>
              </label>
              <input
                id="entry_date"
                v-model="form.entry_date"
                type="date"
                class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <p v-if="form.errors.entry_date" class="mt-1 text-sm text-destructive">{{ form.errors.entry_date }}</p>
            </div>

            <!-- Title -->
            <div>
              <label for="title" class="mb-2 block text-sm font-medium text-foreground">
                Başlık <span class="text-destructive">*</span>
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Bu günün başlığı..."
                required
              />
              <p v-if="form.errors.title" class="mt-1 text-sm text-destructive">{{ form.errors.title }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="mb-2 block text-sm font-medium text-foreground">
                Açıklama
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="6"
                class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Bu gün hakkında notlarınız..."
              ></textarea>
              <p v-if="form.errors.description" class="mt-1 text-sm text-destructive">{{ form.errors.description }}</p>
            </div>

            <!-- Current Image -->
            <div v-if="entry.image && !imagePreview">
              <label class="mb-2 block text-sm font-medium text-foreground">Mevcut Görsel</label>
              <div class="overflow-hidden rounded-lg border border-border">
                <img :src="`/storage/${entry.image}`" :alt="entry.title" class="h-48 w-full object-cover" />
              </div>
            </div>

            <!-- Image -->
            <div>
              <label for="image" class="mb-2 block text-sm font-medium text-foreground">
                {{ entry.image ? 'Görseli Değiştir' : 'Görsel Ekle' }}
              </label>
              <div class="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <!-- New Image Preview -->
              <div v-if="imagePreview" class="mt-3 overflow-hidden rounded-lg border border-border">
                <img :src="imagePreview" alt="Preview" class="h-48 w-full object-cover" />
              </div>
              <p v-if="form.errors.image" class="mt-1 text-sm text-destructive">{{ form.errors.image }}</p>
            </div>

            <!-- Status -->
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">Durum</label>
              <div class="flex gap-4">
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    v-model="form.status"
                    value="published"
                    class="h-4 w-4 border-input text-primary focus:ring-primary"
                  />
                  <span class="text-sm text-foreground">Yayınla</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    v-model="form.status"
                    value="draft"
                    class="h-4 w-4 border-input text-primary focus:ring-primary"
                  />
                  <span class="text-sm text-foreground">Taslak</span>
                </label>
              </div>
            </div>

            <!-- Submit -->
            <div class="flex items-center gap-3 pt-4">
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg v-if="form.processing" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ form.processing ? 'Güncelleniyor...' : 'Güncelle' }}
              </button>
              <Link
                :href="`/journey/${entry.id}`"
                class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                İptal
              </Link>
            </div>
          </form>
        </div>
      </CheckScreen>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
});

// Format date for input
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const form = useForm({
  entry_date: formatDateForInput(props.entry.entry_date),
  title: props.entry.title,
  description: props.entry.description || '',
  image: null,
  status: props.entry.status,
  _method: 'PUT',
});

const imagePreview = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const submit = () => {
  form.post(`/journey/${props.entry.id}`, {
    forceFormData: true,
  });
};
</script>

