<template>
  <CheckScreen>
    <div class="px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex-1">
          <h1 class="p-5 text-2xl font-bold">
            {{ props.pack?.name || 'Kelimeler' }}
            <span class="badge badge-outline ml-2">{{ props.words?.length || 0 }} kelime</span>
          </h1>
        </div>
        <div class="flex gap-2">
          <Link
            v-if="isLoggedIn && props.pack"
            :href="route('rendition.language-packs.edit', props.pack.id)"
            class="btn btn-outline btn-sm"
          >
            Paketi Düzenle
          </Link>
          <Link v-if="isLoggedIn" :href="route('rendition.words.create')" class="btn btn-primary btn-sm">
            Yeni Kelime
          </Link>
        </div>
      </div>

      <!-- Filtreler -->
      <div v-if="!showGameInterface" class="mb-4 flex flex-wrap gap-3">
        <!-- Arama Kutusu -->
        <div class="form-control min-w-[200px] flex-1">
          <div class="input-group">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Kelime ara..."
              class="input-bordered input input-sm w-52"
              @keyup.enter="filterWords"
            />
            <button class="btn btn-sm btn-square mx-5" @click="filterWords">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tür Filtresi
        <select
          v-model="filterType"
          class="select-bordered select select-sm min-w-[150px] flex-1"
          @change="filterWords"
        >
          <option value="">Tüm Türler</option>
          <option value="noun">İsim</option>
          <option value="verb">Fiil</option>
          <option value="adjective">Sıfat</option>
          <option value="adverb">Zarf</option>
        </select> -->

        <!-- Durum Filtresi 
        <select
          v-model="filterStatus"
          class="select-bordered select select-sm min-w-[150px] flex-1"
          @change="filterWords"
        >
          <option value="">Tüm Durumlar</option>
          <option value="0">Öğrenilmedi</option>
          <option value="1">Öğreniliyor</option>
          <option value="2">Öğrenildi</option>
        </select>-->
      </div>

      <!-- Oyun Komponentleri -->
      <transition name="game-transition" mode="out-in">
        <div v-if="showGameInterface" key="game" class="my-20">
          <div v-if="loadingGame" class="flex h-60 items-center justify-center">
            <span class="loading loading-spinner loading-lg"></span>
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

        <!-- Kelimeler Görünümü -->
        <div v-else key="wordList">
          <!-- Oyun Ayarları -->
          <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <!-- Oyun Butonları -->
            <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                @click="startGame('multiple-choice')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Çoktan Seçmeli</h3>
                  <p class="text-sm text-gray-500">Doğru cevabı seçin</p>
                </div>
              </button>

              <button
                @click="startGame('fill-in-the-blank')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 transition-all group-hover:bg-green-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
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
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Boşluk Doldurma</h3>
                  <p class="text-sm text-gray-500">Eksik kelimeyi yazın</p>
                </div>
              </button>

              <button
                @click="startGame('word-completion')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-all group-hover:bg-purple-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Kelime Tamamlama</h3>
                  <p class="text-sm text-gray-500">Eksik harfleri tamamlayın</p>
                </div>
              </button>
            </div>

            <!-- Kelime Filtreleri -->
            <div class="mt-6">
              <!-- Filtre Toggle Butonu -->
              <div class="flex items-center justify-between mb-4">
                <button 
                  @click="showFilters = !showFilters" 
                  class="btn btn-outline btn-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  {{ showFilters ? 'Filtreleri Gizle' : 'Filtreleri Göster' }}
                </button>
                <button @click="resetGameConfig" class="btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Sıfırla
                </button>
              </div>

              <!-- Filtre İçeriği -->
              <div v-if="showFilters" class="space-y-4">
                <!-- Akıllı Filtreler -->
                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold text-base-content mb-3">🧠 Akıllı Filtreler</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'never-answered', 'btn-outline': gameConfig.smartFilter !== 'never-answered' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="never-answered" class="hidden" />
                      🆕 Hiç Cevaplanmamış ({{ wordCounts.neverAnswered || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'most-mistakes', 'btn-outline': gameConfig.smartFilter !== 'most-mistakes' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="most-mistakes" class="hidden" />
                      ❌ Çok Hata ({{ wordCounts.mostMistakes || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'flagged', 'btn-outline': gameConfig.smartFilter !== 'flagged' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="flagged" class="hidden" />
                      ⭐ İşaretlenen ({{ wordCounts.flagged || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'recently-learned', 'btn-outline': gameConfig.smartFilter !== 'recently-learned' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="recently-learned" class="hidden" />
                      🕒 Son Öğrenilen ({{ wordCounts.recentlyLearned || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'unlearned', 'btn-outline': gameConfig.smartFilter !== 'unlearned' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="unlearned" class="hidden" />
                      📖 Öğrenilmemiş ({{ wordCounts.status?.[0] || 0 }})
                    </label>
                  </div>
                </div>

                <!-- Başarı Oranı Filtresi -->
                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold text-base-content mb-3">📊 Başarı Oranı Filtresi</h4>
                  <div class="space-y-3">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <label class="btn btn-sm whitespace-nowrap" :class="{ 'btn-primary': gameConfig.smartFilter === 'success-rate', 'btn-outline': gameConfig.smartFilter !== 'success-rate' }">
                        <input type="radio" v-model="gameConfig.smartFilter" value="success-rate" class="hidden" />
                        Başarı Oranı Altında
                      </label>
                      <div class="flex-1 w-full sm:w-auto">
                        <input 
                          type="range" 
                          v-model="gameConfig.successRateThreshold" 
                          min="0" 
                          max="100" 
                          step="5"
                          class="range range-primary range-sm w-full"
                          :disabled="gameConfig.smartFilter !== 'success-rate'"
                        />
                      </div>
                      <span class="text-sm font-medium min-w-[3rem] text-center">%{{ gameConfig.successRateThreshold }}</span>
                    </div>
                    <div class="text-xs text-base-content/70">
                      Başarı oranı %{{ gameConfig.successRateThreshold }}'in altında olan kelimeler gösterilecek
                    </div>
                  </div>
                </div>

                <!-- Kelime Türü Filtreleri -->
                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold text-base-content mb-3">📝 Kelime Türü</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'nouns', 'btn-outline': gameConfig.smartFilter !== 'nouns' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="nouns" class="hidden" />
                      📝 İsimler ({{ wordCounts.types?.noun || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'verbs', 'btn-outline': gameConfig.smartFilter !== 'verbs' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="verbs" class="hidden" />
                      🏃 Fiiller ({{ wordCounts.types?.verb || 0 }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'adjectives', 'btn-outline': gameConfig.smartFilter !== 'adjectives' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="adjectives" class="hidden" />
                      🎨 Sıfatlar ({{ wordCounts.types?.adjective || 0 }})
                    </label>
                  </div>
                </div>

                <!-- Zorluk Seviyesi Filtreleri -->
                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold text-base-content mb-3">🎯 Zorluk Seviyesi</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'easy', 'btn-outline': gameConfig.smartFilter !== 'easy' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="easy" class="hidden" />
                      😊 Kolay ({{ (wordCounts.difficulty?.[1] || 0) + (wordCounts.difficulty?.[2] || 0) }})
                    </label>
                    <label class="btn btn-sm" :class="{ 'btn-primary': gameConfig.smartFilter === 'difficult', 'btn-outline': gameConfig.smartFilter !== 'difficult' }">
                      <input type="radio" v-model="gameConfig.smartFilter" value="difficult" class="hidden" />
                      🔥 Zor ({{ (wordCounts.difficulty?.[3] || 0) + (wordCounts.difficulty?.[4] || 0) }})
                    </label>
                  </div>
                </div>

                <!-- Tüm Kelimeler -->
                <div class="bg-base-200 p-4 rounded-lg">
                  <label class="btn btn-sm w-full" :class="{ 'btn-primary': gameConfig.smartFilter === 'all', 'btn-outline': gameConfig.smartFilter !== 'all' }">
                    <input type="radio" v-model="gameConfig.smartFilter" value="all" class="hidden" />
                    📚 Tüm Kelimeler ({{ props.words?.length || 0 }})
                  </label>
                </div>
              </div>

              <!-- Seçili Filtre Bilgilendirmesi -->
              <div v-if="gameConfig.smartFilter !== 'all'" class="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg">
                <div class="flex items-start gap-3">
                  <div class="text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h5 class="font-semibold text-base-content mb-1">{{ getFilterDescription(gameConfig.smartFilter).title }}</h5>
                    <p class="text-sm text-base-content/70">{{ getFilterDescription(gameConfig.smartFilter).description }}</p>
                    <div class="mt-2 text-xs text-base-content/60">
                      <strong>Filtreleme Kriteri:</strong> {{ getFilterDescription(gameConfig.smartFilter).criteria }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Oyun Ayarları -->
              <div class="mt-6 p-4 bg-base-200 rounded-lg">
                <h4 class="font-semibold text-base-content mb-3">🎮 Oyun Ayarları</h4>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div class="form-control w-full sm:w-auto">
                    <label class="label">
                      <span class="label-text font-medium">Soru Sayısı</span>
                    </label>
                    <select v-model="gameConfig.questionCount" class="select select-bordered select-sm w-full sm:w-auto">
                      <option v-if="filteredWordsForGame.length < 60" :value="filteredWordsForGame.length">
                        Tümü ({{ filteredWordsForGame.length }})
                      </option>
                      <option value="5">5 Soru</option>
                      <option value="10">10 Soru</option>
                      <option value="15">15 Soru</option>
                      <option value="20">20 Soru</option>
                      <option value="25">25 Soru</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>


          </div>

          <!-- Kelime Tablosu -->
          <div class="mt-6">
            <!-- Tablo Başlığı -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-bold text-base-content">📋 Kelime Listesi</h3>
                <div class="badge badge-primary badge-lg">
                  {{ filteredWordsForGame.length }} kelime
                </div>
                <div v-if="gameConfig.smartFilter !== 'all'" class="badge badge-secondary badge-sm">
                  {{ getSmartFilterLabel(gameConfig.smartFilter) }} filtresi aktif
                </div>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="exportFilteredWords"
                  class="btn btn-success btn-sm"
                  :disabled="filteredWordsForGame.length === 0"
                >
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Dışa Aktar
                </button>
              </div>
            </div>

            <!-- Durum Mesajları -->
            <div v-if="filteredWordsForGame.length === 0" class="alert alert-warning mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Seçili filtrelerle eşleşen kelime bulunamadı. Lütfen filtreleri değiştirin.</span>
            </div>
            
            <div v-else-if="filteredWordsForGame.length < 5" class="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Seçili filtrelerle sadece {{ filteredWordsForGame.length }} kelime bulundu. Oyun için en az 5 kelime önerilir.</span>
            </div>
            
            <div v-else class="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ filteredWordsForGame.length }} kelime hazır! Oyunu başlatabilirsiniz.</span>
            </div>

            <!-- Tablo -->
            <div class="card bg-base-100 shadow-sm">
              <div class="card-body p-0">
                <div class="overflow-x-auto">
                  <table class="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th class="text-left">Kelime</th>
                        <th class="text-left">Anlam</th>
                        <th class="text-center">
                          <div class="flex items-center justify-center gap-2">
                            Tür
                            <button
                              class="btn btn-ghost btn-xs"
                              @click="sortTable('type')"
                              :class="{
                                'text-primary': sortState.type !== 'none',
                                'opacity-50': sortState.type === 'none',
                              }"
                            >
                              <svg
                                v-if="sortState.type === 'none'"
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                              <svg
                                v-else-if="sortState.type === 'asc'"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                              </svg>
                              <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </th>
                        <th class="text-center">Zorluk</th>
                        <th class="text-center">Durum</th>
                        <th class="text-center">
                          <div class="flex items-center justify-center gap-2">
                            Başarı
                            <button
                              class="btn btn-ghost btn-xs"
                              @click="sortTable('success')"
                              :class="{
                                'text-primary': sortState.success !== 'none',
                                'opacity-50': sortState.success === 'none',
                              }"
                            >
                              <svg
                                v-if="sortState.success === 'none'"
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
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                              <svg
                                v-else-if="sortState.success === 'asc'"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                              </svg>
                              <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </th>
                        <th class="text-center">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="isLoading">
                        <td colspan="6" class="text-center py-8">
                          <span class="loading loading-spinner loading-md"></span>
                        </td>
                      </tr>
                      <tr v-else-if="displayedWords.length === 0">
                        <td colspan="6" class="text-center py-8">
                          <div class="text-base-content/70">Sonuç bulunamadı</div>
                        </td>
                      </tr>
                      <tr 
                        v-for="word in displayedWords" 
                        :key="word.id"
                        class="hover:bg-base-200 cursor-pointer"
                        @click="showWordDetails(word)"
                      >
                        <td class="font-semibold text-base-content">{{ word.word }}</td>
                        <td class="text-base-content/80">{{ getPrimaryMeaning(word) }}</td>
                        <td class="text-center">
                          <span class="badge badge-outline badge-sm">{{ getWordTypeLabel(word.type) }}</span>
                        </td>
                        <td class="text-center">
                          <span class="badge badge-sm" :class="getDifficultyBadgeClass(word.difficulty_level)">
                            {{ getDifficultyLabel(word.difficulty_level) }}
                          </span>
                        </td>
                        <td class="text-center">
                          <span class="badge badge-sm" :class="getLearningStatusBadgeClass(word.learning_status)">
                            {{ getLearningStatusLabel(word.learning_status) }}
                          </span>
                        </td>
                        <td class="text-center">
                          <span v-if="word.review_count > 0" class="badge badge-sm" :class="getSuccessRateBadgeClass(calculateSuccessRate(word).rate)">
                            {{ calculateSuccessRate(word).label }}
                          </span>
                          <span v-else class="text-xs text-base-content/50">-</span>
                        </td>
                        <td class="text-center">
                          <div class="flex gap-1 justify-center">
                            <button class="btn btn-ghost btn-xs">
                              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <Link v-if="isLoggedIn" :href="route('rendition.words.edit', word.id)" class="btn btn-ghost btn-xs">
                              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="filteredWordsForGame.length > perPage" class="mt-4 flex justify-between">
            <div>
              <span class="text-sm opacity-70">
                {{ paginationInfo }}
              </span>
            </div>
            <div class="join">
              <button class="btn btn-sm join-item" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                «
              </button>
              <button class="btn btn-sm join-item">{{ currentPage }}</button>
              <button
                class="btn btn-sm join-item"
                :disabled="currentPage >= totalPages"
                @click="changePage(currentPage + 1)"
              >
                »
              </button>
            </div>
          </div>

          <div v-if="props.words?.length === 0" class="alert alert-info mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Bu pakette kelime bulunmamaktadır.</span>
          </div>

          <div v-else-if="filteredWordsForGame.length < 5" class="alert alert-warning mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <span>Seçili filtrelerle yeterli kelime bulunamadı. En az 5 kelime gerekiyor.</span>
          </div>
        </div>
      </transition>
    </div>

    <!-- Kelime Detay Modalı -->
    <div v-if="selectedWord" class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg text-base-content">{{ selectedWord.word }}</h3>
          <button @click="selectedWord = null" class="btn btn-ghost btn-sm btn-circle">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Anlamlar -->
          <div>
            <h4 class="font-semibold text-base-content mb-2">Anlamlar</h4>
            <div class="space-y-2">
              <div 
                v-for="(meaning, index) in selectedWord.meanings" 
                :key="index"
                class="flex items-center gap-2 p-2 rounded-lg"
                :class="meaning.is_primary ? 'bg-primary/10 border border-primary/20' : 'bg-base-200'"
              >
                <span class="text-sm font-medium">{{ index + 1 }}.</span>
                <span class="text-base-content">{{ meaning.meaning }}</span>
                <span v-if="meaning.is_primary" class="badge badge-primary badge-xs">Birincil</span>
              </div>
            </div>
          </div>

          <!-- Kelime Bilgileri -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-base-content mb-2">Temel Bilgiler</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-base-content/70">Tür:</span>
                  <span class="text-base-content">{{ getWordTypeLabel(selectedWord.type) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Zorluk:</span>
                  <span class="badge badge-sm" :class="getDifficultyBadgeClass(selectedWord.difficulty_level)">
                    {{ getDifficultyLabel(selectedWord.difficulty_level) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Durum:</span>
                  <span class="badge badge-sm" :class="getLearningStatusBadgeClass(selectedWord.learning_status)">
                    {{ getLearningStatusLabel(selectedWord.learning_status) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Öne Çıkar:</span>
                  <span class="text-base-content">{{ selectedWord.is_flagged ? 'Evet' : 'Hayır' }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-base-content mb-2">İstatistikler</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-base-content/70">Toplam Sorulma:</span>
                  <span class="text-base-content">{{ selectedWord.review_count || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Yanlış Sayısı:</span>
                  <span class="text-base-content">{{ selectedWord.incorrect_count || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Başarı Oranı:</span>
                  <span class="badge badge-sm" :class="getSuccessRateBadgeClass(calculateSuccessRate(selectedWord).rate)">
                    {{ calculateSuccessRate(selectedWord).label }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Son Güncelleme:</span>
                  <span class="text-base-content">{{ new Date(selectedWord.updated_at).toLocaleDateString('tr-TR') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Örnek Cümleler -->
          <div v-if="selectedWord.example_sentences && selectedWord.example_sentences.length > 0">
            <h4 class="font-semibold text-base-content mb-2">Örnek Cümleler</h4>
            <div class="space-y-2">
              <div 
                v-for="(sentence, index) in selectedWord.example_sentences" 
                :key="index"
                class="p-3 bg-base-200 rounded-lg"
              >
                <div class="text-base-content font-medium">{{ sentence }}</div>
                <div v-if="selectedWord.example_translations && selectedWord.example_translations[index]" class="text-sm text-base-content/70 mt-1">
                  {{ selectedWord.example_translations[index] }}
                </div>
              </div>
            </div>
          </div>

          <!-- Eş Anlamlılar -->
          <div v-if="selectedWord.synonyms && selectedWord.synonyms.length > 0">
            <h4 class="font-semibold text-base-content mb-2">Eş Anlamlılar</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="synonym in selectedWord.synonyms" 
                :key="synonym"
                class="badge badge-outline"
              >
                {{ synonym }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button @click="selectedWord = null" class="btn btn-outline">Kapat</button>
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
    result = result.filter(
      (word) => word.word.toLowerCase().includes(query) || word.meaning.toLowerCase().includes(query)
    );
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
  return filteredWordsForGame.value.slice(startIndex, startIndex + perPage.value);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(filteredWordsForGame.value.length / perPage.value);
});

// Pagination bilgisi
const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(start + perPage.value - 1, filteredWordsForGame.value.length);
  return `${start}-${end} / ${filteredWordsForGame.value.length}`;
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

  // Yapay yükleme süresi
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

// Filtered words for game (oyun için rastgele karıştırılmış)
const filteredWords = computed(() => {
  // filteredWordsForGame'i kullan ve rastgele karıştır
  let wordsToUse = [...filteredWordsForGame.value];
  
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
      wordsToUse = wordsToUse.filter(word => !word.review_count || word.review_count === 0);
      break;
    case 'most-mistakes':
      wordsToUse = wordsToUse.filter(word => word.incorrect_count && word.incorrect_count >= 3);
      // En çok hata yapılanlar en üstte
      wordsToUse.sort((a, b) => (b.incorrect_count || 0) - (a.incorrect_count || 0));
      break;
    case 'success-rate':
      wordsToUse = wordsToUse.filter(word => {
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
      wordsToUse = wordsToUse.filter(word => word.is_flagged);
      break;
    case 'recently-learned':
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      wordsToUse = wordsToUse.filter(word => {
        if (!word.last_reviewed_at) return false;
        return new Date(word.last_reviewed_at) > weekAgo;
      });
      // En son öğrenilenler en üstte
      wordsToUse.sort((a, b) => new Date(b.last_reviewed_at) - new Date(a.last_reviewed_at));
      break;
    case 'nouns':
      wordsToUse = wordsToUse.filter(word => word.type === 'noun');
      break;
    case 'verbs':
      wordsToUse = wordsToUse.filter(word => word.type === 'verb');
      break;
    case 'adjectives':
      wordsToUse = wordsToUse.filter(word => word.type === 'adjective');
      break;
    case 'difficult':
      wordsToUse = wordsToUse.filter(word => word.difficulty_level >= 3);
      // En zor olanlar en üstte
      wordsToUse.sort((a, b) => b.difficulty_level - a.difficulty_level);
      break;
    case 'easy':
      wordsToUse = wordsToUse.filter(word => word.difficulty_level <= 2);
      // En kolay olanlar en üstte
      wordsToUse.sort((a, b) => a.difficulty_level - b.difficulty_level);
      break;
    case 'unlearned':
      wordsToUse = wordsToUse.filter(word => word.learning_status === 0);
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
        criteria: 'review_count = 0 olan kelimeler'
      };
    case 'most-mistakes':
      return {
        title: '❌ Çok Hata Yapılan Kelimeler',
        description: 'En çok yanlış cevaplanan kelimeler. Bu kelimeler üzerinde daha fazla çalışmanız gerekiyor.',
        criteria: 'incorrect_count >= 3 olan kelimeler'
      };
    case 'success-rate':
      return {
        title: `📊 Başarı Oranı %${gameConfig.value.successRateThreshold} Altındaki Kelimeler`,
        description: 'Başarı oranı belirlenen eşiğin altında olan kelimeler. Bu kelimeleri tekrar etmeniz önerilir.',
        criteria: `(doğru cevap / toplam sorulma) * 100 < ${gameConfig.value.successRateThreshold}%`
      };
    case 'flagged':
      return {
        title: '⭐ İşaretlenen Kelimeler',
        description: 'Öne çıkarılan, önemli olduğu düşünülen kelimeler. Özel olarak işaretlenmiş kelimeler.',
        criteria: 'is_flagged = true olan kelimeler'
      };
    case 'recently-learned':
      return {
        title: '🕒 Son Öğrenilen Kelimeler',
        description: 'Yakın zamanda (son 7 gün içinde) öğrenilen kelimeler. Tekrar için ideal zaman.',
        criteria: 'last_reviewed_at son 7 gün içinde olan kelimeler'
      };
    case 'nouns':
      return {
        title: '📝 İsim Türündeki Kelimeler',
        description: 'Sadece isim türündeki kelimeler. İsim odaklı çalışma için.',
        criteria: 'type = "noun" olan kelimeler'
      };
    case 'verbs':
      return {
        title: '🏃 Fiil Türündeki Kelimeler',
        description: 'Sadece fiil türündeki kelimeler. Fiil odaklı çalışma için.',
        criteria: 'type = "verb" olan kelimeler'
      };
    case 'adjectives':
      return {
        title: '🎨 Sıfat Türündeki Kelimeler',
        description: 'Sadece sıfat türündeki kelimeler. Sıfat odaklı çalışma için.',
        criteria: 'type = "adjective" olan kelimeler'
      };
    case 'difficult':
      return {
        title: '🔥 Zor Seviyedeki Kelimeler',
        description: 'Zor ve çok zor seviyedeki kelimeler. İleri seviye çalışma için.',
        criteria: 'difficulty_level >= 3 olan kelimeler'
      };
    case 'easy':
      return {
        title: '😊 Kolay Seviyedeki Kelimeler',
        description: 'Kolay ve orta seviyedeki kelimeler. Temel çalışma için.',
        criteria: 'difficulty_level <= 2 olan kelimeler'
      };
    case 'unlearned':
      return {
        title: '📖 Öğrenilmemiş Kelimeler',
        description: 'Henüz öğrenilmemiş kelimeler. Yeni kelimeler öğrenmek için.',
        criteria: 'learning_status = 0 olan kelimeler'
      };
    default:
      return {
        title: '📚 Tüm Kelimeler',
        description: 'Filtre olmadan tüm kelimeler. Genel çalışma için.',
        criteria: 'Tüm kelimeler gösteriliyor'
      };
  }
};

// Filtrelenmiş kelimeleri dışa aktar
const exportFilteredWords = () => {
  if (filteredWordsForGame.value.length === 0) return;
  
  const csvContent = [
    ['Kelime', 'Anlam', 'Tür', 'Zorluk', 'Durum', 'Başarı Oranı', 'Toplam Sorulma', 'Yanlış Sayısı'],
    ...filteredWordsForGame.value.map(word => [
      word.word,
      getPrimaryMeaning(word),
      getWordTypeLabel(word.type),
      getDifficultyLabel(word.difficulty_level),
      getLearningStatusLabel(word.learning_status),
      word.review_count > 0 ? calculateSuccessRate(word).label : '-',
      word.review_count || 0,
      word.incorrect_count || 0
    ])
  ].map(row => row.join(',')).join('\n');

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



// Yeterli kelime var mı kontrol et
const hasEnoughWords = (count) => {
  return count >= 5;
};

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
