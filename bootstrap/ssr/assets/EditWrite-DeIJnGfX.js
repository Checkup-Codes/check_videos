import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-CDrY6ddC.js";
import _sfc_main$2 from "./Screen-syXPkflu.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutWrite-DjVfEKRE.js";
import "./WriteList-DVFMWbxG.js";
import "vuex";
import "./IconCalendar-BeMkwtmn.js";
import "./IconEye-C4IDtysD.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./useSidebar-D-dtiIC8.js";
import "./IconMenu-D3qnKg3d.js";
import "./IconFolder-BMytUC2M.js";
import "./IconX-B1Q85S0Q.js";
import "./IconFilter-Cx1-Qiq_.js";
import "./SidebarLayoutCategory-DdmnVFMS.js";
import "./CategoryTree-CAKTzo-p.js";
import "./IconChevronDown-ClwhHkE5.js";
import "./FlashMessage-C3JOGPFR.js";
import "./WriteUpdateForm-Byg2M7hz.js";
import "./RichTextEditor-DGsKcNbo.js";
import "quill";
/* empty css                      */
import "./WriteImageUploader-Cv5wtI5d.js";
import "./CheckScreen-DjaYf9so.js";
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
