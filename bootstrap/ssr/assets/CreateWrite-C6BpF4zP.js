import { computed, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-BZIx0N8k.js";
import _sfc_main$2 from "./Screen-iVhxR6Ca.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-Di0mqd82.js";
import "./TopSubsidebar-DW1eDitX.js";
import "./WriteList-CC4IW1P8.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-txDEUcg-.js";
import "./CategoryTree-Bt1TVaOS.js";
import "./CheckScreen-BIqwcPls.js";
import "./WriteCreateForm-BZ2VoCCz.js";
import "./RichTextEditor-OP0dOd6Z.js";
import "quill";
/* empty css                    */
/* empty css                             */
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateWritePage"
}, {
  __name: "CreateWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
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
      _push(ssrRenderComponent(_sfc_main$1, { class: currentTheme.value }, {
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
