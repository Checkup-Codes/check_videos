<template>
  <LayoutCertificates>
    <CheckScreen>
      <div class="p-6 pt-12 sm:p-8 sm:pt-16">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-foreground sm:text-3xl">Sertifikalar</h1>
          <p class="mt-2 text-sm text-muted-foreground">{{ certificates.length }} sertifika</p>
        </div>

        <!-- Certificates Grid -->
        <div v-if="certificates.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            v-for="certificate in certificates"
            :key="certificate.id"
            :href="route('certificates.show', certificate.slug)"
            class="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
          >
            <!-- Image -->
            <div class="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                v-if="certificate.image"
                :src="certificate.image"
                :alt="certificate.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div v-else class="flex h-full items-center justify-center">
                <svg class="h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <!-- Status Badge -->
              <div class="absolute right-3 top-3">
                <span
                  v-if="certificate.status === 'expired'"
                  class="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground"
                >
                  Süresi Doldu
                </span>
                <span
                  v-else-if="certificate.status === 'draft'"
                  class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                >
                  Taslak
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3 class="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary">
                {{ certificate.title }}
              </h3>
              <p class="mb-3 text-sm text-muted-foreground">{{ certificate.issuer }}</p>
              
              <!-- Date -->
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(certificate.issue_date) }}</span>
              </div>

              <!-- Skills -->
              <div v-if="certificate.skills && certificate.skills.length > 0" class="mt-3 flex flex-wrap gap-1">
                <span
                  v-for="(skill, index) in certificate.skills.slice(0, 3)"
                  :key="index"
                  class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="certificate.skills.length > 3"
                  class="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  +{{ certificate.skills.length - 3 }}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <!-- Empty State -->
        <div v-else class="py-12 text-center">
          <svg class="mx-auto h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-4 text-lg font-semibold text-foreground">Henüz sertifika yok</h3>
          <p class="mt-2 text-sm text-muted-foreground">Sidebar'daki + butonundan ilk sertifikanızı ekleyebilirsiniz</p>
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
  certificates: Array,
  screen: Object,
});

const page = usePage();
const isLoggedIn = computed(() => page.props.auth?.user);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
};
</script>
