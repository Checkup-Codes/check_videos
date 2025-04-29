<template>
  <aside class="z-20 col-span-1 h-full border-gray-200 bg-white text-gray-800">
    <div class="flex flex-col items-center text-sm">
      <div class="w-full pb-4" style="perspective: 1000px">
        <div
          class="h-full w-full transition-transform duration-500"
          style="transform-style: preserve-3d"
          :class="{ 'rotate-y-180': isFlipped }"
        >
          <div class="backface-hidden inset-0 p-4 text-center" style="transform: rotateY(0deg)">
            <div class="w-full text-center" @click="flipCard">
              <div class="flex flex-col items-center">
                <img :src="imagePath" alt="Logo" class="mb-2 h-14 w-14 rounded-full" />
                <h2 class="text-lg font-medium">{{ seoTitle }}</h2>
              </div>
            </div>
          </div>

          <div
            class="backface-hidden absolute inset-0 flex flex-col items-center justify-center space-y-4 p-4"
            style="transform: rotateY(180deg)"
          >
            <div class="flex space-x-4">
              <Button size="xsmall" @click="flipCard">Geri Dön</Button>
              <Link href="/login">
                <Button size="xsmall"> L </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-full border-gray-200" />

      <!-- Ana navigasyon -->
      <nav class="w-full space-y-2 bg-white p-2">
        <Link href="/" :class="getLinkClasses('/')"> <font-awesome-icon icon="home" class="mr-2" /> Ana Sayfa </Link>
        <Link href="/writes" :class="getLinkClasses(['/writes'])">
          <font-awesome-icon icon="fa-solid fa-pencil" class="mr-2" /> Yazılar
        </Link>
        <Link href="/categories" :class="getLinkClasses(['/categories'])">
          <font-awesome-icon icon="fa-solid fa-book" class="mr-2" /> Kategoriler
        </Link>
        <Link href="/rendition/words" :class="getLinkClasses(['/rendition/words'])">
          <font-awesome-icon icon="fa-solid fa-globe" class="mr-2" /> Kelimeler
        </Link>
        <Link href="/versions" :class="getLinkClasses(['/versions'])">
          <font-awesome-icon icon="fa-solid fa-sync" class="mr-2" /> Versiyonlar
        </Link>
      </nav>

      <hr class="w-full border-gray-200" />

      <!-- Sosyal medya linkleri -->
      <nav class="w-full space-y-2 bg-white px-2">
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
import { ref, watch, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import axios from 'axios';

const { props } = usePage();
const imagePath = ref('/images/checkup_codes_logo.png');
const currentUrl = ref(window.location.pathname);
const auth = ref(props.auth);

const isFlipped = ref(false);
const seoTitle = ref('');

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/seo/home');
    if (response.data && response.data.title) {
      seoTitle.value = response.data.title;
    }
  } catch (error) {
    console.error('Error fetching SEO title:', error);
  }
});

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

router.on('navigate', (event) => {
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
    ? 'block cursor-pointer px-4 py-2 border-l-4 hover:bg-blue-100 bg-blue-100 border-blue-500'
    : 'block cursor-pointer px-2 py-2 hover:bg-blue-100';
};
</script>

<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
