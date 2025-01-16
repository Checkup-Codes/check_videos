import { mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "VersionList",
  __ssrInlineRender: true,
  props: {
    versions: {
      type: Array,
      required: true
    },
    currentUrl: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const getLinkClasses = (href) => {
      return props.currentUrl === `${href}` ? "block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 bg-primary-200 text-black shadow-inner" : "block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 hover:shadow-inner";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref: "scrollContainer",
        class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
      }, _attrs))}><div class="min-h-full"><!--[-->`);
      ssrRenderList(__props.versions, (version) => {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/versions/${version.version}`,
          class: [getLinkClasses(`/versions/${version.version}`), "block rounded-sm border-b-[1px] bg-white duration-200 ease-in-out hover:border-gray-300"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 py-3"${_scopeId}><div class="text-md font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(version.version)}</div><div class="flex items-center"${_scopeId}><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(version.release_date)}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-4 py-3" }, [
                  createVNode("div", { class: "text-md font-semibold text-gray-800" }, toDisplayString(version.version), 1),
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(version.release_date), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_components/VersionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
