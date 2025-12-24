import { computed, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import _sfc_main$1 from "./LayoutTestCategories-DaJbgsIs.js";
import _sfc_main$2 from "./Screen-Ciz9MVFk.js";
import "@inertiajs/vue3";
import "./FlashMessage-D-FCyLof.js";
import "./SidebarLayoutTest-Wfdg74yQ.js";
import "./TestList-Cnc-dGHw.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./useSidebar-DbOjWDc5.js";
import "./IconMenu-BWjMD6eg.js";
import "./IconFolder-Q1UwPFvL.js";
import "./SidebarLayoutCategory-DuiiNfDc.js";
import "./CategoryTree-BQUdblcd.js";
import "./IconChevronDown-phZsUDO_.js";
import "./CheckScreen-DjaYf9so.js";
import "./IntroScreen-CaL0i34h.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexTestPage"
}, {
  __name: "IndexTest",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ class: currentTheme.value }, _attrs), {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/IndexTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
