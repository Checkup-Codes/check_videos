import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutTestCategories-AhRo7IJV.js";
import _sfc_main$2 from "./Screen-CGwn5qL1.js";
import "@inertiajs/vue3";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutTest-Wfdg74yQ.js";
import "./TestList-Cnc-dGHw.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
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
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
import "./TestUpdateForm-BuL-K3Xv.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "EditTestPage"
}, {
  __name: "EditTest",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/EditTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
