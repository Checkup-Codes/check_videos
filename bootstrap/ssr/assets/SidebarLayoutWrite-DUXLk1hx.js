import { ref, watchEffect, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$2 from "./CategoryMenu-DmYz_UpQ.js";
import _sfc_main$3 from "./WriteList-D32Nlkza.js";
import { usePage } from "@inertiajs/vue3";
import "./CButton-Bo0n3h7o.js";
const _sfc_main$1 = {
  __name: "FlashMessage",
  __ssrInlineRender: true,
  props: {
    message: String
  },
  setup(__props) {
    const props = __props;
    const localMessage = ref(props.message);
    watchEffect(() => {
      if (localMessage.value) {
        setTimeout(() => {
          localMessage.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-4 top-4 z-50" }, _attrs))}><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(__props.message)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Notifications/FlashMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const flashSuccess = ref(props.flash.success);
    props.auth;
    const writes = ref(props.writes);
    const categories = ref(props.categories);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-r-2 border-color-one" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        categories: categories.value,
        route: _ctx.route
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        writes: writes.value,
        route: _ctx.route
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
