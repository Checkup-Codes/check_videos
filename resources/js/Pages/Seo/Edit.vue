<template>
  <AuthenticatedLayout>
    <Head :title="screen?.seo?.title || 'SEO Ayarları'" />
    
    <div class="min-h-screen bg-background p-6">
      <div class="mx-auto max-w-5xl">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-foreground">SEO Ayarları</h1>
          <p class="mt-1 text-sm text-muted-foreground">
            Sitenizin arama motorları ve sosyal medya için meta verilerini yönetin.
          </p>
        </div>

        <form @submit.prevent="submit" class="space-y-8">
          <!-- Site Kimliği -->
          <Card title="Site Kimliği">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel for="site_name" value="Site Adı" />
                <TextInput id="site_name" v-model="form.site_name" class="mt-1 block w-full" required />
                <p class="mt-1 text-xs text-muted-foreground">Header'da görünecek site adı</p>
                <InputError :message="form.errors.site_name" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="tagline" value="Slogan" />
                <TextInput id="tagline" v-model="form.tagline" class="mt-1 block w-full" />
                <p class="mt-1 text-xs text-muted-foreground">Kısa site açıklaması</p>
                <InputError :message="form.errors.tagline" class="mt-1" />
              </div>
              
              <div class="md:col-span-2">
                <InputLabel for="title" value="Varsayılan Sayfa Başlığı" />
                <TextInput id="title" v-model="form.title" class="mt-1 block w-full" required maxlength="70" />
                <div class="mt-1 flex justify-between">
                  <p class="text-xs text-muted-foreground">Ana sayfa için browser tab başlığı</p>
                  <span :class="['text-xs', form.title?.length > 60 ? 'text-destructive' : 'text-muted-foreground']">
                    {{ form.title?.length || 0 }}/70
                  </span>
                </div>
                <InputError :message="form.errors.title" class="mt-1" />
              </div>
              
              <div class="md:col-span-2">
                <InputLabel for="description" value="Site Açıklaması" />
                <TextArea id="description" v-model="form.description" class="mt-1 block w-full" rows="3" required maxlength="160" />
                <div class="mt-1 flex justify-between">
                  <p class="text-xs text-muted-foreground">Arama sonuçlarında görünecek açıklama</p>
                  <span :class="['text-xs', form.description?.length > 155 ? 'text-destructive' : 'text-muted-foreground']">
                    {{ form.description?.length || 0 }}/160
                  </span>
                </div>
                <InputError :message="form.errors.description" class="mt-1" />
              </div>
              
              <div class="md:col-span-2">
                <InputLabel for="keywords" value="Anahtar Kelimeler" />
                <TextInput id="keywords" v-model="form.keywords" class="mt-1 block w-full" />
                <p class="mt-1 text-xs text-muted-foreground">Virgülle ayrılmış anahtar kelimeler</p>
                <InputError :message="form.errors.keywords" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="author" value="Yazar" />
                <TextInput id="author" v-model="form.author" class="mt-1 block w-full" />
                <InputError :message="form.errors.author" class="mt-1" />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <InputLabel for="language" value="Dil Kodu" />
                  <TextInput id="language" v-model="form.language" class="mt-1 block w-full" placeholder="tr" />
                  <InputError :message="form.errors.language" class="mt-1" />
                </div>
                <div>
                  <InputLabel for="locale" value="Yerel Ayar" />
                  <TextInput id="locale" v-model="form.locale" class="mt-1 block w-full" placeholder="tr_TR" />
                  <InputError :message="form.errors.locale" class="mt-1" />
                </div>
              </div>
            </div>
          </Card>

          <!-- Görsel Varlıklar -->
          <Card title="Görsel Varlıklar">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </template>
            
            <div class="grid gap-6 md:grid-cols-3">
              <!-- Favicon -->
              <div>
                <InputLabel value="Favicon" />
                <div class="mt-2 flex items-center gap-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted">
                    <img v-if="form.favicon" :src="form.favicon" class="h-8 w-8 object-contain" alt="Favicon" />
                    <svg v-else class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <input type="file" ref="faviconInput" @change="uploadFavicon" accept=".ico,.png,.svg" class="hidden" />
                    <Button type="button" variant="outline" size="sm" @click="$refs.faviconInput.click()" :loading="uploading.favicon">
                      Yükle
                    </Button>
                    <p class="mt-1 text-xs text-muted-foreground">ICO, PNG, SVG (max 512KB)</p>
                  </div>
                </div>
              </div>
              
              <!-- Apple Touch Icon -->
              <div>
                <InputLabel value="Apple Touch Icon" />
                <div class="mt-2 flex items-center gap-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted">
                    <img v-if="form.apple_touch_icon" :src="form.apple_touch_icon" class="h-12 w-12 rounded-lg object-contain" alt="Apple Touch Icon" />
                    <svg v-else class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <input type="file" ref="appleTouchInput" @change="uploadAppleTouchIcon" accept=".png" class="hidden" />
                    <Button type="button" variant="outline" size="sm" @click="$refs.appleTouchInput.click()" :loading="uploading.appleTouchIcon">
                      Yükle
                    </Button>
                    <p class="mt-1 text-xs text-muted-foreground">PNG 180x180 (max 512KB)</p>
                  </div>
                </div>
              </div>
              
              <!-- Theme Color -->
              <div>
                <InputLabel for="theme_color" value="Tema Rengi" />
                <div class="mt-2 flex items-center gap-3">
                  <input type="color" id="theme_color" v-model="form.theme_color" class="h-10 w-14 cursor-pointer rounded border border-border" />
                  <TextInput v-model="form.theme_color" class="w-28" placeholder="#000000" />
                </div>
                <p class="mt-1 text-xs text-muted-foreground">Mobil tarayıcı tema rengi</p>
              </div>
            </div>
          </Card>

          <!-- Open Graph -->
          <Card title="Open Graph (Sosyal Medya Paylaşımı)">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel for="og_title" value="OG Başlık" />
                <TextInput id="og_title" v-model="form.og_title" class="mt-1 block w-full" maxlength="70" />
                <p class="mt-1 text-xs text-muted-foreground">Boş bırakılırsa site başlığı kullanılır</p>
                <InputError :message="form.errors.og_title" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="og_description" value="OG Açıklama" />
                <TextInput id="og_description" v-model="form.og_description" class="mt-1 block w-full" maxlength="200" />
                <p class="mt-1 text-xs text-muted-foreground">Boş bırakılırsa site açıklaması kullanılır</p>
                <InputError :message="form.errors.og_description" class="mt-1" />
              </div>
              
              <div class="md:col-span-2">
                <InputLabel value="OG Görsel (1200x630 önerilir)" />
                <div class="mt-2">
                  <div v-if="form.og_image" class="relative mb-3 inline-block">
                    <img :src="form.og_image" class="h-32 rounded-lg border border-border object-cover" alt="OG Image" />
                    <button type="button" @click="form.og_image = ''" class="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex items-center gap-3">
                    <input type="file" ref="ogImageInput" @change="uploadOgImage" accept=".jpg,.jpeg,.png,.webp" class="hidden" />
                    <Button type="button" variant="outline" size="sm" @click="$refs.ogImageInput.click()" :loading="uploading.ogImage">
                      Görsel Yükle
                    </Button>
                    <span class="text-xs text-muted-foreground">veya</span>
                    <TextInput v-model="form.og_image" class="flex-1" placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Twitter Card -->
          <Card title="Twitter Card">
            <template #icon>
              <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-3">
              <div>
                <InputLabel for="twitter_card" value="Kart Tipi" />
                <select id="twitter_card" v-model="form.twitter_card" class="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary">
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
                <InputError :message="form.errors.twitter_card" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="twitter_site" value="Twitter Hesabı (@site)" />
                <TextInput id="twitter_site" v-model="form.twitter_site" class="mt-1 block w-full" placeholder="@siteniz" />
                <InputError :message="form.errors.twitter_site" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="twitter_creator" value="İçerik Oluşturucu (@creator)" />
                <TextInput id="twitter_creator" v-model="form.twitter_creator" class="mt-1 block w-full" placeholder="@kullanici" />
                <InputError :message="form.errors.twitter_creator" class="mt-1" />
              </div>
            </div>
          </Card>

          <!-- Teknik SEO -->
          <Card title="Teknik SEO">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel for="canonical_url" value="Canonical URL" />
                <TextInput id="canonical_url" v-model="form.canonical_url" class="mt-1 block w-full" placeholder="https://siteniz.com" />
                <p class="mt-1 text-xs text-muted-foreground">Ana site URL'i (duplicate content önleme)</p>
                <InputError :message="form.errors.canonical_url" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="robots" value="Robots Direktifi" />
                <select id="robots" v-model="form.robots" class="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary">
                  <option value="index, follow">index, follow (Önerilen)</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
                <InputError :message="form.errors.robots" class="mt-1" />
              </div>
              
              <div class="md:col-span-2">
                <InputLabel for="schema_org" value="Schema.org JSON-LD" />
                <TextArea id="schema_org" v-model="form.schema_org" class="mt-1 block w-full font-mono text-sm" rows="6" placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}' />
                <p class="mt-1 text-xs text-muted-foreground">Yapılandırılmış veri (JSON formatında)</p>
                <InputError :message="form.errors.schema_org" class="mt-1" />
              </div>
            </div>
          </Card>

          <!-- Doğrulama Kodları -->
          <Card title="Arama Motoru Doğrulama">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-3">
              <div>
                <InputLabel for="google_verification" value="Google Search Console" />
                <TextInput id="google_verification" v-model="form.google_verification" class="mt-1 block w-full" placeholder="doğrulama kodu" />
                <p class="mt-1 text-xs text-muted-foreground">google-site-verification içeriği</p>
                <InputError :message="form.errors.google_verification" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="bing_verification" value="Bing Webmaster" />
                <TextInput id="bing_verification" v-model="form.bing_verification" class="mt-1 block w-full" placeholder="doğrulama kodu" />
                <p class="mt-1 text-xs text-muted-foreground">msvalidate.01 içeriği</p>
                <InputError :message="form.errors.bing_verification" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="yandex_verification" value="Yandex Webmaster" />
                <TextInput id="yandex_verification" v-model="form.yandex_verification" class="mt-1 block w-full" placeholder="doğrulama kodu" />
                <p class="mt-1 text-xs text-muted-foreground">yandex-verification içeriği</p>
                <InputError :message="form.errors.yandex_verification" class="mt-1" />
              </div>
            </div>
          </Card>

          <!-- Analytics -->
          <Card title="Analytics & Tracking">
            <template #icon>
              <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </template>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel for="google_analytics_id" value="Google Analytics ID" />
                <TextInput id="google_analytics_id" v-model="form.google_analytics_id" class="mt-1 block w-full" placeholder="G-XXXXXXXXXX veya UA-XXXXXXXX-X" />
                <p class="mt-1 text-xs text-muted-foreground">GA4 veya Universal Analytics ID</p>
                <InputError :message="form.errors.google_analytics_id" class="mt-1" />
              </div>
              
              <div>
                <InputLabel for="google_tag_manager_id" value="Google Tag Manager ID" />
                <TextInput id="google_tag_manager_id" v-model="form.google_tag_manager_id" class="mt-1 block w-full" placeholder="GTM-XXXXXXX" />
                <p class="mt-1 text-xs text-muted-foreground">GTM container ID</p>
                <InputError :message="form.errors.google_tag_manager_id" class="mt-1" />
              </div>
            </div>
          </Card>

          <!-- Submit Button -->
          <div class="flex justify-end gap-3">
            <Button type="submit" variant="primary" :loading="form.processing">
              Kaydet
            </Button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="$page.props.flash?.success" class="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          {{ $page.props.flash.success }}
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import InputError from '@/Components/InputError.vue';
import Card from '@/Components/ui/Card.vue';
import Button from '@/Components/ui/Button.vue';

const props = defineProps({
  seo: { type: Object, required: true },
  logo: { type: Object, default: null },
  screen: { type: Object, default: null },
});

const uploading = ref({
  favicon: false,
  appleTouchIcon: false,
  ogImage: false,
});

const form = useForm({
  site_name: props.seo.site_name || '',
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
