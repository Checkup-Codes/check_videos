<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="VERSİYONLAR" :addButton="true" addButtonHref="/versions/create/" />
    <div class="overflow-y-auto">
      <VersionsList :versions="versions" :currentUrl="url" />
    </div>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import VersionsList from '@/Pages/FBVersions/_components/VersionList.vue';

const page = usePage();
const props = computed(() => page.props);
const url = computed(() => page.url);
const versions = computed(() => props.value.versions || []);

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>
