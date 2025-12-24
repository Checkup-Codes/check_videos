import { ref } from 'vue';

export function useSidebar() {
  const isCollapsed = ref(true);

  // Sidebar state management
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  return {
    isCollapsed,
    toggleSidebar,
    sidebarStyle: ref(''),
  };
}

