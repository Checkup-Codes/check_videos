import { inject, computed, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "CategoryTree" }, {
  __name: "CategoryTree",
  __ssrInlineRender: true,
  props: {
    isCollapsed: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const page = usePage();
    const injectedCategories = inject("categories", []);
    const categories = computed(() => {
      const categoriesValue = (injectedCategories == null ? void 0 : injectedCategories.value) ?? injectedCategories;
      return Array.isArray(categoriesValue) ? categoriesValue : [];
    });
    const filteredCategories = computed(() => {
      return categories.value.filter((cat) => {
        if (page.props.isAdmin) return true;
        return cat.status === "public";
      });
    });
    const isActive = (category) => {
      const currentUrl = window.location.pathname;
      return currentUrl.includes(`/test-categories/${category.slug}`);
    };
    __expose({ filteredCategories });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-2" }, _attrs))} data-v-1ec65ed3><!--[-->`);
      ssrRenderList(filteredCategories.value, (category) => {
        _push(`<div class="space-y-1" data-v-1ec65ed3>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/test-categories/${category.slug}`,
          class: [
            "block rounded-md px-3 py-2 text-sm transition-colors",
            isActive(category) ? "bg-accent font-medium text-accent-foreground" : "text-foreground hover:bg-accent/50"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-1ec65ed3${_scopeId}><span class="truncate" data-v-1ec65ed3${_scopeId}>${ssrInterpolate(category.name)}</span>`);
              if (category.tests_count) {
                _push2(`<span class="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground" data-v-1ec65ed3${_scopeId}>${ssrInterpolate(category.tests_count)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "truncate" }, toDisplayString(category.name), 1),
                  category.tests_count ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground"
                  }, toDisplayString(category.tests_count), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (category.children && category.children.length > 0) {
          _push(`<div class="ml-4 space-y-0.5" data-v-1ec65ed3><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(ssrRenderComponent(unref(Link), {
              key: child.id,
              href: `/test-categories/${child.slug}`,
              class: [
                "block rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive(child) ? "bg-accent font-medium text-accent-foreground" : "text-foreground hover:bg-accent/50"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-1ec65ed3${_scopeId}><span class="truncate" data-v-1ec65ed3${_scopeId}>${ssrInterpolate(child.name)}</span>`);
                  if (child.tests_count) {
                    _push2(`<span class="inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-v-1ec65ed3${_scopeId}>${ssrInterpolate(child.tests_count)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "truncate" }, toDisplayString(child.name), 1),
                      child.tests_count ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                      }, toDisplayString(child.tests_count), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (filteredCategories.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50" data-v-1ec65ed3><div data-v-1ec65ed3>Henüz kategori bulunmuyor</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_composables/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ec65ed3"]]);
export {
  CategoryTree as default
};
