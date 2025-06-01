import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const lesson = props.lesson;
    const form = useForm({
      title: lesson.title,
      slug: lesson.slug,
      playlist_id: lesson.playlist_id
    });
    const showDeleteModal = ref(false);
    const deleting = ref(false);
    const generateSlug = () => {
      if (!form.title) return;
      form.slug = form.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    };
    const confirmDelete = () => {
      showDeleteModal.value = true;
    };
    const deleteLesson = () => {
      deleting.value = true;
      router.delete(`/lessons/${lesson.id}`, {
        onSuccess: () => {
          showDeleteModal.value = false;
          deleting.value = false;
        },
        onError: () => {
          deleting.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/lessons" }, null, _parent2, _scopeId));
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><form class="space-y-4"${_scopeId}><div class="form-control w-full"${_scopeId}><label for="title" class="label"${_scopeId}><span class="label-text font-medium"${_scopeId}>Ders Başlığı</span></label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" placeholder="Ders başlığını girin" class="${ssrRenderClass([{ "input-error": unref(form).errors.title }, "input-bordered input w-full"])}"${_scopeId}>`);
            if (unref(form).errors.title) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control mb-4 w-full"${_scopeId}><label for="slug" class="label"${_scopeId}><span class="label-text font-medium"${_scopeId}>Slug</span></label><div class="flex items-center gap-2"${_scopeId}><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" placeholder="Slug girin (slug-format)" class="${ssrRenderClass([{ "input-error": unref(form).errors.slug }, "input-bordered input w-full"])}"${_scopeId}><button type="button" class="btn btn-outline btn-square shrink-0"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg></button></div>`);
            if (unref(form).errors.slug) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(form).errors.slug)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control mb-4 w-full"${_scopeId}><label for="playlist_id" class="label"${_scopeId}><span class="label-text font-medium"${_scopeId}>YouTube Playlist ID</span></label><input${ssrRenderAttr("value", unref(form).playlist_id)} type="text" id="playlist_id" placeholder="YouTube Playlist ID girin" class="${ssrRenderClass([{ "input-error": unref(form).errors.playlist_id }, "input-bordered input w-full"])}"${_scopeId}>`);
            if (unref(form).errors.playlist_id) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(form).errors.playlist_id)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-1 text-sm opacity-70"${_scopeId}><p class="break-words"${_scopeId}> Örnek: https://www.youtube.com/playlist?list=<span class="font-bold"${_scopeId}>PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l</span></p><p${_scopeId}>Koyu renkli bölümü girin.</p></div></div><div class="mt-8 grid grid-cols-1 gap-3 sm:flex sm:justify-between"${_scopeId}><button type="button" class="btn btn-error order-last w-full sm:order-first sm:w-auto"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Sil </button><div class="flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/lessons",
              class: "btn w-full sm:w-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`İptal`);
                } else {
                  return [
                    createTextVNode("İptal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="btn btn-primary w-full sm:w-auto"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Kaydet </button></div></div></form></div></div><dialog${ssrIncludeBooleanAttr(showDeleteModal.value) ? " open" : ""} class="modal modal-bottom sm:modal-middle"${_scopeId}><div class="modal-box"${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Dersi Sil</h3><p class="py-4"${_scopeId}>Bu dersi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p><div class="modal-action flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0"${_scopeId}><button class="btn w-full sm:w-auto"${_scopeId}>İptal</button><button class="btn btn-error w-full sm:w-auto"${_scopeId}>`);
            if (deleting.value) {
              _push2(`<svg class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Sil </button></div></div><form method="dialog" class="modal-backdrop"${_scopeId}><button${_scopeId}>kapat</button></form></dialog>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/lessons" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(($event) => unref(form).put(`/lessons/${unref(lesson).id}`), ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "form-control w-full" }, [
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
                        class: ["input-bordered input w-full", { "input-error": unref(form).errors.title }]
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
                          class: ["input-bordered input w-full", { "input-error": unref(form).errors.slug }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).slug]
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: generateSlug,
                          class: "btn btn-outline btn-square shrink-0"
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
                        class: ["input-bordered input w-full", { "input-error": unref(form).errors.playlist_id }]
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
                    createVNode("div", { class: "mt-8 grid grid-cols-1 gap-3 sm:flex sm:justify-between" }, [
                      createVNode("button", {
                        onClick: withModifiers(confirmDelete, ["prevent"]),
                        type: "button",
                        class: "btn btn-error order-last w-full sm:order-first sm:w-auto"
                      }, [
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
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          })
                        ])),
                        createTextVNode(" Sil ")
                      ]),
                      createVNode("div", { class: "flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0" }, [
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
                    ])
                  ], 40, ["onSubmit"])
                ])
              ]),
              createVNode("dialog", {
                open: showDeleteModal.value,
                class: "modal modal-bottom sm:modal-middle"
              }, [
                createVNode("div", { class: "modal-box" }, [
                  createVNode("h3", { class: "text-lg font-bold" }, "Dersi Sil"),
                  createVNode("p", { class: "py-4" }, "Bu dersi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."),
                  createVNode("div", { class: "modal-action flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "btn w-full sm:w-auto"
                    }, "İptal", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteLesson,
                      class: "btn btn-error w-full sm:w-auto"
                    }, [
                      deleting.value ? (openBlock(), createBlock("svg", {
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
                      createTextVNode(" Sil ")
                    ])
                  ])
                ]),
                createVNode("form", {
                  method: "dialog",
                  class: "modal-backdrop"
                }, [
                  createVNode("button", null, "kapat")
                ])
              ], 8, ["open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
