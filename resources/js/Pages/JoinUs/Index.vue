<template>
  <Head title="Aramıza Katıl - NOTIRIEL" />
  <div class="join-us-page min-h-screen bg-[#0a0a0f] text-white">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-sm text-gray-400 font-medium tracking-wide">Yeni nesil öğrenme platformu</span>
          </div>
          
          <h1 class="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Aramıza
            </span>
            <br />
            <span class="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Katıl
            </span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-12">
            Bilgini organize et, öğrendiklerini pekiştir, arkadaşlarınla yarış ve 
            <span class="text-white font-medium">yolculuğunu paylaş.</span>
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              class="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <span>Hemen Başla</span>
              <svg class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/writes"
              class="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              İçerikleri Keşfet
            </Link>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div class="w-1 h-2 rounded-full bg-white/40 animate-scroll"></div>
        </div>
      </div>
    </section>

    <!-- Features Container -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32">
      
      <!-- Feature 1: Yazılar & Excalidraw -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span class="text-sm text-violet-300 font-medium">Yazılar & Çizimler</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Gizlilik Kontrollü Yazılar</span>
              <br />
              <span class="text-gray-500">& Excalidraw Entegrasyonu</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Yazılarını <span class="text-violet-400 font-medium">gizli</span>, 
              <span class="text-cyan-400 font-medium">sadece linkle erişilebilir</span> veya 
              <span class="text-emerald-400 font-medium">herkese açık</span> olarak paylaş. 
              Her yazına özel Excalidraw çizimleri ekleyerek görselleştir.
            </p>

            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div class="w-2 h-2 rounded-full bg-red-400"></div>
                <span class="text-sm text-gray-300">Gizli</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span class="text-sm text-gray-300">Link ile</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span class="text-sm text-gray-300">Herkese Açık</span>
              </div>
            </div>
          </div>

          <!-- Images Grid - 3 images -->
          <div class="order-1 lg:order-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 aspect-video rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-white/10 overflow-hidden group">
                <img 
                  :src="featureImages.writes[0] || ''" 
                  alt="Yazı editörü"
                  class="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  v-if="featureImages.writes[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-violet-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm text-gray-500">Yazı Editörü Görseli</span>
                  </div>
                </div>
              </div>
              <div class="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.writes[1] || ''" 
                  alt="Excalidraw"
                  class="w-full h-full object-cover"
                  v-if="featureImages.writes[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center p-4">
                    <svg class="w-8 h-8 mx-auto text-cyan-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-xs text-gray-500">Excalidraw</span>
                  </div>
                </div>
              </div>
              <div class="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.writes[2] || ''" 
                  alt="Gizlilik ayarları"
                  class="w-full h-full object-cover"
                  v-if="featureImages.writes[2]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center p-4">
                    <svg class="w-8 h-8 mx-auto text-emerald-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-xs text-gray-500">Gizlilik</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature 2: Arama & Kategoriler -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Images Grid - 2 images -->
          <div>
            <div class="grid grid-cols-1 gap-4">
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.search[0] || ''" 
                  alt="Arama filtresi"
                  class="w-full h-full object-cover"
                  v-if="featureImages.search[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-amber-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span class="text-sm text-gray-500">Arama Filtresi Görseli</span>
                  </div>
                </div>
              </div>
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.search[1] || ''" 
                  alt="Kategoriler"
                  class="w-full h-full object-cover"
                  v-if="featureImages.search[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-rose-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="text-sm text-gray-500">Kategori Görünümü</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="text-sm text-amber-300 font-medium">Arama & Kategoriler</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Güçlü Arama Filtresi</span>
              <br />
              <span class="text-gray-500">& Akıllı Kategorizasyon</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Tüm yazılarını kolayca bul. Gelişmiş arama filtreleri ve 
              <span class="text-amber-400 font-medium">akıllı kategori sistemi</span> ile 
              içeriklerini düzenli tut, aradığını saniyeler içinde bul.
            </p>

            <ul class="space-y-3">
              <li class="flex items-center gap-3 text-gray-300">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Tam metin arama
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Kategori ve etiket filtreleme
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Tarih ve popülerlik sıralaması
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Feature 3: Kelime Oyunları -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-emerald-300 font-medium">Kelime Oyunları</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Yabancı Kelime Öğren</span>
              <br />
              <span class="text-gray-500">& Arkadaşlarınla Yarış</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Öğrendiğin kelimeleri ekle, <span class="text-emerald-400 font-medium">eğlenceli oyunlarla</span> pekiştir. 
              Arkadaşlarına <span class="text-cyan-400 font-medium">challenge'lar</span> hazırla ve 
              birlikte öğrenmenin keyfini çıkar.
            </p>

            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div class="text-2xl font-bold text-emerald-400 mb-1">🎯</div>
                <div class="text-sm text-gray-400">Quiz Modu</div>
              </div>
              <div class="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div class="text-2xl font-bold text-cyan-400 mb-1">⚔️</div>
                <div class="text-sm text-gray-400">Challenge</div>
              </div>
              <div class="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div class="text-2xl font-bold text-violet-400 mb-1">🏆</div>
                <div class="text-sm text-gray-400">Liderlik</div>
              </div>
            </div>
          </div>

          <!-- Images Grid - 3 images -->
          <div class="order-1 lg:order-2">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-3 aspect-video rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.games[0] || ''" 
                  alt="Kelime oyunu"
                  class="w-full h-full object-cover"
                  v-if="featureImages.games[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-emerald-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm text-gray-500">Kelime Oyunu Görseli</span>
                  </div>
                </div>
              </div>
              <div class="aspect-[4/3] rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.games[1] || ''" 
                  alt="Challenge"
                  class="w-full h-full object-cover"
                  v-if="featureImages.games[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-xs text-gray-500">Challenge</span>
                </div>
              </div>
              <div class="aspect-[4/3] rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.games[2] || ''" 
                  alt="Liderlik tablosu"
                  class="w-full h-full object-cover"
                  v-if="featureImages.games[2]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-xs text-gray-500">Liderlik</span>
                </div>
              </div>
              <div class="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-white/10 overflow-hidden flex items-center justify-center">
                <div class="text-center">
                  <span class="text-2xl">+</span>
                  <div class="text-xs text-gray-500">Daha fazlası</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature 4: Test Soruları -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Images Grid - 2 images -->
          <div>
            <div class="relative">
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.tests[0] || ''" 
                  alt="Test oluşturma"
                  class="w-full h-full object-cover"
                  v-if="featureImages.tests[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-rose-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span class="text-sm text-gray-500">Test Oluşturma Görseli</span>
                  </div>
                </div>
              </div>
              <div class="absolute -bottom-6 -right-6 w-48 aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-white/10 overflow-hidden shadow-2xl">
                <img 
                  :src="featureImages.tests[1] || ''" 
                  alt="Test paylaşma"
                  class="w-full h-full object-cover"
                  v-if="featureImages.tests[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center p-2">
                    <svg class="w-8 h-8 mx-auto text-indigo-400/50 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span class="text-xs text-gray-500">Paylaş</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:pl-8">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
              <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="text-sm text-rose-300 font-medium">Test Soruları</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Konuyu Pekiştir</span>
              <br />
              <span class="text-gray-500">& Arkadaşlarınla Paylaş</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Öğrendiğin konular hakkında <span class="text-rose-400 font-medium">test soruları</span> hazırla. 
              Arkadaşlarınla paylaş, birlikte çöz ve 
              <span class="text-indigo-400 font-medium">birbirinizin bilgisini test edin</span>.
            </p>

            <div class="flex items-center gap-4">
              <div class="flex -space-x-2">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-[#0a0a0f] flex items-center justify-center text-sm font-bold">A</div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-[#0a0a0f] flex items-center justify-center text-sm font-bold">B</div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-[#0a0a0f] flex items-center justify-center text-sm font-bold">C</div>
              </div>
              <span class="text-gray-400 text-sm">+500 test paylaşıldı</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature 5: Yolculuk Timeline -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span class="text-sm text-cyan-300 font-medium">Yolculuk Zamanı</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Hayatının Timeline'ı</span>
              <br />
              <span class="text-gray-500">& Yolculuk Paylaşımı</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Hayatındaki önemli anları <span class="text-cyan-400 font-medium">timeline</span> formatında kaydet. 
              Kariyer yolculuğunu, öğrenme sürecini ve başarılarını 
              <span class="text-emerald-400 font-medium">görsel bir hikaye</span> olarak paylaş.
            </p>

            <!-- Mini Timeline Preview -->
            <div class="relative pl-6 border-l-2 border-cyan-500/30 space-y-4">
              <div class="relative">
                <div class="absolute -left-[25px] w-3 h-3 rounded-full bg-cyan-400"></div>
                <div class="text-sm text-cyan-400 font-medium">2024</div>
                <div class="text-gray-400 text-sm">İlk projemi tamamladım</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[25px] w-3 h-3 rounded-full bg-emerald-400"></div>
                <div class="text-sm text-emerald-400 font-medium">2025</div>
                <div class="text-gray-400 text-sm">Senior Developer oldum</div>
              </div>
              <div class="relative">
                <div class="absolute -left-[25px] w-3 h-3 rounded-full bg-violet-400 animate-pulse"></div>
                <div class="text-sm text-violet-400 font-medium">Şimdi</div>
                <div class="text-gray-400 text-sm">Yeni hedefler...</div>
              </div>
            </div>
          </div>

          <!-- Images Grid - 2 images -->
          <div class="order-1 lg:order-2">
            <div class="space-y-4">
              <div class="aspect-video rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.journey[0] || ''" 
                  alt="Timeline görünümü"
                  class="w-full h-full object-cover"
                  v-if="featureImages.journey[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-cyan-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm text-gray-500">Timeline Görseli</span>
                  </div>
                </div>
              </div>
              <div class="aspect-[21/9] rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.journey[1] || ''" 
                  alt="Yolculuk detayı"
                  class="w-full h-full object-cover"
                  v-if="featureImages.journey[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-10 h-10 mx-auto text-violet-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm text-gray-500">Yolculuk Detayı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature 6: Çalışma Masası -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Single Image -->
          <div>
            <div class="aspect-video rounded-2xl bg-gradient-to-br from-slate-500/20 to-zinc-500/10 border border-white/10 overflow-hidden">
              <img 
                :src="featureImages.workspace[0] || ''" 
                alt="Çalışma masası"
                class="w-full h-full object-cover"
                v-if="featureImages.workspace[0]"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-16 h-16 mx-auto text-slate-400/50 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-500">Çalışma Masası Görseli</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 mb-6">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-slate-300 font-medium">Çalışma Masası</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Çalışma Ortamını</span>
              <br />
              <span class="text-gray-500">& Ekipmanlarını Paylaş</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              Çalışma masanı ve kullandığın <span class="text-slate-300 font-medium">ekipmanları</span> göster. 
              Diğer geliştiricilerin setup'larından ilham al, 
              <span class="text-emerald-400 font-medium">en iyi araçları</span> keşfet.
            </p>

            <div class="flex flex-wrap gap-3">
              <div class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                💻 MacBook Pro
              </div>
              <div class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                🖥️ 4K Monitor
              </div>
              <div class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                ⌨️ Mechanical KB
              </div>
              <div class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                🎧 Headphones
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature 7: Bookmarks -->
      <section class="feature-section">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span class="text-sm text-amber-300 font-medium">Yer İmleri</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-bold mb-6">
              <span class="text-white">Bookmark Koleksiyonun</span>
              <br />
              <span class="text-gray-500">& Takipçilerine Fayda</span>
            </h2>
            
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              En faydalı kaynakları <span class="text-amber-400 font-medium">yer imlerine</span> ekle ve 
              kategorize et. Seni takip edenlere <span class="text-emerald-400 font-medium">küratörlüğünle</span> 
              değer kat, en iyi kaynakları paylaş.
            </p>

            <div class="bg-white/5 border border-white/10 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">YS</div>
                <div>
                  <div class="text-sm font-medium text-white">Yakup'un Koleksiyonu</div>
                  <div class="text-xs text-gray-500">127 bookmark • 45 takipçi</div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs">Vue.js</span>
                <span class="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs">Laravel</span>
                <span class="px-2 py-1 rounded bg-violet-500/20 text-violet-300 text-xs">DevOps</span>
              </div>
            </div>
          </div>

          <!-- Images Grid - 2 images -->
          <div class="order-1 lg:order-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 aspect-video rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.bookmarks[0] || ''" 
                  alt="Bookmark listesi"
                  class="w-full h-full object-cover"
                  v-if="featureImages.bookmarks[0]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-12 h-12 mx-auto text-amber-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span class="text-sm text-gray-500">Bookmark Listesi Görseli</span>
                  </div>
                </div>
              </div>
              <div class="col-span-2 aspect-[21/9] rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-white/10 overflow-hidden">
                <img 
                  :src="featureImages.bookmarks[1] || ''" 
                  alt="Takipçi sistemi"
                  class="w-full h-full object-cover"
                  v-if="featureImages.bookmarks[1]"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-10 h-10 mx-auto text-orange-400/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="text-sm text-gray-500">Takipçi Sistemi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- CTA Section -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6">
          <span class="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Hazır mısın?
          </span>
        </h2>
        <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Hemen ücretsiz kayıt ol ve öğrenme yolculuğuna başla. 
          Binlerce kullanıcı seni bekliyor.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            class="group relative inline-flex items-center justify-center px-10 py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-bold text-lg text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <span>Ücretsiz Başla</span>
            <svg class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/writes"
            class="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-white/5 border border-white/10 font-bold text-lg text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            Önce Göz At
          </Link>
        </div>

        <!-- Stats -->
        <div class="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <div class="text-3xl font-bold text-white mb-1">1000+</div>
            <div class="text-sm text-gray-500">Kullanıcı</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-1">5000+</div>
            <div class="text-sm text-gray-500">Yazı</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-1">10K+</div>
            <div class="text-sm text-gray-500">Kelime</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-1">500+</div>
            <div class="text-sm text-gray-500">Test</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-gray-500 text-sm">
            © 2025 NOTIRIEL. Tüm hakları saklıdır.
          </div>
          <div class="flex items-center gap-6">
            <Link href="/writes" class="text-gray-400 hover:text-white text-sm transition-colors">Yazılar</Link>
            <Link href="/about" class="text-gray-400 hover:text-white text-sm transition-colors">Hakkında</Link>
            <Link href="/contact" class="text-gray-400 hover:text-white text-sm transition-colors">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Link, Head } from '@inertiajs/vue3';
import { reactive } from 'vue';

// Feature images - buraya resim pathlerini ekleyeceğiz
const featureImages = reactive({
  // 3 resim
  writes: [
    '', // Yazı editörü - ana görsel
    '', // Excalidraw
    '', // Gizlilik ayarları
  ],
  // 2 resim
  search: [
    '', // Arama filtresi
    '', // Kategori görünümü
  ],
  // 3 resim
  games: [
    '', // Kelime oyunu ana ekran
    '', // Challenge
    '', // Liderlik tablosu
  ],
  // 2 resim
  tests: [
    '', // Test oluşturma
    '', // Test paylaşma
  ],
  // 2 resim
  journey: [
    '', // Timeline görünümü
    '', // Yolculuk detayı
  ],
  // 1 resim
  workspace: [
    '', // Çalışma masası
  ],
  // 2 resim
  bookmarks: [
    '', // Bookmark listesi
    '', // Takipçi sistemi
  ],
});
</script>

<style scoped>
.join-us-page {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Custom animations */
@keyframes scroll {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(4px); opacity: 0.5; }
}

.animate-scroll {
  animation: scroll 1.5s ease-in-out infinite;
}

/* Feature sections fade in */
.feature-section {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s ease forwards;
}

.feature-section:nth-child(1) { animation-delay: 0.1s; }
.feature-section:nth-child(2) { animation-delay: 0.15s; }
.feature-section:nth-child(3) { animation-delay: 0.2s; }
.feature-section:nth-child(4) { animation-delay: 0.25s; }
.feature-section:nth-child(5) { animation-delay: 0.3s; }
.feature-section:nth-child(6) { animation-delay: 0.35s; }
.feature-section:nth-child(7) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradient text fix for Safari */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Delay utilities */
.delay-500 {
  animation-delay: 500ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>
