import { withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = props.category || {};
    const tests = props.tests || [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl space-y-6 p-6"${_scopeId}><div class="space-y-4"${_scopeId}><h1 class="text-3xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(category).name)}</h1>`);
            if (unref(category).description) {
              _push2(`<p class="text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(category).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(tests) && unref(tests).length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><h2 class="text-xl font-semibold text-foreground"${_scopeId}>Testler (${ssrInterpolate(unref(tests).length)})</h2><div class="grid gap-4 md:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(tests), (test) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: test.id,
                  href: `/tests/${test.slug}`,
                  class: "rounded-lg border border-border bg-card p-4 hover:bg-accent"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h3 class="font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(test.title)}</h3>`);
                      if (test.description) {
                        _push3(`<p class="mt-2 text-sm text-muted-foreground line-clamp-2"${_scopeId2}>${ssrInterpolate(test.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="mt-4 flex items-center gap-4 text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(test.total_questions)} soru</span>`);
                      if (test.total_points) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate(test.total_points)} puan</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("h3", { class: "font-semibold text-foreground" }, toDisplayString(test.title), 1),
                        test.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-muted-foreground line-clamp-2"
                        }, toDisplayString(test.description), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-4 flex items-center gap-4 text-xs text-muted-foreground" }, [
                          createVNode("span", null, toDisplayString(test.total_questions) + " soru", 1),
                          test.total_points ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(test.total_points) + " puan", 1)) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<div class="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground"${_scopeId}> Bu kategoride henüz test bulunmuyor. </div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl space-y-6 p-6" }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-foreground" }, toDisplayString(unref(category).name), 1),
                  unref(category).description ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-muted-foreground"
                  }, toDisplayString(unref(category).description), 1)) : createCommentVNode("", true)
                ]),
                unref(tests) && unref(tests).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  createVNode("h2", { class: "text-xl font-semibold text-foreground" }, "Testler (" + toDisplayString(unref(tests).length) + ")", 1),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(tests), (test) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: test.id,
                        href: `/tests/${test.slug}`,
                        class: "rounded-lg border border-border bg-card p-4 hover:bg-accent"
                      }, {
                        default: withCtx(() => [
                          createVNode("h3", { class: "font-semibold text-foreground" }, toDisplayString(test.title), 1),
                          test.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-muted-foreground line-clamp-2"
                          }, toDisplayString(test.description), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "mt-4 flex items-center gap-4 text-xs text-muted-foreground" }, [
                            createVNode("span", null, toDisplayString(test.total_questions) + " soru", 1),
                            test.total_points ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(test.total_points) + " puan", 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-lg border border-border bg-card p-8 text-center text-muted-foreground"
                }, " Bu kategoride henüz test bulunmuyor. "))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
