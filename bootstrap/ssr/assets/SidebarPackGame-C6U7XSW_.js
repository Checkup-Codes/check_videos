import { ref, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext, createTextVNode, toDisplayString, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckSubsidebar-DfwdLh-u.js";
const _sfc_main$1 = {
  __name: "TopSubsidebar",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    },
    showExpandCollapseButton: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-expand", "toggle-width"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const { props: pageProps } = usePage();
    const userName = (_b = (_a = pageProps.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name;
    const isNarrow = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-base-200/20 bg-base-200/30 relative overflow-hidden border-b backdrop-blur-sm transition-all duration-300" }, _attrs))}><div class="from-base-300/10 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent"></div><div class="text-base-content/60 relative flex h-9 items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider"><span class="hover:text-base-content/90 cursor-pointer transition-colors duration-200"${ssrRenderAttr("title", isNarrow.value ? "Genişlet" : "Daralt")}>${ssrInterpolate(__props.title)}</span><div class="flex items-center gap-1.5">`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
      if (__props.showExpandCollapseButton) {
        _push(`<button class="hover:bg-base-300/60 flex h-6 w-6 items-center justify-center rounded-md px-1 transition-all duration-200"${ssrRenderAttr("title", __props.isExpanded ? "Tümünü Daralt" : "Tümünü Genişlet")}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": __props.isExpanded }, "h-3 w-3 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(userName) && __props.href) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "bg-base-300/50 text-base-content/70 hover:bg-base-300/80 group flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200 hover:text-base-content",
          title: `Yeni ${((_a2 = __props.title) == null ? void 0 : _a2.toLowerCase()) || "öğe"} ekle`,
          onClick: () => {
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-3 w-3 transition-transform duration-200 group-hover:scale-110",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 4v16m8-8H4"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TopSubsidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SidebarPackGame",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    usePage();
    ref(true);
    const games = ref([
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Çeviri", route: "translation" },
      { name: "Eşleştirme", route: "matching" },
      { name: "Hızlı Yanıt", route: "fast-response" },
      { name: "Kelime Tahmini", route: "word-guess" }
    ]);
    const updateQuery = (gameRoute) => {
      const currentQuery = new URLSearchParams(window.location.search);
      currentQuery.set("game", gameRoute);
      router.visit(`${window.location.pathname}?${currentQuery.toString()}`, {
        method: "get",
        preserveState: true,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "PAKETLER",
              href: "versions/create"
            }, null, _parent2, _scopeId));
            _push2(`<div class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"${_scopeId}><div class="min-h-full"${_scopeId}><!--[-->`);
            ssrRenderList(games.value, (game, index) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: index,
                onClick: ($event) => updateQuery(game.route),
                class: "block border-b p-4 transition-all hover:bg-gray-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(game.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(game.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                title: "PAKETLER",
                href: "versions/create"
              }),
              createVNode("div", {
                ref: "scrollContainer",
                class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
              }, [
                createVNode("div", { class: "min-h-full" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(games.value, (game, index) => {
                    return openBlock(), createBlock(unref(Link), {
                      key: index,
                      onClick: ($event) => updateQuery(game.route),
                      class: "block border-b p-4 transition-all hover:bg-gray-100"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(game.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/SidebarPackGame.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
