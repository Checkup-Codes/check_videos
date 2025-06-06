import { onMounted, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import "./TopScreen-DnNmtdW-.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const form = useForm({
      version: "",
      release_date: "",
      description: "",
      features: [],
      bugs: []
    });
    onMounted(() => {
      if (props.version) {
        form.version = props.version.version || "";
        form.release_date = props.version.release_date || "";
        form.description = props.version.description || "";
        form.features = props.version.features || [];
        form.bugs = props.version.bugs || [];
      }
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
        form.put(`/versions/${props.version.id}`, {
          onSuccess: () => {
          }
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-body p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="divider"${_scopeId}>Temel Bilgiler</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Version</span></label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="input-bordered input w-full"${_scopeId}>`);
            if (errors.value.version) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.version)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Yayınlanma Tarihi</span></label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" class="input-bordered input w-full"${_scopeId}>`);
            if (errors.value.release_date) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.release_date)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Açıklama</span></label><textarea class="textarea-bordered textarea min-h-[120px] w-full"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.description)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="divider"${_scopeId}>Yeni Özellikler</div><div class="card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Yeni Özellikler</h3><button type="button" class="btn btn-outline btn-sm"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Ekle </button></div>`);
            if (unref(form).features.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz eklenen özellik yok. &quot;Ekle&quot; butonuna tıklayarak yeni özellik ekleyebilirsiniz.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).features, (feature, index) => {
              _push2(`<div class="mb-4 rounded-lg border border-base-300 p-4"${_scopeId}><div class="space-y-3"${_scopeId}><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Özellik Adı</span></label><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="input-bordered input w-full"${_scopeId}></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Açıklama</span></label><textarea placeholder="Açıklaması" class="textarea-bordered textarea min-h-[100px] w-full"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</textarea></div></div><div class="mt-3"${_scopeId}><button type="button" class="btn btn-error btn-outline btn-sm"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.features) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.features)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider"${_scopeId}>Düzeltilen Hatalar</div><div class="card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Bugs</h3><button type="button" class="btn btn-outline btn-sm"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Ekle </button></div>`);
            if (unref(form).bugs.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz eklenen hata yok. &quot;Ekle&quot; butonuna tıklayarak yeni hata ekleyebilirsiniz.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).bugs, (bug, index) => {
              _push2(`<div class="mb-4 rounded-lg border border-base-300 p-4"${_scopeId}><div class="space-y-3"${_scopeId}><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Hata Adı</span></label><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="input-bordered input w-full"${_scopeId}></div><div class="form-control"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Çözüm Açıklaması</span></label><textarea placeholder="Bug Çözüm Açıklaması" class="textarea-bordered textarea min-h-[100px] w-full"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</textarea></div></div><div class="mt-3"${_scopeId}><button type="button" class="btn btn-error btn-outline btn-sm"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.bugs) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.bugs)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider"${_scopeId}></div><div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/versions/${unref(props).version.id}`,
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
            _push2(`<button type="submit" class="btn btn-primary"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Kaydet </button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "card-body p-6" }, [
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
                      class: "input-bordered input w-full"
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
                      class: "input-bordered input w-full"
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
                      class: "textarea-bordered textarea min-h-[120px] w-full"
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
                  createVNode("div", { class: "card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                    createVNode("div", { class: "card-body p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                        createVNode("button", {
                          type: "button",
                          onClick: addFeature,
                          class: "btn btn-outline btn-sm"
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
                          class: "mb-4 rounded-lg border border-base-300 p-4"
                        }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "form-control" }, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Özellik Adı")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                                placeholder: "Yeni Özellik ismi",
                                class: "input-bordered input w-full"
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
                                class: "textarea-bordered textarea min-h-[100px] w-full"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, feature.feature_detail]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeFeature(index),
                              class: "btn btn-error btn-outline btn-sm"
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
                    ])
                  ]),
                  createVNode("div", { class: "divider" }, "Düzeltilen Hatalar"),
                  createVNode("div", { class: "card border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                    createVNode("div", { class: "card-body p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                        createVNode("button", {
                          type: "button",
                          onClick: addBug,
                          class: "btn btn-outline btn-sm"
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
                          class: "mb-4 rounded-lg border border-base-300 p-4"
                        }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "form-control" }, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Hata Adı")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                                placeholder: "Yeni Bug İsmi",
                                class: "input-bordered input w-full"
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
                                class: "textarea-bordered textarea min-h-[100px] w-full"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, bug.bug_detail]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeBug(index),
                              class: "btn btn-error btn-outline btn-sm"
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
                    ])
                  ]),
                  createVNode("div", { class: "divider" }),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(unref(Link), {
                      href: `/versions/${unref(props).version.id}`,
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
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
