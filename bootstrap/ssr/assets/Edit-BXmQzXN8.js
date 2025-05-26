import { unref, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BHShlreL.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4 } from "./TextInput-D6xpWjYM.js";
import { P as PrimaryButton } from "./PrimaryButton-Cif9S6uF.js";
import { _ as _sfc_main$5 } from "./TextArea-Cp39ROWZ.js";
import "./ApplicationLogo-BpcRW2-T.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    seo: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      route: props.seo.route,
      title: props.seo.title,
      description: props.seo.description,
      keywords: props.seo.keywords,
      og_title: props.seo.og_title,
      og_description: props.seo.og_description,
      og_image: props.seo.og_image,
      canonical_url: props.seo.canonical_url,
      robots: props.seo.robots,
      schema_org: props.seo.schema_org
    });
    const submit = () => {
      form.put(route("seo.update", props.seo.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "SEO Ayarları" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}>SEO Ayarları</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, "SEO Ayarları")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><div class="mb-6"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Ana Sayfa SEO Ayarları</h3><p class="mt-2 text-sm text-gray-500"${_scopeId}> Bu ayarlar sitenizin ana sayfasında kullanılacak SEO bilgilerini içerir. </p></div><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "route",
              value: "Route"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "route",
              type: "text",
              class: "mt-1 block w-full bg-gray-100",
              modelValue: unref(form).route,
              "onUpdate:modelValue": ($event) => unref(form).route = $event,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Başlık"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.title,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Açıklama"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "description",
              class: "mt-1 block w-full",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "keywords",
              value: "Anahtar Kelimeler"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "keywords",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).keywords,
              "onUpdate:modelValue": ($event) => unref(form).keywords = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.keywords,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-sm text-gray-500"${_scopeId}>Virgülle ayırarak birden fazla anahtar kelime girebilirsiniz.</p></div><div class="border-t border-gray-200 pt-6 dark:border-gray-700"${_scopeId}><h4 class="mb-4 text-lg font-medium"${_scopeId}>Open Graph Ayarları</h4><div class="space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "og_title",
              value: "OG Başlık"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "og_title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_title,
              "onUpdate:modelValue": ($event) => unref(form).og_title = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.og_title,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "og_description",
              value: "OG Açıklama"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "og_description",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_description,
              "onUpdate:modelValue": ($event) => unref(form).og_description = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.og_description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "og_image",
              value: "OG Görsel URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "og_image",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_image,
              "onUpdate:modelValue": ($event) => unref(form).og_image = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.og_image,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="border-t border-gray-200 pt-6 dark:border-gray-700"${_scopeId}><h4 class="mb-4 text-lg font-medium"${_scopeId}>Gelişmiş Ayarlar</h4><div class="space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "canonical_url",
              value: "Canonical URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "canonical_url",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).canonical_url,
              "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.canonical_url,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "robots",
              value: "Robots"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "robots",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).robots,
              "onUpdate:modelValue": ($event) => unref(form).robots = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.robots,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-sm text-gray-500"${_scopeId}>Örnek: index, follow</p></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "schema_org",
              value: "Schema.org JSON"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "schema_org",
              class: "mt-1 block w-full font-mono",
              modelValue: unref(form).schema_org,
              "onUpdate:modelValue": ($event) => unref(form).schema_org = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.schema_org,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-sm text-gray-500"${_scopeId}>Geçerli bir JSON formatında olmalıdır.</p></div></div></div><div class="flex items-center justify-end border-t border-gray-200 pt-6 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Değişiklikleri Kaydet `);
                } else {
                  return [
                    createTextVNode(" Değişiklikleri Kaydet ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Ana Sayfa SEO Ayarları"),
                        createVNode("p", { class: "mt-2 text-sm text-gray-500" }, " Bu ayarlar sitenizin ana sayfasında kullanılacak SEO bilgilerini içerir. ")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "route",
                            value: "Route"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "route",
                            type: "text",
                            class: "mt-1 block w-full bg-gray-100",
                            modelValue: unref(form).route,
                            "onUpdate:modelValue": ($event) => unref(form).route = $event,
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Başlık"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.title,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "description",
                            value: "Açıklama"
                          }),
                          createVNode(_sfc_main$5, {
                            id: "description",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.description,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "keywords",
                            value: "Anahtar Kelimeler"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "keywords",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).keywords,
                            "onUpdate:modelValue": ($event) => unref(form).keywords = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.keywords,
                            class: "mt-2"
                          }, null, 8, ["message"]),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Virgülle ayırarak birden fazla anahtar kelime girebilirsiniz.")
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 pt-6 dark:border-gray-700" }, [
                          createVNode("h4", { class: "mb-4 text-lg font-medium" }, "Open Graph Ayarları"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "og_title",
                                value: "OG Başlık"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "og_title",
                                type: "text",
                                class: "mt-1 block w-full",
                                modelValue: unref(form).og_title,
                                "onUpdate:modelValue": ($event) => unref(form).og_title = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.og_title,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "og_description",
                                value: "OG Açıklama"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "og_description",
                                class: "mt-1 block w-full",
                                modelValue: unref(form).og_description,
                                "onUpdate:modelValue": ($event) => unref(form).og_description = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.og_description,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "og_image",
                                value: "OG Görsel URL"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "og_image",
                                type: "text",
                                class: "mt-1 block w-full",
                                modelValue: unref(form).og_image,
                                "onUpdate:modelValue": ($event) => unref(form).og_image = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.og_image,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 pt-6 dark:border-gray-700" }, [
                          createVNode("h4", { class: "mb-4 text-lg font-medium" }, "Gelişmiş Ayarlar"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "canonical_url",
                                value: "Canonical URL"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "canonical_url",
                                type: "text",
                                class: "mt-1 block w-full",
                                modelValue: unref(form).canonical_url,
                                "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.canonical_url,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "robots",
                                value: "Robots"
                              }),
                              createVNode(_sfc_main$3, {
                                id: "robots",
                                type: "text",
                                class: "mt-1 block w-full",
                                modelValue: unref(form).robots,
                                "onUpdate:modelValue": ($event) => unref(form).robots = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.robots,
                                class: "mt-2"
                              }, null, 8, ["message"]),
                              createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Örnek: index, follow")
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$2, {
                                for: "schema_org",
                                value: "Schema.org JSON"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "schema_org",
                                class: "mt-1 block w-full font-mono",
                                modelValue: unref(form).schema_org,
                                "onUpdate:modelValue": ($event) => unref(form).schema_org = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.schema_org,
                                class: "mt-2"
                              }, null, 8, ["message"]),
                              createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Geçerli bir JSON formatında olmalıdır.")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end border-t border-gray-200 pt-6 dark:border-gray-700" }, [
                          createVNode(PrimaryButton, {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Değişiklikleri Kaydet ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seo/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
