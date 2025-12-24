import { computed, inject, ref, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./SubSidebarScreen-DNe7gM-E.js";
import _sfc_main$3 from "./VersionList-DVzPtux-.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutVersion"
}, {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const store = useStore();
    const url = computed(() => page.url);
    const injectedVersions = inject("versions", []);
    const versions = computed(() => {
      const versionsValue = (injectedVersions == null ? void 0 : injectedVersions.value) ?? injectedVersions;
      if (versionsValue && Array.isArray(versionsValue) && versionsValue.length > 0) {
        return versionsValue;
      }
      if (page.props.versions && Array.isArray(page.props.versions) && page.props.versions.length > 0) {
        return page.props.versions;
      }
      return [];
    });
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const scrollableRef = ref(null);
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    let scrollHandler = null;
    const getScrollElement = () => {
      var _a, _b, _c;
      if ((_b = (_a = scrollableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.value) {
        return scrollableRef.value.$el.value;
      }
      if ((_c = scrollableRef.value) == null ? void 0 : _c.$el) {
        return scrollableRef.value.$el;
      }
      return scrollableRef.value;
    };
    const saveScrollPosition = () => {
      const scrollElement = getScrollElement();
      if (scrollElement) {
        const scrollTop = scrollElement.scrollTop || 0;
        store.dispatch("Versions/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["Versions/scrollPosition"];
          if (savedPosition > 0) {
            scrollElement.scrollTop = savedPosition;
          }
        }
      });
    };
    const setupScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && !scrollHandler) {
        scrollHandler = () => saveScrollPosition();
        scrollElement.addEventListener("scroll", scrollHandler, { passive: true });
      }
    };
    const removeScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && scrollHandler) {
        scrollElement.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onActivated(() => {
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onDeactivated(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    onBeforeUnmount(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-3" data-v-bc90f461${_scopeId}><div class="flex items-center justify-between gap-2" data-v-bc90f461${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-bc90f461${_scopeId}>Versiyonlar</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    versions: versions.value,
                    currentUrl: url.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      versions: versions.value,
                      currentUrl: url.value
                    }, null, 8, ["versions", "currentUrl"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-3" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-muted-foreground" }, "Versiyonlar")
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    versions: versions.value,
                    currentUrl: url.value
                  }, null, 8, ["versions", "currentUrl"])
                ]),
                _: 1
              }, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutVersion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc90f461"]]);
export {
  SidebarLayoutVersion as default
};
