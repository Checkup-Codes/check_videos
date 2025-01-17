import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BMk2_E2_.js";
import { _ as _sfc_main$2 } from "./TopScreen-iJi3lh6W.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const form = useForm({
      version: props.version.version,
      release_date: props.version.release_date,
      description: props.version.description,
      features: props.version.features || [{ feature_name: "", feature_detail: "" }],
      bugs: props.version.bugs || [{ bug_name: "", bug_detail: "" }]
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
            form.reset();
          }
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Versionu Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="h-[calc(84vh)] w-full max-w-full overflow-y-auto overflow-x-hidden break-words rounded-lg bg-white lg:p-5"
${_scopeId}><div class="container mx-auto"${_scopeId}><form class="space-y-5 p-5"${_scopeId}><div class="space-y-2"${_scopeId}><label for="version" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Version </label><input${ssrRenderAttr("value", unref(form).version)} type="text" id="version" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
            if (errors.value.version) {
              _push2(`<p class="text-sm font-medium text-red-500"${_scopeId}>${ssrInterpolate(errors.value.version)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label for="release_date" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Yayınlanma Tarihi </label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" id="release_date" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
            if (errors.value.release_date) {
              _push2(`<p class="text-sm font-medium text-red-500"${_scopeId}>${ssrInterpolate(errors.value.release_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label for="description" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Açıklama </label><textarea id="description" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description) {
              _push2(`<p class="text-sm font-medium text-red-500"${_scopeId}>${ssrInterpolate(errors.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Yeni Özellikler</h3><button type="button" class="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"${_scopeId}> Yeni Özellik Ekle </button></div><!--[-->`);
            ssrRenderList(unref(form).features, (feature, index) => {
              _push2(`<div class="border-border space-y-4 rounded-lg border p-4"${_scopeId}><div class="space-y-2"${_scopeId}><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"${_scopeId}><textarea placeholder="Açıklaması" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</textarea></div><button type="button" class="text-destructive hover:text-destructive/80 text-sm font-medium"${_scopeId}> Kaldır </button></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.features) {
              _push2(`<p class="text-sm font-medium text-red-500"${_scopeId}>${ssrInterpolate(errors.value.features)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Bugs</h3><button type="button" class="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"${_scopeId}> Yeni Bug ekle </button></div><!--[-->`);
            ssrRenderList(unref(form).bugs, (bug, index) => {
              _push2(`<div class="border-border space-y-4 rounded-lg border p-4"${_scopeId}><div class="space-y-2"${_scopeId}><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"${_scopeId}><textarea placeholder="Bug Çözüm Açıklaması" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</textarea></div><button type="button" class="text-destructive hover:text-destructive/80 text-sm font-medium"${_scopeId}> Kaldır </button></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.bugs) {
              _push2(`<p class="text-sm font-medium text-red-500"${_scopeId}>${ssrInterpolate(errors.value.bugs)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit" class="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${_scopeId}> Kaydet </button></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Versionu Düzenle" }),
              createVNode("div", { class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5" }, [
                createVNode("div", { class: "container mx-auto" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-5 p-5"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", {
                        for: "version",
                        class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      }, " Version "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).version = $event,
                        type: "text",
                        id: "version",
                        class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).version]
                      ]),
                      errors.value.version ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm font-medium text-red-500"
                      }, toDisplayString(errors.value.version), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", {
                        for: "release_date",
                        class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      }, " Yayınlanma Tarihi "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).release_date = $event,
                        type: "date",
                        id: "release_date",
                        class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).release_date]
                      ]),
                      errors.value.release_date ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm font-medium text-red-500"
                      }, toDisplayString(errors.value.release_date), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", {
                        for: "description",
                        class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      }, " Açıklama "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        id: "description",
                        class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      errors.value.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm font-medium text-red-500"
                      }, toDisplayString(errors.value.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                        createVNode("button", {
                          type: "button",
                          onClick: addFeature,
                          class: "text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                        }, " Yeni Özellik Ekle ")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "border-border space-y-4 rounded-lg border p-4"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                              placeholder: "Yeni Özellik ismi",
                              class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, feature.feature_name]
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                              placeholder: "Açıklaması",
                              class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, feature.feature_detail]
                            ])
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => removeFeature(index),
                            class: "text-destructive hover:text-destructive/80 text-sm font-medium"
                          }, " Kaldır ", 8, ["onClick"])
                        ]);
                      }), 128)),
                      errors.value.features ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm font-medium text-red-500"
                      }, toDisplayString(errors.value.features), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                        createVNode("button", {
                          type: "button",
                          onClick: addBug,
                          class: "text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                        }, " Yeni Bug ekle ")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "border-border space-y-4 rounded-lg border p-4"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                              placeholder: "Yeni Bug İsmi",
                              class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, bug.bug_name]
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                              placeholder: "Bug Çözüm Açıklaması",
                              class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, bug.bug_detail]
                            ])
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => removeBug(index),
                            class: "text-destructive hover:text-destructive/80 text-sm font-medium"
                          }, " Kaldır ", 8, ["onClick"])
                        ]);
                      }), 128)),
                      errors.value.bugs ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm font-medium text-red-500"
                      }, toDisplayString(errors.value.bugs), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      type: "submit",
                      class: "ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    }, " Kaydet ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
