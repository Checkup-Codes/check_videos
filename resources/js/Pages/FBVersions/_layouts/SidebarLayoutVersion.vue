<template>
  <CheckSubsidebar :isNarrow="isNarrow" :class="currentTheme">
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded">
      <VersionsList :versions="versions" :currentUrl="url" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import VersionsList from '@/Pages/FBVersions/_components/VersionList.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useStore } from 'vuex';

const page = usePage();
const props = computed(() => page.props);
const url = computed(() => page.url);
const versions = computed(() => props.value.versions || []);

const store = useStore();
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);
const isNarrow = ref(false);
const scrollableRef = ref(null);
</script>

<style scoped>
/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--b1) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--b2) / 0.3), transparent);
  pointer-events: none;
}
</style>
