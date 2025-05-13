import { ref, computed, onMounted, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, toDisplayString, createCommentVNode, withDirectives, withKeys, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-C9UKQisk.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
    error: {
      type: String,
      default: null
    },
    filters: Object,
    pagination: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const isLoading = ref(true);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const currentPage = ref(((_a = props.pagination) == null ? void 0 : _a.current_page) || 1);
    const totalPages = ref(((_b = props.pagination) == null ? void 0 : _b.last_page) || 1);
    const searchQuery = ref(((_c = props.filters) == null ? void 0 : _c.search) || "");
    const filterLanguage = ref(((_d = props.filters) == null ? void 0 : _d.language) || "");
    const filterStatus = ref(((_e = props.filters) == null ? void 0 : _e.status) || "");
    const paginationInfo = computed(() => {
      if (!props.pagination) return "";
      const from = props.pagination.from || 0;
      const to = props.pagination.to || 0;
      const total = props.pagination.total || 0;
      return `${from}-${to} / ${total}`;
    });
    const search = () => {
      router.visit(route("rendition.words.index"), {
        data: {
          search: searchQuery.value,
          language: filterLanguage.value,
          status: filterStatus.value,
          page: 1
          // Her aramada ilk sayfaya dön
        },
        preserveState: true,
        replace: true,
        onBefore: () => {
          isLoading.value = true;
        },
        onSuccess: () => {
          isLoading.value = false;
        }
      });
    };
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
      router.visit(route("rendition.words.index"), {
        data: {
          search: searchQuery.value,
          language: filterLanguage.value,
          status: filterStatus.value,
          page
        },
        preserveState: true,
        replace: true,
        onBefore: () => {
          isLoading.value = true;
        },
        onSuccess: () => {
          isLoading.value = false;
        }
      });
    };
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    const getLearningStatusBadgeClass = (status) => {
      switch (Number(status)) {
        case 0:
          return "badge-ghost";
        case 1:
          return "badge-warning";
        case 2:
          return "badge-success";
        default:
          return "badge-ghost";
      }
    };
    const getLearningStatusLabel = (status) => {
      switch (Number(status)) {
        case 0:
          return "Öğrenilmedi";
        case 1:
          return "Öğreniliyor";
        case 2:
          return "Öğrenildi";
        default:
          return "Belirsiz";
      }
    };
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="flex-1"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Kelimeler</h1><p class="text-sm opacity-70"${_scopeId}> Toplam: ${ssrInterpolate(isLoading.value ? "..." : props.words ? props.words.length : 0)} kelime </p></div><div class="flex justify-end gap-2"${_scopeId}>`);
            if (isLoggedIn.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.create"),
                class: "btn btn-primary btn-sm whitespace-nowrap"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Yeni Kelime `);
                  } else {
                    return [
                      createTextVNode(" Yeni Kelime ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider my-2"${_scopeId}></div><div class="mb-4 flex flex-col flex-wrap gap-3 sm:flex-row"${_scopeId}><div class="form-control min-w-[200px] flex-1"${_scopeId}><div class="input-group w-full"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime ara..." class="input-bordered input input-sm w-full"${_scopeId}><button class="btn btn-sm btn-square"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></button></div></div><select class="select-bordered select select-sm min-w-[150px] flex-1"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "") : ssrLooseEqual(filterLanguage.value, "")) ? " selected" : ""}${_scopeId}>Tüm Diller</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "tr") : ssrLooseEqual(filterLanguage.value, "tr")) ? " selected" : ""}${_scopeId}>Türkçe</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "en") : ssrLooseEqual(filterLanguage.value, "en")) ? " selected" : ""}${_scopeId}>İngilizce</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "de") : ssrLooseEqual(filterLanguage.value, "de")) ? " selected" : ""}${_scopeId}>Almanca</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "fr") : ssrLooseEqual(filterLanguage.value, "fr")) ? " selected" : ""}${_scopeId}>Fransızca</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(filterLanguage.value) ? ssrLooseContain(filterLanguage.value, "es") : ssrLooseEqual(filterLanguage.value, "es")) ? " selected" : ""}${_scopeId}>İspanyolca</option></select><select class="select-bordered select select-sm min-w-[150px] flex-1"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "") : ssrLooseEqual(filterStatus.value, "")) ? " selected" : ""}${_scopeId}>Tüm Durumlar</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "0") : ssrLooseEqual(filterStatus.value, "0")) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "1") : ssrLooseEqual(filterStatus.value, "1")) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "2") : ssrLooseEqual(filterStatus.value, "2")) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div><div class="overflow-x-auto"${_scopeId}><table class="table table-zebra w-full text-sm"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Kelime</th><th${_scopeId}>Anlam</th><th${_scopeId}>Tür</th><th${_scopeId}>Dil</th><th${_scopeId}>Durum</th>`);
            if (isLoggedIn.value) {
              _push2(`<th${_scopeId}></th>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tr></thead><tbody${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<tr${_scopeId}><td colspan="6" class="text-center"${_scopeId}><span class="loading loading-spinner loading-md"${_scopeId}></span></td></tr>`);
            } else if (props.words && props.words.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="text-center"${_scopeId}>Sonuç bulunamadı</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(props.words, (word) => {
              _push2(`<tr${_scopeId}><td${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(word.word)}</div></td><td${_scopeId}>${ssrInterpolate(truncateText(word.meaning, 50))}</td><td${_scopeId}><div class="badge badge-sm"${_scopeId}>${ssrInterpolate(word.type)}</div></td><td${_scopeId}><div class="badge badge-outline"${_scopeId}>${ssrInterpolate(word.language)}</div></td><td${_scopeId}><div class="${ssrRenderClass([getLearningStatusBadgeClass(word.learning_status), "badge badge-sm"])}"${_scopeId}>${ssrInterpolate(getLearningStatusLabel(word.learning_status))}</div></td>`);
              if (isLoggedIn.value) {
                _push2(`<td${_scopeId}><div class="flex gap-1"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("rendition.words.edit", word.id),
                  class: "btn btn-ghost btn-xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></td>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between"${_scopeId}><div${_scopeId}><span class="text-sm opacity-70"${_scopeId}>${ssrInterpolate(paginationInfo.value)}</span></div><div class="join"${_scopeId}><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""}${_scopeId}> « </button><button class="btn btn-sm join-item"${_scopeId}>${ssrInterpolate(currentPage.value)}</button><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""}${_scopeId}> » </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("div", { class: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("h1", { class: "text-2xl font-bold" }, "Kelimeler"),
                      createVNode("p", { class: "text-sm opacity-70" }, " Toplam: " + toDisplayString(isLoading.value ? "..." : props.words ? props.words.length : 0) + " kelime ", 1)
                    ]),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route("rendition.words.create"),
                        class: "btn btn-primary btn-sm whitespace-nowrap"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Yeni Kelime ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "divider my-2" }),
                  createVNode("div", { class: "mb-4 flex flex-col flex-wrap gap-3 sm:flex-row" }, [
                    createVNode("div", { class: "form-control min-w-[200px] flex-1" }, [
                      createVNode("div", { class: "input-group w-full" }, [
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Kelime ara...",
                          class: "input-bordered input input-sm w-full",
                          onKeyup: withKeys(search, ["enter"])
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        createVNode("button", {
                          class: "btn btn-sm btn-square",
                          onClick: search
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            })
                          ]))
                        ])
                      ])
                    ]),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => filterLanguage.value = $event,
                      class: "select-bordered select select-sm min-w-[150px] flex-1",
                      onChange: search
                    }, [
                      createVNode("option", { value: "" }, "Tüm Diller"),
                      createVNode("option", { value: "tr" }, "Türkçe"),
                      createVNode("option", { value: "en" }, "İngilizce"),
                      createVNode("option", { value: "de" }, "Almanca"),
                      createVNode("option", { value: "fr" }, "Fransızca"),
                      createVNode("option", { value: "es" }, "İspanyolca")
                    ], 40, ["onUpdate:modelValue"]), [
                      [vModelSelect, filterLanguage.value]
                    ]),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => filterStatus.value = $event,
                      class: "select-bordered select select-sm min-w-[150px] flex-1",
                      onChange: search
                    }, [
                      createVNode("option", { value: "" }, "Tüm Durumlar"),
                      createVNode("option", { value: "0" }, "Öğrenilmedi"),
                      createVNode("option", { value: "1" }, "Öğreniliyor"),
                      createVNode("option", { value: "2" }, "Öğrenildi")
                    ], 40, ["onUpdate:modelValue"]), [
                      [vModelSelect, filterStatus.value]
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "table table-zebra w-full text-sm" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Kelime"),
                          createVNode("th", null, "Anlam"),
                          createVNode("th", null, "Tür"),
                          createVNode("th", null, "Dil"),
                          createVNode("th", null, "Durum"),
                          isLoggedIn.value ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("tbody", null, [
                        isLoading.value ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "text-center"
                          }, [
                            createVNode("span", { class: "loading loading-spinner loading-md" })
                          ])
                        ])) : props.words && props.words.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "text-center"
                          }, "Sonuç bulunamadı")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(props.words, (word) => {
                          return openBlock(), createBlock("tr", {
                            key: word.id
                          }, [
                            createVNode("td", null, [
                              createVNode("div", { class: "font-medium" }, toDisplayString(word.word), 1)
                            ]),
                            createVNode("td", null, toDisplayString(truncateText(word.meaning, 50)), 1),
                            createVNode("td", null, [
                              createVNode("div", { class: "badge badge-sm" }, toDisplayString(word.type), 1)
                            ]),
                            createVNode("td", null, [
                              createVNode("div", { class: "badge badge-outline" }, toDisplayString(word.language), 1)
                            ]),
                            createVNode("td", null, [
                              createVNode("div", {
                                class: ["badge badge-sm", getLearningStatusBadgeClass(word.learning_status)]
                              }, toDisplayString(getLearningStatusLabel(word.learning_status)), 3)
                            ]),
                            isLoggedIn.value ? (openBlock(), createBlock("td", { key: 0 }, [
                              createVNode("div", { class: "flex gap-1" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("rendition.words.edit", word.id),
                                  class: "btn btn-ghost btn-xs"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3 w-3",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ])
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm opacity-70" }, toDisplayString(paginationInfo.value), 1)
                    ]),
                    createVNode("div", { class: "join" }, [
                      createVNode("button", {
                        class: "btn btn-sm join-item",
                        disabled: currentPage.value <= 1,
                        onClick: ($event) => changePage(currentPage.value - 1)
                      }, " « ", 8, ["disabled", "onClick"]),
                      createVNode("button", { class: "btn btn-sm join-item" }, toDisplayString(currentPage.value), 1),
                      createVNode("button", {
                        class: "btn btn-sm join-item",
                        disabled: currentPage.value >= totalPages.value,
                        onClick: ($event) => changePage(currentPage.value + 1)
                      }, " » ", 8, ["disabled", "onClick"])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
