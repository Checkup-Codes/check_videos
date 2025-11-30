import { withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
import { _ as _sfc_main$2 } from "./IntroScreen-CaL0i34h.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const tests = props.tests || [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Testler" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-6 space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(tests), (test) => {
              _push2(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/tests/${test.slug}`,
                class: "block"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="text-lg font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(test.title)}</h3>`);
                    if (test.description) {
                      _push3(`<p class="mt-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(test.description)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(test.total_questions)} soru</span>`);
                    if (test.total_points) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(test.total_points)} puan</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("h3", { class: "text-lg font-semibold text-foreground" }, toDisplayString(test.title), 1),
                      test.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-2 text-sm text-muted-foreground"
                      }, toDisplayString(test.description), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-4 flex items-center gap-4 text-sm text-muted-foreground" }, [
                        createVNode("span", null, toDisplayString(test.total_questions) + " soru", 1),
                        test.total_points ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(test.total_points) + " puan", 1)) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Testler" }),
              createVNode("div", { class: "mt-6 space-y-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(tests), (test) => {
                  return openBlock(), createBlock("div", {
                    key: test.id,
                    class: "rounded-lg border border-border bg-card p-4"
                  }, [
                    createVNode(unref(Link), {
                      href: `/tests/${test.slug}`,
                      class: "block"
                    }, {
                      default: withCtx(() => [
                        createVNode("h3", { class: "text-lg font-semibold text-foreground" }, toDisplayString(test.title), 1),
                        test.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-muted-foreground"
                        }, toDisplayString(test.description), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-4 flex items-center gap-4 text-sm text-muted-foreground" }, [
                          createVNode("span", null, toDisplayString(test.total_questions) + " soru", 1),
                          test.total_points ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(test.total_points) + " puan", 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ]);
                }), 128))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
