import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      order: 0
    });
    const nameRef = ref(null);
    const submit = () => {
      form.post("/bookmark-categories", {
        onError: (errors) => {
          console.error("Create errors:", errors);
          if (nameRef.value && errors.name) {
            nameRef.value.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4 py-6"${_scopeId}><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}> Kategori Adı <span class="text-destructive"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).name)} placeholder="Örn: Reading, VS Code, App &amp; Tools" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex justify-end gap-2 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/bookmarks",
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              disabled: unref(form).processing
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
            _push2(`<button type="submit" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="mr-1 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4 py-6" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "nameRef",
                      ref: nameRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                          createTextVNode(" Kategori Adı "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Örn: Reading, VS Code, App & Tools",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ])
                    ], 512)
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                    createVNode(unref(Link), {
                      href: "/bookmarks",
                      class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("button", {
                      type: "submit",
                      class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
                      disabled: unref(form).processing
                    }, [
                      unref(form).processing ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "mr-1 h-4 w-4 animate-spin",
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
                        class: "mr-1 h-4 w-4",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/CreateCategory/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
