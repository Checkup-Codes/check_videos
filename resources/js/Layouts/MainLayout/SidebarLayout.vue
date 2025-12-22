<template>
  <!-- Horizontal Tab Navigation - Hidden on mobile, shown on desktop -->
  <nav
    class="sticky top-12 z-40 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block"
  >
    <div class="flex h-9 items-center justify-between px-3">
      <!-- Tab Navigation Links -->
      <div class="flex items-center gap-0.5">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" />
        <TabNavItem
          href="/writes"
          icon="fa-solid fa-pencil"
          label="Yazılar"
          :is-active="isActiveRoute('/writes') || isActiveRoute('/categories')"
        />

        <!-- Conditional items for logged in users -->
        <template v-if="isLoggedIn">
          <TabNavItem
            href="/test-categories"
            icon="fa-solid fa-clipboard-question"
            label="Testler"
            :is-active="isActiveRoute('/test-categories') || isActiveRoute('/tests')"
          />
          <TabNavItem
            href="/services"
            icon="fa-solid fa-bolt"
            label="Servisler"
            :is-active="isActiveRoute('/services') || isActiveRoute('/projects') || isActiveRoute('/customers')"
          />
          <TabNavItem
            href="/rendition/words"
            icon="fa-solid fa-globe"
            label="Kelimeler"
            :is-active="isActiveRoute('/rendition')"
          />
          <TabNavItem
            href="/versions"
            icon="fa-solid fa-sync"
            label="Versiyonlar"
            :is-active="isActiveRoute('/versions')"
          />
        </template>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center gap-1.5">
        <!-- Page Actions Component - Desktop -->
        <PageActions variant="desktop" />

        <!-- Form Action Buttons for Create/Edit Pages -->
        <template v-if="isLoggedIn && (isWriteCreatePage || isWriteEditPage || isCategoryCreatePage || isCategoryEditPage || isTestCreatePage || isTestEditPage || isTestCategoryCreatePage || isTestCategoryEditPage)">
          <div class="flex items-center gap-1.5">
            <!-- Reset Button (only for create pages) -->
            <Button
              v-if="isWriteCreatePage || isCategoryCreatePage || isTestCreatePage || isTestCategoryCreatePage"
              @click="handleFormReset"
              :disabled="isFormProcessing"
              variant="outline"
              size="sm"
              class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              title="Formu sıfırla"
            >
              Sıfırla
            </Button>
            <!-- Save/Update Button -->
            <Button
              @click="handleFormSubmit"
              :disabled="isFormProcessing"
              :loading="isFormProcessing"
              variant="default"
              size="sm"
              class="h-8 bg-foreground text-background hover:bg-foreground/90"
              :title="isWriteEditPage || isCategoryEditPage || isTestEditPage || isTestCategoryEditPage ? 'Değişiklikleri kaydet' : 'Kaydet'"
            >
              <template v-if="!isFormProcessing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1.5 h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </template>
              {{ isFormProcessing ? (isWriteEditPage || isCategoryEditPage || isTestEditPage || isTestCategoryEditPage ? 'Güncelleniyor...' : 'Kaydediliyor...') : (isWriteEditPage || isCategoryEditPage || isTestEditPage || isTestCategoryEditPage ? 'Güncelle' : 'Kaydet') }}
            </Button>
          </div>
        </template>

        <!-- Create Dropdown - Always visible for logged in users on all pages -->
        <template v-if="isLoggedIn">
          <div class="create-dropdown-container relative inline-block">
            <button
              @click="showCreateDropdown = !showCreateDropdown"
              class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              :class="{ 'bg-primary/90': showCreateDropdown }"
              title="Yeni içerik oluştur"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div
              v-if="showCreateDropdown"
              class="absolute right-0 top-full z-50 mt-1 w-52 rounded-md border border-border bg-popover shadow-md"
            >
              <div class="flex flex-col p-1.5">
                <!-- Yazılar Grubu -->
                <div class="mb-1.5">
                  <div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Yazılar
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <Link
                      href="/writes/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Yeni Yazı
                    </Link>
                    <Link
                      href="/categories/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Yeni Kategori
                    </Link>
                  </div>
                </div>

                <!-- Kelimeler Grubu -->
                <div class="mb-1.5">
                  <div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Kelimeler
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <Link
                      href="/rendition/words/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Yeni Kelime
                    </Link>
                    <Link
                      href="/rendition/language-packs/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Yeni Kelime Paketi
                    </Link>
                  </div>
                </div>

                <!-- Testler Grubu -->
                <div class="mb-1.5">
                  <div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Testler
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <Link
                      href="/tests/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Yeni Test
                    </Link>
                    <Link
                      href="/test-categories/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Yeni Test Kategorisi
                    </Link>
                  </div>
                </div>

                <!-- Projeler Grubu -->
                <div class="mb-1.5">
                  <div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Projeler
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <Link
                      href="/projects/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Yeni Proje
                    </Link>
                    <Link
                      href="/customers/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Yeni Müşteri
                    </Link>
                    <Link
                      href="/services/create"
                      class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="showCreateDropdown = false"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Yeni Servis
                    </Link>
                  </div>
                </div>

                <!-- Versiyonlar (Tek başına) -->
                <div class="border-t border-border pt-1.5">
                  <Link
                    href="/versions/create"
                    class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    @click="showCreateDropdown = false"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Yeni Versiyon
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Language Pack Show Page Actions -->
        <template v-else-if="isLanguagePackShowPage && isLoggedIn && pack">
          <Link
            :href="route('rendition.language-packs.edit', pack.id)"
            class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Paketi düzenle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </Link>
        </template>



        <!-- Admin Panel Dropdown - Only show on admin panel pages -->
        <template v-if="isAdminPanelPage && isLoggedIn">
          <div class="admin-panel-dropdown-container relative inline-block">
            <button
              @click="showAdminPanelDropdown = !showAdminPanelDropdown"
              class="inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              :class="{ 'bg-accent text-accent-foreground': showAdminPanelDropdown }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Panel
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform" :class="{ 'rotate-180': showAdminPanelDropdown }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-if="showAdminPanelDropdown"
              class="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-md"
            >
              <div class="flex flex-col p-1">
                <Link
                  :href="route('dashboard')"
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': isActiveRoute('/dashboard') }"
                  @click="showAdminPanelDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  :href="route('media.index')"
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': isActiveRoute('/media') }"
                  @click="showAdminPanelDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Medya Yönetimi
                </Link>
                <Link
                  :href="route('social-media.index')"
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': isActiveRoute('/social-media') }"
                  @click="showAdminPanelDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Sosyal Medya Yönetimi
                </Link>
                <Link
                  :href="route('seo.edit')"
                  class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': isActiveRoute('/seo') }"
                  @click="showAdminPanelDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  SEO Yönetimi
                </Link>
              </div>
            </div>
          </div>
        </template>

        <!-- Social Links for Non-Logged In Users -->
        <div v-if="!isLoggedIn" class="hidden md:flex">
          <SocialLinks :is-compact="true" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TabNavItem from '@/Layouts/_components/TabNavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import PageActions from '@/Layouts/_composable/PageActions.vue';
