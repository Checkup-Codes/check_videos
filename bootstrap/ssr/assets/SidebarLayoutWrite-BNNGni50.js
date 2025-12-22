import { computed, ref, inject, watch, onMounted, onUnmounted, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, withModifiers, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import WriteList from "./WriteList-ygXXLO-9.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DNDkVWuC.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-BaVEfKio.js";
import { u as useSidebar } from "./useSidebar-D-dtiIC8.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutWrite"
}, {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const store = useStore();
    const page = usePage();
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isListView = computed(() => {
      const url = page.url;
      return url.startsWith("/writes") && !url.startsWith("/categories");
    });
    const showWriteFilterDropdown = ref(false);
    const writeFilter = ref("all");
    const getFilterLabel = (filter) => {
      const filterLabels = {
        all: "Tümü",
        published: "Herkese Açık",
        link_only: "Sadece Link",
        private: "Gizli"
      };
      return filterLabels[filter] || "Tümü";
    };
    const setWriteFilter = (filter) => {
      writeFilter.value = filter;
      localStorage.setItem("writeListFilter", filter);
      showWriteFilterDropdown.value = false;
      window.dispatchEvent(new CustomEvent("writeFilterChanged", { detail: filter }));
    };
    const clearWriteFilter = () => {
      setWriteFilter("all");
    };
    const { props } = usePage();
    const writes = inject("writes", []);
    const writeListRef = ref(null);
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    let clickOutsideHandler = null;
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      localStorage.setItem("writeSidebarScroll", scrollTop.toString());
    };
    onMounted(() => {
      const savedFilter = localStorage.getItem("writeListFilter");
      if (savedFilter) {
        writeFilter.value = savedFilter;
      }
      isNarrow.value = store.getters["Writes/isCollapsed"];
      if (scrollableRef.value) {
        const element = scrollableRef.value.$el || scrollableRef.value;
        if (element && element.addEventListener) {
          element.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem("writeSidebarScroll");
          if (savedScroll) {
            element.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
      clickOutsideHandler = (event) => {
        if (showWriteFilterDropdown.value && !event.target.closest(".write-filter-dropdown-container")) {
          showWriteFilterDropdown.value = false;
        }
      };
      document.addEventListener("click", clickOutsideHandler);
    });
    onUnmounted(() => {
      if (clickOutsideHandler) {
        document.removeEventListener("click", clickOutsideHandler);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="shrink-0 border-b border-border bg-background/95 p-2" data-v-009b4a07${_scopeId}><div class="flex items-center justify-between gap-2" data-v-009b4a07${_scopeId}><div class="flex items-center gap-1" data-v-009b4a07${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.index"),
              class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
              title: "Liste görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-009b4a07${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-009b4a07${_scopeId2}></path></svg>`);
                  if (!isNarrow.value) {
                    _push3(`<span data-v-009b4a07${_scopeId2}>Liste</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-3 w-3",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M4 6h16M4 12h16M4 18h16"
                      })
                    ])),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.index"),
              class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
              title: "Kategori görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-009b4a07${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-009b4a07${_scopeId2}></path></svg>`);
                  if (!isNarrow.value) {
                    _push3(`<span data-v-009b4a07${_scopeId2}>Kategori</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-3 w-3",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      })
                    ])),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (isLoggedIn.value) {
              _push2(`<div class="flex items-center gap-1" data-v-009b4a07${_scopeId}>`);
              if (writeFilter.value !== "all") {
                _push2(`<button class="inline-flex h-6 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" title="Filtreyi temizle" data-v-009b4a07${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-009b4a07${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-009b4a07${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="relative write-filter-dropdown-container" data-v-009b4a07${_scopeId}><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": showWriteFilterDropdown.value }, "inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}" title="Filtrele" data-v-009b4a07${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-009b4a07${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" data-v-009b4a07${_scopeId}></path></svg><span class="text-xs" data-v-009b4a07${_scopeId}>${ssrInterpolate(getFilterLabel(writeFilter.value))}</span></button>`);
              if (showWriteFilterDropdown.value) {
                _push2(`<div class="absolute left-0 top-full z-50 mt-1 w-32 rounded-md border border-border bg-popover shadow-md" data-v-009b4a07${_scopeId}><div class="flex flex-col p-1" data-v-009b4a07${_scopeId}><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "all" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-009b4a07${_scopeId}> Tümü </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "published" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-009b4a07${_scopeId}> Herkese Açık </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "link_only" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-009b4a07${_scopeId}> Sadece Link </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "private" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-009b4a07${_scopeId}> Gizli </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "flex-1 min-h-0 sidebar-content-embedded",
              infoClass: "flex flex-col h-full min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: unref(writes),
                    route: _ctx.route,
                    isCollapsed: isNarrow.value,
                    class: "flex-1 min-h-0"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(WriteList, {
                      ref_key: "writeListRef",
                      ref: writeListRef,
                      writes: unref(writes),
                      route: _ctx.route,
                      isCollapsed: isNarrow.value,
                      class: "flex-1 min-h-0"
                    }, null, 8, ["writes", "route", "isCollapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "shrink-0 border-b border-border bg-background/95 p-2" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("writes.index"),
                      class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
                      title: "Liste görünümü"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 6h16M4 12h16M4 18h16"
                          })
                        ])),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("categories.index"),
                      class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
                      title: "Kategori görünümü"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ])),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"])
                  ]),
                  isLoggedIn.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-1"
                  }, [
                    writeFilter.value !== "all" ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: clearWriteFilter,
                      class: "inline-flex h-6 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      title: "Filtreyi temizle"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "relative write-filter-dropdown-container" }, [
                      createVNode("button", {
                        onClick: withModifiers(($event) => showWriteFilterDropdown.value = !showWriteFilterDropdown.value, ["stop"]),
                        class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": showWriteFilterDropdown.value }],
                        title: "Filtrele"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
                          })
                        ])),
                        createVNode("span", { class: "text-xs" }, toDisplayString(getFilterLabel(writeFilter.value)), 1)
                      ], 10, ["onClick"]),
                      showWriteFilterDropdown.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute left-0 top-full z-50 mt-1 w-32 rounded-md border border-border bg-popover shadow-md"
                      }, [
                        createVNode("div", { class: "flex flex-col p-1" }, [
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "all" }],
                            onClick: ($event) => setWriteFilter("all")
                          }, " Tümü ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "published" }],
                            onClick: ($event) => setWriteFilter("published")
                          }, " Herkese Açık ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "link_only" }],
                            onClick: ($event) => setWriteFilter("link_only")
                          }, " Sadece Link ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "private" }],
                            onClick: ($event) => setWriteFilter("private")
                          }, " Gizli ", 10, ["onClick"])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "flex-1 min-h-0 sidebar-content-embedded",
                infoClass: "flex flex-col h-full min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: unref(writes),
                    route: _ctx.route,
                    isCollapsed: isNarrow.value,
                    class: "flex-1 min-h-0"
                  }, null, 8, ["writes", "route", "isCollapsed"])
                ]),
                _: 1
              }, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutWrite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-009b4a07"]]);
export {
  SidebarLayoutWrite as default
};
