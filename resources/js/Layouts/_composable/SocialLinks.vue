<template>
  <nav class="w-full bg-base-200 px-2">
    <h3 class="border-t-2 border-base-300 px-3 py-3 text-xs">Hesaplar</h3>
    <SocialLink href="https://www.instagram.com/checkup_codes/" :icon="['fab', 'instagram']" label="Instagram" />
    <SocialLink href="https://www.youtube.com/@checkupcodes/" :icon="['fab', 'youtube']" label="YouTube" />
    <SocialLink href="https://github.com/cekapykp" :icon="['fab', 'github']" label="GitHub" />
    <SocialLink href="https://www.linkedin.com/in/cekap/" :icon="['fab', 'linkedin']" label="LinkedIn" />
    <SocialLink href="https://medium.com/@cekapykp" :icon="['fab', 'medium']" label="Medium" />
    <SocialLink href="https://x.com/checkupcodes" :icon="['fab', 'twitter']" label="Twitter" />
  </nav>
</template>

<script setup>
import SocialLink from '../_components/SocialLink.vue';
</script>
