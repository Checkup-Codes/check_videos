import { ref, computed, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, createVNode, unref, withModifiers, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, S as SubSidebarHeader, a as _sfc_main$3, b as _sfc_main$4 } from "./SubSidebarContent-QVixNVtK.js";
import { useStore } from "vuex";
import _sfc_main$2 from "./ProjectsModuleTabs-j3soYPOi.js";
import { s as stripHtml } from "./stripHtml-wl3J5kls.js";
import { _ as _sfc_main$5 } from "./ZoomableImage-iVeXa9el.js";
import { _ as _export_sfc, c as useModuleVisibility } from "../ssr.js";
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
    const services = computed(() => page.props.services || []);
    const projects = computed(() => page.props.projects || []);
    const customers = computed(() => page.props.customers || []);
    const showCustomers = useModuleVisibility("customers");
    const currentView = computed(() => {
      const url = page.url || "";
      if (url.startsWith("/projects")) {
        return "projects";
      }
      if (url.startsWith("/customers")) {
        return "customers";
      }
      return "services";
    });
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    const getLinkClasses = (href) => {
      const url = page.url;
      return url === href || url.startsWith(href + "/");
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
            _push2(ssrRenderComponent(SubSidebarHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    compact: "",
                    embedded: "",
                    "show-labels": !isNarrow.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2, {
                      compact: "",
                      embedded: "",
                      "show-labels": !isNarrow.value
                    }, null, 8, ["show-labels"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (currentView.value === "services") {
                          _push4(`<div class="space-y-1" data-v-64319d7d${_scopeId3}>`);
                          if (!services.value || services.value.length === 0) {
                            _push4(`<div class="p-2 text-[10px] text-muted-foreground" data-v-64319d7d${_scopeId3}> Henüz hizmet bulunmamaktadır. </div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--[-->`);
                          ssrRenderList(services.value, (service) => {
                            _push4(ssrRenderComponent(unref(Link), {
                              key: service.id,
                              href: `/services/${service.id}`,
                              class: [
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/services/${service.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                var _a, _b, _c, _d;
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-2" data-v-64319d7d${_scopeId4}><div class="h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30" data-v-64319d7d${_scopeId4}>`);
                                  if ((_b = (_a = service.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) {
                                    _push5(ssrRenderComponent(_sfc_main$5, {
                                      src: service.images[0].image_path,
                                      alt: service.name,
                                      gallery: service.images,
                                      "wrapper-class": "h-full w-full",
                                      "img-class": "h-full w-full object-cover"
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<div class="flex h-full w-full items-center justify-center" data-v-64319d7d${_scopeId4}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-64319d7d${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-64319d7d${_scopeId4}></path></svg></div>`);
                                  }
                                  _push5(`</div><span class="truncate text-[11px] font-medium leading-tight" data-v-64319d7d${_scopeId4}>${ssrInterpolate(service.name)}</span></div>`);
                                  if (!isNarrow.value && service.description) {
                                    _push5(`<span class="${ssrRenderClass([getLinkClasses(`/services/${service.id}`) ? "text-primary-foreground/70" : "text-muted-foreground", "mt-1 block truncate text-[10px]"])}" data-v-64319d7d${_scopeId4}>${ssrInterpolate(unref(stripHtml)(service.description))}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode("div", {
                                        class: "h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                                        onClick: withModifiers(() => {
                                        }, ["stop"])
                                      }, [
                                        ((_d = (_c = service.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.image_path) ? (openBlock(), createBlock(_sfc_main$5, {
                                          key: 0,
                                          src: service.images[0].image_path,
                                          alt: service.name,
                                          gallery: service.images,
                                          "wrapper-class": "h-full w-full",
                                          "img-class": "h-full w-full object-cover"
                                        }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "flex h-full w-full items-center justify-center"
                                        }, [
                                          (openBlock(), createBlock("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            class: "h-3.5 w-3.5 shrink-0 text-primary",
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
                                          ]))
                                        ]))
                                      ], 8, ["onClick"]),
                                      createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(service.name), 1)
                                    ]),
                                    !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/services/${service.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                    }, toDisplayString(unref(stripHtml)(service.description)), 3)) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (currentView.value === "projects") {
                          _push4(`<div class="space-y-1" data-v-64319d7d${_scopeId3}>`);
                          if (!projects.value || projects.value.length === 0) {
                            _push4(`<div class="p-2 text-[10px] text-muted-foreground" data-v-64319d7d${_scopeId3}> Henüz proje bulunmamaktadır. </div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--[-->`);
                          ssrRenderList(projects.value, (project) => {
                            _push4(ssrRenderComponent(unref(Link), {
                              key: project.id,
                              href: `/projects/${project.id}`,
                              class: [
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/projects/${project.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-2" data-v-64319d7d${_scopeId4}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-64319d7d${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-64319d7d${_scopeId4}></path></svg><span class="truncate text-[11px] font-medium leading-tight" data-v-64319d7d${_scopeId4}>${ssrInterpolate(project.project_name)}</span></div>`);
                                  if (!isNarrow.value && project.customer) {
                                    _push5(`<span class="${ssrRenderClass([getLinkClasses(`/projects/${project.id}`) ? "text-primary-foreground/70" : "text-muted-foreground", "mt-1 block truncate text-[10px]"])}" data-v-64319d7d${_scopeId4}>${ssrInterpolate(project.customer.first_name)} ${ssrInterpolate(project.customer.last_name)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-3.5 w-3.5 shrink-0",
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
                                      createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(project.project_name), 1)
                                    ]),
                                    !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/projects/${project.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                    }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 3)) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (currentView.value === "customers" && unref(showCustomers)) {
                          _push4(`<div class="space-y-1" data-v-64319d7d${_scopeId3}>`);
                          if (!customers.value || customers.value.length === 0) {
                            _push4(`<div class="p-2 text-[10px] text-muted-foreground" data-v-64319d7d${_scopeId3}> Henüz müşteri bulunmamaktadır. </div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--[-->`);
                          ssrRenderList(customers.value, (customer) => {
                            _push4(ssrRenderComponent(unref(Link), {
                              key: customer.id,
                              href: `/customers/${customer.id}`,
                              class: [
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/customers/${customer.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-2" data-v-64319d7d${_scopeId4}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-64319d7d${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-64319d7d${_scopeId4}></path></svg><span class="truncate text-[11px] font-medium leading-tight" data-v-64319d7d${_scopeId4}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</span></div>`);
                                  if (!isNarrow.value) {
                                    _push5(`<span class="${ssrRenderClass([getLinkClasses(`/customers/${customer.id}`) ? "text-primary-foreground/70" : "text-muted-foreground", "mt-1 block truncate text-[10px]"])}" data-v-64319d7d${_scopeId4}>${ssrInterpolate(customer.email)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-3.5 w-3.5 shrink-0",
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
                                      createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                                    ]),
                                    !isNarrow.value ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/customers/${customer.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                    }, toDisplayString(customer.email), 3)) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          currentView.value === "services" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-1"
                          }, [
                            !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-2 text-[10px] text-muted-foreground"
                            }, " Henüz hizmet bulunmamaktadır. ")) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                              return openBlock(), createBlock(unref(Link), {
                                key: service.id,
                                href: `/services/${service.id}`,
                                class: [
                                  "block rounded-lg p-3 transition-colors",
                                  getLinkClasses(`/services/${service.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                                ]
                              }, {
                                default: withCtx(() => {
                                  var _a, _b;
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode("div", {
                                        class: "h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                                        onClick: withModifiers(() => {
                                        }, ["stop"])
                                      }, [
                                        ((_b = (_a = service.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) ? (openBlock(), createBlock(_sfc_main$5, {
                                          key: 0,
                                          src: service.images[0].image_path,
                                          alt: service.name,
                                          gallery: service.images,
                                          "wrapper-class": "h-full w-full",
                                          "img-class": "h-full w-full object-cover"
                                        }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "flex h-full w-full items-center justify-center"
                                        }, [
                                          (openBlock(), createBlock("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            class: "h-3.5 w-3.5 shrink-0 text-primary",
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
                                          ]))
                                        ]))
                                      ], 8, ["onClick"]),
                                      createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(service.name), 1)
                                    ]),
                                    !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/services/${service.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                    }, toDisplayString(unref(stripHtml)(service.description)), 3)) : createCommentVNode("", true)
                                  ];
                                }),
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
                                  "block rounded-lg p-3 transition-colors",
                                  getLinkClasses(`/projects/${project.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3.5 w-3.5 shrink-0",
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
                                    createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(project.project_name), 1)
                                  ]),
                                  !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/projects/${project.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                  }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 3)) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["href", "class"]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          currentView.value === "customers" && unref(showCustomers) ? (openBlock(), createBlock("div", {
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
                                  "block rounded-lg p-3 transition-colors",
                                  getLinkClasses(`/customers/${customer.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3.5 w-3.5 shrink-0",
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
                                    createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                                  ]),
                                  !isNarrow.value ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/customers/${customer.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                  }, toDisplayString(customer.email), 3)) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["href", "class"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        currentView.value === "services" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-1"
                        }, [
                          !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-2 text-[10px] text-muted-foreground"
                          }, " Henüz hizmet bulunmamaktadır. ")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: service.id,
                              href: `/services/${service.id}`,
                              class: [
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/services/${service.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx(() => {
                                var _a, _b;
                                return [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("div", {
                                      class: "h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                                      onClick: withModifiers(() => {
                                      }, ["stop"])
                                    }, [
                                      ((_b = (_a = service.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) ? (openBlock(), createBlock(_sfc_main$5, {
                                        key: 0,
                                        src: service.images[0].image_path,
                                        alt: service.name,
                                        gallery: service.images,
                                        "wrapper-class": "h-full w-full",
                                        "img-class": "h-full w-full object-cover"
                                      }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex h-full w-full items-center justify-center"
                                      }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-3.5 w-3.5 shrink-0 text-primary",
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
                                        ]))
                                      ]))
                                    ], 8, ["onClick"]),
                                    createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(service.name), 1)
                                  ]),
                                  !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/services/${service.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                  }, toDisplayString(unref(stripHtml)(service.description)), 3)) : createCommentVNode("", true)
                                ];
                              }),
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
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/projects/${project.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-3.5 w-3.5 shrink-0",
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
                                  createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(project.project_name), 1)
                                ]),
                                !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/projects/${project.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 3)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["href", "class"]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        currentView.value === "customers" && unref(showCustomers) ? (openBlock(), createBlock("div", {
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
                                "block rounded-lg p-3 transition-colors",
                                getLinkClasses(`/customers/${customer.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                              ]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-3.5 w-3.5 shrink-0",
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
                                  createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                                ]),
                                !isNarrow.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/customers/${customer.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                }, toDisplayString(customer.email), 3)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["href", "class"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
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
              createVNode(SubSidebarHeader, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, {
                    compact: "",
                    embedded: "",
                    "show-labels": !isNarrow.value
                  }, null, 8, ["show-labels"])
                ]),
                _: 1
              }),
              createVNode(_sfc_main$3, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      currentView.value === "services" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-1"
                      }, [
                        !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2 text-[10px] text-muted-foreground"
                        }, " Henüz hizmet bulunmamaktadır. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: service.id,
                            href: `/services/${service.id}`,
                            class: [
                              "block rounded-lg p-3 transition-colors",
                              getLinkClasses(`/services/${service.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                            ]
                          }, {
                            default: withCtx(() => {
                              var _a, _b;
                              return [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("div", {
                                    class: "h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                                    onClick: withModifiers(() => {
                                    }, ["stop"])
                                  }, [
                                    ((_b = (_a = service.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) ? (openBlock(), createBlock(_sfc_main$5, {
                                      key: 0,
                                      src: service.images[0].image_path,
                                      alt: service.name,
                                      gallery: service.images,
                                      "wrapper-class": "h-full w-full",
                                      "img-class": "h-full w-full object-cover"
                                    }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex h-full w-full items-center justify-center"
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-3.5 w-3.5 shrink-0 text-primary",
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
                                      ]))
                                    ]))
                                  ], 8, ["onClick"]),
                                  createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(service.name), 1)
                                ]),
                                !isNarrow.value && service.description ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/services/${service.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                                }, toDisplayString(unref(stripHtml)(service.description)), 3)) : createCommentVNode("", true)
                              ];
                            }),
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
                              "block rounded-lg p-3 transition-colors",
                              getLinkClasses(`/projects/${project.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-3.5 w-3.5 shrink-0",
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
                                createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(project.project_name), 1)
                              ]),
                              !isNarrow.value && project.customer ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/projects/${project.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                              }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 3)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      currentView.value === "customers" && unref(showCustomers) ? (openBlock(), createBlock("div", {
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
                              "block rounded-lg p-3 transition-colors",
                              getLinkClasses(`/customers/${customer.id}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-3.5 w-3.5 shrink-0",
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
                                createVNode("span", { class: "truncate text-[11px] font-medium leading-tight" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1)
                              ]),
                              !isNarrow.value ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["mt-1 block truncate text-[10px]", getLinkClasses(`/customers/${customer.id}`) ? "text-primary-foreground/70" : "text-muted-foreground"]
                              }, toDisplayString(customer.email), 3)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "class"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/SidebarLayoutProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-64319d7d"]]);
const SidebarLayoutProject$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SidebarLayoutProject
}, Symbol.toStringTag, { value: "Module" }));
export {
  SidebarLayoutProject as S,
  SidebarLayoutProject$1 as a,
  useSidebar as u
};
