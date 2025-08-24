<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <ToggleSubSidebarButtonOpen v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed" :class="currentTheme">
    <SidebarRendition
      v-if="isSidebarCollapsed && (screenName === 'words' || screenName === 'packs')"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import SidebarRendition from '@/Pages/Rendition/_layouts/SidebarRendition.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const { props } = usePage();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

const isMobile = props.screen?.isMobileSidebar || false;
const sidebarStyle = isMobile ? '' : 'hidden lg:block';
const screenName = props.screen?.name || '';
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - Rendition';
const flashSuccess = ref(props.flash?.success);
const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
