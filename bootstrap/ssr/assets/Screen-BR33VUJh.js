import { ref, computed, watch, onMounted, onUnmounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const perPage = 10;
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
    const statusFilter = ref("all");
    const page = ref(1);
    const isLoadingMore = ref(false);
    const hasMore = ref(true);
    const filteredWrites = computed(() => {
      let filtered = writes.value || [];
      if (statusFilter.value !== "all") {
        filtered = filtered.filter((write) => write.status === statusFilter.value);
      }
      return filtered;
    });
    const paginatedWrites = computed(() => {
      const filtered = filteredWrites.value;
      return filtered.slice(0, page.value * perPage);
    });
    const loadMore = async () => {
      if (isLoadingMore.value || !hasMore.value) return;
      isLoadingMore.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      page.value++;
      const totalFiltered = filteredWrites.value.length;
      const currentLoaded = page.value * perPage;
      if (currentLoaded >= totalFiltered) {
        hasMore.value = false;
      }
      isLoadingMore.value = false;
    };
    watch([statusFilter], () => {
      page.value = 1;
      hasMore.value = true;
    });
    const clearFilters = () => {
      statusFilter.value = "all";
      page.value = 1;
      hasMore.value = true;
    };
    const formatNumber = (num) => {
      if (!num) return "0";
      return new Intl.NumberFormat("tr-TR").format(num);
    };
    const formatDateMobile = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusText = (status) => {
      const statusMap = {
        published: "Yayında",
        draft: "Taslak",
        private: "Gizli",
        link_only: "Dış Bağlantı"
      };
      return statusMap[status] || status;
    };
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight - 100) {
          loadMore();
        }
      };
      window.addEventListener("scroll", handleScroll);
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="p-4 pt-6 sm:p-6 sm:pt-8" data-v-ad4fb12c${_scopeId}>`);
            if (!isLoading.value) {
              _push2(`<div class="border-base-300/30 mb-6 border-b pb-4" data-v-ad4fb12c${_scopeId}><div class="flex items-start justify-between gap-4" data-v-ad4fb12c${_scopeId}><div class="min-w-0 flex-1" data-v-ad4fb12c${_scopeId}><h1 class="truncate text-xl font-semibold text-base-content sm:text-2xl" data-v-ad4fb12c${_scopeId}>${ssrInterpolate(category.value.name)}</h1><div class="text-base-content/60 mt-1.5 flex flex-wrap items-center gap-2.5 text-xs" data-v-ad4fb12c${_scopeId}><span class="font-medium" data-v-ad4fb12c${_scopeId}>${ssrInterpolate(((_a2 = filteredWrites.value) == null ? void 0 : _a2.length) || 0)} yazı</span>`);
              if (category.value.description) {
                _push2(`<span class="text-base-content/40" data-v-ad4fb12c${_scopeId}>•</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (category.value.description) {
                _push2(`<span class="line-clamp-1" data-v-ad4fb12c${_scopeId}>${ssrInterpolate(category.value.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex shrink-0 items-center gap-1.5" data-v-ad4fb12c${_scopeId}><button class="${ssrRenderClass([
                statusFilter.value === "all" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200",
                "rounded-md px-2.5 py-1 text-xs transition-colors"
              ])}" data-v-ad4fb12c${_scopeId}> Tümü </button><button class="${ssrRenderClass([
                statusFilter.value === "published" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200",
                "rounded-md px-2.5 py-1 text-xs transition-colors"
              ])}" data-v-ad4fb12c${_scopeId}> Yayında </button>`);
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([
                  statusFilter.value === "private" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200",
                  "rounded-md px-2.5 py-1 text-xs transition-colors"
                ])}" data-v-ad4fb12c${_scopeId}> Gizli </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([
                  statusFilter.value === "link_only" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200",
                  "rounded-md px-2.5 py-1 text-xs transition-colors"
                ])}" data-v-ad4fb12c${_scopeId}> Link </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (statusFilter.value !== "all") {
                _push2(`<button class="text-base-content/50 ml-1 p-1 transition-colors hover:text-base-content" title="Filtreyi temizle" data-v-ad4fb12c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5" data-v-ad4fb12c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-ad4fb12c${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="space-y-2" data-v-ad4fb12c${_scopeId}><!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<div class="border-base-300/30 bg-base-50 rounded border p-4" data-v-ad4fb12c${_scopeId}><div class="mb-2 h-5 w-3/4 rounded bg-base-200" data-v-ad4fb12c${_scopeId}></div><div class="h-3 w-1/2 rounded bg-base-200" data-v-ad4fb12c${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-ad4fb12c${_scopeId}><div class="space-y-2" data-v-ad4fb12c${_scopeId}><!--[-->`);
              ssrRenderList(paginatedWrites.value, (write) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: write.id,
                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                  class: "border-base-300/30 bg-base-50 group block rounded-lg border p-4 transition-all duration-200 hover:border-base-300 hover:bg-base-100 hover:shadow-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start justify-between gap-4" data-v-ad4fb12c${_scopeId2}><div class="min-w-0 flex-1" data-v-ad4fb12c${_scopeId2}><div class="mb-1.5 flex items-center gap-2" data-v-ad4fb12c${_scopeId2}><span class="inline-flex shrink-0 items-center"${ssrRenderAttr("title", getStatusText(write.status))} data-v-ad4fb12c${_scopeId2}>`);
                      if (write.status === "private") {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-ad4fb12c${_scopeId2}></path></svg>`);
                      } else if (write.status === "link_only") {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-ad4fb12c${_scopeId2}></path></svg>`);
                      } else {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ad4fb12c${_scopeId2}></path></svg>`);
                      }
                      _push3(`</span><h3 class="line-clamp-1 text-base font-medium text-base-content transition-colors group-hover:text-primary" data-v-ad4fb12c${_scopeId2}>${ssrInterpolate(write.title)}</h3></div>`);
                      if (write.summary) {
                        _push3(`<p class="text-base-content/70 mb-2 line-clamp-2 text-sm" data-v-ad4fb12c${_scopeId2}>${ssrInterpolate(write.summary)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="text-base-content/50 flex flex-wrap items-center gap-3 text-xs" data-v-ad4fb12c${_scopeId2}><span class="flex items-center gap-1" data-v-ad4fb12c${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-ad4fb12c${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-ad4fb12c${_scopeId2}></path></svg> ${ssrInterpolate(formatNumber(write.views_count))}</span><span class="flex items-center gap-1" data-v-ad4fb12c${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-ad4fb12c${_scopeId2}></path></svg> ${ssrInterpolate(formatDateMobile(write.created_at))}</span></div></div><div class="text-base-content/30 shrink-0 transition-colors group-hover:text-primary" data-v-ad4fb12c${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4" data-v-ad4fb12c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-ad4fb12c${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("div", { class: "mb-1.5 flex items-center gap-2" }, [
                              createVNode("span", {
                                class: "inline-flex shrink-0 items-center",
                                title: getStatusText(write.status)
                              }, [
                                write.status === "private" ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "text-base-content/50 h-3.5 w-3.5",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                  })
                                ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                                  key: 1,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "text-base-content/50 h-3.5 w-3.5",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 2,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "text-base-content/50 h-3.5 w-3.5",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ]))
                              ], 8, ["title"]),
                              createVNode("h3", { class: "line-clamp-1 text-base font-medium text-base-content transition-colors group-hover:text-primary" }, toDisplayString(write.title), 1)
                            ]),
                            write.summary ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-base-content/70 mb-2 line-clamp-2 text-sm"
                            }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "text-base-content/50 flex flex-wrap items-center gap-3 text-xs" }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3 w-3",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(formatNumber(write.views_count)), 1)
                              ]),
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3 w-3",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(formatDateMobile(write.created_at)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "text-base-content/30 shrink-0 transition-colors group-hover:text-primary" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2",
                              stroke: "currentColor",
                              class: "h-4 w-4"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                              })
                            ]))
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if ((hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage) {
                _push2(`<div class="flex justify-center py-6" data-v-ad4fb12c${_scopeId}>`);
                if (isLoadingMore.value) {
                  _push2(`<div class="text-base-content/60 flex items-center gap-2 text-sm" data-v-ad4fb12c${_scopeId}><div class="loading loading-spinner loading-sm" data-v-ad4fb12c${_scopeId}></div> Yükleniyor... </div>`);
                } else {
                  _push2(`<button class="btn btn-ghost btn-sm" data-v-ad4fb12c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-ad4fb12c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" data-v-ad4fb12c${_scopeId}></path></svg> Daha Fazla </button>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (filteredWrites.value.length === 0) {
                _push2(`<div class="py-16 text-center" data-v-ad4fb12c${_scopeId}><div class="text-base-content/30 mb-3" data-v-ad4fb12c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12" data-v-ad4fb12c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ad4fb12c${_scopeId}></path></svg></div><p class="text-base-content/60 text-sm" data-v-ad4fb12c${_scopeId}>`);
                if (statusFilter.value !== "all") {
                  _push2(`<span data-v-ad4fb12c${_scopeId}>Seçilen filtreye uygun yazı bulunamadı.</span>`);
                } else {
                  _push2(`<span data-v-ad4fb12c${_scopeId}>Bu kategoride henüz yazı bulunmuyor.</span>`);
                }
                _push2(`</p></div>`);
              } else if (!hasMore.value && paginatedWrites.value.length > 0) {
                _push2(`<div class="py-8 text-center" data-v-ad4fb12c${_scopeId}><p class="text-base-content/40 text-xs" data-v-ad4fb12c${_scopeId}>Tüm yazılar gösteriliyor</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 pt-6 sm:p-6 sm:pt-8" }, [
                !isLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "border-base-300/30 mb-6 border-b pb-4"
                }, [
                  createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      createVNode("h1", { class: "truncate text-xl font-semibold text-base-content sm:text-2xl" }, toDisplayString(category.value.name), 1),
                      createVNode("div", { class: "text-base-content/60 mt-1.5 flex flex-wrap items-center gap-2.5 text-xs" }, [
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_b = filteredWrites.value) == null ? void 0 : _b.length) || 0) + " yazı", 1),
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-base-content/40"
                        }, "•")) : createCommentVNode("", true),
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "line-clamp-1"
                        }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "flex shrink-0 items-center gap-1.5" }, [
                      createVNode("button", {
                        onClick: ($event) => statusFilter.value = "all",
                        class: [
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          statusFilter.value === "all" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200"
                        ]
                      }, " Tümü ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => statusFilter.value = "published",
                        class: [
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          statusFilter.value === "published" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200"
                        ]
                      }, " Yayında ", 10, ["onClick"]),
                      unref(auth).user ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => statusFilter.value = "private",
                        class: [
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          statusFilter.value === "private" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200"
                        ]
                      }, " Gizli ", 10, ["onClick"])) : createCommentVNode("", true),
                      unref(auth).user ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => statusFilter.value = "link_only",
                        class: [
                          "rounded-md px-2.5 py-1 text-xs transition-colors",
                          statusFilter.value === "link_only" ? "bg-base-content text-base-100" : "bg-base-200/60 text-base-content/70 hover:bg-base-200"
                        ]
                      }, " Link ", 10, ["onClick"])) : createCommentVNode("", true),
                      statusFilter.value !== "all" ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: clearFilters,
                        class: "text-base-content/50 ml-1 p-1 transition-colors hover:text-base-content",
                        title: "Filtreyi temizle"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2",
                          stroke: "currentColor",
                          class: "h-3.5 w-3.5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ]))
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                isLoading.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-2"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "border-base-300/30 bg-base-50 rounded border p-4"
                    }, [
                      createVNode("div", { class: "mb-2 h-5 w-3/4 rounded bg-base-200" }),
                      createVNode("div", { class: "h-3 w-1/2 rounded bg-base-200" })
                    ]);
                  }), 64))
                ])) : (openBlock(), createBlock("div", { key: 2 }, [
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(paginatedWrites.value, (write) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: write.id,
                        href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                        class: "border-base-300/30 bg-base-50 group block rounded-lg border p-4 transition-all duration-200 hover:border-base-300 hover:bg-base-100 hover:shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("div", { class: "mb-1.5 flex items-center gap-2" }, [
                                createVNode("span", {
                                  class: "inline-flex shrink-0 items-center",
                                  title: getStatusText(write.status)
                                }, [
                                  write.status === "private" ? (openBlock(), createBlock("svg", {
                                    key: 0,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "text-base-content/50 h-3.5 w-3.5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    })
                                  ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                                    key: 1,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "text-base-content/50 h-3.5 w-3.5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                                    })
                                  ])) : (openBlock(), createBlock("svg", {
                                    key: 2,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "text-base-content/50 h-3.5 w-3.5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ], 8, ["title"]),
                                createVNode("h3", { class: "line-clamp-1 text-base font-medium text-base-content transition-colors group-hover:text-primary" }, toDisplayString(write.title), 1)
                              ]),
                              write.summary ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-base-content/70 mb-2 line-clamp-2 text-sm"
                              }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                              createVNode("div", { class: "text-base-content/50 flex flex-wrap items-center gap-3 text-xs" }, [
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    class: "h-3 w-3",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ])),
                                  createTextVNode(" " + toDisplayString(formatNumber(write.views_count)), 1)
                                ]),
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    class: "h-3 w-3",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    })
                                  ])),
                                  createTextVNode(" " + toDisplayString(formatDateMobile(write.created_at)), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "text-base-content/30 shrink-0 transition-colors group-hover:text-primary" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2",
                                stroke: "currentColor",
                                class: "h-4 w-4"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                                })
                              ]))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128)),
                    (hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-6"
                    }, [
                      isLoadingMore.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-base-content/60 flex items-center gap-2 text-sm"
                      }, [
                        createVNode("div", { class: "loading loading-spinner loading-sm" }),
                        createTextVNode(" Yükleniyor... ")
                      ])) : (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: loadMore,
                        class: "btn btn-ghost btn-sm"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                          })
                        ])),
                        createTextVNode(" Daha Fazla ")
                      ]))
                    ])) : createCommentVNode("", true)
                  ]),
                  filteredWrites.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-16 text-center"
                  }, [
                    createVNode("div", { class: "text-base-content/30 mb-3" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mx-auto h-12 w-12"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "text-base-content/60 text-sm" }, [
                      statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, "Seçilen filtreye uygun yazı bulunamadı.")) : (openBlock(), createBlock("span", { key: 1 }, "Bu kategoride henüz yazı bulunmuyor."))
                    ])
                  ])) : !hasMore.value && paginatedWrites.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-8 text-center"
                  }, [
                    createVNode("p", { class: "text-base-content/40 text-xs" }, "Tüm yazılar gösteriliyor")
                  ])) : createCommentVNode("", true)
                ]))
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad4fb12c"]]);
export {
  Screen as default
};
