import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
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
    const firstNameRef = ref(null);
    const lastNameRef = ref(null);
    const emailRef = ref(null);
    const phoneRef = ref(null);
    const addressRef = ref(null);
    const cityRef = ref(null);
    const stateRef = ref(null);
    const postalCodeRef = ref(null);
    const countryRef = ref(null);
    const errors = ref({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: ""
    });
    const form = useForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: ""
    });
    form.processing = false;
    const handleSubmit = () => {
      form.post("/customers", {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/customers" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Yeni Müşteri Oluştur" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>İlk İsmi</label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" placeholder="İlk ismi girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.first_name || unref(form).errors.first_name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.first_name || unref(form).errors.first_name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.first_name || unref(form).errors.first_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Soy Adı</label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" placeholder="Soy adı girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.last_name || unref(form).errors.last_name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.last_name || unref(form).errors.last_name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.last_name || unref(form).errors.last_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>E-posta</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="E-posta adresi girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.email || unref(form).errors.email }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.email || unref(form).errors.email) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.email || unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Telefon</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" placeholder="Telefon numarası girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.phone || unref(form).errors.phone }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.phone || unref(form).errors.phone) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.phone || unref(form).errors.phone)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="md:col-span-2"${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Adres</label><input${ssrRenderAttr("value", unref(form).address)} type="text" placeholder="Adres girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.address || unref(form).errors.address }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.address || unref(form).errors.address) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.address || unref(form).errors.address)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Şehir</label><input${ssrRenderAttr("value", unref(form).city)} type="text" placeholder="Şehir girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.city || unref(form).errors.city }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.city || unref(form).errors.city) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.city || unref(form).errors.city)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Bölge</label><input${ssrRenderAttr("value", unref(form).state)} type="text" placeholder="Bölge girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.state || unref(form).errors.state }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.state || unref(form).errors.state) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.state || unref(form).errors.state)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Posta Kodu</label><input${ssrRenderAttr("value", unref(form).postal_code)} type="text" placeholder="Posta kodu girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.postal_code || unref(form).errors.postal_code }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.postal_code || unref(form).errors.postal_code) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.postal_code || unref(form).errors.postal_code)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Ülke</label><input${ssrRenderAttr("value", unref(form).country)} type="text" placeholder="Ülke girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.country || unref(form).errors.country }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (errors.value.country || unref(form).errors.country) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.country || unref(form).errors.country)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex justify-end gap-2 border-t border-border pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/customers",
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
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Müşteriyi Kaydet")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/customers" }),
              createVNode(_sfc_main$3, { title: "Yeni Müşteri Oluştur" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                      createVNode("div", {
                        ref_key: "firstNameRef",
                        ref: firstNameRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "İlk İsmi"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                          type: "text",
                          placeholder: "İlk ismi girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.first_name || unref(form).errors.first_name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).first_name]
                        ]),
                        errors.value.first_name || unref(form).errors.first_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.first_name || unref(form).errors.first_name), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "lastNameRef",
                        ref: lastNameRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Soy Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                          type: "text",
                          placeholder: "Soy adı girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.last_name || unref(form).errors.last_name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).last_name]
                        ]),
                        errors.value.last_name || unref(form).errors.last_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.last_name || unref(form).errors.last_name), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "emailRef",
                        ref: emailRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "E-posta"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "E-posta adresi girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.email || unref(form).errors.email }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).email]
                        ]),
                        errors.value.email || unref(form).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.email || unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "phoneRef",
                        ref: phoneRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Telefon"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "text",
                          placeholder: "Telefon numarası girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.phone || unref(form).errors.phone }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).phone]
                        ]),
                        errors.value.phone || unref(form).errors.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.phone || unref(form).errors.phone), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        class: "md:col-span-2",
                        ref_key: "addressRef",
                        ref: addressRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Adres"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          type: "text",
                          placeholder: "Adres girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.address || unref(form).errors.address }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).address]
                        ]),
                        errors.value.address || unref(form).errors.address ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.address || unref(form).errors.address), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "cityRef",
                        ref: cityRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Şehir"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).city = $event,
                          type: "text",
                          placeholder: "Şehir girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.city || unref(form).errors.city }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).city]
                        ]),
                        errors.value.city || unref(form).errors.city ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.city || unref(form).errors.city), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "stateRef",
                        ref: stateRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Bölge"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).state = $event,
                          type: "text",
                          placeholder: "Bölge girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.state || unref(form).errors.state }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).state]
                        ]),
                        errors.value.state || unref(form).errors.state ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.state || unref(form).errors.state), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "postalCodeRef",
                        ref: postalCodeRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Posta Kodu"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                          type: "text",
                          placeholder: "Posta kodu girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.postal_code || unref(form).errors.postal_code }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).postal_code]
                        ]),
                        errors.value.postal_code || unref(form).errors.postal_code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.postal_code || unref(form).errors.postal_code), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "countryRef",
                        ref: countryRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Ülke"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).country = $event,
                          type: "text",
                          placeholder: "Ülke girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.country || unref(form).errors.country }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).country]
                        ]),
                        errors.value.country || unref(form).errors.country ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.country || unref(form).errors.country), 1)) : createCommentVNode("", true)
                      ], 512)
                    ]),
                    createVNode("div", { class: "flex justify-end gap-2 border-t border-border pt-4" }, [
                      createVNode(unref(Link), {
                        href: "/customers",
                        class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }),
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
                        ])) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Müşteriyi Kaydet"), 1)
                      ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
