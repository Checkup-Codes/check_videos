import { ref, computed, onMounted, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import "./TopScreen-DGs2djGh.js";
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
    const difficultyText = (level) => ["Bilinmiyor", "Kolay", "Orta", "Zor", "Çok Zor"][level] || "Bilinmiyor";
    const learningStatusText = (status) => ["Öğrenilmedi", "Öğreniliyor", "Öğrenildi"][status] || "Bilinmiyor";
    const confirmDelete = (word) => {
      if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
        router.delete(route("rendition.words.destroy", word.id));
      }
    };
    const clearFilters = () => {
      searchQuery.value = "";
      statusFilter.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold"${_scopeId}>Kelime Listesi</h2><p class="text-sm"${_scopeId}>Toplam Kelime Sayısı: ${ssrInterpolate(isLoading.value ? "..." : filteredWords.value.length)}</p></div>`);
            if (isLoggedIn.value) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"${_scopeId}> Yeni Kelime Ekle </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="overflow-hidden rounded-lg bg-white shadow"${_scopeId}><div class="border-b p-4"${_scopeId}><div class="flex flex-wrap gap-4"${_scopeId}><div class="min-w-[200px] flex-1"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime veya anlam ara..." class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="min-w-[200px] flex-1"${_scopeId}><select class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}${_scopeId}>Tüm Durumlar</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "0") : ssrLooseEqual(statusFilter.value, "0")) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "1") : ssrLooseEqual(statusFilter.value, "1")) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "2") : ssrLooseEqual(statusFilter.value, "2")) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div><button class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> Filtreleri Temizle </button></div></div>`);
            if (isLoading.value) {
              _push2(`<div class="p-8 text-center"${_scopeId}><div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"${_scopeId}></div><p class="mt-2 text-gray-600"${_scopeId}>Kelime listesi yükleniyor...</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>Kelime</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>Anlam</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>Zorluk</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>Durum</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"${_scopeId}>İşlemler</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}>`);
              if (filteredWords.value.length === 0) {
                _push2(`<tr class="text-center"${_scopeId}><td colspan="5" class="px-6 py-4 text-sm text-gray-500"${_scopeId}>Arama kriterlerine uygun kelime bulunamadı</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(filteredWords.value, (word) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(word.word)}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(word.meaning)}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(difficultyText(word.difficulty_level))}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(learningStatusText(word.learning_status))}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"${_scopeId}><div class="flex space-x-2"${_scopeId}><button class="text-red-600 hover:text-red-900"${_scopeId}>Sil</button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`<div class="border-t bg-gray-50 px-6 py-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Toplam Kelime Sayısı: ${ssrInterpolate(filteredWords.value.length)}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold" }, "Kelime Listesi"),
                    createVNode("p", { class: "text-sm" }, "Toplam Kelime Sayısı: " + toDisplayString(isLoading.value ? "..." : filteredWords.value.length), 1)
                  ]),
                  isLoggedIn.value ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: _ctx.route("rendition.words.create"),
                    class: "rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
                  }, " Yeni Kelime Ekle ", 8, ["href"])) : createCommentVNode("", true)
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
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "Kelime"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "Anlam"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "Zorluk"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "Durum"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" }, "İşlemler")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                        filteredWords.value.length === 0 ? (openBlock(), createBlock("tr", {
                          key: 0,
                          class: "text-center"
                        }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-sm text-gray-500"
                          }, "Arama kriterlerine uygun kelime bulunamadı")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredWords.value, (word) => {
                          return openBlock(), createBlock("tr", {
                            key: word.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(word.word), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-500" }, toDisplayString(word.meaning), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-500" }, toDisplayString(difficultyText(word.difficulty_level)), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-500" }, toDisplayString(learningStatusText(word.learning_status)), 1),
                            createVNode("td", { class: "whitespace-nowrap px-6 py-4 text-sm text-gray-500" }, [
                              createVNode("div", { class: "flex space-x-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(word),
                                  class: "text-red-600 hover:text-red-900"
                                }, "Sil", 8, ["onClick"])
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
