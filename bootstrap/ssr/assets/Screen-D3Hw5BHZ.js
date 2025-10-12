import { computed, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BIqwcPls.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="divider"${_scopeId}>Servis Bilgileri</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Servis Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input-bordered input w-full" placeholder="Servis adı" required${_scopeId}></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Servis Açıklaması</span></label><textarea class="textarea-bordered textarea min-h-[120px] w-full" placeholder="Servis açıklaması"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Fiyat</span></label><div class="input-group"${_scopeId}><input${ssrRenderAttr("value", unref(form).price)} type="number" class="input-bordered input w-full" placeholder="Fiyat"${_scopeId}><span class="bg-primary text-primary-content"${_scopeId}>USD</span></div></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Üst Kategori</span></label><select class="select-bordered select w-full"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, null) : ssrLooseEqual(unref(form).parent_id, null)) ? " selected" : ""}${_scopeId}>Yok</option><!--[-->`);
            ssrRenderList(parentOptions.value, (parent) => {
              _push2(`<option${ssrRenderAttr("value", parent.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, parent.id) : ssrLooseEqual(unref(form).parent_id, parent.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(parent.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="divider"${_scopeId}>Alt Kategoriler</div>`);
            if (unref(form).subCategories.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz alt kategori bulunmamaktadır. &quot;Alt Kategori Ekle&quot; butonuyla ekleyebilirsiniz.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).subCategories, (subCategory, index) => {
              _push2(`<div class="rounded-r-lg border-l-4 border-primary bg-base-100 p-4 shadow-sm"${_scopeId}><div class="form-control mb-2 w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Alt Kategori Adı</span></label><input${ssrRenderAttr("value", subCategory.name)} type="text" class="input-bordered input w-full" placeholder="Alt kategori adı"${_scopeId}></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Fiyat</span></label><div class="input-group"${_scopeId}><input${ssrRenderAttr("value", subCategory.price)} type="number" class="input-bordered input w-full" placeholder="Fiyat"${_scopeId}><span class="bg-primary text-primary-content"${_scopeId}>USD</span></div></div><div class="mt-4 flex justify-end"${_scopeId}><button class="btn btn-error btn-sm"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div>`);
            });
            _push2(`<!--]--><button class="btn btn-primary btn-outline w-full"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-5 w-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Alt Kategori Ekle </button><div class="divider"${_scopeId}></div><div class="flex items-center justify-between"${_scopeId}><button class="btn btn-error"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Servisi Sil </button><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/services/${unref(form).id}`,
              class: "btn btn-ghost"
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
            _push2(`<button type="submit" class="btn btn-primary"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Kaydet </button></div></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                url: `/services/${unref(form).id}`
              }, null, 8, ["url"]),
              createVNode(_sfc_main$3, { title: "Servisi Düzenle" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
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
                        class: "input-bordered input w-full",
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
                        class: "textarea-bordered textarea min-h-[120px] w-full",
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
                          class: "input-bordered input w-full",
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
                        class: "select-bordered select w-full"
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
                        class: "rounded-r-lg border-l-4 border-primary bg-base-100 p-4 shadow-sm"
                      }, [
                        createVNode("div", { class: "form-control mb-2 w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Alt Kategori Adı")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => subCategory.name = $event,
                            type: "text",
                            class: "input-bordered input w-full",
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
                              class: "input-bordered input w-full",
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
                            class: "btn btn-error btn-sm"
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
                      class: "btn btn-primary btn-outline w-full"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
