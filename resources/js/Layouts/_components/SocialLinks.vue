<template>
  <nav class="w-full">
    <h3 class="mb-2 text-center text-xs opacity-70">Bizi Takip Edin</h3>
    <div class="flex flex-row justify-center gap-1 py-1">
      <SocialLink href="https://www.instagram.com/checkup_codes/" :icon="['fab', 'instagram']" label="Instagram" />
      <SocialLink href="https://www.youtube.com/@checkupcodes/" :icon="['fab', 'youtube']" label="YouTube" />
      <SocialLink href="https://github.com/cekapykp" :icon="['fab', 'github']" label="GitHub" />
      <SocialLink href="https://www.linkedin.com/in/cekap/" :icon="['fab', 'linkedin']" label="LinkedIn" />
      <SocialLink href="https://medium.com/@cekapykp" :icon="['fab', 'medium']" label="Medium" />
      <SocialLink href="https://x.com/checkupcodes" :icon="['fab', 'twitter']" label="Twitter" />
    </div>
  </nav>
</template>

<script setup>
import SocialLink from '../../Components/CekapUI/Buttons/SocialLink.vue';
</script>
