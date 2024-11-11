import { useSSRContext, mergeProps, ref, onMounted, onUnmounted, withCtx, createTextVNode, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, unref } from "vue";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-81431f5c>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-10 z-50" data-v-81431f5c><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert" data-v-81431f5c><strong class="font-bold" data-v-81431f5c>Başarılı! </strong><span class="block sm:inline" data-v-81431f5c>${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fixed z-30 mt-14 w-full shadow-lg shadow-color-one lg:mt-0 lg:w-[27%]" data-v-81431f5c><div class="flex cursor-pointer justify-between text-sm text-black" data-v-81431f5c><div data-v-81431f5c><div class="m-2 space-y-4 rounded p-2 font-bold text-black" data-v-81431f5c><div class="flex" data-v-81431f5c><div class="flex px-0.5" data-v-81431f5c>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        type: "submit",
        onClick: toggleCategoryMenu,
        size: "small"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kategori : `);
            if (category.value) {
              _push2(`<span data-v-81431f5c${_scopeId}><span class="px-1" data-v-81431f5c${_scopeId}>${ssrInterpolate(category.value.name)}</span></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createTextVNode("Kategori : "),
              category.value ? (openBlock(), createBlock("span", { key: 0 }, [
                createVNode("span", { class: "px-1" }, toDisplayString(category.value.name), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (category.value) {
        _push(`<div class="duration-50 mx-3 flex content-center items-center rounded-lg transition-all" data-v-81431f5c>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.index"),
          class: "rounded-lg border-2 bg-black p-0.5 text-center font-bold text-white underline hover:bg-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(CloseXSvg, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(CloseXSvg)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (unref(auth).user) {
        _push(`<div data-v-81431f5c>`);
        _push(ssrRenderComponent(unref(Link), { href: "/writes/create" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-2 rounded p-1 text-center font-bold text-black underline" data-v-81431f5c${_scopeId}>Yeni Yazı Ekle</div>`);
            } else {
              return [
                createVNode("div", { class: "mx-2 rounded p-1 text-center font-bold text-black underline" }, "Yeni Yazı Ekle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), { href: "/categories/create" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-2 rounded p-1 text-center font-bold text-black underline" data-v-81431f5c${_scopeId}>Kategori Ekle</div>`);
            } else {
              return [
                createVNode("div", { class: "mx-2 rounded p-1 text-center font-bold text-black underline" }, "Kategori Ekle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-[100vh] overflow-auto" data-v-81431f5c><div class="sticky top-0 z-20 bg-sidebar" data-v-81431f5c><div style="${ssrRenderStyle(showCategories.value ? null : { display: "none" })}" class="grid grid-cols-3 gap-1 bg-sidebar px-4 pb-3 text-sm" data-v-81431f5c><!--[-->`);
      ssrRenderList(categories.value, (category2) => {
        _push(`<div class="transition-all duration-100" data-v-81431f5c>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category2.slug }),
          class: [getLinkCategoryClasses(`/categories/${category2.slug}`), "border-2 hover:border-black hover:bg-sidebar hover:text-black"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="rounded p-1 text-center font-bold" data-v-81431f5c${_scopeId}>${ssrInterpolate(category2.name)}</div>`);
            } else {
              return [
                createVNode("div", { class: "rounded p-1 text-center font-bold" }, toDisplayString(category2.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><!--[-->`);
      ssrRenderList(writes.value, (write) => {
        _push(`<div class="px-3 py-1" data-v-81431f5c>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.showByCategory", { category: getCategoryName(write.category_id), slug: write.slug }),
          class: [getLinkClasses(`/categories/${getCategoryName(write.category_id)}/${write.slug}`), "px-3 py-1"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="py-0.5 font-bold" data-v-81431f5c${_scopeId}>${ssrInterpolate(write.title)}</div><div class="py-0.5 text-sm text-gray-400" data-v-81431f5c${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</div>`);
            } else {
              return [
                createVNode("div", { class: "py-0.5 font-bold" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "py-0.5 text-sm text-gray-400" }, toDisplayString(formatDate(write.created_at)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81431f5c"]]);
export {
  SidebarLayoutCategory as default
};
