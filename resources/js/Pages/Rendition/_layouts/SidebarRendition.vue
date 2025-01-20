<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="KELİMELER" href="versions/create" />
    <VersionsList :versions="versions" :currentUrl="url" />
  </CheckSubsidebar>
</template>

<script setup>
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Modals/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import VersionsList from '@/Pages/FBVersions/_components/VersionList.vue';

const { props, url } = usePage();
const versions = ref(props.versions);

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>
