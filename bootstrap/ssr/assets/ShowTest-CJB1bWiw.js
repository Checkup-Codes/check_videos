import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutTestCategories-BOYlGSJI.js";
import _sfc_main$3 from "./Screen-DaUC0Nf3.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CQHak4HA.js";
import "./SidebarLayoutTest-BOaa4SWM.js";
import "./TestList-b5Xw0B8n.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DNDkVWuC.js";
import "./SubSidebarScreen-BaVEfKio.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-C3knlPuT.js";
import "./CategoryTree-DOrljEAa.js";
import "./CheckScreen-juRHZR4N.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowTestPage"
}, {
  __name: "ShowTest",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const test = props.test || {};
    const metaTitle = computed(() => {
      return test.title || "Test Detayları";
    });
    const metaDescription = computed(() => {
      return test.description || "Test detayları ve sorular";
    });
    const metaKeywords = computed(() => {
      return test.title || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: metaTitle.value,
        description: metaDescription.value,
        keywords: metaKeywords.value
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/ShowTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
