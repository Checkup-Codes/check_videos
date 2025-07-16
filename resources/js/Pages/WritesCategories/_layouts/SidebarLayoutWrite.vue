<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" /> -->
    <TopSubsidebar title="YAZILAR" href="/writes/create" class="border-base-200" @toggle-width="handleWidthToggle">
    </TopSubsidebar>

    <SubSidebarScreen ref="scrollableRef">
      <WriteList ref="writeListRef" :writes="writes" :route="route" :isCollapsed="isNarrow" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue';
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

// Local state
const { props } = usePage();
const writes = inject('writes', []);
const writeListRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const emit = defineEmits(['update:isNarrow']);

const handleWidthToggle = (value) => {
  isNarrow.value = value;
  store.commit('Writes/SET_COLLAPSED', value);
};

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  localStorage.setItem('writeSidebarScroll', scrollTop);
};

// On mount, sync with store
onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
  if (scrollableRef.value) {
    scrollableRef.value.addEventListener && scrollableRef.value.addEventListener('scroll', handleScroll);
    if (scrollableRef.value.$el) {
      scrollableRef.value.$el.addEventListener('scroll', handleScroll);
      // Scroll pozisyonunu geri yükle
      const savedScroll = localStorage.getItem('writeSidebarScroll');
      if (savedScroll) {
        scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }
});
</script>
