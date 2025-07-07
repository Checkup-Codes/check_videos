import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-DTQMAG64.js";
import _sfc_main$2 from "./Screen-dxlylKfY.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-CEL1hqYH.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-D5GVBVat.js";
import "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./PerformanceMonitorButton-DlwfT3Bl.js";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-x6qG5wqp.js";
import "./SidebarLayoutCategory-JcKnR-ON.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CategoryTree-DErSMb25.js";
import "./CheckScreen-G62taWZ6.js";
import "./WriteCreateForm-CPr6CaAL.js";
import "./RichTextEditor-DQWL6655.js";
import "quill";
/* empty css                    */
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateWritePage"
}, {
  __name: "CreateWrite",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Yeni Yazı Oluştur</title><meta name="description" content="Yeni bir blog yazısı oluşturma sayfası"${_scopeId}><meta name="keywords" content="yazı oluştur, blog, içerik yönetimi"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Yeni Yazı Oluştur"),
              createVNode("meta", {
                name: "description",
                content: "Yeni bir blog yazısı oluşturma sayfası"
              }),
              createVNode("meta", {
                name: "keywords",
                content: "yazı oluştur, blog, içerik yönetimi"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/CreateWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
