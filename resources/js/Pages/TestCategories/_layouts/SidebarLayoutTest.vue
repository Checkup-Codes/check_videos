<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded">
      <TestList ref="testListRef" :tests="tests" :route="route" :isCollapsed="isNarrow" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
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

