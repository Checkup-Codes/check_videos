import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const lessons = computed(() => {
      return props.lessons || [];
    });
    const formatDate = (date) => {
      if (!date) return "-";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("tr-TR", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"${_scopeId}><h2 class="mb-3 text-xl font-bold text-primary sm:mb-0"${_scopeId}>DERSLER</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/lessons/create",
              class: "btn btn-primary btn-sm self-start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Yeni Ders `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "mr-1 h-5 w-5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Yeni Ders ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-5 w-full"${_scopeId}><div class="card-compact card w-full border border-gray-200 bg-white shadow-md shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body"${_scopeId}>`);
            if (lessons.value.length === 0) {
              _push2(`<div class="p-4"${_scopeId}><div class="alert alert-warning"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>Henüz ders bulunamadı.</span></div></div>`);
            } else {
              _push2(`<div${_scopeId}><div class="hidden overflow-x-auto md:block"${_scopeId}><table class="table table-zebra"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="text-left"${_scopeId}>Ders Adı</th><th class="text-center"${_scopeId}>Slug</th><th class="text-center"${_scopeId}>Playlist ID</th><th class="text-center"${_scopeId}>Oluşturma Tarihi</th><th class="text-center"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(lessons.value, (lesson) => {
                _push2(`<tr class="hover"${_scopeId}><td${_scopeId}>${ssrInterpolate(lesson.title)}</td><td class="text-center"${_scopeId}>${ssrInterpolate(lesson.slug)}</td><td class="text-center"${_scopeId}><div class="badge badge-neutral max-w-xs truncate"${_scopeId}>${ssrInterpolate(lesson.playlist_id)}</div></td><td class="text-center"${_scopeId}>${ssrInterpolate(formatDate(lesson.created_at))}</td><td class="text-center"${_scopeId}><div class="flex justify-center space-x-1"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/lessons/${lesson.slug}`,
                  class: "btn btn-ghost btn-xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
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
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/lessons/${lesson.slug}/edit`,
                  class: "btn btn-ghost btn-xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="divide-y divide-base-200 md:hidden"${_scopeId}><!--[-->`);
              ssrRenderList(lessons.value, (lesson) => {
                _push2(`<div class="p-4 hover:bg-base-100"${_scopeId}><div class="mb-2"${_scopeId}><h3 class="font-medium text-primary"${_scopeId}>${ssrInterpolate(lesson.title)}</h3><p class="truncate text-sm opacity-70"${_scopeId}>${ssrInterpolate(lesson.slug)}</p></div><div class="my-2 grid grid-cols-2 gap-2 text-sm"${_scopeId}><div${_scopeId}><span class="block font-semibold"${_scopeId}>Playlist:</span><div class="badge badge-neutral badge-sm max-w-full truncate"${_scopeId}>${ssrInterpolate(lesson.playlist_id)}</div></div><div${_scopeId}><span class="block font-semibold"${_scopeId}>Tarih:</span><span${_scopeId}>${ssrInterpolate(formatDate(lesson.created_at))}</span></div></div><div class="mt-3 flex justify-end space-x-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/lessons/${lesson.slug}`,
                  class: "btn btn-outline btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId2}></path></svg> Göster `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mr-1 h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
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
                        createTextVNode(" Göster ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/lessons/${lesson.slug}/edit`,
                  class: "btn btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mr-1 h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                createVNode("h2", { class: "mb-3 text-xl font-bold text-primary sm:mb-0" }, "DERSLER"),
                createVNode(unref(Link), {
                  href: "/lessons/create",
                  class: "btn btn-primary btn-sm self-start"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "mr-1 h-5 w-5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Yeni Ders ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "mb-5 w-full" }, [
                createVNode("div", { class: "card-compact card w-full border border-gray-200 bg-white shadow-md shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                  createVNode("div", { class: "card-body" }, [
                    lessons.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4"
                    }, [
                      createVNode("div", { class: "alert alert-warning" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-6 w-6 shrink-0 stroke-current",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          })
                        ])),
                        createVNode("span", null, "Henüz ders bulunamadı.")
                      ])
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "hidden overflow-x-auto md:block" }, [
                        createVNode("table", { class: "table table-zebra" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "text-left" }, "Ders Adı"),
                              createVNode("th", { class: "text-center" }, "Slug"),
                              createVNode("th", { class: "text-center" }, "Playlist ID"),
                              createVNode("th", { class: "text-center" }, "Oluşturma Tarihi"),
                              createVNode("th", { class: "text-center" }, "İşlemler")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(lessons.value, (lesson) => {
                              return openBlock(), createBlock("tr", {
                                key: lesson.id,
                                class: "hover"
                              }, [
                                createVNode("td", null, toDisplayString(lesson.title), 1),
                                createVNode("td", { class: "text-center" }, toDisplayString(lesson.slug), 1),
                                createVNode("td", { class: "text-center" }, [
                                  createVNode("div", { class: "badge badge-neutral max-w-xs truncate" }, toDisplayString(lesson.playlist_id), 1)
                                ]),
                                createVNode("td", { class: "text-center" }, toDisplayString(formatDate(lesson.created_at)), 1),
                                createVNode("td", { class: "text-center" }, [
                                  createVNode("div", { class: "flex justify-center space-x-1" }, [
                                    createVNode(unref(Link), {
                                      href: `/lessons/${lesson.slug}`,
                                      class: "btn btn-ghost btn-xs"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-4 w-4",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor"
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
                                        ]))
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode(unref(Link), {
                                      href: `/lessons/${lesson.slug}/edit`,
                                      class: "btn btn-ghost btn-xs"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-4 w-4",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor"
                                        }, [
                                          createVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "2",
                                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                          })
                                        ]))
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "divide-y divide-base-200 md:hidden" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(lessons.value, (lesson) => {
                          return openBlock(), createBlock("div", {
                            key: lesson.id,
                            class: "p-4 hover:bg-base-100"
                          }, [
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("h3", { class: "font-medium text-primary" }, toDisplayString(lesson.title), 1),
                              createVNode("p", { class: "truncate text-sm opacity-70" }, toDisplayString(lesson.slug), 1)
                            ]),
                            createVNode("div", { class: "my-2 grid grid-cols-2 gap-2 text-sm" }, [
                              createVNode("div", null, [
                                createVNode("span", { class: "block font-semibold" }, "Playlist:"),
                                createVNode("div", { class: "badge badge-neutral badge-sm max-w-full truncate" }, toDisplayString(lesson.playlist_id), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("span", { class: "block font-semibold" }, "Tarih:"),
                                createVNode("span", null, toDisplayString(formatDate(lesson.created_at)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "mt-3 flex justify-end space-x-2" }, [
                              createVNode(unref(Link), {
                                href: `/lessons/${lesson.slug}`,
                                class: "btn btn-outline btn-sm"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "mr-1 h-4 w-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
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
                                  createTextVNode(" Göster ")
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode(unref(Link), {
                                href: `/lessons/${lesson.slug}/edit`,
                                class: "btn btn-sm"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "mr-1 h-4 w-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    })
                                  ])),
                                  createTextVNode(" Düzenle ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]))
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
