<template>
  <CheckSubsidebar>
    <!-- Header -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-2">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Oyun Modları</span>
      </div>
    </div>
    <!-- Scrollable Content -->
    <SubSidebarScreen ref="scrollContainer" class="sidebar-content-embedded min-h-0 flex-1">
      <div class="space-y-1 p-3">
        <button
          v-for="(game, index) in games"
          :key="index"
          @click="updateQuery(game.route)"
          class="block w-full rounded-lg border border-border bg-card p-3 text-left text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          :class="{ 'border-primary bg-primary text-primary-foreground': isActiveGame(game.route) }"
        >
          {{ game.name }}
        </button>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

const page = usePage();
const scrollContainer = ref(null);
const emit = defineEmits(['update:isCollapsed']);

// Oyun listesi
const games = ref([
  { name: 'Çoktan Seçmeli', route: 'multiple-choice' },
  { name: 'Boşluk Doldurma', route: 'fill-in-the-blank' },
  { name: 'Çeviri', route: 'translation' },
  { name: 'Eşleştirme', route: 'matching' },
  { name: 'Hızlı Yanıt', route: 'fast-response' },
  { name: 'Kelime Tahmini', route: 'word-guess' },
]);

// Check if game is active from URL query
const isActiveGame = (gameRoute) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('game') === gameRoute;
};

const updateQuery = (gameRoute) => {
  const currentQuery = new URLSearchParams(window.location.search);
  currentQuery.set('game', gameRoute);

  router.visit(`${window.location.pathname}?${currentQuery.toString()}`, {
    method: 'get',
    preserveState: true,
    replace: true,
  });
};
</script>

<style scoped>
/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--muted) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--border) / 0.3), transparent);
  pointer-events: none;
}
</style>