import Button from '@/Components/UI/Button.vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

// Admin panel dropdown state
const showAdminPanelDropdown = ref(false);

// Create dropdown state
const showCreateDropdown = ref(false);

// Form processing state
const isFormProcessing = ref(false);

// Load filter from localStorage on mount
let clickOutsideHandler = null;

onMounted(() => {
  // Close dropdown when clicking outside
  clickOutsideHandler = (event) => {
    const adminDropdownElement = event.target.closest('.admin-panel-dropdown-container');
    const createDropdownElement = event.target.closest('.create-dropdown-container');
    if (showAdminPanelDropdown.value && !adminDropdownElement) {
      showAdminPanelDropdown.value = false;
    }
    if (showCreateDropdown.value && !createDropdownElement) {
      showCreateDropdown.value = false;
    }
  };

  document.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
});

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Theme control for button styling
const isDarkTheme = computed(() => {
  return currentTheme.value === 'dark';
});

// Reactive authentication status - automatically updates when auth changes
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Check if current route matches the given path
const isActiveRoute = (path) => {
  const currentUrl = page.url;

  if (path === '/') {
    return currentUrl === '/' || currentUrl === '';
  }

  return currentUrl.startsWith(path);
};

// Check if we're on a write show page (not index)
// This includes both /writes/{slug} and /categories/{category}/{write} routes
const isWriteShowPage = computed(() => {
  const url = page.url;
  
  // Check for /writes/{slug} route
  if (url.startsWith('/writes/') && url !== '/writes' && url !== '/writes/create') {
    return true;
  }
  
  // Check for /categories/{category}/{write} route
  // Pattern: /categories/{category-slug}/{write-slug}
  // Exclude: /categories/create, /categories/{id}/edit, /categories/{category}/create, etc.
  const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
  if (
    categoryWritePattern.test(url) &&
    !url.includes('/create') &&
    !url.includes('/edit') &&
    url.split('/').length === 4 // Should be exactly: /categories/{category}/{write}
  ) {
    return true;
  }
  
  return false;
});

const isCategoryShowPage = computed(() => {
  const url = page.url;
  // Check for /categories/{slug} route (category show page)
  // Exclude: /categories, /categories/create, /categories/{id}/edit, /categories/{category}/{write}
  if (url.startsWith('/categories/') && url !== '/categories' && url !== '/categories/create') {
    const parts = url.split('/').filter((part) => part.length > 0);
    // Should be exactly: /categories/{slug} (2 parts)
    // Not: /categories/{category}/{write} (3 parts)
    // Not: /categories/{id}/edit (3 parts with 'edit')
    if (parts.length === 2 && parts[0] === 'categories' && !parts[1].includes('edit')) {
      return true;
    }
  }
  return false;
});

