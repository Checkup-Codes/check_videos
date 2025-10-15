<template>
  <!-- Full Width Header -->
  <header
    class="border-base-200/60 bg-base-100/95 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-md transition-all duration-300"
    :class="currentTheme"
  >
    <!-- Mobile Header -->
    <div class="flex h-14 items-center justify-between px-4 sm:px-6 lg:hidden">
      <!-- Back button -->
      <Link
        v-if="basePath"
        :href="`/${basePath}`"
        class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-xl px-3 transition-all duration-200"
      >
        <GoBackSvg class="h-4 w-4" />
      </Link>
      <div v-else class="w-10"></div>

      <!-- Logo/Title -->
      <div class="flex items-center space-x-2">
        <div class="bg-primary/10 flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg">
          <template v-if="logoPath && !isLoading">
            <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
          </template>
          <span v-else class="text-xs font-bold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
        </div>
        <Link
          href="/"
          class="text-sm font-semibold text-base-content transition-colors duration-200 hover:text-primary"
          >{{ title }}</Link
        >
      </div>

      <!-- Menu Toggle Button -->
      <button
        @click="toggleMenu"
        class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-xl px-3 transition-all duration-200"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Desktop Header -->
    <div class="hidden h-16 items-center justify-between px-6 lg:flex">
      <!-- Left Section: Logo + Brand + Language -->
      <div class="flex items-center space-x-4">
        <!-- Logo/Title -->
        <div class="flex items-center space-x-3">
          <div
            class="bg-primary/10 ring-primary/20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ring-1"
          >
            <template v-if="logoPath && !isLoading">
              <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
            </template>
            <span v-else class="text-sm font-bold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
          </div>
          <Link
            href="/"
            class="text-lg font-semibold text-base-content transition-colors duration-200 hover:text-primary"
            >{{ seoTitle }}</Link
          >
        </div>

        <!-- Language Selector - Temporarily disabled -->
        <!--
        <div class="relative">
          <button
            @click="toggleLanguageDropdown"
            class="bg-base-200/50 border-base-300/60 hover:bg-base-200/80 flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-sm transition-all duration-200"
          >
            <span class="text-base-content/80">{{ currentLanguage }}</span>
            <svg class="text-base-content/60 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div
            v-if="showLanguageDropdown"
            class="bg-base-100/95 border-base-200/60 absolute left-0 top-full z-50 mt-2 min-w-32 rounded-lg border shadow-lg backdrop-blur-md"
          >
            <div class="py-1">
              <button
                @click="selectLanguage('tr')"
                class="hover:bg-base-200/80 w-full px-3 py-2 text-left text-sm transition-colors duration-200"
                :class="{ 'bg-primary/10 text-primary': currentLanguage === 'Türkçe' }"
              >
                Türkçe
              </button>
              <button
                @click="selectLanguage('en')"
                class="hover:bg-base-200/80 w-full px-3 py-2 text-left text-sm transition-colors duration-200"
                :class="{ 'bg-primary/10 text-primary': currentLanguage === 'English' }"
              >
                English
              </button>
            </div>
          </div>
        </div>
        -->
      </div>

      <!-- Center Section: Search Input -->
      <div class="mx-8 max-w-lg flex-1">
        <div class="relative">
          <div class="relative">
            <!-- Search Icon -->
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                class="h-4 w-4"
                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            <!-- Search Input -->
            <input
              v-model="searchQuery"
              @focus="showSearchResults = true"
              @blur="hideSearchResults"
              @keydown.enter="handleEnterKey"
              @keydown.escape="clearSearch"
              @keydown.up="handleArrowUp"
              @keydown.down="handleArrowDown"
              @input="performSearch"
              type="text"
              placeholder="Ara..."
              class="search-input w-full rounded-lg border py-3 pl-12 pr-16 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
              :class="[
                isDarkMode
                  ? 'border-gray-600/60 bg-gray-800/90 text-gray-100 placeholder-gray-400 focus:border-blue-500/40 focus:ring-blue-500/20'
                  : 'border-gray-300/60 bg-white/90 text-gray-900 placeholder-gray-500 focus:border-blue-500/40 focus:ring-blue-500/20',
              ]"
            />

            <!-- Keyboard Shortcut -->
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <kbd
                class="rounded border px-2 py-1 text-xs font-semibold"
                :class="
                  isDarkMode
                    ? 'border-gray-600/60 bg-gray-700/60 text-gray-300'
                    : 'border-gray-300/60 bg-gray-100/60 text-gray-600'
                "
                >⌘K</kbd
              >
            </div>
          </div>

          <!-- Search Results Dropdown -->
          <div
            v-if="
              showSearchResults &&
              ((searchResults.articles && searchResults.articles.length > 0) ||
                (searchResults.categories && searchResults.categories.length > 0) ||
                searchQuery.length > 0)
            "
            class="search-results-dropdown absolute left-0 right-0 top-full z-50 mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'"
          >
            <!-- Loading State -->
            <div v-if="isSearching" class="p-4 text-center">
              <div class="inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
              <span class="ml-2 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Aranıyor...</span>
            </div>

            <!-- No Results -->
            <div
              v-else-if="
                searchQuery.length > 0 &&
                (!searchResults.articles || searchResults.articles.length === 0) &&
                (!searchResults.categories || searchResults.categories.length === 0)
              "
              class="p-6 text-center"
            >
              <div class="mb-2" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">
                <svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <span class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >"{{ searchQuery }}" için sonuç bulunamadı</span
              >
            </div>

            <!-- Search Results -->
            <div
              v-else-if="
                (searchResults.articles && searchResults.articles.length > 0) ||
                (searchResults.categories && searchResults.categories.length > 0)
              "
              class="py-2"
            >
              <!-- Articles Section -->
              <div v-if="searchResults.articles && searchResults.articles.length > 0" class="mb-3">
                <div
                  class="border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  :class="isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'"
                >
                  Yazılar
                </div>
                <div
                  v-for="(article, index) in searchResults.articles"
                  :key="article.id"
                  :data-selected-index="index"
                  @click="navigateToResult(article.url)"
                  :class="[
                    'cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0',
                    isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-50 hover:bg-gray-50',
                    selectedIndex === index
                      ? isDarkMode
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-blue-200 bg-blue-50'
                      : '',
                  ]"
                >
                  <div
                    class="text-sm font-semibold leading-none"
                    :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'"
                    v-html="highlightText(article.title)"
                  ></div>
                  <div
                    class="mt-0.5 text-xs leading-tight"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'"
                    v-html="highlightText(article.excerpt)"
                  ></div>
                  <div v-if="article.category" class="mt-1">
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                      :class="isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'"
                    >
                      {{ article.category }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Categories Section -->
              <div v-if="searchResults.categories && searchResults.categories.length > 0" class="mb-3">
                <div
                  class="border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  :class="isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'"
                >
                  Kategoriler
                </div>
                <div
                  v-for="(category, index) in searchResults.categories"
                  :key="category.id"
                  :data-selected-index="searchResults.articles.length + index"
                  @click="navigateToResult(category.url)"
                  :class="[
                    'cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0',
                    isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-50 hover:bg-gray-50',
                    selectedIndex === searchResults.articles.length + index
                      ? isDarkMode
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-blue-200 bg-blue-50'
                      : '',
                  ]"
                >
                  <div
                    class="text-sm font-semibold leading-none"
                    :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'"
                    v-html="highlightText(category.name)"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div v-else class="py-2">
              <div
                class="border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                :class="isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'"
              >
                Hızlı Eylemler
              </div>
              <div
                data-selected-index="0"
                @click="navigateToResult('/writes')"
                :class="[
                  'cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0',
                  isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-50 hover:bg-gray-50',
                  selectedIndex === 0
                    ? isDarkMode
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-blue-200 bg-blue-50'
                    : '',
                ]"
              >
                <div class="text-sm font-semibold" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">
                  Tüm Yazıları Görüntüle
                </div>
                <div class="mt-0.5 text-xs" :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'">
                  Tüm yayınlanmış yazıları görüntüle
                </div>
              </div>
              <div
                data-selected-index="1"
                @click="navigateToResult('/categories')"
                :class="[
                  'cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0',
                  isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-50 hover:bg-gray-50',
                  selectedIndex === 1
                    ? isDarkMode
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-blue-200 bg-blue-50'
                    : '',
                ]"
              >
                <div class="text-sm font-semibold" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">
                  Tüm Kategorileri Görüntüle
                </div>
                <div class="mt-0.5 text-xs" :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'">
                  Tüm kategorileri görüntüle
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section: Navigation + Actions -->
      <div class="flex items-center space-x-4">
        <!-- Navigation Links -->
        <div class="hidden items-center space-x-6 xl:flex">
          <Link
            href="/dashboard"
            class="text-base-content/80 text-sm font-medium transition-colors duration-200 hover:text-base-content"
          >
            Panel
          </Link>
          <a
            href="https://youtu.be/FPsx8xHLR1k?si=nZnBfqjYQun9R06h"
            target="_blank"
            class="text-base-content/80 text-sm font-medium transition-colors duration-200 hover:text-base-content"
          >
            Destek
          </a>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleDarkLight"
          class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-lg px-3 transition-all duration-200"
        >
          <template v-if="isDarkMode">
            <svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
          </template>
          <template v-else>
            <svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </template>
        </button>

        <!-- Mobile Menu Toggle for Desktop (fallback) -->
        <button
          @click="toggleMenu"
          class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-lg px-3 transition-all duration-200 xl:hidden"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Elegant Mobile Menu Overlay -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-50 transition-all duration-300 ease-out"
    :class="isMenuOpen ? 'opacity-100' : 'opacity-0'"
    @click="closeMenu"
  >
    <!-- Backdrop with theme-aware opacity -->
    <div class="bg-base-content/20 absolute inset-0 backdrop-blur-sm"></div>

    <!-- Menu Container -->
    <div class="relative flex h-full items-end justify-center">
      <!-- Menu Panel -->
      <div
        class="w-full max-w-sm transform transition-all duration-300 ease-out"
        :class="isMenuOpen ? 'translate-y-0' : 'translate-y-full'"
        @click.stop
      >
        <div
          class="border-base-200/40 bg-base-100/95 mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl backdrop-blur-xl"
        >
          <!-- Handle Bar -->
          <div class="flex justify-center pb-2 pt-4">
            <div class="bg-base-300/60 h-1.5 w-16 rounded-full"></div>
          </div>

          <!-- Menu Content -->
          <div class="px-4 pb-6 sm:px-6" @click="handleMenuItemClick">
            <!-- App Header -->
            <Link href="/" class="mb-4 block">
              <div class="bg-base-200/50 flex items-center space-x-3 rounded-2xl p-3 backdrop-blur-sm">
                <div
                  class="bg-primary/10 ring-primary/20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1"
                >
                  <template v-if="logoPath && !isLoading">
                    <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
                  </template>
                  <span v-else class="text-sm font-bold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-base-content">{{ seoTitle }}</h3>
                  <p class="text-base-content/60 text-xs">{{ appName }}</p>
                </div>
              </div>
            </Link>

            <!-- Clean Navigation Buttons -->
            <div class="space-y-1">
              <NavItem href="/" icon="home" label="Ana Sayfa" />
              <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" />
              <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" />

              <!-- Conditional items for logged in users -->
              <template v-if="isLoggedIn">
                <NavItem href="/dashboard" icon="fa-solid fa-tachometer-alt" label="Panel" />
                <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" />
                <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" />
              </template>
            </div>

            <!-- Powered by Section -->
            <div v-if="!isLoggedIn" class="border-base-200/40 mt-4 border-t pt-3">
              <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
                <div class="bg-primary/5 hover:bg-primary/10 rounded-2xl p-3 text-center transition-all duration-200">
                  <span class="text-sm font-medium text-primary">Powered by Notiriel</span>
                </div>
              </a>
            </div>

            <!-- Social Links -->
            <div v-if="!isLoggedIn" class="mt-3">
              <SocialLinks :is-compact="false" />
            </div>

            <!-- Theme Toggle & Copyright -->
            <div class="mt-4 flex flex-col items-center space-y-2">
              <!-- Theme Toggle -->
              <button
                @click="toggleDarkLight"
                class="bg-base-200/50 hover:bg-base-200/80 flex items-center space-x-2 rounded-2xl px-3 py-2 backdrop-blur-sm transition-all duration-200"
              >
                <template v-if="isDarkMode">
                  <svg
                    class="h-4 w-4 fill-current text-amber-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                    />
                  </svg>
                </template>
                <template v-else>
                  <svg
                    class="h-4 w-4 fill-current text-blue-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                    />
                  </svg>
                </template>
                <span class="text-sm font-medium text-base-content">{{ currentThemeName }}</span>
              </button>

              <!-- Copyright -->
              <p class="text-base-content/50 text-xs">Notiriel - Tüm Hakları Saklıdır</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';
