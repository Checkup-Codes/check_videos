import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutWritesCategories-BKfzlJxy.js";
import Screen from "./Screen-BJ8BDi3K.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-sc4YhRBK.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-CFNbsDjI.js";
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
import "./SidebarLayoutCategory-VYR2wS6j.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CategoryTree-77fwAOzG.js";
import "./ExcalidrawComponent-CBRfLf7m.js";
import "./CheckScreen-G62taWZ6.js";
/* empty css                             */
import "./useGsapAnimation-DunE29St.js";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
import "./useProcessedQuillContent-DefVwcVW.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowWritePage"
}, {
  __name: "ShowWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = props.write || {};
    const metaTitle = computed(() => {
      return write.title || "Yazı Detayları";
    });
    const metaDescription = computed(() => {
      var _a;
      return write.meta_description || write.summary || truncateText(((_a = write.content) == null ? void 0 : _a.replace(/<[^>]*>?/gm, "")) || "", 160);
    });
    const metaKeywords = computed(() => {
      return write.seo_keywords || write.tags || "";
    });
    const metaImage = computed(() => {
      return write.cover_image || "";
    });
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: metaTitle.value,
        description: metaDescription.value,
        keywords: metaKeywords.value,
        image: metaImage.value,
        type: "article"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Screen, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Screen)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/ShowWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
