<template>
  <CheckSubsidebar :isNarrow="isNarrow" :class="currentTheme">
    <TopSubsidebar
      title="YAZILAR"
      href="/writes/create"
      class="border-base-200 bg-base-100"
      @toggle-width="handleWidthToggle"
    />

    <SubSidebarScreen ref="scrollableRef" class="bg-base-100">
      <WriteList ref="writeListRef" :writes="writes" :route="route" :isCollapsed="isNarrow" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import WriteList from '@/Pages/WritesCategories/_composables/WriteList.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutWrite',
});

// Composables
const { isCollapsed, toggleSidebar } = useSidebar();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Local state
const { props } = usePage();
const writes = inject('writes', []);
const writeListRef = ref(null);
const scrollableRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);

const emit = defineEmits(['update:isNarrow']);

const handleWidthToggle = (value) => {
  isNarrow.value = value;
  store.commit('Writes/SET_COLLAPSED', value);
};

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

/**
 * Handle scroll events and save position to localStorage
 */
const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('writeSidebarScroll', scrollTop.toString());
};

/**
 * Initialize component and restore scroll position
 */
onMounted(() => {
  // Sync with store state
  isNarrow.value = store.getters['Writes/isCollapsed'];

  // Setup scroll handling
  if (scrollableRef.value) {
    // Try both direct element and Vue component element
    const element = scrollableRef.value.$el || scrollableRef.value;

    if (element && element.addEventListener) {
      element.addEventListener('scroll', handleScroll);

      // Restore saved scroll position
      const savedScroll = localStorage.getItem('writeSidebarScroll');
      if (savedScroll) {
        element.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }
});
</script>
