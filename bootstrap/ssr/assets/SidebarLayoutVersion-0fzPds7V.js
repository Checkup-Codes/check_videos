import { ref, onMounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const versions = ref(props.versions);
    const flashSuccess = ref(props.flash.success);
    props.auth;
    const scrollContainer = ref(null);
    ref(0);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const getLinkClasses = (href) => {
      return url === href ? "block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 bg-primary-200 text-black shadow-inner" : "block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 hover:shadow-inner";
    };
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      const savedScrollPosition = localStorage.getItem("scrollPosition");
      if (savedScrollPosition) {
        scrollContainer.value.scrollTop = savedScrollPosition;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative border-r border-color-one" }, _attrs))}><div class="border-b-2 border-color-one px-3 lg:relative"><div class="flex items-center justify-between"><div class="py-3 text-sm font-semibold"><span class="px-3 py-1">VERSİYONLAR</span></div></div></div>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-4 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-4rem)]"><div class="min-h-full"><!--[-->`);
      ssrRenderList(versions.value, (version) => {
        _push(`<div class="px-3 py-1">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/versions/${version.version}`,
          class: [getLinkClasses(`/versions/${version.version}`), "px-2 py-1"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="py-1 font-bold"${_scopeId}>${ssrInterpolate(version.version)}</div><div class="flex"${_scopeId}><div class="py-0.5 text-sm"${_scopeId}>${ssrInterpolate(formatDate(version.updated_at))}</div></div>`);
            } else {
              return [
                createVNode("div", { class: "py-1 font-bold" }, toDisplayString(version.version), 1),
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "py-0.5 text-sm" }, toDisplayString(formatDate(version.updated_at)), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
