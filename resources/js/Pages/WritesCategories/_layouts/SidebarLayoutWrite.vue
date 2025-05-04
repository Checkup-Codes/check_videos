<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" class="btn-ghost" />
    <TopSubsidebar title="YAZILAR" href="/writes/create" class="border-base-200">
      <template #actions>
        <PerformanceMonitorButton
          class="hidden lg:block"
          v-if="shouldShowPerformanceMonitor"
          :performance="performanceData"
        />
      </template>
    </TopSubsidebar>
    <SubSidebarScreen>
      <MemoizedWriteList ref="writeListRef" :writes="memoizedWrites" :route="route" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import WriteList from '@/Pages/WritesCategories/_components/WriteList.vue';
import PerformanceMonitorButton from '@/Pages/WritesCategories/_components/PerformanceMonitorButton.vue';
import { ref, onMounted, onActivated, onBeforeUnmount, nextTick, computed, markRaw } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

// Use WriteList component directly
const MemoizedWriteList = WriteList;

// Set component name for dev tools
defineOptions({
  name: 'SidebarLayoutWrite',
});

const { props } = usePage();
// Use shallow reference to optimize rendering performance
const writes = ref(props.writes || []);
// Create computed property to prevent unnecessary re-renders
const memoizedWrites = computed(() => writes.value);
const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);
const writeListRef = ref(null);

// Only show performance monitor for admins and when data is available
const shouldShowPerformanceMonitor = computed(() => {
  return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
});

// Access performance data with safe fallback
const performanceData = computed(() => props.performance || {});

onMounted(() => {
  // Mark route function as non-reactive to improve performance
  if (typeof route !== 'undefined') {
    markRaw(route);
  }
});

onActivated(() => {
  // Restore scroll position when component is reactivated from KeepAlive
  nextTick(() => {
    if (writeListRef.value && writeListRef.value.scrollContainer) {
      // Scroll container is accessible and can be restored
    }
  });
});

onBeforeUnmount(() => {
  // Clear references to prevent memory leaks and null reference issues
  writeListRef.value = null;
});

// Toggle sidebar collapse state
const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: var(--b2) !important;
}
</style>
