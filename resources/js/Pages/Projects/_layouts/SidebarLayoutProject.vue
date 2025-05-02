<template>
  <CheckSubsidebar>
    <div v-if="flashSuccess" class="toast toast-end z-50">
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ flashSuccess }}</span>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">Projeler</h2>
        <Link v-if="auth.user" href="/projects/create" class="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-1 h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni Proje
        </Link>
      </div>

      <div class="h-[calc(100vh-10rem)] overflow-y-auto" ref="scrollContainer" @scroll="handleScroll">
        <Link
          href="/services"
          :class="['my-2 flex flex-col rounded-lg p-3 transition-all duration-200', getLinkClasses('/services')]"
        >
          <div class="font-semibold">Servislerimiz</div>
          <div class="mt-1 flex justify-between text-xs opacity-70">
            <span>Tüm servisler</span>
          </div>
        </Link>

        <div v-if="auth.user" class="mt-4 space-y-2">
          <Link
            href="/services/create"
            :class="[
              'my-2 flex flex-col rounded-lg p-3 transition-all duration-200',
              getLinkClasses('/services/create'),
            ]"
          >
            <div class="font-semibold">Servis Oluştur</div>
            <div class="mt-1 flex justify-between text-xs opacity-70">
              <span>Yeni servis oluştur</span>
            </div>
          </Link>

          <Link
            href="/projects"
            :class="['my-2 flex flex-col rounded-lg p-3 transition-all duration-200', getLinkClasses('/projects')]"
          >
            <div class="font-semibold">Projeler</div>
            <div class="mt-1 flex justify-between text-xs opacity-70">
              <span>Tüm projeler</span>
            </div>
          </Link>

          <Link
            href="/customers"
            :class="['my-2 flex flex-col rounded-lg p-3 transition-all duration-200', getLinkClasses('/customers')]"
          >
            <div class="font-semibold">Müşteriler</div>
            <div class="mt-1 flex justify-between text-xs opacity-70">
              <span>Tüm müşteriler</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';

const page = usePage();
const { props, url } = page;
const scrollPosition = ref(0);
const scrollContainer = ref(null);
const flashSuccess = ref(props.flash?.success);
const auth = computed(() => props.auth);

const handleScroll = () => {
  if (scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollTop;
    localStorage.setItem('projectsScrollPosition', scrollPosition.value);
  }
};

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }

  const savedScrollPosition = localStorage.getItem('projectsScrollPosition');
  if (savedScrollPosition && scrollContainer.value) {
    scrollContainer.value.scrollTop = savedScrollPosition;
  }

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const getLinkClasses = (href) => {
  return url === href
    ? 'bg-primary/10 border-l-4 border-primary shadow-sm'
    : 'hover:bg-base-200 border-l-4 border-transparent';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Tarih formatı hatası:', error);
    return dateString;
  }
};
</script>
