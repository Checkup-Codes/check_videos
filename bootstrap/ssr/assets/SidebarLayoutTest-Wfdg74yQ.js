import { computed, inject, ref, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import TestList from "./TestList-Cnc-dGHw.js";
import { _ as _sfc_main$1, a as _sfc_main$4 } from "./SubSidebarScreen-DNe7gM-E.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import _sfc_main$2 from "./IconMenu-BWjMD6eg.js";
import _sfc_main$3 from "./IconFolder-Q1UwPFvL.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutTest"
}, {
  __name: "SidebarLayoutTest",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const store = useStore();
    const page = usePage();
    computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isListView = computed(() => {
      const url = page.url;
      return url.startsWith("/tests") && !url.startsWith("/test-categories");
    });
    const injectedTests = inject("tests", []);
    const tests = computed(() => {
      const testsValue = (injectedTests == null ? void 0 : injectedTests.value) ?? injectedTests;
      return Array.isArray(testsValue) ? testsValue : [];
    });
    const testListRef = ref(null);
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-2" data-v-5d7a5e8d${_scopeId}><div class="flex items-center justify-between gap-2" data-v-5d7a5e8d${_scopeId}><div class="flex items-center gap-1" data-v-5d7a5e8d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("tests.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Liste görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-5d7a5e8d${_scopeId2}>Liste</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("test-categories.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Kategori görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-5d7a5e8d${_scopeId2}>Kategori</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(TestList, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: tests.value,
                    isCollapsed: isNarrow.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(TestList, {
                      ref_key: "testListRef",
                      ref: testListRef,
                      tests: tests.value,
                      isCollapsed: isNarrow.value
                    }, null, 8, ["tests", "isCollapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-2" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("tests.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Liste görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("test-categories.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Kategori görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$4, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(TestList, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: tests.value,
                    isCollapsed: isNarrow.value
                  }, null, 8, ["tests", "isCollapsed"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_layouts/SidebarLayoutTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d7a5e8d"]]);
export {
  SidebarLayoutTest as default
};
