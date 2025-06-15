<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" /> -->
    <TopSubsidebar title="YAZILAR" href="/writes/create" class="border-base-200" @toggle-width="handleWidthToggle">
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
import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import WriteList from '@/Pages/WritesCategories/_composables/WriteList.vue';
import PerformanceMonitorButton from '@/Pages/WritesCategories/_composables/PerformanceMonitorButton.vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutWrite',
});

// Composables
const { isCollapsed, toggleSidebar, shouldShowPerformanceMonitor, performanceData } = useSidebar();

// Local state
const { props } = usePage();
const writes = ref(props.writes || []);
const writeListRef = ref(null);
const isNarrow = ref(false);

const emit = defineEmits(['update:isNarrow']);

const handleWidthToggle = (value) => {
  isNarrow.value = value;
};

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});
</script>
