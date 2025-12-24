import { computed, mergeProps, useSSRContext, ref, watch, onMounted, onUnmounted, withCtx, unref, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./CheckScreen-DjaYf9so.js";
import { _ as _export_sfc, b as _sfc_main$4 } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main$2 = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "primary", "secondary", "destructive"].includes(value)
    },
    elevated: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const bgClass = computed(() => {
      switch (props.variant) {
        case "primary":
          return "bg-primary text-primary-foreground border-primary";
        case "secondary":
          return "bg-secondary text-secondary-foreground border-secondary";
        case "destructive":
          return "bg-destructive text-destructive-foreground border-destructive";
        default:
          return "bg-card text-card-foreground border-border";
      }
    });
    const shadowClass = computed(() => {
      return props.elevated ? "shadow-lg" : "shadow-sm";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
          shadowClass.value,
          bgClass.value
        ]
      }, _attrs))}><div class="${ssrRenderClass(["p-6", { "p-4": __props.compact }])}">`);
      if (_ctx.$slots.header || __props.title) {
        _push(`<div class="mb-4 flex items-center justify-between"><div class="flex items-center gap-2">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`<h2 class="text-lg font-semibold text-card-foreground">${ssrInterpolate(__props.title)}</h2></div>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (_ctx.$slots.footer) {
        _push(`<div class="mt-4 flex justify-end">`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "neutral",
      validator: (value) => ["default", "primary", "secondary", "accent", "info", "success", "warning", "error", "ghost", "neutral"].includes(
        value
      )
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg"].includes(value)
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const variantClass = computed(() => {
      if (props.variant === "default") {
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      }
      return `badge-${props.variant}`;
    });
    const sizeClass = computed(() => {
      if (props.size === "md") return "";
      return `badge-${props.size}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["badge", variantClass.value, sizeClass.value, { "badge-outline": __props.outline }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Badge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const perPage = 10;
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const category = ref(props.category || {});
    const writes = ref(props.writes || []);
    const categories = ref(props.categories || []);
    const auth = props.auth;
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const isLoading = ref(true);
    const categoryBreadcrumb = computed(() => {
      if (!category.value || !category.value.id || !categories.value || categories.value.length === 0) {
        return [];
      }
      const findCategory = (id) => {
        return categories.value.find((cat) => cat && cat.id === id);
      };
      const buildBreadcrumb = (categoryId, breadcrumb = []) => {
        const cat = findCategory(categoryId);
        if (!cat) return breadcrumb;
        breadcrumb.unshift(cat);
        if (cat.parent_id) {
          return buildBreadcrumb(cat.parent_id, breadcrumb);
        }
        return breadcrumb;
      };
      return buildBreadcrumb(category.value.id);
    });
    const statusFilter = ref("all");
    const page = ref(1);
    const isLoadingMore = ref(false);
    const hasMore = ref(true);
    const filteredWrites = computed(() => {
      let filtered = writes.value || [];
      if (statusFilter.value !== "all") {
        filtered = filtered.filter((write) => write.status === statusFilter.value);
      }
      return filtered;
    });
    const paginatedWrites = computed(() => {
      const filtered = filteredWrites.value;
      return filtered.slice(0, page.value * perPage);
    });
    const loadMore = async () => {
      if (isLoadingMore.value || !hasMore.value) return;
      isLoadingMore.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      page.value++;
      const totalFiltered = filteredWrites.value.length;
      const currentLoaded = page.value * perPage;
      if (currentLoaded >= totalFiltered) {
        hasMore.value = false;
      }
      isLoadingMore.value = false;
    };
    watch([statusFilter], () => {
      page.value = 1;
      hasMore.value = true;
    });
    const clearFilters = () => {
      statusFilter.value = "all";
      page.value = 1;
      hasMore.value = true;
    };
    const formatNumber = (num) => {
      if (!num) return "0";
      return new Intl.NumberFormat("tr-TR").format(num);
    };
    const formatDateMobile = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusText = (status) => {
      const statusMap = {
        published: "Yayında",
        draft: "Taslak",
        private: "Gizli",
        link_only: "Dış Bağlantı"
      };
      return statusMap[status] || status;
    };
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight - 100) {
          loadMore();
        }
      };
      window.addEventListener("scroll", handleScroll);
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 pt-4 sm:p-4 sm:pt-6 lg:p-6 lg:pt-8" data-v-8d0b3ff1${_scopeId}>`);
            if (!isLoading.value) {
              _push2(`<div class="mb-8 border-b border-border/60 pb-6" data-v-8d0b3ff1${_scopeId}><div class="flex items-start justify-between gap-4" data-v-8d0b3ff1${_scopeId}><div class="min-w-0 flex-1" data-v-8d0b3ff1${_scopeId}>`);
              if (categoryBreadcrumb.value.length > 1) {
                _push2(`<nav class="mb-3 flex items-center gap-1.5 text-xs" data-v-8d0b3ff1${_scopeId}><!--[-->`);
                ssrRenderList(categoryBreadcrumb.value, (breadcrumbItem, index) => {
                  _push2(`<!--[-->`);
                  if (index < categoryBreadcrumb.value.length - 1) {
                    _push2(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("categories.show", { category: breadcrumbItem.slug }),
                      class: "font-medium text-muted-foreground transition-colors hover:text-primary"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(breadcrumbItem.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(breadcrumbItem.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<span class="font-semibold text-foreground" data-v-8d0b3ff1${_scopeId}>${ssrInterpolate(breadcrumbItem.name)}</span>`);
                  }
                  if (index < categoryBreadcrumb.value.length - 1) {
                    _push2(`<span class="text-muted-foreground/50" data-v-8d0b3ff1${_scopeId}>/</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--></nav>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h1 class="mb-3 truncate text-2xl font-bold text-foreground sm:text-3xl" data-v-8d0b3ff1${_scopeId}>${ssrInterpolate(category.value.name)}</h1><div class="flex flex-wrap items-center gap-3 text-sm" data-v-8d0b3ff1${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                variant: "primary",
                size: "sm",
                class: "inline-flex items-center gap-1.5"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b;
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-8d0b3ff1${_scopeId2}></path></svg> ${ssrInterpolate(((_a2 = filteredWrites.value) == null ? void 0 : _a2.length) || 0)} yazı `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3.5 w-3.5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(((_b = filteredWrites.value) == null ? void 0 : _b.length) || 0) + " yazı ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (category.value.description) {
                _push2(`<span class="text-muted-foreground line-clamp-1" data-v-8d0b3ff1${_scopeId}>${ssrInterpolate(category.value.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex shrink-0 flex-wrap items-center gap-1.5" data-v-8d0b3ff1${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: ($event) => statusFilter.value = "all",
                variant: statusFilter.value === "all" ? "default" : "outline",
                size: "sm",
                class: "h-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Tümü `);
                  } else {
                    return [
                      createTextVNode(" Tümü ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: ($event) => statusFilter.value = "published",
                variant: statusFilter.value === "published" ? "default" : "outline",
                size: "sm",
                class: "h-8"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Yayında `);
                  } else {
                    return [
                      createTextVNode(" Yayında ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(auth).user) {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  onClick: ($event) => statusFilter.value = "private",
                  variant: statusFilter.value === "private" ? "default" : "outline",
                  size: "sm",
                  class: "h-8"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Gizli `);
                    } else {
                      return [
                        createTextVNode(" Gizli ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth).user) {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  onClick: ($event) => statusFilter.value = "link_only",
                  variant: statusFilter.value === "link_only" ? "default" : "outline",
                  size: "sm",
                  class: "h-8"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Link `);
                    } else {
                      return [
                        createTextVNode(" Link ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (statusFilter.value !== "all") {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  onClick: clearFilters,
                  variant: "ghost",
                  size: "sm",
                  class: "h-8 w-8 p-0",
                  title: "Filtreyi temizle"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-8d0b3ff1${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2",
                          stroke: "currentColor",
                          class: "h-3.5 w-3.5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoading.value) {
              _push2(`<div class="space-y-2" data-v-8d0b3ff1${_scopeId}><!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<div class="rounded border border-border bg-card p-4" data-v-8d0b3ff1${_scopeId}><div class="mb-2 h-5 w-3/4 rounded bg-muted" data-v-8d0b3ff1${_scopeId}></div><div class="h-3 w-1/2 rounded bg-muted" data-v-8d0b3ff1${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-8d0b3ff1${_scopeId}><div class="space-y-3" data-v-8d0b3ff1${_scopeId}><!--[-->`);
              ssrRenderList(paginatedWrites.value, (write) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: write.id,
                  class: "group cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-md",
                  compact: "",
                  onClick: ($event) => unref(router).visit(_ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }))
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start justify-between gap-4" data-v-8d0b3ff1${_scopeId2}><div class="min-w-0 flex-1" data-v-8d0b3ff1${_scopeId2}><div class="mb-2 flex items-center gap-2.5" data-v-8d0b3ff1${_scopeId2}><span class="inline-flex shrink-0 items-center"${ssrRenderAttr("title", getStatusText(write.status))} data-v-8d0b3ff1${_scopeId2}>`);
                      if (write.status === "private") {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-8d0b3ff1${_scopeId2}></path></svg>`);
                      } else if (write.status === "link_only") {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-8d0b3ff1${_scopeId2}></path></svg>`);
                      } else {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-8d0b3ff1${_scopeId2}></path></svg>`);
                      }
                      _push3(`</span><h3 class="line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary" data-v-8d0b3ff1${_scopeId2}>${ssrInterpolate(write.title)}</h3></div>`);
                      if (write.summary) {
                        _push3(`<p class="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground" data-v-8d0b3ff1${_scopeId2}>${ssrInterpolate(write.summary)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex flex-wrap items-center gap-4 text-xs" data-v-8d0b3ff1${_scopeId2}><span class="inline-flex items-center gap-1.5 text-muted-foreground" data-v-8d0b3ff1${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-8d0b3ff1${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-8d0b3ff1${_scopeId2}></path></svg><span class="font-medium" data-v-8d0b3ff1${_scopeId2}>${ssrInterpolate(formatNumber(write.views_count))}</span></span><span class="inline-flex items-center gap-1.5 text-muted-foreground" data-v-8d0b3ff1${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" stroke-width="2" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-8d0b3ff1${_scopeId2}></path></svg><span class="font-medium" data-v-8d0b3ff1${_scopeId2}>${ssrInterpolate(formatDateMobile(write.created_at))}</span></span></div></div><div class="shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" data-v-8d0b3ff1${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-5 w-5" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-8d0b3ff1${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("div", { class: "mb-2 flex items-center gap-2.5" }, [
                              createVNode("span", {
                                class: "inline-flex shrink-0 items-center",
                                title: getStatusText(write.status)
                              }, [
                                write.status === "private" ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 text-muted-foreground",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                  })
                                ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                                  key: 1,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 text-muted-foreground",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 2,
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4 text-muted-foreground",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ]))
                              ], 8, ["title"]),
                              createVNode("h3", { class: "line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(write.title), 1)
                            ]),
                            write.summary ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                            }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "flex flex-wrap items-center gap-4 text-xs" }, [
                              createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3.5 w-3.5",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ])),
                                createVNode("span", { class: "font-medium" }, toDisplayString(formatNumber(write.views_count)), 1)
                              ]),
                              createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  class: "h-3.5 w-3.5",
                                  "stroke-width": "2"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  })
                                ])),
                                createVNode("span", { class: "font-medium" }, toDisplayString(formatDateMobile(write.created_at)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5",
                              stroke: "currentColor",
                              class: "h-5 w-5"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                              })
                            ]))
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if ((hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage) {
                _push2(`<div class="flex justify-center py-6" data-v-8d0b3ff1${_scopeId}>`);
                if (isLoadingMore.value) {
                  _push2(`<div class="flex items-center gap-2 text-sm text-muted-foreground" data-v-8d0b3ff1${_scopeId}><div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" data-v-8d0b3ff1${_scopeId}></div> Yükleniyor... </div>`);
                } else {
                  _push2(ssrRenderComponent(_sfc_main$4, {
                    onClick: loadMore,
                    variant: "outline",
                    size: "sm",
                    class: "h-9"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-8d0b3ff1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" data-v-8d0b3ff1${_scopeId2}></path></svg> Daha Fazla `);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                            })
                          ])),
                          createTextVNode(" Daha Fazla ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (filteredWrites.value.length === 0) {
                _push2(`<div class="py-16 text-center" data-v-8d0b3ff1${_scopeId}><div class="mb-3 text-muted-foreground/50" data-v-8d0b3ff1${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12" data-v-8d0b3ff1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-8d0b3ff1${_scopeId}></path></svg></div><p class="text-sm text-muted-foreground" data-v-8d0b3ff1${_scopeId}>`);
                if (statusFilter.value !== "all") {
                  _push2(`<span data-v-8d0b3ff1${_scopeId}>Seçilen filtreye uygun yazı bulunamadı.</span>`);
                } else {
                  _push2(`<span data-v-8d0b3ff1${_scopeId}>Bu kategoride henüz yazı bulunmuyor.</span>`);
                }
                _push2(`</p></div>`);
              } else if (!hasMore.value && paginatedWrites.value.length > 0) {
                _push2(`<div class="py-8 text-center" data-v-8d0b3ff1${_scopeId}><p class="text-xs text-muted-foreground/60" data-v-8d0b3ff1${_scopeId}>Tüm yazılar gösteriliyor</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 pt-4 sm:p-4 sm:pt-6 lg:p-6 lg:pt-8" }, [
                !isLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8 border-b border-border/60 pb-6"
                }, [
                  createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      categoryBreadcrumb.value.length > 1 ? (openBlock(), createBlock("nav", {
                        key: 0,
                        class: "mb-3 flex items-center gap-1.5 text-xs"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(categoryBreadcrumb.value, (breadcrumbItem, index) => {
                          return openBlock(), createBlock(Fragment, {
                            key: breadcrumbItem.id
                          }, [
                            index < categoryBreadcrumb.value.length - 1 ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: _ctx.route("categories.show", { category: breadcrumbItem.slug }),
                              class: "font-medium text-muted-foreground transition-colors hover:text-primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(breadcrumbItem.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "font-semibold text-foreground"
                            }, toDisplayString(breadcrumbItem.name), 1)),
                            index < categoryBreadcrumb.value.length - 1 ? (openBlock(), createBlock("span", {
                              key: 2,
                              class: "text-muted-foreground/50"
                            }, "/")) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode("h1", { class: "mb-3 truncate text-2xl font-bold text-foreground sm:text-3xl" }, toDisplayString(category.value.name), 1),
                      createVNode("div", { class: "flex flex-wrap items-center gap-3 text-sm" }, [
                        createVNode(_sfc_main$1, {
                          variant: "primary",
                          size: "sm",
                          class: "inline-flex items-center gap-1.5"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3.5 w-3.5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                })
                              ])),
                              createTextVNode(" " + toDisplayString(((_a2 = filteredWrites.value) == null ? void 0 : _a2.length) || 0) + " yazı ", 1)
                            ];
                          }),
                          _: 1
                        }),
                        category.value.description ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-muted-foreground line-clamp-1"
                        }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "flex shrink-0 flex-wrap items-center gap-1.5" }, [
                      createVNode(_sfc_main$4, {
                        onClick: ($event) => statusFilter.value = "all",
                        variant: statusFilter.value === "all" ? "default" : "outline",
                        size: "sm",
                        class: "h-8"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tümü ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "variant"]),
                      createVNode(_sfc_main$4, {
                        onClick: ($event) => statusFilter.value = "published",
                        variant: statusFilter.value === "published" ? "default" : "outline",
                        size: "sm",
                        class: "h-8"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Yayında ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "variant"]),
                      unref(auth).user ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 0,
                        onClick: ($event) => statusFilter.value = "private",
                        variant: statusFilter.value === "private" ? "default" : "outline",
                        size: "sm",
                        class: "h-8"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Gizli ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "variant"])) : createCommentVNode("", true),
                      unref(auth).user ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 1,
                        onClick: ($event) => statusFilter.value = "link_only",
                        variant: statusFilter.value === "link_only" ? "default" : "outline",
                        size: "sm",
                        class: "h-8"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Link ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "variant"])) : createCommentVNode("", true),
                      statusFilter.value !== "all" ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 2,
                        onClick: clearFilters,
                        variant: "ghost",
                        size: "sm",
                        class: "h-8 w-8 p-0",
                        title: "Filtreyi temizle"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2",
                            stroke: "currentColor",
                            class: "h-3.5 w-3.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M6 18L18 6M6 6l12 12"
                            })
                          ]))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                isLoading.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-2"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "rounded border border-border bg-card p-4"
                    }, [
                      createVNode("div", { class: "mb-2 h-5 w-3/4 rounded bg-muted" }),
                      createVNode("div", { class: "h-3 w-1/2 rounded bg-muted" })
                    ]);
                  }), 64))
                ])) : (openBlock(), createBlock("div", { key: 2 }, [
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(paginatedWrites.value, (write) => {
                      return openBlock(), createBlock(_sfc_main$2, {
                        key: write.id,
                        class: "group cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-md",
                        compact: "",
                        onClick: ($event) => unref(router).visit(_ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug }))
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("div", { class: "mb-2 flex items-center gap-2.5" }, [
                                createVNode("span", {
                                  class: "inline-flex shrink-0 items-center",
                                  title: getStatusText(write.status)
                                }, [
                                  write.status === "private" ? (openBlock(), createBlock("svg", {
                                    key: 0,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-4 w-4 text-muted-foreground",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    })
                                  ])) : write.status === "link_only" ? (openBlock(), createBlock("svg", {
                                    key: 1,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-4 w-4 text-muted-foreground",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                                    })
                                  ])) : (openBlock(), createBlock("svg", {
                                    key: 2,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-4 w-4 text-muted-foreground",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ], 8, ["title"]),
                                createVNode("h3", { class: "line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(write.title), 1)
                              ]),
                              write.summary ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                              }, toDisplayString(write.summary), 1)) : createCommentVNode("", true),
                              createVNode("div", { class: "flex flex-wrap items-center gap-4 text-xs" }, [
                                createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    class: "h-3.5 w-3.5",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ])),
                                  createVNode("span", { class: "font-medium" }, toDisplayString(formatNumber(write.views_count)), 1)
                                ]),
                                createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    class: "h-3.5 w-3.5",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    })
                                  ])),
                                  createVNode("span", { class: "font-medium" }, toDisplayString(formatDateMobile(write.created_at)), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                "stroke-width": "2.5",
                                stroke: "currentColor",
                                class: "h-5 w-5"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                                })
                              ]))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128)),
                    (hasMore.value || isLoadingMore.value) && filteredWrites.value.length > perPage ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-6"
                    }, [
                      isLoadingMore.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 text-sm text-muted-foreground"
                      }, [
                        createVNode("div", { class: "h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
                        createTextVNode(" Yükleniyor... ")
                      ])) : (openBlock(), createBlock(_sfc_main$4, {
                        key: 1,
                        onClick: loadMore,
                        variant: "outline",
                        size: "sm",
                        class: "h-9"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                            })
                          ])),
                          createTextVNode(" Daha Fazla ")
                        ]),
                        _: 1
                      }))
                    ])) : createCommentVNode("", true)
                  ]),
                  filteredWrites.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-16 text-center"
                  }, [
                    createVNode("div", { class: "mb-3 text-muted-foreground/50" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mx-auto h-12 w-12"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, [
                      statusFilter.value !== "all" ? (openBlock(), createBlock("span", { key: 0 }, "Seçilen filtreye uygun yazı bulunamadı.")) : (openBlock(), createBlock("span", { key: 1 }, "Bu kategoride henüz yazı bulunmuyor."))
                    ])
                  ])) : !hasMore.value && paginatedWrites.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-8 text-center"
                  }, [
                    createVNode("p", { class: "text-xs text-muted-foreground/60" }, "Tüm yazılar gösteriliyor")
                  ])) : createCommentVNode("", true)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d0b3ff1"]]);
export {
  Screen as default
};
