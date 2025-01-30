import { ref, onMounted, withCtx, unref, createTextVNode, toDisplayString, createVNode, withDirectives, openBlock, createBlock, Fragment, renderList, createCommentVNode, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-CzPQxoDS.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TopSubsidebar-BzzRvyod.js";
import "./Button-CWlX4hVa.js";
const _sfc_main = {
  __name: "SidebarLayoutCategory",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props, url } = usePage();
    const categories = ref(props.categories || []);
    const writes = ref(props.writes || []);
    const parentCategories = ref([]);
    const showCategories = ref(true);
    const isCollapsed = ref(true);
    const emit = __emit;
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("update:isCollapsed", isCollapsed.value);
    };
    const getLinkClasses = (href) => {
      return url === href ? "px-4 border-l-4 text-theme-text border-primary-500 bg-primary-100 shadow-inner hover:bg-primary-100" : "px-4 bg-theme-background text-theme-text";
    };
    const calculateCategoryCounts = () => {
      const counts = {};
      writes.value.forEach((write) => {
        if (write.category_id) {
          counts[write.category_id] = (counts[write.category_id] || 0) + 1;
        }
      });
      categories.value.forEach((category) => {
        category.writeCount = counts[category.id] || 0;
      });
    };
    const buildCategoryTree = () => {
      const map = {};
      const roots = [];
      categories.value.forEach((category) => {
        map[category.id] = { ...category, children: [] };
      });
      categories.value.forEach((category) => {
        var _a;
        if (category.parent_id) {
          (_a = map[category.parent_id]) == null ? void 0 : _a.children.push(map[category.id]);
        } else {
          roots.push(map[category.id]);
        }
      });
      parentCategories.value = roots;
    };
    onMounted(() => {
      calculateCategoryCounts();
      buildCategoryTree();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              isCollapsed: false,
              toggle: collapseSidebar
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "KATEGORİLER",
              href: "/categories/create"
            }, null, _parent2, _scopeId));
            _push2(`<div class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"${_scopeId}><div class="min-h-full" style="${ssrRenderStyle(showCategories.value ? null : { display: "none" })}"${_scopeId}><ul${_scopeId}><!--[-->`);
            ssrRenderList(parentCategories.value, (category) => {
              _push2(`<li class="mb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.show", { category: category.slug }),
                class: [getLinkClasses(`/categories/${category.slug}`), "block py-2 text-base font-medium text-gray-700"]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(category.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (category.children.length) {
                _push2(`<ul class="pl-4"${_scopeId}><!--[-->`);
                ssrRenderList(category.children, (child) => {
                  _push2(`<li class="mt-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("categories.show", { category: child.slug }),
                    class: [getLinkClasses(`/categories/${child.slug}`), "block py-1 text-sm text-gray-600"]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(child.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(child.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (child.children.length) {
                    _push2(`<ul class="border-gray-300 pl-4"${_scopeId}><!--[-->`);
                    ssrRenderList(child.children, (subChild) => {
                      _push2(`<li class="mt-1"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("categories.show", { category: subChild.slug }),
                        class: [getLinkClasses(`/categories/${subChild.slug}`), "block py-1 text-xs text-gray-500"]
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`${ssrInterpolate(subChild.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(subChild.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                      _push2(`</li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "KATEGORİLER",
                href: "/categories/create"
              }),
              createVNode("div", {
                ref: "scrollContainer",
                class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
              }, [
                withDirectives(createVNode("div", { class: "min-h-full" }, [
                  createVNode("ul", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(parentCategories.value, (category) => {
                      return openBlock(), createBlock("li", {
                        key: category.id,
                        class: "mb-2"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("categories.show", { category: category.slug }),
                          class: [getLinkClasses(`/categories/${category.slug}`), "block py-2 text-base font-medium text-gray-700"]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]),
                        category.children.length ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "pl-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(category.children, (child) => {
                            return openBlock(), createBlock("li", {
                              key: child.id,
                              class: "mt-1"
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("categories.show", { category: child.slug }),
                                class: [getLinkClasses(`/categories/${child.slug}`), "block py-1 text-sm text-gray-600"]
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href", "class"]),
                              child.children.length ? (openBlock(), createBlock("ul", {
                                key: 0,
                                class: "border-gray-300 pl-4"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(child.children, (subChild) => {
                                  return openBlock(), createBlock("li", {
                                    key: subChild.id,
                                    class: "mt-1"
                                  }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("categories.show", { category: subChild.slug }),
                                      class: [getLinkClasses(`/categories/${subChild.slug}`), "block py-1 text-xs text-gray-500"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(subChild.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href", "class"])
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ], 512), [
                  [vShow, showCategories.value]
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
