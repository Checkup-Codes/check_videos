import { withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import _sfc_main$3 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      title: "",
      slug: "",
      playlist_id: ""
    });
    const generateSlug = () => {
      if (!form.title) return;
      form.slug = form.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-5"${_scopeId}><div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { href: "/lessons" }, null, _parent2, _scopeId));
            _push2(`<div class="w-full sm:w-auto"${_scopeId}><h2 class="text-primary truncate text-xl font-bold sm:text-2xl"${_scopeId}>Yeni Ders Ekle</h2></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "card-compact mt-5 w-full shadow-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="p-4"${_scopeId2}><div class="form-control mb-4 w-full"${_scopeId2}><label for="title" class="label"${_scopeId2}><span class="label-text font-medium"${_scopeId2}>Ders Başlığı</span></label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" placeholder="Ders başlığını girin" class="${ssrRenderClass([{ "input-error": unref(form).errors.title }, "input input-bordered w-full"])}"${_scopeId2}>`);
                  if (unref(form).errors.title) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(form).errors.title)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control mb-4 w-full"${_scopeId2}><label for="slug" class="label"${_scopeId2}><span class="label-text font-medium"${_scopeId2}>Slug</span></label><div class="flex items-center gap-2"${_scopeId2}><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" placeholder="Slug girin (slug-format)" class="${ssrRenderClass([{ "input-error": unref(form).errors.slug }, "input input-bordered w-full"])}"${_scopeId2}><button type="button" class="btn btn-square btn-outline shrink-0"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId2}></path></svg></button></div>`);
                  if (unref(form).errors.slug) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(form).errors.slug)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control mb-4 w-full"${_scopeId2}><label for="playlist_id" class="label"${_scopeId2}><span class="label-text font-medium"${_scopeId2}>YouTube Playlist ID</span></label><input${ssrRenderAttr("value", unref(form).playlist_id)} type="text" id="playlist_id" placeholder="YouTube Playlist ID girin" class="${ssrRenderClass([{ "input-error": unref(form).errors.playlist_id }, "input input-bordered w-full"])}"${_scopeId2}>`);
                  if (unref(form).errors.playlist_id) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(form).errors.playlist_id)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-1 text-sm opacity-70"${_scopeId2}><p class="break-words"${_scopeId2}> Örnek: https://www.youtube.com/playlist?list=<span class="font-bold"${_scopeId2}>PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l</span></p><p${_scopeId2}>Koyu renkli bölümü girin.</p></div></div><div class="mt-8 flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/lessons",
                    class: "btn w-full sm:w-auto"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`İptal`);
                      } else {
                        return [
                          createTextVNode("İptal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<button type="submit" class="btn btn-primary w-full sm:w-auto"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}>`);
                  if (unref(form).processing) {
                    _push3(`<svg class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId2}></path></svg>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Kaydet </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(($event) => unref(form).post("/lessons"), ["prevent"]),
                      class: "p-4"
                    }, [
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "title",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "Ders Başlığı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          id: "title",
                          placeholder: "Ders başlığını girin",
                          class: ["input input-bordered w-full", { "input-error": unref(form).errors.title }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.title ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.title), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "slug",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "Slug")
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                            type: "text",
                            id: "slug",
                            placeholder: "Slug girin (slug-format)",
                            class: ["input input-bordered w-full", { "input-error": unref(form).errors.slug }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).slug]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: generateSlug,
                            class: "btn btn-square btn-outline shrink-0"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ]))
                          ])
                        ]),
                        unref(form).errors.slug ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.slug), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "playlist_id",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "YouTube Playlist ID")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).playlist_id = $event,
                          type: "text",
                          id: "playlist_id",
                          placeholder: "YouTube Playlist ID girin",
                          class: ["input input-bordered w-full", { "input-error": unref(form).errors.playlist_id }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).playlist_id]
                        ]),
                        unref(form).errors.playlist_id ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.playlist_id), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-1 text-sm opacity-70" }, [
                          createVNode("p", { class: "break-words" }, [
                            createTextVNode(" Örnek: https://www.youtube.com/playlist?list="),
                            createVNode("span", { class: "font-bold" }, "PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l")
                          ]),
                          createVNode("p", null, "Koyu renkli bölümü girin.")
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0" }, [
                        createVNode(unref(Link), {
                          href: "/lessons",
                          class: "btn w-full sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("İptal")
                          ]),
                          _: 1
                        }),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary w-full sm:w-auto",
                          disabled: unref(form).processing
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "-ml-1 mr-2 h-4 w-4 animate-spin text-white",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }),
                            createVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })
                          ])) : createCommentVNode("", true),
                          createTextVNode(" Kaydet ")
                        ], 8, ["disabled"])
                      ])
                    ], 40, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-5" }, [
                createVNode("div", { class: "flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0" }, [
                  createVNode(_sfc_main$2, { href: "/lessons" }),
                  createVNode("div", { class: "w-full sm:w-auto" }, [
                    createVNode("h2", { class: "text-primary truncate text-xl font-bold sm:text-2xl" }, "Yeni Ders Ekle")
                  ])
                ]),
                createVNode(_sfc_main$3, { class: "card-compact mt-5 w-full shadow-md" }, {
                  default: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(($event) => unref(form).post("/lessons"), ["prevent"]),
                      class: "p-4"
                    }, [
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "title",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "Ders Başlığı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          id: "title",
                          placeholder: "Ders başlığını girin",
                          class: ["input input-bordered w-full", { "input-error": unref(form).errors.title }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.title ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.title), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "slug",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "Slug")
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                            type: "text",
                            id: "slug",
                            placeholder: "Slug girin (slug-format)",
                            class: ["input input-bordered w-full", { "input-error": unref(form).errors.slug }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).slug]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: generateSlug,
                            class: "btn btn-square btn-outline shrink-0"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ]))
                          ])
                        ]),
                        unref(form).errors.slug ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.slug), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control mb-4 w-full" }, [
                        createVNode("label", {
                          for: "playlist_id",
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text font-medium" }, "YouTube Playlist ID")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).playlist_id = $event,
                          type: "text",
                          id: "playlist_id",
                          placeholder: "YouTube Playlist ID girin",
                          class: ["input input-bordered w-full", { "input-error": unref(form).errors.playlist_id }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).playlist_id]
                        ]),
                        unref(form).errors.playlist_id ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(form).errors.playlist_id), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-1 text-sm opacity-70" }, [
                          createVNode("p", { class: "break-words" }, [
                            createTextVNode(" Örnek: https://www.youtube.com/playlist?list="),
                            createVNode("span", { class: "font-bold" }, "PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l")
                          ]),
                          createVNode("p", null, "Koyu renkli bölümü girin.")
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0" }, [
                        createVNode(unref(Link), {
                          href: "/lessons",
                          class: "btn w-full sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("İptal")
                          ]),
                          _: 1
                        }),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary w-full sm:w-auto",
                          disabled: unref(form).processing
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "-ml-1 mr-2 h-4 w-4 animate-spin text-white",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }),
                            createVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })
                          ])) : createCommentVNode("", true),
                          createTextVNode(" Kaydet ")
                        ], 8, ["disabled"])
                      ])
                    ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
