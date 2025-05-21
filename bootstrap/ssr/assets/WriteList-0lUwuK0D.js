import { ref, computed, onActivated, nextTick, onDeactivated, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
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
    const filteredWrites = computed(() => {
      return isAdmin ? props.writes : props.writes.filter((write) => write.status !== "private");
    });
    __expose({ filteredWrites, scrollContainer });
    const saveScrollPosition = () => {
      if (scrollContainer.value) {
        localStorage.setItem(STORAGE_KEY, scrollContainer.value.scrollTop.toString());
      }
    };
    const restoreScrollPosition = () => {
      if (!scrollContainer.value) return;
      const saved = parseInt(localStorage.getItem(STORAGE_KEY));
      if (!isNaN(saved)) scrollContainer.value.scrollTop = saved;
    };
    onActivated(() => {
      isActive = true;
      nextTick(() => {
        restoreScrollPosition();
        updateActiveWrite();
      });
    });
    onDeactivated(() => {
      isActive = false;
      saveScrollPosition();
    });
    watch(
      () => props.writes,
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          nextTick(restoreScrollPosition);
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
      nextTick(restoreScrollPosition);
      (_a = scrollContainer.value) == null ? void 0 : _a.addEventListener("scroll", saveScrollPosition);
      const handlePopState = () => {
        if (isActive) {
          nextTick(() => {
            restoreScrollPosition();
            updateActiveWrite();
          });
        }
      };
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("inertia:success", updateActiveWrite);
      onUnmounted(() => {
        var _a2;
        isActive = false;
        (_a2 = scrollContainer.value) == null ? void 0 : _a2.removeEventListener("scroll", saveScrollPosition);
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("inertia:success", updateActiveWrite);
        saveScrollPosition();
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
        class: "space-y-1 p-3"
      }, _attrs))}><!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: [
            "block items-center justify-between rounded-lg border px-1 py-2 backdrop-blur-md transition-all duration-200",
            activeWrite.value === `/writes/${write.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
          ],
          onClick: saveScrollPosition
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-1 flex items-center gap-2"${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (write.status === "link_only") {
                _push2(`<span class="${ssrRenderClass([activeWrite.value === `/writes/${write.slug}` ? "text-primary-content" : "text-primary"])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span${_scopeId}>${ssrInterpolate(write.title)}</span></div><div class="text-base-content/70 flex justify-between text-xs"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"${_scopeId}></path><circle cx="12" cy="12" r="3"${_scopeId}></circle></svg> ${ssrInterpolate(write.views_count)}</span></div>`);
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
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50"><div>Henüz yazı bulunmuyor</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composable/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
