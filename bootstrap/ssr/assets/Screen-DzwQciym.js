import { computed, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$4 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const service = computed(() => props.service || {});
    const form = useForm({
      id: service.value.id,
      name: service.value.name || "",
      description: service.value.description || "",
      price: service.value.price || "",
      parent_id: service.value.parent_id || null,
      subCategories: service.value.subCategories || []
    });
    const parentOptions = computed(() => {
      return (props.services || []).filter((s) => s.id !== form.id);
    });
    const addSubCategory = () => {
      form.subCategories.push({ name: "", price: "" });
    };
    const removeSubCategory = (index) => {
      form.subCategories.splice(index, 1);
    };
    const handleSubmit = () => {
      form.put(`/services/${form.id}`);
    };
    const deleteService = () => {
      if (confirm("Bu servisi silmek istediğinize emin misiniz?")) {
        form.delete(`/services/${form.id}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              url: `/services/${unref(form).id}`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Servisi Düzenle" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="divider"${_scopeId2}>Servis Bilgileri</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Servis Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input input-bordered w-full" placeholder="Servis adı" required${_scopeId2}></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Servis Açıklaması</span></label><textarea class="textarea textarea-bordered min-h-[120px] w-full" placeholder="Servis açıklaması"${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Fiyat</span></label><div class="input-group"${_scopeId2}><input${ssrRenderAttr("value", unref(form).price)} type="number" class="input input-bordered w-full" placeholder="Fiyat"${_scopeId2}><span class="bg-primary text-primary-content"${_scopeId2}>USD</span></div></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Üst Kategori</span></label><select class="select select-bordered w-full"${_scopeId2}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, null) : ssrLooseEqual(unref(form).parent_id, null)) ? " selected" : ""}${_scopeId2}>Yok</option><!--[-->`);
                  ssrRenderList(parentOptions.value, (parent) => {
                    _push3(`<option${ssrRenderAttr("value", parent.id)}${_scopeId2}>${ssrInterpolate(parent.name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="divider"${_scopeId2}>Alt Kategoriler</div>`);
                  if (unref(form).subCategories.length === 0) {
                    _push3(`<div class="alert alert-info"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg><span${_scopeId2}>Henüz alt kategori bulunmamaktadır. &quot;Alt Kategori Ekle&quot; butonuyla ekleyebilirsiniz.</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(form).subCategories, (subCategory, index) => {
                    _push3(`<div class="border-primary bg-base-100 rounded-r-lg border-l-4 p-4 shadow-sm"${_scopeId2}><div class="form-control mb-2 w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Alt Kategori Adı</span></label><input${ssrRenderAttr("value", subCategory.name)} type="text" class="input input-bordered w-full" placeholder="Alt kategori adı"${_scopeId2}></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Fiyat</span></label><div class="input-group"${_scopeId2}><input${ssrRenderAttr("value", subCategory.price)} type="number" class="input input-bordered w-full" placeholder="Fiyat"${_scopeId2}><span class="bg-primary text-primary-content"${_scopeId2}>USD</span></div></div><div class="mt-4 flex justify-end"${_scopeId2}><button class="btn btn-sm btn-error"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId2}></path></svg> Kaldır </button></div></div>`);
                  });
                  _push3(`<!--]--><button class="btn btn-outline btn-primary w-full"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-5 w-5"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId2}></path></svg> Alt Kategori Ekle </button><div class="divider"${_scopeId2}></div><div class="flex items-center justify-between"${_scopeId2}><button class="btn btn-error"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId2}></path></svg> Servisi Sil </button><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: `/services/${unref(form).id}`,
                    class: "btn btn-ghost"
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
                  _push3(`<button type="submit" class="btn btn-primary"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId2}></path></svg> Kaydet </button></div></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "divider" }, "Servis Bilgileri"),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Servis Adı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          class: "input input-bordered w-full",
                          placeholder: "Servis adı",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Servis Açıklaması")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          class: "textarea textarea-bordered min-h-[120px] w-full",
                          placeholder: "Servis açıklaması"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Fiyat")
                        ]),
                        createVNode("div", { class: "input-group" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).price = $event,
                            type: "number",
                            class: "input input-bordered w-full",
                            placeholder: "Fiyat"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).price]
                          ]),
                          createVNode("span", { class: "bg-primary text-primary-content" }, "USD")
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Üst Kategori")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                          class: "select select-bordered w-full"
                        }, [
                          createVNode("option", { value: null }, "Yok"),
                          (openBlock(true), createBlock(Fragment, null, renderList(parentOptions.value, (parent) => {
                            return openBlock(), createBlock("option", {
                              key: parent.id,
                              value: parent.id
                            }, toDisplayString(parent.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).parent_id]
                        ])
                      ]),
                      createVNode("div", { class: "divider" }, "Alt Kategoriler"),
                      unref(form).subCategories.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "alert alert-info"
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
                        createVNode("span", null, 'Henüz alt kategori bulunmamaktadır. "Alt Kategori Ekle" butonuyla ekleyebilirsiniz.')
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).subCategories, (subCategory, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "border-primary bg-base-100 rounded-r-lg border-l-4 p-4 shadow-sm"
                        }, [
                          createVNode("div", { class: "form-control mb-2 w-full" }, [
                            createVNode("label", { class: "label" }, [
                              createVNode("span", { class: "label-text" }, "Alt Kategori Adı")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => subCategory.name = $event,
                              type: "text",
                              class: "input input-bordered w-full",
                              placeholder: "Alt kategori adı"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, subCategory.name]
                            ])
                          ]),
                          createVNode("div", { class: "form-control w-full" }, [
                            createVNode("label", { class: "label" }, [
                              createVNode("span", { class: "label-text" }, "Fiyat")
                            ]),
                            createVNode("div", { class: "input-group" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => subCategory.price = $event,
                                type: "number",
                                class: "input input-bordered w-full",
                                placeholder: "Fiyat"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, subCategory.price]
                              ]),
                              createVNode("span", { class: "bg-primary text-primary-content" }, "USD")
                            ])
                          ]),
                          createVNode("div", { class: "mt-4 flex justify-end" }, [
                            createVNode("button", {
                              onClick: withModifiers(($event) => removeSubCategory(index), ["prevent"]),
                              class: "btn btn-sm btn-error"
                            }, [
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
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ])),
                              createTextVNode(" Kaldır ")
                            ], 8, ["onClick"])
                          ])
                        ]);
                      }), 128)),
                      createVNode("button", {
                        onClick: withModifiers(addSubCategory, ["prevent"]),
                        class: "btn btn-outline btn-primary w-full"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-5 w-5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4.5v15m7.5-7.5h-15"
                          })
                        ])),
                        createTextVNode(" Alt Kategori Ekle ")
                      ]),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("button", {
                          onClick: withModifiers(deleteService, ["prevent"]),
                          class: "btn btn-error"
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
                          createTextVNode(" Servisi Sil ")
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(Link), {
                            href: `/services/${unref(form).id}`,
                            class: "btn btn-ghost"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("İptal")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            class: "btn btn-primary"
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
                                d: "M5 13l4 4L19 7"
                              })
                            ])),
                            createTextVNode(" Kaydet ")
                          ])
                        ])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                url: `/services/${unref(form).id}`
              }, null, 8, ["url"]),
              createVNode(_sfc_main$3, { title: "Servisi Düzenle" }),
              createVNode(_sfc_main$4, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "divider" }, "Servis Bilgileri"),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Servis Adı")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        class: "input input-bordered w-full",
                        placeholder: "Servis adı",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ])
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Servis Açıklaması")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        class: "textarea textarea-bordered min-h-[120px] w-full",
                        placeholder: "Servis açıklaması"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ])
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Fiyat")
                      ]),
                      createVNode("div", { class: "input-group" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).price = $event,
                          type: "number",
                          class: "input input-bordered w-full",
                          placeholder: "Fiyat"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).price]
                        ]),
                        createVNode("span", { class: "bg-primary text-primary-content" }, "USD")
                      ])
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Üst Kategori")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                        class: "select select-bordered w-full"
                      }, [
                        createVNode("option", { value: null }, "Yok"),
                        (openBlock(true), createBlock(Fragment, null, renderList(parentOptions.value, (parent) => {
                          return openBlock(), createBlock("option", {
                            key: parent.id,
                            value: parent.id
                          }, toDisplayString(parent.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).parent_id]
                      ])
                    ]),
                    createVNode("div", { class: "divider" }, "Alt Kategoriler"),
                    unref(form).subCategories.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "alert alert-info"
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
                      createVNode("span", null, 'Henüz alt kategori bulunmamaktadır. "Alt Kategori Ekle" butonuyla ekleyebilirsiniz.')
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).subCategories, (subCategory, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "border-primary bg-base-100 rounded-r-lg border-l-4 p-4 shadow-sm"
                      }, [
                        createVNode("div", { class: "form-control mb-2 w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Alt Kategori Adı")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => subCategory.name = $event,
                            type: "text",
                            class: "input input-bordered w-full",
                            placeholder: "Alt kategori adı"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, subCategory.name]
                          ])
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Fiyat")
                          ]),
                          createVNode("div", { class: "input-group" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => subCategory.price = $event,
                              type: "number",
                              class: "input input-bordered w-full",
                              placeholder: "Fiyat"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, subCategory.price]
                            ]),
                            createVNode("span", { class: "bg-primary text-primary-content" }, "USD")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 flex justify-end" }, [
                          createVNode("button", {
                            onClick: withModifiers(($event) => removeSubCategory(index), ["prevent"]),
                            class: "btn btn-sm btn-error"
                          }, [
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
                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              })
                            ])),
                            createTextVNode(" Kaldır ")
                          ], 8, ["onClick"])
                        ])
                      ]);
                    }), 128)),
                    createVNode("button", {
                      onClick: withModifiers(addSubCategory, ["prevent"]),
                      class: "btn btn-outline btn-primary w-full"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-5 w-5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4.5v15m7.5-7.5h-15"
                        })
                      ])),
                      createTextVNode(" Alt Kategori Ekle ")
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("button", {
                        onClick: withModifiers(deleteService, ["prevent"]),
                        class: "btn btn-error"
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
                        createTextVNode(" Servisi Sil ")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Link), {
                          href: `/services/${unref(form).id}`,
                          class: "btn btn-ghost"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("İptal")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary"
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
                              d: "M5 13l4 4L19 7"
                            })
                          ])),
                          createTextVNode(" Kaydet ")
                        ])
                      ])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
