import { computed, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
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
    const parentOptions = computed(() => props.services || []);
    const form = useForm({
      name: "",
      slug: "",
      description: "",
      price: null,
      parent_id: null
    });
    const searchQuery = ref("");
    const showDropdown = ref(false);
    const filteredCategories = computed(() => {
      if (!searchQuery.value) return parentOptions.value;
      return parentOptions.value.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const selectParent = (parent) => {
      form.parent_id = parent.id;
      searchQuery.value = parent.name;
      showDropdown.value = false;
    };
    const hideDropdownWithDelay = () => {
      setTimeout(() => {
        showDropdown.value = false;
      }, 200);
    };
    const handleSubmit = () => {
      form.post("/services");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/services" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Yeni Servis Oluştur" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="divider"${_scopeId2}>Servis Bilgileri</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Servis Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input input-bordered w-full" placeholder="Servis adı" required${_scopeId2}></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Servis Kısa Adı</span></label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="input input-bordered w-full" placeholder="Servis kısa adı" required${_scopeId2}></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Servis Açıklaması</span></label><textarea class="textarea textarea-bordered min-h-[120px] w-full" placeholder="Servis açıklaması" required${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Fiyat</span></label><div class="input-group"${_scopeId2}><input${ssrRenderAttr("value", unref(form).price)} type="number" class="input input-bordered w-full" placeholder="Fiyat"${_scopeId2}><span class="bg-primary text-primary-content"${_scopeId2}>USD</span></div></div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Üst Kategori</span></label><div class="relative"${_scopeId2}><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input input-bordered w-full" placeholder="Üst kategori arayın ve seçin"${_scopeId2}>`);
                  if (showDropdown.value && filteredCategories.value.length) {
                    _push3(`<ul class="menu bg-base-100 rounded-box border-base-300 absolute z-10 mt-1 max-h-60 w-full overflow-y-auto border p-2 shadow"${_scopeId2}><!--[-->`);
                    ssrRenderList(filteredCategories.value, (parent) => {
                      _push3(`<li${_scopeId2}><a${_scopeId2}>${ssrInterpolate(parent.name)}</a></li>`);
                    });
                    _push3(`<!--]--></ul>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="divider"${_scopeId2}></div><div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/services",
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
                  _push3(`<button type="submit" class="btn btn-primary"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId2}></path></svg> Servisi Oluştur </button></div></form>`);
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
                          createVNode("span", { class: "label-text" }, "Servis Kısa Adı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          type: "text",
                          class: "input input-bordered w-full",
                          placeholder: "Servis kısa adı",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).slug]
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Servis Açıklaması")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          class: "textarea textarea-bordered min-h-[120px] w-full",
                          placeholder: "Servis açıklaması",
                          required: ""
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
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            class: "input input-bordered w-full",
                            placeholder: "Üst kategori arayın ve seçin",
                            onFocus: ($event) => showDropdown.value = true,
                            onBlur: hideDropdownWithDelay
                          }, null, 40, ["onUpdate:modelValue", "onFocus"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          showDropdown.value && filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                            key: 0,
                            class: "menu bg-base-100 rounded-box border-base-300 absolute z-10 mt-1 max-h-60 w-full overflow-y-auto border p-2 shadow"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredCategories.value, (parent) => {
                              return openBlock(), createBlock("li", {
                                key: parent.id
                              }, [
                                createVNode("a", {
                                  onClick: withModifiers(($event) => selectParent(parent), ["prevent"])
                                }, toDisplayString(parent.name), 9, ["onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex justify-end gap-2" }, [
                        createVNode(unref(Link), {
                          href: "/services",
                          class: "btn btn-ghost"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("İptal")
                          ]),
                          _: 1
                        }),
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
                          createTextVNode(" Servisi Oluştur ")
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
              createVNode(_sfc_main$2, { url: "/services" }),
              createVNode(_sfc_main$3, { title: "Yeni Servis Oluştur" }),
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
                        createVNode("span", { class: "label-text" }, "Servis Kısa Adı")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        type: "text",
                        class: "input input-bordered w-full",
                        placeholder: "Servis kısa adı",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).slug]
                      ])
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Servis Açıklaması")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        class: "textarea textarea-bordered min-h-[120px] w-full",
                        placeholder: "Servis açıklaması",
                        required: ""
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
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          class: "input input-bordered w-full",
                          placeholder: "Üst kategori arayın ve seçin",
                          onFocus: ($event) => showDropdown.value = true,
                          onBlur: hideDropdownWithDelay
                        }, null, 40, ["onUpdate:modelValue", "onFocus"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        showDropdown.value && filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "menu bg-base-100 rounded-box border-base-300 absolute z-10 mt-1 max-h-60 w-full overflow-y-auto border p-2 shadow"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredCategories.value, (parent) => {
                            return openBlock(), createBlock("li", {
                              key: parent.id
                            }, [
                              createVNode("a", {
                                onClick: withModifiers(($event) => selectParent(parent), ["prevent"])
                              }, toDisplayString(parent.name), 9, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(unref(Link), {
                        href: "/services",
                        class: "btn btn-ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("İptal")
                        ]),
                        _: 1
                      }),
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
                        createTextVNode(" Servisi Oluştur ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
