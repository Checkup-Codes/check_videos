import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import _sfc_main$2 from "./Card-qmctt-Ej.js";
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
            _push2(`<div class="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"${_scopeId}><h2 class="text-primary mb-3 text-xl font-bold sm:mb-0"${_scopeId}>DERSLER</h2>`);
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
            _push2(`</div><div class="mb-5 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { class: "card-compact w-full shadow-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (lessons.value.length === 0) {
                    _push3(`<div class="p-4"${_scopeId2}><div class="alert alert-warning"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId2}></path></svg><span${_scopeId2}>Henüz ders bulunamadı.</span></div></div>`);
                  } else {
                    _push3(`<div${_scopeId2}><div class="hidden overflow-x-auto md:block"${_scopeId2}><table class="table-zebra table"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th class="text-left"${_scopeId2}>Ders Adı</th><th class="text-center"${_scopeId2}>Slug</th><th class="text-center"${_scopeId2}>Playlist ID</th><th class="text-center"${_scopeId2}>Oluşturma Tarihi</th><th class="text-center"${_scopeId2}>İşlemler</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(lessons.value, (lesson) => {
                      _push3(`<tr class="hover"${_scopeId2}><td${_scopeId2}>${ssrInterpolate(lesson.title)}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(lesson.slug)}</td><td class="text-center"${_scopeId2}><div class="badge badge-neutral max-w-xs truncate"${_scopeId2}>${ssrInterpolate(lesson.playlist_id)}</div></td><td class="text-center"${_scopeId2}>${ssrInterpolate(formatDate(lesson.created_at))}</td><td class="text-center"${_scopeId2}><div class="flex justify-center space-x-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/lessons/${lesson.slug}`,
                        class: "btn btn-xs btn-ghost"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId3}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId3}></path></svg>`);
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
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/lessons/${lesson.slug}/edit`,
                        class: "btn btn-xs btn-ghost"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId3}></path></svg>`);
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
                      }, _parent3, _scopeId2));
                      _push3(`</div></td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div><div class="divide-base-200 divide-y md:hidden"${_scopeId2}><!--[-->`);
                    ssrRenderList(lessons.value, (lesson) => {
                      _push3(`<div class="hover:bg-base-100 p-4"${_scopeId2}><div class="mb-2"${_scopeId2}><h3 class="text-primary font-medium"${_scopeId2}>${ssrInterpolate(lesson.title)}</h3><p class="truncate text-sm opacity-70"${_scopeId2}>${ssrInterpolate(lesson.slug)}</p></div><div class="my-2 grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div${_scopeId2}><span class="block font-semibold"${_scopeId2}>Playlist:</span><div class="badge badge-neutral badge-sm max-w-full truncate"${_scopeId2}>${ssrInterpolate(lesson.playlist_id)}</div></div><div${_scopeId2}><span class="block font-semibold"${_scopeId2}>Tarih:</span><span${_scopeId2}>${ssrInterpolate(formatDate(lesson.created_at))}</span></div></div><div class="mt-3 flex justify-end space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/lessons/${lesson.slug}`,
                        class: "btn btn-sm btn-outline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId3}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId3}></path></svg> Göster `);
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
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/lessons/${lesson.slug}/edit`,
                        class: "btn btn-sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId3}></path></svg> Düzenle `);
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
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                  }
                } else {
                  return [
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
                        createVNode("table", { class: "table-zebra table" }, [
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
                                      class: "btn btn-xs btn-ghost"
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
                                      class: "btn btn-xs btn-ghost"
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
                      createVNode("div", { class: "divide-base-200 divide-y md:hidden" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(lessons.value, (lesson) => {
                          return openBlock(), createBlock("div", {
                            key: lesson.id,
                            class: "hover:bg-base-100 p-4"
                          }, [
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("h3", { class: "text-primary font-medium" }, toDisplayString(lesson.title), 1),
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
                                class: "btn btn-sm btn-outline"
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                createVNode("h2", { class: "text-primary mb-3 text-xl font-bold sm:mb-0" }, "DERSLER"),
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
                createVNode(_sfc_main$2, { class: "card-compact w-full shadow-md" }, {
                  default: withCtx(() => [
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
                        createVNode("table", { class: "table-zebra table" }, [
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
                                      class: "btn btn-xs btn-ghost"
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
                                      class: "btn btn-xs btn-ghost"
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
                      createVNode("div", { class: "divide-base-200 divide-y md:hidden" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(lessons.value, (lesson) => {
                          return openBlock(), createBlock("div", {
                            key: lesson.id,
                            class: "hover:bg-base-100 p-4"
                          }, [
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("h3", { class: "text-primary font-medium" }, toDisplayString(lesson.title), 1),
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
                                class: "btn btn-sm btn-outline"
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
                  ]),
                  _: 1
                })
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
