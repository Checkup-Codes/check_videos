<template>
  <!-- Global Sidebar - Hidden on mobile, shown on desktop -->
  <nav
    class="hidden h-full w-56 flex-col border-r border-border bg-muted/80 backdrop-blur-xl supports-[backdrop-filter]:bg-muted/70 dark:border-border dark:bg-card dark:shadow-[var(--shadow-sm)] lg:flex"
  >
    <div class="flex min-h-0 flex-1 flex-col px-3 py-3">
      <div class="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" orientation="vertical" />
        <TabNavItem
          href="/writes"
          icon="fa-solid fa-pencil"
          label="Yazılar"
          :is-active="isActiveRoute('/writes') || isActiveRoute('/categories')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showJourney"
          href="/journey"
          icon="fa-solid fa-road"
          label="Yolculuk"
          :is-active="isActiveRoute('/journey')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showCertificates"
          href="/certificates"
          icon="fa-solid fa-award"
          label="Sertifikalar"
          :is-active="isActiveRoute('/certificates')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showWorkspaceTab"
          href="/workspace"
          icon="fa-solid fa-briefcase"
          label="Çalışma Alanım"
          :is-active="isActiveRoute('/workspace')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showBookmarksTab"
          href="/bookmarks"
          icon="fa-solid fa-bookmark"
          label="Yer İmleri"
          :is-active="isActiveRoute('/bookmarks')"
          orientation="vertical"
        />

        <TabNavItem
          v-if="showTests"
          href="/test-categories"
          icon="fa-solid fa-clipboard-question"
          label="Testler"
          :is-active="isActiveRoute('/test-categories') || isActiveRoute('/tests')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showWords"
          href="/rendition/words"
          icon="fa-solid fa-globe"
          label="Kelimeler"
          :is-active="isActiveRoute('/rendition')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showServices"
          href="/services"
          icon="fa-solid fa-bolt"
          label="Hizmetler"
          :is-active="isActiveRoute('/services') || isActiveRoute('/projects') || isActiveRoute('/customers')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="showVersions"
          href="/versions"
          icon="fa-solid fa-sync"
          label="Versiyonlar"
          :is-active="isActiveRoute('/versions')"
          orientation="vertical"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import TabNavItem from '@/Layouts/_components/TabNavItem.vue';
import { useModuleVisibility, useIsLoggedIn } from '@/composables/useModuleVisibility';

const page = usePage();
const isLoggedIn = useIsLoggedIn();

const showTests = useModuleVisibility('tests');
const showWords = useModuleVisibility('words');
const showServices = useModuleVisibility('services');
const showVersions = useModuleVisibility('versions');
const showCertificates = useModuleVisibility('certificates');
const showBookmarksModule = useModuleVisibility('bookmarks');
const showWorkspaceModule = useModuleVisibility('workspace');

const workspaceCount = computed(() => page.props.workspaceCount || 0);
const bookmarkCount = computed(() => page.props.bookmarkCount || 0);

const showWorkspaceTab = computed(
  () => showWorkspaceModule.value && (isLoggedIn.value || workspaceCount.value > 0)
);
const showBookmarksTab = computed(
  () => showBookmarksModule.value && (isLoggedIn.value || bookmarkCount.value > 0)
);

// Yolculuk: panelde ayrı switch yok; domain hidden_features dışındaysa herkese görünür
const showJourney = computed(() => !(page.props.hiddenFeatures ?? []).includes('journey'));

const isActiveRoute = (path) => {
  const currentUrl = page.url || '';

  if (path === '/') {
    return currentUrl === '/' || currentUrl === '';
  }

  return currentUrl.startsWith(path);
};
</script>
