import { mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "TestList",
  __ssrInlineRender: true,
  props: {
    tests: {
      type: Array,
      default: () => []
    },
    route: {
      type: Function,
      required: true
    },
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { props: pageProps } = usePage();
    const isActive = (test) => {
      const currentUrl = window.location.pathname;
      return currentUrl.includes(`/tests/${test.slug}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-list-container space-y-1 p-3" }, _attrs))}><div class="space-y-2"><!--[-->`);
      ssrRenderList(__props.tests, (test) => {
        _push(ssrRenderComponent(unref(Link), {
          key: test.id,
          href: __props.route(test),
          class: [
            "block rounded-lg p-3",
            isActive(test) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-1"${_scopeId}><h3 class="${ssrRenderClass([isActive(test) ? "text-primary-foreground" : "text-foreground", "line-clamp-2 text-sm font-medium leading-tight"])}"${_scopeId}>${ssrInterpolate(test.title)}</h3></div><div class="${ssrRenderClass([isActive(test) ? "text-primary-foreground/70" : "text-muted-foreground", "flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(test.total_questions)} soru</span></span>`);
              if (test.total_points) {
                _push2(`<span class="flex items-center gap-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(test.total_points)} puan</span></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "mb-1" }, [
                  createVNode("h3", {
                    class: ["line-clamp-2 text-sm font-medium leading-tight", isActive(test) ? "text-primary-foreground" : "text-foreground"]
                  }, toDisplayString(test.title), 3)
                ]),
                createVNode("div", {
                  class: ["flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between", isActive(test) ? "text-primary-foreground/70" : "text-muted-foreground"]
                }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(test.total_questions) + " soru", 1)
                    ]),
                    test.total_points ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center gap-1"
                    }, [
                      createVNode("span", null, toDisplayString(test.total_points) + " puan", 1)
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (__props.tests.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground"><div>Henüz test bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_composables/TestList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
