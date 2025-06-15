import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function useSidebar() {
  const { props } = usePage();
  const isCollapsed = ref(true);
  const isMobile = computed(() => props.screen?.isMobileSidebar || false);

  // Performance monitoring
  const shouldShowPerformanceMonitor = computed(() => {
    return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
  });
  const performanceData = computed(() => props.performance || {});

  // Sidebar state management
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  // Sidebar styling
  const sidebarStyle = computed(() => (isMobile.value ? '' : 'hidden lg:block'));

  return {
    isCollapsed,
    isMobile,
    shouldShowPerformanceMonitor,
    performanceData,
    toggleSidebar,
    sidebarStyle,
  };
}
