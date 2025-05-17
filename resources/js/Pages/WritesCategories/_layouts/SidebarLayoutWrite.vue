<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" class="btn-ghost" />
    <TopSubsidebar title="YAZILAR" href="/writes/create" class="border-base-200">
      <template #actions>
        <PerformanceMonitorButton v-if="shouldShowPerformanceMonitor" :performance="performanceData" />
      </template>
    </TopSubsidebar>
    <SubSidebarScreen>
      <WriteList ref="writeListRef" :writes="writes" :route="route" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import WriteList from '@/Pages/WritesCategories/_composable/WriteList.vue';
import PerformanceMonitorButton from '@/Pages/WritesCategories/_composable/PerformanceMonitorButton.vue';
import { ref, onMounted, onActivated, onBeforeUnmount, nextTick, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

// Set component name for dev tools
defineOptions({
  name: 'SidebarLayoutWrite',
});

const { props } = usePage();
// Doğrudan props'tan gelen yazıları ref olarak tut
const writes = ref(props.writes || []);
const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);
const writeListRef = ref(null);

// Only show performance monitor for admins and when data is available
const shouldShowPerformanceMonitor = computed(() => {
  return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
});

// Access performance data with safe fallback
const performanceData = computed(() => props.performance || {});

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
