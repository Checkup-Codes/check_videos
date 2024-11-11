<template>
  <div class="relative">
    <div v-if="flashSuccess" class="fixed right-4 top-10 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>
    <div class="fixed z-30 mt-14 w-full shadow-lg shadow-color-one lg:mt-0 lg:w-[27%]">
      <div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black">
        <div class="rounded border-b-4 border-blue-100 p-2">Projeler</div>
        <Link href="/lessons/create" class="underline" v-if="props.auth.user">Yeni Ders Ekle</Link>
      </div>

      <div class="h-[100vh] overflow-auto" ref="scrollContainer" @scroll="handleScroll">
        <Link href="/services" :class="getLinkClasses(`/services`)">
          <div class="font-semibold">Servislerimiz</div>
          <div class="mt-1 flex justify-between text-xs text-gray-500">
            <span>13 adet servis</span>
            <span>100 adet görüntülendi</span>
          </div>
        </Link>
        <div v-if="auth.user">
          <Link href="/services/create" :class="getLinkClasses(`/services/create`)">
            <div class="font-semibold">Hizmet olustur</div>
            <div class="mt-1 flex justify-between text-xs text-gray-500">
              <span>13 adet hizmet</span>
              <span>100 adet görüntülendi</span>
            </div>
          </Link>

          <Link href="/projects" :class="getLinkClasses(`/projects`)">
            <div class="font-semibold">Projects</div>
            <div class="mt-1 flex justify-between text-xs text-gray-500">
              <span>13 adet proje</span>
              <span>100 adet görüntülendi</span>
            </div>
          </Link>

          <Link href="/customers" :class="getLinkClasses(`/customers`)">
            <div class="font-semibold">Customers</div>
            <div class="mt-1 flex justify-between text-xs text-gray-500">
              <span>13 adet Müşteri</span>
              <span>100 adet görüntülendi</span>
            </div>
          </Link>
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
    ? 'border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-sm bg-color-one text-black'
    : 'border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md text-gray-700 hover:bg-color-one hover:shadow-sm transition-all duration-200';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
