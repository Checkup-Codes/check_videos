<template>
  <!-- Horizontal Tab Navigation - Hidden on mobile, shown on desktop -->
  <nav
    class="sticky top-12 z-40 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block"
  >
    <div class="flex h-9 items-center justify-between px-3">
      <!-- Tab Navigation Links -->
      <div class="flex items-center gap-0.5">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" />
        <div class="write-filter-dropdown-container relative inline-flex items-center">
          <TabNavItem
            href="/writes"
            icon="fa-solid fa-pencil"
            :label="writesLabel"
            :is-active="isActiveRoute('/writes')"
          />
          <!-- X button to clear filter and Filter dropdown button - Only for logged in users -->
          <div v-if="isLoggedIn" class="relative -ml-0.5 flex items-center gap-0.5">
            <!-- X button to clear filter - Only show when filter is active -->
            <button
              v-if="writeFilter !== 'all' && isActiveRoute('/writes')"
              @click.stop="clearWriteFilter"
              class="inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              title="Filtreyi temizle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <!-- Write Filter Dropdown button -->
            <div class="relative">
              <button
                @click="handleFilterClick"
                class="inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                :class="[
                  showWriteFilterDropdown && isActiveRoute('/writes') ? 'bg-accent text-accent-foreground' : '',
                  !isActiveRoute('/writes') ? 'opacity-40 cursor-not-allowed' : '',
                ]"
                :disabled="!isActiveRoute('/writes')"
                title="Filtrele"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" />
                </svg>
              </button>
              <div
                v-if="showWriteFilterDropdown && isActiveRoute('/writes')"
                class="absolute right-0 top-full z-50 mt-1 w-36 rounded-md border border-border bg-popover shadow-md"
              >
                <div class="flex flex-col p-1">
                  <button
                    class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-accent text-accent-foreground': writeFilter === 'all' }"
                    @click="setWriteFilter('all')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Tümü
                  </button>
                  <button
                    class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-accent text-accent-foreground': writeFilter === 'published' }"
                    @click="setWriteFilter('published')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                    </svg>
                    Herkese Açık
                  </button>
                  <button
                    class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-accent text-accent-foreground': writeFilter === 'link_only' }"
                    @click="setWriteFilter('link_only')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
                    </svg>
                    Sadece Link
                  </button>
                  <button
                    class="inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-accent text-accent-foreground': writeFilter === 'private' }"
                    @click="setWriteFilter('private')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" />
                    </svg>
                    Gizli
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category-collapse-dropdown-container relative inline-flex items-center">
          <TabNavItem
            href="/categories"
            icon="fa-solid fa-book"
            label="Kategoriler"
            :is-active="isActiveRoute('/categories')"
          />
          <!-- Collapse/Expand button - Always visible but only enabled on /categories page -->
          <button
            @click="toggleAllCategories"
            class="relative -ml-0.5 inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
            :class="
              isActiveRoute('/categories') && areAllCategoriesExpanded
                ? 'bg-accent text-accent-foreground'
                : ''
            "
            :disabled="!isActiveRoute('/categories')"
            :title="
              isActiveRoute('/categories')
                ? areAllCategoriesExpanded
                  ? 'Tümünü Daralt'
                  : 'Tümünü Genişlet'
                : 'Kategoriler sayfasında kullanılabilir'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 transition-transform duration-200"
              :class="{ 'rotate-180': areAllCategoriesExpanded && isActiveRoute('/categories') }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

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
      <div class="flex items-center gap-1.5">
        <!-- Page Actions Component - Desktop -->
        <PageActions variant="desktop" />

        <!-- Form Action Buttons for Create/Edit Pages -->
        <template v-if="isLoggedIn && (isWriteCreatePage || isWriteEditPage || isCategoryCreatePage || isCategoryEditPage)">
          <div class="flex items-center gap-1.5">
            <!-- Reset Button (only for create pages) -->
            <button
              v-if="isWriteCreatePage || isCategoryCreatePage"
              @click="handleFormReset"
              :disabled="isFormProcessing"
              class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              title="Formu sıfırla"
            >
              Sıfırla
            </button>
            <!-- Save/Update Button -->
            <button
              @click="handleFormSubmit"
              :disabled="isFormProcessing"
              class="inline-flex h-7 items-center justify-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              :title="isWriteEditPage || isCategoryEditPage ? 'Değişiklikleri kaydet' : 'Yazıyı kaydet'"
            >
              <svg
                v-if="isFormProcessing"
                class="h-3 w-3 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ isFormProcessing ? (isWriteEditPage || isCategoryEditPage ? 'Güncelleniyor...' : 'Kaydediliyor...') : (isWriteEditPage || isCategoryEditPage ? 'Güncelle' : 'Kaydet') }}
            </button>
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
              class="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-md"
            >
              <div class="flex flex-col p-1">
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
import { usePage, Link, router } from '@inertiajs/vue3';
import { computed, ref, onMounted, onUnmounted, watch, inject } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

