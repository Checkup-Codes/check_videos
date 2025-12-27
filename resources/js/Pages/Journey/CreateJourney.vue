<template>
  <LayoutJourney>
    <template #screen>
      <div class="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <form @submit.prevent="submit" class="space-y-5">
          <!-- Title -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-foreground">
              Başlık <span class="text-destructive">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              :class="{ 'border-destructive': form.errors.title }"
              placeholder="Bu günün başlığı..."
              required
            />
            <p v-if="form.errors.title" class="mt-1 text-xs text-destructive">{{ form.errors.title }}</p>
          </div>

          <!-- Date -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-foreground">
              Tarih <span class="text-destructive">*</span>
            </label>
            <input
              v-model="form.entry_date"
              type="date"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              :class="{ 'border-destructive': form.errors.entry_date }"
              required
            />
            <p v-if="form.errors.entry_date" class="mt-1 text-xs text-destructive">{{ form.errors.entry_date }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-foreground">Açıklama</label>
            <textarea
              v-model="form.description"
              rows="5"
              class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              :class="{ 'border-destructive': form.errors.description }"
              placeholder="Bu gün hakkında notlarınız..."
            ></textarea>
            <p v-if="form.errors.description" class="mt-1 text-xs text-destructive">{{ form.errors.description }}</p>
          </div>

          <!-- Image -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-foreground">Görsel</label>
            <div 
              class="relative flex min-h-[140px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
              @click="$refs.imageInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="hidden"
              />
              <div v-if="!imagePreview" class="text-center p-4">
                <svg class="mx-auto h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-2 text-sm text-muted-foreground">Tıklayın veya sürükleyin</p>
              </div>
              <img v-else :src="imagePreview" alt="Preview" class="h-full max-h-[200px] w-full rounded-md object-cover" />
            </div>
            <button
              v-if="imagePreview"
              type="button"
              @click="clearImage"
              class="mt-2 text-xs text-destructive hover:underline"
            >
              Görseli Kaldır
            </button>
            <p v-if="form.errors.image" class="mt-1 text-xs text-destructive">{{ form.errors.image }}</p>
          </div>

          <!-- Status -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-foreground">Durum</label>
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

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/journey"
              class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              İptal
            </Link>
            <button
              type="submit"
              :disabled="form.processing"
              class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              <svg v-if="form.processing" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';

const today = new Date().toISOString().split('T')[0];

const form = useForm({
  entry_date: today,
  title: '',
  description: '',
  image: null,
  status: 'published',
});

const imagePreview = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const clearImage = () => {
  form.image = null;
  imagePreview.value = null;
};

const submit = () => {
  form.post('/journey', {
    forceFormData: true,
  });
};
</script>
