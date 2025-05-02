import { ref, onMounted, onUnmounted, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ItemList",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    routeName: {
      type: String,
      required: true
    },
    routeParam: {
      type: String,
      default: "id"
    },
    emptyMessage: {
      type: String,
      default: "Gösterilecek öğe bulunamadı."
    },
    showBadges: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const scrollContainer = ref(null);
    const handleScroll = (event) => {
      const container = event.target;
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (container.scrollTop < 0) {
        container.scrollTop = 0;
      } else if (container.scrollTop > maxScroll) {
        container.scrollTop = maxScroll;
      }
      localStorage.setItem(`scrollPosition_${props.routeName}`, container.scrollTop);
    };
    onMounted(() => {
      var _a;
      const savedScrollPosition = localStorage.getItem(`scrollPosition_${props.routeName}`);
      if (savedScrollPosition && scrollContainer.value) {
        scrollContainer.value.scrollTop = savedScrollPosition;
      }
      (_a = scrollContainer.value) == null ? void 0 : _a.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      var _a;
      (_a = scrollContainer.value) == null ? void 0 : _a.removeEventListener("scroll", handleScroll);
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("tr-TR", options);
    };
    const generateRoute = (item) => {
      const params = {};
      params[props.routeParam] = item.id || item.slug;
      return route(props.routeName, params);
    };
    const isActive = (item) => {
      const params = {};
      params[props.routeParam] = item.id || item.slug;
      const url = route(props.routeName, params);
      return window.location.pathname === url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_badge = resolveComponent("badge");
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
      }, _attrs))}><div class="min-h-full">`);
      if (__props.items.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-10"><div class="text-center"><span class="loading loading-spinner loading-lg text-primary mb-4"></span><p class="text-base-content/70">${ssrInterpolate(__props.emptyMessage)}</p></div></div>`);
      } else {
        _push(`<div class="menu w-full"><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(ssrRenderComponent(unref(Link), {
            key: item.id,
            href: generateRoute(item),
            class: [
              "hover:bg-base-200 flex flex-col p-4 transition-colors duration-200",
              { "bg-base-200 border-primary border-l-4": isActive(item) }
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="font-medium"${_scopeId}>${ssrInterpolate(item.title || item.name)}</div><div class="text-base-content/70 mt-1 flex items-center justify-between text-xs"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(item.created_at))}</span><div class="flex items-center gap-2"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "meta", { item }, () => {
                  if (item.views_count !== void 0) {
                    _push2(`<span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg> ${ssrInterpolate(item.views_count)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                if (__props.showBadges && item.badge) {
                  _push2(ssrRenderComponent(_component_badge, {
                    variant: item.badgeVariant || "primary",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(item.badge)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.badge), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "font-medium" }, toDisplayString(item.title || item.name), 1),
                  createVNode("div", { class: "text-base-content/70 mt-1 flex items-center justify-between text-xs" }, [
                    createVNode("span", null, toDisplayString(formatDate(item.created_at)), 1),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      renderSlot(_ctx.$slots, "meta", { item }, () => [
                        item.views_count !== void 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center gap-1"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            class: "h-3.5 w-3.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(item.views_count), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      __props.showBadges && item.badge ? (openBlock(), createBlock(_component_badge, {
                        key: 0,
                        variant: item.badgeVariant || "primary",
                        size: "xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.badge), 1)
                        ]),
                        _: 2
                      }, 1032, ["variant"])) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/ItemList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