import axios from 'axios';

// Import SidebarLayout components
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

const seoTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.seo?.title ||
    page.props?.app?.seo?.title ||
    page.props?.app?.description ||
    'Check-up Codes'
  );
});

const isMenuOpen = ref(false);
const page = usePage();
const store = useStore();
const imagePath = ref('');
const auth = ref(null);
const appName = computed(() => usePage().props.app.name);
const title = ref('');

// Language dropdown
const showLanguageDropdown = ref(false);
const currentLanguage = ref('English');

// Search functionality
const searchQuery = ref('');
const searchResults = ref({ articles: [], categories: [] });
const showSearchResults = ref(false);
const isSearching = ref(false);
const searchTimeout = ref(null);
const selectedIndex = ref(-1);
const searchItems = ref([]);

// Theme management
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Logo path logic
const logoPath = computed(() => {
  return (
    page.props?.screen?.seo?.logo ||
    page.props?.seo?.logo ||
    page.props?.app?.seo?.logo ||
    page.props?.app?.logo ||
    null
  );
});

const logoAlt = computed(() => {
  return (
    page.props?.screen?.seo?.logo_alt ||
    page.props?.seo?.logo_alt ||
    page.props?.app?.seo?.logo_alt ||
    seoTitle.value ||
    'Logo'
  );
});

