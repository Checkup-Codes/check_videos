import { ref, onMounted, onUnmounted, nextTick } from 'vue';

/**
 * Composable for managing sidebar scroll position with localStorage persistence
 * @param {string} storageKey - Unique key for localStorage (e.g., 'writeSidebarScroll', 'projectSidebarScroll')
 * @param {Ref} scrollContainerRef - Vue ref to the scrollable container element
 * @param {Object} options - Additional options
 * @param {Function} options.getScrollKey - Optional function to generate dynamic scroll key (e.g., based on filter)
 * @returns {Object} - Scroll management functions
 */
export function useSidebarScroll(storageKey, scrollContainerRef, options = {}) {
  const { getScrollKey } = options;

  /**
   * Get the current scroll key (dynamic or static)
   */
  const getCurrentScrollKey = () => {
    return getScrollKey ? getScrollKey() : storageKey;
  };

  /**
   * Handle scroll event and save position to localStorage
   */
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const key = getCurrentScrollKey();
    localStorage.setItem(key, scrollTop.toString());
  };

  /**
   * Restore scroll position from localStorage
   */
  const restoreScrollPosition = () => {
    nextTick(() => {
      if (!scrollContainerRef.value) return;

      const element = scrollContainerRef.value.$el || scrollContainerRef.value;
      if (!element) return;

      const key = getCurrentScrollKey();
      const savedScroll = localStorage.getItem(key);
      if (savedScroll) {
        element.scrollTop = parseInt(savedScroll, 10);
      }
    });
  };

  /**
   * Initialize scroll handling
   */
  const initScroll = () => {
    nextTick(() => {
      if (!scrollContainerRef.value) return;

      const element = scrollContainerRef.value.$el || scrollContainerRef.value;
      if (!element || !element.addEventListener) return;

      element.addEventListener('scroll', handleScroll);
      restoreScrollPosition();
    });
  };

  /**
   * Cleanup scroll handling
   */
  const cleanupScroll = () => {
    if (!scrollContainerRef.value) return;

    const element = scrollContainerRef.value.$el || scrollContainerRef.value;
    if (!element || !element.removeEventListener) return;

    element.removeEventListener('scroll', handleScroll);
  };

  /**
   * Clear saved scroll position
   */
  const clearScrollPosition = () => {
    const key = getCurrentScrollKey();
    localStorage.removeItem(key);
  };

  return {
    initScroll,
    cleanupScroll,
    restoreScrollPosition,
    clearScrollPosition,
    handleScroll,
  };
}

