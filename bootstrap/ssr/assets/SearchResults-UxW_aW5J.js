import { withCtx, unref, createBlock, createVNode, openBlock, toDisplayString, createCommentVNode, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-D7wS2WRo.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutWrite-DyLAN1QU.js";
import "./WriteList-Dj89nwyn.js";
import "vuex";
import "./IconCalendar-BeMkwtmn.js";
import "./IconEye-C4IDtysD.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./useSidebar-D-dtiIC8.js";
import "./IconMenu-D3qnKg3d.js";
import "./IconFolder-BMytUC2M.js";
import "./IconX-B1Q85S0Q.js";
import "./IconFilter-Cx1-Qiq_.js";
import "./SidebarLayoutCategory-o5wj5qLo.js";
import "./CategoryTree-C9itHmTT.js";
import "./IconChevronDown-ClwhHkE5.js";
import "./FlashMessage-C3JOGPFR.js";
const _sfc_main = {
  __name: "SearchResults",
  __ssrInlineRender: true,
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    articles: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      default: () => []
    },
    screen: {
      type: Object,
      default: () => ({})
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const highlightText = (text) => {
      if (!text || !props.searchQuery) return text;
      const query = props.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${query})`, "gi");
      const highlightClass = "bg-primary/20 text-primary font-medium px-0.5 rounded";
      return text.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-8"${_scopeId2}><div class="mb-8"${_scopeId2}><h1 class="text-3xl font-bold text-foreground"${_scopeId2}>Arama Sonuçları</h1><p class="mt-2 text-lg text-muted-foreground"${_scopeId2}> &quot;<span class="font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(__props.searchQuery)}</span>&quot; için <span class="font-semibold text-primary"${_scopeId2}>${ssrInterpolate(__props.articles.total)}</span> yazı ve <span class="font-semibold text-primary"${_scopeId2}>${ssrInterpolate(__props.categories.length)}</span> kategori bulundu </p></div>`);
                  if (__props.categories.length > 0) {
                    _push3(`<div class="mb-8"${_scopeId2}><h2 class="mb-4 text-xl font-semibold text-foreground"${_scopeId2}>Kategoriler</h2><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.categories, (category) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: category.id,
                        href: category.url,
                        class: "flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:bg-accent"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"${_scopeId3}></path></svg><span class="truncate text-sm font-medium text-card-foreground"${_scopeId3}>${ssrInterpolate(category.name)}</span>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-5 w-5 flex-shrink-0 text-primary",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                })
                              ])),
                              createVNode("span", { class: "truncate text-sm font-medium text-card-foreground" }, toDisplayString(category.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div${_scopeId2}><h2 class="mb-4 text-xl font-semibold text-foreground"${_scopeId2}>Yazılar</h2>`);
                  if (__props.articles.data.length === 0) {
                    _push3(`<div class="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId2}></path></svg><h3 class="mb-2 text-lg font-semibold text-foreground"${_scopeId2}>Sonuç Bulunamadı</h3><p class="text-sm text-muted-foreground"${_scopeId2}> &quot;${ssrInterpolate(__props.searchQuery)}&quot; için hiçbir yazı bulunamadı. Farklı anahtar kelimeler deneyin. </p></div>`);
                  } else {
                    _push3(`<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.articles.data, (article) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: article.id,
                        href: article.url,
                        class: "group flex flex-col rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex flex-1 flex-col p-6"${_scopeId3}>`);
                            if (article.category) {
                              _push4(`<div class="mb-3"${_scopeId3}><span class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"${_scopeId3}>${ssrInterpolate(article.category.name)}</span></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<h3 class="mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary"${_scopeId3}>${highlightText(article.title) ?? ""}</h3><p class="mb-4 line-clamp-3 text-sm text-muted-foreground"${_scopeId3}>${highlightText(article.excerpt) ?? ""}</p><div class="mt-auto flex items-center justify-between text-xs text-muted-foreground"${_scopeId3}>`);
                            if (article.published_at) {
                              _push4(`<span${_scopeId3}>${ssrInterpolate(formatDate(article.published_at))}</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<span class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100"${_scopeId3}> Devamını Oku <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"${_scopeId3}></path></svg></span></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex flex-1 flex-col p-6" }, [
                                article.category ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-3"
                                }, [
                                  createVNode("span", { class: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary" }, toDisplayString(article.category.name), 1)
                                ])) : createCommentVNode("", true),
                                createVNode("h3", {
                                  class: "mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary",
                                  innerHTML: highlightText(article.title)
                                }, null, 8, ["innerHTML"]),
                                createVNode("p", {
                                  class: "mb-4 line-clamp-3 text-sm text-muted-foreground",
                                  innerHTML: highlightText(article.excerpt)
                                }, null, 8, ["innerHTML"]),
                                createVNode("div", { class: "mt-auto flex items-center justify-between text-xs text-muted-foreground" }, [
                                  article.published_at ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(article.published_at)), 1)) : createCommentVNode("", true),
                                  createVNode("span", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                                    createTextVNode(" Devamını Oku "),
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
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ]))
                                  ])
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  }
                  if (__props.articles.data.length > 0 && (__props.articles.prev_page_url || __props.articles.next_page_url)) {
                    _push3(`<div class="mt-8 flex items-center justify-center gap-2"${_scopeId2}>`);
                    if (__props.articles.prev_page_url) {
                      _push3(ssrRenderComponent(unref(Link), {
                        href: __props.articles.prev_page_url,
                        class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"${_scopeId3}></path></svg> Önceki `);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ])),
                              createTextVNode(" Önceki ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<span class="text-sm text-muted-foreground"${_scopeId2}> Sayfa ${ssrInterpolate(__props.articles.current_page)} / ${ssrInterpolate(__props.articles.last_page)}</span>`);
                    if (__props.articles.next_page_url) {
                      _push3(ssrRenderComponent(unref(Link), {
                        href: __props.articles.next_page_url,
                        class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Sonraki <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              createTextVNode(" Sonraki "),
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "ml-2 h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-8" }, [
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("h1", { class: "text-3xl font-bold text-foreground" }, "Arama Sonuçları"),
                        createVNode("p", { class: "mt-2 text-lg text-muted-foreground" }, [
                          createTextVNode(' "'),
                          createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.searchQuery), 1),
                          createTextVNode('" için '),
                          createVNode("span", { class: "font-semibold text-primary" }, toDisplayString(__props.articles.total), 1),
                          createTextVNode(" yazı ve "),
                          createVNode("span", { class: "font-semibold text-primary" }, toDisplayString(__props.categories.length), 1),
                          createTextVNode(" kategori bulundu ")
                        ])
                      ]),
                      __props.categories.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-8"
                      }, [
                        createVNode("h2", { class: "mb-4 text-xl font-semibold text-foreground" }, "Kategoriler"),
                        createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: category.id,
                              href: category.url,
                              class: "flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:bg-accent"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-5 w-5 flex-shrink-0 text-primary",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                  })
                                ])),
                                createVNode("span", { class: "truncate text-sm font-medium text-card-foreground" }, toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("h2", { class: "mb-4 text-xl font-semibold text-foreground" }, "Yazılar"),
                        __props.articles.data.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "mb-4 h-16 w-16 text-muted-foreground",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "1.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            })
                          ])),
                          createVNode("h3", { class: "mb-2 text-lg font-semibold text-foreground" }, "Sonuç Bulunamadı"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, ' "' + toDisplayString(__props.searchQuery) + '" için hiçbir yazı bulunamadı. Farklı anahtar kelimeler deneyin. ', 1)
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: article.id,
                              href: article.url,
                              class: "group flex flex-col rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-1 flex-col p-6" }, [
                                  article.category ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mb-3"
                                  }, [
                                    createVNode("span", { class: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary" }, toDisplayString(article.category.name), 1)
                                  ])) : createCommentVNode("", true),
                                  createVNode("h3", {
                                    class: "mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary",
                                    innerHTML: highlightText(article.title)
                                  }, null, 8, ["innerHTML"]),
                                  createVNode("p", {
                                    class: "mb-4 line-clamp-3 text-sm text-muted-foreground",
                                    innerHTML: highlightText(article.excerpt)
                                  }, null, 8, ["innerHTML"]),
                                  createVNode("div", { class: "mt-auto flex items-center justify-between text-xs text-muted-foreground" }, [
                                    article.published_at ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(article.published_at)), 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                                      createTextVNode(" Devamını Oku "),
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
                                          d: "M9 5l7 7-7 7"
                                        })
                                      ]))
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128))
                        ])),
                        __props.articles.data.length > 0 && (__props.articles.prev_page_url || __props.articles.next_page_url) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-8 flex items-center justify-center gap-2"
                        }, [
                          __props.articles.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: __props.articles.prev_page_url,
                            class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M15 19l-7-7 7-7"
                                })
                              ])),
                              createTextVNode(" Önceki ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, " Sayfa " + toDisplayString(__props.articles.current_page) + " / " + toDisplayString(__props.articles.last_page), 1),
                          __props.articles.next_page_url ? (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            href: __props.articles.next_page_url,
                            class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Sonraki "),
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "ml-2 h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
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
                  createVNode("div", { class: "py-8" }, [
                    createVNode("div", { class: "mb-8" }, [
                      createVNode("h1", { class: "text-3xl font-bold text-foreground" }, "Arama Sonuçları"),
                      createVNode("p", { class: "mt-2 text-lg text-muted-foreground" }, [
                        createTextVNode(' "'),
                        createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.searchQuery), 1),
                        createTextVNode('" için '),
                        createVNode("span", { class: "font-semibold text-primary" }, toDisplayString(__props.articles.total), 1),
                        createTextVNode(" yazı ve "),
                        createVNode("span", { class: "font-semibold text-primary" }, toDisplayString(__props.categories.length), 1),
                        createTextVNode(" kategori bulundu ")
                      ])
                    ]),
                    __props.categories.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-8"
                    }, [
                      createVNode("h2", { class: "mb-4 text-xl font-semibold text-foreground" }, "Kategoriler"),
                      createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: category.id,
                            href: category.url,
                            class: "flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:bg-accent"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-5 w-5 flex-shrink-0 text-primary",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                })
                              ])),
                              createVNode("span", { class: "truncate text-sm font-medium text-card-foreground" }, toDisplayString(category.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("h2", { class: "mb-4 text-xl font-semibold text-foreground" }, "Yazılar"),
                      __props.articles.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mb-4 h-16 w-16 text-muted-foreground",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "1.5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          })
                        ])),
                        createVNode("h3", { class: "mb-2 text-lg font-semibold text-foreground" }, "Sonuç Bulunamadı"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, ' "' + toDisplayString(__props.searchQuery) + '" için hiçbir yazı bulunamadı. Farklı anahtar kelimeler deneyin. ', 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: article.id,
                            href: article.url,
                            class: "group flex flex-col rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-1 flex-col p-6" }, [
                                article.category ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-3"
                                }, [
                                  createVNode("span", { class: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary" }, toDisplayString(article.category.name), 1)
                                ])) : createCommentVNode("", true),
                                createVNode("h3", {
                                  class: "mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary",
                                  innerHTML: highlightText(article.title)
                                }, null, 8, ["innerHTML"]),
                                createVNode("p", {
                                  class: "mb-4 line-clamp-3 text-sm text-muted-foreground",
                                  innerHTML: highlightText(article.excerpt)
                                }, null, 8, ["innerHTML"]),
                                createVNode("div", { class: "mt-auto flex items-center justify-between text-xs text-muted-foreground" }, [
                                  article.published_at ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(article.published_at)), 1)) : createCommentVNode("", true),
                                  createVNode("span", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                                    createTextVNode(" Devamını Oku "),
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
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ]))
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 128))
                      ])),
                      __props.articles.data.length > 0 && (__props.articles.prev_page_url || __props.articles.next_page_url) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-8 flex items-center justify-center gap-2"
                      }, [
                        __props.articles.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.articles.prev_page_url,
                          class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "mr-2 h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M15 19l-7-7 7-7"
                              })
                            ])),
                            createTextVNode(" Önceki ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, " Sayfa " + toDisplayString(__props.articles.current_page) + " / " + toDisplayString(__props.articles.last_page), 1),
                        __props.articles.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.articles.next_page_url,
                          class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Sonraki "),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "ml-2 h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/SearchResults.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
