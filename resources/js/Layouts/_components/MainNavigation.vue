<template>
  <nav class="w-full">
    <NavItem href="/" icon="home" label="Ana Sayfa" shortcut="1" />
    <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" shortcut="2" />
    <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" shortcut="3" />
    <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" shortcut="4" />
    <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" shortcut="5" />
  </nav>
</template>

<script setup>
import NavItem from '../../Components/CekapUI/Buttons/NavItem.vue';
</script>