const isLoading = ref(false);

const handleImageError = () => {
  // Logo yüklenemediğinde varsayılan logo kullan
  // Bu durumda computed property null döndürecek ve fallback olarak seoTitle'ın ilk harfi gösterilecek
};

// Dark/Light mode logic
const isDarkMode = computed(() => {
  return currentTheme.value.includes('dark');
});

const currentThemeName = computed(() => {
  const theme = currentTheme.value;
  const themeMap = {
    light: 'Light',
    dark: 'Dark',
    'neon-light': 'Neon Light',
    'neon-dark': 'Neon Dark',
    'lotr-light': 'LOTR Light',
    'lotr-dark': 'LOTR Dark',
    custom: 'Custom',
  };
  return themeMap[theme] || theme;
});

const toggleDarkLight = () => {
  try {
    const current = currentTheme.value;
    let newTheme;

    // Basit light/dark toggle
    if (current === 'light' || current.includes('light')) {
      newTheme = current.replace('light', 'dark');
    } else if (current === 'dark' || current.includes('dark')) {
      newTheme = current.replace('dark', 'light');
    } else {
      // Fallback: default light/dark toggle
      newTheme = current === 'light' ? 'dark' : 'light';
    }

    // Eğer değişiklik olmadıysa, basit toggle yap
    if (newTheme === current) {
      newTheme = current === 'light' ? 'dark' : 'light';
    }

    console.log('Theme toggle:', current, '->', newTheme);
    store.dispatch('Theme/changeTheme', newTheme);
  } catch (error) {
    console.error('Theme toggle error:', error);
    // Fallback: basit light/dark toggle
    const fallbackTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    store.dispatch('Theme/changeTheme', fallbackTheme);
  }
};

