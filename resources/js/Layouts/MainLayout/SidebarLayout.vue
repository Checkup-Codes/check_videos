<template>
  <!-- Horizontal Tab Navigation -->
  <nav
    class="bg-base-100/95 border-base-200/30 sticky top-12 z-40 w-full border-b backdrop-blur-md transition-all duration-300"
    :class="currentTheme"
  >
    <div class="flex h-10 items-center justify-between px-4 sm:px-6">
      <!-- Tab Navigation Links -->
      <div class="flex items-center space-x-1">
        <TabNavItem href="/" icon="home" label="Ana Sayfa" :is-active="isActiveRoute('/')" />
        <TabNavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-active="isActiveRoute('/writes')" />
        <TabNavItem
          href="/categories"
          icon="fa-solid fa-book"
          label="Kategoriler"
          :is-active="isActiveRoute('/categories')"
        />

        <!-- Conditional items for logged in users -->
        <template v-if="isLoggedIn">
          <TabNavItem
            href="/rendition/words"
            icon="fa-solid fa-globe"
            label="Kelimeler"
            :is-active="isActiveRoute('/rendition')"
          />
          <TabNavItem
            href="/versions"
            icon="fa-solid fa-sync"
            label="Versiyonlar"
            :is-active="isActiveRoute('/versions')"
          />
        </template>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center space-x-2">
        <!-- Join Us Button for Non-Logged In Users -->
        <div v-if="!isLoggedIn">
          <Link href="/join-us" class="block">
            <button
              class="bg-base-200/50 hover:bg-base-200/80 border-base-300/60 flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-base-content transition-all duration-200 hover:scale-105"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              <span class="hidden sm:inline">Aramıza Katıl</span>
            </button>
          </Link>
        </div>

        <!-- Social Links for Non-Logged In Users -->
        <div v-if="!isLoggedIn" class="hidden md:flex">
          <SocialLinks :is-compact="true" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TabNavItem from '@/Layouts/_components/TabNavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Link } from '@inertiajs/vue3';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Reactive authentication status - automatically updates when auth changes
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Check if current route matches the given path
const isActiveRoute = (path) => {
  const currentUrl = page.url;

  if (path === '/') {
    return currentUrl === '/' || currentUrl === '';
  }

  return currentUrl.startsWith(path);
};

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Modern button hover effects */
.btn {
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

/* Theme-specific enhancements */
html[data-theme='lotr-light'] .btn,
html[data-theme='lotr-dark'] .btn {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(139, 69, 19, 0.3);
  border: 2px solid #d4af37;
}

html[data-theme='lotr-light'] .btn:hover,
html[data-theme='lotr-dark'] .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px -2px rgba(139, 69, 19, 0.4);
  transition: all 0.3s ease-in-out;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
