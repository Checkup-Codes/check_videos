import { computed, inject, ref, onActivated, onDeactivated, watch, nextTick, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "WriteList" }, {
  __name: "WriteList",
  __ssrInlineRender: true,
  props: {
    writes: { type: Array, default: () => [] },
    route: { type: Function, default: null },
    isCollapsed: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const writes = computed(() => {
      if (props.writes && props.writes.length > 0) {
        return props.writes;
      }
      const injectedWrites = inject("writes", []);
      if (injectedWrites && injectedWrites.length > 0) {
        return injectedWrites;
      }
      return [];
    });
    const page = usePage();
    const isAdmin = page.props.isAdmin || false;
    const scrollContainer = ref(null);
    ref(null);
    let isActive = false;
    const activeWrite = ref("");
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    const adminFilter = ref("all");
    const showFilterMenu = ref(false);
    const getWriteRoute = (write) => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("/categories/")) {
        const pathParts = currentPath.split("/").filter((part) => part.length > 0);
        if (pathParts.length >= 2 && pathParts[0] === "categories") {
          const categorySlug = pathParts[1];
          if (categorySlug && categorySlug !== "create" && categorySlug !== "edit") {
            return route("categories.showByCategory", { category: categorySlug, slug: write.slug });
          }
        }
      }
      return route("writes.show", { write: write.slug });
    };
    const getActiveWritePath = (write) => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("/categories/")) {
        const pathParts = currentPath.split("/").filter((part) => part.length > 0);
        if (pathParts.length >= 2 && pathParts[0] === "categories") {
          const categorySlug = pathParts[1];
          if (categorySlug && categorySlug !== "create" && categorySlug !== "edit") {
            return `/categories/${categorySlug}/${write.slug}`;
          }
        }
      }
      return `/writes/${write.slug}`;
    };
    const filteredWrites = computed(() => {
      let result = writes.value;
      if (debouncedSearchQuery.value) {
        result = result.filter((write) => write.title.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()));
      }
      if (!isAdmin) {
        result = result.filter((write) => write.status !== "private");
        return result;
      } else {
        if (adminFilter.value === "published") {
          result = result.filter((write) => write.status === "published");
        } else if (adminFilter.value === "link_only") {
          result = result.filter((write) => write.status === "link_only");
        } else if (adminFilter.value === "private") {
          result = result.filter((write) => write.status === "private");
        }
        return result;
      }
    });
    __expose({ filteredWrites, scrollContainer });
    onActivated(() => {
      isActive = true;
      updateActiveWrite();
    });
    onDeactivated(() => {
      isActive = false;
    });
    watch(
      () => page.url,
      () => {
        nextTick(() => {
          updateActiveWrite();
        });
      }
    );
    const updateActiveWrite = () => {
      activeWrite.value = window.location.pathname;
    };
    const getScrollKey = () => {
      return `writeListScroll_${adminFilter.value}_${debouncedSearchQuery.value}`;
    };
    const handleScroll = (e) => {
      localStorage.setItem(getScrollKey(), e.target.scrollTop);
    };
    onMounted(() => {
      isActive = true;
      const savedFilter = localStorage.getItem("writeListFilter");
      if (savedFilter) adminFilter.value = savedFilter;
      const savedSearch = localStorage.getItem("writeListSearch");
      if (savedSearch) {
        searchQuery.value = savedSearch;
        debouncedSearchQuery.value = savedSearch;
      }
      updateActiveWrite();
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem(getScrollKey());
          if (savedScroll) {
            scrollContainer.value.scrollTop = parseInt(savedScroll, 10);
          }
        }
      });
      const handlePopState = () => {
        if (isActive) {
          updateActiveWrite();
        }
      };
      const handleNavigationStart = () => {
      };
      const handleNavigationEnd = () => {
        if (isActive) {
          updateActiveWrite();
        }
      };
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("inertia:start", handleNavigationStart);
      window.addEventListener("inertia:finish", handleNavigationEnd);
      onUnmounted(() => {
        isActive = false;
        if (scrollContainer.value) {
          scrollContainer.value.removeEventListener("scroll", handleScroll);
        }
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("inertia:start", handleNavigationStart);
        window.removeEventListener("inertia:finish", handleNavigationEnd);
      });
    });
    const formatDate = (date) => {
      const dateObj = new Date(date);
      const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
      const day = dateObj.getDate();
      const month = monthNames[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      return `${day} ${month} ${year}`;
    };
    const formatNumber = (num) => {
      return new Intl.NumberFormat("tr-TR").format(num);
    };
    watch(adminFilter, (val) => {
      localStorage.setItem("writeListFilter", val);
    });
    watch(debouncedSearchQuery, (val) => {
      localStorage.setItem("writeListSearch", val);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "write-list-container space-y-1 overflow-y-auto p-3"
      }, _attrs))} data-v-3a388fd0><div class="mb-3" data-v-3a388fd0><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full" placeholder="Yazı başlığı ara..." data-v-3a388fd0></div>`);
      if (unref(isAdmin)) {
        _push(`<div class="mb-3" data-v-3a388fd0><div class="hidden gap-2 sm:flex" data-v-3a388fd0><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "all" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-3a388fd0>`);
        if (props.isCollapsed) {
          _push(`<span data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3a388fd0></path></svg></span>`);
        } else {
          _push(`<span data-v-3a388fd0>Tümü</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "published" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-3a388fd0>`);
        if (props.isCollapsed) {
          _push(`<span data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><circle cx="12" cy="12" r="10" stroke-width="2" data-v-3a388fd0></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-3a388fd0></path></svg></span>`);
        } else {
          _push(`<span data-v-3a388fd0>Herkese Açık</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "link_only" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-3a388fd0>`);
        if (props.isCollapsed) {
          _push(`<span data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-3a388fd0></path></svg></span>`);
        } else {
          _push(`<span data-v-3a388fd0>Sadece Link</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "private" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-3a388fd0>`);
        if (props.isCollapsed) {
          _push(`<span data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-3a388fd0></path></svg></span>`);
        } else {
          _push(`<span data-v-3a388fd0>Gizli</span>`);
        }
        _push(`</button></div><div class="relative inline-block sm:hidden" data-v-3a388fd0><button class="btn btn-ghost btn-xs" data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" data-v-3a388fd0></path></svg></button>`);
        if (showFilterMenu.value) {
          _push(`<div class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5" data-v-3a388fd0><div class="flex flex-col gap-1 py-1" data-v-3a388fd0><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "all" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3a388fd0></path></svg></button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "published" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><circle cx="12" cy="12" r="10" stroke-width="2" data-v-3a388fd0></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-3a388fd0></path></svg></button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "link_only" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-3a388fd0></path></svg></button><button class="${ssrRenderClass([{ "bg-base-content text-base-100": adminFilter.value === "private" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-3a388fd0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-3a388fd0></path></svg></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2" data-v-3a388fd0><!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: getWriteRoute(write),
          class: [
            "block rounded-lg p-3",
            activeWrite.value === getActiveWritePath(write) ? "bg-base-content text-base-100" : "border border-base-300 bg-base-100 hover:bg-base-300"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-1" data-v-3a388fd0${_scopeId}><h3 class="${ssrRenderClass([activeWrite.value === getActiveWritePath(write) ? "text-base-100" : "text-base-content", "line-clamp-2 text-sm font-medium leading-tight"])}" data-v-3a388fd0${_scopeId}>${ssrInterpolate(write.title)}</h3></div><div class="${ssrRenderClass([activeWrite.value === getActiveWritePath(write) ? "text-base-100/70" : "text-base-content/70", "flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"])}" data-v-3a388fd0${_scopeId}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3" data-v-3a388fd0${_scopeId}><span class="flex items-center gap-1" data-v-3a388fd0${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-3a388fd0${_scopeId}></path></svg><span class="truncate" data-v-3a388fd0${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span></span><span class="flex items-center gap-1" data-v-3a388fd0${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3a388fd0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-3a388fd0${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-3a388fd0${_scopeId}></path></svg><span class="truncate" data-v-3a388fd0${_scopeId}>${ssrInterpolate(formatNumber(write.views_count))} görüntülenme</span></span></div><div class="flex items-center gap-1 self-start sm:self-center" data-v-3a388fd0${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span class="text-warning" title="Gizli yazı" data-v-3a388fd0${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-3a388fd0${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-3a388fd0${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (write.status === "link_only") {
                _push2(`<span class="text-info" title="Sadece link" data-v-3a388fd0${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-3a388fd0${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-3a388fd0${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "mb-1" }, [
                  createVNode("h3", {
                    class: ["line-clamp-2 text-sm font-medium leading-tight", activeWrite.value === getActiveWritePath(write) ? "text-base-100" : "text-base-content"]
                  }, toDisplayString(write.title), 3)
                ]),
                createVNode("div", {
                  class: ["flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between", activeWrite.value === getActiveWritePath(write) ? "text-base-100/70" : "text-base-content/70"]
                }, [
                  createVNode("div", { class: "flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3" }, [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3 flex-shrink-0",
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
                      createVNode("span", { class: "truncate" }, toDisplayString(formatDate(write.created_at)), 1)
                    ]),
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3 flex-shrink-0",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
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
                      createVNode("span", { class: "truncate" }, toDisplayString(formatNumber(write.views_count)) + " görüntülenme", 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-1 self-start sm:self-center" }, [
                    write.status === "private" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-warning",
                      title: "Gizli yazı"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    write.status === "link_only" ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-info",
                      title: "Sadece link"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (filteredWrites.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-3a388fd0><div data-v-3a388fd0>Henüz yazı bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composables/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a388fd0"]]);
export {
  WriteList as default
};