// Authentication status
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Watch for page props changes to update auth data
watch(
  () => page.props.value,
  (newProps) => {
    if (newProps && newProps.auth) {
      auth.value = newProps.auth;
      if (auth.value?.user) {
        imagePath.value = auth.value.user.imagePath || '/images/default.png';
      }
    }
  },
  { immediate: true }
);

// Watch for route changes to close menu
watch(
  () => page.url,
  () => {
    closeMenu();
  }
);

const emit = defineEmits(['toggleSidebar']);

const basePath = computed(() => {
  const url = page.url;
  const parts = url.split('/').filter((part) => part);

  if (!parts.length) return null;

  const pathMap = {
    rendition: 'rendition/words',
    //  academy: 'academy/courses',
  };

  return pathMap[parts[0]] || parts[0];
});

// Toggle the mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  emit('toggleSidebar');

  // When menu is open, prevent body scrolling
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  } else {
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }
};

// Close the mobile menu
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
  document.body.classList.remove('menu-open');
};

// Handle clicks on menu items to close the menu
const handleMenuItemClick = (event) => {
  // Check if the clicked element is a link or inside a link
  const isLink =
    event.target.tagName === 'A' ||
    event.target.closest('a') ||
    event.target.closest('.link') ||
    event.target.closest('[href]');

  if (isLink) {
    closeMenu();
  }
};

