import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "./CloseX-DYZEBRsx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SidebarLayoutVersion",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const versions = ref(props.versions);
    ref(props.categories);
    ref(props.category);
    ref(false);
    const scrollPosition = ref(0);
    const scrollContainer = ref(null);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const flashSuccess = ref(props.flash.success);
    const auth = props.auth;
    const getLinkClasses = (href) => {
      return url === href ? "block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg" : "block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg";
    };
    const handleScroll = (event) => {
      scrollPosition.value = event.target.scrollTop;
      localStorage.setItem("scrollPosition", scrollPosition.value);
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
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-4 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fixed z-30 mt-14 w-full shadow-lg shadow-subsidebar-shadow lg:mt-0 lg:w-[27%]"><div class="flex cursor-pointer justify-between text-sm text-black lg:grid-cols-2"><div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black"><div class="rounded border-b-4 border-blue-100 p-2">Versiyonlar</div></div>`);
      if (unref(auth).user) {
        _push(`<div class="">`);
        _push(ssrRenderComponent(unref(Link), { href: "/versions/create" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-2 rounded p-3 text-center font-bold text-black underline"${_scopeId}>Yeni Versiyon Ekle</div>`);
            } else {
              return [
                createVNode("div", { class: "mx-2 rounded p-3 text-center font-bold text-black underline" }, "Yeni Versiyon Ekle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-[100vh] overflow-auto"><!--[-->`);
      ssrRenderList(versions.value, (version) => {
        _push(`<div class="px-3 py-1">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/versions/${version.version}`,
          class: [getLinkClasses(`/versions/${version.version}`), "px-2 py-1"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="py-1 font-bold"${_scopeId}>${ssrInterpolate(version.version)}</div><div class="flex"${_scopeId}><div class="py-0.5 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(version.updated_at))}</div><div class="px-5 py-0.5 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(version.views_count)} Görüntülenme</div></div>`);
            } else {
              return [
                createVNode("div", { class: "py-1 font-bold" }, toDisplayString(version.version), 1),
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "py-0.5 text-sm text-gray-400" }, toDisplayString(formatDate(version.updated_at)), 1),
                  createVNode("div", { class: "px-5 py-0.5 text-sm text-gray-400" }, toDisplayString(version.views_count) + " Görüntülenme", 1)
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
