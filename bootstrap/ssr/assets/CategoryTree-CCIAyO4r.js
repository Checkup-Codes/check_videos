import { inject, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CategoryTree"
}, {
  __name: "CategoryTree",
  __ssrInlineRender: true,
  props: {
    isCollapsed: { type: Boolean, default: false }
  },
  emits: ["update:expandAll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const categories = inject("categories", []);
    const isAdmin = inject("isAdmin", false);
    const searchQuery = ref("");
    const debouncedSearchQuery = ref("");
    const adminFilter = ref("all");
    const showFilterMenu = ref(false);
    function filterCategories(categories2, search, status) {
      return categories2.map((cat) => {
        const filteredChildren = filterCategories(cat.children || [], search, status);
        const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
        let matchesStatus = true;
        if (isAdmin && status !== "all") {
          if (status === "public") matchesStatus = cat.status !== "hidden" && cat.status !== "link_only";
          else matchesStatus = cat.status === status;
        }
        if (matchesSearch && matchesStatus || filteredChildren.length > 0) {
          return {
            ...cat,
            children: filteredChildren
          };
        }
        return null;
      }).filter(Boolean).sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a));
    }
    const parentCategories = computed(
      () => categories.filter((cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === "null" || cat.parent_id === 0).sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a))
    );
    const filteredParentCategories = computed(
      () => filterCategories(parentCategories.value, debouncedSearchQuery.value, adminFilter.value)
    );
    const page = usePage();
    const url = computed(() => page.url);
    const scrollContainer = ref(null);
    const store = useStore();
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
      store.dispatch("CategorySidebar/expandAllCategories", expand);
    };
    const toggleCollapse = (categoryId) => {
      store.dispatch("CategorySidebar/toggleCollapse", categoryId);
    };
    const isCollapsed = (categoryId) => {
      return store.getters["CategorySidebar/isCollapsed"](categoryId);
    };
    const hasLinkOnlyWrites = (category) => {
      var _a, _b;
      const hasLinkOnly = (_a = category.writes) == null ? void 0 : _a.some((write) => write.status === "link_only");
      if (hasLinkOnly) return true;
      if ((_b = category.children) == null ? void 0 : _b.length) {
        return category.children.some((child) => hasLinkOnlyWrites(child));
      }
      return false;
    };
    __expose({
      expandAllCategories,
      scrollContainer
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "category-tree-container space-y-1 overflow-y-auto p-3"
      }, _attrs))} data-v-0a9e432c><div class="mb-3" data-v-0a9e432c><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full" placeholder="Kategori ara..." data-v-0a9e432c></div>`);
      if (unref(isAdmin)) {
        _push(`<div class="mb-3" data-v-0a9e432c><div class="hidden gap-2 sm:flex" data-v-0a9e432c><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "all" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-0a9e432c>`);
        if (props.isCollapsed) {
          _push(`<span data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-0a9e432c></path></svg></span>`);
        } else {
          _push(`<span data-v-0a9e432c>Tümü</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "public" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-0a9e432c>`);
        if (props.isCollapsed) {
          _push(`<span data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><circle cx="12" cy="12" r="10" stroke-width="2" data-v-0a9e432c></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-0a9e432c></path></svg></span>`);
        } else {
          _push(`<span data-v-0a9e432c>Herkese Açık</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "link_only" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-0a9e432c>`);
        if (props.isCollapsed) {
          _push(`<span data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-0a9e432c></path></svg></span>`);
        } else {
          _push(`<span data-v-0a9e432c>Sadece Link</span>`);
        }
        _push(`</button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "hidden" }, "btn btn-outline btn-xs flex items-center justify-center"])}" data-v-0a9e432c>`);
        if (props.isCollapsed) {
          _push(`<span data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-0a9e432c></path></svg></span>`);
        } else {
          _push(`<span data-v-0a9e432c>Gizli</span>`);
        }
        _push(`</button></div><div class="relative inline-block sm:hidden" data-v-0a9e432c><button class="btn btn-ghost btn-xs" data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" data-v-0a9e432c></path></svg></button>`);
        if (showFilterMenu.value) {
          _push(`<div class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5" data-v-0a9e432c><div class="flex flex-col gap-1 py-1" data-v-0a9e432c><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "all" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-0a9e432c></path></svg></button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "public" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><circle cx="12" cy="12" r="10" stroke-width="2" data-v-0a9e432c></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-0a9e432c></path></svg></button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "link_only" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-0a9e432c></path></svg></button><button class="${ssrRenderClass([{ "btn-neutral": adminFilter.value === "hidden" }, "btn btn-outline btn-xs btn-block flex items-center justify-center"])}" data-v-0a9e432c><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-0a9e432c></path></svg></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2" data-v-0a9e432c><!--[-->`);
      ssrRenderList(filteredParentCategories.value, (category) => {
        _push(`<div data-v-0a9e432c><div class="${ssrRenderClass([
          "rounded-lg bg-base-100 transition-all duration-200",
          url.value === `/categories/${category.slug}` ? "bg-base-content text-base-100" : "hover:bg-base-300"
        ])}" data-v-0a9e432c>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: "block p-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-0a9e432c${_scopeId}><div class="flex items-center gap-2" data-v-0a9e432c${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="text-warning" title="Gizli kategori" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-0a9e432c${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-0a9e432c${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasLinkOnlyWrites(category)) {
                _push2(`<span class="text-info" title="Sadece link yazıları" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-0a9e432c${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-0a9e432c${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h3 class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content", "max-w-[120px] truncate text-sm font-medium leading-tight"])}"${ssrRenderAttr("title", category.name)} data-v-0a9e432c${_scopeId}>${ssrInterpolate(category.name)}</h3></div><div class="flex items-center gap-2" data-v-0a9e432c${_scopeId}>`);
              if (category.children.length) {
                _push2(`<button class="btn btn-ghost btn-xs btn-square" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(category.id) }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0a9e432c${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="badge badge-sm" data-v-0a9e432c${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-warning",
                      title: "Gizli kategori"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    hasLinkOnlyWrites(category) ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-info",
                      title: "Sadece link yazıları"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    createVNode("h3", {
                      class: ["max-w-[120px] truncate text-sm font-medium leading-tight", url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content"],
                      title: category.name
                    }, toDisplayString(category.name), 11, ["title"])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    category.children.length ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => toggleCollapse(category.id), ["prevent", "stop"]),
                      class: "btn btn-ghost btn-xs btn-square"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: ["h-3 w-3 transition-transform", { "rotate-180": !isCollapsed(category.id) }],
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode("div", { class: "badge badge-sm" }, toDisplayString(getTotalWriteCount(category)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (category.children.length) {
          _push(`<div class="relative px-3 pb-3" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-0a9e432c><div class="absolute left-6 top-0 h-full w-px bg-base-300" data-v-0a9e432c></div><div class="space-y-1" data-v-0a9e432c><!--[-->`);
          ssrRenderList(category.children, (child, index) => {
            _push(`<div class="relative" data-v-0a9e432c><div class="absolute left-6 top-3 h-px w-4 bg-base-300" data-v-0a9e432c></div><div class="ml-8" data-v-0a9e432c>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: [
                "block rounded-md p-2 transition-all duration-200",
                url.value === `/categories/${child.slug}` ? "bg-base-content text-base-100" : "hover:bg-base-300"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-0a9e432c${_scopeId}><div class="flex items-center gap-2" data-v-0a9e432c${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="text-warning" title="Gizli kategori" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-0a9e432c${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-0a9e432c${_scopeId}></path></svg></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass([
                    url.value === `/categories/${child.slug}` || url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content",
                    "max-w-[100px] truncate text-sm font-medium"
                  ])}"${ssrRenderAttr("title", child.name)} data-v-0a9e432c${_scopeId}>${ssrInterpolate(child.name)}</span></div><div class="flex items-center gap-2" data-v-0a9e432c${_scopeId}>`);
                  if (child.children.length) {
                    _push2(`<button class="btn btn-ghost btn-xs btn-square" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(child.id) }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0a9e432c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0a9e432c${_scopeId}></path></svg></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="badge badge-xs" data-v-0a9e432c${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-warning",
                          title: "Gizli kategori"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3 w-3",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        createVNode("span", {
                          class: [
                            "max-w-[100px] truncate text-sm font-medium",
                            url.value === `/categories/${child.slug}` || url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content"
                          ],
                          title: child.name
                        }, toDisplayString(child.name), 11, ["title"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        child.children.length ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: withModifiers(($event) => toggleCollapse(child.id), ["prevent", "stop"]),
                          class: "btn btn-ghost btn-xs btn-square"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: ["h-3 w-3 transition-transform", { "rotate-180": !isCollapsed(child.id) }],
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M19 9l-7 7-7-7"
                            })
                          ], 2))
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(child)), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (child.children.length) {
              _push(`<div class="relative mt-1" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-0a9e432c><div class="absolute left-4 top-0 h-full w-px bg-base-300" data-v-0a9e432c></div><!--[-->`);
              ssrRenderList(child.children, (subChild, subIndex) => {
                _push(`<div class="relative" data-v-0a9e432c><div class="absolute left-4 top-3 h-px w-4 bg-base-300" data-v-0a9e432c></div><div class="ml-8" data-v-0a9e432c>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: [
                    "block rounded-md p-2 transition-all duration-200",
                    url.value === `/categories/${subChild.slug}` ? "bg-base-content text-base-100" : "hover:bg-base-300"
                  ]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between" data-v-0a9e432c${_scopeId}><div class="flex items-center gap-2" data-v-0a9e432c${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="text-warning" title="Gizli kategori" data-v-0a9e432c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-0a9e432c${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-0a9e432c${_scopeId}></path></svg></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="${ssrRenderClass([
                        url.value === `/categories/${subChild.slug}` || url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content",
                        "max-w-[80px] truncate text-xs font-medium"
                      ])}"${ssrRenderAttr("title", subChild.name)} data-v-0a9e432c${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="badge badge-xs" data-v-0a9e432c${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-warning",
                              title: "Gizli kategori"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3 w-3",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ])) : createCommentVNode("", true),
                            createVNode("span", {
                              class: [
                                "max-w-[80px] truncate text-xs font-medium",
                                url.value === `/categories/${subChild.slug}` || url.value === `/categories/${category.slug}` ? "text-base-100" : "text-base-content"
                              ],
                              title: subChild.name
                            }, toDisplayString(subChild.name), 11, ["title"])
                          ]),
                          createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(subChild)), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredParentCategories.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-0a9e432c><div data-v-0a9e432c>Henüz kategori bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composables/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a9e432c"]]);
export {
  CategoryTree as default
};
