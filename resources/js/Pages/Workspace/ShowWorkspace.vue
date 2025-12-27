<template>
  <Head :title="browserTitle" />
  <CheckScreen>
    <div class="mx-auto max-w-6xl py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <Link
          href="/workspace"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Geri
        </Link>
      </div>

      <!-- Workspace Content -->
      <article class="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <!-- Images Gallery -->
        <div v-if="workspace.images && workspace.images.length > 0" class="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(image, index) in workspace.images"
            :key="index"
            class="group relative overflow-hidden rounded-lg"
          >
            <img
              :src="`/storage/${image}`"
              :alt="`Çalışma Alanı Resim ${index + 1}`"
              class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div v-else class="flex aspect-video items-center justify-center bg-muted">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <!-- Content -->
        <div class="p-6 sm:p-8">
          <!-- Status -->
          <div class="mb-4 flex flex-wrap items-center gap-3">
            <span v-if="workspace.status === 'draft'" class="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">
              Taslak
            </span>
          </div>

          <!-- Products Section -->
          <div v-if="workspace.products && workspace.products.length > 0" class="mt-8">
            <h2 class="mb-6 text-2xl font-bold tracking-tight text-foreground">Ürünler</h2>
            <ul class="space-y-3">
              <li
                v-for="product in workspace.products"
                :key="product.id"
                class="flex items-start justify-between gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-sm"
              >
                <div class="flex-1">
                  <h3 class="mb-1 text-lg font-semibold text-foreground">{{ product.name }}</h3>
                  <p v-if="product.features" class="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{{ product.features }}</p>
                </div>
                <div v-if="product.link" class="flex-shrink-0">
                  <a
                    :href="product.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <span>Satın Al</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="mt-8 rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center">
            <p class="text-sm text-muted-foreground">Henüz ürün eklenmemiş.</p>
          </div>
        </div>
      </article>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage, Head } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();

// Browser tab title
const browserTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Çalışma Alanı'
  );
});

const props = defineProps({
  workspace: {
    type: Object,
    required: true,
  },
});

</script>

