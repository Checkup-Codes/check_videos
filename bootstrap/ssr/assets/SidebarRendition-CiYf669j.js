import { ref, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-CzPQxoDS.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TopSubsidebar-BzzRvyod.js";
import "./Button-CWlX4hVa.js";
const _sfc_main = {
  __name: "SidebarRendition",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props, url } = usePage();
    const languagePacks = props.languagePacks;
    props.auth;
    const isCollapsed = ref(true);
    const emit = __emit;
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("update:isCollapsed", isCollapsed.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              isCollapsed: false,
              toggle: collapseSidebar
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "PAKETLER",
              href: _ctx.route("rendition.language-packs.create")
            }, null, _parent2, _scopeId));
            _push2(`<div class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"${_scopeId}><div class="min-h-full"${_scopeId}><!--[-->`);
            ssrRenderList(unref(languagePacks), (languagePack) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: languagePack.slug,
                href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                class: "block border-b px-4 py-2 transition-all hover:bg-gray-100"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-base font-semibold"${_scopeId2}>${ssrInterpolate(languagePack.name)}</div><div class="mt-1 flex items-center justify-between text-sm text-gray-600"${_scopeId2}><span${_scopeId2}>Words: ${ssrInterpolate(languagePack.word_count)}</span><span class="uppercase tracking-wide text-gray-500"${_scopeId2}>${ssrInterpolate(languagePack.language)}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-base font-semibold" }, toDisplayString(languagePack.name), 1),
                      createVNode("div", { class: "mt-1 flex items-center justify-between text-sm text-gray-600" }, [
                        createVNode("span", null, "Words: " + toDisplayString(languagePack.word_count), 1),
                        createVNode("span", { class: "uppercase tracking-wide text-gray-500" }, toDisplayString(languagePack.language), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "PAKETLER",
                href: _ctx.route("rendition.language-packs.create")
              }, null, 8, ["href"]),
              createVNode("div", {
                ref: "scrollContainer",
                class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
              }, [
                createVNode("div", { class: "min-h-full" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(languagePacks), (languagePack) => {
                    return openBlock(), createBlock(unref(Link), {
                      key: languagePack.slug,
                      href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                      class: "block border-b px-4 py-2 transition-all hover:bg-gray-100"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-base font-semibold" }, toDisplayString(languagePack.name), 1),
                        createVNode("div", { class: "mt-1 flex items-center justify-between text-sm text-gray-600" }, [
                          createVNode("span", null, "Words: " + toDisplayString(languagePack.word_count), 1),
                          createVNode("span", { class: "uppercase tracking-wide text-gray-500" }, toDisplayString(languagePack.language), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/SidebarRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
