import { ref, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TopSubsidebar-7f19mFMx.js";
import WriteList from "./WriteList-D52ZVP2Y.js";
import PerformanceMonitorButton from "./PerformanceMonitorButton-Do3MyRT-.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-aKe8eBeC.js";
import { _ as _sfc_main$3 } from "./SubSidebarScreen-BKy3Ou2K.js";
import { u as useSidebar } from "./useSidebar-x6qG5wqp.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutWrite"
}, {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const { shouldShowPerformanceMonitor, performanceData } = useSidebar();
    const { props } = usePage();
    const writes = ref(props.writes || []);
    const writeListRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "YAZILAR",
              href: "/writes/create",
              class: "border-base-200"
            }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(shouldShowPerformanceMonitor)) {
                    _push3(ssrRenderComponent(PerformanceMonitorButton, { performance: unref(performanceData) }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(shouldShowPerformanceMonitor) ? (openBlock(), createBlock(PerformanceMonitorButton, {
                      key: 0,
                      performance: unref(performanceData)
                    }, null, 8, ["performance"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: writes.value,
                    route: _ctx.route
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(WriteList, {
                      ref_key: "writeListRef",
                      ref: writeListRef,
                      writes: writes.value,
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
                title: "YAZILAR",
                href: "/writes/create",
                class: "border-base-200"
              }, {
                actions: withCtx(() => [
                  unref(shouldShowPerformanceMonitor) ? (openBlock(), createBlock(PerformanceMonitorButton, {
                    key: 0,
                    performance: unref(performanceData)
                  }, null, 8, ["performance"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createVNode(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: writes.value,
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
export {
  _sfc_main as default
};
