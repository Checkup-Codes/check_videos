<template>
  <AuthenticatedLayout>
    <div class="py-6">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="submit" class="space-y-8">
          <!-- Temel SEO Bölümü -->
          <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div class="flex items-center space-x-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <svg
                    class="h-4 w-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Temel SEO</h3>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Arama motorları için temel optimizasyon ayarları
              </p>
            </div>

            <div class="space-y-6 p-6">
              <!-- Sayfa Başlığı -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Sayfa Başlığı</label>
                <input
                  type="text"
                  v-model="form.title"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="Örn: En İyi Web Tasarım Hizmetleri"
                  required
                />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Arama sonuçlarında görünen başlık. 50-60 karakter arasında olmalıdır.
                </p>
              </div>

              <!-- Meta Açıklama -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Meta Açıklama</label>
                <textarea
                  v-model="form.description"
                  class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  rows="3"
                  placeholder="Sayfanızın ne hakkında olduğunu açıklayan kısa bir metin..."
                  required
                ></textarea>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Arama sonuçlarında başlığın altında görünen açıklama. 150-160 karakter arasında olmalıdır.
                </p>
              </div>

              <!-- Anahtar Kelimeler -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Anahtar Kelimeler</label>
                <input
                  type="text"
                  v-model="form.keywords"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="web tasarım, seo, dijital pazarlama"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Sayfanızla ilgili anahtar kelimeler. Virgülle ayırarak yazın.
                </p>
              </div>
            </div>
          </div>

          <!-- Sosyal Medya Bölümü -->
          <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div class="flex items-center space-x-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <svg
                    class="h-4 w-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sosyal Medya</h3>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Facebook, Twitter ve diğer sosyal platformlar için optimizasyon
              </p>
            </div>

            <div class="space-y-6 p-6">
              <!-- Paylaşım Başlığı -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Paylaşım Başlığı</label>
                <input
                  type="text"
                  v-model="form.og_title"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="Sosyal medyada paylaşılırken görünecek başlık"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Sosyal medyada paylaşıldığında görünecek başlık. Boş bırakılırsa sayfa başlığı kullanılır.
                </p>
              </div>

              <!-- Paylaşım Açıklaması -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Paylaşım Açıklaması</label>
                <textarea
                  v-model="form.og_description"
                  class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  rows="3"
                  placeholder="Sosyal medyada paylaşılırken görünecek açıklama"
                ></textarea>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Sosyal medyada paylaşıldığında görünecek açıklama. Boş bırakılırsa meta açıklama kullanılır.
                </p>
              </div>

              <!-- Paylaşım Görseli -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Paylaşım Görseli</label>
                <input
                  type="text"
                  v-model="form.og_image"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Sosyal medyada paylaşıldığında görünecek görsel URL'si. 1200x630 piksel boyutunda olmalıdır.
                </p>
              </div>
            </div>
          </div>

          <!-- Gelişmiş Ayarlar Bölümü -->
          <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div class="flex items-center space-x-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <svg
                    class="h-4 w-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Gelişmiş Ayarlar</h3>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Teknik SEO ve arama motoru yönlendirme ayarları
              </p>
            </div>

            <div class="space-y-6 p-6">
              <!-- Canonical URL -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Canonical URL</label>
                <input
                  type="text"
                  v-model="form.canonical_url"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="https://example.com/canonical-page"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Bu sayfanın kanonik (resmi) URL'si. Duplicate content sorunlarını önlemek için kullanılır.
                </p>
              </div>

              <!-- Robots -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Robots Direktifleri</label>
                <select
                  v-model="form.robots"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="index, follow">index, follow - Sayfayı indeksle ve linkleri takip et</option>
                  <option value="noindex, follow">noindex, follow - Sayfayı indeksleme ama linkleri takip et</option>
                  <option value="index, nofollow">index, nofollow - Sayfayı indeksle ama linkleri takip etme</option>
                  <option value="noindex, nofollow">
                    noindex, nofollow - Sayfayı indeksleme ve linkleri takip etme
                  </option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Arama motorlarına bu sayfayı nasıl işleyeceklerini söyler.
                </p>
              </div>

              <!-- Schema.org JSON -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 dark:text-white">Schema.org JSON-LD</label>
                <textarea
                  v-model="form.schema_org"
                  class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 font-mono text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  rows="6"
                  placeholder='{"@context": "https://schema.org", "@type": "WebPage", "name": "Sayfa Adı", "description": "Sayfa açıklaması"}'
                ></textarea>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Yapılandırılmış veri için JSON-LD formatında Schema.org markup'ı. Arama motorlarının içeriği daha iyi
                  anlamasını sağlar.
                </p>
              </div>
            </div>
          </div>

          <!-- Kaydet Butonu -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              :disabled="form.processing"
            >
              <svg
                v-if="form.processing"
                class="-ml-1 mr-3 h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ form.processing ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
  seo: {
    type: Object,
    required: true,
  },
});

const form = useForm({
  title: props.seo.title,
  description: props.seo.description,
  keywords: props.seo.keywords,
  og_title: props.seo.og_title,
  og_description: props.seo.og_description,
  og_image: props.seo.og_image,
  canonical_url: props.seo.canonical_url,
  robots: props.seo.robots,
  schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : '',
});

const submit = () => {
  form.put(route('seo.update', props.seo.id));
};
</script>
