import { ref, computed, onMounted, onUnmounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-aKe8eBeC.js";
const _sfc_main = {
  __name: "SidebarLayoutProject",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const page = usePage();
    const { props, url } = page;
    const scrollPosition = ref(0);
    const scrollContainer = ref(null);
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const auth = computed(() => props.auth);
    const handleScroll = () => {
      if (scrollContainer.value) {
        scrollPosition.value = scrollContainer.value.scrollTop;
        localStorage.setItem("projectsScrollPosition", scrollPosition.value);
      }
    };
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      const savedScrollPosition = localStorage.getItem("projectsScrollPosition");
      if (savedScrollPosition && scrollContainer.value) {
        scrollContainer.value.scrollTop = savedScrollPosition;
      }
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const getLinkClasses = (href) => {
      return url === href ? "bg-primary/10 border-l-4 border-primary shadow-sm" : "hover:bg-base-200 border-l-4 border-transparent";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (flashSuccess.value) {
              _push2(`<div class="toast toast-end z-50"${_scopeId}><div class="alert alert-success"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="px-4 py-4"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Projeler</h2>`);
            if (auth.value.user) {
              _push2(ssrRenderComponent(unref(Link), {
                href: "/projects/create",
                class: "btn btn-primary btn-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId2}></path></svg> Yeni Proje `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4.5v15m7.5-7.5h-15"
                        })
                      ])),
                      createTextVNode(" Yeni Proje ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="h-[calc(100vh-10rem)] overflow-y-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services",
              class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/services")]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="font-semibold"${_scopeId2}>Servislerimiz</div><div class="mt-1 flex justify-between text-xs opacity-70"${_scopeId2}><span${_scopeId2}>Tüm servisler</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "font-semibold" }, "Servislerimiz"),
                    createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                      createVNode("span", null, "Tüm servisler")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (auth.value.user) {
              _push2(`<div class="mt-4 space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/services/create",
                class: [
                  "my-2 flex flex-col rounded-lg p-3 transition-all duration-200",
                  getLinkClasses("/services/create")
                ]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="font-semibold"${_scopeId2}>Servis Oluştur</div><div class="mt-1 flex justify-between text-xs opacity-70"${_scopeId2}><span${_scopeId2}>Yeni servis oluştur</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "font-semibold" }, "Servis Oluştur"),
                      createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                        createVNode("span", null, "Yeni servis oluştur")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: "/projects",
                class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/projects")]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="font-semibold"${_scopeId2}>Projeler</div><div class="mt-1 flex justify-between text-xs opacity-70"${_scopeId2}><span${_scopeId2}>Tüm projeler</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "font-semibold" }, "Projeler"),
                      createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                        createVNode("span", null, "Tüm projeler")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: "/customers",
                class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/customers")]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="font-semibold"${_scopeId2}>Müşteriler</div><div class="mt-1 flex justify-between text-xs opacity-70"${_scopeId2}><span${_scopeId2}>Tüm müşteriler</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "font-semibold" }, "Müşteriler"),
                      createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                        createVNode("span", null, "Tüm müşteriler")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              flashSuccess.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "toast toast-end z-50"
              }, [
                createVNode("div", { class: "alert alert-success" }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-6 w-6 stroke-current",
                    fill: "none",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])),
                  createVNode("span", null, toDisplayString(flashSuccess.value), 1)
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "px-4 py-4" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("h2", { class: "text-xl font-bold" }, "Projeler"),
                  auth.value.user ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: "/projects/create",
                    class: "btn btn-primary btn-sm"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4.5v15m7.5-7.5h-15"
                        })
                      ])),
                      createTextVNode(" Yeni Proje ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", {
                  class: "h-[calc(100vh-10rem)] overflow-y-auto",
                  ref_key: "scrollContainer",
                  ref: scrollContainer,
                  onScroll: handleScroll
                }, [
                  createVNode(unref(Link), {
                    href: "/services",
                    class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/services")]
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "font-semibold" }, "Servislerimiz"),
                      createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                        createVNode("span", null, "Tüm servisler")
                      ])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  auth.value.user ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 space-y-2"
                  }, [
                    createVNode(unref(Link), {
                      href: "/services/create",
                      class: [
                        "my-2 flex flex-col rounded-lg p-3 transition-all duration-200",
                        getLinkClasses("/services/create")
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "font-semibold" }, "Servis Oluştur"),
                        createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                          createVNode("span", null, "Yeni servis oluştur")
                        ])
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createVNode(unref(Link), {
                      href: "/projects",
                      class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/projects")]
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "font-semibold" }, "Projeler"),
                        createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                          createVNode("span", null, "Tüm projeler")
                        ])
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createVNode(unref(Link), {
                      href: "/customers",
                      class: ["my-2 flex flex-col rounded-lg p-3 transition-all duration-200", getLinkClasses("/customers")]
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "font-semibold" }, "Müşteriler"),
                        createVNode("div", { class: "mt-1 flex justify-between text-xs opacity-70" }, [
                          createVNode("span", null, "Tüm müşteriler")
                        ])
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ])) : createCommentVNode("", true)
                ], 544)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/SidebarLayoutProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
