<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-foreground">{{ service.name }}</h1>
        <div v-if="service.price" class="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2">
          <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-semibold text-primary">{{ formatPrice(service.price) }}</span>
        </div>
      </div>

      <!-- Description with Quill Content -->
      <div
        v-if="service.description"
        class="quill-content prose prose-sm dark:prose-invert mb-6 rounded-lg border border-border bg-card p-6"
        v-html="service.description"
      ></div>

      <!-- Parent Category -->
      <div v-if="service.parentCategory" class="mb-6">
        <h3 class="mb-3 text-sm font-semibold text-foreground">Üst Kategori</h3>
        <div class="rounded-lg border border-border bg-card p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-foreground">{{ service.parentCategory.name }}</h4>
              <div
                v-if="service.parentCategory.description"
                class="quill-content prose prose-sm dark:prose-invert mt-2"
                v-html="service.parentCategory.description"
              ></div>
            </div>
            <div v-if="service.parentCategory.price" class="shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              {{ formatPrice(service.parentCategory.price) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Sub Categories -->
      <div v-if="service.subCategories && service.subCategories.length" class="mb-6">
        <h3 class="mb-3 text-sm font-semibold text-foreground">Alt Hizmetler</h3>
        <ul class="space-y-2">
          <li
            v-for="subCategory in service.subCategories"
            :key="subCategory.id"
            class="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{{ subCategory.name }}</h4>
                <div
                  v-if="subCategory.description"
                  class="quill-content prose prose-sm dark:prose-invert mt-2"
                  v-html="subCategory.description"
                ></div>
              </div>
              <div v-if="subCategory.price" class="shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                {{ formatPrice(subCategory.price) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-styles.css';

const { props } = usePage();
const service = props.service;

const formatPrice = (price) => {
  if (!price) return '₺0';
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);
};
</script>
