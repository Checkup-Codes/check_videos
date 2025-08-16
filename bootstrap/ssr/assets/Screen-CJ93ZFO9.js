import { ref, computed, watch, onMounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
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
    const searchQuery = ref("");
    const statusFilter = ref("all");
    const filteredWrites = computed(() => {
      let filtered = writes.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (write) => write.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (statusFilter.value !== "all") {
        filtered = filtered.filter((write) => write.status === statusFilter.value);
      }
      return filtered;
    });
    const displayedWrites = computed(() => {
      const startIndex = 0;
      const endIndex = page.value * 10;
      return filteredWrites.value.slice(startIndex, endIndex);
    });
    const loadMore = () => {
      if (isLoadingMore.value || !hasMore.value) return;
      isLoadingMore.value = true;
      page.value++;
      setTimeout(() => {
        checkHasMore();
        isLoadingMore.value = false;
      }, 300);
    };
    const clearFilters = () => {
      searchQuery.value = "";
      statusFilter.value = "all";
      page.value = 1;
      checkHasMore();
    };
    watch([searchQuery, statusFilter], () => {
      page.value = 1;
      checkHasMore();
    });
    const setupInfiniteScroll = () => {
      let scrollContainer = document.querySelector(".h-screen-minus-12.overflow-y-auto");
      if (!scrollContainer) {
        const altContainer = document.querySelector(".overflow-y-auto");
        if (!altContainer) {
          return;
        }
        scrollContainer = altContainer;
      }
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        if (scrollPercentage > 0.8 && !isLoadingMore.value && hasMore.value) {
          loadMore();
        }
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoadingMore.value && hasMore.value) {
              loadMore();
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: "200px",
          threshold: 0.1
        }
      );
      if (observerTarget.value) {
        observer.observe(observerTarget.value);
      }
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        if (observerTarget.value) {
          observer.unobserve(observerTarget.value);
        }
      };
    };
    const checkHasMore = () => {
      const endIndex = page.value * 10;
      const totalWrites = filteredWrites.value.length;
      hasMore.value = endIndex < totalWrites;
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
    const deleteWrite = (write) => {
      if (confirm(`"${write.title}" yazısını silmek istediğinizden emin misiniz?`)) {
        router.delete(route("writes.destroy", write.id), {
          preserveScroll: true,
          onSuccess: () => {
            const index = writes.value.findIndex((w) => w.id === write.id);
            if (index > -1) {
              writes.value.splice(index, 1);
            }
          },
          onError: (errors) => {
            console.error("Yazı silinirken hata oluştu:", errors);
            alert("Yazı silinirken bir hata oluştu.");
          }
        });
      }
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
      setTimeout(() => {
        setupInfiniteScroll();
        checkHasMore();
        const handleWindowScroll = () => {
          const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
          if (scrollPercentage > 0.8 && !isLoadingMore.value && hasMore.value) {
            loadMore();
          }
        };
        window.addEventListener("scroll", handleWindowScroll);
      }, 100);
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
            _push2(`<div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200" data-v-de552c19${_scopeId}><div class="card-body p-4 sm:p-6" data-v-de552c19${_scopeId}><div class="mb-6" data-v-de552c19${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<div class="skeleton-wrapper" data-v-de552c19${_scopeId}><div class="skeleton h-8 w-3/4 rounded-lg" data-v-de552c19${_scopeId}></div><div class="mt-2" data-v-de552c19${_scopeId}><div class="skeleton h-4 w-24 rounded-lg" data-v-de552c19${_scopeId}></div></div></div>`);
            } else {
              _push2(`<div class="flex items-center gap-3" data-v-de552c19${_scopeId}><div class="flex-1" data-v-de552c19${_scopeId}><h1 class="text-2xl font-bold text-base-content sm:text-3xl" data-v-de552c19${_scopeId}>${ssrInterpolate(category.value.name)}</h1><div class="mt-2 flex items-center gap-2" data-v-de552c19${_scopeId}>`);
              if (category.value.description) {
                _push2(`<span class="badge badge-outline text-sm" data-v-de552c19${_scopeId}>${ssrInterpolate(category.value.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="text-base-content/60 text-sm" data-v-de552c19${_scopeId}>${ssrInterpolate(filteredWrites.value.length)} yazı </span></div></div><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-de552c19${_scopeId}></path></svg></div></div>`);
            }
            _push2(`</div>`);
            if (unref(auth).user && !isLoading.value) {
              _push2(`<div class="mb-6 flex justify-end gap-2" data-v-de552c19${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.edit", category.value.id),
                class: "btn btn-outline btn-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 h-4 w-4" data-v-de552c19${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-de552c19${_scopeId2}></path></svg> Düzenle `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-2 h-4 w-4"
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
              _push2(`<button class="btn btn-outline btn-error btn-sm" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 h-4 w-4" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-de552c19${_scopeId}></path></svg> Sil </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!isLoading.value) {
              _push2(`<div class="mb-6" data-v-de552c19${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-v-de552c19${_scopeId}><div class="flex-1 max-w-md" data-v-de552c19${_scopeId}><div class="relative" data-v-de552c19${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input input-bordered w-full pl-10" placeholder="Yazı başlığı ara..." data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" data-v-de552c19${_scopeId}></path></svg></div></div><div class="flex items-center gap-2" data-v-de552c19${_scopeId}><button class="${ssrRenderClass([statusFilter.value === "all" ? "btn-primary" : "btn-outline", "btn btn-sm"])}" data-v-de552c19${_scopeId}> Tümü </button><button class="${ssrRenderClass([statusFilter.value === "published" ? "btn-primary" : "btn-outline", "btn btn-sm"])}" data-v-de552c19${_scopeId}> Yayında </button>`);
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "private" ? "btn-primary" : "btn-outline", "btn btn-sm"])}" data-v-de552c19${_scopeId}> Gizli </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth).user) {
                _push2(`<button class="${ssrRenderClass([statusFilter.value === "link_only" ? "btn-primary" : "btn-outline", "btn btn-sm"])}" data-v-de552c19${_scopeId}> Sadece Link </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mt-3 flex items-center justify-between" data-v-de552c19${_scopeId}><div class="text-sm text-base-content/60" data-v-de552c19${_scopeId}>${ssrInterpolate(displayedWrites.value.length)} / ${ssrInterpolate(filteredWrites.value.length)} yazı gösteriliyor `);
              if (searchQuery.value || statusFilter.value !== "all") {
                _push2(`<span data-v-de552c19${_scopeId}> (${ssrInterpolate(writes.value.length)} toplam yazıdan) </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (searchQuery.value || statusFilter.value !== "all") {
                _push2(`<button class="btn btn-ghost btn-xs" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-3 w-3" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-de552c19${_scopeId}></path></svg> Filtreleri Temizle </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="space-y-4" data-v-de552c19${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<div class="card border border-base-200 bg-base-100 shadow-sm" data-v-de552c19${_scopeId}><div class="card-body p-6" data-v-de552c19${_scopeId}><div class="flex items-start gap-4" data-v-de552c19${_scopeId}><div class="skeleton h-12 w-12 rounded-lg" data-v-de552c19${_scopeId}></div><div class="flex-1 space-y-2" data-v-de552c19${_scopeId}><div class="skeleton h-5 w-3/4 rounded-lg" data-v-de552c19${_scopeId}></div><div class="skeleton h-4 w-full rounded-lg" data-v-de552c19${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-lg" data-v-de552c19${_scopeId}></div></div><div class="skeleton h-8 w-20 rounded-lg" data-v-de552c19${_scopeId}></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-de552c19${_scopeId}>`);
              if (writes.value.length > 0) {
                _push2(`<div class="space-y-4" data-v-de552c19${_scopeId}><!--[-->`);
                ssrRenderList(displayedWrites.value, (write) => {
                  _push2(`<div class="card border border-base-200 bg-base-100 shadow-sm" data-v-de552c19${_scopeId}><div class="card-body p-6" data-v-de552c19${_scopeId}><div class="flex items-start gap-4" data-v-de552c19${_scopeId}><div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" data-v-de552c19${_scopeId}>`);
                  if (write.status === "private") {
                    _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-de552c19${_scopeId}></path></svg>`);
                  } else if (write.status === "link_only") {
                    _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-de552c19${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-de552c19${_scopeId}></path></svg>`);
                  }
                  _push2(`</div><div class="flex-1 min-w-0" data-v-de552c19${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                    class: "block"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<h3 class="text-lg font-semibold line-clamp-2 mb-2" data-v-de552c19${_scopeId2}>${ssrInterpolate(write.title)}</h3>`);
                      } else {
                        return [
                          createVNode("h3", { class: "text-lg font-semibold line-clamp-2 mb-2" }, toDisplayString(write.title), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (write.summary) {
                    _push2(`<p class="text-base-content/70 text-sm line-clamp-2 mb-3" data-v-de552c19${_scopeId}>${ssrInterpolate(write.summary)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex flex-wrap items-center gap-4 text-xs text-base-content/60" data-v-de552c19${_scopeId}><span class="flex items-center gap-1" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-de552c19${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-de552c19${_scopeId}></path></svg> ${ssrInterpolate(write.views_count)} görüntüleme </span><span class="flex items-center gap-1" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-de552c19${_scopeId}></path></svg> ${ssrInterpolate(formatDate(write.created_at))}</span>`);
                  if (write.updated_at !== write.created_at) {
                    _push2(`<span class="flex items-center gap-1" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-de552c19${_scopeId}></path></svg> Son güncelleme: ${ssrInterpolate(formatDate(write.updated_at))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div><div class="flex shrink-0 items-center gap-2" data-v-de552c19${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                    class: "btn btn-primary btn-sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-de552c19${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" data-v-de552c19${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-de552c19${_scopeId2}></path></svg> Oku `);
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
                              d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            })
                          ])),
                          createTextVNode(" Oku ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (unref(auth).user) {
                    _push2(`<div class="dropdown dropdown-end" data-v-de552c19${_scopeId}><button class="btn btn-ghost btn-sm" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" data-v-de552c19${_scopeId}></path></svg></button><ul class="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow" data-v-de552c19${_scopeId}><li data-v-de552c19${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("writes.edit", write.slug),
                      class: "flex items-center gap-2"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-de552c19${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-de552c19${_scopeId2}></path></svg> Düzenle `);
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
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</li><li data-v-de552c19${_scopeId}><button class="flex items-center gap-2 text-error" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-de552c19${_scopeId}></path></svg> Sil </button></li></ul></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="alert alert-info" data-v-de552c19${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 stroke-current" data-v-de552c19${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-de552c19${_scopeId}></path></svg><div data-v-de552c19${_scopeId}>`);
                if (searchQuery.value || statusFilter.value !== "all") {
                  _push2(`<span data-v-de552c19${_scopeId}> Arama kriterlerinize uygun yazı bulunamadı. </span>`);
                } else {
                  _push2(`<span data-v-de552c19${_scopeId}> Bu kategoride henüz yazı bulunmuyor. </span>`);
                }
                _push2(`</div></div>`);
              }
              if (isLoadingMore.value) {
                _push2(`<div class="space-y-4" data-v-de552c19${_scopeId}><!--[-->`);
                ssrRenderList(3, (i) => {
                  _push2(`<div class="card border border-base-200 bg-base-100 shadow-sm" data-v-de552c19${_scopeId}><div class="card-body p-6" data-v-de552c19${_scopeId}><div class="flex items-start gap-4" data-v-de552c19${_scopeId}><div class="skeleton h-12 w-12 rounded-lg" data-v-de552c19${_scopeId}></div><div class="flex-1 space-y-2" data-v-de552c19${_scopeId}><div class="skeleton h-5 w-3/4 rounded-lg" data-v-de552c19${_scopeId}></div><div class="skeleton h-4 w-full rounded-lg" data-v-de552c19${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-lg" data-v-de552c19${_scopeId}></div></div><div class="skeleton h-8 w-20 rounded-lg" data-v-de552c19${_scopeId}></div></div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasMore.value) {
                _push2(`<div class="h-8 w-full flex items-center justify-center" data-v-de552c19${_scopeId}><div class="loading loading-spinner loading-sm" data-v-de552c19${_scopeId}></div><span class="ml-2 text-sm text-base-content/60" data-v-de552c19${_scopeId}>Daha fazla yazı yükleniyor...</span></div>`);
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
                  createVNode("div", { class: "mb-6" }, [
                    isLoading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "skeleton-wrapper"
                    }, [
                      createVNode("div", { class: "skeleton h-8 w-3/4 rounded-lg" }),
                      createVNode("div", { class: "mt-2" }, [
                        createVNode("div", { class: "skeleton h-4 w-24 rounded-lg" })
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-3"
                    }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h1", { class: "text-2xl font-bold text-base-content sm:text-3xl" }, toDisplayString(category.value.name), 1),
                        createVNode("div", { class: "mt-2 flex items-center gap-2" }, [
                          category.value.description ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "badge badge-outline text-sm"
                          }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true),
                          createVNode("span", { class: "text-base-content/60 text-sm" }, toDisplayString(filteredWrites.value.length) + " yazı ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-6 w-6",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ]))
                      ])
                    ]))
                  ]),
                  unref(auth).user && !isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 flex justify-end gap-2"
                  }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("categories.edit", category.value.id),
                      class: "btn btn-outline btn-sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-2 h-4 w-4"
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
                      class: "btn btn-outline btn-error btn-sm"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-2 h-4 w-4"
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
                  !isLoading.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mb-6"
                  }, [
                    createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex-1 max-w-md" }, [
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            class: "input input-bordered w-full pl-10",
                            placeholder: "Yazı başlığı ara..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            })
                          ]))
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("button", {
                          onClick: ($event) => statusFilter.value = "all",
                          class: ["btn btn-sm", statusFilter.value === "all" ? "btn-primary" : "btn-outline"]
                        }, " Tümü ", 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => statusFilter.value = "published",
                          class: ["btn btn-sm", statusFilter.value === "published" ? "btn-primary" : "btn-outline"]
                        }, " Yayında ", 10, ["onClick"]),
                        unref(auth).user ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => statusFilter.value = "private",
                          class: ["btn btn-sm", statusFilter.value === "private" ? "btn-primary" : "btn-outline"]
                        }, " Gizli ", 10, ["onClick"])) : createCommentVNode("", true),
                        unref(auth).user ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: ($event) => statusFilter.value = "link_only",
                          class: ["btn btn-sm", statusFilter.value === "link_only" ? "btn-primary" : "btn-outline"]
                        }, " Sadece Link ", 10, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "mt-3 flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-base-content/60" }, [
                        createTextVNode(toDisplayString(displayedWrites.value.length) + " / " + toDisplayString(filteredWrites.value.length) + " yazı gösteriliyor ", 1),
                        searchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(writes.value.length) + " toplam yazıdan) ", 1)) : createCommentVNode("", true)
                      ]),
                      searchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: clearFilters,
                        class: "btn btn-ghost btn-xs"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-3 w-3"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ])),
                        createTextVNode(" Filtreleri Temizle ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-4"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "card border border-base-200 bg-base-100 shadow-sm"
                      }, [
                        createVNode("div", { class: "card-body p-6" }, [
                          createVNode("div", { class: "flex items-start gap-4" }, [
                            createVNode("div", { class: "skeleton h-12 w-12 rounded-lg" }),
                            createVNode("div", { class: "flex-1 space-y-2" }, [
                              createVNode("div", { class: "skeleton h-5 w-3/4 rounded-lg" }),
                              createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                              createVNode("div", { class: "skeleton h-4 w-2/3 rounded-lg" })
                            ]),
                            createVNode("div", { class: "skeleton h-8 w-20 rounded-lg" })
                          ])
                        ])
                      ]);
                    }), 64))
                  ])) : (openBlock(), createBlock("div", { key: 3 }, [
                    writes.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(displayedWrites.value, (write) => {
                        return openBlock(), createBlock("div", {
                          key: write.id,
                          class: "card border border-base-200 bg-base-100 shadow-sm"
                        }, [
                          createVNode("div", { class: "card-body p-6" }, [
                            createVNode("div", { class: "flex items-start gap-4" }, [
                              createVNode("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" }, [
                                write.status === "private" ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-6 w-6",
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
                                  class: "h-6 w-6",
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
                                  class: "h-6 w-6",
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
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                                  class: "block"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h3", { class: "text-lg font-semibold line-clamp-2 mb-2" }, toDisplayString(write.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                write.summary ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-base-content/70 text-sm line-clamp-2 mb-3"
                                }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                                createVNode("div", { class: "flex flex-wrap items-center gap-4 text-xs text-base-content/60" }, [
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
                                    createTextVNode(" " + toDisplayString(write.views_count) + " görüntüleme ", 1)
                                  ]),
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
                                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      })
                                    ])),
                                    createTextVNode(" " + toDisplayString(formatDate(write.created_at)), 1)
                                  ]),
                                  write.updated_at !== write.created_at ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "flex items-center gap-1"
                                  }, [
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
                                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      })
                                    ])),
                                    createTextVNode(" Son güncelleme: " + toDisplayString(formatDate(write.updated_at)), 1)
                                  ])) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }),
                                  class: "btn btn-primary btn-sm"
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
                                        d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z"
                                      }),
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      })
                                    ])),
                                    createTextVNode(" Oku ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                unref(auth).user ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "dropdown dropdown-end"
                                }, [
                                  createVNode("button", { class: "btn btn-ghost btn-sm" }, [
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
                                        d: "M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      })
                                    ]))
                                  ]),
                                  createVNode("ul", { class: "dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow" }, [
                                    createVNode("li", null, [
                                      createVNode(unref(Link), {
                                        href: _ctx.route("writes.edit", write.slug),
                                        class: "flex items-center gap-2"
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
                                        _: 2
                                      }, 1032, ["href"])
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("button", {
                                        onClick: ($event) => deleteWrite(write),
                                        class: "flex items-center gap-2 text-error"
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
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
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
                      createVNode("div", null, [
                        searchQuery.value || statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, " Arama kriterlerinize uygun yazı bulunamadı. ")) : (openBlock(), createBlock("span", { key: 1 }, " Bu kategoride henüz yazı bulunmuyor. "))
                      ])
                    ])),
                    isLoadingMore.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-4"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "card border border-base-200 bg-base-100 shadow-sm"
                        }, [
                          createVNode("div", { class: "card-body p-6" }, [
                            createVNode("div", { class: "flex items-start gap-4" }, [
                              createVNode("div", { class: "skeleton h-12 w-12 rounded-lg" }),
                              createVNode("div", { class: "flex-1 space-y-2" }, [
                                createVNode("div", { class: "skeleton h-5 w-3/4 rounded-lg" }),
                                createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                                createVNode("div", { class: "skeleton h-4 w-2/3 rounded-lg" })
                              ]),
                              createVNode("div", { class: "skeleton h-8 w-20 rounded-lg" })
                            ])
                          ])
                        ]);
                      }), 64))
                    ])) : createCommentVNode("", true),
                    hasMore.value ? (openBlock(), createBlock("div", {
                      key: 3,
                      ref_key: "observerTarget",
                      ref: observerTarget,
                      class: "h-8 w-full flex items-center justify-center"
                    }, [
                      createVNode("div", { class: "loading loading-spinner loading-sm" }),
                      createVNode("span", { class: "ml-2 text-sm text-base-content/60" }, "Daha fazla yazı yükleniyor...")
                    ], 512)) : createCommentVNode("", true)
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de552c19"]]);
export {
  Screen as default
};
