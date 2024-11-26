<template>
  <div class="border-color-one relative border-r">
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <FlashMessage :message="flashSuccess" />
    <CategoryMenu :categories="categories" :route="route" />
    <WriteList :writes="writes" :route="route" />
  </div>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import CategoryMenu from '@/Pages/WritesCategories/_components/CategoryMenu.vue';
import WriteList from '@/Pages/WritesCategories/_components/WriteList.vue';
import { ref, defineEmits } from 'vue';
import { usePage } from '@inertiajs/vue3';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';

const { props } = usePage();
const flashSuccess = ref(props.flash.success);
const auth = props.auth;
const writes = ref(props.writes);
const categories = ref(props.categories);
const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>
