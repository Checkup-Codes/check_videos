<template>
  <div ref="vantaRef" class="relative min-h-[calc(100vh-3rem)] w-full overflow-hidden">
    <!-- Hero Section -->
    <section class="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center px-4 py-12 sm:py-16">
      <div class="mx-auto max-w-6xl text-center">
        <!-- Logo Section -->
        <div class="mb-8 flex justify-center">
          <div class="relative h-64 w-64 sm:h-80 sm:w-80">
            <template v-if="!isLoading">
              <template v-if="logoPath">
                <img
                  :src="logoPath"
                  :alt="logoAlt"
                  class="h-full w-full rounded-full object-cover shadow-2xl ring-4 ring-primary/20 transition-all duration-500 hover:scale-105 hover:ring-primary/40"
                  @error="handleImageError"
                />
              </template>
              <template v-else>
                <div
                  class="flex h-full w-full items-center justify-center rounded-full bg-primary/10 shadow-2xl ring-4 ring-primary/20 transition-all duration-500 hover:scale-105 hover:ring-primary/40"
                >
                  <span class="text-7xl font-bold text-primary sm:text-8xl">
                    {{ seoTitle.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </template>
            </template>
            <!-- Skeleton Loading -->
            <div v-else class="animate-pulse">
              <div class="h-full w-full rounded-full bg-muted">
                <div
                  class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-muted via-background to-muted"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Title & Description -->
        <div v-if="!isLoading" class="space-y-6">
          <h1
            class="animate-fade-in-down text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {{ seoTitle }}
          </h1>
          <p class="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {{ seoDescription }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/writes" class="btn btn-primary btn-lg w-full sm:w-auto">
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Yazıları Keşfet
            </Link>
            <Link href="/categories" class="btn btn-outline btn-lg w-full sm:w-auto">
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Kategoriler
            </Link>
          </div>
        </div>

        <!-- Loading Skeletons -->
        <div v-else class="space-y-6">
          <div class="mx-auto h-12 w-64 animate-pulse rounded bg-muted sm:h-16 sm:w-96"></div>
          <div class="mx-auto h-6 w-96 animate-pulse rounded bg-muted sm:h-8 sm:w-[500px]"></div>
          <div class="flex justify-center gap-4">
            <div class="h-12 w-32 animate-pulse rounded bg-muted"></div>
            <div class="h-12 w-32 animate-pulse rounded bg-muted"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 border-t border-border bg-background/80 py-20 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Özellikler</h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Modern ve kullanıcı dostu içerik yönetim sistemi
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div
            class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-card-foreground">Zengin İçerik</h3>
            <p class="text-muted-foreground">
              Kategorize edilmiş, detaylı ve güncel içeriklerle bilgiye kolayca ulaşın.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-card-foreground">Modern Tasarım</h3>
            <p class="text-muted-foreground">Shadcn UI ile tasarlanmış, dark mode destekli modern ve şık arayüz.</p>
          </div>

          <!-- Feature 3 -->
          <div
            class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-card-foreground">Hızlı Erişim</h3>
            <p class="text-muted-foreground">Optimize edilmiş performans ile içeriklere hızlı ve sorunsuz erişim.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative z-10 border-t border-border bg-muted/30 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary sm:text-5xl">100+</div>
            <div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base">İçerik</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary sm:text-5xl">50+</div>
            <div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base">Kategori</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary sm:text-5xl">24/7</div>
            <div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base">Erişim</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary sm:text-5xl">100%</div>
            <div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base">Ücretsiz</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 border-t border-border bg-background py-20">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Hemen Başlayın</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          İçerikleri keşfedin ve bilgiye ulaşmanın en kolay yolunu deneyin.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/writes" class="btn btn-primary btn-lg"> Tüm Yazıları Görüntüle </Link>
          <Link href="/categories" class="btn btn-outline btn-lg"> Kategorilere Göz At </Link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { usePage, Link } from '@inertiajs/vue3';
import { useStore } from 'vuex';

const { props } = usePage();
const store = useStore();

const seoTitle = ref(props.screen.seo.title);
const seoDescription = ref(props.screen.seo.description);
const logoPath = ref(props.screen.seo.logo);
const logoAlt = ref('Logo');
const vantaRef = ref(null);
let vantaEffect = null;
const isLoading = ref(false);
let isUpdating = false; // Güncelleme flag'i
let updateTimeout = null; // Debounce timeout

// Tema değişikliğini dinle
const isDarkTheme = computed(() => store.getters['Theme/isDarkTheme']);

const handleImageError = () => {
  logoPath.value = null;
};

// Vanta animasyonunu başlat/güncelle
const initVanta = async () => {
  if (!vantaRef.value || isUpdating) return;

  isUpdating = true;

  // Mevcut animasyonu tamamen temizle
  if (vantaEffect) {
    try {
      vantaEffect.destroy();
    } catch (e) {
      console.warn('Vanta destroy error:', e);
    }
    vantaEffect = null;
  }

  // DOM güncellemesini bekle
  await nextTick();

  // Kısa bir gecikme ile animasyonun tamamen temizlendiğinden emin ol
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Tema kontrolü için dark class'ını kontrol et
  const isDark = document.documentElement.classList.contains('dark');

  // Yeni animasyonu başlat
  if (vantaRef.value) {
    try {
      vantaEffect = NET({
        el: vantaRef.value,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0x888888 : 0xaaaaaa, // Tema uyumlu renk
        backgroundColor: isDark ? 0x0a0a0a : 0xfafafa, // Dark/Light mode için
        points: 8.0,
        maxDistance: 20.0,
        spacing: 18.0,
        showLines: false,
        material: {
          vertexColors: true,
        },
      });
    } catch (e) {
      console.error('Vanta init error:', e);
    }
  }

  isUpdating = false;
};

// Debounced Vanta güncelleme fonksiyonu
const updateVantaDebounced = () => {
  // Önceki timeout'u temizle
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  // Yeni timeout ayarla (300ms debounce)
  updateTimeout = setTimeout(async () => {
    if (!isUpdating) {
      await nextTick();
      await initVanta();
    }
  }, 300);
};

// Tema değişikliğini izle ve animasyonu güncelle (debounced)
watch(
  isDarkTheme,
  () => {
    updateVantaDebounced();
  },
  { immediate: false }
);

onMounted(async () => {
  // Prevent body scrolling on index page
  document.body.style.overflow = 'hidden';

  // DOM hazır olana kadar bekle
  await nextTick();

  // Vanta animasyonu başlat
  await initVanta();
});

onBeforeUnmount(() => {
  // Restore body scrolling when leaving index page
  document.body.style.overflow = '';

  // Timeout'u temizle
  if (updateTimeout) {
    clearTimeout(updateTimeout);
    updateTimeout = null;
  }

  // Animasyonu temizle
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }
});
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background-size: 1000px 100%;
}
</style>
