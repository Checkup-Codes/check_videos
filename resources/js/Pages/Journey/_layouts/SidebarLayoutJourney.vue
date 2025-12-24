<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- Header -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-3">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Yolculuk</span>
      </div>
    </div>
    <!-- Scrollable Content - Timeline -->
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <JourneyTimeline :entriesByYear="entriesByYear" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed, inject, watch, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import JourneyTimeline from '@/Pages/Journey/_components/JourneyTimeline.vue';
import { useStore } from 'vuex';

defineOptions({
  name: 'SidebarLayoutJourney',
});

const page = usePage();
const store = useStore();

// Inject entries - handle both computed ref and plain value
const injectedEntriesByYear = inject('entriesByYear', {});
const entriesByYear = computed(() => {
  const value = injectedEntriesByYear?.value ?? injectedEntriesByYear;
  if (value && typeof value === 'object' && Object.keys(value).length > 0) {
    return value;
  }
  if (page.props.entriesByYear && typeof page.props.entriesByYear === 'object') {
    return page.props.entriesByYear;
  }
  return {};
});

const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const emit = defineEmits(['update:isNarrow']);

watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

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
    store.dispatch('Journey/setScrollPosition', scrollTop);
  }
};

const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Journey/scrollPosition'];
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
