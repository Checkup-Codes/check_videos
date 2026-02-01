import { ref, onMounted, onUnmounted, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
const _sfc_main = {
  __name: "ActivityHeatmap",
  __ssrInlineRender: true,
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("added");
    const tooltip = ref({
      show: false,
      day: null
    });
    const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", updateWidth);
      }
    });
    onUnmounted(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateWidth);
      }
    });
    const weeks = computed(() => {
      const data = props.stats.data || [];
      const result = [];
      let currentWeek = [];
      data.forEach((day, index) => {
        const date = new Date(day.date);
        const dayOfWeek = date.getDay();
        const mondayBased = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        if (index === 0 && mondayBased > 0) {
          for (let i = 0; i < mondayBased; i++) {
            currentWeek.push(null);
          }
        }
        currentWeek.push(day);
        if (mondayBased === 6 || index === data.length - 1) {
          while (currentWeek.length < 7) {
            currentWeek.push(null);
          }
          result.push(currentWeek);
          currentWeek = [];
        }
      });
      return result;
    });
    const monthLabels = computed(() => {
      props.stats.data || [];
      const labels = [];
      let currentMonth = null;
      let weekCount = 0;
      weeks.value.forEach((week) => {
        const firstDay = week.find((d) => d !== null);
        if (firstDay) {
          const date = new Date(firstDay.date);
          const month = date.toLocaleDateString("tr-TR", { month: "short" });
          if (month !== currentMonth) {
            labels.push({
              label: month,
              width: 12,
              // Will be adjusted
              weekIndex: weekCount
            });
            currentMonth = month;
          }
        }
        weekCount++;
      });
      labels.forEach((label, index) => {
        const nextIndex = index + 1 < labels.length ? labels[index + 1].weekIndex : weeks.value.length;
        const cellWidth = windowWidth.value < 640 ? 10 : 16;
        label.width = (nextIndex - label.weekIndex) * cellWidth;
      });
      return labels;
    });
    const getColor = (count) => {
      if (count === 0) return "rgb(var(--muted) / 0.3)";
      if (count <= 2) return "rgb(34, 197, 94, 0.3)";
      if (count <= 5) return "rgb(34, 197, 94, 0.5)";
      if (count <= 10) return "rgb(34, 197, 94, 0.7)";
      return "rgb(34, 197, 94, 1)";
    };
    const getCellColor = (day) => {
      if (!day) return "transparent";
      if (day.is_future) {
        return "rgb(var(--muted) / 0.15)";
      }
      const count = activeTab.value === "added" ? day.added : day.reviewed;
      return getColor(count);
    };
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex gap-2 border-b border-border"><button class="${ssrRenderClass([activeTab.value === "added" ? "text-primary" : "text-muted-foreground hover:text-foreground", "relative px-4 py-2 text-sm font-medium transition-colors"])}"> Eklenen Kelimeler `);
      if (activeTab.value === "added") {
        _push(`<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="${ssrRenderClass([activeTab.value === "reviewed" ? "text-primary" : "text-muted-foreground hover:text-foreground", "relative px-4 py-2 text-sm font-medium transition-colors"])}"> Çalışılan Kelimeler `);
      if (activeTab.value === "reviewed") {
        _push(`<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="grid grid-cols-2 gap-4 sm:grid-cols-4"><div class="rounded-lg border border-border bg-card p-4"><div class="text-2xl font-bold text-foreground">${ssrInterpolate(activeTab.value === "added" ? __props.stats.summary.totalWordsAdded : __props.stats.summary.totalWordsReviewed)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(activeTab.value === "added" ? "Toplam Eklenen" : "Toplam Çalışılan")}</div></div><div class="rounded-lg border border-border bg-card p-4"><div class="text-2xl font-bold text-foreground">${ssrInterpolate(activeTab.value === "added" ? __props.stats.summary.avgWordsAddedPerDay : __props.stats.summary.avgWordsReviewedPerDay)}</div><div class="text-xs text-muted-foreground">Günlük Ortalama</div></div><div class="rounded-lg border border-border bg-card p-4"><div class="text-2xl font-bold text-foreground">${ssrInterpolate(__props.stats.summary.currentStreak)}</div><div class="text-xs text-muted-foreground">Güncel Seri</div></div><div class="rounded-lg border border-border bg-card p-4"><div class="text-2xl font-bold text-foreground">${ssrInterpolate(__props.stats.summary.longestStreak)}</div><div class="text-xs text-muted-foreground">En Uzun Seri</div></div></div><div class="rounded-xl border border-border bg-card p-3 sm:p-6"><div class="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between"><h3 class="text-sm font-medium text-foreground">${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Yılı Aktivitesi</h3><div class="flex items-center gap-2 text-xs text-muted-foreground"><span class="hidden sm:inline">Az</span><div class="flex gap-0.5 sm:gap-1"><div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" style="${ssrRenderStyle({ backgroundColor: getColor(0) })}"></div><div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" style="${ssrRenderStyle({ backgroundColor: getColor(1) })}"></div><div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" style="${ssrRenderStyle({ backgroundColor: getColor(5) })}"></div><div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" style="${ssrRenderStyle({ backgroundColor: getColor(10) })}"></div><div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" style="${ssrRenderStyle({ backgroundColor: getColor(20) })}"></div></div><span class="hidden sm:inline">Çok</span></div></div><div class="w-full overflow-x-auto"><div class="inline-flex min-w-full flex-col gap-0.5 sm:gap-1"><div class="flex gap-0.5 pl-4 sm:gap-1 sm:pl-8"><!--[-->`);
      ssrRenderList(monthLabels.value, (month, index) => {
        _push(`<div class="text-[10px] text-muted-foreground sm:text-xs" style="${ssrRenderStyle({ width: month.width + "px", textAlign: "left" })}">${ssrInterpolate(month.label)}</div>`);
      });
      _push(`<!--]--></div><div class="flex gap-0.5 sm:gap-1"><div class="flex flex-col justify-around text-[10px] text-muted-foreground sm:text-xs"><div>Pzt</div><div class="hidden sm:block">Çar</div><div>Cum</div></div><div class="flex gap-0.5 sm:gap-1"><!--[-->`);
      ssrRenderList(weeks.value, (week, weekIndex) => {
        _push(`<div class="flex flex-col gap-0.5 sm:gap-1"><!--[-->`);
        ssrRenderList(week, (day, dayIndex) => {
          _push(`<div class="${ssrRenderClass([day && !day.is_future ? "hover:ring-1 hover:ring-primary sm:hover:ring-2 cursor-pointer" : (day == null ? void 0 : day.is_future) ? "cursor-not-allowed opacity-60" : "", "group relative h-2 w-2 rounded-[2px] transition-all sm:h-3 sm:w-3 sm:rounded-sm"])}" style="${ssrRenderStyle({ backgroundColor: getCellColor(day) })}">`);
          if (day == null ? void 0 : day.is_future) {
            _push(`<div class="absolute inset-0 hidden items-center justify-center sm:flex"><svg class="h-1.5 w-1.5 text-muted-foreground/40" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          if (!(day == null ? void 0 : day.is_future) && tooltip.value.show && tooltip.value.day === day) {
            _push(`<div class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg"><div class="font-medium text-foreground">${ssrInterpolate(formatDate(day.date))}</div><div class="text-muted-foreground">${ssrInterpolate(activeTab.value === "added" ? day.added : day.reviewed)} kelime ${ssrInterpolate(activeTab.value === "added" ? "eklendi" : "çalışıldı")}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/ActivityHeatmap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
