import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-875xcYp5.js";
import _sfc_main$2 from "./Screen-CGMGOGSa.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-CNoj0B7g.js";
import "./TopSubsidebar-jFf3ITV_.js";
import "./WriteList-C2BOxrBv.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-Bz4nuT89.js";
import "./CategoryTree-Bt1TVaOS.js";
import "./WriteUpdateForm-BIM8B_gd.js";
import "./RichTextEditor-DfD55EZp.js";
import "quill";
/* empty css                    */
/* empty css                             */
import "./CheckScreen-BIqwcPls.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "EditWritePage"
}, {
  __name: "EditWrite",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Yazı Düzenle</title><meta name="description" content="Blog yazısı düzenleme sayfası"${_scopeId}><meta name="keywords" content="yazı düzenle, blog, içerik yönetimi"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Yazı Düzenle"),
              createVNode("meta", {
                name: "description",
                content: "Blog yazısı düzenleme sayfası"
              }),
              createVNode("meta", {
                name: "keywords",
                content: "yazı düzenle, blog, içerik yönetimi"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/EditWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
