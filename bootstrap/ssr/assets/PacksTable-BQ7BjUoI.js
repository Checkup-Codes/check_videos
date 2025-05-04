import { ref, computed, onMounted, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-Dy3gXO5k.js";
import "./TopScreen-DnNmtdW-.js";
const _sfc_main = {
  __name: "PacksTable",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    words: Array
  },
  setup(__props) {
    const props = __props;
    const isLoading = ref(true);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const searchQuery = ref("");
    const statusFilter = ref("");
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      if (!props.words || props.words.length === 0) {
        console.warn("Kelime verileri yüklenmedi veya boş");
      } else {
        console.log(`${props.words.length} kelime yüklendi`);
        if (props.words[0]) {
          console.log("İlk kelime örneği:", props.words[0]);
        }
      }
    });
    const filteredWords = computed(() => {
      if (!props.words) return [];
      return props.words.filter((word) => {
        if (!word) return false;
        const matchesSearch = !searchQuery.value.trim() || word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = statusFilter.value === "" || word.learning_status !== void 0 && word.learning_status === parseInt(statusFilter.value);
        return matchesSearch && matchesStatus;
      });
    });
    const confirmDelete = (pack) => {
      if (confirm(`"${pack.name}" dil paketini silmek istediğinize emin misiniz?`)) {
        router.delete(route("rendition.language-packs.destroy", pack.id));
      }
    };
    const clearFilters = () => {
      searchQuery.value = "";
      statusFilter.value = "";
    };
    const getLanguageName = (code) => {
      const languages = {
        tr: "Türkçe",
        en: "İngilizce",
        de: "Almanca",
        fr: "Fransızca",
        es: "İspanyolca",
        it: "İtalyanca",
        ru: "Rusça",
        ar: "Arapça"
      };
      return languages[code] || code;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Dil Paketleri</h2><p class="text-sm"${_scopeId}>Toplam Paket Sayısı: ${ssrInterpolate(__props.languagePacks.length)}</p></div>`);
            if (isLoggedIn.value) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.create"))} class="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}> Yeni Paket Oluştur </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="overflow-hidden rounded-lg bg-white shadow"${_scopeId}><div class="border-b p-4"${_scopeId}><div class="flex flex-wrap gap-4"${_scopeId}><div class="min-w-[200px] flex-1"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime veya anlam ara..." class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="min-w-[200px] flex-1"${_scopeId}><select class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}${_scopeId}>Tüm Durumlar</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "0") : ssrLooseEqual(statusFilter.value, "0")) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "1") : ssrLooseEqual(statusFilter.value, "1")) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "2") : ssrLooseEqual(statusFilter.value, "2")) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div><button class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> Filtreleri Temizle </button></div></div>`);
            if (isLoading.value) {
              _push2(`<div class="p-8 text-center"${_scopeId}><div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"${_scopeId}></div><p class="mt-2 text-gray-600"${_scopeId}>Kelime listesi yükleniyor...</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}> Paket Adı </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>Dil</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}> Kelime Sayısı </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>İşlemler</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.languagePacks, (pack) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="whitespace-nowrap px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(pack.name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(pack.description)}</div></td><td class="whitespace-nowrap px-6 py-4"${_scopeId}><span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800"${_scopeId}>${ssrInterpolate(getLanguageName(pack.language))}</span></td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(pack.word_count)}</td><td class="whitespace-nowrap px-6 py-4 text-sm font-medium"${_scopeId}><div class="flex space-x-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.words", pack.id))} class="text-blue-600 hover:text-blue-900"${_scopeId}> Kelimeler </a>`);
                if (isLoggedIn.value) {
                  _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.edit", pack.id))} class="text-indigo-600 hover:text-indigo-900"${_scopeId}> Düzenle </a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (isLoggedIn.value) {
                  _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.export", pack.id))} class="text-green-600 hover:text-green-900"${_scopeId}> Dışa Aktar </a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (isLoggedIn.value) {
                  _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}> Sil </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`<div class="border-t bg-gray-50 px-6 py-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Toplam Kelime Sayısı: ${ssrInterpolate(filteredWords.value.length)}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold" }, "Dil Paketleri"),
                    createVNode("p", { class: "text-sm" }, "Toplam Paket Sayısı: " + toDisplayString(__props.languagePacks.length), 1)
                  ]),
                  isLoggedIn.value ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: _ctx.route("rendition.language-packs.create"),
                    class: "rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }, " Yeni Paket Oluştur ", 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow" }, [
                  createVNode("div", { class: "border-b p-4" }, [
                    createVNode("div", { class: "flex flex-wrap gap-4" }, [
                      createVNode("div", { class: "min-w-[200px] flex-1" }, [
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Kelime veya anlam ara...",
                          class: "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "min-w-[200px] flex-1" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                          class: "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "Tüm Durumlar"),
                          createVNode("option", { value: "0" }, "Öğrenilmedi"),
                          createVNode("option", { value: "1" }, "Öğreniliyor"),
                          createVNode("option", { value: "2" }, "Öğrenildi")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, statusFilter.value]
                        ])
                      ]),
                      createVNode("button", {
                        onClick: clearFilters,
                        class: "rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      }, " Filtreleri Temizle ")
                    ])
                  ]),
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-8 text-center"
                  }, [
                    createVNode("div", { class: "inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500" }),
                    createVNode("p", { class: "mt-2 text-gray-600" }, "Kelime listesi yükleniyor...")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, " Paket Adı "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "Dil"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, " Kelime Sayısı "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "İşlemler")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePacks, (pack) => {
                          return openBlock(), createBlock("tr", {
                            key: pack.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(pack.name), 1),
                              createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(pack.description), 1)
                            ]),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, [
                              createVNode("span", { class: "inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800" }, toDisplayString(getLanguageName(pack.language)), 1)
                            ]),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-500" }, toDisplayString(pack.word_count), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm font-medium" }, [
                              createVNode("div", { class: "flex space-x-2" }, [
                                createVNode("a", {
                                  href: _ctx.route("rendition.language-packs.words", pack.id),
                                  class: "text-blue-600 hover:text-blue-900"
                                }, " Kelimeler ", 8, ["href"]),
                                isLoggedIn.value ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: _ctx.route("rendition.language-packs.edit", pack.id),
                                  class: "text-indigo-600 hover:text-indigo-900"
                                }, " Düzenle ", 8, ["href"])) : createCommentVNode("", true),
                                isLoggedIn.value ? (openBlock(), createBlock("a", {
                                  key: 1,
                                  href: _ctx.route("rendition.language-packs.export", pack.id),
                                  class: "text-green-600 hover:text-green-900"
                                }, " Dışa Aktar ", 8, ["href"])) : createCommentVNode("", true),
                                isLoggedIn.value ? (openBlock(), createBlock("button", {
                                  key: 2,
                                  onClick: ($event) => confirmDelete(pack),
                                  class: "text-red-600 hover:text-red-900"
                                }, " Sil ", 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])),
                  createVNode("div", { class: "border-t bg-gray-50 px-6 py-4" }, [
                    createVNode("p", { class: "text-sm text-gray-600" }, "Toplam Kelime Sayısı: " + toDisplayString(filteredWords.value.length), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Index/PacksTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
