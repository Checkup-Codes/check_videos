import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CScreen-Cx3_QK48.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      version: "",
      release_date: "",
      description: "",
      features: [{ feature_name: "", feature_detail: "" }],
      bugs: [{ bug_name: "", bug_detail: "" }]
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
      errors.value.features = form.features.length > 0 ? "" : "En az bir özellik eklenmelidir.";
      errors.value.bugs = form.bugs.length > 0 ? "" : "En az bir bug eklenmelidir.";
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
      validateForm();
      if (!Object.values(errors.value).some((error) => error !== "")) {
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
            _push2(`<h1 class="mb-4 text-2xl font-bold"${_scopeId}>Yeni Version oluştur</h1><form class="space-y-6"${_scopeId}><div class="space-y-2"${_scopeId}><label for="version" class="block text-sm font-medium text-gray-700"${_scopeId}>Version</label><input${ssrRenderAttr("value", unref(form).version)} type="text" id="version" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}>`);
            if (errors.value.version) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.version)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label for="release_date" class="block text-sm font-medium text-gray-700"${_scopeId}>Yayınlanma Tarihi</label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" id="release_date" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}>`);
            if (errors.value.release_date) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.release_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700"${_scopeId}>Açıklama</label><textarea id="description" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Yeni Özellikler</h3><!--[-->`);
            ssrRenderList(unref(form).features, (feature, index) => {
              _push2(`<div class="space-y-2"${_scopeId}><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}><input${ssrRenderAttr("value", feature.feature_detail)} placeholder="Açıklaması" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}><button type="button" class="text-red-600 hover:underline"${_scopeId}>Kaldır</button></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.features) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.features)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="text-blue-600 hover:underline"${_scopeId}>Yeni Özellik Ekle</button></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Bugs</h3><!--[-->`);
            ssrRenderList(unref(form).bugs, (bug, index) => {
              _push2(`<div class="space-y-2"${_scopeId}><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}><input${ssrRenderAttr("value", bug.bug_detail)} placeholder="Bug Çözüm Açıklaması" class="w-full rounded-md border-gray-300 shadow-sm"${_scopeId}><button type="button" class="text-red-600 hover:underline"${_scopeId}>Kaldır</button></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.bugs) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.bugs)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="text-blue-600 hover:underline"${_scopeId}>Yeni Bug ekle</button></div><button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white"${_scopeId}>Submit</button></form>`);
          } else {
            return [
              createVNode("h1", { class: "mb-4 text-2xl font-bold" }, "Yeni Version oluştur"),
              createVNode("form", {
                onSubmit: withModifiers(submitForm, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("label", {
                    for: "version",
                    class: "block text-sm font-medium text-gray-700"
                  }, "Version"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).version = $event,
                    type: "text",
                    id: "version",
                    class: "w-full rounded-md border-gray-300 shadow-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).version]
                  ]),
                  errors.value.version ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, toDisplayString(errors.value.version), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("label", {
                    for: "release_date",
                    class: "block text-sm font-medium text-gray-700"
                  }, "Yayınlanma Tarihi"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).release_date = $event,
                    type: "date",
                    id: "release_date",
                    class: "w-full rounded-md border-gray-300 shadow-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).release_date]
                  ]),
                  errors.value.release_date ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, toDisplayString(errors.value.release_date), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("label", {
                    for: "description",
                    class: "block text-sm font-medium text-gray-700"
                  }, "Açıklama"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    id: "description",
                    class: "w-full rounded-md border-gray-300 shadow-sm"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).description]
                  ]),
                  errors.value.description ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, toDisplayString(errors.value.description), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold" }, "Yeni Özellikler"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "space-y-2"
                    }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                        placeholder: "Yeni Özellik ismi",
                        class: "w-full rounded-md border-gray-300 shadow-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, feature.feature_name]
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                        placeholder: "Açıklaması",
                        class: "w-full rounded-md border-gray-300 shadow-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, feature.feature_detail]
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => removeFeature(index),
                        class: "text-red-600 hover:underline"
                      }, "Kaldır", 8, ["onClick"])
                    ]);
                  }), 128)),
                  errors.value.features ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, toDisplayString(errors.value.features), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    type: "button",
                    onClick: addFeature,
                    class: "text-blue-600 hover:underline"
                  }, "Yeni Özellik Ekle")
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold" }, "Bugs"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "space-y-2"
                    }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                        placeholder: "Yeni Bug İsmi",
                        class: "w-full rounded-md border-gray-300 shadow-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, bug.bug_name]
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                        placeholder: "Bug Çözüm Açıklaması",
                        class: "w-full rounded-md border-gray-300 shadow-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, bug.bug_detail]
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => removeBug(index),
                        class: "text-red-600 hover:underline"
                      }, "Kaldır", 8, ["onClick"])
                    ]);
                  }), 128)),
                  errors.value.bugs ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-sm text-red-500"
                  }, toDisplayString(errors.value.bugs), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    type: "button",
                    onClick: addBug,
                    class: "text-blue-600 hover:underline"
                  }, "Yeni Bug ekle")
                ]),
                createVNode("button", {
                  type: "submit",
                  class: "rounded-md bg-blue-600 px-4 py-2 text-white"
                }, "Submit")
              ], 32)
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
