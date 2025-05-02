import { computed, ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-BLfYMtJv.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-C4Kqliz4.js";
import { _ as _sfc_main$3 } from "./TopSubsidebar-ChFM9Ijr.js";
import _sfc_main$4 from "./VersionList-BhW2HACk.js";
import "./Button-CxoVCCz0.js";
const _sfc_main = {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const props = computed(() => page.props);
    const url = computed(() => page.url);
    const versions = computed(() => props.value.versions || []);
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
              title: "VERSİYONLAR",
              addButton: true,
              addButtonHref: "/versions/create/"
            }, null, _parent2, _scopeId));
            _push2(`<div class="overflow-y-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              versions: versions.value,
              currentUrl: url.value
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "VERSİYONLAR",
                addButton: true,
                addButtonHref: "/versions/create/"
              }),
              createVNode("div", { class: "overflow-y-auto" }, [
                createVNode(_sfc_main$4, {
                  versions: versions.value,
                  currentUrl: url.value
                }, null, 8, ["versions", "currentUrl"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
