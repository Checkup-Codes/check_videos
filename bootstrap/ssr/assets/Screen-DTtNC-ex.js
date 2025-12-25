import { computed, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    allBookmarks: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const page = usePage();
    const props = __props;
    const displayBookmarks = computed(() => props.allBookmarks || []);
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const currentUser = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.user) || null;
    });
    const canEdit = (bookmark) => {
      if (!currentUser.value) return false;
      return bookmark.user_id === currentUser.value.id;
    };
    const showTooltip = ref(null);
    const selectedCategory = computed(() => {
      const url = page.url;
      const urlObj = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");
      const categoryId = urlObj.searchParams.get("category");
      if (!categoryId) return null;
      return props.categories.find((cat) => cat.id === categoryId) || null;
    });
    const getDomain = (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
      } catch {
        return url;
      }
    };
    const handleImageError = (event) => {
      event.target.style.display = "none";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-7xl px-4 py-8" data-v-89e80c39${_scopeId}><div class="mb-8 flex items-center justify-between" data-v-89e80c39${_scopeId}><div data-v-89e80c39${_scopeId}><h1 class="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-v-89e80c39${_scopeId}>Yer İmleri</h1>`);
            if (selectedCategory.value) {
              _push2(`<p class="text-sm text-muted-foreground" data-v-89e80c39${_scopeId}>${ssrInterpolate(selectedCategory.value.name)} kategorisindeki yer imleri </p>`);
            } else {
              _push2(`<p class="text-sm text-muted-foreground" data-v-89e80c39${_scopeId}>Tüm yer imleriniz</p>`);
            }
            _push2(`</div></div>`);
            if (displayBookmarks.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 gap-4 md:grid-cols-2" data-v-89e80c39${_scopeId}><!--[-->`);
              ssrRenderList(displayBookmarks.value, (bookmark) => {
                _push2(`<div class="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md" data-v-89e80c39${_scopeId}>`);
                if (bookmark.preview_image) {
                  _push2(`<div class="aspect-video w-full overflow-hidden bg-muted" data-v-89e80c39${_scopeId}><img${ssrRenderAttr("src", bookmark.preview_image)}${ssrRenderAttr("alt", bookmark.name)} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" data-v-89e80c39${_scopeId}></div>`);
                } else {
                  _push2(`<div class="flex aspect-video items-center justify-center bg-muted" data-v-89e80c39${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-89e80c39${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" data-v-89e80c39${_scopeId}></path></svg></div>`);
                }
                if (isLoggedIn.value && canEdit(bookmark)) {
                  _push2(`<div class="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" data-v-89e80c39${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: `/bookmarks/${bookmark.id}/edit`,
                    class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-89e80c39${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-89e80c39${_scopeId2}></path></svg> Düzenle `);
                      } else {
                        return [
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Düzenle ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="p-4" data-v-89e80c39${_scopeId}><div class="mb-2 flex items-center gap-2" data-v-89e80c39${_scopeId}><h3 class="line-clamp-2 flex-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary"${ssrRenderAttr("title", bookmark.name)} data-v-89e80c39${_scopeId}>${ssrInterpolate(bookmark.name)}</h3>`);
                if (bookmark.my_comment) {
                  _push2(`<div class="group/comment relative flex-shrink-0" data-v-89e80c39${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-help text-muted-foreground transition-colors hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-89e80c39${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-89e80c39${_scopeId}></path></svg>`);
                  if (showTooltip.value === bookmark.id) {
                    _push2(`<div class="absolute bottom-full right-0 z-20 mb-2 w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg" data-v-89e80c39${_scopeId}><div class="mb-1 font-semibold" data-v-89e80c39${_scopeId}>Yorumum:</div><div class="whitespace-pre-wrap" data-v-89e80c39${_scopeId}>${ssrInterpolate(bookmark.my_comment)}</div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (bookmark.description) {
                  _push2(`<p class="mb-2 line-clamp-2 text-sm text-muted-foreground" data-v-89e80c39${_scopeId}>${ssrInterpolate(bookmark.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center justify-between gap-2" data-v-89e80c39${_scopeId}><a${ssrRenderAttr("href", bookmark.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80" data-v-89e80c39${_scopeId}><span data-v-89e80c39${_scopeId}>${ssrInterpolate(getDomain(bookmark.link))}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-89e80c39${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-89e80c39${_scopeId}></path></svg></a><div class="flex items-center gap-2" data-v-89e80c39${_scopeId}>`);
                if (bookmark.extended_comment_link) {
                  _push2(`<a${ssrRenderAttr("href", bookmark.extended_comment_link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" title="Detaylı yorumu görüntüle" data-v-89e80c39${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-89e80c39${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-89e80c39${_scopeId}></path></svg> Detay </a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (bookmark.category) {
                  _push2(`<span class="text-xs text-muted-foreground" data-v-89e80c39${_scopeId}>${ssrInterpolate(bookmark.category.name)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center" data-v-89e80c39${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-89e80c39${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-v-89e80c39${_scopeId}></path></svg><h3 class="mb-2 text-lg font-medium text-foreground" data-v-89e80c39${_scopeId}>Henüz yer imi yok</h3><p class="mb-4 text-sm text-muted-foreground" data-v-89e80c39${_scopeId}>İlk yer iminizi ekleyerek başlayın.</p>`);
              if (isLoggedIn.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: "/bookmarks/create",
                  class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-89e80c39${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-89e80c39${_scopeId2}></path></svg> Yeni Yer İmi `);
                    } else {
                      return [
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
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Yeni Yer İmi ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8" }, [
                createVNode("div", { class: "mb-8 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" }, "Yer İmleri"),
                    selectedCategory.value ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-muted-foreground"
                    }, toDisplayString(selectedCategory.value.name) + " kategorisindeki yer imleri ", 1)) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-sm text-muted-foreground"
                    }, "Tüm yer imleriniz"))
                  ])
                ]),
                displayBookmarks.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid grid-cols-1 gap-4 md:grid-cols-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(displayBookmarks.value, (bookmark) => {
                    return openBlock(), createBlock("div", {
                      key: bookmark.id,
                      class: "group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                    }, [
                      bookmark.preview_image ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "aspect-video w-full overflow-hidden bg-muted"
                      }, [
                        createVNode("img", {
                          src: bookmark.preview_image,
                          alt: bookmark.name,
                          class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
                          onError: handleImageError
                        }, null, 40, ["src", "alt"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex aspect-video items-center justify-center bg-muted"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-12 w-12 text-muted-foreground/30",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "1",
                            d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          })
                        ]))
                      ])),
                      isLoggedIn.value && canEdit(bookmark) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      }, [
                        createVNode(unref(Link), {
                          href: `/bookmarks/${bookmark.id}/edit`,
                          class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        }, {
                          default: withCtx(() => [
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
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              })
                            ])),
                            createTextVNode(" Düzenle ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "p-4" }, [
                        createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                          createVNode("h3", {
                            class: "line-clamp-2 flex-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary",
                            title: bookmark.name
                          }, toDisplayString(bookmark.name), 9, ["title"]),
                          bookmark.my_comment ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "group/comment relative flex-shrink-0",
                            onMouseenter: ($event) => showTooltip.value = bookmark.id,
                            onMouseleave: ($event) => showTooltip.value = null
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4 cursor-help text-muted-foreground transition-colors hover:text-primary",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              })
                            ])),
                            showTooltip.value === bookmark.id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute bottom-full right-0 z-20 mb-2 w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg"
                            }, [
                              createVNode("div", { class: "mb-1 font-semibold" }, "Yorumum:"),
                              createVNode("div", { class: "whitespace-pre-wrap" }, toDisplayString(bookmark.my_comment), 1)
                            ])) : createCommentVNode("", true)
                          ], 40, ["onMouseenter", "onMouseleave"])) : createCommentVNode("", true)
                        ]),
                        bookmark.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mb-2 line-clamp-2 text-sm text-muted-foreground"
                        }, toDisplayString(bookmark.description), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                          createVNode("a", {
                            href: bookmark.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            class: "inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80"
                          }, [
                            createVNode("span", null, toDisplayString(getDomain(bookmark.link)), 1),
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
                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              })
                            ]))
                          ], 8, ["href"]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            bookmark.extended_comment_link ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: bookmark.extended_comment_link,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              class: "inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                              title: "Detaylı yorumu görüntüle"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3 w-3",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                })
                              ])),
                              createTextVNode(" Detay ")
                            ], 8, ["href"])) : createCommentVNode("", true),
                            bookmark.category ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-xs text-muted-foreground"
                            }, toDisplayString(bookmark.category.name), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
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
                      d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    })
                  ])),
                  createVNode("h3", { class: "mb-2 text-lg font-medium text-foreground" }, "Henüz yer imi yok"),
                  createVNode("p", { class: "mb-4 text-sm text-muted-foreground" }, "İlk yer iminizi ekleyerek başlayın."),
                  isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: "/bookmarks/create",
                    class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  }, {
                    default: withCtx(() => [
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
                          d: "M12 4v16m8-8H4"
                        })
                      ])),
                      createTextVNode(" Yeni Yer İmi ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-89e80c39"]]);
export {
  Screen as default
};
