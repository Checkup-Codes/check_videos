<template>
  <CheckScreen>
    <IntroScreen title="Yazılar" />
  </CheckScreen>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import IntroScreen from '@/Components/CekapUI/Typography/IntroScreen.vue';

const { props } = usePage();
console.log(props);
</script>
