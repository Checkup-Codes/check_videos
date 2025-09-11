<template>
  <CheckSubsidebar>
    <TopSubsidebar title="VERSİYONLAR" href="/versions/create/" class="border-base-200" />
    <SubSidebarScreen>
      <VersionsList :versions="versions" :currentUrl="url" />
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import VersionsList from '@/Pages/FBVersions/_components/VersionList.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

const page = usePage();
const props = computed(() => page.props);
const url = computed(() => page.url);
const versions = computed(() => props.value.versions || []);

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);
</script>
