<template>
  <CheckScreen>
    <!-- Animated page intro -->
    <IntroScreen ref="introRef" title="Yazılar" />
  </CheckScreen>
</template>

<script setup>
// Import UI components
import { ref } from 'vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import IntroScreen from '@/Components/CekapUI/Typography/IntroScreen.vue';
import { useGsapFadeIn } from '@/Pages/WritesCategories/_utils/useGsapAnimation.js';

// Ref for the animated intro
const introRef = ref(null);

// Animate the intro section with GSAP fade-in/slide-in
useGsapFadeIn(introRef, { y: 32, duration: 0.8, ease: 'power2.out' });
</script>
