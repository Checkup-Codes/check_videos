import { ref, computed, watch, onMounted, onUnmounted, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import "./Card-V_bTdXom.js";
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
    const categories = ref(props.categories || []);
    const auth = props.auth;
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const isLoading = ref(true);
    const categoryBreadcrumb = computed(() => {
      if (!category.value || !category.value.id || !categories.value || categories.value.length === 0) {
        return [];
      }
      const findCategory = (id) => {
        return categories.value.find((cat) => cat && cat.id === id);
      };
      const buildBreadcrumb = (categoryId, breadcrumb = []) => {
        const cat = findCategory(categoryId);
        if (!cat) return breadcrumb;
        breadcrumb.unshift(cat);
        if (cat.parent_id) {
          return buildBreadcrumb(cat.parent_id, breadcrumb);
        }
        return breadcrumb;
      };
      return buildBreadcrumb(category.value.id);
    });
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
            _push2(`<div class="p-3 pt-4 sm:p-6 sm:pt-6 lg:p-8 lg:pt-8" data-v-16c9c9e1${_scopeId}>`);
            if (!isLoading.value) {
              _push2(`<div class="mb-6" data-v-16c9c9e1${_scopeId}>`);
              if (categoryBreadcrumb.value.length > 1) {
                _push2(`<nav class="mb-2 flex items-center gap-1 text-xs text-muted-foreground" data-v-16c9c9e1${_scopeId}><!--[-->`);
                ssrRenderList(categoryBreadcrumb.value, (breadcrumbItem, index) => {
                  _push2(`<!--[-->`);
                  if (index < categoryBreadcrumb.value.length - 1) {
                    _push2(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("categories.show", { category: breadcrumbItem.slug }),
                      class: "transition-colors hover:text-foreground"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(breadcrumbItem.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(breadcrumbItem.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<span class="text-foreground" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(breadcrumbItem.name)}</span>`);
                  }
                  if (index < categoryBreadcrumb.value.length - 1) {
                    _push2(`<span class="text-muted-foreground/40" data-v-16c9c9e1${_scopeId}>/</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--></nav>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-4 flex items-end justify-between gap-4" data-v-16c9c9e1${_scopeId}><div class="min-w-0 flex-1" data-v-16c9c9e1${_scopeId}><h1 class="mb-1 text-2xl font-bold text-foreground sm:text-3xl" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(category.value.name)}</h1>`);
              if (category.value.description) {
                _push2(`<p class="text-sm text-muted-foreground line-clamp-1" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(category.value.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="shrink-0 text-right" data-v-16c9c9e1${_scopeId}><div class="text-2xl font-bold text-foreground" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(((_a2 = filteredWrites.value) == null ? void 0 : _a2.length) || 0)}</div><div class="text-xs text-muted-foreground" data-v-16c9c9e1${_scopeId}>yazı</div></div></div><div class="flex flex-wrap items-center gap-1.5" data-v-16c9c9e1${_scopeId}><button class="${ssrRenderClass([statusFilter.value === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground", "inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"])}" data-v-16c9c9e1${_scopeId}> Tümü </button><button class="${ssrRenderClass([statusFilter.value === "published" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground", "inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"])}" data-v-16c9c9e1${_scopeId}> Yayında </button>`);
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "private" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground", "inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"])}" data-v-16c9c9e1${_scopeId}> Gizli </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "link_only" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground", "inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"])}" data-v-16c9c9e1${_scopeId}> Link </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (statusFilter.value !== "all") {
                _push2(`<button class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive" title="Filtreyi temizle" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-16c9c9e1${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="space-y-2" data-v-16c9c9e1${_scopeId}><!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<div class="rounded-lg border border-border bg-card p-4" data-v-16c9c9e1${_scopeId}><div class="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" data-v-16c9c9e1${_scopeId}></div><div class="h-3 w-1/2 animate-pulse rounded bg-muted" data-v-16c9c9e1${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="space-y-2" data-v-16c9c9e1${_scopeId}><!--[-->`);
              ssrRenderList(paginatedWrites.value, (write) => {
                _push2(`<div class="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-primary/50 hover:bg-accent/30 hover:shadow-sm sm:gap-4 sm:p-4" data-v-16c9c9e1${_scopeId}><div class="shrink-0" data-v-16c9c9e1${_scopeId}><div class="${ssrRenderClass([{
                  "bg-green-500/10 text-green-600 dark:text-green-400": write.status === "published",
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400": write.status === "private",
                  "bg-blue-500/10 text-blue-600 dark:text-blue-400": write.status === "link_only"
                }, "flex h-8 w-8 items-center justify-center rounded-full transition-colors"])}" data-v-16c9c9e1${_scopeId}>`);
                if (write.status === "private") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-16c9c9e1${_scopeId}></path></svg>`);
                } else if (write.status === "link_only") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-16c9c9e1${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-16c9c9e1${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-16c9c9e1${_scopeId}></path></svg>`);
                }
                _push2(`</div></div><div class="min-w-0 flex-1" data-v-16c9c9e1${_scopeId}><h3 class="mb-1 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(write.title)}</h3>`);
                if (write.summary) {
                  _push2(`<p class="mb-2 line-clamp-1 text-xs text-muted-foreground sm:text-sm" data-v-16c9c9e1${_scopeId}>${ssrInterpolate(write.summary)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center gap-3 text-xs text-muted-foreground" data-v-16c9c9e1${_scopeId}><span class="inline-flex items-center gap-1" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-16c9c9e1${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-16c9c9e1${_scopeId}></path></svg> ${ssrInterpolate(formatNumber(write.views_count))}</span><span class="inline-flex items-center gap-1" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-16c9c9e1${_scopeId}></path></svg> ${ssrInterpolate(formatDateMobile(write.created_at))}</span></div></div><div class="shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-4 w-4" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-16c9c9e1${_scopeId}></path></svg></div></div>`);
              });
              _push2(`<!--]-->`);
              if ((hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage) {
                _push2(`<div class="flex justify-center py-6" data-v-16c9c9e1${_scopeId}>`);
                if (isLoadingMore.value) {
                  _push2(`<div class="flex items-center gap-2 text-xs text-muted-foreground" data-v-16c9c9e1${_scopeId}><div class="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" data-v-16c9c9e1${_scopeId}></div> Yükleniyor... </div>`);
                } else {
                  _push2(`<button class="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-all hover:bg-accent" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" data-v-16c9c9e1${_scopeId}></path></svg> Daha Fazla </button>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (filteredWrites.value.length === 0) {
                _push2(`<div class="py-16 text-center" data-v-16c9c9e1${_scopeId}><div class="mb-3 text-muted-foreground/30" data-v-16c9c9e1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="mx-auto h-16 w-16" data-v-16c9c9e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-16c9c9e1${_scopeId}></path></svg></div><p class="text-sm text-muted-foreground" data-v-16c9c9e1${_scopeId}>`);
                if (statusFilter.value !== "all") {
                  _push2(`<span data-v-16c9c9e1${_scopeId}>Seçilen filtreye uygun yazı bulunamadı</span>`);
                } else {
                  _push2(`<span data-v-16c9c9e1${_scopeId}>Bu kategoride henüz yazı yok</span>`);
                }
                _push2(`</p></div>`);
              } else if (!hasMore.value && paginatedWrites.value.length > 0) {
                _push2(`<div class="py-6 text-center" data-v-16c9c9e1${_scopeId}><p class="text-xs text-muted-foreground/50" data-v-16c9c9e1${_scopeId}>Tüm yazılar gösteriliyor</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-3 pt-4 sm:p-6 sm:pt-6 lg:p-8 lg:pt-8" }, [
                !isLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6"
                }, [
                  categoryBreadcrumb.value.length > 1 ? (openBlock(), createBlock("nav", {
                    key: 0,
                    class: "mb-2 flex items-center gap-1 text-xs text-muted-foreground"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(categoryBreadcrumb.value, (breadcrumbItem, index) => {
                      return openBlock(), createBlock(Fragment, {
                        key: breadcrumbItem.id
                      }, [
                        index < categoryBreadcrumb.value.length - 1 ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("categories.show", { category: breadcrumbItem.slug }),
                          class: "transition-colors hover:text-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(breadcrumbItem.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-foreground"
                        }, toDisplayString(breadcrumbItem.name), 1)),
                        index < categoryBreadcrumb.value.length - 1 ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: "text-muted-foreground/40"
                        }, "/")) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "mb-4 flex items-end justify-between gap-4" }, [
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      createVNode("h1", { class: "mb-1 text-2xl font-bold text-foreground sm:text-3xl" }, toDisplayString(category.value.name), 1),
                      category.value.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-muted-foreground line-clamp-1"
                      }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "shrink-0 text-right" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(((_b = filteredWrites.value) == null ? void 0 : _b.length) || 0), 1),
                      createVNode("div", { class: "text-xs text-muted-foreground" }, "yazı")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [
                    createVNode("button", {
                      onClick: ($event) => statusFilter.value = "all",
                      class: ["inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all", statusFilter.value === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"]
                    }, " Tümü ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => statusFilter.value = "published",
                      class: ["inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all", statusFilter.value === "published" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"]
                    }, " Yayında ", 10, ["onClick"]),
                    unref(auth).user ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: ($event) => statusFilter.value = "private",
                      class: ["inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all", statusFilter.value === "private" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"]
                    }, " Gizli ", 10, ["onClick"])) : createCommentVNode("", true),
                    unref(auth).user ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: ($event) => statusFilter.value = "link_only",
                      class: ["inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all", statusFilter.value === "link_only" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"]
                    }, " Link ", 10, ["onClick"])) : createCommentVNode("", true),
                    statusFilter.value !== "all" ? (openBlock(), createBlock("button", {
                      key: 2,
                      onClick: clearFilters,
                      class: "inline-flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive",
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
                ])) : createCommentVNode("", true),
                isLoading.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-2"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "rounded-lg border border-border bg-card p-4"
                    }, [
                      createVNode("div", { class: "mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" }),
                      createVNode("div", { class: "h-3 w-1/2 animate-pulse rounded bg-muted" })
                    ]);
                  }), 64))
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(paginatedWrites.value, (write) => {
                    return openBlock(), createBlock("div", {
                      key: write.id,
                      onClick: ($event) => unref(router).visit(_ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug })),
                      class: "group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-primary/50 hover:bg-accent/30 hover:shadow-sm sm:gap-4 sm:p-4"
                    }, [
                      createVNode("div", { class: "shrink-0" }, [
                        createVNode("div", {
                          class: ["flex h-8 w-8 items-center justify-center rounded-full transition-colors", {
                            "bg-green-500/10 text-green-600 dark:text-green-400": write.status === "published",
                            "bg-amber-500/10 text-amber-600 dark:text-amber-400": write.status === "private",
                            "bg-blue-500/10 text-blue-600 dark:text-blue-400": write.status === "link_only"
                          }]
                        }, [
                          write.status === "private" ? (openBlock(), createBlock("svg", {
                            key: 0,
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
                              d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            })
                          ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                            key: 1,
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
                              d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 2,
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
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ]))
                        ], 2)
                      ]),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("h3", { class: "mb-1 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(write.title), 1),
                        write.summary ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mb-2 line-clamp-1 text-xs text-muted-foreground sm:text-sm"
                        }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center gap-3 text-xs text-muted-foreground" }, [
                          createVNode("span", { class: "inline-flex items-center gap-1" }, [
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
                          createVNode("span", { class: "inline-flex items-center gap-1" }, [
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
                      createVNode("div", { class: "shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2.5",
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
                    ], 8, ["onClick"]);
                  }), 128)),
                  (hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-6"
                  }, [
                    isLoadingMore.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2 text-xs text-muted-foreground"
                    }, [
                      createVNode("div", { class: "h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
                      createTextVNode(" Yükleniyor... ")
                    ])) : (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: loadMore,
                      class: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-all hover:bg-accent"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-3.5 w-3.5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        })
                      ])),
                      createTextVNode(" Daha Fazla ")
                    ]))
                  ])) : createCommentVNode("", true),
                  filteredWrites.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-16 text-center"
                  }, [
                    createVNode("div", { class: "mb-3 text-muted-foreground/30" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1",
                        stroke: "currentColor",
                        class: "mx-auto h-16 w-16"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, [
                      statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, "Seçilen filtreye uygun yazı bulunamadı")) : (openBlock(), createBlock("span", { key: 1 }, "Bu kategoride henüz yazı yok"))
                    ])
                  ])) : !hasMore.value && paginatedWrites.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "py-6 text-center"
                  }, [
                    createVNode("p", { class: "text-xs text-muted-foreground/50" }, "Tüm yazılar gösteriliyor")
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16c9c9e1"]]);
export {
  Screen as default
};
