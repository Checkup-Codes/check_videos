import { ref, onMounted, mergeProps, useSSRContext, unref, withCtx, createTextVNode, createVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./AuthenticatedLayout-CyMJCkQw.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./TextInput-D6xpWjYM.js";
import { P as PrimaryButton } from "./PrimaryButton-D3PdNJOi.js";
import "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main$1 = {
  __name: "TextArea",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
        class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      route: "",
      title: "",
      description: "",
      keywords: "",
      og_title: "",
      og_description: "",
      og_image: "",
      canonical_url: "",
      robots: "index, follow",
      schema_org: ""
    });
    const submit = () => {
      form.post(route("seo.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Yeni SEO Kaydı" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}>Yeni SEO Kaydı</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, "Yeni SEO Kaydı")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "route",
              value: "Route"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "route",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).route,
              "onUpdate:modelValue": ($event) => unref(form).route = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.route,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "title",
              value: "Başlık"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.title,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "description",
              value: "Açıklama"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "description",
              class: "mt-1 block w-full",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "keywords",
              value: "Anahtar Kelimeler"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "keywords",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).keywords,
              "onUpdate:modelValue": ($event) => unref(form).keywords = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.keywords,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "og_title",
              value: "OG Başlık"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "og_title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_title,
              "onUpdate:modelValue": ($event) => unref(form).og_title = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.og_title,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "og_description",
              value: "OG Açıklama"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "og_description",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_description,
              "onUpdate:modelValue": ($event) => unref(form).og_description = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.og_description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "og_image",
              value: "OG Görsel URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "og_image",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).og_image,
              "onUpdate:modelValue": ($event) => unref(form).og_image = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.og_image,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "canonical_url",
              value: "Canonical URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "canonical_url",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).canonical_url,
              "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.canonical_url,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "robots",
              value: "Robots"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "robots",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).robots,
              "onUpdate:modelValue": ($event) => unref(form).robots = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.robots,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "schema_org",
              value: "Schema.org JSON"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "schema_org",
              class: "mt-1 block w-full",
              modelValue: unref(form).schema_org,
              "onUpdate:modelValue": ($event) => unref(form).schema_org = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.schema_org,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: "ms-4",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kaydet `);
                } else {
                  return [
                    createTextVNode(" Kaydet ")
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
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "route",
                            value: "Route"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "route",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).route,
                            "onUpdate:modelValue": ($event) => unref(form).route = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.route,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "title",
                            value: "Başlık"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.title,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "description",
                            value: "Açıklama"
                          }),
                          createVNode(_sfc_main$1, {
                            id: "description",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.description,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "keywords",
                            value: "Anahtar Kelimeler"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "keywords",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).keywords,
                            "onUpdate:modelValue": ($event) => unref(form).keywords = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.keywords,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "og_title",
                            value: "OG Başlık"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "og_title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).og_title,
                            "onUpdate:modelValue": ($event) => unref(form).og_title = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.og_title,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "og_description",
                            value: "OG Açıklama"
                          }),
                          createVNode(_sfc_main$1, {
                            id: "og_description",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).og_description,
                            "onUpdate:modelValue": ($event) => unref(form).og_description = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.og_description,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "og_image",
                            value: "OG Görsel URL"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "og_image",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).og_image,
                            "onUpdate:modelValue": ($event) => unref(form).og_image = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.og_image,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "canonical_url",
                            value: "Canonical URL"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "canonical_url",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).canonical_url,
                            "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.canonical_url,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "robots",
                            value: "Robots"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "robots",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).robots,
                            "onUpdate:modelValue": ($event) => unref(form).robots = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.robots,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "schema_org",
                            value: "Schema.org JSON"
                          }),
                          createVNode(_sfc_main$1, {
                            id: "schema_org",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).schema_org,
                            "onUpdate:modelValue": ($event) => unref(form).schema_org = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.schema_org,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                          createVNode(PrimaryButton, {
                            class: "ms-4",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kaydet ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seo/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