// Check if we're on an admin panel page
const isAdminPanelPage = computed(() => {
  const url = page.url;
  return (
    url.startsWith('/dashboard') ||
    url.startsWith('/media') ||
    url.startsWith('/social-media') ||
    url.startsWith('/seo')
  );
});

const isVersionShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/versions/') && url !== '/versions' && url !== '/versions/create';
});

const isWordShowPage = computed(() => {
  const url = page.url;
  // Check if we're on a word edit page (word prop exists) or language pack show page
  return url.startsWith('/rendition/words/') && url !== '/rendition/words' && url !== '/rendition/words/create';
});

// Check if we're on a language pack show page (not word edit page)
const isLanguagePackShowPage = computed(() => {
  return isWordShowPage.value && !word.value && pack.value;
});

// Check if we're on create/edit pages
const isWriteCreatePage = computed(() => {
  return page.url === '/writes/create';
});

const isWriteEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/writes/') && url.includes('/edit');
});

const isCategoryCreatePage = computed(() => {
  return page.url === '/categories/create';
});

const isCategoryEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/categories/') && url.includes('/edit');
});

const isTestCreatePage = computed(() => {
  return page.url === '/tests/create';
});

const isTestEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/tests/') && url.includes('/edit');
});

const isTestCategoryCreatePage = computed(() => {
  return page.url === '/test-categories/create';
});

const isTestCategoryEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/test-categories/') && url.includes('/edit');
});

// Handle form submit from sidebar button
const handleFormSubmit = () => {
  if (isFormProcessing.value) return;
  window.dispatchEvent(new CustomEvent('sidebarFormSubmit'));
};

// Handle form reset from sidebar button
const handleFormReset = () => {
  if (isFormProcessing.value) return;
  window.dispatchEvent(new CustomEvent('sidebarFormReset'));
};

// Listen for form processing state changes
let formProcessingHandler = null;

onMounted(() => {
  // Reset form processing state on mount
  isFormProcessing.value = false;

  // Listen for form processing state
  formProcessingHandler = (event) => {
    isFormProcessing.value = event.detail.processing || false;
  };
  window.addEventListener('formProcessingState', formProcessingHandler);
});

onUnmounted(() => {
  if (formProcessingHandler) {
    window.removeEventListener('formProcessingState', formProcessingHandler);
  }
  // Reset form processing state on unmount
  isFormProcessing.value = false;
});

// Watch for page changes and reset form processing state
watch(
  () => page.url,
  () => {
    isFormProcessing.value = false;
  }
);

// Get write and category from props
const write = computed(() => page.props.write || null);
const category = computed(() => page.props.category || null);
const word = computed(() => page.props.word || null);
const version = computed(() => page.props.version || null);
const pack = computed(() => page.props.pack || null);

// Handle logout
const handleLogout = () => {
  router.post(route('logout'));
};

// Delete functions
const deleteWrite = async (id) => {
  if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    const currentUrl = page.url;
    // Check if we're on a category write page
    const isCategoryWritePage = /^\/categories\/[^/]+\/[^/]+$/.test(currentUrl);
    
    await router.delete(route('writes.destroy', { write: id }), {
      onSuccess: () => {
        if (isCategoryWritePage) {
          // Extract category slug from URL
          const urlParts = currentUrl.split('/').filter((part) => part.length > 0);
          if (urlParts.length >= 2 && urlParts[0] === 'categories') {
            const categorySlug = urlParts[1];
            router.visit(route('categories.show', { category: categorySlug }));
          } else {
            router.visit(route('writes.index'));
          }
        } else {
          router.visit(route('writes.index'));
        }
      },
    });
  } catch (error) {
    console.error('Error deleting write:', error);
  }
};

const deleteCategory = async (id) => {
  if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('categories.destroy', id), {
      onSuccess: () => {
        router.visit(route('categories.index'));
      },
    });
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

const deleteWord = async (id) => {
  if (!confirm('Bu kelimeyi silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('rendition.words.destroy', id), {
      onSuccess: () => {
        router.visit(route('rendition.words.index'));
      },
    });
  } catch (error) {
    console.error('Error deleting word:', error);
  }
};

const deleteVersion = async (id) => {
  if (!confirm('Bu versiyonu silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('versions.destroy', id), {
      onSuccess: () => {
        router.visit(route('versions.index'));
      },
    });
  } catch (error) {
    console.error('Error deleting version:', error);
  }
};

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Modern button hover effects */
.btn {
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

/* Theme-specific enhancements */
html[data-theme='lotr-light'] .btn,
html[data-theme='lotr-dark'] .btn {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(139, 69, 19, 0.3);
  border: 2px solid #d4af37;
}

html[data-theme='lotr-light'] .btn:hover,
html[data-theme='lotr-dark'] .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px -2px rgba(139, 69, 19, 0.4);
  transition: all 0.3s ease-in-out;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
