import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SidebarLayoutBookmarks",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const bookmarkCategories = ref(props.bookmarkCategories);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const getLinkClasses = (href) => {
      return url === href ? "block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 bg-gray-900 text-white shadow-lg" : "block cursor-pointer m-2 text-sm rounded px-3 py-1 text-black transition-all transition-colors duration-200 hover:bg-gray-200 hover:shadow-lg hover:px-4";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "shadow-right z-10 h-screen shadow-gray-100" }, _attrs))}><div class="z-10 flex cursor-pointer justify-between bg-sidebar text-sm text-black">`);
      _push(ssrRenderComponent(unref(Link), { href: "/bookmarks" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="m-2 rounded p-1 text-center font-bold text-black underline"${_scopeId}>All Writes</div>`);
          } else {
            return [
              createVNode("div", { class: "m-2 rounded p-1 text-center font-bold text-black underline" }, "All Writes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: "/bookmarks/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="m-2 rounded p-1 text-center font-bold text-black underline"${_scopeId}>Create Write</div>`);
          } else {
            return [
              createVNode("div", { class: "m-2 rounded p-1 text-center font-bold text-black underline" }, "Create Write")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(bookmarkCategories.value, (bookmarkCategory) => {
        _push(`<div class="ml-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/bookmarks/${bookmarkCategory.slug}`,
          class: getLinkClasses(`/bookmarks/${bookmarkCategory.slug}`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-bold"${_scopeId}>${ssrInterpolate(bookmarkCategory.name)}</div><div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(bookmarkCategory.published_at))}</div>`);
            } else {
              return [
                createVNode("div", { class: "font-bold" }, toDisplayString(bookmarkCategory.name), 1),
                createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(formatDate(bookmarkCategory.published_at)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/SidebarLayoutBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
