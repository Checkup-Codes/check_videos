<template>
  <!-- Full Width Header -->
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60"
  >
    <!-- Mobile Header -->
    <div class="flex h-12 items-center justify-between px-3 sm:px-4 lg:hidden">
      <!-- Back button -->
      <Link
        v-if="basePath"
        :href="`/${basePath}`"
        class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <GoBackSvg class="h-4 w-4" />
      </Link>
      <div v-else class="w-10"></div>

      <!-- Logo/Title -->
      <div class="flex items-center space-x-2">
        <div
          class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20"
        >
          <template v-if="logoPath && !isLoading">
            <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
          </template>
          <span v-else class="text-xs font-semibold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
        </div>
        <Link href="/" class="text-sm font-semibold text-foreground transition-colors hover:text-foreground/80">{{
          title
        }}</Link>
      </div>

      <!-- Menu Toggle Button -->
      <button
        @click="toggleMenu"
        class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Desktop Header -->
    <div class="hidden h-12 items-center justify-between px-4 lg:flex">
      <!-- Left Section: Logo + Brand + Language -->
      <div class="flex items-center space-x-4">
        <!-- Logo/Title -->
        <div class="flex items-center space-x-2.5">
          <div
            class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20"
          >
            <template v-if="logoPath && !isLoading">
              <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
            </template>
            <span v-else class="text-sm font-semibold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
          </div>
          <Link href="/" class="text-base font-semibold text-foreground transition-colors hover:text-foreground/80">{{
            seoTitle
          }}</Link>
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
      <div class="mx-6 flex-1 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div class="relative">
          <div class="relative">
            <!-- Search Icon -->
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="h-4 w-4 text-muted-foreground"
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
              ref="searchInputRef"
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
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            <!-- Keyboard Shortcut -->
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd
                class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
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
            class="search-results-dropdown absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[32rem] w-full min-w-[400px] overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] xl:min-w-[800px] 2xl:min-w-[900px]"
          >
            <!-- Loading State -->
            <div v-if="isSearching" class="flex items-center justify-center p-4">
              <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span class="ml-2 text-sm text-muted-foreground">Aranıyor...</span>
            </div>

            <!-- No Results -->
            <div
              v-else-if="
                searchQuery.length > 0 &&
                (!searchResults.articles || searchResults.articles.length === 0) &&
                (!searchResults.categories || searchResults.categories.length === 0)
              "
              class="flex flex-col items-center justify-center p-6 text-center"
            >
              <div class="mb-2 text-muted-foreground">
                <svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <span class="text-sm text-muted-foreground">"{{ searchQuery }}" için sonuç bulunamadı</span>
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
                <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">Yazılar</div>
                <div
                  v-for="(article, index) in searchResults.articles"
                  :key="article.id"
                  :data-selected-index="index"
                  @click="navigateToResult(article.url)"
                  :class="[
                    'cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0',
                    selectedIndex === index
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground',
                  ]"
                >
                  <div class="text-sm font-medium leading-none" v-html="highlightText(article.title)"></div>
                  <div
                    class="mt-0.5 text-xs leading-tight text-muted-foreground"
                    v-html="highlightText(article.excerpt)"
                  ></div>
                  <div v-if="article.category" class="mt-1">
                    <span
                      class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {{ article.category }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Categories Section -->
              <div v-if="searchResults.categories && searchResults.categories.length > 0" class="mb-3">
                <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Kategoriler
                </div>
                <div
                  v-for="(category, index) in searchResults.categories"
                  :key="category.id"
                  :data-selected-index="searchResults.articles.length + index"
                  @click="navigateToResult(category.url)"
                  :class="[
                    'cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0',
                    selectedIndex === searchResults.articles.length + index
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground',
                  ]"
                >
                  <div class="text-sm font-medium leading-none" v-html="highlightText(category.name)"></div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div v-else class="py-2">
              <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Hızlı Eylemler
              </div>
              <div
                data-selected-index="0"
                @click="navigateToResult('/writes')"
                :class="[
                  'cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0',
                  selectedIndex === 0
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground',
                ]"
              >
                <div class="text-sm font-medium">Tüm Yazıları Görüntüle</div>
                <div class="mt-0.5 text-xs text-muted-foreground">Tüm yayınlanmış yazıları görüntüle</div>
              </div>
              <div
                data-selected-index="1"
                @click="navigateToResult('/categories')"
                :class="[
                  'cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0',
                  selectedIndex === 1
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground',
                ]"
              >
                <div class="text-sm font-medium">Tüm Kategorileri Görüntüle</div>
                <div class="mt-0.5 text-xs text-muted-foreground">Tüm kategorileri görüntüle</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section: Navigation + Actions -->
      <div class="flex items-center space-x-2">
        <!-- Navigation Links -->
        <div class="hidden items-center space-x-1 xl:flex">
          <Link
            href="/dashboard"
            class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Panel
          </Link>
          <a
            href="https://youtu.be/FPsx8xHLR1k?si=nZnBfqjYQun9R06h"
            target="_blank"
            class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Destek
          </a>
        </div>

        <!-- Join Us Button for Non-Logged In Users -->
        <div v-if="!isLoggedIn" class="tooltip tooltip-bottom" data-tip="Aramıza Katıl">
          <Link href="/join-us" class="block">
            <button
              class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            </button>
          </Link>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleDarkLight"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <template v-if="isDarkMode">
            <svg class="h-3.5 w-3.5 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
          </template>
          <template v-else>
            <svg class="h-3.5 w-3.5 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </template>
        </button>

        <!-- Mobile Menu Toggle for Desktop (fallback) -->
        <button
          @click="toggleMenu"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 xl:hidden"
        >
          <svg
            class="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          class="border-border bg-popover mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-lg border shadow-lg"
        >
          <!-- Handle Bar -->
          <div class="flex justify-center pb-2 pt-4">
            <div class="bg-muted h-1.5 w-16 rounded-full"></div>
          </div>

          <!-- Menu Content -->
          <div class="px-4 pb-6 sm:px-6" @click="handleMenuItemClick">
            <!-- App Header -->
            <Link href="/" class="mb-4 block" @click="closeMenu">
              <div class="flex items-center space-x-3 rounded-lg border border-border bg-card p-3">
                <div
                  class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10"
                >
                  <template v-if="logoPath && !isLoading">
                    <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
                  </template>
                  <span v-else class="text-sm font-bold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <h3 class="text-card-foreground text-base font-semibold">{{ seoTitle }}</h3>
                  <p class="text-muted-foreground text-xs">{{ appName }}</p>
                </div>
              </div>
            </Link>

            <!-- Navigation Buttons -->
            <div class="space-y-2">
              <!-- Public Navigation -->
              <div class="space-y-1">
                <NavItem href="/" icon="home" label="Ana Sayfa" />
                <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" />
                <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" />
                <!-- Admin Navigation for Logged In Users -->
                <template v-if="isLoggedIn">
                  <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" />
                  <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" />
                </template>
              </div>

              <!-- Write Show Page Actions for Mobile -->
              <template v-if="isWriteShowPage && isLoggedIn && write">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <Link
                      :href="route('writes.edit', write.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                      <span>Yazıyı Düzenle</span>
                    </Link>
                    <button
                      @click="deleteWriteMobile(write.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
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
                      <span>Yazıyı Sil</span>
                    </button>
                  </div>
                </div>
              </template>

              <!-- Category Show Page Actions for Mobile -->
              <template v-else-if="isCategoryShowPage && isLoggedIn && category">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <Link
                      :href="route('categories.edit', category.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                      <span>Kategoriyi Düzenle</span>
                    </Link>
                    <button
                      @click="deleteCategoryMobile(category.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
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
                      <span>Kategoriyi Sil</span>
                    </button>
                  </div>
                </div>
              </template>

              <!-- Language Pack Show Page Actions for Mobile -->
              <template v-else-if="isLanguagePackShowPage && isLoggedIn && pack">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <Link
                      :href="route('rendition.language-packs.edit', pack.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                      <span>Paketi Düzenle</span>
                    </Link>
                    <Link
                      :href="route('rendition.words.create')"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      @click="closeMenu"
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
                      <span>Yeni Kelime Ekle</span>
                    </Link>
                  </div>
                </div>
              </template>

              <!-- Word Show Page Actions for Mobile -->
              <template v-else-if="isWordShowPage && isLoggedIn && word">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <Link
                      :href="route('rendition.words.edit', word.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                      <span>Kelimeyi Düzenle</span>
                    </Link>
                    <button
                      @click="deleteWordMobile(word.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
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
                      <span>Kelimeyi Sil</span>
                    </button>
                  </div>
                </div>
              </template>

              <!-- Version Show Page Actions for Mobile -->
              <template v-else-if="isVersionShowPage && isLoggedIn && version">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <Link
                      :href="route('versions.edit', version.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                      <span>Versiyonu Düzenle</span>
                    </Link>
                    <button
                      @click="deleteVersionMobile(version.id)"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
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
                      <span>Versiyonu Sil</span>
                    </button>
                  </div>
                </div>
              </template>

              <!-- New Write/Category Buttons for Mobile -->
              <template v-else-if="isLoggedIn">
                <div class="border-t border-border pt-3">
                  <div class="space-y-1">
                    <!-- Yeni Yazı butonu - Writes sayfasında -->
                    <Link
                      v-if="isActiveRoute('/writes') && !isWriteShowPage"
                      href="/writes/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Yazı</span>
                    </Link>
                    <!-- Yeni Kategori butonu - Writes sayfasında -->
                    <Link
                      v-if="isActiveRoute('/writes') && !isWriteShowPage"
                      href="/categories/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Kategori</span>
                    </Link>
                    <!-- Yeni Yazı butonu - Categories sayfasında -->
                    <Link
                      v-if="isActiveRoute('/categories') && !isCategoryShowPage"
                      href="/writes/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Yazı</span>
                    </Link>
                    <!-- Yeni Kategori butonu - Categories sayfasında -->
                    <Link
                      v-if="isActiveRoute('/categories') && !isCategoryShowPage"
                      href="/categories/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Kategori</span>
                    </Link>
                    <Link
                      v-if="isActiveRoute('/rendition/words') && !isWordShowPage"
                      href="/rendition/words/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      @click="closeMenu"
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
                      <span>Yeni Kelime Ekle</span>
                    </Link>
                    <Link
                      v-if="isActiveRoute('/rendition/words') && !isWordShowPage"
                      href="/rendition/language-packs/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      @click="closeMenu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Yeni Paket Ekle</span>
                    </Link>
                    <Link
                      v-if="isActiveRoute('/versions') && !isVersionShowPage"
                      href="/versions/create"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      @click="closeMenu"
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
                      <span>Yeni Versiyon Ekle</span>
                    </Link>
                  </div>
                </div>
              </template>

              <!-- Profile Menu for Mobile - Only show for logged in users -->
              <template v-if="isLoggedIn">
                <div class="border-t border-border pt-3">
                  <div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Hesap
                  </div>
                  <div class="space-y-1">
                    <Link
                      :href="route('profile.edit')"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="closeMenu"
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Profil</span>
                    </Link>
                    <form @submit.prevent="handleLogoutMobile" class="w-full">
                      <button
                        type="submit"
                        class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                        @click="closeMenu"
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Çıkış Yap</span>
                      </button>
                    </form>
                  </div>
                </div>
              </template>

              <!-- Admin Panel Menu for Mobile - Only show on admin panel pages -->
              <template v-if="isAdminPanelPage && isLoggedIn">
                <div class="border-t border-border pt-3">
                  <div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Panel
                  </div>
                  <div class="space-y-1">
                    <Link
                      :href="route('dashboard')"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      :class="
                        isActiveRoute('/dashboard')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/50'
                      "
                      @click="closeMenu"
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      :href="route('media.index')"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      :class="
                        isActiveRoute('/media')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/50'
                      "
                      @click="closeMenu"
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Medya Yönetimi</span>
                    </Link>
                    <Link
                      :href="route('social-media.index')"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      :class="
                        isActiveRoute('/social-media')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/50'
                      "
                      @click="closeMenu"
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span>Sosyal Medya Yönetimi</span>
                    </Link>
                    <Link
                      :href="route('seo.edit')"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      :class="
                        isActiveRoute('/seo')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/50'
                      "
                      @click="closeMenu"
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
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span>SEO Yönetimi</span>
                    </Link>
                  </div>
                </div>
              </template>
            </div>

            <!-- Powered by Section -->
            <div v-if="!isLoggedIn" class="mt-4 border-t border-border pt-3">
              <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
                <div class="rounded-md bg-primary/10 p-3 text-center transition-colors hover:bg-primary/20">
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
                class="flex items-center space-x-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                <span class="text-sm font-medium">{{ currentThemeName }}</span>
              </button>

              <!-- Copyright -->
              <p class="text-xs text-muted-foreground">Notiriel - Tüm Hakları Saklıdır</p>
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
const searchInputRef = ref(null);

