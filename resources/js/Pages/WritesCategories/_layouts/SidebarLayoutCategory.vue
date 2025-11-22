<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded">
      <CategoryTree
        v-if="showCategories"
        ref="categoryTreeRef"
        :getLinkClasses="getLinkClasses"
        :expandAll="areAllCategoriesExpanded"
        :isCollapsed="isNarrow"
      />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import CategoryTree from '@/Pages/WritesCategories/_composables/CategoryTree.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutCategory',
});

// Composables
const { isCollapsed, toggleSidebar } = useSidebar();
const store = useStore();

// Diğer local state
const areAllCategoriesExpanded = computed(() => store.getters['CategorySidebar/collapsedSet'].size === 0);
const getLinkClasses = () => '';

const showCategories = ref(true);
const categoryTreeRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const emit = defineEmits(['update:isNarrow']);

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

// On mount, sync with store
onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
});

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('categorySidebarScroll', scrollTop);
};

onMounted(() => {
  if (scrollableRef.value) {
    scrollableRef.value.addEventListener && scrollableRef.value.addEventListener('scroll', handleScroll);
    if (scrollableRef.value.$el) {
      scrollableRef.value.$el.addEventListener('scroll', handleScroll);
      // Scroll pozisyonunu geri yükle
      const savedScroll = localStorage.getItem('categorySidebarScroll');
      if (savedScroll) {
        scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }
});
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: hsl(var(--border)) !important;
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
