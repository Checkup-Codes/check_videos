import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-CPF3dvB-.js";
import _sfc_main$2 from "./Screen-Bm3r9KGn.js";
import "@inertiajs/vue3";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-BOhyuYe7.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-Cx8WJOoq.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-Bdz45y_k.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CategoryTree-CJ6HP-0T.js";
import "./CheckScreen-G62taWZ6.js";
import "./GoBackButton-u55EQwn1.js";
import "./CategoriesCreateFrom-kQrBvJAp.js";
import "./TopScreen-DnNmtdW-.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateCategoryPage"
}, {
  __name: "CreateCategory",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/CreateCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
