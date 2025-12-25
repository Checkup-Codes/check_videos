<template>
  <nav class="w-full space-y-1 bg-background px-2 py-1">
    <NavItem href="/" icon="home" label="Ana Sayfa" :is-compact="isCompact" />
    <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-compact="isCompact" />
    <NavItem href="/journey" icon="fa-solid fa-road" label="Yolculuk" :is-compact="isCompact" />
    <NavItem
      v-if="isLoggedIn || workspaceCount > 0"
      href="/workspace"
      icon="fa-solid fa-briefcase"
      label="Çalışma Alanım"
      :is-compact="isCompact"
    />
    <NavItem
      v-if="isLoggedIn"
      href="/bookmarks"
      icon="fa-solid fa-bookmark"
      label="Yer İmleri"
      :is-compact="isCompact"
    />
    <NavItem
      v-if="isLoggedIn"
      href="/test-categories"
      icon="fa-solid fa-clipboard-question"
      label="Testler"
      :is-compact="isCompact"
    />
    <NavItem v-if="isLoggedIn" href="/services" icon="fa-solid fa-bolt" label="Servisler" :is-compact="isCompact" />
    <NavItem
      v-if="isLoggedIn"
      href="/rendition/words"
      icon="fa-solid fa-globe"
      label="Kelimeler"
      :is-compact="isCompact"
    />
    <NavItem v-if="isLoggedIn" href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" :is-compact="isCompact" />
  </nav>
</template>

<script setup>
import NavItem from '../_components/NavItem.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const isLoggedIn = computed(() => !!(page.props.auth && page.props.auth.user));
const workspaceCount = computed(() => page.props.workspaceCount || 0);

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
