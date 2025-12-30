<template>
  <Head :title="browserTitle" />
  <CheckScreen>
    <div class="space-y-6 py-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-foreground">Çalışma Alanını Düzenle</h1>
        <p class="mt-1 text-sm text-muted-foreground">Çalışma alanınızı ve ürünlerinizi güncelleyin</p>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <!-- Images Section -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <h2 class="mb-4 text-lg font-semibold text-foreground">Görseller</h2>
          
          <div class="space-y-4">
            <!-- Current Images -->
            <div v-if="currentImages.length > 0 && imagePreviews.length === 0">
              <p class="mb-2 text-sm text-muted-foreground">Mevcut Görseller</p>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                <div v-for="(image, index) in currentImages" :key="index" class="aspect-video overflow-hidden rounded-lg ring-1 ring-border">
                  <img :src="`/storage/${image}`" alt="Current" class="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <!-- Upload Area -->
            <label class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-8 transition-colors hover:border-primary">
              <svg class="mb-2 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-sm font-medium text-foreground">{{ currentImages.length > 0 ? 'Resimleri Değiştir' : 'Resim Yükle' }}</span>
              <span class="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP - max 5MB</span>
              <input type="file" accept="image/*" multiple class="hidden" @change="handleImagesChange" />
            </label>

            <!-- New Image Previews -->
            <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <div v-for="(preview, index) in imagePreviews" :key="index" class="group relative aspect-video overflow-hidden rounded-lg ring-1 ring-border">
                <img :src="preview" alt="Preview" class="h-full w-full object-cover" />
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <h2 class="mb-4 text-lg font-semibold text-foreground">Durum</h2>
          <div class="flex gap-4">
            <label class="flex cursor-pointer items-center gap-2">
              <input type="radio" v-model="form.status" value="published" class="h-4 w-4 border-input text-primary focus:ring-primary" />
              <span class="text-sm text-foreground">Yayınla</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input type="radio" v-model="form.status" value="draft" class="h-4 w-4 border-input text-primary focus:ring-primary" />
              <span class="text-sm text-foreground">Taslak</span>
            </label>
          </div>
        </div>

        <!-- Products Section -->
        <div class="rounded-xl bg-card p-6 ring-1 ring-border/50">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground">Ürünler</h2>
            <button
              type="button"
              @click="openProductModal()"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ürün Ekle
            </button>
          </div>

          <div v-if="form.products.length === 0" class="rounded-lg border border-dashed border-border py-8 text-center">
            <p class="text-sm text-muted-foreground">Henüz ürün eklenmedi</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(product, index) in form.products"
              :key="index"
              class="flex items-center justify-between rounded-lg border border-border bg-background p-4"
              :class="{ 'border-destructive': hasProductError(index) }"
            >
              <div class="min-w-0 flex-1">
                <h3 class="font-medium text-foreground">{{ product.name }}</h3>
                <p v-if="product.features" class="mt-1 truncate text-sm text-muted-foreground">{{ product.features }}</p>
                <a v-if="product.link" :href="product.link" target="_blank" class="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <span>Link</span>
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <!-- Validation Errors -->
                <div v-if="hasProductError(index)" class="mt-2 text-xs text-destructive">
                  <p v-if="product.name.length > 255">İsim 255 karakteri aşamaz ({{ product.name.length }}/255)</p>
                  <p v-if="product.link && !isValidUrl(product.link)">Geçersiz URL formatı</p>
                  <p v-if="product.link && product.link.length > 500">Link 500 karakteri aşamaz ({{ product.link.length }}/500)</p>
                </div>
              </div>
              <div class="ml-4 flex items-center gap-2">
                <button type="button" @click="openProductModal(index)" class="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button type="button" @click="confirmRemoveProduct(index)" class="rounded-lg p-2 text-destructive hover:bg-destructive/10">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Validation Summary -->
          <div v-if="hasAnyProductError" class="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            Bazı ürünlerde hata var. Lütfen düzeltin.
          </div>
        </div>

        <!-- Submit -->
        <div class="flex items-center justify-end gap-3">
          <Link href="/workspace" class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            İptal
          </Link>
          <button
            type="submit"
            :disabled="form.processing || hasAnyProductError"
            class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {{ form.processing ? 'Güncelleniyor...' : 'Güncelle' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Product Modal -->
    <Teleport to="body">
      <div v-if="showProductModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeProductModal">
        <div class="w-full max-w-md rounded-xl bg-card p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-foreground">{{ editingProductIndex !== null ? 'Ürünü Düzenle' : 'Yeni Ürün' }}</h3>
            <button @click="closeProductModal" class="text-muted-foreground hover:text-foreground">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">İsim <span class="text-destructive">*</span></label>
              <input
                v-model="productForm.name"
                type="text"
                maxlength="255"
                placeholder="Ürün adı"
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-destructive': productForm.name.length > 255 }"
              />
              <p class="mt-1 text-xs" :class="productForm.name.length > 255 ? 'text-destructive' : 'text-muted-foreground'">
                {{ productForm.name.length }}/255
              </p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Özellikler</label>
              <textarea
                v-model="productForm.features"
                rows="3"
                placeholder="Ürün özellikleri..."
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-foreground">Satın Alma Linki</label>
              <input
                v-model="productForm.link"
                type="url"
                maxlength="500"
                placeholder="https://..."
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-destructive': (productForm.link && !isValidUrl(productForm.link)) || productForm.link.length > 500 }"
              />
              <p class="mt-1 text-xs" :class="productForm.link.length > 500 ? 'text-destructive' : 'text-muted-foreground'">
                {{ productForm.link.length }}/500
                <span v-if="productForm.link && !isValidUrl(productForm.link)" class="text-destructive"> - Geçersiz URL</span>
              </p>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button @click="closeProductModal" class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
              İptal
            </button>
            <button 
              @click="saveProduct" 
              :disabled="!productForm.name || productForm.name.length > 255 || (productForm.link && (!isValidUrl(productForm.link) || productForm.link.length > 500))" 
              class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {{ editingProductIndex !== null ? 'Güncelle' : 'Ekle' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showDeleteConfirm = false">
        <div class="w-full max-w-sm rounded-xl bg-card p-6 shadow-xl">
          <h3 class="mb-2 text-lg font-semibold text-foreground">Ürünü Sil</h3>
          <p class="mb-4 text-sm text-muted-foreground">
            "{{ deleteProductName }}" ürününü silmek istediğinizden emin misiniz?
          </p>
          <div class="flex justify-end gap-3">
            <button @click="showDeleteConfirm = false" class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
              İptal
            </button>
            <button @click="removeProduct" class="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
              Sil
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Image Cropper -->
    <ImageCropper
      :show="showCropper"
      :image-src="cropperImageSrc"
      :aspect-ratio="16 / 9"
      @crop="handleCrop"
      @cancel="handleCropCancel"
    />
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Link, useForm, usePage, Head } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import ImageCropper from '@/Components/ImageCropper.vue';

const page = usePage();

const props = defineProps({
  workspace: { type: Object, required: true },
});

const browserTitle = computed(() => page.props?.screen?.seo?.title || 'Çalışma Alanı Düzenle');

const form = useForm({
  images: [],
  status: props.workspace.status || 'published',
  products: [],
  _method: 'PUT',
});

const currentImages = ref(props.workspace.images || []);
const imagePreviews = ref([]);

// Cropper state
const showCropper = ref(false);
const cropperImageSrc = ref('');
const pendingFiles = ref([]);
const currentCropIndex = ref(0);
const showProductModal = ref(false);
const editingProductIndex = ref(null);
const productForm = ref({ name: '', features: '', link: '' });
const showDeleteConfirm = ref(false);
const deleteProductIndex = ref(null);
const deleteProductName = ref('');

onMounted(() => {
  if (props.workspace.products?.length > 0) {
    form.products = props.workspace.products.map(p => ({
      name: p.name || '',
      features: p.features || '',
      link: p.link || '',
    }));
  }
});

const isValidUrl = (string) => {
  if (!string) return true;
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const hasProductError = (index) => {
  const product = form.products[index];
  return product.name.length > 255 || 
         (product.link && !isValidUrl(product.link)) || 
         (product.link && product.link.length > 500);
};

const hasAnyProductError = computed(() => {
  return form.products.some((_, index) => hasProductError(index));
});

const handleImagesChange = (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;
  
  // Clear existing new images when selecting new ones
  form.images = [];
  imagePreviews.value = [];
  
  // Store files for sequential cropping
  pendingFiles.value = files;
  currentCropIndex.value = 0;
  
  // Start cropping first image
  startCropping(files[0]);
};

const startCropping = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    cropperImageSrc.value = e.target.result;
    showCropper.value = true;
  };
  reader.readAsDataURL(file);
};

const handleCrop = (blob) => {
  // Create file from blob
  const fileName = pendingFiles.value[currentCropIndex.value]?.name || `image-${Date.now()}.jpg`;
  const croppedFile = new File([blob], fileName, { type: 'image/jpeg' });
  
  // Add to form
  form.images.push(croppedFile);
  imagePreviews.value.push(URL.createObjectURL(blob));
  
  // Close cropper
  showCropper.value = false;
  
  // Process next image if any
  currentCropIndex.value++;
  if (currentCropIndex.value < pendingFiles.value.length) {
    setTimeout(() => {
      startCropping(pendingFiles.value[currentCropIndex.value]);
    }, 100);
  } else {
    pendingFiles.value = [];
  }
};

const handleCropCancel = () => {
  showCropper.value = false;
  
  // Process next image if any, or clear pending
  currentCropIndex.value++;
  if (currentCropIndex.value < pendingFiles.value.length) {
    setTimeout(() => {
      startCropping(pendingFiles.value[currentCropIndex.value]);
    }, 100);
  } else {
    pendingFiles.value = [];
  }
};

const removeImage = (index) => {
  form.images.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const openProductModal = (index = null) => {
  editingProductIndex.value = index;
  if (index !== null) {
    productForm.value = { ...form.products[index] };
  } else {
    productForm.value = { name: '', features: '', link: '' };
  }
  showProductModal.value = true;
};

const closeProductModal = () => {
  showProductModal.value = false;
  editingProductIndex.value = null;
  productForm.value = { name: '', features: '', link: '' };
};

const saveProduct = () => {
  if (!productForm.value.name || productForm.value.name.length > 255) return;
  if (productForm.value.link && (!isValidUrl(productForm.value.link) || productForm.value.link.length > 500)) return;
  
  if (editingProductIndex.value !== null) {
    form.products[editingProductIndex.value] = { ...productForm.value };
  } else {
    form.products.push({ ...productForm.value });
  }
  closeProductModal();
};

const confirmRemoveProduct = (index) => {
  deleteProductIndex.value = index;
  deleteProductName.value = form.products[index].name;
  showDeleteConfirm.value = true;
};

const removeProduct = () => {
  if (deleteProductIndex.value !== null) {
    form.products.splice(deleteProductIndex.value, 1);
  }
  showDeleteConfirm.value = false;
  deleteProductIndex.value = null;
  deleteProductName.value = '';
};

const submit = () => {
  if (hasAnyProductError.value) return;
  form.post(`/workspace/${props.workspace.id}`, { forceFormData: true });
};
</script>
