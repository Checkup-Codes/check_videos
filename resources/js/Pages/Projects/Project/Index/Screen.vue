<template>
  <CheckScreen>
    <IntroScreen title="Projeler" />
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import IntroScreen from '@/Components/CekapUI/Typography/IntroScreen.vue';

const { props } = usePage();
const projects = computed(() => props.projects || []);
</script>
