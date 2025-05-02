<template>
  <nav class="w-full">
    <SocialLink
      href="https://www.instagram.com/checkup_codes/"
      :icon="['fab', 'instagram']"
      label="Instagram"
      shortcut="i"
    />
    <SocialLink href="https://www.youtube.com/@checkupcodes/" :icon="['fab', 'youtube']" label="YouTube" shortcut="y" />
    <SocialLink href="https://github.com/cekapykp" :icon="['fab', 'github']" label="GitHub" shortcut="g" />
    <SocialLink href="https://www.linkedin.com/in/cekap/" :icon="['fab', 'linkedin']" label="LinkedIn" shortcut="l" />
    <SocialLink href="https://medium.com/@cekapykp" :icon="['fab', 'medium']" label="Medium" shortcut="m" />
    <SocialLink href="https://x.com/checkupcodes" :icon="['fab', 'twitter']" label="Twitter" shortcut="t" />
  </nav>
</template>

<script setup>
import SocialLink from '../../Components/CekapUI/Buttons/SocialLink.vue';
</script>
