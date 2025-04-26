import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-DOBo1rlr.js";
import _sfc_main$2 from "./Screen-CZKguiOT.js";
import "./FlashMessage-D4SjMXTN.js";
import "./TopSubsidebar-BzzRvyod.js";
import "@inertiajs/vue3";
import "./Button-CWlX4hVa.js";
import "./SidebarRendition-38nezJNK.js";
import "./CheckSubsidebar-Co4EbavJ.js";
import "./SidebarPackGame-m6e_ls64.js";
import "@inertiajs/inertia";
import "@inertiajs/inertia-vue3";
import "./CheckScreen-J_xllE7d.js";
import "./TopScreen-DGs2djGh.js";
import "./PacksTable-B6kltp3m.js";
import "./MultipleChoice-Bx8rUE-5.js";
import "./TranslateWord-BiHT-xFJ.js";
const _sfc_main = {
  __name: "ShowLanguagePacks",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    languagePack: Object,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, props, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, props, null, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
