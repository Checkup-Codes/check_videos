<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl">
      <GoBackButton url="/services" />
      <div class="mt-6">
        <h1 class="text-2xl font-bold text-foreground">{{ service.name }}</h1>
        <div
          v-if="service.description"
          class="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground"
          v-html="formatDescription(service.description)"
        ></div>
      </div>

      <div class="mt-6 space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div>
          <h4 class="text-xs font-medium text-muted-foreground">Fiyat</h4>
          <p class="mt-1 text-sm font-semibold text-foreground">
            <span v-if="service.price">{{ formatPrice(service.price) }}</span>
            <span v-else class="text-muted-foreground">Uygun Değil</span>
          </p>
        </div>

        <div v-if="service.parentCategory" class="border-t border-border pt-6">
          <h3 class="mb-4 text-sm font-semibold text-foreground">Üst Kategori</h3>
          <div class="rounded-md border border-border bg-muted/30 p-4">
            <h4 class="text-sm font-semibold text-foreground">{{ service.parentCategory.name }}</h4>
            <div
              v-if="service.parentCategory.description"
              class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
              v-html="formatDescription(service.parentCategory.description)"
            ></div>
            <p class="mt-3 text-sm font-semibold text-foreground">
              Fiyat:
              <span v-if="service.parentCategory.price">{{ formatPrice(service.parentCategory.price) }}</span>
              <span v-else class="text-muted-foreground">Uygun Değil</span>
            </p>
          </div>
        </div>

        <div v-if="service.subCategories && service.subCategories.length" class="border-t border-border pt-6">
          <h3 class="mb-4 text-sm font-semibold text-foreground">Alt Kategoriler</h3>
          <ul class="space-y-3">
            <li
              v-for="subCategory in service.subCategories"
              :key="subCategory.id"
              class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4"
            >
              <h4 class="text-sm font-semibold text-foreground">{{ subCategory.name }}</h4>
              <div
                v-if="subCategory.description"
                class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                v-html="formatDescription(subCategory.description)"
              ></div>
              <p class="mt-3 text-sm font-semibold text-foreground">
                Fiyat:
                <span v-if="subCategory.price">{{ formatPrice(subCategory.price) }}</span>
                <span v-else class="text-muted-foreground">Uygun Değil</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const service = props.service;

const formatPrice = (price) => {
  if (!price) return 'Uygun Değil';
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2 }).format(price);
};

const formatDescription = (text) => {
  if (!text) return '';
  // Convert newlines to <br> tags and preserve whitespace
  return text
    .replace(/\n/g, '<br>')
    .replace(/  /g, ' &nbsp;'); // Preserve double spaces
};
</script>
