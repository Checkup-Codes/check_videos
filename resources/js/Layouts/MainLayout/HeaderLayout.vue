<template>
  <!-- Search Backdrop Overlay -->
  <div
    v-if="
      (showSearchResults &&
        ((searchResults.articles && searchResults.articles.length > 0) ||
          (searchResults.categories && searchResults.categories.length > 0) ||
          searchQuery.length > 0)) ||
      (showMobileSearchResults && mobileSearchQuery.length > 0)
    "
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md transition-opacity duration-300"
    @click="closeAllSearchResults"
  ></div>

  <!-- Full Width Header -->
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60"
  >
    <!-- Mobile Header -->
    <div class="flex h-12 items-center justify-between gap-2 px-3 sm:px-4 lg:hidden">
      <!-- Back button -->
      <Link
        v-if="basePath"
        :href="`/${basePath}`"
        class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <GoBackSvg class="h-4 w-4" />
      </Link>
      <div v-else class="w-9 flex-shrink-0"></div>

      <!-- Mobile Search -->
      <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
          <svg class="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          v-model="mobileSearchQuery"
          @focus="showMobileSearchResults = true"
          @blur="hideMobileSearchResults"
          @input="performMobileSearch"
          @keydown.enter="handleMobileEnterKey"
          @keydown.escape="clearMobileSearch"
          type="text"
          placeholder="Ara..."
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <!-- Mobile Search Results Dropdown -->
        <div
          v-if="showMobileSearchResults && mobileSearchQuery.length > 0"
          class="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-border bg-popover shadow-lg"
        >
          <div v-if="isMobileSearching" class="flex items-center justify-center p-4">
            <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span class="ml-2 text-sm text-muted-foreground">Aranıyor...</span>
          </div>
          <div
            v-else-if="(!mobileSearchResults.articles || mobileSearchResults.articles.length === 0) && (!mobileSearchResults.categories || mobileSearchResults.categories.length === 0)"
            class="p-4 text-center text-sm text-muted-foreground"
          >
            "{{ mobileSearchQuery }}" için sonuç bulunamadı
          </div>
          <div v-else class="py-1">
            <!-- Grid Layout for Mobile: 75% Articles, 25% Categories -->
            <div v-if="mobileSearchResults.categories && mobileSearchResults.categories.length > 0" class="grid grid-cols-4 gap-0">
              <!-- Articles Section - 3/4 width -->
              <div v-if="mobileSearchResults.articles && mobileSearchResults.articles.length > 0" class="col-span-3 border-r border-border">
                <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">Yazılar</div>
                <a
                  v-for="article in mobileSearchResults.articles.slice(0, 5)"
                  :key="article.id"
                  :href="article.url"
                  class="block border-b border-border px-3 py-2 text-sm last:border-b-0 hover:bg-accent"
                  @mousedown.prevent="navigateToMobileResult(article.url)"
                >
                  {{ article.title }}
                </a>
              </div>
              
              <!-- Categories Section - 1/4 width -->
              <div class="col-span-1">
                <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">Kategoriler</div>
                <a
                  v-for="category in mobileSearchResults.categories.slice(0, 3)"
                  :key="category.id"
                  :href="category.url"
                  class="block border-b border-border px-3 py-2 text-sm last:border-b-0 hover:bg-accent"
                  @mousedown.prevent="navigateToMobileResult(category.url)"
                >
                  {{ category.name }}
                </a>
              </div>
            </div>
            
            <!-- Full Width Articles (when no categories) -->
            <template v-else-if="mobileSearchResults.articles && mobileSearchResults.articles.length > 0">
              <div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">Yazılar</div>
              <a
                v-for="article in mobileSearchResults.articles.slice(0, 5)"
                :key="article.id"
                :href="article.url"
                class="block px-3 py-2 text-sm hover:bg-accent"
                @mousedown.prevent="navigateToMobileResult(article.url)"
              >
                {{ article.title }}
              </a>
            </template>
          </div>
        </div>
      </div>

      <!-- Menu Toggle Button -->
      <button
        @click="toggleMenu"
        class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
            <template v-if="logoPath && !logoError">
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
              <!-- Grid Layout: 75% Articles, 25% Categories -->
              <div v-if="searchResults.categories && searchResults.categories.length > 0" class="grid grid-cols-4 gap-0">
                <!-- Articles Section - 3/4 width -->
                <div v-if="searchResults.articles && searchResults.articles.length > 0" class="col-span-3 border-r border-border">
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

                <!-- Categories Section - 1/4 width -->
                <div class="col-span-1">
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

              <!-- Full Width Articles (when no categories) -->
              <div v-else-if="searchResults.articles && searchResults.articles.length > 0">
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
            :href="isLoggedIn ? '/dashboard' : '/login'"
            class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {{ isLoggedIn ? 'Panel' : 'Giriş Yap' }}
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

        <!-- Profile Icon - Only show for logged in users -->
        <template v-if="isLoggedIn">
          <div class="profile-dropdown-container relative inline-block">
            <button
              @click="showProfileDropdown = !showProfileDropdown"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              :class="{ 'bg-accent text-accent-foreground': showProfileDropdown }"
              title="Profil"
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
            </button>

            <div
              v-if="showProfileDropdown"
              class="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg"
            >
              <div class="flex flex-col gap-1 p-1">
                <Link
                  :href="route('profile.edit')"
                  class="inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  @click="showProfileDropdown = false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
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
                  Profil
                </Link>
                <button
                  type="button"
                  @click="handleLogout"
                  class="inline-flex h-7 w-full items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
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
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </template>

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
        <div class="mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-popover shadow-lg">
          <!-- Handle Bar -->
          <div class="flex justify-center pb-2 pt-4">
            <div class="h-1.5 w-16 rounded-full bg-muted"></div>
          </div>

          <!-- Menu Content -->
          <div class="px-4 pb-6 sm:px-6" @click="handleMenuItemClick">
            <!-- App Header -->
            <Link href="/" class="mb-4 block" @click="closeMenu">
              <div class="flex items-center space-x-3 rounded-lg border border-border bg-card p-3">
                <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10">
                  <template v-if="logoPath && !isLoading">
                    <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
                  </template>
                  <span v-else class="text-sm font-bold text-primary">{{ seoTitle.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-card-foreground">{{ seoTitle }}</h3>
                  <p class="text-xs text-muted-foreground">{{ appName }}</p>
                </div>
              </div>
            </Link>

            <!-- Panel Button -->
            <div class="mb-4">
              <Link
                :href="isLoggedIn ? '/dashboard' : '/login'"
                class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                @click="closeMenu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {{ isLoggedIn ? 'Panel' : 'Giriş Yap' }}
              </Link>
            </div>

            <!-- Navigation Buttons -->
            <div class="space-y-2">
              <!-- Public Navigation -->
              <div class="space-y-1">
                <NavItem href="/" icon="home" label="Ana Sayfa" />
                <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" />
                <!-- Journey - visible to everyone -->
                <NavItem href="/journey" icon="fa-solid fa-road" label="Yolculuk" />
                <!-- Workspace - visible if logged in OR has workspaces -->
                <NavItem
                  v-if="isLoggedIn || workspaceCount > 0"
                  href="/workspace"
                  icon="fa-solid fa-briefcase"
                  label="Çalışma Alanım"
                />
                <!-- Bookmarks - visible if logged in -->
                <NavItem v-if="isLoggedIn" href="/bookmarks" icon="fa-solid fa-bookmark" label="Yer İmleri" />
                <!-- Admin Navigation for Logged In Users -->
                <template v-if="isLoggedIn">
                  <NavItem href="/test-categories" icon="fa-solid fa-clipboard-question" label="Testler" />
                  <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" />
                  <NavItem href="/services" icon="fa-solid fa-bolt" label="Servisler" />
                  <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" />
                </template>
              </div>

              <!-- Form Action Buttons for Create/Edit Pages (Mobile) -->
              <template
                v-if="
                  isLoggedIn &&
                  (isWriteCreatePage ||
                    isWriteEditPage ||
                    isCategoryCreatePage ||
                    isCategoryEditPage ||
                    isTestCreatePage ||
                    isTestEditPage ||
                    isTestCategoryCreatePage ||
                    isTestCategoryEditPage)
                "
              >
                <div class="border-t border-border pt-3">
                  <div class="space-y-2">
                    <!-- Reset Button (only for create pages) -->
                    <button
                      v-if="isWriteCreatePage || isCategoryCreatePage || isTestCreatePage || isTestCategoryCreatePage"
                      @click="handleFormResetMobile"
                      :disabled="isFormProcessing"
                      class="flex w-full items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Sıfırla</span>
                    </button>
                    <!-- Save/Update Button -->
                    <button
                      @click="handleFormSubmitMobile"
                      :disabled="isFormProcessing"
                      class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg
                        v-if="isFormProcessing"
                        class="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{
                        isFormProcessing
                          ? isWriteEditPage || isCategoryEditPage || isTestEditPage || isTestCategoryEditPage
                            ? 'Güncelleniyor...'
                            : 'Kaydediliyor...'
                          : isWriteEditPage || isCategoryEditPage || isTestEditPage || isTestCategoryEditPage
                            ? 'Güncelle'
                            : 'Kaydet'
                      }}</span>
                    </button>
                  </div>
                </div>
              </template>

              <!-- Create Dropdown for Mobile (Logged In Users) -->
              <template v-else-if="isLoggedIn">
                <div class="border-t border-border pt-3">
                  <button
                    @click="showMobileCreateDropdown = !showMobileCreateDropdown"
                    class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <span class="text-xs font-medium uppercase text-muted-foreground">Yeni Oluştur</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 transition-transform"
                      :class="{ 'rotate-180': showMobileCreateDropdown }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div v-if="showMobileCreateDropdown" class="mt-2 space-y-3 pl-3">
                    <!-- Yazılar Grubu -->
                    <div>
                      <div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Yazılar
                      </div>
                      <div class="space-y-0.5">
                        <Link
                          href="/writes/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span>Yeni Yazı</span>
                        </Link>
                        <Link
                          href="/categories/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <span>Yeni Kategori Ekle</span>
                        </Link>
                      </div>
                    </div>

                    <!-- Kelimeler Grubu -->
                    <div>
                      <div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Kelimeler
                      </div>
                      <div class="space-y-0.5">
                        <Link
                          href="/rendition/words/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                          </svg>
                          <span>Yeni Kelime</span>
                        </Link>
                        <Link
                          href="/rendition/language-packs/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <span>Yeni Kelime Paketi</span>
                        </Link>
                      </div>
                    </div>

                    <!-- Testler Grubu -->
                    <div>
                      <div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Testler
                      </div>
                      <div class="space-y-0.5">
                        <Link
                          href="/tests/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Yeni Test</span>
                        </Link>
                        <Link
                          href="/test-categories/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Yeni Test Kategorisi</span>
                        </Link>
                      </div>
                    </div>

                    <!-- Projeler Grubu -->
                    <div>
                      <div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Projeler
                      </div>
                      <div class="space-y-0.5">
                        <Link
                          href="/projects/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          <span>Yeni Proje</span>
                        </Link>
                        <Link
                          href="/customers/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>Yeni Müşteri</span>
                        </Link>
                        <Link
                          href="/services/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>Yeni Servis</span>
                        </Link>
                      </div>
                    </div>

                    <!-- Yer İmleri Grubu -->
                    <div>
                      <div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Yer İmleri
                      </div>
                      <div class="space-y-0.5">
                        <Link
                          href="/bookmarks/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          <span>Yeni Yer İmi</span>
                        </Link>
                        <Link
                          href="/bookmark-categories/create"
                          class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          <span>Yeni Yer İmi Kategorisi</span>
                        </Link>
                      </div>
                    </div>

                    <!-- Versiyonlar (Tek başına) -->
                    <div class="border-t border-border pt-2">
                      <Link
                        href="/versions/create"
                        class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>Yeni Versiyon</span>
                      </Link>
                    </div>

                    <!-- Yolculuk (Tek başına) -->
                    <div class="border-t border-border pt-2">
                      <Link
                        href="/journey/create"
                        class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <span>Yeni Yolculuk</span>
                      </Link>
                    </div>

                    <!-- Çalışma Alanım (Tek başına) -->
                    <div class="border-t border-border pt-2">
                      <Link
                        href="/workspace/create"
                        class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Yeni Çalışma Alanı</span>
                      </Link>
                    </div>
                    <!-- Certificate Create -->
                    <div>
                      <Link
                        :href="route('certificates.create')"
                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <svg
                          class="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span>Yeni Sertifika</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </template>

              <!-- Page Actions for Mobile -->
              <div
                v-if="
                  isLoggedIn &&
                  (isWriteShowPage ||
                    isWriteEditPage ||
                    isCategoryShowPage ||
                    isCategoryEditPage ||
                    isWordShowPage ||
                    isLanguagePackShowPage ||
                    isVersionShowPage ||
                    isTestCategoryShowPage ||
                    isTestCategoryEditPage ||
                    isTestShowPage ||
                    isTestEditPage ||
                    isJourneyShowPage ||
                    isJourneyEditPage ||
                    isServiceShowPage ||
                    isServiceEditPage ||
                    isWorkspaceShowPage ||
                    isWorkspaceEditPage)
                "
                class="border-t border-border pt-3"
              >
                <PageActions variant="mobile" :on-link-click="closeMenu" />
              </div>

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
                    <button
                      type="button"
                      @click="handleLogoutMobile"
                      class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
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
import PageActions from '@/Layouts/_composable/PageActions.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

