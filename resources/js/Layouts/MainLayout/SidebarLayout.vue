<template>
  <!-- Global Sidebar - Hidden on mobile, shown on desktop -->
  <nav
    class="hidden h-full w-56 flex-col border-r border-border/70 bg-[rgb(243,243,243)]/95 backdrop-blur-xl dark:bg-background/70 supports-[backdrop-filter]:bg-[rgb(243,243,243)]/85 dark:supports-[backdrop-filter]:bg-background/50 lg:flex"
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
        <TabNavItem href="/journey" icon="fa-solid fa-road" label="Yolculuk" :is-active="isActiveRoute('/journey')" orientation="vertical" />
        <TabNavItem href="/certificates" icon="fa-solid fa-award" label="Sertifikalar" :is-active="isActiveRoute('/certificates')" orientation="vertical" />
        <TabNavItem
          v-if="isLoggedIn || workspaceCount > 0"
          href="/workspace"
          icon="fa-solid fa-briefcase"
          label="Çalışma Alanım"
          :is-active="isActiveRoute('/workspace')"
          orientation="vertical"
        />
        <TabNavItem
          v-if="bookmarkCount > 0"
          href="/bookmarks"
          icon="fa-solid fa-bookmark"
          label="Yer İmleri"
          :is-active="isActiveRoute('/bookmarks')"
          orientation="vertical"
        />

        <template v-if="isLoggedIn">
          <TabNavItem
            href="/test-categories"
            icon="fa-solid fa-clipboard-question"
            label="Testler"
            :is-active="isActiveRoute('/test-categories') || isActiveRoute('/tests')"
            orientation="vertical"
          />
          <TabNavItem
            href="/rendition/words"
            icon="fa-solid fa-globe"
            label="Kelimeler"
            :is-active="isActiveRoute('/rendition')"
            orientation="vertical"
          />
          <TabNavItem
            href="/services"
            icon="fa-solid fa-bolt"
            label="Servisler"
            :is-active="isActiveRoute('/services') || isActiveRoute('/projects') || isActiveRoute('/customers')"
            orientation="vertical"
          />
          <TabNavItem
            href="/versions"
            icon="fa-solid fa-sync"
            label="Versiyonlar"
            :is-active="isActiveRoute('/versions')"
            orientation="vertical"
          />
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import TabNavItem from '@/Layouts/_components/TabNavItem.vue';

const page = usePage();

const isLoggedIn = computed(() => {
  return !!page.props.auth?.user;
});

const workspaceCount = computed(() => {
  return page.props.workspaceCount || 0;
});

const bookmarkCount = computed(() => {
  return page.props.bookmarkCount || 0;
});

const isActiveRoute = (path) => {
  const currentUrl = page.url || '';

  if (path === '/') {
    return currentUrl === '/' || currentUrl === '';
  }

  return currentUrl.startsWith(path);
};
</script>
