import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutWritesCategories-BgwKN0Jo.js";
import Screen from "./Screen-DJsHl5ev.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CRuOLMV3.js";
import "./SidebarLayoutWrite-DzMio2-5.js";
import "./TopSubsidebar-BQHVYzYO.js";
import "./WriteList-BOfZtOXT.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./PerformanceMonitorButton-BXT0AKOe.js";
import "./ToggleSubSidebarButton-C0YTLScw.js";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./SidebarLayoutCategory-Cz2_H5gs.js";
import "./CategoryTree-JL8VdTcJ.js";
import "./GoBackButton-u55EQwn1.js";
import "./CheckScreen-Dy3gXO5k.js";
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
