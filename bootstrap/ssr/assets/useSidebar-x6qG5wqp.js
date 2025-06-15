import { ref, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
function useSidebar() {
  const { props } = usePage();
  const isCollapsed = ref(true);
  const isMobile = computed(() => {
    var _a;
    return ((_a = props.screen) == null ? void 0 : _a.isMobileSidebar) || false;
  });
  const shouldShowPerformanceMonitor = computed(() => {
    return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
  });
  const performanceData = computed(() => props.performance || {});
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  const sidebarStyle = computed(() => isMobile.value ? "" : "hidden lg:block");
  return {
    isCollapsed,
    isMobile,
    shouldShowPerformanceMonitor,
    performanceData,
    toggleSidebar,
    sidebarStyle
  };
}
export {
  useSidebar as u
};
