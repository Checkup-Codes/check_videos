import { ref, computed, watch, onMounted, onUnmounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, Fragment, withDirectives, vModelText, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CRdImGzx.js";
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
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    const statusFilter = ref("all");
    const page = ref(1);
    const isLoadingMore = ref(false);
    const hasMore = ref(true);
    let searchTimeout = null;
    const handleSearchInput = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        debouncedSearchQuery.value = searchQuery.value;
        page.value = 1;
        hasMore.value = true;
      }, 300);
    };
    const filteredWrites = computed(() => {
      let filtered = writes.value || [];
      if (debouncedSearchQuery.value) {
        filtered = filtered.filter((write) => write.title.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()));
      }
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
    watch([debouncedSearchQuery, statusFilter], () => {
      page.value = 1;
      hasMore.value = true;
    });
    const clearFilters = () => {
      searchQuery.value = "";
      debouncedSearchQuery.value = "";
      statusFilter.value = "all";
      page.value = 1;
      hasMore.value = true;
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
    const deleteCategory = (categoryId) => {
      if (confirm(`"${category.value.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
        router.delete(route("categories.destroy", categoryId), {
          onSuccess: () => {
            router.visit(route("categories.index"));
          },
          onError: (errors) => {
            console.error("Kategori silinirken hata oluştu:", errors);
            alert("Kategori silinirken bir hata oluştu.");
          }
        });
      }
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
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="p-6 pt-12 sm:p-8 sm:pt-16" data-v-d1f5ec17${_scopeId}><div class="mb-8" data-v-d1f5ec17${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<div class="space-y-3" data-v-d1f5ec17${_scopeId}><div class="h-8 w-1/2 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div><div class="h-4 w-24 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div></div>`);
            } else {
              _push2(`<!--[--><div class="mb-6" data-v-d1f5ec17${_scopeId}><h1 class="text-2xl font-semibold text-base-content sm:text-3xl" data-v-d1f5ec17${_scopeId}>${ssrInterpolate(category.value.name)}</h1><div class="text-base-content/60 mt-2 flex items-center gap-3 text-sm" data-v-d1f5ec17${_scopeId}><span data-v-d1f5ec17${_scopeId}>${ssrInterpolate(((_a2 = filteredWrites.value) == null ? void 0 : _a2.length) || 0)} yazı</span>`);
              if (category.value.description) {
                _push2(`<span class="text-base-content/40" data-v-d1f5ec17${_scopeId}>•</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (category.value.description) {
                _push2(`<span class="text-base-content/40" data-v-d1f5ec17${_scopeId}>${ssrInterpolate(category.value.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (unref(auth).user && !isLoading.value) {
                _push2(`<div class="flex gap-2" data-v-d1f5ec17${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.edit", category.value.id),
                  class: "btn btn-ghost btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d1f5ec17${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-d1f5ec17${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
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
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<button class="btn btn-ghost btn-sm text-error" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-d1f5ec17${_scopeId}></path></svg> Sil </button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
            if (!isLoading.value) {
              _push2(`<div class="mb-8" data-v-d1f5ec17${_scopeId}><div class="flex flex-col gap-4" data-v-d1f5ec17${_scopeId}><div class="relative" data-v-d1f5ec17${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full pl-10" placeholder="Yazı başlığı ara..." data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" data-v-d1f5ec17${_scopeId}></path></svg></div><div class="flex flex-wrap gap-2" data-v-d1f5ec17${_scopeId}><button class="${ssrRenderClass([statusFilter.value === "all" ? "bg-base-content text-base-100" : "btn-ghost", "btn btn-sm"])}" data-v-d1f5ec17${_scopeId}> Tümü </button><button class="${ssrRenderClass([statusFilter.value === "published" ? "bg-base-content text-base-100" : "btn-ghost", "btn btn-sm"])}" data-v-d1f5ec17${_scopeId}> Yayında </button>`);
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "private" ? "bg-base-content text-base-100" : "btn-ghost", "btn btn-sm"])}" data-v-d1f5ec17${_scopeId}> Gizli </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "link_only" ? "bg-base-content text-base-100" : "btn-ghost", "btn btn-sm"])}" data-v-d1f5ec17${_scopeId}> Sadece Link </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mt-4 flex items-center justify-between" data-v-d1f5ec17${_scopeId}><div class="text-base-content/60 text-sm" data-v-d1f5ec17${_scopeId}>${ssrInterpolate(paginatedWrites.value.length)} / ${ssrInterpolate(filteredWrites.value.length || 0)} yazı `);
              if (debouncedSearchQuery.value || statusFilter.value !== "all") {
                _push2(`<span class="text-base-content/40" data-v-d1f5ec17${_scopeId}> (${ssrInterpolate(writes.value.length || 0)} toplam) </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (debouncedSearchQuery.value || statusFilter.value !== "all") {
                _push2(`<button class="btn btn-ghost btn-sm" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d1f5ec17${_scopeId}></path></svg> Temizle </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="space-y-3" data-v-d1f5ec17${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<div class="rounded-lg bg-base-100 p-4" data-v-d1f5ec17${_scopeId}><div class="flex items-center gap-3" data-v-d1f5ec17${_scopeId}><div class="h-8 w-8 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div><div class="flex-1 space-y-2" data-v-d1f5ec17${_scopeId}><div class="h-4 w-3/4 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div><div class="h-3 w-1/2 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div></div><div class="h-6 w-16 rounded bg-base-200" data-v-d1f5ec17${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-d1f5ec17${_scopeId}><div class="space-y-1" data-v-d1f5ec17${_scopeId}><!--[-->`);
              ssrRenderList(paginatedWrites.value, (write) => {
                _push2(`<div class="rounded-lg bg-base-100 p-4 transition-all duration-200 hover:bg-base-200" data-v-d1f5ec17${_scopeId}><div class="flex items-center gap-3" data-v-d1f5ec17${_scopeId}><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-base-300 text-base-content" data-v-d1f5ec17${_scopeId}>`);
                if (write.status === "private") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-d1f5ec17${_scopeId}></path></svg>`);
                } else if (write.status === "link_only") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-d1f5ec17${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-d1f5ec17${_scopeId}></path></svg>`);
                }
                _push2(`</div><div class="min-w-0 flex-1" data-v-d1f5ec17${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                  class: "block"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h3 class="text-sm font-medium text-base-content" data-v-d1f5ec17${_scopeId2}>${ssrInterpolate(write.title)}</h3>`);
                    } else {
                      return [
                        createVNode("h3", { class: "text-sm font-medium text-base-content" }, toDisplayString(write.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (write.summary) {
                  _push2(`<p class="text-base-content/60 mt-1 text-xs" data-v-d1f5ec17${_scopeId}>${ssrInterpolate(write.summary)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-base-content/50 mt-2 flex items-center gap-3 text-xs" data-v-d1f5ec17${_scopeId}><span class="flex items-center gap-1" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-d1f5ec17${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-d1f5ec17${_scopeId}></path></svg> ${ssrInterpolate(write.views_count)} görüntülenme </span><span class="flex items-center gap-1" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-d1f5ec17${_scopeId}></path></svg> ${ssrInterpolate(formatDateMobile(write.created_at))}</span></div></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if ((hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage) {
                _push2(`<div class="flex justify-center py-6" data-v-d1f5ec17${_scopeId}>`);
                if (isLoadingMore.value) {
                  _push2(`<div class="text-base-content/60 flex items-center gap-2 text-sm" data-v-d1f5ec17${_scopeId}><div class="loading loading-spinner loading-sm" data-v-d1f5ec17${_scopeId}></div> Yükleniyor... </div>`);
                } else {
                  _push2(`<button class="btn btn-ghost btn-sm" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" data-v-d1f5ec17${_scopeId}></path></svg> Daha Fazla </button>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (filteredWrites.value.length === 0) {
                _push2(`<div class="py-12 text-center" data-v-d1f5ec17${_scopeId}><div class="text-base-content/40 mb-2" data-v-d1f5ec17${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12" data-v-d1f5ec17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-d1f5ec17${_scopeId}></path></svg></div><p class="text-base-content/60 text-sm" data-v-d1f5ec17${_scopeId}>`);
                if (debouncedSearchQuery.value || statusFilter.value !== "all") {
                  _push2(`<span data-v-d1f5ec17${_scopeId}> Arama kriterlerinize uygun yazı bulunamadı. </span>`);
                } else {
                  _push2(`<span data-v-d1f5ec17${_scopeId}>Bu kategoride henüz yazı bulunmuyor.</span>`);
                }
                _push2(`</p></div>`);
              } else if (!hasMore.value && paginatedWrites.value.length > 0) {
                _push2(`<div class="py-6 text-center" data-v-d1f5ec17${_scopeId}><p class="text-base-content/40 text-sm" data-v-d1f5ec17${_scopeId}>Tüm yazılar yüklendi</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                createVNode("div", { class: "mb-8" }, [
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3"
                  }, [
                    createVNode("div", { class: "h-8 w-1/2 rounded bg-base-200" }),
                    createVNode("div", { class: "h-4 w-24 rounded bg-base-200" })
                  ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("h1", { class: "text-2xl font-semibold text-base-content sm:text-3xl" }, toDisplayString(category.value.name), 1),
                      createVNode("div", { class: "text-base-content/60 mt-2 flex items-center gap-3 text-sm" }, [
                        createVNode("span", null, toDisplayString(((_b = filteredWrites.value) == null ? void 0 : _b.length) || 0) + " yazı", 1),
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-base-content/40"
                        }, "•")) : createCommentVNode("", true),
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-base-content/40"
                        }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    unref(auth).user && !isLoading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex gap-2"
                    }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("categories.edit", category.value.id),
                        class: "btn btn-ghost btn-sm"
                      }, {
                        default: withCtx(() => [
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
                              d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            })
                          ])),
                          createTextVNode(" Düzenle ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: ($event) => deleteCategory(category.value.id),
                        class: "btn btn-ghost btn-sm text-error"
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
                            d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          })
                        ])),
                        createTextVNode(" Sil ")
                      ], 8, ["onClick"])
                    ])) : createCommentVNode("", true)
                  ], 64))
                ]),
                !isLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8"
                }, [
                  createVNode("div", { class: "flex flex-col gap-4" }, [
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        class: "input-bordered input w-full pl-10",
                        placeholder: "Yazı başlığı ara...",
                        onInput: handleSearchInput
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        })
                      ]))
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("button", {
                        onClick: ($event) => statusFilter.value = "all",
                        class: ["btn btn-sm", statusFilter.value === "all" ? "bg-base-content text-base-100" : "btn-ghost"]
                      }, " Tümü ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => statusFilter.value = "published",
                        class: ["btn btn-sm", statusFilter.value === "published" ? "bg-base-content text-base-100" : "btn-ghost"]
                      }, " Yayında ", 10, ["onClick"]),
                      unref(auth).user ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => statusFilter.value = "private",
                        class: ["btn btn-sm", statusFilter.value === "private" ? "bg-base-content text-base-100" : "btn-ghost"]
                      }, " Gizli ", 10, ["onClick"])) : createCommentVNode("", true),
                      unref(auth).user ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => statusFilter.value = "link_only",
                        class: ["btn btn-sm", statusFilter.value === "link_only" ? "bg-base-content text-base-100" : "btn-ghost"]
                      }, " Sadece Link ", 10, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "text-base-content/60 text-sm" }, [
                      createTextVNode(toDisplayString(paginatedWrites.value.length) + " / " + toDisplayString(filteredWrites.value.length || 0) + " yazı ", 1),
                      debouncedSearchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-base-content/40"
                      }, " (" + toDisplayString(writes.value.length || 0) + " toplam) ", 1)) : createCommentVNode("", true)
                    ]),
                    debouncedSearchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: clearFilters,
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
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ])),
                      createTextVNode(" Temizle ")
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                isLoading.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-3"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "rounded-lg bg-base-100 p-4"
                    }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "h-8 w-8 rounded bg-base-200" }),
                        createVNode("div", { class: "flex-1 space-y-2" }, [
                          createVNode("div", { class: "h-4 w-3/4 rounded bg-base-200" }),
                          createVNode("div", { class: "h-3 w-1/2 rounded bg-base-200" })
                        ]),
                        createVNode("div", { class: "h-6 w-16 rounded bg-base-200" })
                      ])
                    ]);
                  }), 64))
                ])) : (openBlock(), createBlock("div", { key: 2 }, [
                  createVNode("div", { class: "space-y-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(paginatedWrites.value, (write) => {
                      return openBlock(), createBlock("div", {
                        key: write.id,
                        class: "rounded-lg bg-base-100 p-4 transition-all duration-200 hover:bg-base-200"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-base-300 text-base-content" }, [
                            write.status === "private" ? (openBlock(), createBlock("svg", {
                              key: 0,
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
                                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              })
                            ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                              key: 1,
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
                                d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 2,
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
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                              class: "block"
                            }, {
                              default: withCtx(() => [
                                createVNode("h3", { class: "text-sm font-medium text-base-content" }, toDisplayString(write.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            write.summary ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-base-content/60 mt-1 text-xs"
                            }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "text-base-content/50 mt-2 flex items-center gap-3 text-xs" }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3 w-3"
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
                                createTextVNode(" " + toDisplayString(write.views_count) + " görüntülenme ", 1)
                              ]),
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3 w-3"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(formatDateMobile(write.created_at)), 1)
                              ])
                            ])
                          ])
                        ])
                      ]);
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
                    class: "py-12 text-center"
                  }, [
                    createVNode("div", { class: "text-base-content/40 mb-2" }, [
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
                      debouncedSearchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, " Arama kriterlerinize uygun yazı bulunamadı. ")) : (openBlock(), createBlock("span", { key: 1 }, "Bu kategoride henüz yazı bulunmuyor."))
                    ])
                  ])) : !hasMore.value && paginatedWrites.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-6 text-center"
                  }, [
                    createVNode("p", { class: "text-base-content/40 text-sm" }, "Tüm yazılar yüklendi")
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1f5ec17"]]);
export {
  Screen as default
};
