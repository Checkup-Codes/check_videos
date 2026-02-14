import { ref, computed, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$5 } from "./SubSidebarScreen-DNe7gM-E.js";
import { useStore } from "vuex";
import _sfc_main$2 from "./IconBolt-Dji8lGsB.js";
import _sfc_main$3 from "./IconFolder-BkG6LNKa.js";
import _sfc_main$4 from "./IconUsers-FdijcrvF.js";
import { _ as _export_sfc } from "../ssr.js";
function useSidebar() {
  const isCollapsed = ref(true);
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  return {
    isCollapsed,
    toggleSidebar,
    sidebarStyle: ref("")
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutProject"
}, {
  __name: "SidebarLayoutProject",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const page = usePage();
    const store = useStore();
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const currentView = ref("services");
    const services = computed(() => page.props.services || []);
    const projects = computed(() => page.props.projects || []);
    const customers = computed(() => page.props.customers || []);
    const url = computed(() => page.url || "");
    watch(
      url,
      (newUrl) => {
        if (newUrl.startsWith("/services")) {
          currentView.value = "services";
        } else if (newUrl.startsWith("/projects")) {
          currentView.value = "projects";
        } else if (newUrl.startsWith("/customers")) {
          currentView.value = "customers";
        }
      },
      { immediate: true }
    );
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    const getLinkClasses = (href) => {
      const url2 = page.url;
      return url2 === href || url2.startsWith(href + "/");
    };
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
        store.dispatch("Projects/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["Projects/scrollPosition"];
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
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-2" data-v-48208769${_scopeId}><div class="flex items-center justify-between gap-2" data-v-48208769${_scopeId}><div class="flex items-center gap-1" data-v-48208769${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("services.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                currentView.value === "services" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Servisler"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-48208769${_scopeId2}>Servisler</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Servisler")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                currentView.value === "projects" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Projeler"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-48208769${_scopeId2}>Projeler</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Projeler")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("customers.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                currentView.value === "customers" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Müşteriler"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-48208769${_scopeId2}>Müşteriler</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$4, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Müşteriler")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-1 p-2" data-v-48208769${_scopeId2}>`);
                  if (currentView.value === "services") {
                    _push3(`<div class="space-y-1" data-v-48208769${_scopeId2}>`);
                    if (!services.value || services.value.length === 0) {
                      _push3(`<div class="p-2 text-[10px] text-muted-foreground" data-v-48208769${_scopeId2}> Henüz servis bulunmamaktadır. </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(services.value, (service) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: service.id,
                        href: `/services/${service.id}`,
                        class: [
                          "flex flex-col rounded-md p-2 text-sm transition-colors",
                          getLinkClasses(`/services/${service.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        ]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2" data-v-48208769${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-48208769${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-48208769${_scopeId3}></path></svg><span class="truncate font-medium" data-v-48208769${_scopeId3}>${ssrInterpolate(service.name)}</span></div>`);
                            if (!isNarrow.value && service.description) {
                              _push4(`<span class="mt-0.5 truncate text-[10px] opacity-70" data-v-48208769${_scopeId3}>${ssrInterpolate(service.description)}</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                  })
                                ])),
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(service.name), 1)
                              ]),
                              !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(service.description), 1)) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (currentView.value === "projects") {
                    _push3(`<div class="space-y-1" data-v-48208769${_scopeId2}>`);
                    if (!projects.value || projects.value.length === 0) {
                      _push3(`<div class="p-2 text-[10px] text-muted-foreground" data-v-48208769${_scopeId2}> Henüz proje bulunmamaktadır. </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(projects.value, (project) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: project.id,
                        href: `/projects/${project.id}`,
                        class: [
                          "flex flex-col rounded-md p-2 text-sm transition-colors",
                          getLinkClasses(`/projects/${project.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        ]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2" data-v-48208769${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-48208769${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-48208769${_scopeId3}></path></svg><span class="truncate font-medium" data-v-48208769${_scopeId3}>${ssrInterpolate(project.project_name)}</span></div>`);
                            if (!isNarrow.value && project.customer) {
                              _push4(`<span class="mt-0.5 truncate text-[10px] opacity-70" data-v-48208769${_scopeId3}>${ssrInterpolate(project.customer.first_name)} ${ssrInterpolate(project.customer.last_name)}</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
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
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(project.project_name), 1)
                              ]),
                              !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (currentView.value === "customers") {
                    _push3(`<div class="space-y-1" data-v-48208769${_scopeId2}>`);
                    if (!customers.value || customers.value.length === 0) {
                      _push3(`<div class="p-2 text-[10px] text-muted-foreground" data-v-48208769${_scopeId2}> Henüz müşteri bulunmamaktadır. </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(customers.value, (customer) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: customer.id,
                        href: `/customers/${customer.id}`,
                        class: [
                          "flex flex-col rounded-md p-2 text-sm transition-colors",
                          getLinkClasses(`/customers/${customer.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        ]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2" data-v-48208769${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-48208769${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-48208769${_scopeId3}></path></svg><span class="truncate font-medium" data-v-48208769${_scopeId3}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</span></div>`);
                            if (!isNarrow.value) {
                              _push4(`<span class="mt-0.5 truncate text-[10px] opacity-70" data-v-48208769${_scopeId3}>${ssrInterpolate(customer.email)}</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  })
                                ])),
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                              ]),
                              !isNarrow.value ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-1 p-2" }, [
                      currentView.value === "services" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-1"
                      }, [
                        !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2 text-[10px] text-muted-foreground"
                        }, " Henüz servis bulunmamaktadır. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: service.id,
                            href: `/services/${service.id}`,
                            class: [
                              "flex flex-col rounded-md p-2 text-sm transition-colors",
                              getLinkClasses(`/services/${service.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                  })
                                ])),
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(service.name), 1)
                              ]),
                              !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(service.description), 1)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      currentView.value === "projects" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-1"
                      }, [
                        !projects.value || projects.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2 text-[10px] text-muted-foreground"
                        }, " Henüz proje bulunmamaktadır. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(projects.value, (project) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: project.id,
                            href: `/projects/${project.id}`,
                            class: [
                              "flex flex-col rounded-md p-2 text-sm transition-colors",
                              getLinkClasses(`/projects/${project.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
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
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(project.project_name), 1)
                              ]),
                              !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      currentView.value === "customers" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-1"
                      }, [
                        !customers.value || customers.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2 text-[10px] text-muted-foreground"
                        }, " Henüz müşteri bulunmamaktadır. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: customer.id,
                            href: `/customers/${customer.id}`,
                            class: [
                              "flex flex-col rounded-md p-2 text-sm transition-colors",
                              getLinkClasses(`/customers/${customer.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 shrink-0",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  })
                                ])),
                                createVNode("span", { class: "truncate font-medium" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                              ]),
                              !isNarrow.value ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "mt-0.5 truncate text-[10px] opacity-70"
                              }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
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
                      href: _ctx.route("services.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        currentView.value === "services" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Servisler"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Servisler")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("projects.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        currentView.value === "projects" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Projeler"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Projeler")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("customers.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        currentView.value === "customers" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Müşteriler"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Müşteriler")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$5, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-1 p-2" }, [
                    currentView.value === "services" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-1"
                    }, [
                      !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-2 text-[10px] text-muted-foreground"
                      }, " Henüz servis bulunmamaktadır. ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: service.id,
                          href: `/services/${service.id}`,
                          class: [
                            "flex flex-col rounded-md p-2 text-sm transition-colors",
                            getLinkClasses(`/services/${service.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4 shrink-0",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                                })
                              ])),
                              createVNode("span", { class: "truncate font-medium" }, toDisplayString(service.name), 1)
                            ]),
                            !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mt-0.5 truncate text-[10px] opacity-70"
                            }, toDisplayString(service.description), 1)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    currentView.value === "projects" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-1"
                    }, [
                      !projects.value || projects.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-2 text-[10px] text-muted-foreground"
                      }, " Henüz proje bulunmamaktadır. ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(projects.value, (project) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: project.id,
                          href: `/projects/${project.id}`,
                          class: [
                            "flex flex-col rounded-md p-2 text-sm transition-colors",
                            getLinkClasses(`/projects/${project.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4 shrink-0",
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
                              createVNode("span", { class: "truncate font-medium" }, toDisplayString(project.project_name), 1)
                            ]),
                            !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mt-0.5 truncate text-[10px] opacity-70"
                            }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    currentView.value === "customers" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-1"
                    }, [
                      !customers.value || customers.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-2 text-[10px] text-muted-foreground"
                      }, " Henüz müşteri bulunmamaktadır. ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: customer.id,
                          href: `/customers/${customer.id}`,
                          class: [
                            "flex flex-col rounded-md p-2 text-sm transition-colors",
                            getLinkClasses(`/customers/${customer.id}`) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4 shrink-0",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                })
                              ])),
                              createVNode("span", { class: "truncate font-medium" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                            ]),
                            !isNarrow.value ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mt-0.5 truncate text-[10px] opacity-70"
                            }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/SidebarLayoutProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48208769"]]);
const SidebarLayoutProject$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SidebarLayoutProject
}, Symbol.toStringTag, { value: "Module" }));
export {
  SidebarLayoutProject as S,
  SidebarLayoutProject$1 as a,
  useSidebar as u
};
