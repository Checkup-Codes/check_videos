<template>
  <AuthenticatedLayout>
    <Head :title="screen?.seo?.title || 'SEO Ayarları'" />
    
    <div class="min-h-screen bg-background p-4 md:p-6">
      <div class="mx-auto max-w-4xl">
        <!-- Header with Domain Badge -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-foreground">SEO Ayarları</h1>
              <p class="mt-1 text-sm text-muted-foreground">
                Google'da nasıl görüneceğinizi yönetin
              </p>
            </div>
            <div class="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
              <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span class="text-sm font-medium text-primary">{{ currentDomain }}</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
          <!-- Temel Bilgiler -->
          <div class="rounded-lg border border-border bg-card p-6">
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-foreground">Temel Bilgiler</h2>
            </div>

            <div class="space-y-4">
              <div>
                <label for="site_name" class="mb-1.5 block text-sm font-medium text-foreground">
                  Site Adı <span class="text-destructive">*</span>
                </label>
                <input
                  id="site_name"
                  v-model="form.site_name"
                  type="text"
                  required
                  placeholder="Örn: İlber Ortaylı"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <p class="mt-1 text-xs text-muted-foreground">Google'da ve tarayıcı sekmesinde görünecek</p>
                <InputError :message="form.errors.site_name" class="mt-1" />
              </div>

              <div>
                <label for="tagline" class="mb-1.5 block text-sm font-medium text-foreground">
                  Slogan
                </label>
                <input
                  id="tagline"
                  v-model="form.tagline"
                  type="text"
                  placeholder="Örn: Tarihçi, Yazar, Akademisyen"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <p class="mt-1 text-xs text-muted-foreground">Site adınızın altında görünecek kısa açıklama</p>
                <InputError :message="form.errors.tagline" class="mt-1" />
              </div>

              <div>
                <label for="description" class="mb-1.5 block text-sm font-medium text-foreground">
                  Site Açıklaması <span class="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  required
                  maxlength="160"
                  rows="3"
                  placeholder="Örn: Osmanlı tarihi, kültür ve sanat üzerine yazılar, videolar ve röportajlar. Prof. Dr. İlber Ortaylı'nın resmi web sitesi."
                  class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                ></textarea>
                <div class="mt-1 flex items-center justify-between">
                  <p class="text-xs text-muted-foreground">Google arama sonuçlarında görünecek</p>
                  <span :class="['text-xs font-medium', form.description?.length > 155 ? 'text-destructive' : 'text-muted-foreground']">
                    {{ form.description?.length || 0 }}/160
                  </span>
                </div>
                <InputError :message="form.errors.description" class="mt-1" />
              </div>

              <div>
                <label for="keywords" class="mb-1.5 block text-sm font-medium text-foreground">
                  Anahtar Kelimeler
                </label>
                <input
                  id="keywords"
                  v-model="form.keywords"
                  type="text"
                  placeholder="Örn: tarih, osmanlı, kültür, sanat, akademisyen"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <p class="mt-1 text-xs text-muted-foreground">Virgülle ayırarak yazın</p>
                <InputError :message="form.errors.keywords" class="mt-1" />
              </div>
            </div>
          </div>

          <!-- Logo ve Simgeler -->
          <div class="rounded-lg border border-border bg-card p-6">
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-foreground">Logo ve Simgeler</h2>
                <p class="text-xs text-muted-foreground">Sitenizin her yerinde kullanılacak logo ve simgeler</p>
              </div>
            </div>

            <div class="space-y-6">
              <!-- Logo -->
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">
                  Site Logosu <span class="text-destructive">*</span>
                </label>
                <div v-if="form.logo" class="relative mb-3 inline-block">
                  <img :src="form.logo" class="h-20 rounded-lg border border-border bg-white p-2 object-contain" alt="Logo" />
                  <button 
                    type="button" 
                    @click="form.logo = ''" 
                    class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-3">
                  <input type="file" ref="logoInput" @change="uploadLogo" accept=".jpg,.jpeg,.png,.svg,.webp" class="hidden" />
                  <button
                    type="button"
                    @click="$refs.logoInput.click()"
                    :disabled="uploading.logo"
                    class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    <svg v-if="!uploading.logo" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span v-if="uploading.logo">Yükleniyor...</span>
                    <span v-else>Logo Yükle</span>
                  </button>
                  <span class="text-xs text-muted-foreground">veya</span>
                  <input
                    v-model="form.logo"
                    type="text"
                    placeholder="/storage/logo.png"
                    class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <p class="mt-1 text-xs text-muted-foreground">Navbar, footer ve tüm sayfalarda kullanılacak (PNG veya SVG önerilir)</p>
                <InputError :message="form.errors.logo" class="mt-1" />
              </div>

              <!-- Favicon -->
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">
                  Favicon (Tarayıcı Simgesi)
                </label>
                <div v-if="form.favicon" class="relative mb-3 inline-block">
                  <img :src="form.favicon" class="h-16 w-16 rounded-lg border border-border bg-white p-1 object-contain" alt="Favicon" />
                  <button 
                    type="button" 
                    @click="form.favicon = ''" 
                    class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-3">
                  <input type="file" ref="faviconInput" @change="uploadFavicon" accept=".ico,.png,.svg" class="hidden" />
                  <button
                    type="button"
                    @click="$refs.faviconInput.click()"
                    :disabled="uploading.favicon"
                    class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    <svg v-if="!uploading.favicon" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span v-if="uploading.favicon">Yükleniyor...</span>
                    <span v-else>Favicon Yükle</span>
                  </button>
                  <span class="text-xs text-muted-foreground">veya</span>
                  <input
                    v-model="form.favicon"
                    type="text"
                    placeholder="/storage/favicon.ico"
                    class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <p class="mt-1 text-xs text-muted-foreground">Tarayıcı sekmesinde görünecek küçük simge (32x32 veya 64x64 önerilir)</p>
                <InputError :message="form.errors.favicon" class="mt-1" />
              </div>

              <!-- Apple Touch Icon -->
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">
                  Apple Touch Icon
                </label>
                <div v-if="form.apple_touch_icon" class="relative mb-3 inline-block">
                  <img :src="form.apple_touch_icon" class="h-20 w-20 rounded-lg border border-border bg-white p-1 object-contain" alt="Apple Touch Icon" />
                  <button 
                    type="button" 
                    @click="form.apple_touch_icon = ''" 
                    class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-3">
                  <input type="file" ref="appleTouchIconInput" @change="uploadAppleTouchIcon" accept=".png" class="hidden" />
                  <button
                    type="button"
                    @click="$refs.appleTouchIconInput.click()"
                    :disabled="uploading.appleTouchIcon"
                    class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    <svg v-if="!uploading.appleTouchIcon" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span v-if="uploading.appleTouchIcon">Yükleniyor...</span>
                    <span v-else>Apple Icon Yükle</span>
                  </button>
                  <span class="text-xs text-muted-foreground">veya</span>
                  <input
                    v-model="form.apple_touch_icon"
                    type="text"
                    placeholder="/storage/apple-touch-icon.png"
                    class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <p class="mt-1 text-xs text-muted-foreground">iPhone/iPad ana ekrana eklendiğinde görünecek (180x180 önerilir)</p>
                <InputError :message="form.errors.apple_touch_icon" class="mt-1" />
              </div>
            </div>
          </div>

          <!-- Sosyal Medya Paylaşımı -->
          <div class="rounded-lg border border-border bg-card p-6">
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-foreground">Sosyal Medya Paylaşımı</h2>
                <p class="text-xs text-muted-foreground">Facebook, Twitter, WhatsApp'ta nasıl görüneceğinizi belirleyin</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">
                  Paylaşım Görseli (1200x630 önerilir)
                </label>
                <div v-if="form.og_image" class="relative mb-3 inline-block">
                  <img :src="form.og_image" class="h-32 rounded-lg border border-border object-cover" alt="OG Image" />
                  <button 
                    type="button" 
                    @click="form.og_image = ''" 
                    class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-3">
                  <input type="file" ref="ogImageInput" @change="uploadOgImage" accept=".jpg,.jpeg,.png,.webp" class="hidden" />
                  <button
                    type="button"
                    @click="$refs.ogImageInput.click()"
                    :disabled="uploading.ogImage"
                    class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    <svg v-if="!uploading.ogImage" class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span v-if="uploading.ogImage">Yükleniyor...</span>
                    <span v-else>Görsel Yükle</span>
                  </button>
                  <span class="text-xs text-muted-foreground">veya</span>
                  <input
                    v-model="form.og_image"
                    type="text"
                    placeholder="https://ornek.com/gorsel.jpg"
                    class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <p class="mt-1 text-xs text-muted-foreground">Siteniz paylaşıldığında gösterilecek görsel</p>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <label for="twitter_site" class="mb-1.5 block text-sm font-medium text-foreground">
                    Twitter Hesabı
                  </label>
                  <input
                    id="twitter_site"
                    v-model="form.twitter_site"
                    type="text"
                    placeholder="@ilberortayli"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label for="twitter_creator" class="mb-1.5 block text-sm font-medium text-foreground">
                    İçerik Oluşturucu
                  </label>
                  <input
                    id="twitter_creator"
                    v-model="form.twitter_creator"
                    type="text"
                    placeholder="@ilberortayli"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Google Ayarları -->
          <div class="rounded-lg border border-border bg-card p-6">
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-foreground">Google Ayarları</h2>
                <p class="text-xs text-muted-foreground">Ziyaretçi takibi ve site doğrulama</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label for="google_analytics_id" class="mb-1.5 block text-sm font-medium text-foreground">
                  Google Analytics ID
                </label>
                <input
                  id="google_analytics_id"
                  v-model="form.google_analytics_id"
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p class="mt-1 text-xs text-muted-foreground">
                  <a href="https://analytics.google.com" target="_blank" class="text-primary hover:underline">Google Analytics</a>'ten alabilirsiniz
                </p>
              </div>

              <div>
                <label for="google_verification" class="mb-1.5 block text-sm font-medium text-foreground">
                  Google Search Console Doğrulama Kodu
                </label>
                <input
                  id="google_verification"
                  v-model="form.google_verification"
                  type="text"
                  placeholder="abc123def456..."
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p class="mt-1 text-xs text-muted-foreground">
                  <a href="https://search.google.com/search-console" target="_blank" class="text-primary hover:underline">Search Console</a>'dan alabilirsiniz
                </p>
              </div>
            </div>
          </div>

          <!-- Yapılandırılmış Veri Bilgisi -->
          <div class="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
            <div class="flex items-start gap-3">
              <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h3 class="font-semibold text-green-900 dark:text-green-100">Otomatik SEO Optimizasyonu Aktif</h3>
                <p class="mt-1 text-sm text-green-700 dark:text-green-300">
                  Siteniz Google'da daha iyi görünmek için otomatik olarak yapılandırılmış veri kullanıyor. Yazılarınız, testleriniz ve sertifikalarınız Google'da düzgün listelenecek.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <a 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                  >
                    Test Et
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Kaydet Butonu -->
          <div class="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
            <p class="text-sm text-muted-foreground">
              Değişiklikler hemen aktif olacak
            </p>
            <button
              type="submit"
              :disabled="form.processing"
              class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <svg v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="form.processing">Kaydediliyor...</span>
              <span v-else>Kaydet</span>
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="$page.props.flash?.success" class="fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ $page.props.flash.success }}</span>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
  seo: { type: Object, required: true },
  logo: { type: Object, default: null },
  screen: { type: Object, default: null },
  currentDomain: { type: String, required: true },
});

