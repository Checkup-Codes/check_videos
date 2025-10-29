<template>
  <!-- Horizontal Tab Navigation - Hidden on mobile, shown on desktop -->
  <nav
    class="bg-base-100/95 border-base-200/30 sticky top-12 z-40 hidden w-full border-b backdrop-blur-md transition-all duration-300 lg:block"
    :class="currentTheme"
  >
    <div class="flex h-10 items-center justify-between px-4 sm:px-6">
      <!-- Tab Navigation Links -->
      <div class="flex items-center space-x-1">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" />
        <TabNavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-active="isActiveRoute('/writes')" />
        <TabNavItem
          href="/categories"
          icon="fa-solid fa-book"
          label="Kategoriler"
          :is-active="isActiveRoute('/categories')"
        />

        <!-- Conditional items for logged in users -->
        <template v-if="isLoggedIn">
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
      <div class="flex items-center space-x-2">
        <!-- Write Show Page Actions -->
        <template v-if="isWriteShowPage && isLoggedIn && write">
          <Link
            :href="route('writes.edit', write.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-base-200/80 text-white hover:bg-base-200'
                : 'bg-base-200/80 text-black hover:bg-base-300',
            ]"
            title="Yazıyı düzenle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteWrite(write.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme ? 'bg-error/20 hover:bg-error/30 text-error' : 'bg-error/10 hover:bg-error/20 text-error',
            ]"
            title="Yazıyı sil"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- Category Show Page Actions -->
        <template v-else-if="isCategoryShowPage && isLoggedIn && category">
          <Link
            :href="route('categories.edit', category.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-base-200/80 text-white hover:bg-base-200'
                : 'bg-base-200/80 text-black hover:bg-base-300',
            ]"
            title="Kategoriyi düzenle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteCategory(category.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme ? 'bg-error/20 hover:bg-error/30 text-error' : 'bg-error/10 hover:bg-error/20 text-error',
            ]"
            title="Kategoriyi sil"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- New Write Button for Writes Index Page -->
        <Link
          v-else-if="isActiveRoute('/writes') && isLoggedIn && !isWriteShowPage"
          href="/writes/create"
          class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
          :class="[
            isDarkTheme
              ? 'bg-primary/20 hover:bg-primary/30 text-white'
              : 'bg-primary/15 hover:bg-primary/25 text-black',
          ]"
          title="Yeni yazı ekle"
        >
          <div
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Yazı</span>
        </Link>

        <!-- Language Pack Show Page Actions -->
        <template v-else-if="isLanguagePackShowPage && isLoggedIn && pack">
          <Link
            :href="route('rendition.language-packs.edit', pack.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-base-200/80 text-white hover:bg-base-200'
                : 'bg-base-200/80 text-black hover:bg-base-300',
            ]"
            title="Paketi düzenle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Paketi Düzenle</span>
          </Link>
          <Link
            :href="route('rendition.words.create')"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-primary/20 hover:bg-primary/30 text-white'
                : 'bg-primary/15 hover:bg-primary/25 text-black',
            ]"
            title="Yeni kelime ekle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kelime</span>
          </Link>
        </template>

        <!-- Word Show Page Actions -->
        <template v-else-if="isWordShowPage && isLoggedIn && word">
          <Link
            :href="route('rendition.words.edit', word.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-base-200/80 text-white hover:bg-base-200'
                : 'bg-base-200/80 text-black hover:bg-base-300',
            ]"
            title="Kelimeyi düzenle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteWord(word.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme ? 'bg-error/20 hover:bg-error/30 text-error' : 'bg-error/10 hover:bg-error/20 text-error',
            ]"
            title="Kelimeyi sil"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- Version Show Page Actions -->
        <template v-else-if="isVersionShowPage && isLoggedIn && version">
          <Link
            :href="route('versions.edit', version.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme
                ? 'bg-base-200/80 text-white hover:bg-base-200'
                : 'bg-base-200/80 text-black hover:bg-base-300',
            ]"
            title="Versiyonu düzenle"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteVersion(version.id)"
            class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
            :class="[
              isDarkTheme ? 'bg-error/20 hover:bg-error/30 text-error' : 'bg-error/10 hover:bg-error/20 text-error',
            ]"
            title="Versiyonu sil"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- New Category Button for Categories Index Page -->
        <Link
          v-else-if="isActiveRoute('/categories') && isLoggedIn && !isCategoryShowPage"
          href="/categories/create"
          class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
          :class="[
            isDarkTheme
              ? 'bg-primary/20 hover:bg-primary/30 text-white'
              : 'bg-primary/15 hover:bg-primary/25 text-black',
          ]"
          title="Yeni kategori ekle"
        >
          <div
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kategori</span>
        </Link>

        <!-- New Word Button for Rendition Words Index Page -->
        <Link
          v-else-if="isActiveRoute('/rendition/words') && isLoggedIn && !isWordShowPage"
          href="/rendition/words/create"
          class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
          :class="[
            isDarkTheme
              ? 'bg-primary/20 hover:bg-primary/30 text-white'
              : 'bg-primary/15 hover:bg-primary/25 text-black',
          ]"
          title="Yeni kelime ekle"
        >
          <div
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kelime</span>
        </Link>

        <!-- New Language Pack Button for Rendition Words Index Page -->
        <Link
          v-if="isActiveRoute('/rendition/words') && isLoggedIn && !isWordShowPage"
          href="/rendition/language-packs/create"
          class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
          :class="[
            isDarkTheme
              ? 'bg-primary/20 hover:bg-primary/30 text-white'
              : 'bg-primary/15 hover:bg-primary/25 text-black',
          ]"
          title="Yeni kelime paketi ekle"
        >
          <div
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Paket</span>
        </Link>

        <!-- New Version Button for Versions Index Page -->
        <Link
          v-else-if="isActiveRoute('/versions') && isLoggedIn && !isVersionShowPage"
          href="/versions/create"
          class="group relative flex items-center space-x-2 rounded-lg px-3 py-2 shadow-sm transition-all duration-300"
          :class="[
            isDarkTheme
              ? 'bg-primary/20 hover:bg-primary/30 text-white'
              : 'bg-primary/15 hover:bg-primary/25 text-black',
          ]"
          title="Yeni versiyon ekle"
        >
          <div
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Versiyon</span>
        </Link>

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
import { usePage, Link, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Theme control for button styling
const isDarkTheme = computed(() => {
  return currentTheme.value.includes('dark');
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

// Check if we're on a show page (not index)
const isWriteShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/writes/') && url !== '/writes' && url !== '/writes/create';
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

// Get write and category from props
const write = computed(() => page.props.write || null);
const category = computed(() => page.props.category || null);
const word = computed(() => page.props.word || null);
const version = computed(() => page.props.version || null);
const pack = computed(() => page.props.pack || null);

// Delete functions
const deleteWrite = async (id) => {
  if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('writes.destroy', { write: id }));
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
