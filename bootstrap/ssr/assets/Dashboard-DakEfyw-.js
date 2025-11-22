import { defineComponent, ref, onMounted, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import { Head, Link } from "@inertiajs/vue3";
import "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: {},
    recentWrites: {},
    popularCategories: {},
    monthlyStats: {},
    allWrites: {}
  },
  setup(__props) {
    const props = __props;
    let chartLoaded = ref(false);
    onMounted(() => {
      if (window.Chart && props.monthlyStats) {
        renderChart();
        chartLoaded.value = true;
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js";
        script.onload = () => {
          renderChart();
          chartLoaded.value = true;
        };
        document.head.appendChild(script);
      }
    });
    function renderChart() {
      const ctx = document.getElementById("monthlyStatsChart");
      if (!ctx) return;
      const monthNames = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ];
      const data = Object.keys(props.monthlyStats).map((month) => props.monthlyStats[month]);
      new window.Chart(ctx, {
        type: "line",
        data: {
          labels: monthNames,
          datasets: [
            {
              label: "Yazı Sayısı",
              data,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: "rgba(59, 130, 246, 1)"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><dl${_scopeId}><dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}>Toplam Kategori</dt><dd class="mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(__props.stats.categories_count)}</dd></dl></div><div class="bg-gray-50 px-4 py-3 dark:bg-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.index"),
              class: "text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tüm Kategorileri Gör → `);
                } else {
                  return [
                    createTextVNode(" Tüm Kategorileri Gör → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><dl${_scopeId}><dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}>Toplam Yazı</dt><dd class="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400"${_scopeId}>${ssrInterpolate(__props.stats.writes_count)}</dd></dl></div><div class="bg-gray-50 px-4 py-3 dark:bg-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.index"),
              class: "text-sm font-medium text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tüm Yazıları Gör → `);
                } else {
                  return [
                    createTextVNode(" Tüm Yazıları Gör → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><dl${_scopeId}><dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}>Yayında Olan Yazılar</dt><dd class="mt-1 text-3xl font-semibold text-purple-600 dark:text-purple-400"${_scopeId}>${ssrInterpolate(__props.stats.public_writes_count)}</dd></dl></div><div class="bg-gray-50 px-4 py-3 dark:bg-gray-700"${_scopeId}><div class="text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Toplam Yazıların ${ssrInterpolate(__props.stats.writes_count > 0 ? Math.round(__props.stats.public_writes_count / __props.stats.writes_count * 100) : 0)}%&#39;si </div></div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><dl${_scopeId}><dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}>Özel Yazılar</dt><dd class="mt-1 text-3xl font-semibold text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(__props.stats.private_writes_count)}</dd></dl></div><div class="bg-gray-50 px-4 py-3 dark:bg-gray-700"${_scopeId}><div class="text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Toplam Yazıların ${ssrInterpolate(__props.stats.writes_count > 0 ? Math.round(__props.stats.private_writes_count / __props.stats.writes_count * 100) : 0)}%&#39;si </div></div></div></div><div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3"${_scopeId}><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 lg:col-span-2"${_scopeId}><div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}>Son Yazılarınız</h3></div><div class="bg-white dark:bg-gray-800"${_scopeId}><ul class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentWrites, (write) => {
              _push2(`<li class="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("writes.show", write.id),
                class: "flex flex-col space-y-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><p class="truncate text-sm font-medium text-blue-600 dark:text-blue-400"${_scopeId2}>${ssrInterpolate(write.title)}</p><div class="ml-2 flex flex-shrink-0"${_scopeId2}><p class="${ssrRenderClass([
                      write.status === "public" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                      "inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                    ])}"${_scopeId2}>${ssrInterpolate(write.status === "public" ? "Yayında" : "Özel")}</p></div></div><div class="flex justify-between"${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok")}</p></div><div class="text-xs text-gray-500 dark:text-gray-400"${_scopeId2}> Güncellenme: ${ssrInterpolate(formatDate(write.updated_at))}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("p", { class: "truncate text-sm font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(write.title), 1),
                        createVNode("div", { class: "ml-2 flex flex-shrink-0" }, [
                          createVNode("p", {
                            class: [
                              "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                              write.status === "public" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            ]
                          }, toDisplayString(write.status === "public" ? "Yayında" : "Özel"), 3)
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok"), 1)
                      ]),
                      createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Güncellenme: " + toDisplayString(formatDate(write.updated_at)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]-->`);
            if (__props.recentWrites.length === 0) {
              _push2(`<li class="px-4 py-4 text-gray-500 dark:text-gray-400 sm:px-6"${_scopeId}> Henüz yazı eklenmemiş. </li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul><div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.create"),
              class: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Yazı Ekle `);
                } else {
                  return [
                    createTextVNode(" Yeni Yazı Ekle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}>Popüler Kategorileriniz</h3></div><div class="bg-white dark:bg-gray-800"${_scopeId}><ul class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularCategories, (category) => {
              _push2(`<li class="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.show", category.id),
                class: "flex items-center justify-between"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-sm font-medium text-gray-900 dark:text-gray-100"${_scopeId2}>${ssrInterpolate(category.name)}</p><div class="ml-2 flex flex-shrink-0"${_scopeId2}><p class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900 dark:text-blue-200"${_scopeId2}>${ssrInterpolate(category.writes_count)} Yazı </p></div>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(category.name), 1),
                      createVNode("div", { class: "ml-2 flex flex-shrink-0" }, [
                        createVNode("p", { class: "inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }, toDisplayString(category.writes_count) + " Yazı ", 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]-->`);
            if (__props.popularCategories.length === 0) {
              _push2(`<li class="px-4 py-4 text-gray-500 dark:text-gray-400 sm:px-6"${_scopeId}> Henüz kategori eklenmemiş. </li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul><div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.create"),
              class: "inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Kategori Ekle `);
                } else {
                  return [
                    createTextVNode(" Yeni Kategori Ekle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"${_scopeId}><h3 class="mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}> Bu Yılki Yazı İstatistikleri </h3><div class="h-80"${_scopeId}><canvas id="monthlyStatsChart"${_scopeId}></canvas>`);
            if (!unref(chartLoaded)) {
              _push2(`<div class="flex h-full items-center justify-center"${_scopeId}><svg class="h-8 w-8 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" }, [
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("dl", null, [
                          createVNode("dt", { class: "truncate text-sm font-medium text-gray-500 dark:text-gray-400" }, "Toplam Kategori"),
                          createVNode("dd", { class: "mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400" }, toDisplayString(__props.stats.categories_count), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-4 py-3 dark:bg-gray-700" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("categories.index"),
                          class: "text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tüm Kategorileri Gör → ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("dl", null, [
                          createVNode("dt", { class: "truncate text-sm font-medium text-gray-500 dark:text-gray-400" }, "Toplam Yazı"),
                          createVNode("dd", { class: "mt-1 text-3xl font-semibold text-green-600 dark:text-green-400" }, toDisplayString(__props.stats.writes_count), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-4 py-3 dark:bg-gray-700" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("writes.index"),
                          class: "text-sm font-medium text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tüm Yazıları Gör → ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("dl", null, [
                          createVNode("dt", { class: "truncate text-sm font-medium text-gray-500 dark:text-gray-400" }, "Yayında Olan Yazılar"),
                          createVNode("dd", { class: "mt-1 text-3xl font-semibold text-purple-600 dark:text-purple-400" }, toDisplayString(__props.stats.public_writes_count), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-4 py-3 dark:bg-gray-700" }, [
                        createVNode("div", { class: "text-sm font-medium text-gray-500 dark:text-gray-400" }, " Toplam Yazıların " + toDisplayString(__props.stats.writes_count > 0 ? Math.round(__props.stats.public_writes_count / __props.stats.writes_count * 100) : 0) + "%'si ", 1)
                      ])
                    ]),
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("dl", null, [
                          createVNode("dt", { class: "truncate text-sm font-medium text-gray-500 dark:text-gray-400" }, "Özel Yazılar"),
                          createVNode("dd", { class: "mt-1 text-3xl font-semibold text-amber-600 dark:text-amber-400" }, toDisplayString(__props.stats.private_writes_count), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 px-4 py-3 dark:bg-gray-700" }, [
                        createVNode("div", { class: "text-sm font-medium text-gray-500 dark:text-gray-400" }, " Toplam Yazıların " + toDisplayString(__props.stats.writes_count > 0 ? Math.round(__props.stats.private_writes_count / __props.stats.writes_count * 100) : 0) + "%'si ", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3" }, [
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 lg:col-span-2" }, [
                      createVNode("div", { class: "border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100" }, "Son Yazılarınız")
                      ]),
                      createVNode("div", { class: "bg-white dark:bg-gray-800" }, [
                        createVNode("ul", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.recentWrites, (write) => {
                            return openBlock(), createBlock("li", {
                              key: write.id,
                              class: "px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6"
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("writes.show", write.id),
                                class: "flex flex-col space-y-2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center justify-between" }, [
                                    createVNode("p", { class: "truncate text-sm font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(write.title), 1),
                                    createVNode("div", { class: "ml-2 flex flex-shrink-0" }, [
                                      createVNode("p", {
                                        class: [
                                          "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                                          write.status === "public" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                        ]
                                      }, toDisplayString(write.status === "public" ? "Yayında" : "Özel"), 3)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex justify-between" }, [
                                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok"), 1)
                                  ]),
                                  createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Güncellenme: " + toDisplayString(formatDate(write.updated_at)), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]);
                          }), 128)),
                          __props.recentWrites.length === 0 ? (openBlock(), createBlock("li", {
                            key: 0,
                            class: "px-4 py-4 text-gray-500 dark:text-gray-400 sm:px-6"
                          }, " Henüz yazı eklenmemiş. ")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-3 text-right dark:bg-gray-700" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("writes.create"),
                            class: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Yeni Yazı Ekle ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                      createVNode("div", { class: "border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100" }, "Popüler Kategorileriniz")
                      ]),
                      createVNode("div", { class: "bg-white dark:bg-gray-800" }, [
                        createVNode("ul", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.popularCategories, (category) => {
                            return openBlock(), createBlock("li", {
                              key: category.id,
                              class: "px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6"
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("categories.show", category.id),
                                class: "flex items-center justify-between"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(category.name), 1),
                                  createVNode("div", { class: "ml-2 flex flex-shrink-0" }, [
                                    createVNode("p", { class: "inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }, toDisplayString(category.writes_count) + " Yazı ", 1)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]);
                          }), 128)),
                          __props.popularCategories.length === 0 ? (openBlock(), createBlock("li", {
                            key: 0,
                            class: "px-4 py-4 text-gray-500 dark:text-gray-400 sm:px-6"
                          }, " Henüz kategori eklenmemiş. ")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-3 text-right dark:bg-gray-700" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("categories.create"),
                            class: "inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Yeni Kategori Ekle ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, [
                    createVNode("h3", { class: "mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100" }, " Bu Yılki Yazı İstatistikleri "),
                    createVNode("div", { class: "h-80" }, [
                      createVNode("canvas", { id: "monthlyStatsChart" }),
                      !unref(chartLoaded) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex h-full items-center justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-8 w-8 animate-spin text-blue-500",
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
                        ]))
                      ])) : createCommentVNode("", true)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
