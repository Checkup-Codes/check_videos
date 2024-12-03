<template>
  <aside class="border-color-one bg-screen-bg z-20 col-span-1 border-r-2 shadow-sm">
    <div class="flex flex-col items-center text-sm text-black">
      <!-- Logo -->
      <Link href="/dashboard" class="border-color-one w-full border-b p-4 text-center" @click="$emit('link-clicked')">
        <div class="flex flex-col items-center">
          <img :src="imagePath" alt="Logo" class="mb-2 h-16 w-16 rounded-full shadow-md" />
          <h2 class="text-lg font-semibold">Check-up Codes</h2>
          <p class="text-xs font-light text-gray-600">Kodu yenile, bilgini tazele</p>
        </div>
      </Link>

      <!-- Navigation Links -->
      <nav class="mt-4 w-full space-y-2 px-2">
        <Link href="/" :class="getLinkClasses('/')"> <font-awesome-icon icon="home" class="mr-2" /> Ana Sayfa </Link>
        <Link href="/writes" :class="getLinkClasses(['/writes'])">
          <font-awesome-icon icon="fa-solid fa-pencil" class="mr-2" /> Yazılar
        </Link>
        <Link href="/categories" :class="getLinkClasses(['/categories'])">
          <font-awesome-icon icon="fa-solid fa-book" class="mr-2" /> Kategoriler
        </Link>
        <!-- <Link href="/projects" :class="getLinkClasses(['/projects'])">
          <font-awesome-icon icon="fa-solid fa-folder" class="mr-2" /> Projeler
        </Link> -->
        <!--
        <Link href="/lessons" :class="getLinkClasses(['/lessons'])">
          <font-awesome-icon icon="fa-solid fa-book" class="mr-2" /> Kurslar
        </Link>
        -->
        <Link href="/versions" :class="getLinkClasses(['/versions'])">
          <font-awesome-icon icon="fa-solid fa-sync" class="mr-2" /> Versiyonlar
        </Link>
        <!-- <Link href="/equipments" :class="getLinkClasses(['/equipments'])">
          <font-awesome-icon icon="fa-solid fa-industry" class="mr-2" /> Ekipmanlarım
        </Link> -->
      </nav>

      <!-- Divider -->
      <hr class="border-color-one my-4 w-full" />

      <!-- Social Media Links -->
      <nav class="w-full space-y-2 px-2">
        <a href="https://www.instagram.com/checkup_codes/" target="_blank" :class="getLinkClasses('/instagram')">
          <font-awesome-icon :icon="['fab', 'instagram']" class="mr-2" /> Instagram
        </a>
        <a href="https://www.youtube.com/@checkupcodes/" target="_blank" :class="getLinkClasses('/youtube')">
          <font-awesome-icon :icon="['fab', 'youtube']" class="mr-2" /> YouTube
        </a>
        <a href="https://github.com/cekapykp" target="_blank" :class="getLinkClasses('/github')">
          <font-awesome-icon :icon="['fab', 'github']" class="mr-2" /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/cekap/" target="_blank" :class="getLinkClasses('/linkedin')">
          <font-awesome-icon :icon="['fab', 'linkedin']" class="mr-2" /> LinkedIn
        </a>
        <a href="https://medium.com/@cekapykp" target="_blank" :class="getLinkClasses('/medium')">
          <font-awesome-icon :icon="['fab', 'medium']" class="mr-2" /> Medium
        </a>
        <a href="https://x.com/checkupcodes" target="_blank" :class="getLinkClasses('/twitter')">
          <font-awesome-icon :icon="['fab', 'twitter']" class="mr-2" /> Twitter
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Inertia } from '@inertiajs/inertia';

const { props } = usePage();
const imagePath = ref('/images/checkup_codes_logo.png');
const currentUrl = ref(window.location.pathname);
const auth = ref(props.auth);

watch(
  () => usePage().props.value,
  (newProps) => {
    auth.value = newProps.auth;
    currentUrl.value = newProps.url;
    if (auth.value.user) {
      imagePath.value = auth.value.user.imagePath || '/images/default.png';
    }
  }
);

Inertia.on('navigate', (event) => {
  currentUrl.value = event.detail.page.url;
});

const getLinkClasses = (hrefs) => {
  if (!Array.isArray(hrefs)) {
    hrefs = [hrefs];
  }

  const isActive = hrefs.some((href) => {
    const isRoot = href === '/';
    return isRoot ? currentUrl.value === href : currentUrl.value.startsWith(href);
  });

  return isActive
    ? 'block cursor-pointer px-4 py-2 rounded-md bg-primary-200 transition hover:bg-primary-300 shadow-inner'
    : 'block cursor-pointer px-4 py-2 rounded-md text-gray-800 hover:shadow-inner hover:bg-primary-300 transition';
};
</script>
