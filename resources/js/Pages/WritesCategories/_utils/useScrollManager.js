import { ref, onMounted, onUnmounted } from 'vue';

const SCROLL_RESET_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Composable for managing scroll position with auto-reset functionality
 * @param {string} storageKey - Key to use for localStorage
 * @param {number} resetInterval - Interval in milliseconds to reset scroll (default: 10 minutes)
 * @returns {Object} - Scroll management methods and refs
 */
export function useScrollManager(storageKey, resetInterval = SCROLL_RESET_INTERVAL) {
  const lastResetTime = ref(parseInt(localStorage.getItem(`${storageKey}_lastReset`)) || Date.now());
  let scrollTimeout = null;

  /**
   * Save scroll position with optional debounce
   * @param {number} scrollTop - Scroll position to save
   * @param {boolean} immediate - Whether to save immediately or use debounce
   */
  const saveScrollPosition = (scrollTop, immediate = false) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const save = () => {
      if (scrollTop > 0) {
        localStorage.setItem(storageKey, scrollTop.toString());
        console.log(`Saved scroll position for ${storageKey}:`, scrollTop);
      }
    };

    if (immediate) {
      save();
    } else {
      scrollTimeout = setTimeout(save, 100);
    }
  };

  /**
   * Get saved scroll position
   * @returns {number} Saved scroll position or 0
   */
  const getSavedScrollPosition = () => {
    // Check if we need to reset based on time
    const now = Date.now();
    const timeSinceLastReset = now - lastResetTime.value;

    if (timeSinceLastReset >= resetInterval) {
      console.log(`Resetting scroll position for ${storageKey} due to timeout`);
      localStorage.removeItem(storageKey);
      lastResetTime.value = now;
      localStorage.setItem(`${storageKey}_lastReset`, now.toString());
      return 0;
    }

    const saved = parseInt(localStorage.getItem(storageKey));
    return !isNaN(saved) && saved > 0 ? saved : 0;
  };

  /**
   * Reset scroll position and timer
   */
  const resetScroll = () => {
    localStorage.removeItem(storageKey);
    lastResetTime.value = Date.now();
    localStorage.setItem(`${storageKey}_lastReset`, lastResetTime.value.toString());
  };

  /**
   * Clean up function
   */
  const cleanup = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };

  // Set up automatic reset check interval
  let resetCheckInterval;
  onMounted(() => {
    resetCheckInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastReset = now - lastResetTime.value;
      
      if (timeSinceLastReset >= resetInterval) {
        resetScroll();
      }
    }, Math.min(resetInterval, 60000)); // Check at most every minute
  });

  onUnmounted(() => {
    cleanup();
    if (resetCheckInterval) {
      clearInterval(resetCheckInterval);
    }
  });

  return {
    saveScrollPosition,
    getSavedScrollPosition,
    resetScroll,
    cleanup
  };
} 