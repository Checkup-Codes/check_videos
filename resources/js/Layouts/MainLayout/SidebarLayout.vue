<template>
  <aside class="z-20 col-span-1 h-full border-theme bg-theme-background text-theme-text">
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
                <h2 class="text-lg font-medium">Check-up Codes</h2>
              </div>
            </div>
          </div>

          <div
            class="backface-hidden absolute inset-0 flex flex-col items-center justify-center space-y-4 p-4"
            style="transform: rotateY(180deg)"
          >
            <div class="flex items-center justify-between space-x-4 rounded-lg bg-theme-background p-3">
              <div class="flex items-center space-x-3">
                <button
                  @click="toggleThemeMode"
                  class="relative flex h-5 w-10 items-center rounded-full bg-gray-300 px-1 shadow-inner transition-all duration-300"
                  :class="{
                    'bg-primary-500': selectedTheme === 'dark',
                    'bg-gray-300': selectedTheme === 'light',
                  }"
                >
                  <span
                    class="absolute -left-4 top-[2px] h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300"
                    :class="{
                      'translate-x-9': selectedTheme === 'dark',
                      'translate-x-5': selectedTheme === 'light',
                    }"
                  ></span>
                </button>
              </div>

              <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-2">
                  <button
                    v-for="(palette, name) in themeStore.palettes"
                    :key="name"
                    @click="applyPalette(name)"
                    class="h-4 w-4 rounded-full border-2 transition-transform hover:scale-110"
                    :style="{ background: palette.light.colors.primary }"
                    :class="{
                      'border-primary-500': currentPalette === name,
                      'border-gray-300': currentPalette !== name,
                    }"
                  >
                    <span
                      v-if="currentPalette === name"
                      class="block h-full w-full rounded-full bg-black opacity-20"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex space-x-4">
              <Button size="xsmall" @click="resetThemeSettings">Sıfırla</Button>

              <Button size="xsmall" @click="flipCard">Geri Dön</Button>
              <Link href="/login">
                <Button size="xsmall"> L </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-full border-theme" />

      <!-- Ana navigasyon -->
      <nav class="w-full space-y-2 bg-theme-background p-2">
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

      <hr class="w-full border-theme" />

      <!-- Sosyal medya linkleri -->
      <nav class="w-full space-y-2 bg-theme-background px-2">
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
import { Link, usePage } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Inertia } from '@inertiajs/inertia';
import { useThemeStore } from '@/Stores/themeStore';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

const { props } = usePage();
const imagePath = ref('/images/checkup_codes_logo.png');
const currentUrl = ref(window.location.pathname);
const auth = ref(props.auth);

const themeStore = useThemeStore();
const currentPalette = ref('modern');
const selectedTheme = ref(themeStore.currentTheme);

const isFlipped = ref(false);
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};

const applyPalette = (paletteName) => {
  currentPalette.value = paletteName;
  themeStore.applyPalette(paletteName);
  localStorage.setItem('selectedPalette', paletteName);
};

const toggleThemeMode = () => {
  selectedTheme.value = selectedTheme.value === 'light' ? 'dark' : 'light';
  themeStore.setTheme(selectedTheme.value);
  localStorage.setItem('selectedTheme', selectedTheme.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('selectedTheme');
  const savedPalette = localStorage.getItem('selectedPalette');

  if (savedTheme) {
    selectedTheme.value = savedTheme;
    themeStore.setTheme(savedTheme);
  }

  if (savedPalette) {
    currentPalette.value = savedPalette;
    themeStore.applyPalette(savedPalette);
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
    ? 'block cursor-pointer px-4 py-2 border-l-4 hover:bg-primary-100 bg-primary-100 border-primary-500'
    : 'block cursor-pointer px-2 py-2 hover:bg-primary-100';
};

const resetThemeSettings = () => {
  localStorage.removeItem('selectedTheme');
  localStorage.removeItem('selectedPalette');
  selectedTheme.value = 'light';
  currentPalette.value = 'modern';
  themeStore.setTheme('light');
  themeStore.applyPalette('modern');
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
