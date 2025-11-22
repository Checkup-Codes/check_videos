<template>
  <!-- Horizontal Tab Navigation - Hidden on mobile, shown on desktop -->
  <nav
    class="sticky top-12 z-40 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block"
  >
    <div class="flex h-10 items-center justify-between px-4 sm:px-6">
      <!-- Tab Navigation Links -->
      <div class="flex items-center space-x-1">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" />
        <div class="write-filter-dropdown-container relative inline-flex items-center">
          <TabNavItem
            href="/writes"
            icon="fa-solid fa-pencil"
            :label="writesLabel"
            :is-active="isActiveRoute('/writes')"
          />
          <!-- X button to clear filter and Filter dropdown button - Only for logged in users -->
          <div v-if="isLoggedIn" class="relative -ml-1 flex items-center">
            <!-- X button to clear filter - Only show when filter is active -->
            <button
              v-if="writeFilter !== 'all' && isActiveRoute('/writes')"
              @click.stop="clearWriteFilter"
              class="inline-flex h-9 w-6 items-center justify-center rounded-md text-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              title="Filtreyi temizle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <!-- Write Filter Dropdown button -->
            <div class="relative">
              <button
                @click="handleFilterClick"
                class="inline-flex h-9 w-6 items-center justify-center rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                :class="[
                  isActiveRoute('/writes')
                    ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    : 'cursor-not-allowed text-muted-foreground opacity-50',
                  showWriteFilterDropdown && isActiveRoute('/writes') ? 'bg-accent text-accent-foreground' : '',
                ]"
                :disabled="!isActiveRoute('/writes')"
                title="Filtrele"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
                  />
                </svg>
              </button>
              <div
                v-if="showWriteFilterDropdown && isActiveRoute('/writes')"
                class="absolute right-0 top-full z-50 mt-1 w-40 rounded-md border border-border bg-popover shadow-lg"
              >
                <div class="flex flex-col gap-1 p-1">
                  <button
                    class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': writeFilter === 'all' }"
                    @click="setWriteFilter('all')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    Tümü
                  </button>
                  <button
                    class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': writeFilter === 'published' }"
                    @click="setWriteFilter('published')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" stroke-width="2" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                      />
                    </svg>
                    Herkese Açık
                  </button>
                  <button
                    class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': writeFilter === 'link_only' }"
                    @click="setWriteFilter('link_only')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                      />
                    </svg>
                    Sadece Link
                  </button>
                  <button
                    class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': writeFilter === 'private' }"
                    @click="setWriteFilter('private')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
                      />
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
          <!-- Collapse/Expand button - Only show on /categories page -->
          <button
            v-if="isActiveRoute('/categories')"
            @click="toggleAllCategories"
            class="relative -ml-1 inline-flex h-9 w-6 items-center justify-center rounded-md text-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            :class="{
              'bg-accent text-accent-foreground': areAllCategoriesExpanded,
            }"
            :title="areAllCategoriesExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': areAllCategoriesExpanded }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
      <div class="flex items-center space-x-2">
        <!-- Write Show Page Actions -->
        <template v-if="isWriteShowPage && isLoggedIn && write">
          <Link
            :href="route('writes.edit', write.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
            class="inline-flex h-9 items-center justify-center rounded-md border border-destructive/50 bg-background px-3 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Kategoriyi düzenle"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteCategory(category.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-destructive/50 bg-background px-3 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Kategoriyi sil"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- New Write Button for Writes Index Page -->
        <Link
          v-else-if="isActiveRoute('/writes') && isLoggedIn && !isWriteShowPage"
          href="/writes/create"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Yeni yazı ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Yazı</span>
        </Link>

        <!-- Language Pack Show Page Actions -->
        <template v-else-if="isLanguagePackShowPage && isLoggedIn && pack">
          <Link
            :href="route('rendition.language-packs.edit', pack.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Paketi düzenle"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Paketi Düzenle</span>
          </Link>
          <Link
            :href="route('rendition.words.create')"
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Yeni kelime ekle"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kelime</span>
          </Link>
        </template>

        <!-- Word Show Page Actions -->
        <template v-else-if="isWordShowPage && isLoggedIn && word">
          <Link
            :href="route('rendition.words.edit', word.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Kelimeyi düzenle"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteWord(word.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-destructive/50 bg-background px-3 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Kelimeyi sil"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- Version Show Page Actions -->
        <template v-else-if="isVersionShowPage && isLoggedIn && version">
          <Link
            :href="route('versions.edit', version.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Versiyonu düzenle"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Düzenle</span>
          </Link>
          <button
            @click="deleteVersion(version.id)"
            class="inline-flex h-9 items-center justify-center rounded-md border border-destructive/50 bg-background px-3 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            title="Versiyonu sil"
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
            <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Sil</span>
          </button>
        </template>

        <!-- New Category Button for Categories Index Page -->
        <Link
          v-else-if="isActiveRoute('/categories') && isLoggedIn && !isCategoryShowPage"
          href="/categories/create"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Yeni kategori ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kategori</span>
        </Link>

        <!-- New Word Button for Rendition Words Index Page -->
        <Link
          v-else-if="isActiveRoute('/rendition/words') && isLoggedIn && !isWordShowPage"
          href="/rendition/words/create"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Yeni kelime ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Kelime</span>
        </Link>

        <!-- New Language Pack Button for Rendition Words Index Page -->
        <Link
          v-if="isActiveRoute('/rendition/words') && isLoggedIn && !isWordShowPage"
          href="/rendition/language-packs/create"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Yeni kelime paketi ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span class="hidden whitespace-nowrap text-sm font-medium sm:inline">Yeni Paket</span>
        </Link>

        <!-- New Version Button for Versions Index Page -->
        <Link
          v-else-if="isActiveRoute('/versions') && isLoggedIn && !isVersionShowPage"
          href="/versions/create"
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          title="Yeni versiyon ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
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
import { computed, ref, onMounted, onUnmounted, watch, inject } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

// Write filter dropdown state
const showWriteFilterDropdown = ref(false);
const writeFilter = ref('all');

// Category collapse/expand state
const categories = inject('categories', []);
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
    if (showWriteFilterDropdown.value && !dropdownElement) {
      showWriteFilterDropdown.value = false;
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
  let ids = [];
  categories.forEach((category) => {
    ids.push(category.id);
    if (category.children && category.children.length > 0) {
      ids = ids.concat(getAllCategoryIds(category.children));
    }
  });
  return ids;
};

// Toggle all categories expand/collapse
const toggleAllCategories = () => {
  if (areAllCategoriesExpanded.value) {
    // If expanded, collapse all
    const allIds = getAllCategoryIds(categories);
    store.dispatch('CategorySidebar/collapseAll', allIds);
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
