<template>
  <div class="relative">
    <div v-if="flashSuccess" class="fixed right-4 top-10 z-50">
      <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
        <strong class="font-bold">Başarılı! </strong>
        <span class="block sm:inline">{{ flashSuccess }}</span>
      </div>
    </div>
    <div class="shadow-color-one fixed z-30 mt-14 w-full shadow-lg lg:mt-0 lg:w-[27%]">
      <div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black">
        <div class="rounded border-b-4 border-blue-100 p-2">Derslerimiz</div>
        <Link href="/lessons/create" class="underline" v-if="props.auth.user">Yeni Ders Ekle</Link>
      </div>

      <div class="h-[100vh] overflow-auto" ref="scrollContainer" @scroll="handleScroll">
        <div class="bg-sidebar sticky top-0 z-20">
          <div v-for="lesson in lessons" :key="lesson.id" class="py-1">
            <Link
              :href="route('lessons.show', { lesson: lesson.slug })"
              :class="getLinkClasses(`/lessons/${lesson.slug}`)"
              class="px-2 py-1"
            >
              <div class="flex justify-between">
                <div class="py-1 font-bold">{{ lesson.title }}</div>
                <div>
                  <Link
                    v-if="props.auth.user"
                    :href="route('lessons.edit', { lesson: lesson.slug })"
                    class="flex p-1 underline"
                    >Dersi Güncelle</Link
                  >
                </div>
              </div>

              <div class="flex">
                <div class="py-0.5 text-sm text-gray-400">{{ formatDate(lesson.created_at) }}</div>
              </div>
            </Link>
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
const lessons = ref(props.lessons);

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
