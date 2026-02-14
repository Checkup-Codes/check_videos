import { computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "JourneyTimeline",
  __ssrInlineRender: true,
  props: {
    entriesByYear: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const hasEntries = computed(() => {
      return Object.keys(props.entriesByYear).length > 0;
    });
    const sortedEntriesByYear = computed(() => {
      const sorted = {};
      Object.keys(props.entriesByYear).sort((a, b) => Number(a) - Number(b)).forEach((year) => {
        const yearEntries = Array.isArray(props.entriesByYear[year]) ? [...props.entriesByYear[year]].sort((a, b) => {
          const dateA = new Date(a.entry_date);
          const dateB = new Date(b.entry_date);
          return dateB - dateA;
        }) : props.entriesByYear[year];
        sorted[year] = yearEntries;
      });
      return sorted;
    });
    const sortedYearEntries = (yearEntries) => {
      if (!Array.isArray(yearEntries)) return [];
      return [...yearEntries].sort((a, b) => {
        const dateA = new Date(a.entry_date);
        const dateB = new Date(b.entry_date);
        return dateA - dateB;
      });
    };
    const isActive = (id) => {
      const currentUrl = page.url || window.location.pathname;
      return currentUrl.includes(`/journey/${id}`);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("tr-TR", {
          day: "numeric",
          month: "long"
        }).format(date);
      } catch {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "journey-timeline p-2" }, _attrs))} data-v-8a97a0f3>`);
      if (!hasEntries.value) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground" data-v-8a97a0f3><div class="space-y-2" data-v-8a97a0f3><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8a97a0f3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8a97a0f3></path></svg><p class="text-sm" data-v-8a97a0f3>Henüz kayıt yok</p></div></div>`);
      } else {
        _push(`<div class="space-y-6" data-v-8a97a0f3><!--[-->`);
        ssrRenderList(sortedEntriesByYear.value, (yearEntries, year) => {
          _push(`<div class="year-group" data-v-8a97a0f3><div class="mb-3 flex items-center gap-2" data-v-8a97a0f3><div class="flex h-8 items-center rounded-full bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm" data-v-8a97a0f3>${ssrInterpolate(year)}</div><div class="h-px flex-1 bg-border" data-v-8a97a0f3></div></div><div class="relative ml-4" data-v-8a97a0f3><div class="absolute left-2 top-0 h-full w-px bg-border" data-v-8a97a0f3></div><div class="space-y-3" data-v-8a97a0f3><!--[-->`);
          ssrRenderList(sortedYearEntries(yearEntries), (entry) => {
            _push(ssrRenderComponent(unref(Link), {
              key: entry.id,
              href: `/journey/${entry.id}`,
              class: "timeline-item group relative block pl-8"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="${ssrRenderClass([
                    isActive(entry.id) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background group-hover:border-primary group-hover:bg-primary/10",
                    "absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors"
                  ])}" data-v-8a97a0f3${_scopeId}>`);
                  if (!isActive(entry.id)) {
                    _push2(`<div class="h-2 w-2 rounded-full bg-muted-foreground/40 group-hover:bg-primary" data-v-8a97a0f3${_scopeId}></div>`);
                  } else {
                    _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" data-v-8a97a0f3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-8a97a0f3${_scopeId}></path></svg>`);
                  }
                  _push2(`</div><div class="${ssrRenderClass([
                    isActive(entry.id) ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-card hover:border-primary/50 hover:shadow-sm",
                    "rounded-lg border p-3 transition-all"
                  ])}" data-v-8a97a0f3${_scopeId}><div class="${ssrRenderClass([isActive(entry.id) ? "text-primary-foreground/70" : "text-muted-foreground", "mb-1 flex items-center gap-1.5 text-[10px]"])}" data-v-8a97a0f3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8a97a0f3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-8a97a0f3${_scopeId}></path></svg><span data-v-8a97a0f3${_scopeId}>${ssrInterpolate(formatDate(entry.entry_date))}</span>`);
                  if (entry.status === "draft") {
                    _push2(`<span class="ml-auto rounded bg-yellow-500/20 px-1.5 py-0.5 text-[9px] font-medium text-yellow-600 dark:text-yellow-400" data-v-8a97a0f3${_scopeId}> Taslak </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><h4 class="${ssrRenderClass([isActive(entry.id) ? "text-primary-foreground" : "text-foreground", "line-clamp-2 text-[11px] font-medium leading-snug"])}" data-v-8a97a0f3${_scopeId}>${ssrInterpolate(entry.title)}</h4></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: [
                        "absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                        isActive(entry.id) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background group-hover:border-primary group-hover:bg-primary/10"
                      ]
                    }, [
                      !isActive(entry.id) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "h-2 w-2 rounded-full bg-muted-foreground/40 group-hover:bg-primary"
                      })) : (openBlock(), createBlock("svg", {
                        key: 1,
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-2.5 w-2.5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "3"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M5 13l4 4L19 7"
                        })
                      ]))
                    ], 2),
                    createVNode("div", {
                      class: [
                        "rounded-lg border p-3 transition-all",
                        isActive(entry.id) ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                      ]
                    }, [
                      createVNode("div", {
                        class: ["mb-1 flex items-center gap-1.5 text-[10px]", isActive(entry.id) ? "text-primary-foreground/70" : "text-muted-foreground"]
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          })
                        ])),
                        createVNode("span", null, toDisplayString(formatDate(entry.entry_date)), 1),
                        entry.status === "draft" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-auto rounded bg-yellow-500/20 px-1.5 py-0.5 text-[9px] font-medium text-yellow-600 dark:text-yellow-400"
                        }, " Taslak ")) : createCommentVNode("", true)
                      ], 2),
                      createVNode("h4", {
                        class: ["line-clamp-2 text-[11px] font-medium leading-snug", isActive(entry.id) ? "text-primary-foreground" : "text-foreground"]
                      }, toDisplayString(entry.title), 3)
                    ], 2)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/_components/JourneyTimeline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const JourneyTimeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8a97a0f3"]]);
export {
  JourneyTimeline as default
};
