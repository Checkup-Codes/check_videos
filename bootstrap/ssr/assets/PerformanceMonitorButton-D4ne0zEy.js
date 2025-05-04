import { ref, computed, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderTeleport, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "PerformanceMonitorButton",
  __ssrInlineRender: true,
  props: {
    performance: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    ref(null);
    ref({
      position: "fixed",
      zIndex: 9999
    });
    const localPerformance = ref({});
    const initializeFromProps = () => {
      try {
        localPerformance.value = props.performance || {};
      } catch (e) {
        console.error("Error initializing performance data:", e);
        localPerformance.value = {};
      }
    };
    initializeFromProps();
    usePage();
    const pageTitle = computed(() => {
      try {
        const titleElement = document.querySelector("title");
        return titleElement ? titleElement.textContent : "Yazı Platformu";
      } catch (e) {
        return "Yazı Platformu";
      }
    });
    const pageDescription = computed(() => {
      try {
        const metaDescription = document.querySelector('meta[name="description"]');
        return metaDescription ? metaDescription.getAttribute("content") : "No description available";
      } catch (e) {
        return "No description available";
      }
    });
    const pageUrl = computed(() => {
      try {
        const canonicalUrl = document.querySelector('link[rel="canonical"]');
        if (canonicalUrl) {
          return canonicalUrl.getAttribute("href");
        }
        return window.location.href.replace(/^https?:\/\//, "");
      } catch (e) {
        return window.location.href.replace(/^https?:\/\//, "");
      }
    });
    const currentLanguage = computed(() => {
      try {
        const htmlTag = document.querySelector("html");
        return htmlTag.getAttribute("lang") || "tr";
      } catch (e) {
        return "tr";
      }
    });
    const hreflangExample = computed(() => {
      try {
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.split("/").slice(0, 3).join("/");
        const path = "/" + currentUrl.split("/").slice(3).join("/");
        return `<link rel="alternate" hreflang="tr" href="${baseUrl}${path}" />
<link rel="alternate" hreflang="en" href="${baseUrl}/en${path}" />
<link rel="alternate" hreflang="x-default" href="${baseUrl}" />`;
      } catch (e) {
        return '<link rel="alternate" hreflang="tr" href="..." />';
      }
    });
    const titleLengthStatus = computed(() => {
      const length = pageTitle.value.length;
      if (length < 30) return "too-short";
      if (length > 60) return "too-long";
      return "optimal";
    });
    const descriptionLengthStatus = computed(() => {
      const length = pageDescription.value.length;
      if (length < 50) return "too-short";
      if (length > 160) return "too-long";
      return "optimal";
    });
    const titleTooltip = computed(() => {
      const length = pageTitle.value.length;
      let status = "Ideal title length: 50-60 characters. ";
      if (titleLengthStatus.value === "too-short") {
        status += `Current: ${length} characters (Too short)`;
      } else if (titleLengthStatus.value === "too-long") {
        status += `Current: ${length} characters (Too long)`;
      } else {
        status += `Current: ${length} characters (Optimal)`;
      }
      return status;
    });
    const descriptionTooltip = computed(() => {
      const length = pageDescription.value.length;
      let status = "Ideal description length: 120-160 characters. ";
      if (descriptionLengthStatus.value === "too-short") {
        status += `Current: ${length} characters (Too short)`;
      } else if (descriptionLengthStatus.value === "too-long") {
        status += `Current: ${length} characters (Too long)`;
      } else {
        status += `Current: ${length} characters (Optimal)`;
      }
      return status;
    });
    const hasSlowOperations = computed(() => {
      try {
        if (!localPerformance.value) return false;
        for (const key in localPerformance.value) {
          if (key.includes("execution_time") && localPerformance.value[key] && localPerformance.value[key].is_slow) {
            return true;
          }
        }
        return false;
      } catch (e) {
        return false;
      }
    });
    const hasPerformanceData = computed(() => {
      try {
        return Object.keys(localPerformance.value).length > 0;
      } catch (e) {
        console.error("Error checking performance data:", e);
        return false;
      }
    });
    const formattedMetrics = computed(() => {
      if (!hasPerformanceData.value) return {};
      try {
        const metrics = {};
        Object.keys(localPerformance.value).forEach((key) => {
          if (key.includes("execution_time")) {
            metrics[key] = localPerformance.value[key];
          }
        });
        return metrics;
      } catch (e) {
        console.error("Error formatting metrics:", e);
        return {};
      }
    });
    computed(() => {
      try {
        return localPerformance.value && typeof localPerformance.value.count !== "undefined";
      } catch (e) {
        console.error("Error checking counts:", e);
        return false;
      }
    });
    computed(() => {
      try {
        return localPerformance.value.count || 0;
      } catch (e) {
        console.error("Error getting total count:", e);
        return 0;
      }
    });
    const isSlow = (metric) => {
      try {
        return metric && metric.is_slow === true;
      } catch (e) {
        return false;
      }
    };
    const getMetricValue = (metric) => {
      try {
        return metric && typeof metric.value !== "undefined" ? metric.value : "N/A";
      } catch (e) {
        return "Error";
      }
    };
    const formatLabel = (key) => {
      try {
        return key.replace("_execution_time", "").split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      } catch (e) {
        return key || "Unknown";
      }
    };
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    };
    onBeforeUnmount(() => {
      localPerformance.value = {};
      isOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-0704fdd7><button${ssrRenderAttr("data-tip", hasSlowOperations.value ? "Yavaş işlem tespit edildi" : "Performans Paneli")} class="${ssrRenderClass([{ "text-error": hasSlowOperations.value }, "btn btn-ghost btn-sm"])}" data-v-0704fdd7><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0704fdd7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-0704fdd7></path></svg></button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed left-0 right-0 top-0 z-50 mx-auto mt-4 w-full max-w-3xl rounded-box border border-base-300 bg-base-200 shadow-lg" data-v-0704fdd7><div class="flex items-center justify-between border-b border-base-300 px-4 py-3" data-v-0704fdd7><h3 class="text-base font-semibold" data-v-0704fdd7>Performans Paneli</h3><button class="btn btn-ghost btn-xs btn-circle" data-v-0704fdd7>✕</button></div><div class="max-h-[80vh] space-y-4 overflow-y-auto p-4 text-sm" data-v-0704fdd7>`);
          if (hasPerformanceData.value) {
            _push2(`<div data-v-0704fdd7><!--[-->`);
            ssrRenderList(formattedMetrics.value, (metric, key) => {
              _push2(`<div class="flex items-center justify-between" data-v-0704fdd7><span class="badge badge-ghost" data-v-0704fdd7>${ssrInterpolate(formatLabel(key))}</span><span class="${ssrRenderClass(isSlow(metric) ? "font-semibold text-error" : "font-mono text-success")}" data-v-0704fdd7>${ssrInterpolate(getMetricValue(metric))}</span></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<div class="alert alert-info p-2" data-v-0704fdd7>Performans verisi bulunamadı</div>`);
          }
          _push2(`<div class="seo-preview-section mt-4" data-v-0704fdd7><div class="collapse collapse-arrow rounded-box bg-base-200" data-v-0704fdd7><input type="checkbox" checked data-v-0704fdd7><div class="collapse-title font-medium" data-v-0704fdd7>Google Search Preview</div><div class="collapse-content p-2" data-v-0704fdd7><div class="google-preview rounded-box border border-base-300 bg-white p-2" data-v-0704fdd7><div class="flex flex-wrap items-center" data-v-0704fdd7><div${ssrRenderAttr("data-tip", titleTooltip.value)} class="${ssrRenderClass([titleLengthStatus.value, "google-title tooltip flex-grow hover:underline"])}" data-v-0704fdd7>${ssrInterpolate(truncateText(pageTitle.value, 100))} <span class="${ssrRenderClass([titleLengthStatus.value, "seo-indicator ml-1 inline-block"])}"${ssrRenderAttr("data-tip", titleTooltip.value)} data-v-0704fdd7></span></div></div><div class="google-url tooltip" data-tip="URL as shown in search results" data-v-0704fdd7>${ssrInterpolate(truncateText(pageUrl.value, 80))}</div><div class="flex flex-wrap items-start" data-v-0704fdd7><div${ssrRenderAttr("data-tip", descriptionTooltip.value)} class="${ssrRenderClass([descriptionLengthStatus.value, "google-description tooltip flex-grow"])}" data-v-0704fdd7>${ssrInterpolate(truncateText(pageDescription.value, 120))} <span class="${ssrRenderClass([descriptionLengthStatus.value, "seo-indicator ml-1 inline-block"])}"${ssrRenderAttr("data-tip", descriptionTooltip.value)} data-v-0704fdd7></span></div></div></div></div></div></div><div class="collapse collapse-arrow rounded-box border border-base-300 bg-base-100" data-v-0704fdd7><input type="checkbox" data-v-0704fdd7><div class="collapse-title font-medium" data-v-0704fdd7>Çok Dilli SEO</div><div class="collapse-content space-y-2 p-2 text-xs" data-v-0704fdd7><p data-v-0704fdd7> Aktif dil: <span class="badge badge-outline" data-v-0704fdd7>${ssrInterpolate(currentLanguage.value)}</span></p><div class="mockup-code max-h-40 overflow-auto whitespace-pre-wrap text-xs" data-v-0704fdd7><code data-v-0704fdd7>${ssrInterpolate(hreflangExample.value)}</code></div><ul class="mt-2 space-y-1" data-v-0704fdd7><li data-v-0704fdd7><span class="badge badge-success" data-v-0704fdd7>✓</span> Karşılıklı hreflang bağlantıları</li><li data-v-0704fdd7><span class="badge badge-success" data-v-0704fdd7>✓</span> \`x-default\` etiketi</li><li data-v-0704fdd7><span class="badge badge-success" data-v-0704fdd7>✓</span> Meta etiket çevirisi</li></ul></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/PerformanceMonitorButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PerformanceMonitorButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0704fdd7"]]);
export {
  PerformanceMonitorButton as default
};
