import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { D as DropdownSvg, C as CloseXSvg } from "./CloseX-DYZEBRsx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const writes = ref(props.writes);
    const categories = ref(props.categories);
    const category = ref(props.category);
    const showCategories = ref(false);
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
        _push(`<div class="fixed right-4 top-4 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Success! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="shadow-subsidebar-shadow fixed z-30 mt-14 w-full shadow-lg lg:mt-0 lg:w-[27%]"><div class="flex cursor-pointer justify-between text-sm text-black"><div><div class="m-2 space-y-4 rounded p-1 font-bold text-black"><div class="flex"><div class="${ssrRenderClass([category.value ? "w-auto" : "w-32", "flex content-center items-center rounded-lg border-2 border-sidebar bg-gray-200 p-1 pl-3 hover:border-black"])}"> Kategori seç `);
      if (category.value) {
        _push(`<span> : <span class="px-1">${ssrInterpolate(category.value.name)}</span><span></span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="pr-1">`);
      _push(ssrRenderComponent(DropdownSvg, null, null, _parent));
      _push(`</span></div>`);
      if (category.value) {
        _push(`<div class="duration-50 mx-3 flex content-center items-center rounded-lg transition-all">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.index"),
          class: "rounded-lg border-2 bg-gray-200 p-0.5 text-center font-bold text-black underline hover:border-black hover:bg-gray-300"
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
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), { href: "/writes/create" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-2 rounded p-1 text-center font-bold text-black underline"${_scopeId}>Yeni Yazı Ekle</div>`);
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
              _push2(`<div class="mx-2 rounded p-1 text-center font-bold text-black underline"${_scopeId}>Kategori Ekle</div>`);
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
      _push(`</div><div class="h-[92vh] overflow-auto"><div class="sticky top-0 z-20 bg-sidebar"><div style="${ssrRenderStyle(showCategories.value ? null : { display: "none" })}" class="grid grid-cols-3 gap-1 px-4 pb-3 text-sm"><!--[-->`);
      ssrRenderList(categories.value, (category2) => {
        _push(`<div class="transition-all duration-100">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category2.slug }),
          class: [getLinkClasses(`/categories/${category2.slug}`), "border-2 hover:border-black hover:bg-sidebar hover:text-black"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="rounded p-1 text-center font-bold"${_scopeId}>${ssrInterpolate(category2.name)}</div>`);
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
        _push(`<div class="px-3 py-1">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.show", { write: write.slug }),
          class: [getLinkClasses(`/writes/${write.slug}`), "px-2 py-1"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="py-1 font-bold"${_scopeId}>${ssrInterpolate(write.title)}</div><div class="flex"${_scopeId}><div class="py-0.5 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(write.published_at))}</div><div class="px-5 py-0.5 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(write.views_count)} Görüntülenme</div></div>`);
            } else {
              return [
                createVNode("div", { class: "py-1 font-bold" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "py-0.5 text-sm text-gray-400" }, toDisplayString(formatDate(write.published_at)), 1),
                  createVNode("div", { class: "px-5 py-0.5 text-sm text-gray-400" }, toDisplayString(write.views_count) + " Görüntülenme", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
