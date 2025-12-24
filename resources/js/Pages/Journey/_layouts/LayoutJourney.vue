<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckScreen>
      <slot name="screen"></slot>
  </CheckScreen>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { computed } from 'vue';

defineOptions({
  name: 'LayoutJourney',
});

const page = usePage();

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Title
const titleName = computed(() => 'Yolculuk');
</script>


