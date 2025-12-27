import { computed, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutBookmarks-CHaP1v8n.js";
import _sfc_main$2 from "./Screen-CprJ-W9o.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutBookmarks-BYKTJlEI.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./CategoryList-DHavE1bp.js";
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
  __name: "EditBookmark",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const bookmark = computed(() => page.props.bookmark);
    const categories = computed(() => page.props.categories || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              bookmark: bookmark.value,
              categories: categories.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                bookmark: bookmark.value,
                categories: categories.value
              }, null, 8, ["bookmark", "categories"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/EditBookmark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
