<template>
  <Head title="Ziyaretçi Görünürlüğü" />

  <CheckScreen>
    <PageShell width="content" class="space-y-6">
      <PageHeader
        title="Ziyaretçi Görünürlüğü"
        description="Giriş yapmayan ziyaretçilerin hangi bölümleri görebileceğini bu domain için ayarlayın."
      />

      <div
        v-if="hiddenFeatures.length"
        class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
      >
        <p class="font-medium">Domain yapılandırması</p>
        <p class="mt-1 text-xs opacity-90">
          Şu modüller <code class="rounded bg-background/50 px-1">config/domains.php</code> üzerinden tamamen gizli:
          {{ hiddenFeatures.join(', ') }}
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div class="rounded-lg border border-border bg-card divide-y divide-border">
          <div
            v-for="module in modules"
            :key="module.key"
            class="flex items-start justify-between gap-4 px-4 py-4 sm:px-6"
          >
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium text-foreground">{{ module.label }}</p>
                <span
                  v-if="module.locked"
                  class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  Sadece giriş
                </span>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">{{ module.description }}</p>
            </div>

            <button
              type="button"
              role="switch"
              :aria-checked="form[module.key]"
              :disabled="module.locked || isDomainHidden(module.key)"
              :class="[
                'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                form[module.key] ? 'bg-primary' : 'bg-muted',
                module.locked || isDomainHidden(module.key) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              ]"
              @click="toggle(module.key, module.locked)"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition',
                  form[module.key] ? 'translate-x-5' : 'translate-x-0',
                ]"
              />
            </button>
          </div>
        </div>

        <p class="text-xs text-muted-foreground">
          Açık modüllerde ziyaretçiler yalnızca yayında / herkese açık içerikleri görür. Projelerde müşteri bilgisi
          asla paylaşılmaz.
        </p>

        <div class="flex justify-end">
          <button type="submit" :disabled="form.processing" class="primary-btn">
            {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </PageShell>
  </CheckScreen>
</template>

<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import PageShell from '@/Components/CekapUI/Layout/PageShell.vue';
import PageHeader from '@/Components/CekapUI/Layout/PageHeader.vue';

const props = defineProps({
  modules: {
    type: Array,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  currentDomain: {
    type: String,
    required: true,
  },
  hiddenFeatures: {
    type: Array,
    default: () => [],
  },
});

const page = usePage();

const form = useForm({
  tests: props.settings.tests ?? false,
  words: props.settings.words ?? false,
  services: props.settings.services ?? false,
  projects: props.settings.projects ?? false,
  certificates: props.settings.certificates ?? false,
  bookmarks: props.settings.bookmarks ?? false,
  workspace: props.settings.workspace ?? false,
});

const featureMap = {
  tests: 'tests',
  words: 'words',
  services: 'services',
  projects: 'projects',
  certificates: 'certificates',
  bookmarks: 'bookmarks',
  workspace: 'workspaces',
};

const isDomainHidden = (key) => {
  const feature = featureMap[key];
  return feature && props.hiddenFeatures.includes(feature);
};

const toggle = (key, locked) => {
  if (locked || isDomainHidden(key)) return;
  form[key] = !form[key];
};

const submit = () => {
  form.put(route('guest-visibility.update'), {
    preserveScroll: true,
  });
};

if (page.props.flash?.success) {
  // flash handled by layout
}
</script>

<style scoped>
.primary-btn {
  @apply inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50;
}
</style>
