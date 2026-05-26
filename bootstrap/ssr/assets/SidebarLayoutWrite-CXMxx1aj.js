import { computed, ref, inject, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, onUnmounted, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, withModifiers, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import WriteList from "./WriteList-CJo1q97G.js";
import { _ as _sfc_main$1, S as SubSidebarHeader, a as _sfc_main$6, b as _sfc_main$7 } from "./SubSidebarContent-QVixNVtK.js";
import { u as useSidebar } from "./useSidebar-D-dtiIC8.js";
import { useStore } from "vuex";
import _sfc_main$2 from "./IconMenu-D3qnKg3d.js";
import _sfc_main$3 from "./IconFolder-BMytUC2M.js";
import _sfc_main$4 from "./IconX-B1Q85S0Q.js";
import _sfc_main$5 from "./IconFilter-Cx1-Qiq_.js";
import { _ as _export_sfc } from "../ssr.js";
import "./IconCalendar-BeMkwtmn.js";
import "./IconEye-C4IDtysD.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
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
    const writeFilter = computed({
      get: () => store.getters["Writes/filter"],
      set: (val) => store.dispatch("Writes/setFilter", val)
    });
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
      store.dispatch("Writes/setFilter", filter);
      showWriteFilterDropdown.value = false;
      window.dispatchEvent(new CustomEvent("writeFilterChanged", { detail: filter }));
    };
    const clearWriteFilter = () => {
      setWriteFilter("all");
    };
    const { props } = usePage();
    const writes = inject("writes", []);
    const writesCount = computed(() => {
      const value = (writes == null ? void 0 : writes.value) ?? writes;
      return Array.isArray(value) ? value.length : 0;
    });
    const writeListRef = ref(null);
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    let clickOutsideHandler = null;
    let scrollHandler = null;
    const getScrollElement = () => {
      var _a, _b, _c;
      if ((_b = (_a = scrollableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.value) {
        return scrollableRef.value.$el.value;
      }
      if ((_c = scrollableRef.value) == null ? void 0 : _c.$el) {
        return scrollableRef.value.$el;
      }
      return scrollableRef.value;
    };
    const saveScrollPosition = () => {
      const scrollElement = getScrollElement();
      if (scrollElement) {
        const scrollTop = scrollElement.scrollTop || 0;
        store.dispatch("Writes/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["Writes/scrollPosition"];
          if (savedPosition > 0) {
            scrollElement.scrollTop = savedPosition;
          }
        }
      });
    };
    const setupScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && !scrollHandler) {
        scrollHandler = () => saveScrollPosition();
        scrollElement.addEventListener("scroll", scrollHandler, { passive: true });
      }
    };
    const removeScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && scrollHandler) {
        scrollElement.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
      clickOutsideHandler = (event) => {
        if (showWriteFilterDropdown.value && !event.target.closest(".write-filter-dropdown-container")) {
          showWriteFilterDropdown.value = false;
        }
      };
      document.addEventListener("click", clickOutsideHandler);
    });
    onActivated(() => {
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onDeactivated(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    onBeforeUnmount(() => {
      saveScrollPosition();
      removeScrollListener();
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
            _push2(ssrRenderComponent(SubSidebarHeader, {
              title: "Yazılar",
              description: String(writesCount.value)
            }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("writes.index"),
                    class: [
                      "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                      isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    ],
                    title: "Liste görünümü"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3 shrink-0" }, null, _parent4, _scopeId3));
                        if (!isNarrow.value) {
                          _push4(`<span data-v-9386deed${_scopeId3}>Liste</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$2, { class: "h-3 w-3 shrink-0" }),
                          !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("categories.index"),
                    class: [
                      "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                      !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    ],
                    title: "Kategori görünümü"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, { class: "h-3 w-3 shrink-0" }, null, _parent4, _scopeId3));
                        if (!isNarrow.value) {
                          _push4(`<span data-v-9386deed${_scopeId3}>Kategori</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$3, { class: "h-3 w-3 shrink-0" }),
                          !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isLoggedIn.value) {
                    _push3(`<!--[-->`);
                    if (writeFilter.value !== "all") {
                      _push3(`<button class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" title="Filtreyi temizle" data-v-9386deed${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$4, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                      _push3(`</button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="write-filter-dropdown-container relative shrink-0" data-v-9386deed${_scopeId2}><button class="${ssrRenderClass([
                      showWriteFilterDropdown.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    ])}" title="Filtrele" data-v-9386deed${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$5, { class: "h-3 w-3 shrink-0" }, null, _parent3, _scopeId2));
                    if (!isNarrow.value) {
                      _push3(`<span data-v-9386deed${_scopeId2}>${ssrInterpolate(getFilterLabel(writeFilter.value))}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</button>`);
                    if (showWriteFilterDropdown.value) {
                      _push3(`<div class="absolute right-0 top-full z-50 mt-1 w-40 rounded border border-border bg-popover shadow-lg" data-v-9386deed${_scopeId2}><div class="flex flex-col gap-0.5 p-1" data-v-9386deed${_scopeId2}><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "all" }, "inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-9386deed${_scopeId2}> Tümü </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "published" }, "inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-9386deed${_scopeId2}> Herkese Açık </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "link_only" }, "inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-9386deed${_scopeId2}> Sadece Link </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "private" }, "inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"])}" data-v-9386deed${_scopeId2}> Gizli </button></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("writes.index"),
                      class: [
                        "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                        isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Liste görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "h-3 w-3 shrink-0" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("categories.index"),
                      class: [
                        "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                        !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Kategori görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { class: "h-3 w-3 shrink-0" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    isLoggedIn.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      writeFilter.value !== "all" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: clearWriteFilter,
                        class: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                        title: "Filtreyi temizle"
                      }, [
                        createVNode(_sfc_main$4, { class: "h-3 w-3" })
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "write-filter-dropdown-container relative shrink-0" }, [
                        createVNode("button", {
                          onClick: withModifiers(($event) => showWriteFilterDropdown.value = !showWriteFilterDropdown.value, ["stop"]),
                          class: [
                            "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                            showWriteFilterDropdown.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          ],
                          title: "Filtrele"
                        }, [
                          createVNode(_sfc_main$5, { class: "h-3 w-3 shrink-0" }),
                          !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getFilterLabel(writeFilter.value)), 1)) : createCommentVNode("", true)
                        ], 10, ["onClick"]),
                        showWriteFilterDropdown.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute right-0 top-full z-50 mt-1 w-40 rounded border border-border bg-popover shadow-lg"
                        }, [
                          createVNode("div", { class: "flex flex-col gap-0.5 p-1" }, [
                            createVNode("button", {
                              class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "all" }],
                              onClick: ($event) => setWriteFilter("all")
                            }, " Tümü ", 10, ["onClick"]),
                            createVNode("button", {
                              class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "published" }],
                              onClick: ($event) => setWriteFilter("published")
                            }, " Herkese Açık ", 10, ["onClick"]),
                            createVNode("button", {
                              class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "link_only" }],
                              onClick: ($event) => setWriteFilter("link_only")
                            }, " Sadece Link ", 10, ["onClick"]),
                            createVNode("button", {
                              class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "private" }],
                              onClick: ($event) => setWriteFilter("private")
                            }, " Gizli ", 10, ["onClick"])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(WriteList, {
                          ref_key: "writeListRef",
                          ref: writeListRef,
                          writes: unref(writes),
                          route: _ctx.route,
                          isCollapsed: isNarrow.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(WriteList, {
                            ref_key: "writeListRef",
                            ref: writeListRef,
                            writes: unref(writes),
                            route: _ctx.route,
                            isCollapsed: isNarrow.value
                          }, null, 8, ["writes", "route", "isCollapsed"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$7, null, {
                      default: withCtx(() => [
                        createVNode(WriteList, {
                          ref_key: "writeListRef",
                          ref: writeListRef,
                          writes: unref(writes),
                          route: _ctx.route,
                          isCollapsed: isNarrow.value
                        }, null, 8, ["writes", "route", "isCollapsed"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(SubSidebarHeader, {
                title: "Yazılar",
                description: String(writesCount.value)
              }, {
                actions: withCtx(() => [
                  createVNode(unref(Link), {
                    href: _ctx.route("writes.index"),
                    class: [
                      "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                      isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    ],
                    title: "Liste görünümü"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, { class: "h-3 w-3 shrink-0" }),
                      !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["href", "class"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("categories.index"),
                    class: [
                      "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-xs transition-colors",
                      !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    ],
                    title: "Kategori görünümü"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, { class: "h-3 w-3 shrink-0" }),
                      !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["href", "class"]),
                  isLoggedIn.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    writeFilter.value !== "all" ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: clearWriteFilter,
                      class: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      title: "Filtreyi temizle"
                    }, [
                      createVNode(_sfc_main$4, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "write-filter-dropdown-container relative shrink-0" }, [
                      createVNode("button", {
                        onClick: withModifiers(($event) => showWriteFilterDropdown.value = !showWriteFilterDropdown.value, ["stop"]),
                        class: [
                          "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                          showWriteFilterDropdown.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        ],
                        title: "Filtrele"
                      }, [
                        createVNode(_sfc_main$5, { class: "h-3 w-3 shrink-0" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getFilterLabel(writeFilter.value)), 1)) : createCommentVNode("", true)
                      ], 10, ["onClick"]),
                      showWriteFilterDropdown.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute right-0 top-full z-50 mt-1 w-40 rounded border border-border bg-popover shadow-lg"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-0.5 p-1" }, [
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "all" }],
                            onClick: ($event) => setWriteFilter("all")
                          }, " Tümü ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "published" }],
                            onClick: ($event) => setWriteFilter("published")
                          }, " Herkese Açık ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "link_only" }],
                            onClick: ($event) => setWriteFilter("link_only")
                          }, " Sadece Link ", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["inline-flex h-7 items-center gap-2 rounded px-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": writeFilter.value === "private" }],
                            onClick: ($event) => setWriteFilter("private")
                          }, " Gizli ", 10, ["onClick"])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ], 64)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["description"]),
              createVNode(_sfc_main$6, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$7, null, {
                    default: withCtx(() => [
                      createVNode(WriteList, {
                        ref_key: "writeListRef",
                        ref: writeListRef,
                        writes: unref(writes),
                        route: _ctx.route,
                        isCollapsed: isNarrow.value
                      }, null, 8, ["writes", "route", "isCollapsed"])
                    ]),
                    _: 1
                  })
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
const SidebarLayoutWrite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9386deed"]]);
export {
  SidebarLayoutWrite as default
};
