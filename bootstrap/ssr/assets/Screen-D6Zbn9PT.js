import { computed, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
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
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="divider"${_scopeId}>Servis Bilgileri</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Servis Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input-bordered input w-full" placeholder="Servis adı" required${_scopeId}></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Servis Kısa Adı</span></label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="input-bordered input w-full" placeholder="Servis kısa adı" required${_scopeId}></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Servis Açıklaması</span></label><textarea class="textarea-bordered textarea min-h-[120px] w-full" placeholder="Servis açıklaması" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Fiyat</span></label><div class="input-group"${_scopeId}><input${ssrRenderAttr("value", unref(form).price)} type="number" class="input-bordered input w-full" placeholder="Fiyat"${_scopeId}><span class="bg-primary text-primary-content"${_scopeId}>USD</span></div></div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Üst Kategori</span></label><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full" placeholder="Üst kategori arayın ve seçin"${_scopeId}>`);
            if (showDropdown.value && filteredCategories.value.length) {
              _push2(`<ul class="menu absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow"${_scopeId}><!--[-->`);
              ssrRenderList(filteredCategories.value, (parent) => {
                _push2(`<li${_scopeId}><a${_scopeId}>${ssrInterpolate(parent.name)}</a></li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider"${_scopeId}></div><div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services",
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
            _push2(`<button type="submit" class="btn btn-primary"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Servisi Oluştur </button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/services" }),
              createVNode(_sfc_main$3, { title: "Yeni Servis Oluştur" }),
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
                        createVNode("span", { class: "label-text" }, "Servis Kısa Adı")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        type: "text",
                        class: "input-bordered input w-full",
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
                        class: "textarea-bordered textarea min-h-[120px] w-full",
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
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          class: "input-bordered input w-full",
                          placeholder: "Üst kategori arayın ve seçin",
                          onFocus: ($event) => showDropdown.value = true,
                          onBlur: hideDropdownWithDelay
                        }, null, 40, ["onUpdate:modelValue", "onFocus"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        showDropdown.value && filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "menu absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
