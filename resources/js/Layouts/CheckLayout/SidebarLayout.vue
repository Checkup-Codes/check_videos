<template>
  <div class="z-20 col-span-1 shadow-sm shadow-[#212e7b]">
    <div class="h-full bg-sidebar text-sm">
      <Link href="/dashboard" :class="getLinkClasses('/login')" @click="$emit('link-clicked')">
        <div class="flex items-center">
          <img :src="imagePath" alt="Yakup Sarı" class="h-12 w-12 rounded-full" />
          <div class="p-2">
            <div class="text-md font-bold">Check-up Codes</div>
            <div class="text-xs font-thin">Kodu yenile, bilgini tazele</div>
          </div>
        </div>
      </Link>
      <Link href="/" :class="getLinkClasses('/')" @click="$emit('link-clicked')">
        <font-awesome-icon icon="home" class="mr-2" /> Ana Sayfa
      </Link>
      <Link href="/writes" :class="getLinkClasses(['/writes'])" @click="$emit('link-clicked')">
        <font-awesome-icon icon="fa-solid fa-pencil" class="pr-1" /> Yazılar
      </Link>
      <Link href="/lessons" :class="getLinkClasses(['/lessons'])" @click="$emit('link-clicked')">
        <font-awesome-icon icon="fa-solid fa-book" class="pr-1" /> Dersler
      </Link>
      <Link href="/versions" :class="getLinkClasses(['/versions'])" @click="$emit('link-clicked')">
        <font-awesome-icon icon="fa-solid fa-sync" class="pr-1" /> Versiyonlar
      </Link>
      <!-- 
      <Link href="/categories" :class="getLinkClasses(['/categories'])" @click="$emit('link-clicked')">
        <font-awesome-icon icon="fa-solid fa-folder" class="pr-1" /> Kategoriler
      </Link> -->
      <Link href="/equipments" :class="getLinkClasses(['/equipments'])" @click="$emit('link-clicked')">
        <font-awesome-icon icon="fa-solid fa-industry" class="pr-1" /> Ekipmanlarım
      </Link>
      <!-- <Link href="/bookmarks" :class="getLinkClasses('/bookmarks')" @click="$emit('link-clicked')">
        <font-awesome-icon :icon="['fas', 'bookmark']" class="mr-2" /> Yer İmleri
      </Link> -->
      <hr />
      <a
        href="https://www.instagram.com/checkup_codes/"
        target="_blank"
        :class="getLinkClasses('/instagram')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'instagram']" class="mr-2" /> Instagram
      </a>
      <a
        href="https://www.youtube.com/@checkupcodes/"
        target="_blank"
        :class="getLinkClasses('/youtube')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'youtube']" class="mr-2" /> Youtube
      </a>
      <a
        href="https://github.com/cekapykp"
        target="_blank"
        :class="getLinkClasses('/github')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'github']" class="mr-2" /> Github
      </a>
      <a
        href="https://www.linkedin.com/in/cekap/"
        target="_blank"
        :class="getLinkClasses('/linkedin')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'linkedin']" class="mr-2" /> Linkedin
      </a>
      <a
        href="https://medium.com/@cekapykp"
        target="_blank"
        :class="getLinkClasses('/medium')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'medium']" class="mr-2" /> Medium
      </a>
      <a
        href="https://x.com/checkupcodes"
        target="_blank"
        :class="getLinkClasses('/twitter')"
        @click="$emit('link-clicked')"
      >
        <font-awesome-icon :icon="['fab', 'twitter']" class="mr-2" /> Twitter
      </a>
      <Link href="/excalidraw" :class="getLinkClasses('/excalidraw')" @click="$emit('link-clicked')">
        <font-awesome-icon :icon="['fas', 'pencil-alt']" class="mr-2" /> Excalidraw
      </Link>
    </div>
  </div>
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
    ? 'block cursor-pointer m-2 text-sm rounded px-3 py-2 text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer m-2 text-sm rounded px-3 py-2 text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg hover:px-4';
};
</script>
