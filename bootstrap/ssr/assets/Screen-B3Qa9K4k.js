import { onMounted, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
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
            _push2(`<div class="rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><form class="space-y-6"${_scopeId}><div class="relative"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><span class="w-full border-t border-border"${_scopeId}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId}><span class="bg-background px-2 font-semibold text-foreground"${_scopeId}>Temel Bilgiler</span></div></div><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Version </label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
            if (errors.value.version) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.version)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Yayınlanma Tarihi </label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
            if (errors.value.release_date) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.release_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Açıklama </label><textarea class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="relative"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><span class="w-full border-t border-border"${_scopeId}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId}><span class="bg-background px-2 font-semibold text-foreground"${_scopeId}>Yeni Özellikler</span></div></div><div class="rounded-lg border border-border bg-card shadow-sm transition-all duration-200"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>Yeni Özellikler</h3><button type="button" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Ekle </button></div>`);
            if (unref(form).features.length === 0) {
              _push2(`<div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="text-foreground"${_scopeId}>Henüz eklenen özellik yok. &quot;Ekle&quot; butonuna tıklayarak yeni özellik ekleyebilirsiniz.</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).features, (feature, index) => {
              _push2(`<div class="mb-4 rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="space-y-3"${_scopeId}><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Özellik Adı </label><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}></div><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Açıklama </label><textarea placeholder="Açıklaması" class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</textarea></div></div><div class="mt-3"${_scopeId}><button type="button" class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.features) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.features)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="relative"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><span class="w-full border-t border-border"${_scopeId}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId}><span class="bg-background px-2 font-semibold text-foreground"${_scopeId}>Düzeltilen Hatalar</span></div></div><div class="rounded-lg border border-border bg-card shadow-sm transition-all duration-200"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>Bugs</h3><button type="button" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Ekle </button></div>`);
            if (unref(form).bugs.length === 0) {
              _push2(`<div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="text-foreground"${_scopeId}>Henüz eklenen hata yok. &quot;Ekle&quot; butonuna tıklayarak yeni hata ekleyebilirsiniz.</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).bugs, (bug, index) => {
              _push2(`<div class="mb-4 rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="space-y-3"${_scopeId}><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Hata Adı </label><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}></div><div class="w-full space-y-2"${_scopeId}><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId}> Çözüm Açıklaması </label><textarea placeholder="Bug Çözüm Açıklaması" class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</textarea></div></div><div class="mt-3"${_scopeId}><button type="button" class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (errors.value.bugs) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.bugs)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="relative"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><span class="w-full border-t border-border"${_scopeId}></span></div></div><div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/versions/${unref(props).version.id}`,
              class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` İptal `);
                } else {
                  return [
                    createTextVNode(" İptal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Kaydet </button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-lg border border-border bg-card p-6 shadow-sm" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t border-border" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                      createVNode("span", { class: "bg-background px-2 font-semibold text-foreground" }, "Temel Bilgiler")
                    ])
                  ]),
                  createVNode("div", { class: "w-full space-y-2" }, [
                    createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Version "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).version = $event,
                      type: "text",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).version]
                    ]),
                    errors.value.version ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(errors.value.version), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "w-full space-y-2" }, [
                    createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Yayınlanma Tarihi "),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).release_date = $event,
                      type: "date",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).release_date]
                    ]),
                    errors.value.release_date ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(errors.value.release_date), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "w-full space-y-2" }, [
                    createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Açıklama "),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      class: "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    errors.value.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(errors.value.description), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t border-border" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                      createVNode("span", { class: "bg-background px-2 font-semibold text-foreground" }, "Yeni Özellikler")
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm transition-all duration-200" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "Yeni Özellikler"),
                        createVNode("button", {
                          type: "button",
                          onClick: addFeature,
                          class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
                        class: "rounded-lg border border-border bg-muted p-4"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            class: "h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("span", { class: "text-foreground" }, 'Henüz eklenen özellik yok. "Ekle" butonuna tıklayarak yeni özellik ekleyebilirsiniz.')
                        ])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feature, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "mb-4 rounded-lg border border-border bg-muted p-4"
                        }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "w-full space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Özellik Adı "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => feature.feature_name = $event,
                                placeholder: "Yeni Özellik ismi",
                                class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, feature.feature_name]
                              ])
                            ]),
                            createVNode("div", { class: "w-full space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Açıklama "),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => feature.feature_detail = $event,
                                placeholder: "Açıklaması",
                                class: "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, feature.feature_detail]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeFeature(index),
                              class: "inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
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
                      errors.value.features ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-destructive"
                      }, toDisplayString(errors.value.features), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t border-border" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                      createVNode("span", { class: "bg-background px-2 font-semibold text-foreground" }, "Düzeltilen Hatalar")
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm transition-all duration-200" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "Bugs"),
                        createVNode("button", {
                          type: "button",
                          onClick: addBug,
                          class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
                        class: "rounded-lg border border-border bg-muted p-4"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            class: "h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("span", { class: "text-foreground" }, 'Henüz eklenen hata yok. "Ekle" butonuna tıklayarak yeni hata ekleyebilirsiniz.')
                        ])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).bugs, (bug, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "mb-4 rounded-lg border border-border bg-muted p-4"
                        }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "w-full space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Hata Adı "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => bug.bug_name = $event,
                                placeholder: "Yeni Bug İsmi",
                                class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, bug.bug_name]
                              ])
                            ]),
                            createVNode("div", { class: "w-full space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, " Çözüm Açıklaması "),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => bug.bug_detail = $event,
                                placeholder: "Bug Çözüm Açıklaması",
                                class: "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, bug.bug_detail]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeBug(index),
                              class: "inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
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
                      errors.value.bugs ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-destructive"
                      }, toDisplayString(errors.value.bugs), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t border-border" })
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(unref(Link), {
                      href: `/versions/${unref(props).version.id}`,
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
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
