<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="YAZILAR" href="/writes/create" />
    <WriteList :writes="writes" :route="route" />
  </CheckSubsidebar>
</template>

<script setup>
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import WriteList from '@/Pages/WritesCategories/_components/WriteList.vue';
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import CheckSubsidebar from '@/Components/CekapUI/Modals/CheckSubsidebar.vue';

const { props } = usePage();
const writes = ref(props.writes);
const categories = ref(props.categories);
const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>
