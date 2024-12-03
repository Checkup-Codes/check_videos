import { ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$3 from "./TopSubsidebar-CTQhPuSn.js";
import WriteList from "./WriteList-Dvr0sWzx.js";
import { usePage } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$2 } from "./CheckSubsidebar-BzF3tbsH.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props } = usePage();
    const writes = ref(props.writes);
    ref(props.categories);
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
            _push2(ssrRenderComponent(_sfc_main$3, { title: "YAZILAR" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(WriteList, {
              writes: writes.value,
              route: _ctx.route
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, { title: "YAZILAR" }),
              createVNode(WriteList, {
                writes: writes.value,
                route: _ctx.route
              }, null, 8, ["writes", "route"])
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
