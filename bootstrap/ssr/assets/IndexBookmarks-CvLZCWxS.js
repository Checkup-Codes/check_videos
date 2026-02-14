import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutBookmarks-B1JC9JCK.js";
import Screen from "./Screen-DTtNC-ex.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutBookmarks-6fDZn-kN.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./CategoryList-D9ldfKbI.js";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "IndexBookmarks",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const categories = computed(() => page.props.categories || []);
    const allBookmarks = computed(() => page.props.allBookmarks || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Screen, {
              categories: categories.value,
              allBookmarks: allBookmarks.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Screen, {
                categories: categories.value,
                allBookmarks: allBookmarks.value
              }, null, 8, ["categories", "allBookmarks"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/IndexBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
