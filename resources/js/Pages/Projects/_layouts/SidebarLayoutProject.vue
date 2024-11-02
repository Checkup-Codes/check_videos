<template>
  <div class="relative">
    <div v-if="flashSuccess" class="fixed right-4 top-10 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>
    <div class="fixed z-30 mt-14 w-full shadow-lg shadow-subsidebar-shadow lg:mt-0 lg:w-[27%]">
      <div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black">
        <div class="rounded border-b-4 border-blue-100 p-2">Projeler</div>
        <Link href="/lessons/create" class="underline" v-if="props.auth.user">Yeni Ders Ekle</Link>
      </div>

      <div class="h-[100vh] overflow-auto" ref="scrollContainer" @scroll="handleScroll">
        <div class="sticky top-0 z-20">
          <div class="p-3">
            <Link href="/services">Servislerimiz</Link>
          </div>
          <div class="p-3">
            <Link href="/services/create">Hizmet olustur</Link>
          </div>
          <div class="p-3">
            <Link href="/projects">Projelerim</Link>
          </div>
          <div class="p-3">
            <Link href="/customers">Müşteriler</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePage, Link, useForm, router } from '@inertiajs/vue3';

const { props, url } = usePage();
const scrollPosition = ref(0);
const scrollContainer = ref(null);
const flashSuccess = ref(props.flash.success);
const auth = props.auth;

const handleScroll = () => {
  scrollPosition.value = scrollContainer.value.scrollTop;
  localStorage.setItem('scrollPosition', scrollPosition.value);
};

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }

  const savedScrollPosition = localStorage.getItem('scrollPosition');
  if (savedScrollPosition) {
    scrollContainer.value.scrollTop = savedScrollPosition;
  }

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const getLinkClasses = (href) => {
  return url === href
    ? 'block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg'
    : 'block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