// Theme management
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Logo path logic
const logoPath = ref(
  page.props?.screen?.seo?.logo || page.props?.seo?.logo || page.props?.app?.seo?.logo || page.props?.app?.logo || null
);

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
  // Logo yüklenemediğinde logoPath'i null yap
  logoPath.value = null;
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
  };
  return themeMap[theme] || theme;
});

const toggleDarkLight = () => {
  try {
    const current = currentTheme.value;
    const newTheme = current === 'light' ? 'dark' : 'light';
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
  // Check for /writes/{slug} route
  if (url.startsWith('/writes/') && url !== '/writes' && url !== '/writes/create') {
    return true;
  }
  // Check for /categories/{category}/{write} route
  const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
  if (
    categoryWritePattern.test(url) &&
    !url.includes('/create') &&
    !url.includes('/edit') &&
    url.split('/').length === 4
  ) {
    return true;
  }
  return false;
});

const isCategoryShowPage = computed(() => {
  const url = page.url;
  // Check for /categories/{slug} route (category show page)
  if (url.startsWith('/categories/') && url !== '/categories' && url !== '/categories/create') {
    const parts = url.split('/').filter((part) => part.length > 0);
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

// Delete functions for mobile menu
const deleteWriteMobile = async (id) => {
  if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('writes.destroy', { write: id }));
    closeMenu();
  } catch (error) {
    console.error('Error deleting write:', error);
  }
};

const deleteCategoryMobile = async (id) => {
  if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('categories.destroy', id), {
      onSuccess: () => {
        router.visit(route('categories.index'));
        closeMenu();
      },
    });
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

const deleteWordMobile = async (id) => {
  if (!confirm('Bu kelimeyi silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('rendition.words.destroy', id), {
      onSuccess: () => {
        router.visit(route('rendition.words.index'));
        closeMenu();
      },
    });
  } catch (error) {
    console.error('Error deleting word:', error);
  }
};

const deleteVersionMobile = async (id) => {
  if (!confirm('Bu versiyonu silmek istediğinizden emin misiniz?')) {
    return;
  }
  try {
    await router.delete(route('versions.destroy', id), {
      onSuccess: () => {
        router.visit(route('versions.index'));
        closeMenu();
      },
    });
  } catch (error) {
    console.error('Error deleting version:', error);
  }
};

// Handle logout for mobile menu
const handleLogoutMobile = () => {
  router.post(route('logout'));
  closeMenu();
};

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
  const highlightClass = 'bg-primary/20 text-primary font-medium px-0.5 rounded';
  return text.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
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

// Keyboard shortcut support - Command+K / Ctrl+K
const handleKeydown = (event) => {
  // Command+K (Mac) veya Ctrl+K (Windows/Linux)
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    event.stopPropagation();

    // Search input'a focus yap
    if (searchInputRef.value) {
      searchInputRef.value.focus();
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
