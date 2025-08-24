import { unref, withCtx, createVNode, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-HHDrlpa6.js";
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
      title: props.seo.title,
      description: props.seo.description,
      keywords: props.seo.keywords,
      og_title: props.seo.og_title,
      og_description: props.seo.og_description,
      og_image: props.seo.og_image,
      canonical_url: props.seo.canonical_url,
      robots: props.seo.robots,
      schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : ""
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
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-3xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><form class="space-y-6"${_scopeId}><div class="card bg-base-100"${_scopeId}><div class="card-body"${_scopeId}><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Temel SEO</h3><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Sayfa Başlığı</span></label><input type="text"${ssrRenderAttr("value", unref(form).title)} class="input-bordered input" required${_scopeId}></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Meta Açıklama</span></label><textarea class="textarea-bordered textarea h-24" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Anahtar Kelimeler</span></label><input type="text"${ssrRenderAttr("value", unref(form).keywords)} class="input-bordered input" placeholder="Virgülle ayırarak yazın"${_scopeId}></div></div><div class="divider"${_scopeId}></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Sosyal Medya</h3><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Paylaşım Başlığı</span></label><input type="text"${ssrRenderAttr("value", unref(form).og_title)} class="input-bordered input"${_scopeId}></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Paylaşım Açıklaması</span></label><textarea class="textarea-bordered textarea h-24"${_scopeId}>${ssrInterpolate(unref(form).og_description)}</textarea></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Paylaşım Görseli</span></label><input type="text"${ssrRenderAttr("value", unref(form).og_image)} class="input-bordered input"${_scopeId}></div></div><div class="divider"${_scopeId}></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Gelişmiş</h3><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Canonical URL</span></label><input type="text"${ssrRenderAttr("value", unref(form).canonical_url)} class="input-bordered input"${_scopeId}></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Robots</span></label><select class="select-bordered select"${_scopeId}><option value="index, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, follow") : ssrLooseEqual(unref(form).robots, "index, follow")) ? " selected" : ""}${_scopeId}>index, follow</option><option value="noindex, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, follow") : ssrLooseEqual(unref(form).robots, "noindex, follow")) ? " selected" : ""}${_scopeId}>noindex, follow</option><option value="index, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, nofollow") : ssrLooseEqual(unref(form).robots, "index, nofollow")) ? " selected" : ""}${_scopeId}>index, nofollow</option><option value="noindex, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, nofollow") : ssrLooseEqual(unref(form).robots, "noindex, nofollow")) ? " selected" : ""}${_scopeId}>noindex, nofollow</option></select></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Schema.org JSON</span></label><textarea class="textarea-bordered textarea h-32 font-mono" placeholder="{&quot;@context&quot;: &quot;https://schema.org&quot;, ...}"${_scopeId}>${ssrInterpolate(unref(form).schema_org)}</textarea></div></div><div class="card-actions mt-6 justify-end"${_scopeId}><button type="submit" class="btn btn-primary"${_scopeId}>Kaydet</button></div></div></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-3xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "card bg-base-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("h3", { class: "text-lg font-medium" }, "Temel SEO"),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Sayfa Başlığı")
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                  class: "input-bordered input",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).title]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Meta Açıklama")
                                ]),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  class: "textarea-bordered textarea h-24",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).description]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Anahtar Kelimeler")
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                                  class: "input-bordered input",
                                  placeholder: "Virgülle ayırarak yazın"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).keywords]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "divider" }),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("h3", { class: "text-lg font-medium" }, "Sosyal Medya"),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Paylaşım Başlığı")
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).og_title = $event,
                                  class: "input-bordered input"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).og_title]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Paylaşım Açıklaması")
                                ]),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => unref(form).og_description = $event,
                                  class: "textarea-bordered textarea h-24"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).og_description]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Paylaşım Görseli")
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                                  class: "input-bordered input"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).og_image]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "divider" }),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("h3", { class: "text-lg font-medium" }, "Gelişmiş"),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Canonical URL")
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event,
                                  class: "input-bordered input"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).canonical_url]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Robots")
                                ]),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).robots = $event,
                                  class: "select-bordered select"
                                }, [
                                  createVNode("option", { value: "index, follow" }, "index, follow"),
                                  createVNode("option", { value: "noindex, follow" }, "noindex, follow"),
                                  createVNode("option", { value: "index, nofollow" }, "index, nofollow"),
                                  createVNode("option", { value: "noindex, nofollow" }, "noindex, nofollow")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).robots]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Schema.org JSON")
                                ]),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => unref(form).schema_org = $event,
                                  class: "textarea-bordered textarea h-32 font-mono",
                                  placeholder: '{"@context": "https://schema.org", ...}'
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).schema_org]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "card-actions mt-6 justify-end" }, [
                              createVNode("button", {
                                type: "submit",
                                class: "btn btn-primary"
                              }, "Kaydet")
                            ])
                          ])
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
