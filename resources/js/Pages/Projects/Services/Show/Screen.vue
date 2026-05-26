<template>
  <ProjectsPageFrame :title="service.name" :description="service.price ? formatPrice(service.price) : ''">
      <div v-if="coverImage" class="mb-4 overflow-hidden rounded-md border border-border">
        <ZoomableImage
          :src="coverImage"
          :alt="service.name"
          :gallery="allServiceImages"
          :index="0"
          wrapper-class="w-full"
          img-class="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div v-if="galleryImages.length" class="mb-4 flex gap-2 overflow-x-auto pb-1">
        <ZoomableImage
          v-for="(image, galleryIndex) in galleryImages"
          :key="image.id"
          :src="image.image_path"
          :alt="image.alt_text || service.name"
          :gallery="allServiceImages"
          :index="galleryIndex + 1"
          wrapper-class="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border"
          img-class="h-full w-full object-cover"
        />
      </div>

      <div
        v-if="service.description"
        class="quill-content prose prose-sm dark:prose-invert mb-4 rounded-md border border-border bg-card p-4"
        v-html="service.description"
      ></div>

      <div v-if="service.parentCategory" class="mb-4 rounded-md border border-border p-3">
        <p class="mb-1 text-xs text-muted-foreground">Üst kategori</p>
        <p class="text-sm font-medium text-foreground">{{ service.parentCategory.name }}</p>
      </div>

      <div v-if="service.subCategories?.length">
        <p class="mb-2 text-xs font-medium text-muted-foreground">Alt hizmetler</p>
        <div class="divide-y divide-border rounded-md border border-border">
          <Link
            v-for="subCategory in service.subCategories"
            :key="subCategory.id"
            :href="`/services/${subCategory.id}`"
            class="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
          >
            <div class="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30">
              <ZoomableImage
                v-if="subCategory.images?.[0]?.image_path"
                :src="subCategory.images[0].image_path"
                :alt="subCategory.name"
                wrapper-class="h-full w-full"
                img-class="h-full w-full object-cover"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-foreground">{{ subCategory.name }}</p>
              <p v-if="subCategory.price" class="text-xs text-muted-foreground">{{ formatPrice(subCategory.price) }}</p>
            </div>
          </Link>
        </div>
      </div>
  </ProjectsPageFrame>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ProjectsPageFrame from '@/Pages/Projects/_components/ProjectsPageFrame.vue';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';
import '@/Shared/Css/quill-styles.css';

const page = usePage();
const service = computed(() => page.props.service || {});

const coverImage = computed(() => service.value.images?.[0]?.image_path || null);
const galleryImages = computed(() => (service.value.images || []).slice(1));
const allServiceImages = computed(() => service.value.images || []);

const formatPrice = (price) => {
  if (!price) return '₺0';
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);
};
</script>
