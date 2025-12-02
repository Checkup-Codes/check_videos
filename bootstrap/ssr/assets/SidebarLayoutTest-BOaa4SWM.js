import { computed, inject, ref, watch, onMounted, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import TestList from "./TestList-b5Xw0B8n.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DNDkVWuC.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-BaVEfKio.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
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
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isListView = computed(() => {
      const url = page.url;
      return url.startsWith("/tests") && !url.startsWith("/test-categories");
    });
    const { props } = usePage();
    const tests = inject("tests", []);
    const testListRef = ref(null);
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const route = computed(() => {
      return (test) => {
        return `/tests/${test.slug}`;
      };
    });
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
    });
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      localStorage.setItem("testSidebarScroll", scrollTop.toString());
    };
    onMounted(() => {
      if (scrollableRef.value) {
        scrollableRef.value.addEventListener && scrollableRef.value.addEventListener("scroll", handleScroll);
        if (scrollableRef.value.$el) {
          scrollableRef.value.$el.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem("testSidebarScroll");
          if (savedScroll) {
            scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isLoggedIn.value) {
              _push2(`<div class="shrink-0 border-b border-border bg-background/95 p-2" data-v-f8472b70${_scopeId}><div class="flex items-center justify-between gap-2" data-v-f8472b70${_scopeId}><div class="flex items-center gap-1" data-v-f8472b70${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/tests",
                class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
                title: "Liste görünümü"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-f8472b70${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-f8472b70${_scopeId2}></path></svg>`);
                    if (!isNarrow.value) {
                      _push3(`<span data-v-f8472b70${_scopeId2}>Liste</span>`);
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
                href: "/test-categories",
                class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors", !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"],
                title: "Kategori görünümü"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-f8472b70${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-f8472b70${_scopeId2}></path></svg>`);
                    if (!isNarrow.value) {
                      _push3(`<span data-v-f8472b70${_scopeId2}>Kategori</span>`);
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
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "flex-1 min-h-0 sidebar-content-embedded",
              infoClass: "flex flex-col h-full min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(TestList, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: unref(tests),
                    route: route.value,
                    isCollapsed: isNarrow.value,
                    class: "flex-1 min-h-0"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(TestList, {
                      ref_key: "testListRef",
                      ref: testListRef,
                      tests: unref(tests),
                      route: route.value,
                      isCollapsed: isNarrow.value,
                      class: "flex-1 min-h-0"
                    }, null, 8, ["tests", "route", "isCollapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              isLoggedIn.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "shrink-0 border-b border-border bg-background/95 p-2"
              }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(Link), {
                      href: "/tests",
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
                    }, 8, ["class"]),
                    createVNode(unref(Link), {
                      href: "/test-categories",
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
                    }, 8, ["class"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "flex-1 min-h-0 sidebar-content-embedded",
                infoClass: "flex flex-col h-full min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(TestList, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: unref(tests),
                    route: route.value,
                    isCollapsed: isNarrow.value,
                    class: "flex-1 min-h-0"
                  }, null, 8, ["tests", "route", "isCollapsed"])
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
const SidebarLayoutTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8472b70"]]);
export {
  SidebarLayoutTest as default
};
