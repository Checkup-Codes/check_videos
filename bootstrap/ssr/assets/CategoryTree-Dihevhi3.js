import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CategoryTree",
  __ssrInlineRender: true,
  props: {
    parentCategories: {
      type: Array,
      required: true
    },
    getLinkClasses: {
      type: Function,
      required: true
    },
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:expandAll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { url } = usePage();
    const scrollContainer = ref(null);
    const collapsedCategories = ref(/* @__PURE__ */ new Set());
    const getTotalWriteCount = (category) => {
      let total = category.writes_count || 0;
      if (category.children && category.children.length) {
        category.children.forEach((child) => {
          total += getTotalWriteCount(child);
        });
      }
      return total;
    };
    const expandAllCategories = (expand = true) => {
      collapsedCategories.value.clear();
      if (!expand) {
        props.parentCategories.forEach((category) => {
          collapsedCategories.value.add(category.id);
          if (category.children && category.children.length) {
            category.children.forEach((child) => {
              collapsedCategories.value.add(child.id);
              if (child.children && child.children.length) {
                child.children.forEach((subChild) => {
                  collapsedCategories.value.add(subChild.id);
                });
              }
            });
          }
        });
      }
    };
    const isCollapsed = (categoryId) => {
      return collapsedCategories.value.has(categoryId);
    };
    watch(
      () => props.expandAll,
      (newVal) => {
        expandAllCategories(newVal);
      },
      { immediate: true }
    );
    __expose({
      expandAllCategories
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "w-full overflow-y-auto"
      }, _attrs))} data-v-4b5e3e5e><div class="min-h-full" data-v-4b5e3e5e><ul class="menu bg-base-100 rounded-box w-full" data-v-4b5e3e5e><!--[-->`);
      ssrRenderList(__props.parentCategories, (category) => {
        _push(`<li class="mb-1" data-v-4b5e3e5e><div class="flex w-full items-center" data-v-4b5e3e5e>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: [__props.getLinkClasses(`/categories/${category.slug}`), "flex flex-grow items-center font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-base" data-v-4b5e3e5e${_scopeId}>${ssrInterpolate(category.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-base" }, toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="flex items-center" data-v-4b5e3e5e>`);
        if (category.children.length) {
          _push(`<button class="btn btn-ghost btn-xs mr-1 px-1" data-v-4b5e3e5e><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(category.id) }, "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4b5e3e5e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4b5e3e5e></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="badge badge-sm badge-outline" data-v-4b5e3e5e>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
        if (category.children.length) {
          _push(`<ul class="menu-sm pl-4" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-4b5e3e5e><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<li class="mt-1" data-v-4b5e3e5e><div class="flex w-full items-center" data-v-4b5e3e5e>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: [__props.getLinkClasses(`/categories/${child.slug}`), "flex flex-grow items-center"]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-sm" data-v-4b5e3e5e${_scopeId}>${ssrInterpolate(child.name)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm" }, toDisplayString(child.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="flex items-center" data-v-4b5e3e5e>`);
            if (child.children.length) {
              _push(`<button class="btn btn-ghost btn-xs mr-1 px-1" data-v-4b5e3e5e><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(child.id) }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4b5e3e5e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4b5e3e5e></path></svg></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="badge badge-sm badge-outline" data-v-4b5e3e5e>${ssrInterpolate(getTotalWriteCount(child))}</div></div></div>`);
            if (child.children.length) {
              _push(`<ul class="menu-xs pl-3" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-4b5e3e5e><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<li class="mt-1" data-v-4b5e3e5e><div class="flex w-full items-center" data-v-4b5e3e5e>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: [__props.getLinkClasses(`/categories/${subChild.slug}`), "flex flex-grow items-center"]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<span class="text-xs" data-v-4b5e3e5e${_scopeId}>${ssrInterpolate(subChild.name)}</span>`);
                    } else {
                      return [
                        createVNode("span", { class: "text-xs" }, toDisplayString(subChild.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`<div class="badge badge-sm badge-outline" data-v-4b5e3e5e>${ssrInterpolate(subChild.writes_count || 0)}</div></div></li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b5e3e5e"]]);
export {
  CategoryTree as default
};
