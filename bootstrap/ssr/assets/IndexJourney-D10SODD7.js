import { ref, computed, onMounted, nextTick, onUnmounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-CJ7QJRBs.js";
import { _ as _export_sfc } from "../ssr.js";
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexJourney",
  __ssrInlineRender: true,
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    entriesByYear: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const scrollContainer = ref(null);
    const cardRefs = ref({});
    const currentYear = ref("");
    const scrollProgress = ref(0);
    const hoveredIndex = ref(null);
    const cardWidthClass = computed(() => {
      return "w-[240px] sm:w-[220px] lg:w-[260px]";
    });
    const years = computed(() => {
      return Object.keys(props.entriesByYear || {}).sort((a, b) => Number(b) - Number(a));
    });
    onMounted(() => {
      if (years.value.length > 0) {
        currentYear.value = years.value[0];
      }
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollLeft = 0;
        }
      });
      window.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    const handleKeydown = (e) => {
      if (e.key === "ArrowLeft") scroll(-1);
      if (e.key === "ArrowRight") scroll(1);
    };
    const scroll = (direction) => {
      if (!scrollContainer.value) return;
      const cardWidth = window.innerWidth < 640 ? 256 : window.innerWidth < 1024 ? 236 : 276;
      scrollContainer.value.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    };
    const scrollToYear = (year) => {
      const index = props.entries.findIndex((e) => getYear(e.entry_date) === year);
      if (index !== -1 && cardRefs.value[index]) {
        cardRefs.value[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    };
    const handleScroll = () => {
      if (!scrollContainer.value) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
      scrollProgress.value = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) * 100 : 0;
      const containerRect = scrollContainer.value.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      for (const [index, el] of Object.entries(cardRefs.value)) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.left <= centerX && rect.right >= centerX) {
            const entry = props.entries[index];
            if (entry) {
              currentYear.value = getYear(entry.entry_date);
            }
            break;
          }
        }
      }
    };
    const getYear = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).getFullYear().toString();
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="journey-page h-full overflow-hidden bg-background" data-v-6461b4ef${_scopeId}><div class="flex h-full flex-col" data-v-6461b4ef${_scopeId}><div class="flex-1 flex items-center overflow-hidden" data-v-6461b4ef${_scopeId}><div class="w-full overflow-x-auto overflow-y-hidden hide-scrollbar px-4 sm:px-6" data-v-6461b4ef${_scopeId}><div class="inline-flex items-start gap-3 py-4 sm:gap-4" data-v-6461b4ef${_scopeId}><!--[-->`);
            ssrRenderList(__props.entries, (entry, index) => {
              _push2(`<div${ssrRenderAttr("data-year", getYear(entry.entry_date))} class="card-item flex-shrink-0 flex flex-col" data-v-6461b4ef${_scopeId}><div class="mb-2 text-xs font-medium text-muted-foreground" data-v-6461b4ef${_scopeId}>${ssrInterpolate(formatDate(entry.entry_date))}</div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/journey/${entry.id}`,
                class: ["group relative block overflow-hidden rounded-xl card-height", cardWidthClass.value]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="absolute inset-0 bg-muted" data-v-6461b4ef${_scopeId2}>`);
                    if (entry.image) {
                      _push3(`<img${ssrRenderAttr("src", `/storage/${entry.image}`)}${ssrRenderAttr("alt", entry.title)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-6461b4ef${_scopeId2}>`);
                    } else {
                      _push3(`<div class="h-full w-full bg-gradient-to-br from-primary/30 to-primary/5" data-v-6461b4ef${_scopeId2}></div>`);
                    }
                    _push3(`</div><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" data-v-6461b4ef${_scopeId2}></div><div class="absolute inset-x-0 bottom-0 p-3 sm:p-4" data-v-6461b4ef${_scopeId2}><h3 class="text-sm font-bold text-white line-clamp-2 sm:text-base" data-v-6461b4ef${_scopeId2}>${ssrInterpolate(entry.title)}</h3></div>`);
                    if (entry.status === "draft") {
                      _push3(`<div class="absolute right-2 top-2 z-10" data-v-6461b4ef${_scopeId2}><span class="rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-semibold text-yellow-950" data-v-6461b4ef${_scopeId2}> Taslak </span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="absolute inset-0 rounded-xl border-2 border-white/0 transition-colors group-hover:border-primary/50" data-v-6461b4ef${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "absolute inset-0 bg-muted" }, [
                        entry.image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `/storage/${entry.image}`,
                          alt: entry.title,
                          class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "h-full w-full bg-gradient-to-br from-primary/30 to-primary/5"
                        }))
                      ]),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                      createVNode("div", { class: "absolute inset-x-0 bottom-0 p-3 sm:p-4" }, [
                        createVNode("h3", { class: "text-sm font-bold text-white line-clamp-2 sm:text-base" }, toDisplayString(entry.title), 1)
                      ]),
                      entry.status === "draft" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute right-2 top-2 z-10"
                      }, [
                        createVNode("span", { class: "rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-semibold text-yellow-950" }, " Taslak ")
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "absolute inset-0 rounded-xl border-2 border-white/0 transition-colors group-hover:border-primary/50" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="${ssrRenderClass([cardWidthClass.value, "mt-2 h-5 overflow-hidden"])}" data-v-6461b4ef${_scopeId}><p class="${ssrRenderClass([hoveredIndex.value === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2", "text-xs text-muted-foreground transition-all duration-300"])}" data-v-6461b4ef${_scopeId}>${ssrInterpolate(truncateText(entry.description, 50))}</p></div></div>`);
            });
            _push2(`<!--]--><div class="w-4 flex-shrink-0 sm:w-6" data-v-6461b4ef${_scopeId}></div></div></div></div><div class="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-sm" data-v-6461b4ef${_scopeId}><div class="px-4 py-2 sm:px-6 sm:py-3" data-v-6461b4ef${_scopeId}><div class="mb-2 h-1 overflow-hidden rounded-full bg-muted" data-v-6461b4ef${_scopeId}><div class="h-full rounded-full bg-primary transition-all duration-300" style="${ssrRenderStyle({ width: `${scrollProgress.value}%` })}" data-v-6461b4ef${_scopeId}></div></div><div class="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar" data-v-6461b4ef${_scopeId}><!--[-->`);
            ssrRenderList(years.value, (year) => {
              _push2(`<button class="${ssrRenderClass([currentYear.value === year ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80", "flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all"])}" data-v-6461b4ef${_scopeId}>${ssrInterpolate(year)}</button>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
            if (__props.entries.length > 0) {
              _push2(`<button class="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:left-4 sm:h-10 sm:w-10" data-v-6461b4ef${_scopeId}><svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6461b4ef${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-6461b4ef${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.entries.length > 0) {
              _push2(`<button class="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:right-4 sm:h-10 sm:w-10" data-v-6461b4ef${_scopeId}><svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6461b4ef${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-6461b4ef${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.entries.length === 0) {
              _push2(`<div class="absolute inset-0 flex items-center justify-center" data-v-6461b4ef${_scopeId}><div class="text-center" data-v-6461b4ef${_scopeId}><div class="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center" data-v-6461b4ef${_scopeId}><svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6461b4ef${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6461b4ef${_scopeId}></path></svg></div><p class="text-muted-foreground" data-v-6461b4ef${_scopeId}>Henüz kayıt yok</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "journey-page h-full overflow-hidden bg-background" }, [
                createVNode("div", { class: "flex h-full flex-col" }, [
                  createVNode("div", { class: "flex-1 flex items-center overflow-hidden" }, [
                    createVNode("div", {
                      ref_key: "scrollContainer",
                      ref: scrollContainer,
                      class: "w-full overflow-x-auto overflow-y-hidden hide-scrollbar px-4 sm:px-6",
                      onScroll: handleScroll
                    }, [
                      createVNode("div", { class: "inline-flex items-start gap-3 py-4 sm:gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.entries, (entry, index) => {
                          return openBlock(), createBlock("div", {
                            key: entry.id,
                            ref_for: true,
                            ref: (el) => cardRefs.value[index] = el,
                            "data-year": getYear(entry.entry_date),
                            class: "card-item flex-shrink-0 flex flex-col",
                            onMouseenter: ($event) => hoveredIndex.value = index,
                            onMouseleave: ($event) => hoveredIndex.value = null
                          }, [
                            createVNode("div", { class: "mb-2 text-xs font-medium text-muted-foreground" }, toDisplayString(formatDate(entry.entry_date)), 1),
                            createVNode(unref(Link), {
                              href: `/journey/${entry.id}`,
                              class: ["group relative block overflow-hidden rounded-xl card-height", cardWidthClass.value]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "absolute inset-0 bg-muted" }, [
                                  entry.image ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${entry.image}`,
                                    alt: entry.title,
                                    class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "h-full w-full bg-gradient-to-br from-primary/30 to-primary/5"
                                  }))
                                ]),
                                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                                createVNode("div", { class: "absolute inset-x-0 bottom-0 p-3 sm:p-4" }, [
                                  createVNode("h3", { class: "text-sm font-bold text-white line-clamp-2 sm:text-base" }, toDisplayString(entry.title), 1)
                                ]),
                                entry.status === "draft" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute right-2 top-2 z-10"
                                }, [
                                  createVNode("span", { class: "rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-semibold text-yellow-950" }, " Taslak ")
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "absolute inset-0 rounded-xl border-2 border-white/0 transition-colors group-hover:border-primary/50" })
                              ]),
                              _: 2
                            }, 1032, ["href", "class"]),
                            createVNode("div", {
                              class: ["mt-2 h-5 overflow-hidden", cardWidthClass.value]
                            }, [
                              createVNode("p", {
                                class: ["text-xs text-muted-foreground transition-all duration-300", hoveredIndex.value === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"]
                              }, toDisplayString(truncateText(entry.description, 50)), 3)
                            ], 2)
                          ], 40, ["data-year", "onMouseenter", "onMouseleave"]);
                        }), 128)),
                        createVNode("div", { class: "w-4 flex-shrink-0 sm:w-6" })
                      ])
                    ], 544)
                  ]),
                  createVNode("div", { class: "flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-sm" }, [
                    createVNode("div", { class: "px-4 py-2 sm:px-6 sm:py-3" }, [
                      createVNode("div", { class: "mb-2 h-1 overflow-hidden rounded-full bg-muted" }, [
                        createVNode("div", {
                          class: "h-full rounded-full bg-primary transition-all duration-300",
                          style: { width: `${scrollProgress.value}%` }
                        }, null, 4)
                      ]),
                      createVNode("div", { class: "flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(years.value, (year) => {
                          return openBlock(), createBlock("button", {
                            key: year,
                            onClick: ($event) => scrollToYear(year),
                            class: ["flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all", currentYear.value === year ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"]
                          }, toDisplayString(year), 11, ["onClick"]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                __props.entries.length > 0 ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: ($event) => scroll(-1),
                  class: "absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:left-4 sm:h-10 sm:w-10"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4 sm:h-5 sm:w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 19l-7-7 7-7"
                    })
                  ]))
                ], 8, ["onClick"])) : createCommentVNode("", true),
                __props.entries.length > 0 ? (openBlock(), createBlock("button", {
                  key: 1,
                  onClick: ($event) => scroll(1),
                  class: "absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:right-4 sm:h-10 sm:w-10"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4 sm:h-5 sm:w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ], 8, ["onClick"])) : createCommentVNode("", true),
                __props.entries.length === 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "absolute inset-0 flex items-center justify-center"
                }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("div", { class: "mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-8 w-8 text-muted-foreground",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1.5",
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "text-muted-foreground" }, "Henüz kayıt yok")
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/IndexJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndexJourney = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6461b4ef"]]);
export {
  IndexJourney as default
};