// Write filter dropdown state
const showWriteFilterDropdown = ref(false);
const writeFilter = ref('all');

// Admin panel dropdown state
const showAdminPanelDropdown = ref(false);

// Create dropdown state
const showCreateDropdown = ref(false);

// Form processing state
const isFormProcessing = ref(false);


// Category collapse/expand state
const injectedCategories = inject('categories', []);
const categories = computed(() => {
  // Try inject first, then props
  if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
    return injectedCategories;
  }
  if (page.props.categories && Array.isArray(page.props.categories) && page.props.categories.length > 0) {
    return page.props.categories;
  }
  return [];
});
const areAllCategoriesExpanded = computed(() => store.getters['CategorySidebar/collapsedSet'].size === 0);

// Load filter from localStorage on mount
let clickOutsideHandler = null;

onMounted(() => {
  const savedFilter = localStorage.getItem('writeListFilter');
  if (savedFilter) {
    writeFilter.value = savedFilter;
  }

  // Close dropdown when clicking outside
  clickOutsideHandler = (event) => {
    const dropdownElement = event.target.closest('.write-filter-dropdown-container');
    const adminDropdownElement = event.target.closest('.admin-panel-dropdown-container');
    const createDropdownElement = event.target.closest('.create-dropdown-container');
    if (showWriteFilterDropdown.value && !dropdownElement) {
      showWriteFilterDropdown.value = false;
    }
    if (showAdminPanelDropdown.value && !adminDropdownElement) {
      showAdminPanelDropdown.value = false;
    }
    if (showCreateDropdown.value && !createDropdownElement) {
      showCreateDropdown.value = false;
    }
  };

  // Close dropdown when navigating away from /writes page
  const handleRouteChange = () => {
    if (!isActiveRoute('/writes')) {
      showWriteFilterDropdown.value = false;
    }
  };

  // Watch for route changes
  watch(() => page.url, handleRouteChange);

  document.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
});

// Handle filter button click - only allow on /writes page
const handleFilterClick = () => {
  if (isActiveRoute('/writes')) {
    showWriteFilterDropdown.value = !showWriteFilterDropdown.value;
  }
};

// Get filter label in Turkish
const getFilterLabel = (filter) => {
  const filterLabels = {
    all: 'Tümü',
    published: 'Herkese Açık',
    link_only: 'Sadece Link',
    private: 'Gizli',
  };
  return filterLabels[filter] || 'Tümü';
};

// Computed label for writes tab
const writesLabel = computed(() => {
  const currentUrl = page.url;
  const isOnWritesPage = currentUrl.startsWith('/writes') && currentUrl !== '/writes/create';

  if (isLoggedIn.value && writeFilter.value !== 'all' && isOnWritesPage) {
    return `Yazılar: ${getFilterLabel(writeFilter.value)}`;
  }
  return 'Yazılar';
});

// Clear write filter
const clearWriteFilter = () => {
  setWriteFilter('all');
};

// Helper function to get all category IDs recursively
const getAllCategoryIds = (categories) => {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return [];
  }
  
  let ids = [];
  categories.forEach((category) => {
    if (category && category.id) {
      ids.push(category.id);
      // Recursively get children IDs
      if (category.children && Array.isArray(category.children) && category.children.length > 0) {
        ids = ids.concat(getAllCategoryIds(category.children));
      }
    }
  });
  return ids;
};

// Toggle all categories expand/collapse
const toggleAllCategories = () => {
  const cats = categories.value;
  if (!cats || cats.length === 0) {
    console.warn('Categories not available for toggle');
    return;
  }
  
  if (areAllCategoriesExpanded.value) {
    // If expanded, collapse all
    const allIds = getAllCategoryIds(cats);
    if (allIds.length > 0) {
      store.dispatch('CategorySidebar/collapseAll', allIds);
    }
  } else {
    // If collapsed, expand all
    store.dispatch('CategorySidebar/expandAll');
  }
};

// Set write filter and save to localStorage
const setWriteFilter = (filter) => {
  writeFilter.value = filter;
  localStorage.setItem('writeListFilter', filter);
  showWriteFilterDropdown.value = false;

  // Trigger a custom event to notify WriteList component
  window.dispatchEvent(new CustomEvent('writeFilterChanged', { detail: filter }));
};

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
});

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
