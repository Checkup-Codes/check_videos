<template>
  <CheckSubsidebar :isNarrow="isNarrow" :class="currentTheme">
    <!-- Header -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-3">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kelime Paketleri</span>
      </div>
    </div>
    <!-- Scrollable Content -->
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <div class="space-y-1 p-2">
        <Link
          v-for="languagePack in languagePacks"
          :key="languagePack.id"
          :href="route('rendition.words.show', { word: languagePack.slug })"
          class="block rounded-lg p-3 transition-all duration-200"
          :class="
            getLinkClasses(`/rendition/words/${languagePack.slug}`)
              ? 'bg-primary text-primary-foreground'
              : 'border border-border bg-card hover:bg-accent'
          "
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex-1">
              <h4
                class="text-[11px] font-medium leading-tight"
                :class="
                  getLinkClasses(`/rendition/words/${languagePack.slug}`)
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                "
              >
                {{ languagePack.name }}
              </h4>
              <div
                class="text-[10px] uppercase"
                :class="
                  getLinkClasses(`/rendition/words/${languagePack.slug}`)
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                "
              >
                {{ languagePack.language }}
              </div>
            </div>
            <div
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
              :class="
                getLinkClasses(`/rendition/words/${languagePack.slug}`)
                  ? 'border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground'
                  : 'border-border bg-secondary text-secondary-foreground'
              "
            >
              {{ languagePack.word_count || 0 }}
            </div>
          </div>
        </Link>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed, inject, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

defineOptions({
  name: 'SidebarRendition',
});

const page = usePage();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Language packs from inject or props - handle both computed ref and plain array
const injectedLanguagePacks = inject('languagePacks', []);
const languagePacks = computed(() => {
  // Props first
  if (page.props.languagePacks && Array.isArray(page.props.languagePacks) && page.props.languagePacks.length > 0) {
    const packs = page.props.languagePacks;
    // Kelime sayısına göre azalan sıralama (en fazla kelime en üstte)
    return packs.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
  }
  // Handle both computed ref and plain array
  const packsValue = injectedLanguagePacks?.value ?? injectedLanguagePacks;
  const packs = Array.isArray(packsValue) ? packsValue : [];
  // Kelime sayısına göre azalan sıralama (en fazla kelime en üstte)
  return packs.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
});

const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const getLinkClasses = (href) => {
  const url = page.url;
  return url === href || url.startsWith(href + '/');
};

// Scroll handling with Vuex store
let scrollHandler = null;

const getScrollElement = () => {
  if (scrollableRef.value?.$el?.value) {
    return scrollableRef.value.$el.value;
  }
  if (scrollableRef.value?.$el) {
    return scrollableRef.value.$el;
  }
  return scrollableRef.value;
};

const saveScrollPosition = () => {
  const scrollElement = getScrollElement();
  if (scrollElement) {
    const scrollTop = scrollElement.scrollTop || 0;
    store.dispatch('Rendition/setScrollPosition', scrollTop);
  }
};

const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Rendition/scrollPosition'];
      if (savedPosition > 0) {
        scrollElement.scrollTop = savedPosition;
      }
    }
  });
};

const setupScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && !scrollHandler) {
    scrollHandler = () => saveScrollPosition();
    scrollElement.addEventListener('scroll', scrollHandler, { passive: true });
  }
};

const removeScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && scrollHandler) {
    scrollElement.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
};

onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
});

onActivated(() => {
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
});

onDeactivated(() => {
  saveScrollPosition();
  removeScrollListener();
});

onBeforeUnmount(() => {
  saveScrollPosition();
  removeScrollListener();
});
</script>

<style scoped>
/* Ensure header background is not affected by parent bg-muted */
.shrink-0.border-b {
  background: hsl(var(--background)) !important;
}

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
