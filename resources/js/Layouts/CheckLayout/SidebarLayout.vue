<template>
  <div class="z-20 col-span-1 shadow-lg">
    <div class="h-full bg-sidebar text-sm">
      <Link
        href="/"
        class="m-2 block cursor-pointer rounded p-2 text-black duration-200 hover:bg-gray-900 hover:text-white hover:shadow-lg"
        @click.prevent="setActiveMenu('home')"
      >
        <div class="flex items-center">
          <img :src="imagePath" alt="Yakup Sarı" class="h-10 w-12 rounded-full" />
          <div class="p-2">
            <div class="font-bold">Yakup Sarı</div>
            <div>Software Engineer</div>
          </div>
        </div>
      </Link>
      <Link href="/" :class="getLinkClasses('home')" @click.prevent="setActiveMenu('home')">
        <font-awesome-icon icon="home" class="mr-2" /> Ana Sayfa
      </Link>
      <Link href="/writes" :class="getLinkClasses('writes')" @click.prevent="setActiveMenu('writes')">
        <font-awesome-icon icon="fa-solid fa-pencil" /> Yazılar
      </Link>
      <Link href="/factory" :class="getLinkClasses('factory')" @click.prevent="setActiveMenu('factory')">
        <font-awesome-icon icon="industry" class="mr-2" /> Fabrika
      </Link>
      <Link
        href="/typescript-tutorial"
        :class="getLinkClasses('typescript')"
        @click.prevent="setActiveMenu('typescript')"
      >
        <font-awesome-icon icon="book" class="mr-2" /> Typescript Tutorial
      </Link>
      <hr />
      <Link href="/instagram" :class="getLinkClasses('instagram')" @click.prevent="setActiveMenu('instagram')">
        <font-awesome-icon :icon="['fab', 'instagram']" class="mr-2" /> Instagram
      </Link>
      <Link href="/youtube" :class="getLinkClasses('youtube')" @click.prevent="setActiveMenu('youtube')">
        <font-awesome-icon :icon="['fab', 'youtube']" class="mr-2" /> Youtube
      </Link>
      <Link href="/github" :class="getLinkClasses('github')" @click.prevent="setActiveMenu('github')">
        <font-awesome-icon :icon="['fab', 'github']" class="mr-2" /> Github
      </Link>
      <Link href="/linkedin" :class="getLinkClasses('linkedin')" @click.prevent="setActiveMenu('linkedin')">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="mr-2" /> Linkedin
      </Link>
      <Link href="/medium" :class="getLinkClasses('medium')" @click.prevent="setActiveMenu('medium')">
        <font-awesome-icon :icon="['fab', 'medium']" class="mr-2" /> Medium
      </Link>
      <Link href="/twitter" :class="getLinkClasses('twitter')" @click.prevent="setActiveMenu('twitter')">
        <font-awesome-icon :icon="['fab', 'twitter']" class="mr-2" /> Twitter
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useStore } from 'vuex';

const imagePath = ref('/images/cekap.png');
const store = useStore();

const setActiveMenu = (menu) => {
  store.dispatch('ActiveMenu/setActiveMenu', menu);
};

const activeMenu = computed(() => store.getters['ActiveMenu/activeMenu']);

const baseClasses = 'm-2 block cursor-pointer rounded-lg p-2 text-black transition-all transition-colors duration-200';
const hoverClasses = 'hover:bg-gray-900 hover:px-2.5 hover:text-white hover:shadow-lg';
const activeClasses = 'bg-gray-900 text-white font-bold shadow-lg';

const getLinkClasses = (menu) => {
  return activeMenu.value === menu ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${hoverClasses}`;
};
</script>

<style scoped>
.grid-cols-withsidebar {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.grid-cols-withoutsidebar {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
