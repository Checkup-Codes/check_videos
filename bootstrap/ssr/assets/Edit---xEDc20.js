import { unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, createCommentVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
import { _ as _sfc_main$2 } from "./PageShell-DjZZ5koh.js";
import { _ as _sfc_main$3 } from "./PageHeader-FZ8QTap0.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    modules: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    currentDomain: {
      type: String,
      required: true
    },
    hiddenFeatures: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    const form = useForm({
      tests: props.settings.tests ?? false,
      words: props.settings.words ?? false,
      services: props.settings.services ?? false,
      projects: props.settings.projects ?? false,
      certificates: props.settings.certificates ?? false,
      bookmarks: props.settings.bookmarks ?? false,
      workspace: props.settings.workspace ?? false
    });
    const featureMap = {
      tests: "tests",
      words: "words",
      services: "services",
      projects: "projects",
      certificates: "certificates",
      bookmarks: "bookmarks",
      workspace: "workspaces"
    };
    const isDomainHidden = (key) => {
      const feature = featureMap[key];
      return feature && props.hiddenFeatures.includes(feature);
    };
    const toggle = (key, locked) => {
      if (locked || isDomainHidden(key)) return;
      form[key] = !form[key];
    };
    const submit = () => {
      form.put(route("guest-visibility.update"), {
        preserveScroll: true
      });
    };
    if ((_a = page.props.flash) == null ? void 0 : _a.success) ;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Ziyaretçi Görünürlüğü" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              width: "content",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Ziyaretçi Görünürlüğü",
                    description: "Giriş yapmayan ziyaretçilerin hangi bölümleri görebileceğini bu domain için ayarlayın."
                  }, null, _parent3, _scopeId2));
                  if (__props.hiddenFeatures.length) {
                    _push3(`<div class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200" data-v-951f1409${_scopeId2}><p class="font-medium" data-v-951f1409${_scopeId2}>Domain yapılandırması</p><p class="mt-1 text-xs opacity-90" data-v-951f1409${_scopeId2}> Şu modüller <code class="rounded bg-background/50 px-1" data-v-951f1409${_scopeId2}>config/domains.php</code> üzerinden tamamen gizli: ${ssrInterpolate(__props.hiddenFeatures.join(", "))}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<form class="space-y-4" data-v-951f1409${_scopeId2}><div class="rounded-lg border border-border bg-card divide-y divide-border" data-v-951f1409${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.modules, (module) => {
                    _push3(`<div class="flex items-start justify-between gap-4 px-4 py-4 sm:px-6" data-v-951f1409${_scopeId2}><div class="min-w-0 flex-1" data-v-951f1409${_scopeId2}><div class="flex items-center gap-2" data-v-951f1409${_scopeId2}><p class="text-sm font-medium text-foreground" data-v-951f1409${_scopeId2}>${ssrInterpolate(module.label)}</p>`);
                    if (module.locked) {
                      _push3(`<span class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground" data-v-951f1409${_scopeId2}> Sadece giriş </span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><p class="mt-1 text-xs text-muted-foreground" data-v-951f1409${_scopeId2}>${ssrInterpolate(module.description)}</p></div><button type="button" role="switch"${ssrRenderAttr("aria-checked", unref(form)[module.key])}${ssrIncludeBooleanAttr(module.locked || isDomainHidden(module.key)) ? " disabled" : ""} class="${ssrRenderClass([
                      "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      unref(form)[module.key] ? "bg-primary" : "bg-muted",
                      module.locked || isDomainHidden(module.key) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    ])}" data-v-951f1409${_scopeId2}><span class="${ssrRenderClass([
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition",
                      unref(form)[module.key] ? "translate-x-5" : "translate-x-0"
                    ])}" data-v-951f1409${_scopeId2}></span></button></div>`);
                  });
                  _push3(`<!--]--></div><p class="text-xs text-muted-foreground" data-v-951f1409${_scopeId2}> Açık modüllerde ziyaretçiler yalnızca yayında / herkese açık içerikleri görür. Projelerde müşteri bilgisi asla paylaşılmaz. </p><div class="flex justify-end" data-v-951f1409${_scopeId2}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="primary-btn" data-v-951f1409${_scopeId2}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form>`);
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      title: "Ziyaretçi Görünürlüğü",
                      description: "Giriş yapmayan ziyaretçilerin hangi bölümleri görebileceğini bu domain için ayarlayın."
                    }),
                    __props.hiddenFeatures.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                    }, [
                      createVNode("p", { class: "font-medium" }, "Domain yapılandırması"),
                      createVNode("p", { class: "mt-1 text-xs opacity-90" }, [
                        createTextVNode(" Şu modüller "),
                        createVNode("code", { class: "rounded bg-background/50 px-1" }, "config/domains.php"),
                        createTextVNode(" üzerinden tamamen gizli: " + toDisplayString(__props.hiddenFeatures.join(", ")), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "rounded-lg border border-border bg-card divide-y divide-border" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.modules, (module) => {
                          return openBlock(), createBlock("div", {
                            key: module.key,
                            class: "flex items-start justify-between gap-4 px-4 py-4 sm:px-6"
                          }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(module.label), 1),
                                module.locked ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                                }, " Sadece giriş ")) : createCommentVNode("", true)
                              ]),
                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(module.description), 1)
                            ]),
                            createVNode("button", {
                              type: "button",
                              role: "switch",
                              "aria-checked": unref(form)[module.key],
                              disabled: module.locked || isDomainHidden(module.key),
                              class: [
                                "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                unref(form)[module.key] ? "bg-primary" : "bg-muted",
                                module.locked || isDomainHidden(module.key) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                              ],
                              onClick: ($event) => toggle(module.key, module.locked)
                            }, [
                              createVNode("span", {
                                class: [
                                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition",
                                  unref(form)[module.key] ? "translate-x-5" : "translate-x-0"
                                ]
                              }, null, 2)
                            ], 10, ["aria-checked", "disabled", "onClick"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Açık modüllerde ziyaretçiler yalnızca yayında / herkese açık içerikleri görür. Projelerde müşteri bilgisi asla paylaşılmaz. "),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "primary-btn"
                        }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                width: "content",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    title: "Ziyaretçi Görünürlüğü",
                    description: "Giriş yapmayan ziyaretçilerin hangi bölümleri görebileceğini bu domain için ayarlayın."
                  }),
                  __props.hiddenFeatures.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                  }, [
                    createVNode("p", { class: "font-medium" }, "Domain yapılandırması"),
                    createVNode("p", { class: "mt-1 text-xs opacity-90" }, [
                      createTextVNode(" Şu modüller "),
                      createVNode("code", { class: "rounded bg-background/50 px-1" }, "config/domains.php"),
                      createTextVNode(" üzerinden tamamen gizli: " + toDisplayString(__props.hiddenFeatures.join(", ")), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-card divide-y divide-border" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.modules, (module) => {
                        return openBlock(), createBlock("div", {
                          key: module.key,
                          class: "flex items-start justify-between gap-4 px-4 py-4 sm:px-6"
                        }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(module.label), 1),
                              module.locked ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                              }, " Sadece giriş ")) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(module.description), 1)
                          ]),
                          createVNode("button", {
                            type: "button",
                            role: "switch",
                            "aria-checked": unref(form)[module.key],
                            disabled: module.locked || isDomainHidden(module.key),
                            class: [
                              "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              unref(form)[module.key] ? "bg-primary" : "bg-muted",
                              module.locked || isDomainHidden(module.key) ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            ],
                            onClick: ($event) => toggle(module.key, module.locked)
                          }, [
                            createVNode("span", {
                              class: [
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition",
                                unref(form)[module.key] ? "translate-x-5" : "translate-x-0"
                              ]
                            }, null, 2)
                          ], 10, ["aria-checked", "disabled", "onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Açık modüllerde ziyaretçiler yalnızca yayında / herkese açık içerikleri görür. Projelerde müşteri bilgisi asla paylaşılmaz. "),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "primary-btn"
                      }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/GuestVisibility/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-951f1409"]]);
export {
  Edit as default
};
