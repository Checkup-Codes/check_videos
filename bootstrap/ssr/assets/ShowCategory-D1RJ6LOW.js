import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutWritesCategories-DZCxWFos.js";
import Screen from "./Screen-DO0j_kDq.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-Iju62HvI.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-DV8kYRp2.js";
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
import "gsap";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryPage"
}, {
  __name: "ShowCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = props.category || {};
    const writes = props.writes || [];
    const metaTitle = computed(() => {
      return category.name ? `${category.name} Kategorisi` : "Kategori Detayları";
    });
    const metaDescription = computed(() => {
      const writeCount = category.writes_count || writes.length || 0;
      return category.description || `${category.name} kategorisinde ${writeCount} yazı bulunmaktadır. Bu kategori altındaki tüm içerikleri keşfedin.`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: metaTitle.value,
        description: metaDescription.value,
        type: "website"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/ShowCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
