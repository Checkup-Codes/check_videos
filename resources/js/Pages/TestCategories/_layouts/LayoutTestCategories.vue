<template>
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout :isCollapsed="!shouldHideSidebarContent">
    <template #sidebar>
      <KeepAlive
        v-if="!shouldHideSidebarContent && isMounted"
        :max="5"
        :include="['SidebarLayoutTest', 'SidebarLayoutCategory']"
      >
        <component
          :is="sidebarComponent"
          :key="screenName"
          :class="sidebarStyle"
          @update:isNarrow="handleSidebarWidthChange"
        />
      </KeepAlive>
    </template>
    <div :class="[isMobile ? 'hidden lg:block' : 'block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, provide, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutTest from './SidebarLayoutTest.vue';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';
import { useStore } from 'vuex';

defineOptions({
  name: 'LayoutTestCategories',
});

const { isCollapsed, isMobile, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();
const store = useStore();

const handleFlashClose = () => {
  flashMessage.value = '';
};

const page = usePage();
const { props } = page;
const screenName = props.screen?.name || '';

const sidebarComponents = {
  tests: SidebarLayoutTest,
  test_categories: SidebarLayoutCategory,
};

const isLoggedIn = computed(() => {
  return !!(props.auth && props.auth.user);
});

const shouldHideSidebarContent = computed(() => {
  // Test çözme ve sonuç sayfalarında sidebar'ı gizle
  const url = page.url;
  return url.includes('/take') || url.includes('/result');
});

const sidebarComponent = computed(() => {
  if (isCollapsed.value && screenName && !shouldHideSidebarContent.value) {
    return sidebarComponents[screenName] || null;
  }
  return null;
});

const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const mainContentClass = computed(() => ({
  'transition-all duration-300': true,
  'lg:ml-[-200px]': isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-[00px]': !isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-0': shouldHideSidebarContent.value,
}));

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

provide('categories', props.categories || []);
provide('tests', props.tests || []);
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

