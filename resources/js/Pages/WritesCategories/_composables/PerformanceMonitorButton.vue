<template>
  <div class="relative">
    <button
      @click="toggleMonitor"
      ref="buttonRef"
      class="btn btn-ghost btn-sm"
      :data-tip="hasSlowOperations ? 'Yavaş işlem tespit edildi' : 'Performans Paneli'"
      :class="{ 'text-error': hasSlowOperations }"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed left-0 right-0 top-0 z-50 mx-auto mt-4 w-full max-w-3xl rounded-box border border-base-300 bg-base-200 shadow-lg"
      >
        <div class="flex items-center justify-between border-b border-base-300 px-4 py-3">
          <h3 class="text-base font-semibold">Performans Paneli</h3>
          <button class="btn btn-ghost btn-xs btn-circle" @click="toggleMonitor">✕</button>
        </div>

        <div class="max-h-[80vh] space-y-4 overflow-y-auto p-4 text-sm">
          <!-- Performance Metrics -->
          <div v-if="hasPerformanceData">
            <div v-for="(metric, key) in formattedMetrics" :key="key" class="flex items-center justify-between">
              <span class="badge badge-ghost">{{ formatLabel(key) }}</span>
              <span :class="isSlow(metric) ? 'font-semibold text-error' : 'font-mono text-success'">
                {{ getMetricValue(metric) }}
              </span>
            </div>
          </div>
          <div v-else class="alert alert-info p-2">Performans verisi bulunamadı</div>

          <!-- Google Search Preview -->
          <div class="seo-preview-section mt-4">
            <div class="collapse collapse-arrow rounded-box bg-base-200">
              <input type="checkbox" checked />
              <div class="collapse-title font-medium">Google Search Preview</div>
              <div class="collapse-content p-2">
                <div class="google-preview rounded-box border border-base-300 bg-white p-2">
                  <div class="flex flex-wrap items-center">
                    <div
                      class="google-title tooltip flex-grow hover:underline"
                      :data-tip="titleTooltip"
                      :class="titleLengthStatus"
                    >
                      {{ truncateText(pageTitle, 100) }}
                      <span
                        class="seo-indicator ml-1 inline-block"
                        :class="titleLengthStatus"
                        :data-tip="titleTooltip"
                      ></span>
                    </div>
                  </div>
                  <div class="google-url tooltip" data-tip="URL as shown in search results">
                    {{ truncateText(pageUrl, 80) }}
                  </div>
                  <div class="flex flex-wrap items-start">
                    <div
                      class="google-description tooltip flex-grow"
                      :data-tip="descriptionTooltip"
                      :class="descriptionLengthStatus"
                    >
                      {{ truncateText(pageDescription, 120) }}
                      <span
                        class="seo-indicator ml-1 inline-block"
                        :class="descriptionLengthStatus"
                        :data-tip="descriptionTooltip"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Multi-language SEO Section -->
          <div class="collapse collapse-arrow rounded-box border border-base-300 bg-base-100">
            <input type="checkbox" />
            <div class="collapse-title font-medium">Çok Dilli SEO</div>
            <div class="collapse-content space-y-2 p-2 text-xs">
              <p>
                Aktif dil: <span class="badge badge-outline">{{ currentLanguage }}</span>
              </p>
              <div class="mockup-code max-h-40 overflow-auto whitespace-pre-wrap text-xs">
                <code>{{ hreflangExample }}</code>
              </div>
              <ul class="mt-2 space-y-1">
                <li><span class="badge badge-success">✓</span> Karşılıklı hreflang bağlantıları</li>
                <li><span class="badge badge-success">✓</span> `x-default` etiketi</li>
                <li><span class="badge badge-success">✓</span> Meta etiket çevirisi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, nextTick } from 'vue';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
  performance: {
    type: Object,
    default: () => ({}),
  },
});

// UI state
const isOpen = ref(false);
const buttonRef = ref(null);
const dropdownStyles = ref({
  position: 'fixed',
  zIndex: 9999,
});

// Local reference to prevent issues during component unmount
const localPerformance = ref({});

// Safely initialize from props
const initializeFromProps = () => {
  try {
    localPerformance.value = props.performance || {};
  } catch (e) {
    console.error('Error initializing performance data:', e);
    localPerformance.value = {};
  }
};

// Initialize when component is created
initializeFromProps();

/**
 * Get page SEO metadata from document head
 */
