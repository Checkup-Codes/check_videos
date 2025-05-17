import { computed, ref, watch, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CategoryTree"
}, {
  __name: "CategoryTree",
  __ssrInlineRender: true,
  props: {
    parentCategories: {
      type: Array,
      required: true
    },
    getLinkClasses: {
      type: Function,
      required: false,
      default: () => ""
    },
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:expandAll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const page = usePage();
    const url = computed(() => page.url);
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
      expandAllCategories,
      scrollContainer
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "space-y-1 p-3"
      }, _attrs))} data-v-9e30f5a6><ul class="" data-v-9e30f5a6><!--[-->`);
      ssrRenderList(__props.parentCategories, (category) => {
        _push(`<li class="mb-1" data-v-9e30f5a6><div class="flex w-full items-center" data-v-9e30f5a6>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: [
            "block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200",
            url.value === `/categories/${category.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-9e30f5a6${_scopeId}><div class="flex items-center gap-2" data-v-9e30f5a6${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="opacity-70" data-v-9e30f5a6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-9e30f5a6${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-9e30f5a6${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="font-medium" data-v-9e30f5a6${_scopeId}>${ssrInterpolate(category.name)}</span></div><div class="flex items-center gap-2" data-v-9e30f5a6${_scopeId}><div class="badge badge-sm" data-v-9e30f5a6${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "opacity-70"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    createVNode("span", { class: "font-medium" }, toDisplayString(category.name), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "badge badge-sm" }, toDisplayString(getTotalWriteCount(category)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (category.children.length) {
          _push(`<button class="btn btn-ghost btn-sm btn-square ml-1" data-v-9e30f5a6><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(category.id) }, "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9e30f5a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-9e30f5a6></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (category.children.length) {
          _push(`<ul class="mt-1 pl-4" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-9e30f5a6><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<li class="mb-1" data-v-9e30f5a6><div class="flex w-full items-center" data-v-9e30f5a6>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: [
                "block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200",
                url.value === `/categories/${child.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-9e30f5a6${_scopeId}><div class="flex items-center gap-2" data-v-9e30f5a6${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="opacity-70" data-v-9e30f5a6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" data-v-9e30f5a6${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-9e30f5a6${_scopeId}></path></svg></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span data-v-9e30f5a6${_scopeId}>${ssrInterpolate(child.name)}</span></div><div class="badge badge-xs" data-v-9e30f5a6${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "opacity-70"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3.5 w-3.5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        createVNode("span", null, toDisplayString(child.name), 1)
                      ]),
                      createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(child)), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (child.children.length) {
              _push(`<button class="btn btn-ghost btn-xs btn-square ml-1" data-v-9e30f5a6><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(child.id) }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9e30f5a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-9e30f5a6></path></svg></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (child.children.length) {
              _push(`<ul class="mt-1 pl-3" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-9e30f5a6><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<li class="mt-1" data-v-9e30f5a6><div class="flex w-full items-center" data-v-9e30f5a6>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: [
                    "block flex-grow items-center rounded-lg border px-3 py-1.5 text-xs backdrop-blur-md transition-all duration-200",
                    url.value === `/categories/${subChild.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
                  ]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between" data-v-9e30f5a6${_scopeId}><div class="flex items-center gap-2" data-v-9e30f5a6${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="opacity-70" data-v-9e30f5a6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" data-v-9e30f5a6${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-9e30f5a6${_scopeId}></path></svg></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span data-v-9e30f5a6${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="badge badge-xs" data-v-9e30f5a6${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "opacity-70"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3 w-3",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ])) : createCommentVNode("", true),
                            createVNode("span", null, toDisplayString(subChild.name), 1)
                          ]),
                          createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(subChild)), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div></li>`);
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
      _push(`<!--]--></ul>`);
      if (__props.parentCategories.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-9e30f5a6><div data-v-9e30f5a6>Henüz kategori bulunmuyor</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composable/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e30f5a6"]]);
export {
  CategoryTree as default
};
