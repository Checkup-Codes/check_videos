<template>
  <div class="z-20 col-span-1 shadow-lg shadow-gray-600">
    <div class="h-full bg-sidebar text-sm">
      <Link href="/login" :class="getLinkClasses('/login')">
        <div class="flex items-center">
          <img :src="auth.user ? imagePath : '/images/default.png'" alt="Yakup Sarı" class="h-12 w-12 rounded-full" />
          <div class="p-2">
            <div v-if="auth.user">
              <div class="font-bold">{{ auth.user.name }}</div>
              <div>Software Engineer</div>
            </div>
            <div v-else>Giriş Yapınız</div>
          </div>
        </div>
      </Link>
      <Link href="/" :class="getLinkClasses('/')"> <font-awesome-icon icon="home" class="mr-2" /> Ana Sayfa </Link>
      <Link href="/writes" :class="getLinkClasses('/writes')">
        <font-awesome-icon icon="fa-solid fa-pencil" class="pr-1" /> Yazılar
      </Link>
      <Link href="/software-products" :class="getLinkClasses('/software-products')">
        <font-awesome-icon icon="fa-solid fa-cube" class="pr-1" /> Yazılım Ürünleri
      </Link>
      <Link href="/bookmarks" :class="getLinkClasses('/bookmarks')">
        <font-awesome-icon :icon="['fas', 'bookmark']" class="mr-2" /> Yer İmleri
      </Link>
      <Link href="/factory" :class="getLinkClasses('/factory')">
        <font-awesome-icon icon="industry" class="mr-2" /> Fabrika
      </Link>
      <Link href="/typescript-tutorial" :class="getLinkClasses('/typescript-tutorial')">
        <font-awesome-icon icon="book" class="mr-2" /> Typescript Tutorial
      </Link>
      <hr />
      <Link href="/instagram" :class="getLinkClasses('/instagram')">
        <font-awesome-icon :icon="['fab', 'instagram']" class="mr-2" /> Instagram
      </Link>
      <Link href="/youtube" :class="getLinkClasses('/youtube')">
        <font-awesome-icon :icon="['fab', 'youtube']" class="mr-2" /> Youtube
      </Link>
      <Link href="/github" :class="getLinkClasses('/github')">
        <font-awesome-icon :icon="['fab', 'github']" class="mr-2" /> Github
      </Link>
      <Link href="/linkedin" :class="getLinkClasses('/linkedin')">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="mr-2" /> Linkedin
      </Link>
      <Link href="/medium" :class="getLinkClasses('/medium')">
        <font-awesome-icon :icon="['fab', 'medium']" class="mr-2" /> Medium
      </Link>
      <Link href="/twitter" :class="getLinkClasses('/twitter')">
        <font-awesome-icon :icon="['fab', 'twitter']" class="mr-2" /> Twitter
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
const imagePath = ref('/images/cekap.png');
const currentUrl = ref(window.location.pathname);
const auth = ref(props.auth);

watch(
  () => usePage().props.value,
  (newProps) => {
    auth.value = newProps.auth;
    currentUrl.value = newProps.url;
    // Update image path if needed
    if (auth.value.user) {
      imagePath.value = auth.user.imagePath || '/images/default.png';
    }
  }
);

Inertia.on('navigate', (event) => {
  currentUrl.value = event.detail.page.url;
});

const getLinkClasses = (href) => {
  const isRoot = href === '/';
  const isActive = isRoot ? currentUrl.value === href : currentUrl.value.startsWith(href);

  return isActive
    ? 'block cursor-pointer m-2 text-sm rounded px-3 py-2 text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer m-2 text-sm rounded px-3 py-2 text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg hover:px-4';
};
</script>
