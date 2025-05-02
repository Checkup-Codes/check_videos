import { ref, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, openBlock, Fragment, renderList, withDirectives, vModelText, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$3 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      version: "",
      release_date: "",
      description: "",
      features: [],
      bugs: []
    });
    const errors = ref({
      version: "",
      release_date: "",
      description: "",
      features: "",
      bugs: ""
    });
    function validateForm() {
      errors.value.version = form.version ? "" : "Version alanı zorunludur.";
      errors.value.release_date = form.release_date ? "" : "Yayınlanma tarihi zorunludur.";
      errors.value.description = form.description ? "" : "Açıklama alanı zorunludur.";
      if (form.features.some((f) => !f.feature_name || !f.feature_detail)) {
        errors.value.features = "Tüm özellik alanları doldurulmalıdır.";
      } else {
        errors.value.features = "";
      }
      if (form.bugs.some((b) => !b.bug_name || !b.bug_detail)) {
        errors.value.bugs = "Tüm bug alanları doldurulmalıdır.";
      } else {
        errors.value.bugs = "";
      }
      return !Object.values(errors.value).some((error) => error !== "");
    }
    function addFeature() {
      form.features.push({ feature_name: "", feature_detail: "" });
    }
    function removeFeature(index) {
      form.features.splice(index, 1);
    }
    function addBug() {
      form.bugs.push({ bug_name: "", bug_detail: "" });
    }
    function removeBug(index) {
      form.bugs.splice(index, 1);
    }
    function submitForm() {
      if (validateForm()) {
        form.post("/versions", {
          onSuccess: () => {
            form.reset();
          }
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/versions" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="divider"${_scopeId2}>Temel Bilgiler</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Version</span></label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="input input-bordered w-full"${_scopeId2}>`);
                  if (errors.value.version) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.version)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Yayınlanma Tarihi</span></label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" class="input input-bordered w-full"${_scopeId2}>`);
                  if (errors.value.release_date) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.release_date)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Açıklama</span></label><textarea class="textarea textarea-bordered min-h-[120px] w-full"${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea>`);
                  if (errors.value.description) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.description)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="divider"${_scopeId2}>Yeni Özellikler</div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-4 flex items-center justify-between"${_scopeId3}><h3 class="text-lg font-semibold"${_scopeId3}>Yeni Özellikler</h3><button type="button" class="btn btn-sm btn-outline"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId3}></path></svg> Ekle </button></div>`);
                        if (unref(form).features.length === 0) {
                          _push4(`<div class="alert alert-info"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId3}></path></svg><span${_scopeId3}>Henüz eklenen özellik yok. &quot;Ekle&quot; butonuna tıklayarak yeni özellik ekleyebilirsiniz.</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(form).features, (feature, index) => {
                          _push4(`<div class="border-base-300 mb-4 rounded-lg border p-4"${_scopeId3}><div class="space-y-3"${_scopeId3}><div class="form-control"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Özellik Adı</span></label><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="input input-bordered w-full"${_scopeId3}></div><div class="form-control"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Açıklama</span></label><textarea placeholder="Açıklaması" class="textarea textarea-bordered min-h-[100px] w-full"${_scopeId3}>${ssrInterpolate(feature.feature_detail)}</textarea></div></div><div class="mt-3"${_scopeId3}><button type="button" class="btn btn-sm btn-outline btn-error"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId3}></path></svg> Kaldır </button></div></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (errors.value.features) {
                          _push4(`<label class="label"${_scopeId3}><span class="label-text-alt text-error"${_scopeId3}>${ssrInterpolate(errors.value.features)}</span></label>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                            createVNode("button", {
                              type: "button",
                              onClick: addFeature,
                              class: "btn btn-sm btn-outline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor",
                                class: "mr-1 h-4 w-4"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M12 4.5v15m7.5-7.5h-15"
                                })
                              ])),
                              createTextVNode(" Ekle ")
                            ])
                          ]),
                          unref(form).features.length === 0 ? (openBlock(), createBlock("div", {
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
                            createVNode("span", null, 'Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.')
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border-base-300 mb-4 rounded-lg border p-4"
                            }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Özellik Adı")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                                    placeholder: "Yeni Özellik ismi",
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, feature.feature_name]
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Açıklama")
                                  ]),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                                    placeholder: "Açıklaması",
                                    class: "textarea textarea-bordered min-h-[100px] w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, feature.feature_detail]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeFeature(index),
                                  class: "btn btn-sm btn-outline btn-error"
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
                          errors.value.features ? (openBlock(), createBlock("label", {
                            key: 1,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.features), 1)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="divider"${_scopeId2}>Düzeltilen Hatalar</div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-4 flex items-center justify-between"${_scopeId3}><h3 class="text-lg font-semibold"${_scopeId3}>Bugs</h3><button type="button" class="btn btn-sm btn-outline"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId3}></path></svg> Ekle </button></div>`);
                        if (unref(form).bugs.length === 0) {
                          _push4(`<div class="alert alert-info"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId3}></path></svg><span${_scopeId3}>Henüz eklenen hata yok. &quot;Ekle&quot; butonuna tıklayarak yeni hata ekleyebilirsiniz.</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(form).bugs, (bug, index) => {
                          _push4(`<div class="border-base-300 mb-4 rounded-lg border p-4"${_scopeId3}><div class="space-y-3"${_scopeId3}><div class="form-control"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Hata Adı</span></label><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="input input-bordered w-full"${_scopeId3}></div><div class="form-control"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Çözüm Açıklaması</span></label><textarea placeholder="Bug Çözüm Açıklaması" class="textarea textarea-bordered min-h-[100px] w-full"${_scopeId3}>${ssrInterpolate(bug.bug_detail)}</textarea></div></div><div class="mt-3"${_scopeId3}><button type="button" class="btn btn-sm btn-outline btn-error"${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId3}></path></svg> Kaldır </button></div></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (errors.value.bugs) {
                          _push4(`<label class="label"${_scopeId3}><span class="label-text-alt text-error"${_scopeId3}>${ssrInterpolate(errors.value.bugs)}</span></label>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                            createVNode("button", {
                              type: "button",
                              onClick: addBug,
                              class: "btn btn-sm btn-outline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor",
                                class: "mr-1 h-4 w-4"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M12 4.5v15m7.5-7.5h-15"
                                })
                              ])),
                              createTextVNode(" Ekle ")
                            ])
                          ]),
                          unref(form).bugs.length === 0 ? (openBlock(), createBlock("div", {
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
                            createVNode("span", null, 'Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.')
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border-base-300 mb-4 rounded-lg border p-4"
                            }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Hata Adı")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                                    placeholder: "Yeni Bug İsmi",
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, bug.bug_name]
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Çözüm Açıklaması")
                                  ]),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                                    placeholder: "Bug Çözüm Açıklaması",
                                    class: "textarea textarea-bordered min-h-[100px] w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, bug.bug_detail]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeBug(index),
                                  class: "btn btn-sm btn-outline btn-error"
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
                          errors.value.bugs ? (openBlock(), createBlock("label", {
                            key: 1,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.bugs), 1)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="divider"${_scopeId2}></div><div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/versions",
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
                  _push3(`<button type="submit" class="btn btn-primary"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId2}></path></svg> Kaydet </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "divider" }, "Temel Bilgiler"),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Version")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).version = $event,
                          type: "text",
                          class: "input input-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).version]
                        ]),
                        errors.value.version ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.version), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Yayınlanma Tarihi")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).release_date = $event,
                          type: "date",
                          class: "input input-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).release_date]
                        ]),
                        errors.value.release_date ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.release_date), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Açıklama")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          class: "textarea textarea-bordered min-h-[120px] w-full"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        errors.value.description ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.description), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "divider" }, "Yeni Özellikler"),
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                            createVNode("button", {
                              type: "button",
                              onClick: addFeature,
                              class: "btn btn-sm btn-outline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor",
                                class: "mr-1 h-4 w-4"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M12 4.5v15m7.5-7.5h-15"
                                })
                              ])),
                              createTextVNode(" Ekle ")
                            ])
                          ]),
                          unref(form).features.length === 0 ? (openBlock(), createBlock("div", {
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
                            createVNode("span", null, 'Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.')
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border-base-300 mb-4 rounded-lg border p-4"
                            }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Özellik Adı")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                                    placeholder: "Yeni Özellik ismi",
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, feature.feature_name]
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Açıklama")
                                  ]),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                                    placeholder: "Açıklaması",
                                    class: "textarea textarea-bordered min-h-[100px] w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, feature.feature_detail]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeFeature(index),
                                  class: "btn btn-sm btn-outline btn-error"
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
                          errors.value.features ? (openBlock(), createBlock("label", {
                            key: 1,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.features), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "divider" }, "Düzeltilen Hatalar"),
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                            createVNode("button", {
                              type: "button",
                              onClick: addBug,
                              class: "btn btn-sm btn-outline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "1.5",
                                stroke: "currentColor",
                                class: "mr-1 h-4 w-4"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M12 4.5v15m7.5-7.5h-15"
                                })
                              ])),
                              createTextVNode(" Ekle ")
                            ])
                          ]),
                          unref(form).bugs.length === 0 ? (openBlock(), createBlock("div", {
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
                            createVNode("span", null, 'Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.')
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border-base-300 mb-4 rounded-lg border p-4"
                            }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Hata Adı")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                                    placeholder: "Yeni Bug İsmi",
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, bug.bug_name]
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Çözüm Açıklaması")
                                  ]),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                                    placeholder: "Bug Çözüm Açıklaması",
                                    class: "textarea textarea-bordered min-h-[100px] w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, bug.bug_detail]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeBug(index),
                                  class: "btn btn-sm btn-outline btn-error"
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
                          errors.value.bugs ? (openBlock(), createBlock("label", {
                            key: 1,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.bugs), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex justify-end gap-2" }, [
                        createVNode(unref(Link), {
                          href: "/versions",
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
                          createTextVNode(" Kaydet ")
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
              createVNode(_sfc_main$2, { url: "/versions" }),
              createVNode(_sfc_main$3, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "divider" }, "Temel Bilgiler"),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Version")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).version = $event,
                        type: "text",
                        class: "input input-bordered w-full"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).version]
                      ]),
                      errors.value.version ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.version), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Yayınlanma Tarihi")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).release_date = $event,
                        type: "date",
                        class: "input input-bordered w-full"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).release_date]
                      ]),
                      errors.value.release_date ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.release_date), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Açıklama")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        class: "textarea textarea-bordered min-h-[120px] w-full"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      errors.value.description ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.description), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "divider" }, "Yeni Özellikler"),
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                          createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                          createVNode("button", {
                            type: "button",
                            onClick: addFeature,
                            class: "btn btn-sm btn-outline"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "mr-1 h-4 w-4"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4.5v15m7.5-7.5h-15"
                              })
                            ])),
                            createTextVNode(" Ekle ")
                          ])
                        ]),
                        unref(form).features.length === 0 ? (openBlock(), createBlock("div", {
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
                          createVNode("span", null, 'Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.')
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "border-base-300 mb-4 rounded-lg border p-4"
                          }, [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Özellik Adı")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                                  placeholder: "Yeni Özellik ismi",
                                  class: "input input-bordered w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, feature.feature_name]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Açıklama")
                                ]),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                                  placeholder: "Açıklaması",
                                  class: "textarea textarea-bordered min-h-[100px] w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, feature.feature_detail]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeFeature(index),
                                class: "btn btn-sm btn-outline btn-error"
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
                        errors.value.features ? (openBlock(), createBlock("label", {
                          key: 1,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.features), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "divider" }, "Düzeltilen Hatalar"),
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                          createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                          createVNode("button", {
                            type: "button",
                            onClick: addBug,
                            class: "btn btn-sm btn-outline"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "mr-1 h-4 w-4"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 4.5v15m7.5-7.5h-15"
                              })
                            ])),
                            createTextVNode(" Ekle ")
                          ])
                        ]),
                        unref(form).bugs.length === 0 ? (openBlock(), createBlock("div", {
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
                          createVNode("span", null, 'Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.')
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "border-base-300 mb-4 rounded-lg border p-4"
                          }, [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Hata Adı")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                                  placeholder: "Yeni Bug İsmi",
                                  class: "input input-bordered w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, bug.bug_name]
                                ])
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Çözüm Açıklaması")
                                ]),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                                  placeholder: "Bug Çözüm Açıklaması",
                                  class: "textarea textarea-bordered min-h-[100px] w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, bug.bug_detail]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeBug(index),
                                class: "btn btn-sm btn-outline btn-error"
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
                        errors.value.bugs ? (openBlock(), createBlock("label", {
                          key: 1,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.bugs), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(unref(Link), {
                        href: "/versions",
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
                        createTextVNode(" Kaydet ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
