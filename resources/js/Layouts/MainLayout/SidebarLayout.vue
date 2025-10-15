<template>
  <aside
    class="border-base-300/40 bg-base-200/90 h-[calc(100vh-4rem)] flex-col justify-between border-r-2 px-4 font-sans backdrop-blur-xl transition-all duration-500 ease-out"
    :class="currentTheme"
  >
    <div class="space-y-2 pt-6">
      <!-- Clean Navigation Buttons -->
      <div class="space-y-2">
        <NavItem href="/" icon="home" label="Ana Sayfa" :is-compact="isCompact" />
        <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-compact="isCompact" />
        <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" :is-compact="isCompact" />

        <!-- Conditional items for logged in users -->
        <template v-if="isLoggedIn">
          <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" :is-compact="isCompact" />
          <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" :is-compact="isCompact" />
        </template>
      </div>

      <!-- Social Links for Non-Logged In Users -->
      <div v-if="!isLoggedIn" class="border-base-300/40 space-y-1 border-t pt-4">
        <SocialLinks :is-compact="isCompact" />
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 py-6 text-center">
      <!-- Join Us Button for Non-Logged In Users -->
      <div v-if="!isLoggedIn" class="mb-4 px-4">
        <Link href="/join-us" class="block">
          <button
            class="bg-base-200/50 hover:bg-base-200/80 border-base-300/60 w-full rounded-xl border px-4 py-3 text-sm font-semibold text-base-content transition-all duration-200 hover:scale-105"
            :class="{ 'px-2': isCompact }"
          >
            <!-- Compact Mode: Only Icon -->
            <div v-if="isCompact" class="flex items-center justify-center">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            </div>
            <!-- Normal Mode: Full Content -->
            <div v-else class="flex flex-col items-center justify-center space-y-1">
              <div class="flex items-center justify-center space-x-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
                <span class="text-base-content">Aramıza Katıl</span>
              </div>
              <div class="text-base-content/60 text-xs">NOTIRIEL</div>
            </div>
          </button>
        </Link>
      </div>

      <!-- Copyright -->
      <div
        class="overflow-hidden transition-all duration-500 ease-out"
        :class="{ 'h-0 opacity-0': isCompact, 'h-auto opacity-100': !isCompact }"
      >
        <p class="text-base-content/50 text-xs">Notiriel - Tüm Hakları Saklıdır</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Link } from '@inertiajs/vue3';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Reactive authentication status - automatically updates when auth changes
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

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
