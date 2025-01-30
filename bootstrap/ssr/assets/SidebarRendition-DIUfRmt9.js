import { ref, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-CzPQxoDS.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TopSubsidebar-BzzRvyod.js";
import _sfc_main$4 from "./VersionList-DHYuUGEf.js";
import "./Button-CWlX4hVa.js";
const _sfc_main = {
  __name: "SidebarRendition",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props, url } = usePage();
    const versions = ref(props.versions);
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
              title: "KELİMELER",
              href: "versions/create"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              versions: versions.value,
              currentUrl: unref(url)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "KELİMELER",
                href: "versions/create"
              }),
              createVNode(_sfc_main$4, {
                versions: versions.value,
                currentUrl: unref(url)
              }, null, 8, ["versions", "currentUrl"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/SidebarRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
