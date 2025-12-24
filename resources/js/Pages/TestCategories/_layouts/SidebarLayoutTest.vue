<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- View Toggle - Always visible -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-2">
      <div class="flex items-center justify-between gap-2">
        <!-- View Toggle (Left) -->
        <div class="flex items-center gap-1">
          <Link
            :href="route('tests.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              isListView
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Liste görünümü"
          >
            <IconMenu class="h-3 w-3" />
            <span v-if="!isNarrow">Liste</span>
          </Link>
          <Link
            :href="route('test-categories.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              !isListView
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Kategori görünümü"
          >
            <IconFolder class="h-3 w-3" />
            <span v-if="!isNarrow">Kategori</span>
          </Link>
        </div>
      </div>
    </div>
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <TestList ref="testListRef" :tests="tests" :isCollapsed="isNarrow" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted, onBeforeUnmount, onActivated, onDeactivated, computed, nextTick } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import TestList from '@/Pages/TestCategories/_composables/TestList.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';
import IconMenu from '../_components/icons/IconMenu.vue';
import IconFolder from '../_components/icons/IconFolder.vue';

defineOptions({
  name: 'SidebarLayoutTest',
});

const { isCollapsed, toggleSidebar } = useSidebar();
const store = useStore();
const page = usePage();

// Authentication status
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Check if we're on list view (tests) or category view
const isListView = computed(() => {
  const url = page.url;
  return url.startsWith('/tests') && !url.startsWith('/test-categories');
});

// Tests from inject - handle both computed ref and plain array
const injectedTests = inject('tests', []);
const tests = computed(() => {
  const testsValue = injectedTests?.value ?? injectedTests;
  return Array.isArray(testsValue) ? testsValue : [];
});

const testListRef = ref(null);
const scrollableRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);

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
    store.dispatch('Writes/setScrollPosition', scrollTop);
  }
};

const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Writes/scrollPosition'];
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
