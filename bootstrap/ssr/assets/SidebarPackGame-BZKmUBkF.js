import { ref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./SubSidebarScreen-DNe7gM-E.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "SidebarPackGame",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    usePage();
    const scrollContainer = ref(null);
    const games = ref([
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Çeviri", route: "translation" },
      { name: "Eşleştirme", route: "matching" },
      { name: "Hızlı Yanıt", route: "fast-response" },
      { name: "Kelime Tahmini", route: "word-guess" }
    ]);
    const isActiveGame = (gameRoute) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("game") === gameRoute;
    };
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
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-2" data-v-6b91fe2f${_scopeId}><div class="flex items-center justify-between gap-2" data-v-6b91fe2f${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-6b91fe2f${_scopeId}>Oyun Modları</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollContainer",
              ref: scrollContainer,
              class: "sidebar-content-embedded min-h-0 flex-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-1 p-3" data-v-6b91fe2f${_scopeId2}><!--[-->`);
                  ssrRenderList(games.value, (game, index) => {
                    _push3(`<button class="${ssrRenderClass([{ "border-primary bg-primary text-primary-foreground": isActiveGame(game.route) }, "block w-full rounded-lg border border-border bg-card p-3 text-left text-[11px] font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"])}" data-v-6b91fe2f${_scopeId2}>${ssrInterpolate(game.name)}</button>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-1 p-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(games.value, (game, index) => {
                        return openBlock(), createBlock("button", {
                          key: index,
                          onClick: ($event) => updateQuery(game.route),
                          class: ["block w-full rounded-lg border border-border bg-card p-3 text-left text-[11px] font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground", { "border-primary bg-primary text-primary-foreground": isActiveGame(game.route) }]
                        }, toDisplayString(game.name), 11, ["onClick"]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-2" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-muted-foreground" }, "Oyun Modları")
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "scrollContainer",
                ref: scrollContainer,
                class: "sidebar-content-embedded min-h-0 flex-1"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-1 p-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(games.value, (game, index) => {
                      return openBlock(), createBlock("button", {
                        key: index,
                        onClick: ($event) => updateQuery(game.route),
                        class: ["block w-full rounded-lg border border-border bg-card p-3 text-left text-[11px] font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground", { "border-primary bg-primary text-primary-foreground": isActiveGame(game.route) }]
                      }, toDisplayString(game.name), 11, ["onClick"]);
                    }), 128))
                  ])
                ]),
                _: 1
              }, 512)
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
const SidebarPackGame = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6b91fe2f"]]);
export {
  SidebarPackGame as default
};
