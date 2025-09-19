<template>
  <button @click="toggleTheme" class="btn btn-ghost">
    <template v-if="currentTheme === 'light'">
      <svg class="h-6 w-6 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        />
      </svg>
    </template>
    <template v-else-if="currentTheme === 'dark'">
      <svg class="h-6 w-6 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
        />
      </svg>
    </template>

    <!-- LOTR Light Tema -->
    <template v-else-if="currentTheme === 'lotr-light'">
      <svg class="h-6 w-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12,2L13.09,8.26L20,9L13.09,9.74L12,16L10.91,9.74L4,9L10.91,8.26L12,2Z" />
        <circle cx="12" cy="12" r="3" fill="white" />
      </svg>
    </template>

    <!-- LOTR Dark Tema -->
    <template v-else-if="currentTheme === 'lotr-dark'">
      <svg class="h-6 w-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12,2L13.09,8.26L20,9L13.09,9.74L12,16L10.91,9.74L4,9L10.91,8.26L12,2Z" />
        <circle cx="12" cy="12" r="3" fill="black" />
      </svg>
    </template>

    <template v-else-if="currentTheme === 'custom'">
      <svg class="h-6 w-6 fill-current text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8,8,3.59,8,8S16.41,20,12,20z"
        />
        <path
          d="M12,6c-3.31,0-6,2.69-6,6s2.69,6,6,6,6-2.69,6-6S15.31,6,12,6z M12,16c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4S14.21,16,12,16z"
        />
      </svg>
    </template>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Toggle fonksiyonu: tüm temalar arasında geçiş
const toggleTheme = () => {
  store.dispatch('Theme/toggleTheme');
};

// Başlangıçta temayı yükle
store.dispatch('Theme/initTheme');
</script>