const page = usePage();

// Header'da gösterilecek site adı (sadece siteName, pageTitle değil)
const seoTitle = computed(() => {
  // Priority: screen.seo.siteName > app.seo.siteName > app.seo.title > app.name > fallback
  return (
    page.props?.screen?.seo?.siteName ||
    page.props?.app?.seo?.siteName ||
    page.props?.app?.seo?.title ||
    page.props?.app?.name ||
    'Check-up Codes'
  );
});

// Browser tab title (PageTitle | SiteName formatında)
const browserTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    page.props?.app?.name ||
    'Check-up Codes'
  );
});

const isMenuOpen = ref(false);
const showProfileDropdown = ref(false);
const showMobileCreateDropdown = ref(false);
const store = useStore();
const imagePath = ref('');
const auth = ref(null);
const appName = computed(() => page.props?.app?.name || 'Check-up Codes');
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

// Mobile Search functionality
const mobileSearchQuery = ref('');
const mobileSearchResults = ref({ articles: [], categories: [] });
const showMobileSearchResults = ref(false);
const isMobileSearching = ref(false);
const mobileSearchTimeout = ref(null);

// Theme management
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Logo path logic - priority: screen.seo.logo > app.seo.logo > fallback
const logoPath = computed(() => {
  return page.props?.screen?.seo?.logo || page.props?.app?.seo?.logo || null;
});

