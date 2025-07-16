import { ref, computed, onMounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import gsap from "gsap";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const category = ref(props.category || {});
    const writes = ref(props.writes || []);
    const auth = props.auth;
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const isLoading = ref(true);
    const isLoadingMore = ref(false);
    const page = ref(1);
    const hasMore = ref(true);
    const observerTarget = ref(null);
    const filteredWrites = computed(() => {
      if (auth.user) {
        return writes.value;
      } else {
        return writes.value.filter((write) => write.status === "published");
      }
    });
    const loadMore = async () => {
      if (isLoadingMore.value || !hasMore.value) return;
      isLoadingMore.value = true;
      page.value++;
      try {
        const response = await fetch(
          route("api.categories.writes", {
            category: category.value.id,
            page: page.value
          })
        );
        const data = await response.json();
        if (data.writes.length === 0) {
          hasMore.value = false;
        } else {
          writes.value.push(...data.writes);
        }
      } catch (error) {
        console.error("Error loading more writes:", error);
      } finally {
        isLoadingMore.value = false;
      }
    };
    const setupInfiniteScroll = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoadingMore.value && hasMore.value) {
            loadMore();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1
        }
      );
      if (observerTarget.value) {
        observer.observe(observerTarget.value);
      }
      return () => {
        if (observerTarget.value) {
          observer.unobserve(observerTarget.value);
        }
      };
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const animateSkeleton = () => {
      const skeletons = document.querySelectorAll(".skeleton");
      gsap.to(skeletons, {
        opacity: 0.5,
        duration: 0.8,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    };
    onMounted(() => {
      animateSkeleton();
      setTimeout(() => {
        isLoading.value = false;
      }, 800);
      setupInfiniteScroll();
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200" data-v-fe7782f5${_scopeId}><div class="card-body p-4 sm:p-6" data-v-fe7782f5${_scopeId}><div class="mb-2 sm:mb-4" data-v-fe7782f5${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<div class="skeleton-wrapper" data-v-fe7782f5${_scopeId}><div class="skeleton h-8 w-3/4 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="mt-2" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-24 rounded-lg" data-v-fe7782f5${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!--[--><h1 class="line-clamp-2 break-words text-xl font-bold sm:text-2xl" data-v-fe7782f5${_scopeId}>${ssrInterpolate(category.value.name)}</h1><div class="mt-2" data-v-fe7782f5${_scopeId}>`);
              if (category.value.description) {
                _push2(`<span class="badge badge-outline line-clamp-1 text-xs" data-v-fe7782f5${_scopeId}>${ssrInterpolate(category.value.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div>`);
            if (unref(auth).user && !isLoading.value) {
              _push2(`<div class="mb-4 flex justify-end gap-2" data-v-fe7782f5${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.edit", category.value.id),
                class: "btn btn-ghost btn-sm text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-fe7782f5${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-fe7782f5${_scopeId2}></path></svg> Düzenle `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        })
                      ])),
                      createTextVNode(" Düzenle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button class="btn btn-ghost btn-sm text-xs text-error" data-v-fe7782f5${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-fe7782f5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-fe7782f5${_scopeId}></path></svg> Sil </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-v-fe7782f5${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<div class="card h-[200px] border border-base-200 bg-base-100 shadow-md" data-v-fe7782f5${_scopeId}><div class="card-body p-4" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-3/4 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="mt-2 space-y-2" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-full rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-lg" data-v-fe7782f5${_scopeId}></div></div><div class="mt-4 flex gap-2" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-fe7782f5${_scopeId}>`);
              if (writes.value.length > 0) {
                _push2(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-v-fe7782f5${_scopeId}><!--[-->`);
                ssrRenderList(filteredWrites.value, (write) => {
                  _push2(`<div class="card h-[200px] border border-base-200 bg-base-100 shadow-md" data-v-fe7782f5${_scopeId}><div class="card-body p-4" data-v-fe7782f5${_scopeId}><h2 class="card-title line-clamp-2 text-base" data-v-fe7782f5${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("writes.show", write.slug),
                    class: "hover:text-primary"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(write.title)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(write.title), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</h2><p class="text-base-content/70 mt-2 line-clamp-2 text-sm" data-v-fe7782f5${_scopeId}>${ssrInterpolate(write.summary)}</p><div class="text-base-content/70 mt-4 flex flex-wrap items-center gap-2 text-xs" data-v-fe7782f5${_scopeId}><span class="flex items-center gap-1" data-v-fe7782f5${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" data-v-fe7782f5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-fe7782f5${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-fe7782f5${_scopeId}></path></svg> ${ssrInterpolate(write.views_count)}</span><span class="whitespace-nowrap" data-v-fe7782f5${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span>`);
                  if (write.updated_at !== write.created_at) {
                    _push2(`<span class="whitespace-nowrap" data-v-fe7782f5${_scopeId}> Son güncelleme: ${ssrInterpolate(formatDate(write.updated_at))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="alert alert-info" data-v-fe7782f5${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 stroke-current" data-v-fe7782f5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-fe7782f5${_scopeId}></path></svg><span data-v-fe7782f5${_scopeId}>Bu kategoride henüz yazı bulunmuyor.</span></div>`);
              }
              if (isLoadingMore.value) {
                _push2(`<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-v-fe7782f5${_scopeId}><!--[-->`);
                ssrRenderList(3, (i) => {
                  _push2(`<div class="card h-[200px] border border-base-200 bg-base-100 shadow-md" data-v-fe7782f5${_scopeId}><div class="card-body p-4" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-3/4 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="mt-2 space-y-2" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-full rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-lg" data-v-fe7782f5${_scopeId}></div></div><div class="mt-4 flex gap-2" data-v-fe7782f5${_scopeId}><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div><div class="skeleton h-4 w-16 rounded-lg" data-v-fe7782f5${_scopeId}></div></div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasMore.value) {
                _push2(`<div class="h-4 w-full" data-v-fe7782f5${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "card border border-base-200 bg-base-100 shadow-md transition-all duration-200" }, [
                createVNode("div", { class: "card-body p-4 sm:p-6" }, [
                  createVNode("div", { class: "mb-2 sm:mb-4" }, [
                    isLoading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "skeleton-wrapper"
                    }, [
                      createVNode("div", { class: "skeleton h-8 w-3/4 rounded-lg" }),
                      createVNode("div", { class: "mt-2" }, [
                        createVNode("div", { class: "skeleton h-4 w-24 rounded-lg" })
                      ])
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("h1", { class: "line-clamp-2 break-words text-xl font-bold sm:text-2xl" }, toDisplayString(category.value.name), 1),
                      createVNode("div", { class: "mt-2" }, [
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "badge badge-outline line-clamp-1 text-xs"
                        }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                      ])
                    ], 64))
                  ]),
                  unref(auth).user && !isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 flex justify-end gap-2"
                  }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("categories.edit", category.value.id),
                      class: "btn btn-ghost btn-sm text-xs"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      onClick: ($event) => _ctx.deleteCategory(category.value.id),
                      class: "btn btn-ghost btn-sm text-xs text-error"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        })
                      ])),
                      createTextVNode(" Sil ")
                    ], 8, ["onClick"])
                  ])) : createCommentVNode("", true),
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "card h-[200px] border border-base-200 bg-base-100 shadow-md"
                      }, [
                        createVNode("div", { class: "card-body p-4" }, [
                          createVNode("div", { class: "skeleton h-4 w-3/4 rounded-lg" }),
                          createVNode("div", { class: "mt-2 space-y-2" }, [
                            createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                            createVNode("div", { class: "skeleton h-4 w-5/6 rounded-lg" })
                          ]),
                          createVNode("div", { class: "mt-4 flex gap-2" }, [
                            createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" }),
                            createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" }),
                            createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" })
                          ])
                        ])
                      ]);
                    }), 64))
                  ])) : (openBlock(), createBlock("div", { key: 2 }, [
                    writes.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredWrites.value, (write) => {
                        return openBlock(), createBlock("div", {
                          key: write.id,
                          class: "card h-[200px] border border-base-200 bg-base-100 shadow-md"
                        }, [
                          createVNode("div", { class: "card-body p-4" }, [
                            createVNode("h2", { class: "card-title line-clamp-2 text-base" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("writes.show", write.slug),
                                class: "hover:text-primary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(write.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", { class: "text-base-content/70 mt-2 line-clamp-2 text-sm" }, toDisplayString(write.summary), 1),
                            createVNode("div", { class: "text-base-content/70 mt-4 flex flex-wrap items-center gap-2 text-xs" }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3.5 w-3.5"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(write.views_count), 1)
                              ]),
                              createVNode("span", { class: "whitespace-nowrap" }, toDisplayString(formatDate(write.created_at)), 1),
                              write.updated_at !== write.created_at ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "whitespace-nowrap"
                              }, " Son güncelleme: " + toDisplayString(formatDate(write.updated_at)), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-info"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        class: "h-5 w-5 shrink-0 stroke-current"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, "Bu kategoride henüz yazı bulunmuyor.")
                    ])),
                    isLoadingMore.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "card h-[200px] border border-base-200 bg-base-100 shadow-md"
                        }, [
                          createVNode("div", { class: "card-body p-4" }, [
                            createVNode("div", { class: "skeleton h-4 w-3/4 rounded-lg" }),
                            createVNode("div", { class: "mt-2 space-y-2" }, [
                              createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                              createVNode("div", { class: "skeleton h-4 w-5/6 rounded-lg" })
                            ]),
                            createVNode("div", { class: "mt-4 flex gap-2" }, [
                              createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" }),
                              createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" }),
                              createVNode("div", { class: "skeleton h-4 w-16 rounded-lg" })
                            ])
                          ])
                        ]);
                      }), 64))
                    ])) : createCommentVNode("", true),
                    hasMore.value ? (openBlock(), createBlock("div", {
                      key: 3,
                      ref_key: "observerTarget",
                      ref: observerTarget,
                      class: "h-4 w-full"
                    }, null, 512)) : createCommentVNode("", true)
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe7782f5"]]);
export {
  Screen as default
};
