import { computed, ref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DNDkVWuC.js";
import _sfc_main$3 from "./VersionList-CEVMYLL5.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-BaVEfKio.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const props = computed(() => page.props);
    const url = computed(() => page.url);
    const versions = computed(() => props.value.versions || []);
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const isNarrow = ref(false);
    const scrollableRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        isNarrow: isNarrow.value,
        class: currentTheme.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded"
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
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded"
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutVersion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e108c2a8"]]);
export {
  SidebarLayoutVersion as default
};
