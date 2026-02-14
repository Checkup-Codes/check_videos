import { inject, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "TestList" }, {
  __name: "TestList",
  __ssrInlineRender: true,
  props: {
    tests: { type: Array, default: () => [] },
    isCollapsed: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    usePage();
    const injectedTests = inject("tests", []);
    const filteredTests = computed(() => {
      if (props.tests && props.tests.length > 0) {
        return props.tests;
      }
      const testsValue = (injectedTests == null ? void 0 : injectedTests.value) ?? injectedTests;
      return Array.isArray(testsValue) ? testsValue : [];
    });
    const getTestRoute = (test) => `/tests/${test.slug}`;
    const isActive = (test) => {
      const currentUrl = window.location.pathname;
      return currentUrl.includes(`/tests/${test.slug}`);
    };
    __expose({ filteredTests });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-2" }, _attrs))} data-v-f955dc35><!--[-->`);
      ssrRenderList(filteredTests.value, (test) => {
        _push(ssrRenderComponent(unref(Link), {
          key: test.id,
          href: getTestRoute(test),
          class: [
            "block rounded-lg p-3",
            isActive(test) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4 class="${ssrRenderClass([isActive(test) ? "text-primary-foreground" : "text-foreground", "line-clamp-2 text-[11px] font-medium leading-tight"])}" data-v-f955dc35${_scopeId}>${ssrInterpolate(test.title)}</h4><div class="${ssrRenderClass([isActive(test) ? "text-primary-foreground/70" : "text-muted-foreground", "flex flex-col gap-1 text-[10px] sm:flex-row sm:items-center sm:justify-between"])}" data-v-f955dc35${_scopeId}><div class="flex items-center gap-3" data-v-f955dc35${_scopeId}><span class="flex items-center gap-1" data-v-f955dc35${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f955dc35${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-f955dc35${_scopeId}></path></svg><span data-v-f955dc35${_scopeId}>${ssrInterpolate(test.total_questions)} soru</span></span>`);
              if (test.total_points) {
                _push2(`<span class="flex items-center gap-1" data-v-f955dc35${_scopeId}><span data-v-f955dc35${_scopeId}>${ssrInterpolate(test.total_points)} puan</span></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("h4", {
                  class: ["line-clamp-2 text-[11px] font-medium leading-tight", isActive(test) ? "text-primary-foreground" : "text-foreground"]
                }, toDisplayString(test.title), 3),
                createVNode("div", {
                  class: ["flex flex-col gap-1 text-[10px] sm:flex-row sm:items-center sm:justify-between", isActive(test) ? "text-primary-foreground/70" : "text-muted-foreground"]
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
      _push(`<!--]-->`);
      if (filteredTests.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground" data-v-f955dc35><div data-v-f955dc35>Henüz test bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_composables/TestList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TestList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f955dc35"]]);
export {
  TestList as default
};
