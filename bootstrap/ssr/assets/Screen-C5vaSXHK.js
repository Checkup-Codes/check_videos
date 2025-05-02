import { ref, onMounted, withCtx, unref, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ExcalidrawComponent-CyjlPrja.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import _sfc_main$3 from "./Badge-BLykgubL.js";
import _sfc_main$4 from "./Button-DRijrITN.js";
import _sfc_main$2 from "./Card-qmctt-Ej.js";
import "./Form-DLTsfASe.js";
import "./ItemList-BMhf5pOx.js";
import "./RichTextEditor-Dw4E-YzI.js";
import "./TextField-C0ZHhnba.js";
import "./KeyboardShortcutDisabler-CZ9a0rUV.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    props.auth;
    const showDraw = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showDraw.value = true;
      } else {
        showDraw.value = props.showDraw || false;
      }
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
    });
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
      const url = new URL(window.location.href);
      if (showDraw.value) {
        url.searchParams.set("draw", "1");
      } else {
        url.searchParams.delete("draw");
      }
      window.history.pushState({}, "", url);
    };
    const deleteWrite = (id) => {
      if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
        router.delete(route("writes.destroy", id));
      }
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("tr-TR", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mb-4 flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><h1 class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(write.value.title)}</h1>`);
                  if (write.value.category) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { variant: "secondary" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(write.value.category.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(write.value.category.name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    onClick: toggleContent,
                    variant: showDraw.value ? "primary" : "ghost",
                    size: "sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(showDraw.value ? "Metni Göster" : "Çizim Göster")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(showDraw.value ? "Metni Göster" : "Çizim Göster"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(props).auth.user) {
                    _push3(`<div class="dropdown dropdown-end"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$4), {
                      variant: "ghost",
                      size: "sm",
                      class: "dropdown-toggle"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId3}><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"${_scopeId3}></path></svg>`);
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              viewBox: "0 0 20 20",
                              fill: "currentColor"
                            }, [
                              createVNode("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<ul class="dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow"${_scopeId2}><li${_scopeId2}><a${ssrRenderAttr("href", _ctx.route("writes.edit", write.value.id))}${_scopeId2}>Düzenle</a></li><li${_scopeId2}><a href="#" class="text-error"${_scopeId2}>Sil</a></li></ul></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="divider my-2"${_scopeId2}></div>`);
                  if (showDraw.value) {
                    _push3(`<div class="min-h-[500px]"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$5, { write: write.value }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="prose-sm md:prose-base lg:prose-lg prose max-w-none"${_scopeId2}>`);
                    if (write.value.summary) {
                      _push3(`<div class="alert alert-info mb-6"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(write.value.summary)}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div${_scopeId2}>${write.value.content ?? ""}</div></div>`);
                  }
                  _push3(`<div class="text-base-content/70 mt-6 flex items-center justify-between text-sm"${_scopeId2}><div${_scopeId2}>Oluşturma: ${ssrInterpolate(formatDate(write.value.created_at))}</div><div class="flex items-center gap-4"${_scopeId2}><span class="flex items-center gap-1"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId2}></path></svg> ${ssrInterpolate(write.value.views_count)} görüntüleme </span>`);
                  if (write.value.updated_at !== write.value.created_at) {
                    _push3(`<span${_scopeId2}> Son güncelleme: ${ssrInterpolate(formatDate(write.value.updated_at))}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(write.value.title), 1),
                        write.value.category ? (openBlock(), createBlock(unref(_sfc_main$3), {
                          key: 0,
                          variant: "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(write.value.category.name), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$4), {
                          onClick: toggleContent,
                          variant: showDraw.value ? "primary" : "ghost",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(showDraw.value ? "Metni Göster" : "Çizim Göster"), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"]),
                        unref(props).auth.user ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "dropdown dropdown-end"
                        }, [
                          createVNode(unref(_sfc_main$4), {
                            variant: "ghost",
                            size: "sm",
                            class: "dropdown-toggle"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-5 w-5",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode("ul", { class: "dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow" }, [
                            createVNode("li", null, [
                              createVNode("a", {
                                href: _ctx.route("writes.edit", write.value.id)
                              }, "Düzenle", 8, ["href"])
                            ]),
                            createVNode("li", null, [
                              createVNode("a", {
                                href: "#",
                                class: "text-error",
                                onClick: withModifiers(($event) => deleteWrite(write.value.id), ["prevent"])
                              }, "Sil", 8, ["onClick"])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "divider my-2" }),
                    showDraw.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "min-h-[500px]"
                    }, [
                      createVNode(_sfc_main$5, { write: write.value }, null, 8, ["write"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "prose-sm md:prose-base lg:prose-lg prose max-w-none"
                    }, [
                      write.value.summary ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "alert alert-info mb-6"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-6 w-6 shrink-0 stroke-current"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, toDisplayString(write.value.summary), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", {
                        innerHTML: write.value.content
                      }, null, 8, ["innerHTML"])
                    ])),
                    createVNode("div", { class: "text-base-content/70 mt-6 flex items-center justify-between text-sm" }, [
                      createVNode("div", null, "Oluşturma: " + toDisplayString(formatDate(write.value.created_at)), 1),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(write.value.views_count) + " görüntüleme ", 1)
                        ]),
                        write.value.updated_at !== write.value.created_at ? (openBlock(), createBlock("span", { key: 0 }, " Son güncelleme: " + toDisplayString(formatDate(write.value.updated_at)), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(write.value.title), 1),
                      write.value.category ? (openBlock(), createBlock(unref(_sfc_main$3), {
                        key: 0,
                        variant: "secondary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(write.value.category.name), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$4), {
                        onClick: toggleContent,
                        variant: showDraw.value ? "primary" : "ghost",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(showDraw.value ? "Metni Göster" : "Çizim Göster"), 1)
                        ]),
                        _: 1
                      }, 8, ["variant"]),
                      unref(props).auth.user ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "dropdown dropdown-end"
                      }, [
                        createVNode(unref(_sfc_main$4), {
                          variant: "ghost",
                          size: "sm",
                          class: "dropdown-toggle"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              viewBox: "0 0 20 20",
                              fill: "currentColor"
                            }, [
                              createVNode("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode("ul", { class: "dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow" }, [
                          createVNode("li", null, [
                            createVNode("a", {
                              href: _ctx.route("writes.edit", write.value.id)
                            }, "Düzenle", 8, ["href"])
                          ]),
                          createVNode("li", null, [
                            createVNode("a", {
                              href: "#",
                              class: "text-error",
                              onClick: withModifiers(($event) => deleteWrite(write.value.id), ["prevent"])
                            }, "Sil", 8, ["onClick"])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "divider my-2" }),
                  showDraw.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "min-h-[500px]"
                  }, [
                    createVNode(_sfc_main$5, { write: write.value }, null, 8, ["write"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "prose-sm md:prose-base lg:prose-lg prose max-w-none"
                  }, [
                    write.value.summary ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "alert alert-info mb-6"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        class: "h-6 w-6 shrink-0 stroke-current"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(write.value.summary), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      innerHTML: write.value.content
                    }, null, 8, ["innerHTML"])
                  ])),
                  createVNode("div", { class: "text-base-content/70 mt-6 flex items-center justify-between text-sm" }, [
                    createVNode("div", null, "Oluşturma: " + toDisplayString(formatDate(write.value.created_at)), 1),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          class: "h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(write.value.views_count) + " görüntüleme ", 1)
                      ]),
                      write.value.updated_at !== write.value.created_at ? (openBlock(), createBlock("span", { key: 0 }, " Son güncelleme: " + toDisplayString(formatDate(write.value.updated_at)), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
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