const logoAlt = computed(() => {
  return (
    page.props?.screen?.seo?.logo_alt ||
    page.props?.app?.seo?.logo_alt ||
    seoTitle.value ||
    'Logo'
  );
});

const isLoading = ref(false);
const logoError = ref(false);

const handleImageError = () => {
  // Logo yüklenemediğinde hata flag'ini set et
  logoError.value = true;
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

// Workspace count for visibility check
const workspaceCount = computed(() => {
  return page.props.workspaceCount || 0;
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

const isTestCategoryShowPage = computed(() => {
  const url = page.url;
  if (url.startsWith('/test-categories/') && url !== '/test-categories' && url !== '/test-categories/create') {
    const parts = url.split('/').filter((part) => part.length > 0);
    if (parts.length === 2 && parts[0] === 'test-categories' && !parts[1].includes('edit')) {
      return true;
    }
  }
  return false;
});

const isTestCategoryEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/test-categories/') && url.includes('/edit');
});

const isTestShowPage = computed(() => {
  const url = page.url;
  return (
    url.startsWith('/tests/') &&
    url !== '/tests' &&
    url !== '/tests/create' &&
    !url.includes('/take') &&
    !url.includes('/edit')
  );
});

const isTestEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/tests/') && url.includes('/edit');
});

const isJourneyShowPage = computed(() => {
  const url = page.url;
  return (
    url.startsWith('/journey/') && url !== '/journey' && url !== '/journey/create' && !url.includes('/journey/edit')
  );
});

const isJourneyEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/journey/') && url.includes('/edit');
});

const isServiceShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/services/') && url !== '/services' && url !== '/services/create' && !url.includes('/edit');
});

const isServiceEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/services/') && url.includes('/edit');
});

const isWorkspaceShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/workspace/') && url !== '/workspace' && url !== '/workspace/create' && !url.includes('/edit');
});

const isWorkspaceEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/workspace/') && url.includes('/edit');
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

// Form processing state
const isFormProcessing = ref(false);

// Handle form submit from mobile menu
const handleFormSubmitMobile = () => {
  if (isFormProcessing.value) return;
  window.dispatchEvent(new CustomEvent('sidebarFormSubmit'));
  closeMenu();
};

// Handle form reset from mobile menu
const handleFormResetMobile = () => {
  if (isFormProcessing.value) return;
  window.dispatchEvent(new CustomEvent('sidebarFormReset'));
  closeMenu();
};

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
    const currentUrl = page.url;
    const isCategoryWritePage = /^\/categories\/[^/]+\/[^/]+$/.test(currentUrl);

    await router.delete(route('writes.destroy', { write: id }), {
      onSuccess: () => {
        closeMenu();
        if (isCategoryWritePage) {
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

// Handle logout for desktop
const handleLogout = () => {
  router.post(route('logout'));
  showProfileDropdown.value = false;
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
  if (!isMenuOpen.value) {
    showMobileCreateDropdown.value = false;
  }
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
  showMobileCreateDropdown.value = false;
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

// Mobile Search functionality methods
const performMobileSearch = () => {
  if (mobileSearchTimeout.value) {
    clearTimeout(mobileSearchTimeout.value);
  }

  if (mobileSearchQuery.value.length < 2) {
    mobileSearchResults.value = { articles: [], categories: [] };
    return;
  }

  mobileSearchTimeout.value = setTimeout(async () => {
    isMobileSearching.value = true;
    try {
      const response = await axios.get('/api/search', {
        params: {
          q: mobileSearchQuery.value,
          type: 'articles,categories',
        },
      });
      mobileSearchResults.value = response.data;
    } catch (error) {
      console.error('Mobile search error:', error);
      mobileSearchResults.value = { articles: [], categories: [] };
    } finally {
      isMobileSearching.value = false;
    }
  }, 300);
};

const handleMobileEnterKey = () => {
  if (mobileSearchQuery.value.trim()) {
    router.visit(`/writes?search=${encodeURIComponent(mobileSearchQuery.value)}`);
    clearMobileSearch();
  }
};

const hideMobileSearchResults = () => {
  setTimeout(() => {
    showMobileSearchResults.value = false;
  }, 200);
};

const clearMobileSearch = () => {
  mobileSearchQuery.value = '';
  mobileSearchResults.value = { articles: [], categories: [] };
  showMobileSearchResults.value = false;
};

const navigateToMobileResult = (url) => {
  clearMobileSearch();
  router.visit(url);
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

const closeAllSearchResults = () => {
  showSearchResults.value = false;
  showMobileSearchResults.value = false;
  selectedIndex.value = -1;
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
let clickOutsideHandler = null;

// Listen for form processing state changes
let formProcessingHandler = null;

onMounted(() => {
  // Listen for form processing state
  formProcessingHandler = (event) => {
    isFormProcessing.value = event.detail.processing || false;
  };
  window.addEventListener('formProcessingState', formProcessingHandler);
  // Close profile dropdown when clicking outside
  clickOutsideHandler = (event) => {
    const profileDropdownElement = event.target.closest('.profile-dropdown-container');
    if (showProfileDropdown.value && !profileDropdownElement) {
      showProfileDropdown.value = false;
    }
  };
  document.addEventListener('click', clickOutsideHandler);
  document.addEventListener('keydown', handleKeydown);
});

// Cleanup
onUnmounted(() => {
  if (formProcessingHandler) {
    window.removeEventListener('formProcessingState', formProcessingHandler);
  }
  document.removeEventListener('keydown', handleKeydown);
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
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