// Search functionality methods
const performSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  if (searchQuery.value.length < 2) {
    searchResults.value = { articles: [], categories: [] };
    return;
  }

  searchTimeout.value = setTimeout(async () => {
    isSearching.value = true;
    try {
      const response = await axios.get('/api/search', {
        params: {
          q: searchQuery.value,
          type: 'articles,categories',
          // Giriş yapmış kullanıcılar için tüm yazıları dahil et
          include_all: isLoggedIn.value ? '1' : '0',
        },
      });
      console.log('Search response:', response.data);
      searchResults.value = response.data;
      updateSearchItems();
      selectedIndex.value = -1;
    } catch (error) {
      console.error('Search error:', error);
      // Fallback: show some sample data or empty results
      searchResults.value = {
        articles: [],
        categories: [],
      };
    } finally {
      isSearching.value = false;
    }
  }, 300);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to writes page with search query
    router.visit(`/writes?search=${encodeURIComponent(searchQuery.value)}`);
    clearSearch();
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = { articles: [], categories: [] };
  showSearchResults.value = false;
  selectedIndex.value = -1;
  searchItems.value = [];
};

const highlightText = (text) => {
  if (!text || !searchQuery.value) return text;

  const query = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${query})`, 'gi');
  const highlightClass = isDarkMode.value ? 'bg-yellow-600/30 text-yellow-300' : 'bg-yellow-200 text-yellow-900';
  return text.replace(regex, `<mark class="${highlightClass} px-1 rounded">$1</mark>`);
};

// Keyboard navigation methods
const updateSearchItems = () => {
  const items = [];

  // Add articles
  if (searchResults.value.articles && searchResults.value.articles.length > 0) {
    searchResults.value.articles.forEach((article) => {
      items.push({ type: 'article', url: article.url, title: article.title });
    });
  }

  // Add categories
  if (searchResults.value.categories && searchResults.value.categories.length > 0) {
    searchResults.value.categories.forEach((category) => {
      items.push({ type: 'category', url: category.url, title: category.name });
    });
  }

  // Add quick actions if no results
  if (items.length === 0) {
    items.push({ type: 'action', url: '/writes', title: 'Tüm Yazıları Görüntüle' });
    items.push({ type: 'action', url: '/categories', title: 'Tüm Kategorileri Görüntüle' });
  }

  searchItems.value = items;
};

const handleArrowUp = (event) => {
  event.preventDefault();
  if (searchItems.value.length === 0) return;

  selectedIndex.value = selectedIndex.value <= 0 ? searchItems.value.length - 1 : selectedIndex.value - 1;
  scrollToSelectedItem();
};

const handleArrowDown = (event) => {
  event.preventDefault();
  if (searchItems.value.length === 0) return;

  selectedIndex.value = selectedIndex.value >= searchItems.value.length - 1 ? 0 : selectedIndex.value + 1;
  scrollToSelectedItem();
};

const scrollToSelectedItem = () => {
  // Wait for DOM update
  nextTick(() => {
    const dropdown = document.querySelector('.search-results-dropdown');
    if (!dropdown) return;

    // Find the selected item element
    const selectedElements = dropdown.querySelectorAll('[data-selected-index]');
    const selectedElement = Array.from(selectedElements).find(
      (el) => parseInt(el.getAttribute('data-selected-index')) === selectedIndex.value
    );

    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  });
};

const handleEnterKey = (event) => {
  event.preventDefault();

  if (selectedIndex.value >= 0 && selectedIndex.value < searchItems.value.length) {
    const selectedItem = searchItems.value[selectedIndex.value];
    navigateToResult(selectedItem.url);
  } else {
    // If no item is selected, perform regular search
    handleSearch();
  }
};

const hideSearchResults = () => {
  // Delay hiding to allow clicking on results
  setTimeout(() => {
    showSearchResults.value = false;
    selectedIndex.value = -1;
  }, 200);
};

const navigateToResult = (url) => {
  router.visit(url);
  clearSearch();
};

// Language dropdown methods
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const selectLanguage = (lang) => {
  currentLanguage.value = lang === 'tr' ? 'Türkçe' : 'English';
  showLanguageDropdown.value = false;
  // Here you can add logic to change the app language
  // For now, we'll just update the display
};

// Keyboard shortcut support
const handleKeydown = (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    if (searchInput) {
      searchInput.focus();
      showSearchResults.value = true;
    }
  }
};

// Add keyboard event listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

// Cleanup
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});
</script>

<style scoped>
/* Animation for the drawer */
.drawer-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Prevent scrolling when menu is open */
:deep(body.menu-open) {
  overflow: hidden;
}

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
</style>
