<template>
  <LayoutCertificates>
    <CheckScreen>
      <div class="p-6 pt-12 sm:p-8 sm:pt-16">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Image Section -->
          <div class="space-y-4">
            <div class="overflow-hidden rounded-xl border border-border bg-card">
              <div v-if="certificate.image" class="relative aspect-[4/3]">
                <img
                  :src="certificate.image"
                  :alt="certificate.title"
                  class="h-full w-full object-contain"
                />
              </div>
              <div v-else class="flex aspect-[4/3] items-center justify-center bg-muted">
                <svg class="h-24 w-24 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <!-- Credential Info -->
            <div v-if="certificate.credential_id || certificate.credential_url" class="rounded-lg border border-border bg-card p-4">
              <h3 class="mb-3 text-sm font-semibold text-foreground">Doğrulama Bilgileri</h3>
              <div class="space-y-2">
                <div v-if="certificate.credential_id" class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-xs text-muted-foreground">Sertifika ID</p>
                    <p class="font-mono text-sm text-foreground">{{ certificate.credential_id }}</p>
                  </div>
                </div>
                <div v-if="certificate.credential_url">
                  <a
                    :href="certificate.credential_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Sertifikayı Doğrula
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Section -->
          <div class="space-y-6">
            <!-- Header -->
            <div>
              <div class="mb-4 flex items-start justify-between">
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-foreground sm:text-3xl">{{ certificate.title }}</h1>
                  <p class="mt-2 text-lg text-muted-foreground">{{ certificate.issuer }}</p>
                </div>
                <Link v-if="isLoggedIn" :href="route('certificates.edit', certificate.id)" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Düzenle
                </Link>
              </div>

              <!-- Status Badge -->
              <div class="flex items-center gap-2">
                <span
                  v-if="certificate.status === 'active'"
                  class="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400"
                >
                  <svg class="mr-1.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Aktif
                </span>
                <span
                  v-else-if="certificate.status === 'expired'"
                  class="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive"
                >
                  Süresi Doldu
                </span>
                <span
                  v-else
                  class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground"
                >
                  Taslak
                </span>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg border border-border bg-card p-4">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Alınma Tarihi
                </div>
                <p class="mt-2 text-lg font-semibold text-foreground">{{ formatDate(certificate.issue_date) }}</p>
              </div>
              <div v-if="certificate.expiry_date" class="rounded-lg border border-border bg-card p-4">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Geçerlilik Sonu
                </div>
                <p class="mt-2 text-lg font-semibold text-foreground">{{ formatDate(certificate.expiry_date) }}</p>
              </div>
            </div>

            <!-- Description -->
            <div v-if="certificate.description" class="rounded-lg border border-border bg-card p-4">
              <h3 class="mb-2 text-sm font-semibold text-foreground">Açıklama</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ certificate.description }}</p>
            </div>

            <!-- Skills -->
            <div v-if="certificate.skills && certificate.skills.length > 0" class="rounded-lg border border-border bg-card p-4">
              <h3 class="mb-3 text-sm font-semibold text-foreground">İlgili Beceriler</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(skill, index) in certificate.skills"
                  :key="index"
                  class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckScreen>
  </LayoutCertificates>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import LayoutCertificates from './_layouts/LayoutCertificates.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  certificate: Object,
  screen: Object,
});

const page = usePage();
const isLoggedIn = computed(() => page.props.auth?.user);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>
