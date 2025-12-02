<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- View Toggle Controls - Only for logged in users -->
    <div v-if="isLoggedIn" class="shrink-0 border-b border-border bg-background/95 p-2">
      <div class="flex items-center justify-between gap-2">
        <!-- View Toggle (Left) -->
        <div class="flex items-center gap-1">
          <Link
            href="/tests"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="isListView ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
            title="Liste görünümü"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span v-if="!isNarrow">Liste</span>
          </Link>
          <Link
            href="/test-categories"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="!isListView ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
            title="Kategori görünümü"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span v-if="!isNarrow">Kategori</span>
          </Link>
        </div>
      </div>
    </div>
    <SubSidebarScreen ref="scrollableRef" class="flex-1 min-h-0 sidebar-content-embedded" :infoClass="'flex flex-col h-full min-h-0'">
      <TestList ref="testListRef" :tests="tests" :route="route" :isCollapsed="isNarrow" class="flex-1 min-h-0" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted, computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import TestList from '@/Pages/TestCategories/_composables/TestList.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';

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

const { props } = usePage();
const tests = inject('tests', []);
const testListRef = ref(null);
const scrollableRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);

const route = computed(() => {
  return (test) => {
    return `/tests/${test.slug}`;
  };
});

const emit = defineEmits(['update:isNarrow']);

watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
});

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('testSidebarScroll', scrollTop.toString());
};

onMounted(() => {
  if (scrollableRef.value) {
    scrollableRef.value.addEventListener && scrollableRef.value.addEventListener('scroll', handleScroll);
    if (scrollableRef.value.$el) {
      scrollableRef.value.$el.addEventListener('scroll', handleScroll);
      const savedScroll = localStorage.getItem('testSidebarScroll');
      if (savedScroll) {
        scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }
});
</script>

<style scoped>
:deep(.sidebar-content-embedded) {
  background: hsl(var(--muted) / 0.7) !important;
  position: relative;
}
</style>