const uploading = ref({
  logo: false,
  favicon: false,
  appleTouchIcon: false,
  ogImage: false,
});

const logoInput = ref(null);
const faviconInput = ref(null);
const appleTouchIconInput = ref(null);
const ogImageInput = ref(null);

const form = useForm({
  site_name: props.seo.site_name || '',
  logo: props.seo.logo || '',
  tagline: props.seo.tagline || '',
  title: props.seo.title || '',
  description: props.seo.description || '',
  keywords: props.seo.keywords || '',
  author: props.seo.author || '',
  language: props.seo.language || 'tr',
  locale: props.seo.locale || 'tr_TR',
  og_title: props.seo.og_title || '',
  og_description: props.seo.og_description || '',
  og_image: props.seo.og_image || '',
  twitter_card: props.seo.twitter_card || 'summary_large_image',
  twitter_site: props.seo.twitter_site || '',
  twitter_creator: props.seo.twitter_creator || '',
  favicon: props.seo.favicon || '',
  apple_touch_icon: props.seo.apple_touch_icon || '',
  theme_color: props.seo.theme_color || '#000000',
  canonical_url: props.seo.canonical_url || '',
  robots: props.seo.robots || 'index, follow',
  schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : '',
  google_verification: props.seo.google_verification || '',
  bing_verification: props.seo.bing_verification || '',
  yandex_verification: props.seo.yandex_verification || '',
  google_analytics_id: props.seo.google_analytics_id || '',
  google_tag_manager_id: props.seo.google_tag_manager_id || '',
});

