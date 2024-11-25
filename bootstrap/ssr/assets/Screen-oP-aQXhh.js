import { ref, onMounted, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$3 } from "./ExcalidrawComponent-DCh5jf5c.js";
import { _ as _sfc_main$2 } from "./CButton-Bo0n3h7o.js";
import { _ as _sfc_main$1 } from "./CScreen-CmV3l44j.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const categories = ref(props.categories);
    const auth = props.auth;
    const showDraw = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showDraw.value = true;
      } else {
        showDraw.value = props.showDraw || false;
      }
    });
    const deleteWrite = (id) => {
      if (confirm("Are you sure you want to delete this write?")) {
        Inertia.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ class: "pt-3" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white sm:px-10 lg:grid lg:grid-cols-12 lg:px-10"${_scopeId}><div class="my-auto w-auto lg:col-span-9"${_scopeId}><h1 class="flex h-20 items-center text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mt-2 hidden text-sm text-gray-500 lg:block"${_scopeId}><span class="font-medium"${_scopeId}>Kategori:</span> ${ssrInterpolate(getCategoryName(write.value.category_id))}</div><div class="block lg:hidden"${_scopeId}><div class="absolute right-0 top-14 justify-between px-1"${_scopeId}>`);
            if (write.value.hasDraw) {
              _push2(`<div class="flex w-full justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/writes/${write.value.slug}?showDraw=${showDraw.value ? 0 : 1}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, { class: "flex w-full items-center justify-between rounded-full" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(showDraw.value ? "" : "")}</span>`);
                          if (!showDraw.value) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"${_scopeId3}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.63-.35 3.74-.96 1.02-.55 1.26-1.94.47-2.76-.63-.66-.4-1.84.43-2.02 2.94-.64 5.36-3.21 5.36-6.26C22 6.48 17.52 2 12 2z"${_scopeId3}></path><circle cx="6.5" cy="11.5" r="1.5"${_scopeId3}></circle><circle cx="9.5" cy="7.5" r="1.5"${_scopeId3}></circle><circle cx="14.5" cy="7.5" r="1.5"${_scopeId3}></circle><circle cx="17.5" cy="11.5" r="1.5"${_scopeId3}></circle></svg>`);
                          } else {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.879l-6.364 6.364A2 2 0 004 13.757V17a2 2 0 002 2h3.243a2 2 0 001.414-.586l6.364-6.364a2 2 0 000-2.828l-2.828-2.828a2 2 0 00-2.828 0z"${_scopeId3}></path><path stroke-linecap="round" stroke-linejoin="round" d="M16 7l1.586-1.586a2 2 0 112.828 2.828L18 10"${_scopeId3}></path></svg>`);
                          }
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(showDraw.value ? "" : ""), 1),
                            !showDraw.value ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-5 w-5"
                            }, [
                              createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.63-.35 3.74-.96 1.02-.55 1.26-1.94.47-2.76-.63-.66-.4-1.84.43-2.02 2.94-.64 5.36-3.21 5.36-6.26C22 6.48 17.52 2 12 2z" }),
                              createVNode("circle", {
                                cx: "6.5",
                                cy: "11.5",
                                r: "1.5"
                              }),
                              createVNode("circle", {
                                cx: "9.5",
                                cy: "7.5",
                                r: "1.5"
                              }),
                              createVNode("circle", {
                                cx: "14.5",
                                cy: "7.5",
                                r: "1.5"
                              }),
                              createVNode("circle", {
                                cx: "17.5",
                                cy: "11.5",
                                r: "1.5"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-auto h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M11 5.879l-6.364 6.364A2 2 0 004 13.757V17a2 2 0 002 2h3.243a2 2 0 001.414-.586l6.364-6.364a2 2 0 000-2.828l-2.828-2.828a2 2 0 00-2.828 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M16 7l1.586-1.586a2 2 0 112.828 2.828L18 10"
                              })
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, { class: "flex w-full items-center justify-between rounded-full" }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(showDraw.value ? "" : ""), 1),
                          !showDraw.value ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-5 w-5"
                          }, [
                            createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.63-.35 3.74-.96 1.02-.55 1.26-1.94.47-2.76-.63-.66-.4-1.84.43-2.02 2.94-.64 5.36-3.21 5.36-6.26C22 6.48 17.52 2 12 2z" }),
                            createVNode("circle", {
                              cx: "6.5",
                              cy: "11.5",
                              r: "1.5"
                            }),
                            createVNode("circle", {
                              cx: "9.5",
                              cy: "7.5",
                              r: "1.5"
                            }),
                            createVNode("circle", {
                              cx: "14.5",
                              cy: "7.5",
                              r: "1.5"
                            }),
                            createVNode("circle", {
                              cx: "17.5",
                              cy: "11.5",
                              r: "1.5"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "ml-auto h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M11 5.879l-6.364 6.364A2 2 0 004 13.757V17a2 2 0 002 2h3.243a2 2 0 001.414-.586l6.364-6.364a2 2 0 000-2.828l-2.828-2.828a2 2 0 00-2.828 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M16 7l1.586-1.586a2 2 0 112.828 2.828L18 10"
                            })
                          ]))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex"${_scopeId}>`);
            if (write.value.hasDraw) {
              _push2(`<div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/writes/${write.value.slug}?showDraw=${showDraw.value ? 0 : 1}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, { class: "flex w-full items-center justify-between space-x-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(showDraw.value ? "Yazıya Dön" : "Çizimine Git")}</span>`);
                          if (!showDraw.value) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8m0 0l-4 4m4-4l-4-4"${_scopeId3}></path></svg>`);
                          } else {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m4 6H4"${_scopeId3}></path></svg>`);
                          }
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(showDraw.value ? "Yazıya Dön" : "Çizimine Git"), 1),
                            !showDraw.value ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-auto h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8 12h8m0 0l-4 4m4-4l-4-4"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-auto h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M4 6h16M4 12h16m4 6H4"
                              })
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, { class: "flex w-full items-center justify-between space-x-2" }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(showDraw.value ? "Yazıya Dön" : "Çizimine Git"), 1),
                          !showDraw.value ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "ml-auto h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M8 12h8m0 0l-4 4m4-4l-4-4"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "ml-auto h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M4 6h16M4 12h16m4 6H4"
                            })
                          ]))
                        ]),
                        _: 1
                      })
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
            if (showDraw.value) {
              _push2(`<div class="rounded-lg bg-white shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, { write: write.value }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="mt-3 h-[calc(80vh)] overflow-scroll rounded-lg bg-white p-5 shadow-sm lg:h-[calc(75vh)]"${_scopeId}><div${_scopeId}>${write.value.content ?? ""}</div><div${_scopeId}><h2${_scopeId}>Özet</h2><p${_scopeId}>${ssrInterpolate(write.value.summary)}</p></div>`);
              if (unref(auth).user) {
                _push2(`<div class="mt-5 flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/writes/${write.value.id}/edit`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_sfc_main$2, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Yazıyı Düzenle `);
                          } else {
                            return [
                              createTextVNode(" Yazıyı Düzenle ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createTextVNode(" Yazıyı Düzenle ")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, {
                  onClick: ($event) => deleteWrite(write.value.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Yazıyı Sil `);
                    } else {
                      return [
                        createTextVNode(" Yazıyı Sil ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode("div", { class: "bg-white sm:px-10 lg:grid lg:grid-cols-12 lg:px-10" }, [
                createVNode("div", { class: "my-auto w-auto lg:col-span-9" }, [
                  createVNode("h1", { class: "flex h-20 items-center text-2xl font-bold text-gray-900" }, toDisplayString(write.value.title), 1),
                  createVNode("div", { class: "mt-2 hidden text-sm text-gray-500 lg:block" }, [
                    createVNode("span", { class: "font-medium" }, "Kategori:"),
                    createTextVNode(" " + toDisplayString(getCategoryName(write.value.category_id)), 1)
                  ]),
                  createVNode("div", { class: "block lg:hidden" }, [
                    createVNode("div", { class: "absolute right-0 top-14 justify-between px-1" }, [
                      write.value.hasDraw ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex w-full justify-end"
                      }, [
                        createVNode(unref(Link), {
                          href: `/writes/${write.value.slug}?showDraw=${showDraw.value ? 0 : 1}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$2, { class: "flex w-full items-center justify-between rounded-full" }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(showDraw.value ? "" : ""), 1),
                                !showDraw.value ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  class: "h-5 w-5"
                                }, [
                                  createVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.63-.35 3.74-.96 1.02-.55 1.26-1.94.47-2.76-.63-.66-.4-1.84.43-2.02 2.94-.64 5.36-3.21 5.36-6.26C22 6.48 17.52 2 12 2z" }),
                                  createVNode("circle", {
                                    cx: "6.5",
                                    cy: "11.5",
                                    r: "1.5"
                                  }),
                                  createVNode("circle", {
                                    cx: "9.5",
                                    cy: "7.5",
                                    r: "1.5"
                                  }),
                                  createVNode("circle", {
                                    cx: "14.5",
                                    cy: "7.5",
                                    r: "1.5"
                                  }),
                                  createVNode("circle", {
                                    cx: "17.5",
                                    cy: "11.5",
                                    r: "1.5"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "ml-auto h-5 w-5",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M11 5.879l-6.364 6.364A2 2 0 004 13.757V17a2 2 0 002 2h3.243a2 2 0 001.414-.586l6.364-6.364a2 2 0 000-2.828l-2.828-2.828a2 2 0 00-2.828 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M16 7l1.586-1.586a2 2 0 112.828 2.828L18 10"
                                  })
                                ]))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex" }, [
                  write.value.hasDraw ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center"
                  }, [
                    createVNode(unref(Link), {
                      href: `/writes/${write.value.slug}?showDraw=${showDraw.value ? 0 : 1}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "flex w-full items-center justify-between space-x-2" }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(showDraw.value ? "Yazıya Dön" : "Çizimine Git"), 1),
                            !showDraw.value ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-auto h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8 12h8m0 0l-4 4m4-4l-4-4"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-auto h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M4 6h16M4 12h16m4 6H4"
                              })
                            ]))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showDraw.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-lg bg-white shadow-sm"
              }, [
                createVNode(_sfc_main$3, { write: write.value }, null, 8, ["write"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "mt-3 h-[calc(80vh)] overflow-scroll rounded-lg bg-white p-5 shadow-sm lg:h-[calc(75vh)]"
              }, [
                createVNode("div", {
                  innerHTML: write.value.content
                }, null, 8, ["innerHTML"]),
                createVNode("div", null, [
                  createVNode("h2", null, "Özet"),
                  createVNode("p", null, toDisplayString(write.value.summary), 1)
                ]),
                unref(auth).user ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-5 flex justify-end"
                }, [
                  createVNode(unref(Link), {
                    href: `/writes/${write.value.id}/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createTextVNode(" Yazıyı Düzenle ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$2, {
                    onClick: ($event) => deleteWrite(write.value.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Yazıyı Sil ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
