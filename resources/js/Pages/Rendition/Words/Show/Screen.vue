<template>
  <CheckScreen>
    <div class="container mx-auto max-w-7xl px-4 py-4">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-foreground">
          {{ props.pack?.name || 'Kelimeler' }}
        </h1>
        <p class="text-muted-foreground mt-1 text-sm">
          {{ props.words?.length || 0 }} kelime
        </p>
      </div>

      <!-- Search and Filters (Oyun başlamadığında göster) -->
      <div v-if="!showGameInterface" class="mb-6 space-y-6">
        <!-- Search -->
        <div class="relative max-w-xs">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
            <svg class="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Ara..."
            class="flex h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            @keyup.enter="filterWords"
          />
        </div>

        <!-- Game Buttons -->
        <div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Çoktan Seçmeli -->
            <button 
              @click="startGame('multiple-choice')" 
              :disabled="!hasEnoughWords"
              class="group relative rounded-lg border-2 border-emerald-500/20 bg-emerald-500/5 p-4 text-left transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-foreground">Çoktan Seçmeli</h3>
                  <p class="text-xs text-muted-foreground mt-0.5">Doğru cevabı seç</p>
                </div>
              </div>
            </button>

            <!-- Boşluk Doldurma -->
            <button 
              @click="startGame('fill-in-the-blank')" 
              :disabled="!hasEnoughWords"
              class="group relative rounded-lg border-2 border-violet-500/20 bg-violet-500/5 p-4 text-left transition-all hover:border-violet-500/40 hover:bg-violet-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg class="h-5 w-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-foreground">Boşluk Doldurma</h3>
                  <p class="text-xs text-muted-foreground mt-0.5">Eksik kelimeyi bul</p>
                </div>
              </div>
            </button>

            <!-- Kelime Tamamlama -->
            <button 
              @click="startGame('word-completion')" 
              :disabled="!hasEnoughWords"
              class="group relative rounded-lg border-2 border-cyan-500/20 bg-cyan-500/5 p-4 text-left transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <svg class="h-5 w-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-foreground">Kelime Tamamlama</h3>
                  <p class="text-xs text-muted-foreground mt-0.5">Kelimeyi tamamla</p>
                </div>
              </div>
            </button>
          </div>
          
          <!-- Yetersiz Kelime Uyarısı -->
          <div v-if="!hasEnoughWords" class="mt-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
            <div class="flex items-start gap-2">
              <svg class="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-xs text-amber-600 dark:text-amber-400">
                En az 5 kelime gereklidir ({{ filteredWordsForGame.length }} mevcut)
              </p>
            </div>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="space-y-3 rounded-lg border border-border bg-card p-3">

          <!-- Simple Filters -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select 
              v-model="gameConfig.smartFilter" 
              class="flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">Tüm Kelimeler</option>
              <option value="never-answered">Hiç Cevaplanmamış</option>
              <option value="most-mistakes">Çok Hata Yapılan</option>
              <option value="flagged">İşaretlenen</option>
              <option value="unlearned">Öğrenilmemiş</option>
              <option value="nouns">İsimler</option>
              <option value="verbs">Fiiller</option>
              <option value="adjectives">Sıfatlar</option>
            </select>

            <select 
              v-model="gameConfig.questionCount" 
              class="flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="5">5 Soru</option>
              <option value="10">10 Soru</option>
              <option value="15">15 Soru</option>
              <option value="20">20 Soru</option>
              <option value="25">25 Soru</option>
            </select>

            <button 
              @click="resetGameConfig" 
              class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sıfırla
            </button>
          </div>

          <!-- Filter Info -->
          <div v-if="gameConfig.smartFilter !== 'all'" class="rounded-md border border-border bg-muted/30 p-2.5">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <svg class="text-muted-foreground h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-xs text-muted-foreground truncate">
                  {{ filteredWordsForGame.length }} kelime
                </p>
              </div>
              <button
                @click="showFilteredWordsModal = true"
                class="inline-flex h-7 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-shrink-0"
                :disabled="filteredWordsForGame.length === 0"
              >
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Interface -->
      <transition name="game-transition" mode="out-in">
        <div v-if="showGameInterface" key="game" class="my-8">
          <!-- Oyun Kontrol Butonu -->
          <div class="mb-4 flex justify-end">
            <button 
              @click="stopGame" 
              class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Durdur
            </button>
          </div>

          <div v-if="loadingGame" class="flex h-60 items-center justify-center">
            <svg class="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <MultipleChoice
            v-else-if="currentGame === 'multiple-choice'"
            :gameType="currentGame"
            :packSlug="props.pack?.slug || getPackSlugFromUrl()"
            :words="filteredWords"
            :gameConfig="gameConfig"
            @game-completed="handleGameComplete"
          />
          <TranslateWord
            v-else-if="currentGame === 'fill-in-the-blank'"
            :gameType="currentGame"
            :packSlug="props.pack?.slug || getPackSlugFromUrl()"
            :words="filteredWords"
            :gameConfig="gameConfig"
            @game-completed="handleGameComplete"
          />
          <WordCompletion
            v-else-if="currentGame === 'word-completion'"
            :gameType="currentGame"
            :packSlug="props.pack?.slug || getPackSlugFromUrl()"
            :words="filteredWords"
            :gameConfig="gameConfig"
            @game-completed="handleGameComplete"
          />
        </div>

        <!-- Words Table (Oyun başlamadığında göster) -->
        <div v-else-if="!showGameInterface" key="wordList">
          <div class="rounded-lg border border-border">
            <div class="relative w-full overflow-auto">
              <table class="w-full caption-bottom text-sm">
                <thead class="[&_tr]:border-b">
                  <tr class="border-b border-border transition-colors hover:bg-muted/50">
                    <th
                      class="text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                    >
                      Kelime
                    </th>
                    <th
                      class="text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                    >
                      Anlam
                    </th>
                    <th
                      class="text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                    >
                      İşlem
                    </th>
                  </tr>
                </thead>
                <tbody class="[&_tr:last-child]:border-0">
                  <tr v-if="isLoading" class="border-b border-border transition-colors hover:bg-muted/50">
                    <td colspan="3" class="p-4 text-center">
                      <svg class="mx-auto h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </td>
                  </tr>
                  <tr
                    v-else-if="displayedWords.length === 0"
                    class="border-b border-border transition-colors hover:bg-muted/50"
                  >
                    <td colspan="3" class="text-muted-foreground p-4 text-center">Sonuç bulunamadı</td>
                  </tr>
                  <tr
                    v-for="word in displayedWords"
                    :key="word.id"
                    class="cursor-pointer border-b border-border transition-colors hover:bg-muted/50"
                    @click="showWordDetails(word)"
                  >
                    <td class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      <div class="font-medium text-foreground">{{ word.word }}</div>
                    </td>
                    <td class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      <div class="text-muted-foreground">{{ getPrimaryMeaning(word) }}</div>
                    </td>
                    <td class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      <div class="flex items-center gap-2">
                        <button class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <Link
                          v-if="isLoggedIn"
                          :href="route('rendition.words.edit', word.id)"
                          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                          @click.stop
                        >
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="filteredWordsForGame.length > perPage" class="mt-4 flex items-center justify-between">
            <div class="text-muted-foreground text-sm">
              {{ paginationInfo }}
            </div>
            <div class="flex items-center space-x-2">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                Önceki
              </button>
              <span class="text-sm font-medium text-foreground">{{ currentPage }}</span>
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
              >
                Sonraki
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="props.words?.length === 0" class="mt-8 text-center">
            <div class="text-muted-foreground/40 mx-auto h-12 w-12">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-foreground">Kelime bulunamadı</h3>
            <p class="text-muted-foreground mt-2">Bu pakette henüz kelime bulunmamaktadır.</p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Word Detail Modal -->
    <div v-if="selectedWord" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" @click="selectedWord = null">
      <div
        class="fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background shadow-lg duration-200 sm:rounded-lg"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="flex flex-shrink-0 flex-col space-y-1.5 border-b border-border p-6 pb-4 text-center sm:text-left"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-none tracking-tight text-foreground">{{ selectedWord.word }}</h3>
            <button @click="selectedWord = null" class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-muted-foreground text-sm">
            {{ getWordTypeLabel(selectedWord.type) }} • {{ getDifficultyLabel(selectedWord.difficulty_level) }}
          </p>
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto p-6 pt-4">
          <div class="space-y-4">
            <!-- Meanings -->
            <div>
              <h4 class="text-sm font-medium leading-none text-foreground">Anlamlar</h4>
              <div class="mt-2 space-y-2">
                <div
                  v-for="(meaning, index) in selectedWord.meanings"
                  :key="index"
                  class="flex items-start gap-3 rounded-lg border border-border p-3"
                  :class="meaning.is_primary ? 'bg-primary text-primary-foreground' : 'bg-muted'"
                >
                  <span
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
                    :class="meaning.is_primary ? 'bg-primary-foreground text-primary' : 'bg-muted-foreground/20 text-foreground'"
                  >
                    {{ index + 1 }}
                  </span>
                  <div class="min-w-0 flex-1">
                    <span class="text-sm" :class="meaning.is_primary ? 'text-primary-foreground' : 'text-foreground'">{{
                      meaning.meaning
                    }}</span>
                    <span
                      v-if="meaning.is_primary"
                      class="ml-2 inline-flex items-center rounded-full border border-border px-2 py-1 text-xs font-medium"
                      :class="meaning.is_primary ? 'bg-primary-foreground text-primary' : 'bg-transparent'"
                    >
                      Birincil
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg border border-border bg-muted p-3">
                <h4 class="text-sm font-medium leading-none text-foreground">Öğrenme Durumu</h4>
                <div class="text-muted-foreground mt-2 space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span>Durum:</span>
                    <span class="font-medium text-foreground">{{
                      getLearningStatusLabel(selectedWord.learning_status)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Toplam:</span>
                    <span class="font-medium text-foreground">{{ selectedWord.review_count || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Yanlış:</span>
                    <span class="font-medium text-foreground">{{ selectedWord.incorrect_count || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Başarı:</span>
                    <span class="font-medium text-foreground">{{ calculateSuccessRate(selectedWord).label }}</span>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-border bg-muted p-3">
                <h4 class="text-sm font-medium leading-none text-foreground">Diğer Bilgiler</h4>
                <div class="text-muted-foreground mt-2 space-y-1 text-sm">
                  <div v-if="selectedWord.synonyms && selectedWord.synonyms.length > 0">
                    <span class="font-medium text-foreground">Eş Anlamlılar:</span>
                    <div class="mt-1 flex flex-wrap gap-1">
                      <span
                        v-for="synonym in selectedWord.synonyms"
                        :key="synonym"
                        class="inline-flex items-center rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground"
                      >
                        {{ typeof synonym === 'object' ? synonym.synonym : synonym }}
                      </span>
                    </div>
                  </div>
                  <div v-if="selectedWord.flag" class="flex items-center gap-1">
                    <svg class="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span class="font-medium text-foreground">Öne çıkarılmış</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Example Sentences -->
            <div v-if="selectedWord.example_sentences && selectedWord.example_sentences.length > 0">
              <h4 class="text-sm font-medium leading-none text-foreground">Örnek Cümleler</h4>
              <div class="mt-2 space-y-2">
                <div
                  v-for="(sentence, index) in selectedWord.example_sentences"
                  :key="index"
                  class="rounded-lg border border-border bg-muted p-3"
                >
                  <div class="flex items-start gap-3">
                    <span
                      class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                    >
                      {{ index + 1 }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-foreground">{{ getSentenceText(sentence) }}</p>
                      <p v-if="getSentenceTranslation(sentence)" class="text-muted-foreground mt-1 text-xs">
                        {{ getSentenceTranslation(sentence) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex flex-shrink-0 flex-col-reverse border-t border-border p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2"
        >
          <button @click="selectedWord = null" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">Kapat</button>
          <Link
            v-if="isLoggedIn"
            :href="route('rendition.words.edit', selectedWord.id)"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            @click="selectedWord = null"
          >
            Düzenle
          </Link>
        </div>
      </div>
    </div>

    <!-- Filtered Words Modal -->
    <div
      v-if="showFilteredWordsModal"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      @click="showFilteredWordsModal = false"
    >
      <div
        class="fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background shadow-lg duration-200 sm:rounded-lg"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="flex flex-shrink-0 flex-col space-y-1.5 border-b border-border p-6 pb-4 text-center sm:text-left"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold leading-none tracking-tight text-foreground">
                {{ getFilterDescription(gameConfig.smartFilter).title }}
              </h3>
              <p class="text-muted-foreground mt-1 text-sm">{{ filteredWordsForGame.length }} kelime bulundu</p>
            </div>
            <button @click="showFilteredWordsModal = false" class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-muted-foreground text-sm">
            {{ getFilterDescription(gameConfig.smartFilter).description }}
          </p>
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto p-6 pt-4">
          <div class="space-y-4">
            <!-- Filter Criteria -->
            <div class="rounded-lg border border-border bg-muted p-3">
              <h4 class="mb-2 text-sm font-medium leading-none text-foreground">Filtre Kriterleri</h4>
              <p class="text-muted-foreground text-sm">{{ getFilterDescription(gameConfig.smartFilter).criteria }}</p>
            </div>

            <!-- Words List -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium leading-none text-foreground">Filtrelenmiş Kelimeler</h4>
              <div class="max-h-96 overflow-y-auto">
                <div class="space-y-2">
                  <div
                    v-for="(word, index) in filteredWordsForGame"
                    :key="word.id"
                    class="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-muted p-3 transition-colors hover:bg-muted/80"
                    @click="showWordDetails(word)"
                  >
                    <div class="flex items-center gap-3">
                      <span
                        class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                      >
                        {{ index + 1 }}
                      </span>
                      <div>
                        <div class="font-medium text-foreground">{{ word.word }}</div>
                        <div class="text-muted-foreground text-sm">{{ getPrimaryMeaning(word) }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {{ getWordTypeLabel(word.type) }}
                      </span>
                      <span class="inline-flex items-center rounded-full border border-border bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        {{ getDifficultyLabel(word.difficulty_level) }}
                      </span>
                      <span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {{ getLearningStatusLabel(word.learning_status) }}
                      </span>
                      <button class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg border border-border bg-muted p-3">
                <h4 class="text-sm font-medium leading-none text-foreground">Tür Dağılımı</h4>
                <div class="text-muted-foreground mt-2 space-y-1 text-sm">
                  <div
                    v-for="(count, type) in getWordTypeStats(filteredWordsForGame)"
                    :key="type"
                    class="flex justify-between"
                  >
                    <span>{{ getWordTypeLabel(type) }}:</span>
                    <span class="font-medium text-foreground">{{ count }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-border bg-muted p-3">
                <h4 class="text-sm font-medium leading-none text-foreground">Zorluk Dağılımı</h4>
                <div class="text-muted-foreground mt-2 space-y-1 text-sm">
                  <div
                    v-for="(count, level) in getDifficultyStats(filteredWordsForGame)"
                    :key="level"
                    class="flex justify-between"
                  >
                    <span>{{ getDifficultyLabel(level) }}:</span>
                    <span class="font-medium text-foreground">{{ count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex flex-shrink-0 flex-col-reverse border-t border-border p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2"
        >
          <button @click="showFilteredWordsModal = false" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">Kapat</button>
          <button
            @click="exportFilteredWords"
            class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Dışa Aktar
          </button>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import MultipleChoice from '@/Pages/Rendition/_components/MultipleChoice.vue';
import TranslateWord from '@/Pages/Rendition/_components/TranslateWord.vue';
import WordCompletion from '@/Pages/Rendition/_components/WordCompletion.vue';

const props = defineProps({
  words: Array,
  pack: Object,
  error: String,
  screen: Object,
});

const isLoading = ref(false);
const isLoggedIn = computed(() => !!usePage().props.auth?.user);
const showGameInterface = ref(false);
const currentGame = ref('');
const loadingGame = ref(false);
const prioritizeUnlearned = ref(true);

// Filtreleme ve arama
const searchQuery = ref('');
const filterType = ref('');
const filterStatus = ref('');

// Pagination için state
const currentPage = ref(1);
const perPage = ref(10);

// URL'den paket slug'ını almak için yardımcı fonksiyon
const getPackSlugFromUrl = () => {
  const path = window.location.pathname;
  const segments = path.split('/');
  return segments[segments.length - 1];
};

// Oyun seçenekleri
const games = [
  { name: 'Çoktan Seçmeli', route: 'multiple-choice' },
  { name: 'Boşluk Doldurma', route: 'fill-in-the-blank' },
  { name: 'Kelime Tamamlama', route: 'word-completion' },
];

// Oyun ayarları
const gameConfig = ref({
  questionCount: 10,
  prioritizeUnlearned: false,
  prioritizeRecentlyLearned: false,
  prioritizeFlagged: false,
  prioritizeMostIncorrect: false,
  prioritizeOldestUpdated: false,
  smartFilter: 'all', // Yeni akıllı filtre
  successRateThreshold: 50, // Başarı oranı eşiği
});

// Kelime listesi görünürlüğü
const showWordList = ref(false);
const showFilters = ref(false);

// Kelime sayılarını hesapla
const wordCounts = computed(() => {
  if (!props.words) return { types: {}, status: {}, difficulty: {} };

  const counts = {
    types: {},
    status: {},
    difficulty: {},
    neverAnswered: 0,
    mostMistakes: 0,
    leastKnown: 0,
    flagged: 0,
    recentlyLearned: 0,
  };

  props.words.forEach((word) => {
    // Tür sayıları
    counts.types[word.type] = (counts.types[word.type] || 0) + 1;

    // Durum sayıları
    counts.status[word.learning_status] = (counts.status[word.learning_status] || 0) + 1;

    // Zorluk sayıları
    counts.difficulty[word.difficulty_level] = (counts.difficulty[word.difficulty_level] || 0) + 1;

    // Hiç cevaplanmamış
    if (!word.review_count || word.review_count === 0) {
      counts.neverAnswered++;
    }

    // Çok hata yapılanlar (3+ yanlış)
    if (word.incorrect_count && word.incorrect_count >= 3) {
      counts.mostMistakes++;
    }

    // Az bilinenler (başarı oranı %50'den düşük)
    if (word.review_count && word.review_count > 0) {
      const successRate = ((word.review_count - (word.incorrect_count || 0)) / word.review_count) * 100;
      if (successRate < 50) {
        counts.leastKnown++;
      }
    }

    // İşaretlenenler
    if (word.is_flagged) {
      counts.flagged++;
    }

    // Son öğrenilenler (son 7 gün)
    if (word.last_reviewed_at) {
      const lastReview = new Date(word.last_reviewed_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (lastReview > weekAgo) {
        counts.recentlyLearned++;
      }
    }
  });

  return counts;
});

// Kelimeleri filtrele
const filteredWordList = computed(() => {
  if (!props.words) return [];

  let result = [...props.words];

  // Arama filtresi
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter((word) => {
      // Kelime adında ara
      if (word.word.toLowerCase().includes(query)) return true;

      // Anlamlarda ara
      if (word.meanings && word.meanings.length > 0) {
        return word.meanings.some((meaning) => meaning.meaning.toLowerCase().includes(query));
      }

      // Eski yapı için fallback
      if (word.meaning && word.meaning.toLowerCase().includes(query)) return true;

      return false;
    });
  }

  // Tür filtresi
  if (filterType.value) {
    result = result.filter((word) => word.type === filterType.value);
  }

  // Durum filtresi
  if (filterStatus.value !== '') {
    const status = parseInt(filterStatus.value);
    result = result.filter((word) => word.learning_status === status);
  }

  return result;
});

// Pagination'a göre kelime listesi
const displayedWords = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  return filteredWordList.value.slice(startIndex, startIndex + perPage.value);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(filteredWordList.value.length / perPage.value);
});

// Pagination bilgisi
const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(start + perPage.value - 1, filteredWordList.value.length);
  return `${start}-${end} / ${filteredWordList.value.length}`;
});

// Sayfa değiştirme
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// Filtreleme işlemi
const filterWords = () => {
  isLoading.value = true;
  currentPage.value = 1;

  // Yapay yükleme süresi (arama sonuçlarının görünmesi için)
  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};

// Filtered words for game (oyun için rastgele karıştırılmış)
const filteredWords = computed(() => {
  // Eğer filteredWordsForGame boşsa, props.words'u kullan
  let wordsToUse = filteredWordsForGame.value.length > 0 ? [...filteredWordsForGame.value] : [...(props.words || [])];

  // Son olarak rastgele karıştır
  wordsToUse = wordsToUse.sort(() => Math.random() - 0.5);

  // Seçilen soru sayısı kadar kelime döndür
  return wordsToUse.slice(0, parseInt(gameConfig.value.questionCount));
});

// Filtrelenmiş kelimeler önizlemesi için (rastgele karıştırma olmadan)
const filteredWordsForGame = computed(() => {
  if (!props.words) return [];
  let wordsToUse = [...props.words];

  // Akıllı filtre uygula
  switch (gameConfig.value.smartFilter) {
    case 'never-answered':
      wordsToUse = wordsToUse.filter((word) => !word.review_count || word.review_count === 0);
      break;
    case 'most-mistakes':
      wordsToUse = wordsToUse.filter((word) => word.incorrect_count && word.incorrect_count >= 3);
      // En çok hata yapılanlar en üstte
      wordsToUse.sort((a, b) => (b.incorrect_count || 0) - (a.incorrect_count || 0));
      break;
    case 'success-rate':
      wordsToUse = wordsToUse.filter((word) => {
        if (!word.review_count || word.review_count === 0) return false;
        const successRate = ((word.review_count - (word.incorrect_count || 0)) / word.review_count) * 100;
        return successRate < gameConfig.value.successRateThreshold;
      });
      // En düşük başarı oranı en üstte
      wordsToUse.sort((a, b) => {
        const aRate = ((a.review_count - (a.incorrect_count || 0)) / a.review_count) * 100;
        const bRate = ((b.review_count - (b.incorrect_count || 0)) / b.review_count) * 100;
        return aRate - bRate;
      });
      break;
    case 'flagged':
      wordsToUse = wordsToUse.filter((word) => word.is_flagged);
      break;
    case 'recently-learned':
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      wordsToUse = wordsToUse.filter((word) => {
        if (!word.last_reviewed_at) return false;
        return new Date(word.last_reviewed_at) > weekAgo;
      });
      // En son öğrenilenler en üstte
      wordsToUse.sort((a, b) => new Date(b.last_reviewed_at) - new Date(a.last_reviewed_at));
      break;
    case 'nouns':
      wordsToUse = wordsToUse.filter((word) => word.type === 'noun');
      break;
    case 'verbs':
      wordsToUse = wordsToUse.filter((word) => word.type === 'verb');
      break;
    case 'adjectives':
      wordsToUse = wordsToUse.filter((word) => word.type === 'adjective');
      break;
    case 'difficult':
      wordsToUse = wordsToUse.filter((word) => word.difficulty_level >= 3);
      // En zor olanlar en üstte
      wordsToUse.sort((a, b) => b.difficulty_level - a.difficulty_level);
      break;
    case 'easy':
      wordsToUse = wordsToUse.filter((word) => word.difficulty_level <= 2);
      // En kolay olanlar en üstte
      wordsToUse.sort((a, b) => a.difficulty_level - b.difficulty_level);
      break;
    case 'unlearned':
      wordsToUse = wordsToUse.filter((word) => word.learning_status === 0);
      break;
    case 'all':
    default:
      // Tüm kelimeler, öncelik filtrelerine göre sırala
      if (gameConfig.value.prioritizeRecentlyLearned) {
        wordsToUse.sort((a, b) => {
          const aDate = new Date(a.last_reviewed_at || 0);
          const bDate = new Date(b.last_reviewed_at || 0);
          return bDate - aDate;
        });
      }

      if (gameConfig.value.prioritizeFlagged) {
        wordsToUse.sort((a, b) => {
          if (a.is_flagged && !b.is_flagged) return -1;
          if (!a.is_flagged && b.is_flagged) return 1;
          return 0;
        });
      }

      if (gameConfig.value.prioritizeMostIncorrect) {
        wordsToUse.sort((a, b) => {
          const aIncorrect = a.incorrect_count || 0;
          const bIncorrect = b.incorrect_count || 0;
          return bIncorrect - aIncorrect;
        });
      }

      if (gameConfig.value.prioritizeOldestUpdated) {
        wordsToUse.sort((a, b) => {
          const aDate = new Date(a.updated_at || 0);
          const bDate = new Date(b.updated_at || 0);
          return aDate - bDate;
        });
      }
      break;
  }

  return wordsToUse;
});

// Akıllı filtre etiketini al
const getSmartFilterLabel = (filter) => {
  switch (filter) {
    case 'never-answered':
      return 'Hiç Cevaplanmamışlar';
    case 'most-mistakes':
      return 'Çok Hata Yapılanlar';
    case 'success-rate':
      return `Başarı Oranı %${gameConfig.value.successRateThreshold} Altında`;
    case 'flagged':
      return 'İşaretlenenler';
    case 'recently-learned':
      return 'Son Öğrenilenler';
    case 'nouns':
      return 'İsimler';
    case 'verbs':
      return 'Fiiller';
    case 'adjectives':
      return 'Sıfatlar';
    case 'difficult':
      return 'Zor Kelimeler';
    case 'easy':
      return 'Kolay Kelimeler';
    case 'unlearned':
      return 'Öğrenilmemiş';
    case 'all':
    default:
      return 'Tüm Kelimeler';
  }
};

// Filtre açıklamalarını al
const getFilterDescription = (filter) => {
  switch (filter) {
    case 'never-answered':
      return {
        title: '🆕 Hiç Cevaplanmamış Kelimeler',
        description: 'Daha önce hiç sorulmamış, henüz test edilmemiş kelimeler. Yeni başlayanlar için ideal.',
        criteria: 'review_count = 0 olan kelimeler',
      };
    case 'most-mistakes':
      return {
        title: '❌ Çok Hata Yapılan Kelimeler',
        description: 'En çok yanlış cevaplanan kelimeler. Bu kelimeler üzerinde daha fazla çalışmanız gerekiyor.',
        criteria: 'incorrect_count >= 3 olan kelimeler',
      };
    case 'success-rate':
      return {
        title: `📊 Başarı Oranı %${gameConfig.value.successRateThreshold} Altındaki Kelimeler`,
        description: 'Başarı oranı belirlenen eşiğin altında olan kelimeler. Bu kelimeleri tekrar etmeniz önerilir.',
        criteria: `(doğru cevap / toplam sorulma) * 100 < ${gameConfig.value.successRateThreshold}%`,
      };
    case 'flagged':
      return {
        title: '⭐ İşaretlenen Kelimeler',
        description: 'Öne çıkarılan, önemli olduğu düşünülen kelimeler. Özel olarak işaretlenmiş kelimeler.',
        criteria: 'is_flagged = true olan kelimeler',
      };
    case 'recently-learned':
      return {
        title: '🕒 Son Öğrenilen Kelimeler',
        description: 'Yakın zamanda (son 7 gün içinde) öğrenilen kelimeler. Tekrar için ideal zaman.',
        criteria: 'last_reviewed_at son 7 gün içinde olan kelimeler',
      };
    case 'nouns':
      return {
        title: '📝 İsim Türündeki Kelimeler',
        description: 'Sadece isim türündeki kelimeler. İsim odaklı çalışma için.',
        criteria: 'type = "noun" olan kelimeler',
      };
    case 'verbs':
      return {
        title: '🏃 Fiil Türündeki Kelimeler',
        description: 'Sadece fiil türündeki kelimeler. Fiil odaklı çalışma için.',
        criteria: 'type = "verb" olan kelimeler',
      };
    case 'adjectives':
      return {
        title: '🎨 Sıfat Türündeki Kelimeler',
        description: 'Sadece sıfat türündeki kelimeler. Sıfat odaklı çalışma için.',
        criteria: 'type = "adjective" olan kelimeler',
      };
    case 'difficult':
      return {
        title: '🔥 Zor Seviyedeki Kelimeler',
        description: 'Zor ve çok zor seviyedeki kelimeler. İleri seviye çalışma için.',
        criteria: 'difficulty_level >= 3 olan kelimeler',
      };
    case 'easy':
      return {
        title: '😊 Kolay Seviyedeki Kelimeler',
        description: 'Kolay ve orta seviyedeki kelimeler. Temel çalışma için.',
        criteria: 'difficulty_level <= 2 olan kelimeler',
      };
    case 'unlearned':
      return {
        title: '📖 Öğrenilmemiş Kelimeler',
        description: 'Henüz öğrenilmemiş kelimeler. Yeni kelimeler öğrenmek için.',
        criteria: 'learning_status = 0 olan kelimeler',
      };
    default:
      return {
        title: '📚 Tüm Kelimeler',
        description: 'Filtre olmadan tüm kelimeler. Genel çalışma için.',
        criteria: 'Tüm kelimeler gösteriliyor',
      };
  }
};

// Filtrelenmiş kelimeleri dışa aktar
const exportFilteredWords = () => {
  if (filteredWordsForGame.value.length === 0) return;

  const csvContent = [
    ['Kelime', 'Anlam', 'Tür', 'Zorluk', 'Durum', 'Başarı Oranı', 'Toplam Sorulma', 'Yanlış Sayısı'],
    ...filteredWordsForGame.value.map((word) => [
      word.word,
      getPrimaryMeaning(word),
      getWordTypeLabel(word.type),
      getDifficultyLabel(word.difficulty_level),
      getLearningStatusLabel(word.learning_status),
      word.review_count > 0 ? calculateSuccessRate(word).label : '-',
      word.review_count || 0,
      word.incorrect_count || 0,
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `filtrelenmis_kelimeler_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Kelime detay modalı için
const selectedWord = ref(null);
const showWordDetails = (word) => {
  selectedWord.value = word;
};

// Filtrelenmiş kelimeler modalı için
const showFilteredWordsModal = ref(false);

// Yeterli kelime var mı kontrol et
const hasEnoughWords = computed(() => {
  return filteredWordsForGame.value.length >= 5;
});

// Oyunu başlat
const startGame = (gameType) => {
  // Filtrelenmiş kelime sayısını kontrol et
  if (filteredWordsForGame.value.length < 5) {
    alert('Seçili filtrelerle yeterli kelime bulunmamaktadır. En az 5 kelime gereklidir.');
    return;
  }

  loadingGame.value = true;
  currentGame.value = gameType;
  showGameInterface.value = true;

  // Artificial delay to ensure component transitions properly
  setTimeout(() => {
    loadingGame.value = false;
  }, 500);
};

// Oyun tamamlandığında
const handleGameComplete = () => {
  showGameInterface.value = false;
  currentGame.value = '';
};

// Oyunu durdur
const stopGame = () => {
  showGameInterface.value = false;
  currentGame.value = '';
  loadingGame.value = false;
};

// Helper for parsing URL query parameters
const queryParams = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return {
    game: params.get('game') || null,
  };
});

// Metin kısaltma
const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Zorluk seviyesi için stil ve etiket
const getDifficultyBadgeClass = (level) => {
  switch (Number(level)) {
    case 1:
      return 'badge-success';
    case 2:
      return 'badge-info';
    case 3:
      return 'badge-warning';
    case 4:
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};

const getDifficultyLabel = (level) => {
  switch (Number(level)) {
    case 1:
      return 'Kolay';
    case 2:
      return 'Orta';
    case 3:
      return 'Zor';
    case 4:
      return 'Çok Zor';
    default:
      return 'Belirsiz';
  }
};

// Öğrenme durumu için stil ve etiket
const getLearningStatusBadgeClass = (status) => {
  switch (Number(status)) {
    case 0:
      return 'badge-ghost';
    case 1:
      return 'badge-warning';
    case 2:
      return 'badge-success';
    default:
      return 'badge-ghost';
  }
};

const getLearningStatusLabel = (status) => {
  switch (Number(status)) {
    case 0:
      return 'Öğrenilmedi';
    case 1:
      return 'Öğreniliyor';
    case 2:
      return 'Öğrenildi';
    default:
      return 'Belirsiz';
  }
};

// Başarı yüzdesini hesapla
const calculateSuccessRate = (word) => {
  const totalShows = word.review_count || 0;
  const incorrectCount = word.incorrect_count || 0;

  if (totalShows === 0) return { rate: 0, label: 'Hiç' };

  const successRate = ((totalShows - incorrectCount) / totalShows) * 100;
  return {
    rate: Math.round(successRate),
    label: `%${Math.round(successRate)}`,
  };
};

// Başarı yüzdesine göre renk sınıfını belirle
const getSuccessRateBadgeClass = (rate) => {
  if (rate === 0) return 'badge-ghost';
  if (rate >= 80) return 'badge-success';
  if (rate >= 60) return 'badge-info';
  if (rate >= 40) return 'badge-warning';
  return 'badge-error';
};

// Filtrelerdeki değişiklikleri izle
watch([searchQuery, filterType, filterStatus], () => {
  // Arama sorgusu değiştiğinde sayfayı sıfırla
  currentPage.value = 1;

  // Arama sorgusu 2 karakterden fazla veya boş olduğunda filtrele
  if (searchQuery.value.length > 2 || searchQuery.value.length === 0) {
    filterWords();
  }
});

// Sayfa yüklendiğinde, URL'deki oyun parametresini kontrol et
onMounted(() => {
  const gameParam = queryParams.value.game;
  if (gameParam) {
    startGame(gameParam);
  }
});

// Helper function to get the primary meaning from the word's meanings array
const getPrimaryMeaning = (word) => {
  if (word.meanings && word.meanings.length > 0) {
    // Find the primary meaning
    const primaryMeaning = word.meanings.find((m) => m.is_primary);
    // If a primary meaning exists, return it, otherwise return the first meaning
    if (primaryMeaning) {
      return truncateText(primaryMeaning.meaning, 50);
    }
    return truncateText(word.meanings[0].meaning, 50);
  }
  // Fallback to the old way (for backward compatibility)
  return word.meaning ? truncateText(word.meaning, 50) : '';
};

// Sıralama durumu
const sortState = ref({
  type: 'none', // 'none', 'asc', 'desc'
  success: 'none',
});

// Sıralama fonksiyonu
const sortTable = (column) => {
  if (sortState.value[column] === 'none') {
    sortState.value[column] = 'asc';
  } else if (sortState.value[column] === 'asc') {
    sortState.value[column] = 'desc';
  } else {
    sortState.value[column] = 'none';
  }

  // Diğer sütunun sıralamasını sıfırla
  const otherColumn = column === 'type' ? 'success' : 'type';
  sortState.value[otherColumn] = 'none';
};

// Sıralanmış kelimeler
const sortedWords = computed(() => {
  let result = [...filteredWordList.value];

  if (sortState.value.type !== 'none') {
    result.sort((a, b) => {
      const comparison = a.type.localeCompare(b.type);
      return sortState.value.type === 'asc' ? comparison : -comparison;
    });
  }

  if (sortState.value.success !== 'none') {
    result.sort((a, b) => {
      const aRate = calculateSuccessRate(a).rate;
      const bRate = calculateSuccessRate(b).rate;
      return sortState.value.success === 'asc' ? aRate - bRate : bRate - aRate;
    });
  }

  return result;
});

// Kelime türlerini Türkçe'ye çevir
const getWordTypeLabel = (type) => {
  switch (type) {
    case 'noun':
      return 'İsim';
    case 'verb':
      return 'Fiil';
    case 'adjective':
      return 'Sıfat';
    case 'adverb':
      return 'Zarf';
    default:
      return type;
  }
};

// Ayarları sıfırla
const resetGameConfig = () => {
  gameConfig.value = {
    questionCount: 10,
    prioritizeUnlearned: false,
    prioritizeRecentlyLearned: false,
    prioritizeFlagged: false,
    prioritizeMostIncorrect: false,
    prioritizeOldestUpdated: false,
    smartFilter: 'all',
    successRateThreshold: 50,
  };
};

// Helper function to get the sentence text
const getSentenceText = (sentence) => {
  if (typeof sentence === 'string') return sentence;
  if (sentence && sentence.sentence) return sentence.sentence;
  if (sentence && sentence.translation) return sentence.translation;
  return '';
};

// Helper function to get the sentence translation
const getSentenceTranslation = (sentence) => {
  if (typeof sentence === 'string') return '';
  if (sentence && sentence.translation) return sentence.translation;
  return '';
};

// Kelime türü istatistikleri
const getWordTypeStats = (words) => {
  const stats = {};
  words.forEach((word) => {
    stats[word.type] = (stats[word.type] || 0) + 1;
  });
  return stats;
};

// Zorluk seviyesi istatistikleri
const getDifficultyStats = (words) => {
  const stats = {};
  words.forEach((word) => {
    stats[word.difficulty_level] = (stats[word.difficulty_level] || 0) + 1;
  });
  return stats;
};
</script>

<style scoped>
.badge-outline {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  vertical-align: middle;
}

.game-transition-enter-active,
.game-transition-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.game-transition-enter-from,
.game-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.game-transition-enter-to,
.game-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
