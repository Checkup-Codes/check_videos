import { ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, withDirectives, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CerAMVwm.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./TextInput-BZ7J6R6m.js";
import { _ as _sfc_main$3 } from "./InputError-BNVGxBhc.js";
import { P as PrimaryButton } from "./PrimaryButton-Cif9S6uF.js";
import { _ as _sfc_main$5 } from "./SecondaryButton-BfILWEDW.js";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    socialMedia: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const availablePlatforms = {
      Instagram: "instagram",
      Youtube: "youtube",
      Github: "github",
      Linkedin: "linkedin",
      Medium: "medium",
      Twitter: "twitter",
      X: "twitter",
      Facebook: "facebook",
      Tiktok: "tiktok",
      Pinterest: "pinterest"
    };
    const getPlatformIcon = (platform) => {
      var _a;
      return ((_a = availablePlatforms[platform]) == null ? void 0 : _a.toLowerCase()) || "link";
    };
    const formatPlatformName = (platform) => {
      return platform || "";
    };
    const editingId = ref(null);
    const form = useForm({
      platform: "",
      url: "",
      is_active: true,
      order: 0
    });
    const submitForm = () => {
      if (editingId.value) {
        form.put(`/social-media/${editingId.value}`, {
          preserveScroll: true,
          onSuccess: () => {
            editingId.value = null;
            form.reset();
          }
        });
      } else {
        form.post("/social-media", {
          preserveScroll: true,
          onSuccess: () => form.reset()
        });
      }
    };
    const startEdit = (link) => {
      editingId.value = link.id;
      form.platform = link.platform;
      form.url = link.url;
      form.is_active = link.is_active;
      form.order = link.order;
    };
    const cancelEdit = () => {
      editingId.value = null;
      form.reset();
    };
    const toggleStatus = (link) => {
      form.put(
        `/social-media/${link.id}`,
        {
          ...link,
          is_active: !link.is_active
        },
        {
          preserveScroll: true
        }
      );
    };
    const deleteLink = (link) => {
      if (confirm("Bu sosyal medya linkini silmek istediğinizden emin misiniz?")) {
        form.delete(`/social-media/${link.id}`, {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Sosyal Medya Yönetimi" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}>`);
            if (_ctx.$page.props.flash.message) {
              _push2(`<div class="mb-4"${_scopeId}><div class="rounded-md bg-green-50 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircleIcon), {
                class: "h-5 w-5 text-green-400",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="ml-3"${_scopeId}><p class="text-sm font-medium text-green-800"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.message)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="mb-4"${_scopeId}><div class="rounded-md bg-red-50 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(XCircleIcon), {
                class: "h-5 w-5 text-red-400",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="ml-3"${_scopeId}><p class="text-sm font-medium text-red-800"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><form class="mb-8 space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "platform",
              value: "Platform"
            }, null, _parent2, _scopeId));
            _push2(`<select id="platform" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).platform) ? ssrLooseContain(unref(form).platform, "") : ssrLooseEqual(unref(form).platform, "")) ? " selected" : ""}${_scopeId}>Platform Seçin</option><!--[-->`);
            ssrRenderList(availablePlatforms, (icon, platform) => {
              _push2(`<option${ssrRenderAttr("value", platform)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).platform) ? ssrLooseContain(unref(form).platform, platform) : ssrLooseEqual(unref(form).platform, platform)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(platform)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.platform,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "url",
              value: "URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "url",
              modelValue: unref(form).url,
              "onUpdate:modelValue": ($event) => unref(form).url = $event,
              type: "url",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.url,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-end space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(editingId.value ? "Güncelle" : "Ekle")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(editingId.value ? "Güncelle" : "Ekle"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (editingId.value) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                onClick: cancelEdit,
                type: "button"
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
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></form><div class="mt-6 overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"${_scopeId}> Platform </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"${_scopeId}> URL </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"${_scopeId}> Durum </th><th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6"${_scopeId}> İşlemler </th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.socialMedia, (link) => {
              _push2(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-700"${_scopeId}><td class="whitespace-nowrap px-4 py-4 md:px-6"${_scopeId}><div class="flex items-center"${_scopeId}><i class="${ssrRenderClass(["mr-2", `fab fa-${getPlatformIcon(link.platform)}`])}"${_scopeId}></i> ${ssrInterpolate(formatPlatformName(link.platform))}</div></td><td class="whitespace-nowrap px-4 py-4 md:px-6"${_scopeId}><a${ssrRenderAttr("href", link.url)} target="_blank" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}>${ssrInterpolate(link.url)}</a></td><td class="whitespace-nowrap px-4 py-4 md:px-6"${_scopeId}><button class="${ssrRenderClass([
                "rounded px-2 py-1 text-sm font-medium",
                link.is_active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              ])}"${_scopeId}>${ssrInterpolate(link.is_active ? "Aktif" : "Pasif")}</button></td><td class="whitespace-nowrap px-4 py-4 text-right md:px-6"${_scopeId}><button class="mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"${_scopeId}> Düzenle </button><button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"${_scopeId}> Sil </button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  _ctx.$page.props.flash.message ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4"
                  }, [
                    createVNode("div", { class: "rounded-md bg-green-50 p-4" }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode(unref(CheckCircleIcon), {
                            class: "h-5 w-5 text-green-400",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-sm font-medium text-green-800" }, toDisplayString(_ctx.$page.props.flash.message), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  _ctx.$page.props.flash.error ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mb-4"
                  }, [
                    createVNode("div", { class: "rounded-md bg-red-50 p-4" }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode(unref(XCircleIcon), {
                            class: "h-5 w-5 text-red-400",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-sm font-medium text-red-800" }, toDisplayString(_ctx.$page.props.flash.error), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "mb-8 space-y-4"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "platform",
                              value: "Platform"
                            }),
                            withDirectives(createVNode("select", {
                              id: "platform",
                              "onUpdate:modelValue": ($event) => unref(form).platform = $event,
                              class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Platform Seçin"),
                              (openBlock(), createBlock(Fragment, null, renderList(availablePlatforms, (icon, platform) => {
                                return createVNode("option", {
                                  key: platform,
                                  value: platform
                                }, toDisplayString(platform), 9, ["value"]);
                              }), 64))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).platform]
                            ]),
                            createVNode(_sfc_main$3, {
                              message: unref(form).errors.platform,
                              class: "mt-2"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "url",
                              value: "URL"
                            }),
                            createVNode(_sfc_main$4, {
                              id: "url",
                              modelValue: unref(form).url,
                              "onUpdate:modelValue": ($event) => unref(form).url = $event,
                              type: "url",
                              class: "mt-1 block w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              message: unref(form).errors.url,
                              class: "mt-2"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "flex items-end space-x-2" }, [
                            createVNode(PrimaryButton, {
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(editingId.value ? "Güncelle" : "Ekle"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            editingId.value ? (openBlock(), createBlock(_sfc_main$5, {
                              key: 0,
                              onClick: cancelEdit,
                              type: "button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" İptal ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ])
                        ])
                      ], 32),
                      createVNode("div", { class: "mt-6 overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6" }, " Platform "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6" }, " URL "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6" }, " Durum "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:px-6" }, " İşlemler ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.socialMedia, (link) => {
                              return openBlock(), createBlock("tr", {
                                key: link.id,
                                class: "hover:bg-gray-50 dark:hover:bg-gray-700"
                              }, [
                                createVNode("td", { class: "whitespace-nowrap px-4 py-4 md:px-6" }, [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("i", {
                                      class: ["mr-2", `fab fa-${getPlatformIcon(link.platform)}`]
                                    }, null, 2),
                                    createTextVNode(" " + toDisplayString(formatPlatformName(link.platform)), 1)
                                  ])
                                ]),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-4 md:px-6" }, [
                                  createVNode("a", {
                                    href: link.url,
                                    target: "_blank",
                                    class: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                  }, toDisplayString(link.url), 9, ["href"])
                                ]),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-4 md:px-6" }, [
                                  createVNode("button", {
                                    onClick: ($event) => toggleStatus(link),
                                    class: [
                                      "rounded px-2 py-1 text-sm font-medium",
                                      link.is_active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    ]
                                  }, toDisplayString(link.is_active ? "Aktif" : "Pasif"), 11, ["onClick"])
                                ]),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-4 text-right md:px-6" }, [
                                  createVNode("button", {
                                    onClick: ($event) => startEdit(link),
                                    class: "mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                  }, " Düzenle ", 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteLink(link),
                                    class: "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                  }, " Sil ", 8, ["onClick"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SocialMedia/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
