import { inject, ref, computed, onActivated, onDeactivated, watch, onMounted, nextTick, onUnmounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
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
    const writes = props.writes.length ? props.writes : inject("writes", []);
    const page = usePage();
    const isAdmin = page.props.isAdmin || false;
    const scrollContainer = ref(null);
    let isActive = false;
    const activeWrite = ref("");
    const searchQuery = ref("");
    const adminFilter = ref("all");
    const showFilterMenu = ref(false);
    const filteredWrites = computed(() => {
      let result = writes;
      if (searchQuery.value) {
        result = result.filter((write) => write.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
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
      () => writes,
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) ;
      },
      { deep: true }
    );
    const updateActiveWrite = () => {
      activeWrite.value = window.location.pathname;
    };
    const getScrollKey = () => {
      return `writeListScroll_${adminFilter.value}_${searchQuery.value}`;
    };
    const handleScroll = (e) => {
      localStorage.setItem(getScrollKey(), e.target.scrollTop);
    };
    onMounted(() => {
      isActive = true;
      const savedFilter = localStorage.getItem("writeListFilter");
      if (savedFilter) adminFilter.value = savedFilter;
      const savedSearch = localStorage.getItem("writeListSearch");
      if (savedSearch) searchQuery.value = savedSearch;
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
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(void 0, options);
    };
    watch(adminFilter, (val) => {
      localStorage.setItem("writeListFilter", val);
    });
    watch(searchQuery, (val) => {
      localStorage.setItem("writeListSearch", val);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "write-list-container space-y-1 overflow-y-auto p-3"
      }, _attrs))} data-v-5685b0fa><div class="mb-3" data-v-5685b0fa><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full" placeholder="Yazı başlığı ara..." data-v-5685b0fa></div>`);
      if (unref(isAdmin)) {
        _push(`<div class="mb-3" data-v-5685b0fa><div class="hidden gap-2 sm:flex" data-v-5685b0fa><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "all" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-5685b0fa>`);
        if (props.isCollapsed) {
          _push(`<span data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5685b0fa></path></svg></span>`);
        } else {
          _push(`<span data-v-5685b0fa>Tümü</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "published" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-5685b0fa>`);
        if (props.isCollapsed) {
          _push(`<span data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><circle cx="12" cy="12" r="10" stroke-width="2" data-v-5685b0fa></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-5685b0fa></path></svg></span>`);
        } else {
          _push(`<span data-v-5685b0fa>Herkese Açık</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "link_only" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-5685b0fa>`);
        if (props.isCollapsed) {
          _push(`<span data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-5685b0fa></path></svg></span>`);
        } else {
          _push(`<span data-v-5685b0fa>Sadece Link</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "private" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-5685b0fa>`);
        if (props.isCollapsed) {
          _push(`<span data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-5685b0fa></path></svg></span>`);
        } else {
          _push(`<span data-v-5685b0fa>Gizli</span>`);
        }
        _push(`</button></div><div class="relative inline-block sm:hidden" data-v-5685b0fa><button class="btn btn-ghost btn-xs" data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" data-v-5685b0fa></path></svg></button>`);
        if (showFilterMenu.value) {
          _push(`<div class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5" data-v-5685b0fa><div class="flex flex-col gap-1 py-1" data-v-5685b0fa><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "all" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5685b0fa></path></svg></button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "published" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><circle cx="12" cy="12" r="10" stroke-width="2" data-v-5685b0fa></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-5685b0fa></path></svg></button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "link_only" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-5685b0fa></path></svg></button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "private" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-5685b0fa><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5685b0fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-5685b0fa></path></svg></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: [
            "block items-center justify-between rounded-lg border px-1 py-2 backdrop-blur-md transition-all duration-200",
            activeWrite.value === `/writes/${write.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-1 flex items-center gap-2" data-v-5685b0fa${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span data-v-5685b0fa${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-5685b0fa${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-5685b0fa${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (write.status === "link_only") {
                _push2(`<span class="${ssrRenderClass([activeWrite.value === `/writes/${write.slug}` ? "text-primary-content" : "text-primary"])}" data-v-5685b0fa${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-5685b0fa${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-5685b0fa${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-v-5685b0fa${_scopeId}>${ssrInterpolate(write.title)}</span></div><div class="text-base-content/70 flex justify-between text-xs" data-v-5685b0fa${_scopeId}><span data-v-5685b0fa${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span class="flex items-center gap-1" data-v-5685b0fa${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5685b0fa${_scopeId}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" data-v-5685b0fa${_scopeId}></path><circle cx="12" cy="12" r="3" data-v-5685b0fa${_scopeId}></circle></svg> ${ssrInterpolate(write.views_count)}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "mb-1 flex items-center gap-2" }, [
                  write.status === "private" ? (openBlock(), createBlock("span", { key: 0 }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
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
                    class: [activeWrite.value === `/writes/${write.slug}` ? "text-primary-content" : "text-primary"]
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ], 2)) : createCommentVNode("", true),
                  createVNode("span", null, toDisplayString(write.title), 1)
                ]),
                createVNode("div", { class: "text-base-content/70 flex justify-between text-xs" }, [
                  createVNode("span", null, toDisplayString(formatDate(write.created_at)), 1),
                  createVNode("span", { class: "flex items-center gap-1" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-[14px] w-[14px]",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
                      createVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(write.views_count), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (filteredWrites.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-5685b0fa><div data-v-5685b0fa>Henüz yazı bulunmuyor</div></div>`);
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
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5685b0fa"]]);
export {
  WriteList as default
};
