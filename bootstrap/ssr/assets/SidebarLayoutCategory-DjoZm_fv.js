import { useSSRContext, mergeProps, ref, onMounted, onUnmounted, withCtx, createTextVNode, toDisplayString, unref, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$3 } from "./CButton-Bo0n3h7o.js";
const _sfc_main$2 = {};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/Dropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "h-5 w-5 rounded-lg",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/CloseX.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CloseXSvg = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "SidebarLayoutCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const writes = ref(props.writes);
    const categories = ref(props.categories);
    const category = ref(props.category);
    const showCategories = ref(true);
    const scrollPosition = ref(0);
    const scrollContainer = ref(null);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const flashSuccess = ref(props.flash.success);
    const auth = props.auth;
    const getLinkClasses = (href) => {
      return url === href ? "border-b border-color-one px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md bg-color-one" : "border-b border-color-one px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all duration-200";
    };
    const getLinkCategoryClasses = (href) => {
      return url === href ? "block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg" : "block cursor-pointer text-sm rounded-lg text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg";
    };
    const toggleCategoryMenu = () => {
    };
    const handleScroll = () => {
      scrollPosition.value = scrollContainer.value.scrollTop;
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
    const getCategoryName = (categoryId) => {
      const category2 = categories.value.find((cat) => cat.id === categoryId);
      return category2 ? category2.slug : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-screen overflow-hidden" }, _attrs))} data-v-62434fe3>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-10 z-50" data-v-62434fe3><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert" data-v-62434fe3><strong class="font-bold" data-v-62434fe3>Başarılı! </strong><span class="block sm:inline" data-v-62434fe3>${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fixed z-30 h-screen w-full lg:w-[27%]" data-v-62434fe3><div class="bg-white shadow-sm" data-v-62434fe3><div class="flex justify-between p-4" data-v-62434fe3><div class="flex items-center space-x-2" data-v-62434fe3>`);
      _push(ssrRenderComponent(_sfc_main$3, { onClick: toggleCategoryMenu }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kategori: ${ssrInterpolate(category.value ? category.value.name : "Seçiniz")}`);
          } else {
            return [
              createTextVNode(" Kategori: " + toDisplayString(category.value ? category.value.name : "Seçiniz"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (category.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.index"),
          class: "rounded-full p-1 hover:bg-gray-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(CloseXSvg, { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(CloseXSvg, { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(auth).user) {
        _push(`<div class="space-x-2" data-v-62434fe3>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/writes/create",
          class: "text-sm font-medium hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Yeni Yazı`);
            } else {
              return [
                createTextVNode("Yeni Yazı")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/categories/create",
          class: "text-sm font-medium hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Yeni Kategori`);
            } else {
              return [
                createTextVNode("Yeni Kategori")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="h-[calc(100vh-4rem)] overflow-y-auto" data-v-62434fe3><div style="${ssrRenderStyle(showCategories.value ? null : { display: "none" })}" class="bg-white p-4" data-v-62434fe3><div class="grid grid-cols-2 gap-2" data-v-62434fe3><!--[-->`);
      ssrRenderList(categories.value, (category2) => {
        _push(ssrRenderComponent(unref(Link), {
          key: category2.id,
          href: _ctx.route("categories.show", { category: category2.slug }),
          class: [getLinkCategoryClasses(`/categories/${category2.slug}`), "rounded-lg border p-2 text-center"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category2.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category2.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="space-y-1 p-4" data-v-62434fe3><!--[-->`);
      ssrRenderList(writes.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: _ctx.route("categories.showByCategory", {
            category: getCategoryName(write.category_id),
            slug: write.slug
          }),
          class: [getLinkClasses(`/categories/${getCategoryName(write.category_id)}/${write.slug}`), "block rounded-lg p-3 hover:bg-gray-50"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-medium" data-v-62434fe3${_scopeId}>${ssrInterpolate(write.title)}</div><div class="mt-1 text-sm text-gray-500" data-v-62434fe3${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</div>`);
            } else {
              return [
                createVNode("div", { class: "font-medium" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(formatDate(write.created_at)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62434fe3"]]);
export {
  SidebarLayoutCategory as default
};