const page = usePage();
const pageTitle = computed(() => {
  try {
    const titleElement = document.querySelector('title');
    return titleElement ? titleElement.textContent : 'Yazı Platformu';
  } catch (e) {
    return 'Yazı Platformu';
  }
});

const pageDescription = computed(() => {
  try {
    const metaDescription = document.querySelector('meta[name="description"]');
    return metaDescription ? metaDescription.getAttribute('content') : 'No description available';
  } catch (e) {
    return 'No description available';
  }
});

const pageUrl = computed(() => {
  try {
    const canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      return canonicalUrl.getAttribute('href');
    }

    // Fallback to current URL
    return window.location.href.replace(/^https?:\/\//, '');
  } catch (e) {
    return window.location.href.replace(/^https?:\/\//, '');
  }
});

/**
 * Multilingual SEO implementation
 */
const currentLanguage = computed(() => {
  try {
    const htmlTag = document.querySelector('html');
    return htmlTag.getAttribute('lang') || 'tr'; // Default to Turkish
  } catch (e) {
    return 'tr';
  }
});

const hreflangExample = computed(() => {
  try {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    const path = '/' + currentUrl.split('/').slice(3).join('/');

    // Generate shorter example hreflang tags
    return `<link rel="alternate" hreflang="tr" href="${baseUrl}${path}" />
<link rel="alternate" hreflang="en" href="${baseUrl}/en${path}" />
<link rel="alternate" hreflang="x-default" href="${baseUrl}" />`;
  } catch (e) {
    return '<link rel="alternate" hreflang="tr" href="..." />';
  }
});

/**
 * Evaluate if title length is optimal
 */
const titleLengthStatus = computed(() => {
  const length = pageTitle.value.length;
  if (length < 30) return 'too-short';
  if (length > 60) return 'too-long';
  return 'optimal';
});

/**
 * Evaluate if description length is optimal
 */
const descriptionLengthStatus = computed(() => {
  const length = pageDescription.value.length;
  if (length < 50) return 'too-short';
  if (length > 160) return 'too-long';
  return 'optimal';
});

/**
 * Generate tooltip text for title length
 */
const titleTooltip = computed(() => {
  const length = pageTitle.value.length;
  let status = 'Ideal title length: 50-60 characters. ';

  if (titleLengthStatus.value === 'too-short') {
    status += `Current: ${length} characters (Too short)`;
  } else if (titleLengthStatus.value === 'too-long') {
    status += `Current: ${length} characters (Too long)`;
  } else {
    status += `Current: ${length} characters (Optimal)`;
  }

  return status;
});

/**
 * Generate tooltip text for description length
 */
const descriptionTooltip = computed(() => {
  const length = pageDescription.value.length;
  let status = 'Ideal description length: 120-160 characters. ';

  if (descriptionLengthStatus.value === 'too-short') {
    status += `Current: ${length} characters (Too short)`;
  } else if (descriptionLengthStatus.value === 'too-long') {
    status += `Current: ${length} characters (Too long)`;
  } else {
    status += `Current: ${length} characters (Optimal)`;
  }

  return status;
});

/**
 * Check if any operation is slow to highlight the button
 */
const hasSlowOperations = computed(() => {
  try {
    if (!localPerformance.value) return false;

    // Check all execution time metrics for slow operations
    for (const key in localPerformance.value) {
      if (key.includes('execution_time') && localPerformance.value[key] && localPerformance.value[key].is_slow) {
        return true;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
});

/**
 * Toggle monitor panel visibility and set its position
 */
const toggleMonitor = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    nextTick(() => {
      if (buttonRef.value) {
        const rect = buttonRef.value.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Calculate optimal position
        let topPosition = rect.bottom + 5;

        // Check if panel would go off-screen vertically
        if (topPosition + 300 > windowHeight) {
          topPosition = Math.max(10, windowHeight - 600);
        }

        // Adjust horizontal position to ensure it stays on screen
        const rightPosition = Math.min(windowWidth - rect.right, windowWidth - 100);

        dropdownStyles.value = {
          position: 'fixed',
          top: `${topPosition}px`,
          right: `${rightPosition}px`,
          zIndex: 9999,
          maxHeight: '80vh',
        };
      }
    });
  }
};

/**
 * Check if performance data is available
 */
const hasPerformanceData = computed(() => {
  try {
    return Object.keys(localPerformance.value).length > 0;
  } catch (e) {
    console.error('Error checking performance data:', e);
    return false;
  }
});

/**
 * Extract and prepare metrics for display
 */
const formattedMetrics = computed(() => {
  if (!hasPerformanceData.value) return {};

  try {
    const metrics = {};

    // Process all execution time metrics
    Object.keys(localPerformance.value).forEach((key) => {
      if (key.includes('execution_time')) {
        metrics[key] = localPerformance.value[key];
      }
    });

    return metrics;
  } catch (e) {
    console.error('Error formatting metrics:', e);
    return {};
  }
});

/**
 * Check if count data is available
 */
const hasCounts = computed(() => {
  try {
    return localPerformance.value && typeof localPerformance.value.count !== 'undefined';
  } catch (e) {
    console.error('Error checking counts:', e);
    return false;
  }
});

/**
 * Get total count of items
 */
const totalCount = computed(() => {
  try {
    return localPerformance.value.count || 0;
  } catch (e) {
    console.error('Error getting total count:', e);
    return 0;
  }
});

/**
 * Safely check if a metric is slow
 *
 * @param {object|null} metric - The metric object
 * @return {boolean} Whether the metric is slow
 */
const isSlow = (metric) => {
  try {
    return metric && metric.is_slow === true;
  } catch (e) {
    return false;
  }
};

/**
 * Safely get the metric value
 *
 * @param {object|null} metric - The metric object
 * @return {string} The value to display
 */
const getMetricValue = (metric) => {
  try {
    return metric && typeof metric.value !== 'undefined' ? metric.value : 'N/A';
  } catch (e) {
    return 'Error';
  }
};

/**
 * Format metric label for display
 *
 * @param {string} key - Raw metric key
 * @return {string} Formatted label
 */
const formatLabel = (key) => {
  try {
    // Remove '_execution_time' suffix and convert to title case
    return key
      .replace('_execution_time', '')
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (e) {
    return key || 'Unknown';
  }
};

/**
 * Truncate text to a specified length
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length of the truncated text
 * @return {string} The truncated text
 */
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

/**
 * Return the appropriate CSS class for SEO status indicators
 *
 * @param {string} status - The SEO status (too-short, too-long, or optimal)
 * @return {string} The corresponding CSS class
 */
const seoColor = (status) => {
  return (
    {
      optimal: 'bg-green-500',
      'too-short': 'bg-yellow-400',
      'too-long': 'bg-red-500',
    }[status] || 'bg-gray-400'
  );
};

// Clean up on component unmount
onBeforeUnmount(() => {
  // Clear data to prevent memory leaks
  localPerformance.value = {};
  isOpen.value = false;
});
</script>

<style scoped>
.performance-monitor-button {
  position: relative;
}

.performance-panel {
  width: 450px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
}

.performance-panel-content {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f8f9fa;
}

.performance-panel-content::-webkit-scrollbar {
  width: 6px;
}

.performance-panel-content::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.performance-panel-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 6px;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}

.metric-value {
  font-family: monospace;
}

/* Google Preview Styles */
.google-title {
  color: #1a0dab;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  flex: 1;
  max-width: 100%;
  line-height: 1.2;
}

.google-title:hover {
  text-decoration: underline;
}

.google-url {
  color: #006621;
  font-size: 12px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  word-break: break-all;
  word-wrap: break-word;
}

.google-description {
  color: #545454;
  font-size: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  max-width: 100%;
}

.google-preview {
  font-family: Arial, sans-serif;
  max-width: 100%;
  overflow: hidden;
  padding: 10px !important;
}

.seo-indicator {
  min-width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 4px;
}

.seo-indicator.too-short {
  background-color: #ffc107; /* yellow for too short */
}

.seo-indicator.too-long {
  background-color: #dc3545; /* red for too long */
}

.seo-indicator.optimal {
  background-color: #28a745; /* green for optimal */
}

/* Responsive mockup code */
.mockup-code {
  max-width: 100%;
  overflow-x: auto;
}

/* Keep tooltip styles for browsers that don't support DaisyUI tooltips */
.tooltip:not([data-tip]):hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10000;
  pointer-events: none;
}

@media (max-height: 700px) {
  .performance-panel-content {
    max-height: 500px;
  }
}

@media (max-width: 640px) {
  .performance-panel {
    width: 95vw;
  }
}
</style>
