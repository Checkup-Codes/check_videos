import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutTestCategories-CPJEl1HF.js";
import _sfc_main$3 from "./Screen-DL5D89r-.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CQHak4HA.js";
import "./SidebarLayoutTest-tzEkhXZS.js";
import "./TestList-D_f7BfrK.js";
import "./CheckSubsidebar-DfwdLh-u.js";
import "./SubSidebarScreen-DMn-8f1h.js";
import "./useSidebar-DbOjWDc5.js";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SidebarLayoutCategory-DhpuPQAL.js";
import "./CategoryTree-mQ-15a0V.js";
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
