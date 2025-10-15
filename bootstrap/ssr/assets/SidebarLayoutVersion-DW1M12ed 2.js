import { computed, ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-Dj7LcfAL.js";
import { _ as _sfc_main$2 } from "./TopSubsidebar-jFf3ITV_.js";
import _sfc_main$4 from "./VersionList-Cxpbo4dz.js";
import { _ as _sfc_main$3 } from "./SubSidebarScreen-BKy3Ou2K.js";
const _sfc_main = {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const props = computed(() => page.props);
    const url = computed(() => page.url);
    const versions = computed(() => props.value.versions || []);
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "VERSİYONLAR",
              href: "/versions/create/",
              class: "border-base-200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    versions: versions.value,
                    currentUrl: url.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, {
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
              createVNode(_sfc_main$2, {
                title: "VERSİYONLAR",
                href: "/versions/create/",
                class: "border-base-200"
              }),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4, {
                    versions: versions.value,
                    currentUrl: url.value
                  }, null, 8, ["versions", "currentUrl"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
