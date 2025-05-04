import { ref, computed, onMounted, markRaw, onActivated, nextTick, onBeforeUnmount, withCtx, createBlock, createCommentVNode, openBlock, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./TopSubsidebar-7f19mFMx.js";
import WriteList from "./WriteList-Cyr5_ivY.js";
import PerformanceMonitorButton from "./PerformanceMonitorButton-D4ne0zEy.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-BZirZ79m.js";
import { _ as _sfc_main$4 } from "./SubSidebarScreen-q45DpGfz.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutWrite"
}, {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const MemoizedWriteList = WriteList;
    const { props } = usePage();
    const writes = ref(props.writes || []);
    const memoizedWrites = computed(() => writes.value);
    const isCollapsed = ref(true);
    const emit = __emit;
    const writeListRef = ref(null);
    const shouldShowPerformanceMonitor = computed(() => {
      return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
    });
    const performanceData = computed(() => props.performance || {});
    onMounted(() => {
      if (typeof route !== "undefined") {
        markRaw(route);
      }
    });
    onActivated(() => {
      nextTick(() => {
        if (writeListRef.value && writeListRef.value.scrollContainer) ;
      });
    });
    onBeforeUnmount(() => {
      writeListRef.value = null;
    });
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("update:isCollapsed", isCollapsed.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              isCollapsed: false,
              toggle: collapseSidebar,
              class: "btn-ghost"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "YAZILAR",
              href: "/writes/create",
              class: "border-base-200"
            }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (shouldShowPerformanceMonitor.value) {
                    _push3(ssrRenderComponent(PerformanceMonitorButton, {
                      class: "hidden lg:block",
                      performance: performanceData.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    shouldShowPerformanceMonitor.value ? (openBlock(), createBlock(PerformanceMonitorButton, {
                      key: 0,
                      class: "hidden lg:block",
                      performance: performanceData.value
                    }, null, 8, ["performance"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MemoizedWriteList), {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: memoizedWrites.value,
                    route: _ctx.route
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(MemoizedWriteList), {
                      ref_key: "writeListRef",
                      ref: writeListRef,
                      writes: memoizedWrites.value,
                      route: _ctx.route
                    }, null, 8, ["writes", "route"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar,
                class: "btn-ghost"
              }),
              createVNode(_sfc_main$3, {
                title: "YAZILAR",
                href: "/writes/create",
                class: "border-base-200"
              }, {
                actions: withCtx(() => [
                  shouldShowPerformanceMonitor.value ? (openBlock(), createBlock(PerformanceMonitorButton, {
                    key: 0,
                    class: "hidden lg:block",
                    performance: performanceData.value
                  }, null, 8, ["performance"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(unref(MemoizedWriteList), {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: memoizedWrites.value,
                    route: _ctx.route
                  }, null, 8, ["writes", "route"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutWrite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ca31b7c"]]);
export {
  SidebarLayoutWrite as default
};
