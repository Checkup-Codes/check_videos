<template>
  <div
    :class="[
      isCollapsed
        ? 'flex flex-col lg:grid lg:grid-cols-subsidebar h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)]'
        : 'h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)]',
      'overflow-hidden overscroll-none scrollbar-hide',
    ]"
  >
    <!-- Sidebar with proper height constraint -->
    <!-- Mobil show sayfalarında hiç render edilmez (showSidebarOnMobile === false) -->
    <div
      v-if="isCollapsed && (showSidebarOnMobile === undefined || showSidebarOnMobile === true)"
      class="sidebar-container flex flex-col min-h-0 flex-1 lg:h-full overflow-hidden"
    >
      <slot name="sidebar"></slot>
    </div>
    <!-- Main content -->
    <div
      :class="[
        'main-content-container min-h-0 flex-1 lg:h-full overflow-hidden',
        showMainContentOnMobile === false ? 'hidden lg:block' : '',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: '',
  },
  isCollapsed: {
    type: Boolean,
  },
  showSidebarOnMobile: {
    type: Boolean,
    default: undefined, // undefined = auto (show on mobile if collapsed)
  },
  showMainContentOnMobile: {
    type: Boolean,
    default: undefined, // undefined = auto (show on mobile)
  },
});
</script>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Sidebar container - ensure children can scroll */
.sidebar-container {
  display: flex;
  flex-direction: column;
}

/* Sidebar slot content should fill container */
.sidebar-container > * {
  flex: 1 1 0%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
