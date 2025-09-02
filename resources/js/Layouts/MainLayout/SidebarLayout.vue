<template>
  <aside
    class="flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 p-4 font-sans"
    :class="currentTheme"
  >
    <div class="space-y-6">
      <!-- Workspace Header -->
      <div class="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3" :class="{ 'w-full justify-center': isCompact }">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span class="text-sm font-bold text-primary-content">{{ appName.charAt(0) }}</span>
            </div>
            <div v-if="!isCompact">
              <h3 class="font-semibold text-base-content">{{ appName }}</h3>
            </div>
          </div>
          <!-- 
          <button v-if="!isCompact" class="text-base-content/60 transition-colors hover:text-base-content">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          -->
        </div>
      </div>

      <!-- Powered by Button / Profile Link -->
      <div v-if="!isLoggedIn" class="space-y-1">
        <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
          <button
            class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200"
          >
            <div class="flex items-center space-x-3" :class="{ 'justify-center': isCompact }">
              <div class="flex h-5 w-5 items-center justify-center rounded bg-secondary">
                <svg class="h-3 w-3 text-secondary-content" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span v-if="!isCompact" class="text-sm font-medium text-base-content">Powered by : Notiriel</span>
            </div>
          </button>
        </a>
      </div>

      <!-- Profile & Settings for Logged In Users
      <div v-if="isLoggedIn" class="space-y-1">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Hesap</h4>
        <NavItem href="/profile" icon="fa-solid fa-user-circle" label="Profil" :is-compact="isCompact" />
        <NavItem href="/theme-management" icon="fa-solid fa-palette" label="Tema Ayarları" :is-compact="isCompact" />
      </div>
      -->
      <!-- Main Navigation -->
      <div class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Ana Navigasyon' }}
        </h4>
        <NavItem href="/" icon="home" label="Ana Sayfa" :is-compact="isCompact" />
        <NavItem href="/dashboard" icon="chart-bar" label="Dashboard" :is-compact="isCompact" />
      </div>

      <!-- Content Management -->
      <div class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'İçerik Yönetimi' }}
        </h4>
        <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-compact="isCompact" />
        <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" :is-compact="isCompact" />
      </div>

      <!-- Language & Translation -->
      <div v-if="isLoggedIn" class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Dil & Çeviri' }}
        </h4>
        <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" :is-compact="isCompact" />
        <NavItem
          href="/rendition/language-packs"
          icon="fa-solid fa-language"
          label="Dil Paketleri"
          :is-compact="isCompact"
        />
      </div>

      <!-- Project Management -->
      <div v-if="isLoggedIn" class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Proje Yönetimi' }}
        </h4>
        <NavItem href="/projects" icon="fa-solid fa-project-diagram" label="Projeler" :is-compact="isCompact" />
        <!-- 
        <NavItem href="/customers" icon="fa-solid fa-users" label="Müşteriler" :is-compact="isCompact" />
        <NavItem href="/services" icon="fa-solid fa-cogs" label="Hizmetler" :is-compact="isCompact" />
         -->
      </div>

      <!-- System & Tools -->
      <div v-if="isLoggedIn" class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Sistem & Araçlar' }}
        </h4>
        <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" :is-compact="isCompact" />
        <!-- 
        <NavItem href="/equipments" icon="fa-solid fa-tools" label="Ekipmanlar" :is-compact="isCompact" />
        <NavItem
          href="/software-products"
          icon="fa-solid fa-laptop-code"
          label="Yazılım Ürünleri"
          :is-compact="isCompact"
        />
        <NavItem href="/lessons" icon="fa-solid fa-chalkboard-teacher" label="Dersler" :is-compact="isCompact" />
         -->
      </div>

      <!-- Media & Assets -->
      <div v-if="isLoggedIn" class="space-y-1" :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Media & Varlıklar' }}
        </h4>
        <NavItem href="/media" icon="fa-solid fa-photo-video" label="Medya" :is-compact="isCompact" />
        <NavItem href="/bookmarks" icon="fa-solid fa-bookmark" label="Yer İmleri" :is-compact="isCompact" />
        <NavItem href="/social-media" icon="fa-solid fa-share-alt" label="Sosyal Medya" :is-compact="isCompact" />
      </div>

      <!-- Social Links for Non-Logged In Users -->
      <div v-if="!isLoggedIn" class="space-y-1" :class="{ 'text-center': isCompact }">
        <SocialLinks :is-compact="isCompact" />
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 py-4 text-center">
      <ThemeSwitcher class="mx-auto" />
      <p v-if="!isCompact" class="text-base-content/60 mt-2 text-xs">{{ seoTitle }} - Tüm Hakları Saklıdır</p>
    </div>
  </aside>
</template>

<script setup>
import ThemeSwitcher from '@/Layouts/_components/ThemeSwitcher.vue';
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Reactive authentication status - automatically updates when auth changes
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

const appName = computed(() => {
  return page.props?.app?.name ?? 'Check Videos';
});

const seoTitle = computed(() => {
  return page.props?.screen?.seo?.title ?? 'Check Videos';
});

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
