import { mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "CategoryList" }, {
  __name: "CategoryList",
  __ssrInlineRender: true,
  props: {
    categories: { type: Array, required: true },
    currentUrl: { type: String, required: true }
  },
  setup(__props) {
    const isActive = (category) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("category") === category.id;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-2" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(ssrRenderComponent(unref(Link), {
          key: category.id,
          href: `/bookmarks?category=${category.id}`,
          class: [
            "block rounded-lg p-3",
            isActive(category) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`<h4 class="${ssrRenderClass([isActive(category) ? "text-primary-foreground" : "text-foreground", "text-[11px] font-medium leading-tight"])}"${_scopeId}>${ssrInterpolate(category.name)}</h4><div class="${ssrRenderClass([isActive(category) ? "text-primary-foreground/70" : "text-muted-foreground", "flex items-center gap-3 text-[10px]"])}"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"${_scopeId}></path></svg><span class="truncate"${_scopeId}>${ssrInterpolate(((_a = category.bookmarks) == null ? void 0 : _a.length) || 0)} yer imi</span></span></div>`);
            } else {
              return [
                createVNode("h4", {
                  class: ["text-[11px] font-medium leading-tight", isActive(category) ? "text-primary-foreground" : "text-foreground"]
                }, toDisplayString(category.name), 3),
                createVNode("div", {
                  class: ["flex items-center gap-3 text-[10px]", isActive(category) ? "text-primary-foreground/70" : "text-muted-foreground"]
                }, [
                  createVNode("span", { class: "flex items-center gap-1" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-3 w-3 flex-shrink-0",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      })
                    ])),
                    createVNode("span", { class: "truncate" }, toDisplayString(((_b = category.bookmarks) == null ? void 0 : _b.length) || 0) + " yer imi", 1)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.categories && __props.categories.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground"><div>Henüz kategori bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/_components/CategoryList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
