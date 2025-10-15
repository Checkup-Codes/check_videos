<template>
  <Head title="Aramıza Katıl - NOTIRIEL" />
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Aramıza Katıl</h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            NOTIRIEL ile öğrenme yolculuğunuzda en iyi dostunuz olun. Modern teknolojileri öğrenirken yanınızda olacak
            güçlü bir platform.
          </p>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Öğrenciler İçin Özel Avantajlar</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          NOTIRIEL, öğrenme sürecinizi kolaylaştıran ve hızlandıran özellikler sunar
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Feature 1 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30"
            >
              <svg
                class="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Kapsamlı İçerik Kütüphanesi</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Laravel, Vue.js, TypeScript ve daha fazlası için detaylı yazılar, örnekler ve en iyi uygulamalar.
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30"
            >
              <svg
                class="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Hızlı Öğrenme</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Pratik örnekler ve gerçek projelerle hızlıca öğrenin. Teoriden pratiğe geçişi kolaylaştırıyoruz.
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30"
            >
              <svg
                class="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Güncel Teknolojiler</h3>
            <p class="text-gray-600 dark:text-gray-300">
              En son teknoloji trendlerini takip edin. Sürekli güncellenen içeriklerle her zaman güncel kalın.
            </p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30"
            >
              <svg
                class="h-6 w-6 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Topluluk Desteği</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Diğer öğrencilerle etkileşim kurun, sorularınızı sorun ve birlikte öğrenin.
            </p>
          </div>
        </div>

        <!-- Feature 5 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30"
            >
              <svg
                class="h-6 w-6 text-teal-600 dark:text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Pratik Projeler</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Gerçek dünya projeleri ile öğrendiklerinizi pekiştirin. Portfolyonuzu geliştirin.
            </p>
          </div>
        </div>

        <!-- Feature 6 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div class="relative">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30"
            >
              <svg
                class="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Esnek Öğrenme</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Kendi hızınızda öğrenin. İstediğiniz zaman, istediğiniz yerde erişim sağlayın.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Choose Us Section -->
    <div class="bg-white dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Neden NOTIRIEL?</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Öğrenme yolculuğunuzda en iyi dostunuz olmamızın sebepleri
          </p>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <!-- Left Column -->
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg
                    class="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Öğrenci Dostu Yaklaşım</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Karmaşık konuları basit ve anlaşılır şekilde sunuyoruz. Öğrenme sürecinizi kolaylaştırıyoruz.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg
                    class="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Pratik Odaklı İçerik</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Sadece teori değil, gerçek projeler ve uygulamalarla öğrenme deneyiminizi zenginleştiriyoruz.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30"
                >
                  <svg
                    class="h-5 w-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Sürekli Güncelleme</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Teknoloji dünyasındaki değişimleri takip ediyor, içeriklerimizi sürekli güncelliyoruz.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30"
                >
                  <svg
                    class="h-5 w-5 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Kişiselleştirilmiş Öğrenme</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Her öğrencinin farklı olduğunu biliyoruz. Size özel öğrenme yolları sunuyoruz.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                  <svg
                    class="h-5 w-5 text-teal-600 dark:text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Topluluk Desteği</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Yalnız öğrenmeyin! Diğer öğrencilerle etkileşim kurun ve birlikte büyüyün.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30"
                >
                  <svg
                    class="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Kariyer Odaklı</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Sadece öğrenmek değil, kariyerinizde ilerlemeniz için gerekli becerileri kazandırıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="mb-4 text-3xl font-bold text-white">Hemen Başlayın!</h2>
          <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Öğrenme yolculuğunuzda en iyi dostunuz olmaya hazırız. Aramıza katılın ve birlikte büyüyelim.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <!--<Link
              href="/register"
              class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-50"
            >
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                ></path>
              </svg>
              Ücretsiz Kayıt Ol
            </Link>
            -->
            <Link
              href="/writes"
              class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-blue-600"
            >
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              İçerikleri İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link, Head } from '@inertiajs/vue3';
</script>

<style scoped>
/* Smooth animations */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Custom gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Dark mode transitions */
* {
  transition: all 0.3s ease-in-out;
}
</style>
