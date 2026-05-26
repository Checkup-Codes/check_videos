<template>
  <LayoutCertificates>
    <template #screen>
      <CheckScreen>
        <PageShell>
          <PageHeader title="Sertifikalar" :description="`${certificates.length} sertifika`" />

          <div
            v-if="certificates.length > 0"
            class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <Link
              v-for="certificate in certificates"
              :key="certificate.id"
              :href="route('certificates.show', certificate.slug)"
              class="group block"
            >
              <div class="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img
                  v-if="certificate.image"
                  :src="certificate.image"
                  :alt="certificate.title"
                  class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div v-else class="flex h-full items-center justify-center">
                  <svg class="h-12 w-12 text-muted-foreground/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <span
                  v-if="certificate.status === 'expired'"
                  class="absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground"
                >
                  Süresi doldu
                </span>
                <span
                  v-else-if="certificate.status === 'draft'"
                  class="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                >
                  Taslak
                </span>
              </div>

              <div class="mt-3 space-y-1 pr-1">
                <h3
                  class="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary"
                  :title="certificate.title"
                >
                  {{ certificate.title }}
                </h3>
                <p class="line-clamp-1 text-xs text-muted-foreground">
                  {{ certificate.issuer }} · {{ formatDate(certificate.issue_date) }}
                </p>
              </div>
            </Link>
          </div>

          <div v-else class="rounded-xl border border-dashed border-border py-16 text-center">
            <svg class="mx-auto h-14 w-14 text-muted-foreground/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="mt-4 text-base font-medium text-foreground">Henüz sertifika yok</h3>
            <p class="mt-1 text-sm text-muted-foreground">Sidebar'dan yeni sertifika ekleyebilirsiniz.</p>
          </div>
        </PageShell>
      </CheckScreen>
    </template>
  </LayoutCertificates>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import LayoutCertificates from './_layouts/LayoutCertificates.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import PageShell from '@/Components/CekapUI/Layout/PageShell.vue';
import PageHeader from '@/Components/CekapUI/Layout/PageHeader.vue';

defineProps({
  certificates: {
    type: Array,
    default: () => [],
  },
  screen: Object,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
