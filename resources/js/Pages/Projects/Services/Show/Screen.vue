<template>
  <CheckScreen>
    <GoBackButton url="/services" />
    <TopScreen title="Servis Detayı" />

    <div class="rounded-lg border border-border bg-card shadow-sm">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ service.name }}</h1>
            <p v-if="service.description" class="mt-2 text-sm text-muted-foreground">{{ service.description }}</p>
          </div>
          <Link
            :href="`/services/${service.id}/edit`"
            class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Düzenle
          </Link>
        </div>

        <div class="space-y-6 border-t border-border pt-6">
          <div>
            <h4 class="text-xs font-medium text-muted-foreground">Fiyat</h4>
            <p class="mt-1 text-sm font-semibold text-foreground">
              <span v-if="service.price">{{ service.price }} USD</span>
              <span v-else class="text-muted-foreground">Uygun Değil</span>
            </p>
          </div>

          <div v-if="service.parentCategory" class="space-y-4 border-t border-border pt-6">
            <h3 class="text-sm font-semibold text-foreground">Üst Kategori</h3>
            <div class="rounded-md border border-border bg-muted/30 p-4">
              <h4 class="text-sm font-semibold text-foreground">{{ service.parentCategory.name }}</h4>
              <p v-if="service.parentCategory.description" class="mt-1 text-sm text-muted-foreground">
                {{ service.parentCategory.description }}
              </p>
              <p class="mt-2 text-sm font-semibold text-foreground">
                Fiyat:
                <span v-if="service.parentCategory.price">{{ service.parentCategory.price }} USD</span>
                <span v-else class="text-muted-foreground">Uygun Değil</span>
              </p>
            </div>
          </div>

          <div v-if="service.subCategories && service.subCategories.length" class="space-y-4 border-t border-border pt-6">
            <h3 class="text-sm font-semibold text-foreground">Alt Kategoriler</h3>
            <ul class="space-y-3">
              <li
                v-for="subCategory in service.subCategories"
                :key="subCategory.id"
                class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4"
              >
                <h4 class="text-sm font-semibold text-foreground">{{ subCategory.name }}</h4>
                <p v-if="subCategory.description" class="mt-1 text-sm text-muted-foreground">
                  {{ subCategory.description }}
                </p>
                <p class="mt-2 text-sm font-semibold text-foreground">
                  Fiyat:
                  <span v-if="subCategory.price">{{ subCategory.price }} USD</span>
                  <span v-else class="text-muted-foreground">Uygun Değil</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';

const { props } = usePage();
const service = props.service;
</script>

