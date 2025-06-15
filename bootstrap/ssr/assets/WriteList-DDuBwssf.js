import { ref, onMounted, onUnmounted, computed, onActivated, onDeactivated, watch, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const SCROLL_RESET_INTERVAL = 10 * 60 * 1e3;
function useScrollManager(storageKey, resetInterval = SCROLL_RESET_INTERVAL) {
  const lastResetTime = ref(parseInt(localStorage.getItem(`${storageKey}_lastReset`)) || Date.now());
  let scrollTimeout = null;
  const saveScrollPosition = (scrollTop, immediate = false) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    const save = () => {
      if (scrollTop > 0) {
        localStorage.setItem(storageKey, scrollTop.toString());
      }
    };
    if (immediate) {
      save();
    } else {
      scrollTimeout = setTimeout(save, 100);
    }
  };
  const getSavedScrollPosition = () => {
    const now = Date.now();
    const timeSinceLastReset = now - lastResetTime.value;
    if (timeSinceLastReset >= resetInterval) {
      console.log(`Resetting scroll position for ${storageKey} due to timeout`);
      localStorage.removeItem(storageKey);
      lastResetTime.value = now;
      localStorage.setItem(`${storageKey}_lastReset`, now.toString());
      return 0;
    }
    const saved = parseInt(localStorage.getItem(storageKey));
    return !isNaN(saved) && saved > 0 ? saved : 0;
  };
  const resetScroll = () => {
    localStorage.removeItem(storageKey);
    lastResetTime.value = Date.now();
    localStorage.setItem(`${storageKey}_lastReset`, lastResetTime.value.toString());
  };
  const cleanup = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };
  let resetCheckInterval;
  onMounted(() => {
    resetCheckInterval = setInterval(
      () => {
        const now = Date.now();
        const timeSinceLastReset = now - lastResetTime.value;
        if (timeSinceLastReset >= resetInterval) {
          resetScroll();
        }
      },
      Math.min(resetInterval, 6e4)
    );
  });
  onUnmounted(() => {
    cleanup();
    if (resetCheckInterval) {
      clearInterval(resetCheckInterval);
    }
  });
  return {
    saveScrollPosition,
    getSavedScrollPosition,
    resetScroll,
    cleanup
  };
}
const STORAGE_KEY = "writeList_scrollPosition";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "WriteList" }, {
  __name: "WriteList",
  __ssrInlineRender: true,
  props: {
    writes: Array,
    route: Function
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const page = usePage();
    const isAdmin = page.props.isAdmin || false;
    const scrollContainer = ref(null);
    let isActive = false;
    const activeWrite = ref("");
    const { saveScrollPosition, getSavedScrollPosition, cleanup } = useScrollManager(STORAGE_KEY);
    const filteredWrites = computed(() => {
      return isAdmin ? props.writes : props.writes.filter((write) => write.status !== "private");
    });
    __expose({ filteredWrites, scrollContainer });
    const handleWriteClick = (write) => {
      var _a;
      const currentScroll = ((_a = scrollContainer.value) == null ? void 0 : _a.scrollTop) || 0;
      if (currentScroll > 0) {
        saveScrollPosition(currentScroll, true);
      }
    };
    const restoreScrollPosition = () => {
      if (!scrollContainer.value) return;
      const savedPosition = getSavedScrollPosition();
      if (savedPosition > 0) {
        scrollContainer.value.scrollTop = savedPosition;
        const activeWriteElement = document.querySelector(".border-primary");
        if (activeWriteElement) {
          const containerRect = scrollContainer.value.getBoundingClientRect();
          const elementRect = activeWriteElement.getBoundingClientRect();
          if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
            activeWriteElement.scrollIntoView({ block: "center", behavior: "instant" });
          }
        }
      }
    };
    onActivated(() => {
      isActive = true;
      restoreScrollPosition();
      updateActiveWrite();
    });
    onDeactivated(() => {
      var _a;
      isActive = false;
      const currentScroll = ((_a = scrollContainer.value) == null ? void 0 : _a.scrollTop) || 0;
      if (currentScroll > 0) {
        saveScrollPosition(currentScroll, true);
      }
    });
    watch(
      () => props.writes,
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          restoreScrollPosition();
        }
      },
      { deep: true }
    );
    const updateActiveWrite = () => {
      activeWrite.value = window.location.pathname;
    };
    onMounted(() => {
      var _a;
      isActive = true;
      updateActiveWrite();
      restoreScrollPosition();
      const handleScroll = () => {
        if (isActive && scrollContainer.value) {
          saveScrollPosition(scrollContainer.value.scrollTop);
        }
      };
      (_a = scrollContainer.value) == null ? void 0 : _a.addEventListener("scroll", handleScroll, { passive: true });
      const handlePopState = () => {
        if (isActive) {
          restoreScrollPosition();
          updateActiveWrite();
        }
      };
      const handleNavigationStart = () => {
        if (isActive && scrollContainer.value) {
          const currentScroll = scrollContainer.value.scrollTop;
          if (currentScroll > 0) {
            saveScrollPosition(currentScroll, true);
          }
        }
      };
      const handleNavigationEnd = () => {
        if (isActive) {
          restoreScrollPosition();
          updateActiveWrite();
        }
      };
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("inertia:start", handleNavigationStart);
      window.addEventListener("inertia:finish", handleNavigationEnd);
      onUnmounted(() => {
        var _a2;
        isActive = false;
        cleanup();
        (_a2 = scrollContainer.value) == null ? void 0 : _a2.removeEventListener("scroll", handleScroll);
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("inertia:start", handleNavigationStart);
        window.removeEventListener("inertia:finish", handleNavigationEnd);
      });
    });
    const formatDate = (date) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "write-list-container h-full space-y-1 overflow-y-auto p-3"
      }, _attrs))} data-v-3ade40c9><!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: [
            "block items-center justify-between rounded-lg border px-1 py-2 backdrop-blur-md transition-all duration-200",
            activeWrite.value === `/writes/${write.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
          ],
          onClick: ($event) => handleWriteClick()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-1 flex items-center gap-2" data-v-3ade40c9${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span data-v-3ade40c9${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-3ade40c9${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-3ade40c9${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (write.status === "link_only") {
                _push2(`<span class="${ssrRenderClass([activeWrite.value === `/writes/${write.slug}` ? "text-primary-content" : "text-primary"])}" data-v-3ade40c9${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-3ade40c9${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-3ade40c9${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-v-3ade40c9${_scopeId}>${ssrInterpolate(write.title)}</span></div><div class="text-base-content/70 flex justify-between text-xs" data-v-3ade40c9${_scopeId}><span data-v-3ade40c9${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span class="flex items-center gap-1" data-v-3ade40c9${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3ade40c9${_scopeId}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" data-v-3ade40c9${_scopeId}></path><circle cx="12" cy="12" r="3" data-v-3ade40c9${_scopeId}></circle></svg> ${ssrInterpolate(write.views_count)}</span></div>`);
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
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-3ade40c9><div data-v-3ade40c9>Henüz yazı bulunmuyor</div></div>`);
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
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ade40c9"]]);
export {
  WriteList as default
};
