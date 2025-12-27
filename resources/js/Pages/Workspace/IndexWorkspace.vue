<template>
  <Head :title="browserTitle" />
  <CheckScreen>
    <div class="mx-auto max-w-5xl py-8">
      <!-- Hero Section -->
      <div class="mb-12">
        <h1 class="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Çalışma Alanım</h1>
      </div>

      <!-- Single Workspace View -->
      <div v-if="workspaces.length === 1" class="space-y-8">
        <div class="overflow-hidden rounded-xl bg-card shadow-sm">
          <!-- Action Buttons (if logged in) -->
          <div v-if="isLoggedIn" class="flex items-center justify-end gap-2 p-4">
            <Link
              :href="`/workspace/${workspaces[0].id}/edit`"
              class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-3.5 w-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Düzenle
            </Link>
          </div>
          <!-- Images Gallery -->
          <div v-if="workspaces[0].images && workspaces[0].images.length > 0" class="space-y-2 p-4">
            <div
              v-for="(image, index) in workspaces[0].images"
              :key="index"
              class="group relative w-full overflow-hidden rounded-lg"
            >
              <img
                :src="`/storage/${image}`"
                :alt="`Çalışma Alanı Resim ${index + 1}`"
                class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <div v-else class="flex aspect-video items-center justify-center bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-muted-foreground/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <!-- Products List -->
          <div v-if="workspaces[0].products && workspaces[0].products.length > 0" class="p-6">
            <!-- Column Headers -->
            <div class="mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid">
              <div class="col-span-4">
                <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Ürün Adı</span>
              </div>
              <div class="col-span-5">
                <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Özellikler</span>
              </div>
              <div class="col-span-3 flex justify-end">
                <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">İşlem</span>
              </div>
            </div>
            <div class="space-y-3">
              <div
                v-for="product in workspaces[0].products"
                :key="product.id"
                class="grid grid-cols-12 items-center gap-4 py-2"
              >
                <!-- Product Name (Left) -->
                <div class="col-span-12 md:col-span-4">
                  <span class="text-sm font-medium text-foreground">{{ product.name }}</span>
                </div>
                <!-- Features (Center) -->
                <div class="col-span-12 md:col-span-5">
                  <p v-if="product.features" class="text-sm text-muted-foreground">
                    {{ product.features }}
                  </p>
                </div>
                <!-- Buy Link (Right) -->
                <div class="col-span-12 flex justify-end md:col-span-3">
                  <a
                    v-if="product.link"
                    :href="product.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-primary transition-colors hover:text-primary/80"
                  >
                    Satın Al
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Multiple Workspaces - Slider View -->
      <div v-else-if="workspaces.length > 1" class="relative">
        <!-- Slider Container -->
        <div class="relative overflow-hidden rounded-xl bg-card shadow-sm">
          <!-- Action Buttons (if logged in) -->
          <div v-if="isLoggedIn" class="flex items-center justify-end gap-2 p-4">
            <Link
              :href="`/workspace/${workspaces[currentIndex].id}/edit`"
              class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-3.5 w-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Düzenle
            </Link>
          </div>
          <!-- Workspaces Slider -->
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div v-for="workspace in workspaces" :key="workspace.id" class="min-w-full flex-shrink-0">
              <!-- Images Gallery -->
              <div v-if="workspace.images && workspace.images.length > 0" class="space-y-2 p-4">
                <div
                  v-for="(image, index) in workspace.images"
                  :key="index"
                  class="group relative w-full overflow-hidden rounded-lg"
                >
                  <img
                    :src="`/storage/${image}`"
                    :alt="`Çalışma Alanı Resim ${index + 1}`"
                    class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div v-else class="flex aspect-video items-center justify-center bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 text-muted-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Products List -->
              <div v-if="workspace.products && workspace.products.length > 0" class="p-6">
                <h2 class="mb-4 text-xl font-semibold text-foreground">Ürünler</h2>
                <!-- Column Headers -->
                <div class="mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid">
                  <div class="col-span-4">
                    <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Ürün Adı</span>
                  </div>
                  <div class="col-span-5">
                    <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Özellikler</span>
                  </div>
                  <div class="col-span-3 flex justify-end">
                    <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">İşlem</span>
                  </div>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="product in workspace.products"
                    :key="product.id"
                    class="grid grid-cols-12 items-center gap-4 py-2"
                  >
                    <!-- Product Name (Left) -->
                    <div class="col-span-12 md:col-span-4">
                      <span class="text-sm font-medium text-foreground">{{ product.name }}</span>
                    </div>
                    <!-- Features (Center) -->
                    <div class="col-span-12 md:col-span-5">
                      <p v-if="product.features" class="text-sm text-muted-foreground">
                        {{ product.features }}
                      </p>
                    </div>
                    <!-- Buy Link (Right) -->
                    <div class="col-span-12 flex justify-end md:col-span-3">
                      <a
                        v-if="product.link"
                        :href="product.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-primary transition-colors hover:text-primary/80"
                      >
                        Satın Al
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            v-if="workspaces.length > 1"
            @click="previousWorkspace"
            :disabled="currentIndex === 0"
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Önceki"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-if="workspaces.length > 1"
            @click="nextWorkspace"
            :disabled="currentIndex === workspaces.length - 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Sonraki"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div v-if="workspaces.length > 1" class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            <button
              v-for="(workspace, index) in workspaces"
              :key="workspace.id"
              @click="currentIndex = index"
              class="h-2 rounded-full transition-all"
              :class="currentIndex === index ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'"
              :aria-label="`Çalışma alanı ${index + 1}`"
            />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="mb-2 text-lg font-medium text-foreground">Henüz çalışma alanı yok</h3>
        <p class="text-sm text-muted-foreground">Çalışma alanları eklendiğinde burada görünecek.</p>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage, Head } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();

// Browser tab title
const browserTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Çalışma Alanım'
  );
});

const props = defineProps({
  workspaces: {
    type: Array,
    default: () => [],
  },
});

const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

const currentIndex = ref(0);

const nextWorkspace = () => {
  if (currentIndex.value < props.workspaces.length - 1) {
    currentIndex.value++;
  }
};

const previousWorkspace = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

<style scoped>
/* Smooth transitions for slider */
.flex {
  will-change: transform;
}
</style>
