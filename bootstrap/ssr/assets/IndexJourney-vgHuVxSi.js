import { computed, withCtx, unref, createBlock, createCommentVNode, createVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-BImd-DHt.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import { _ as _export_sfc } from "../ssr.js";
import "./FlashMessage-D-FCyLof.js";
import "./SidebarLayoutJourney-C_y6Q3RS.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./JourneyTimeline-Da0328av.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexJourney",
  __ssrInlineRender: true,
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    entriesByYear: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const groupedEntries = computed(() => {
      const sorted = {};
      Object.keys(props.entriesByYear).sort((a, b) => Number(a) - Number(b)).forEach((year) => {
        const yearEntries = Array.isArray(props.entriesByYear[year]) ? [...props.entriesByYear[year]].sort((a, b) => {
          const dateA = new Date(a.entry_date);
          const dateB = new Date(b.entry_date);
          return dateA - dateB;
        }) : props.entriesByYear[year];
        sorted[year] = yearEntries;
      });
      return sorted;
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(date);
      } catch {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mx-auto max-w-4xl py-8" data-v-09aa322c${_scopeId2}><div class="mb-12 text-center" data-v-09aa322c${_scopeId2}><h1 class="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl" data-v-09aa322c${_scopeId2}> Yolculuk </h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground" data-v-09aa322c${_scopeId2}> Zamanda bir yolculuk. Anılar, deneyimler ve öğrenilenler... </p></div>`);
                  if (__props.entries.length > 0) {
                    _push3(`<div class="relative" data-v-09aa322c${_scopeId2}><div class="timeline-container" data-v-09aa322c${_scopeId2}><!--[-->`);
                    ssrRenderList(groupedEntries.value, (yearEntries, year) => {
                      _push3(`<div class="year-section mb-16" data-v-09aa322c${_scopeId2}><div class="year-marker mb-8 flex items-center justify-center" data-v-09aa322c${_scopeId2}><div class="flex h-12 w-24 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg" data-v-09aa322c${_scopeId2}>${ssrInterpolate(year)}</div></div><div class="space-y-8" data-v-09aa322c${_scopeId2}><!--[-->`);
                      ssrRenderList(yearEntries, (entry, index) => {
                        _push3(`<div class="${ssrRenderClass([index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]", "entry-card group relative"])}" data-v-09aa322c${_scopeId2}><div class="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" data-v-09aa322c${_scopeId2}></div>`);
                        _push3(ssrRenderComponent(unref(Link), {
                          href: `/journey/${entry.id}`,
                          class: "block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (entry.image) {
                                _push4(`<div class="aspect-video overflow-hidden" data-v-09aa322c${_scopeId3}><img${ssrRenderAttr("src", `/storage/${entry.image}`)}${ssrRenderAttr("alt", entry.title)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-09aa322c${_scopeId3}></div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<div class="p-5" data-v-09aa322c${_scopeId3}><div class="mb-3 flex items-center gap-2" data-v-09aa322c${_scopeId3}><span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" data-v-09aa322c${_scopeId3}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-09aa322c${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-09aa322c${_scopeId3}></path></svg> ${ssrInterpolate(formatDate(entry.entry_date))}</span>`);
                              if (entry.status === "draft") {
                                _push4(`<span class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400" data-v-09aa322c${_scopeId3}> Taslak </span>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div><h2 class="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary" data-v-09aa322c${_scopeId3}>${ssrInterpolate(entry.title)}</h2>`);
                              if (entry.description) {
                                _push4(`<p class="line-clamp-3 text-sm leading-relaxed text-muted-foreground" data-v-09aa322c${_scopeId3}>${ssrInterpolate(entry.description)}</p>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<div class="mt-4 flex items-center gap-1 text-sm font-medium text-primary" data-v-09aa322c${_scopeId3}><span data-v-09aa322c${_scopeId3}>Devamını Oku</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-09aa322c${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-09aa322c${_scopeId3}></path></svg></div></div>`);
                            } else {
                              return [
                                entry.image ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "aspect-video overflow-hidden"
                                }, [
                                  createVNode("img", {
                                    src: `/storage/${entry.image}`,
                                    alt: entry.title,
                                    class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  }, null, 8, ["src", "alt"])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "p-5" }, [
                                  createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                                    createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-3.5 w-3.5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        })
                                      ])),
                                      createTextVNode(" " + toDisplayString(formatDate(entry.entry_date)), 1)
                                    ]),
                                    entry.status === "draft" ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"
                                    }, " Taslak ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h2", { class: "mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(entry.title), 1),
                                  entry.description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "line-clamp-3 text-sm leading-relaxed text-muted-foreground"
                                  }, toDisplayString(entry.description), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-4 flex items-center gap-1 text-sm font-medium text-primary" }, [
                                    createVNode("span", null, "Devamını Oku"),
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ]))
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      });
                      _push3(`<!--]--></div></div>`);
                    });
                    _push3(`<!--]--></div><div class="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" data-v-09aa322c${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<div class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center" data-v-09aa322c${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-09aa322c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-09aa322c${_scopeId2}></path></svg><h3 class="mb-2 text-lg font-medium text-foreground" data-v-09aa322c${_scopeId2}>Henüz yolculuk kaydı yok</h3><p class="text-sm text-muted-foreground" data-v-09aa322c${_scopeId2}>Yolculuk kayıtları eklendiğinde burada görünecek.</p></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "mx-auto max-w-4xl py-8" }, [
                      createVNode("div", { class: "mb-12 text-center" }, [
                        createVNode("h1", { class: "mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl" }, " Yolculuk "),
                        createVNode("p", { class: "mx-auto max-w-2xl text-lg text-muted-foreground" }, " Zamanda bir yolculuk. Anılar, deneyimler ve öğrenilenler... ")
                      ]),
                      __props.entries.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative"
                      }, [
                        createVNode("div", { class: "timeline-container" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(groupedEntries.value, (yearEntries, year) => {
                            return openBlock(), createBlock("div", {
                              key: year,
                              class: "year-section mb-16"
                            }, [
                              createVNode("div", { class: "year-marker mb-8 flex items-center justify-center" }, [
                                createVNode("div", { class: "flex h-12 w-24 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg" }, toDisplayString(year), 1)
                              ]),
                              createVNode("div", { class: "space-y-8" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(yearEntries, (entry, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: ["entry-card group relative", index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]"]
                                  }, [
                                    createVNode("div", { class: "absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" }),
                                    createVNode(unref(Link), {
                                      href: `/journey/${entry.id}`,
                                      class: "block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                                    }, {
                                      default: withCtx(() => [
                                        entry.image ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "aspect-video overflow-hidden"
                                        }, [
                                          createVNode("img", {
                                            src: `/storage/${entry.image}`,
                                            alt: entry.title,
                                            class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                          }, null, 8, ["src", "alt"])
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", { class: "p-5" }, [
                                          createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                                            createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" }, [
                                              (openBlock(), createBlock("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                class: "h-3.5 w-3.5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor"
                                              }, [
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                })
                                              ])),
                                              createTextVNode(" " + toDisplayString(formatDate(entry.entry_date)), 1)
                                            ]),
                                            entry.status === "draft" ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"
                                            }, " Taslak ")) : createCommentVNode("", true)
                                          ]),
                                          createVNode("h2", { class: "mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(entry.title), 1),
                                          entry.description ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "line-clamp-3 text-sm leading-relaxed text-muted-foreground"
                                          }, toDisplayString(entry.description), 1)) : createCommentVNode("", true),
                                          createVNode("div", { class: "mt-4 flex items-center gap-1 text-sm font-medium text-primary" }, [
                                            createVNode("span", null, "Devamını Oku"),
                                            (openBlock(), createBlock("svg", {
                                              xmlns: "http://www.w3.org/2000/svg",
                                              class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                                              fill: "none",
                                              viewBox: "0 0 24 24",
                                              stroke: "currentColor"
                                            }, [
                                              createVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M9 5l7 7-7 7"
                                              })
                                            ]))
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ], 2);
                                }), 128))
                              ])
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "rounded-xl border border-dashed border-border bg-card/50 py-16 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mx-auto mb-4 h-16 w-16 text-muted-foreground/30",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "1",
                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("h3", { class: "mb-2 text-lg font-medium text-foreground" }, "Henüz yolculuk kaydı yok"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Yolculuk kayıtları eklendiğinde burada görünecek.")
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "mx-auto max-w-4xl py-8" }, [
                    createVNode("div", { class: "mb-12 text-center" }, [
                      createVNode("h1", { class: "mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl" }, " Yolculuk "),
                      createVNode("p", { class: "mx-auto max-w-2xl text-lg text-muted-foreground" }, " Zamanda bir yolculuk. Anılar, deneyimler ve öğrenilenler... ")
                    ]),
                    __props.entries.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "relative"
                    }, [
                      createVNode("div", { class: "timeline-container" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(groupedEntries.value, (yearEntries, year) => {
                          return openBlock(), createBlock("div", {
                            key: year,
                            class: "year-section mb-16"
                          }, [
                            createVNode("div", { class: "year-marker mb-8 flex items-center justify-center" }, [
                              createVNode("div", { class: "flex h-12 w-24 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg" }, toDisplayString(year), 1)
                            ]),
                            createVNode("div", { class: "space-y-8" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(yearEntries, (entry, index) => {
                                return openBlock(), createBlock("div", {
                                  key: entry.id,
                                  class: ["entry-card group relative", index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]"]
                                }, [
                                  createVNode("div", { class: "absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" }),
                                  createVNode(unref(Link), {
                                    href: `/journey/${entry.id}`,
                                    class: "block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                                  }, {
                                    default: withCtx(() => [
                                      entry.image ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "aspect-video overflow-hidden"
                                      }, [
                                        createVNode("img", {
                                          src: `/storage/${entry.image}`,
                                          alt: entry.title,
                                          class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        }, null, 8, ["src", "alt"])
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", { class: "p-5" }, [
                                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                                          createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" }, [
                                            (openBlock(), createBlock("svg", {
                                              xmlns: "http://www.w3.org/2000/svg",
                                              class: "h-3.5 w-3.5",
                                              fill: "none",
                                              viewBox: "0 0 24 24",
                                              stroke: "currentColor"
                                            }, [
                                              createVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                              })
                                            ])),
                                            createTextVNode(" " + toDisplayString(formatDate(entry.entry_date)), 1)
                                          ]),
                                          entry.status === "draft" ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"
                                          }, " Taslak ")) : createCommentVNode("", true)
                                        ]),
                                        createVNode("h2", { class: "mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(entry.title), 1),
                                        entry.description ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "line-clamp-3 text-sm leading-relaxed text-muted-foreground"
                                        }, toDisplayString(entry.description), 1)) : createCommentVNode("", true),
                                        createVNode("div", { class: "mt-4 flex items-center gap-1 text-sm font-medium text-primary" }, [
                                          createVNode("span", null, "Devamını Oku"),
                                          (openBlock(), createBlock("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor"
                                          }, [
                                            createVNode("path", {
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round",
                                              "stroke-width": "2",
                                              d: "M9 5l7 7-7 7"
                                            })
                                          ]))
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ], 2);
                              }), 128))
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "rounded-xl border border-dashed border-border bg-card/50 py-16 text-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "mx-auto mb-4 h-16 w-16 text-muted-foreground/30",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1",
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("h3", { class: "mb-2 text-lg font-medium text-foreground" }, "Henüz yolculuk kaydı yok"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Yolculuk kayıtları eklendiğinde burada görünecek.")
                    ]))
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/IndexJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndexJourney = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-09aa322c"]]);
export {
  IndexJourney as default
};
