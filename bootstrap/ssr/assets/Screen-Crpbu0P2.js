import { computed, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
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
    const service = computed(() => props.service || {});
    const nameRef = ref(null);
    const descriptionRef = ref(null);
    const priceRef = ref(null);
    const parentIdRef = ref(null);
    const errors = ref({
      name: "",
      description: "",
      price: "",
      parent_id: ""
    });
    const form = useForm({
      id: service.value.id,
      name: service.value.name || "",
      description: service.value.description || "",
      price: service.value.price || "",
      parent_id: service.value.parent_id || null,
      subCategories: service.value.subCategories || []
    });
    form.processing = false;
    const parentOptions = computed(() => {
      return (props.services || []).filter((s) => s.id !== form.id);
    });
    const addSubCategory = () => {
      form.subCategories.push({ name: "", price: "" });
    };
    const removeSubCategory = (index) => {
      form.subCategories.splice(index, 1);
    };
    const handleSubmit = () => {
      form.put(`/services/${form.id}`, {
        onError: (serverErrors) => {
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              if (errors.value.hasOwnProperty(key)) {
                errors.value[key] = serverErrors[key];
              }
            });
          }
        }
      });
    };
    const deleteService = () => {
      if (confirm("Bu servisi silmek istediğinize emin misiniz?")) {
        form.delete(`/services/${form.id}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              url: `/services/${unref(form).id}`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Servisi Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="space-y-4"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Servis Bilgileri</h3><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Servis Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Servis adı" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.name || unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.name || unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Servis Açıklaması</label><textarea rows="4" placeholder="Servis açıklaması" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }, "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description || unref(form).errors.description) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.description || unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Fiyat</label><div class="flex"${_scopeId}><input${ssrRenderAttr("value", unref(form).price)} type="number" placeholder="Fiyat" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }, "flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><span class="inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground"${_scopeId}> USD </span></div>`);
            if (errors.value.price || unref(form).errors.price) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.price || unref(form).errors.price)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Üst Kategori</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, null) : ssrLooseEqual(unref(form).parent_id, null)) ? " selected" : ""}${_scopeId}>Yok</option><!--[-->`);
            ssrRenderList(parentOptions.value, (parent) => {
              _push2(`<option${ssrRenderAttr("value", parent.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, parent.id) : ssrLooseEqual(unref(form).parent_id, parent.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(parent.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.parent_id || unref(form).errors.parent_id) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.parent_id || unref(form).errors.parent_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="space-y-4 border-t border-border pt-6"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Alt Kategoriler</h3>`);
            if (unref(form).subCategories.length === 0) {
              _push2(`<div class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz alt kategori bulunmamaktadır. &quot;Alt Kategori Ekle&quot; butonuyla ekleyebilirsiniz.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).subCategories, (subCategory, index) => {
              _push2(`<div class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4 shadow-sm"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Alt Kategori Adı</label><input${ssrRenderAttr("value", subCategory.name)} type="text" placeholder="Alt kategori adı" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Fiyat</label><div class="flex"${_scopeId}><input${ssrRenderAttr("value", subCategory.price)} type="number" placeholder="Fiyat" class="flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}><span class="inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground"${_scopeId}> USD </span></div></div><div class="flex justify-end"${_scopeId}><button type="button" class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Kaldır </button></div></div></div>`);
            });
            _push2(`<!--]--><button type="button" class="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Alt Kategori Ekle </button></div><div class="flex items-center justify-between border-t border-border pt-4"${_scopeId}><button type="button" class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Servisi Sil </button><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/services/${unref(form).id}`,
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            _push2(`<button type="submit" class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                url: `/services/${unref(form).id}`
              }, null, 8, ["url"]),
              createVNode(_sfc_main$3, { title: "Servisi Düzenle" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Servis Bilgileri"),
                      createVNode("div", {
                        ref_key: "nameRef",
                        ref: nameRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Servis Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Servis adı",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        errors.value.name || unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.name || unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "descriptionRef",
                        ref: descriptionRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Servis Açıklaması"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "4",
                          placeholder: "Servis açıklaması",
                          class: ["flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        errors.value.description || unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.description || unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "priceRef",
                        ref: priceRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Fiyat"),
                        createVNode("div", { class: "flex" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).price = $event,
                            type: "number",
                            placeholder: "Fiyat",
                            class: ["flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).price]
                          ]),
                          createVNode("span", { class: "inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground" }, " USD ")
                        ]),
                        errors.value.price || unref(form).errors.price ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.price || unref(form).errors.price), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "parentIdRef",
                        ref: parentIdRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Üst Kategori"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }]
                        }, [
                          createVNode("option", { value: null }, "Yok"),
                          (openBlock(true), createBlock(Fragment, null, renderList(parentOptions.value, (parent) => {
                            return openBlock(), createBlock("option", {
                              key: parent.id,
                              value: parent.id
                            }, toDisplayString(parent.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).parent_id]
                        ]),
                        errors.value.parent_id || unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.parent_id || unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                      ], 512)
                    ]),
                    createVNode("div", { class: "space-y-4 border-t border-border pt-6" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Alt Kategoriler"),
                      unref(form).subCategories.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, 'Henüz alt kategori bulunmamaktadır. "Alt Kategori Ekle" butonuyla ekleyebilirsiniz.')
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).subCategories, (subCategory, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "rounded-md border-l-4 border-l-primary border border-border bg-card p-4 shadow-sm"
                        }, [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Alt Kategori Adı"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => subCategory.name = $event,
                                type: "text",
                                placeholder: "Alt kategori adı",
                                class: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, subCategory.name]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Fiyat"),
                              createVNode("div", { class: "flex" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => subCategory.price = $event,
                                  type: "number",
                                  placeholder: "Fiyat",
                                  class: "flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, subCategory.price]
                                ]),
                                createVNode("span", { class: "inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground" }, " USD ")
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end" }, [
                              createVNode("button", {
                                onClick: withModifiers(($event) => removeSubCategory(index), ["prevent"]),
                                type: "button",
                                class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ])),
                                createTextVNode(" Kaldır ")
                              ], 8, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 128)),
                      createVNode("button", {
                        onClick: withModifiers(addSubCategory, ["prevent"]),
                        type: "button",
                        class: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4.5v15m7.5-7.5h-15"
                          })
                        ])),
                        createTextVNode(" Alt Kategori Ekle ")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between border-t border-border pt-4" }, [
                      createVNode("button", {
                        onClick: withModifiers(deleteService, ["prevent"]),
                        type: "button",
                        class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          })
                        ])),
                        createTextVNode(" Servisi Sil ")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Link), {
                          href: `/services/${unref(form).id}`,
                          class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" İptal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          class: "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                          disabled: unref(form).processing
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "h-4 w-4 animate-spin",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }),
                            createVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M5 13l4 4L19 7"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 1)
                        ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
