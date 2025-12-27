<template>
  <Head :title="browserTitle" />
  <CheckScreen>
    <div class="mx-auto max-w-4xl py-8">
      <!-- Header -->
      <div class="mb-8">
        <Link
          href="/workspace"
          class="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Geri
        </Link>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Yeni Çalışma Alanı</h1>
        <p class="mt-2 text-muted-foreground">Çalışma alanınızı ve ürünlerinizi ekleyin.</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Images -->
        <div>
          <label for="images" class="mb-2 block text-sm font-medium text-foreground">
            Resimler
          </label>
          <div class="relative">
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              @change="handleImagesChange"
              class="w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
          <!-- Images Preview -->
          <div v-if="imagePreviews.length > 0" class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(preview, index) in imagePreviews" :key="index" class="relative group">
              <img :src="preview" alt="Preview" class="h-32 w-full rounded-lg border border-border object-cover" />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <p v-if="form.errors.images" class="mt-1 text-sm text-destructive">{{ form.errors.images }}</p>
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

        <!-- Products Section -->
        <div class="rounded-lg border border-border bg-card p-6">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground">Ürünler</h2>
            <button
              type="button"
              @click="addProduct"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ürün Ekle
            </button>
          </div>

          <div v-if="form.products.length === 0" class="py-8 text-center text-sm text-muted-foreground">
            Henüz ürün eklenmedi.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(product, index) in form.products"
              :key="index"
              class="rounded-lg border border-border bg-background p-4"
            >
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-sm font-medium text-foreground">Ürün {{ index + 1 }}</h3>
                <button
                  type="button"
                  @click="removeProduct(index)"
                  class="rounded-lg p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <!-- Name -->
                <div>
                  <label :for="`product-name-${index}`" class="mb-1 block text-xs font-medium text-foreground">
                    İsim <span class="text-destructive">*</span>
                  </label>
                  <input
                    :id="`product-name-${index}`"
                    v-model="product.name"
                    type="text"
                    class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ürün adı"
                    required
                  />
                </div>

                <!-- Features -->
                <div>
                  <label :for="`product-features-${index}`" class="mb-1 block text-xs font-medium text-foreground">
                    Özellikler
                  </label>
                  <textarea
                    :id="`product-features-${index}`"
                    v-model="product.features"
                    rows="3"
                    class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ürün özelliklerini buraya yazın..."
                  ></textarea>
                </div>

                <!-- Link -->
                <div>
                  <label :for="`product-link-${index}`" class="mb-1 block text-xs font-medium text-foreground">
                    Satın Alma Linki
                  </label>
                  <input
                    :id="`product-link-${index}`"
                    v-model="product.link"
                    type="url"
                    class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
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
            {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
          <Link
            href="/workspace"
            class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, useForm, usePage, Head } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();

// Browser tab title
const browserTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Yeni Çalışma Alanı'
  );
});

const form = useForm({
  images: [],
  status: 'published',
  products: [],
});

const imagePreviews = ref([]);

const handleImagesChange = (event) => {
  const files = Array.from(event.target.files);
  form.images = files;
  imagePreviews.value = files.map(file => URL.createObjectURL(file));
};

const removeImage = (index) => {
  form.images.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const addProduct = () => {
  form.products.push({
    name: '',
    features: '',
    link: '',
  });
};

const removeProduct = (index) => {
  form.products.splice(index, 1);
};

const submit = () => {
  const formData = new FormData();
  
  // Add images
  form.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });
  
  // Add status
  formData.append('status', form.status);
  
  // Add products
  form.products.forEach((product, index) => {
    formData.append(`products[${index}][name]`, product.name);
    if (product.features) formData.append(`products[${index}][features]`, product.features);
    if (product.link) formData.append(`products[${index}][link]`, product.link);
  });

  form.transform(() => formData).post('/workspace', {
    forceFormData: true,
  });
};
</script>

