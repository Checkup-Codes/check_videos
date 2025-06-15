<template>
  <div class="flex w-fit cursor-pointer items-center gap-4 rounded-lg p-4" @click="redirectToLogin">
    <div class="avatar">
      <div class="h-10 w-10 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100">
        <template v-if="!isLoading">
          <img
            :src="logoPath"
            :alt="logoAlt"
            class="h-full w-full rounded-full object-cover"
            @error="handleImageError"
          />
        </template>
        <!-- Skeleton Loading -->
        <div v-else class="h-full w-full rounded-full bg-base-200">
          <div
            class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <template v-if="!isLoading">
        <div class="font-semibold text-base-content">{{ seoTitle ?? 'Seo Title' }}</div>
        <div class="text-sm font-thin text-base-content">{{ seoDescription ?? 'Seo Description' }}</div>
      </template>
      <!-- Skeleton for text -->
      <div v-else class="space-y-2">
        <div class="h-5 w-32 animate-pulse rounded bg-base-200"></div>
        <div class="h-4 w-40 animate-pulse rounded bg-base-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';

const { props } = usePage();
const seoTitle = ref(props?.screen?.seo?.title ?? 'Seo Title');
const seoDescription = ref(props?.screen?.seo?.description ?? 'Seo Description');
const logoPath = ref(props?.screen?.seo?.logo ?? '');
const logoAlt = ref('Logo');
const isLoading = ref(false);

const redirectToLogin = () => {
  router.visit('/login');
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background-size: 200px 100%;
}
</style>
