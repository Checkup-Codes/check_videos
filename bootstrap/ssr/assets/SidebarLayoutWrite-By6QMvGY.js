import { ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./TopSubsidebar-ChFM9Ijr.js";
import _sfc_main$5 from "./WriteList-CMiuScR5.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-C4Kqliz4.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-BLfYMtJv.js";
import { _ as _sfc_main$4 } from "./SubSidebarScreen-q45DpGfz.js";
import "./Button-CxoVCCz0.js";
const _sfc_main = {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props } = usePage();
    const writes = ref(props.writes);
    const isCollapsed = ref(true);
    const emit = __emit;
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
              toggle: collapseSidebar
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "YAZILAR",
              href: "/writes/create"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    writes: writes.value,
                    route: _ctx.route
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5, {
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
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "YAZILAR",
                href: "/writes/create"
              }),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5, {
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
