<template>
  <nav class="w-full space-y-1 bg-base-200 px-2">
    <NavItem href="/" icon="home" label="Ana Sayfa" shortcut="1" />
    <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" shortcut="2" />
    <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" shortcut="3" />
    <NavItem v-if="isLoggedIn" href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" shortcut="4" />
    <NavItem v-if="isLoggedIn" href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" shortcut="5" />
  </nav>
</template>

<script setup>
import NavItem from '../_components/NavItem.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const isLoggedIn = computed(() => !!(page.props.auth && page.props.auth.user));
</script>