const submit = () => {
  form.put(route('seo.update'));
};

const uploadLogo = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  uploading.value.logo = true;
  const formData = new FormData();
  formData.append('logo', file);
  
  try {
    const response = await fetch(route('seo.upload-logo'), {
      method: 'POST',
      body: formData,
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
    });
    const data = await response.json();
    form.logo = data.path;
  } catch (error) {
    console.error('Logo upload failed:', error);
  } finally {
    uploading.value.logo = false;
  }
};

const uploadFavicon = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  uploading.value.favicon = true;
  const formData = new FormData();
  formData.append('favicon', file);
  
  try {
    const response = await fetch(route('seo.upload-favicon'), {
      method: 'POST',
      body: formData,
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
    });
    const data = await response.json();
    form.favicon = data.path;
  } catch (error) {
    console.error('Favicon upload failed:', error);
  } finally {
    uploading.value.favicon = false;
  }
};

const uploadAppleTouchIcon = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  uploading.value.appleTouchIcon = true;
  const formData = new FormData();
  formData.append('apple_touch_icon', file);
  
  try {
    const response = await fetch(route('seo.upload-apple-touch-icon'), {
      method: 'POST',
      body: formData,
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
    });
    const data = await response.json();
    form.apple_touch_icon = data.path;
  } catch (error) {
    console.error('Apple Touch Icon upload failed:', error);
  } finally {
    uploading.value.appleTouchIcon = false;
  }
};

const uploadOgImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  uploading.value.ogImage = true;
  const formData = new FormData();
  formData.append('og_image', file);
  
  try {
    const response = await fetch(route('seo.upload-og-image'), {
      method: 'POST',
      body: formData,
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
    });
    const data = await response.json();
    form.og_image = data.path;
  } catch (error) {
    console.error('OG Image upload failed:', error);
  } finally {
    uploading.value.ogImage = false;
  }
};
</script>
