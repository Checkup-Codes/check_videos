<template>
  <nav class="w-full space-y-1 bg-background px-2 py-1">
    <NavItem href="/" icon="home" label="Ana Sayfa" :is-compact="isCompact" />
    <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-compact="isCompact" />
    <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" :is-compact="isCompact" />
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

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
