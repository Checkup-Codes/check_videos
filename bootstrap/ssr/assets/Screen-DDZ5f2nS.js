import { ref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import _sfc_main$2 from "./TestCreateForm-MxNYKIc4.js";
import _sfc_main$3 from "./BulkImportTab-BmPLsUIW.js";
import "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateTestScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("manual");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 py-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-foreground"${_scopeId}>Yeni Test Oluştur</h1><p class="mt-2 text-sm text-muted-foreground"${_scopeId}>Test bilgilerini ve sorularını ekleyin</p></div><div class="border-b border-border"${_scopeId}><nav class="-mb-px flex space-x-8" aria-label="Tabs"${_scopeId}><button class="${ssrRenderClass([
              activeTab.value === "manual" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
            ])}"${_scopeId}> Manuel Ekleme </button><button class="${ssrRenderClass([
              activeTab.value === "bulk" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
            ])}"${_scopeId}><span class="flex items-center gap-2"${_scopeId}> Toplu Ekleme (JSON) <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"${_scopeId}>Yeni</span></span></button></nav></div><div class="mt-6"${_scopeId}>`);
            if (activeTab.value === "manual") {
              _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            } else if (activeTab.value === "bulk") {
              _push2(ssrRenderComponent(_sfc_main$3, {
                onCancel: ($event) => activeTab.value = "manual"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 py-6" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-foreground" }, "Yeni Test Oluştur"),
                  createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, "Test bilgilerini ve sorularını ekleyin")
                ]),
                createVNode("div", { class: "border-b border-border" }, [
                  createVNode("nav", {
                    class: "-mb-px flex space-x-8",
                    "aria-label": "Tabs"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "manual",
                      class: [
                        activeTab.value === "manual" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                        "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
                      ]
                    }, " Manuel Ekleme ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "bulk",
                      class: [
                        activeTab.value === "bulk" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                        "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
                      ]
                    }, [
                      createVNode("span", { class: "flex items-center gap-2" }, [
                        createTextVNode(" Toplu Ekleme (JSON) "),
                        createVNode("span", { class: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary" }, "Yeni")
                      ])
                    ], 10, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "mt-6" }, [
                  activeTab.value === "manual" ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : activeTab.value === "bulk" ? (openBlock(), createBlock(_sfc_main$3, {
                    key: 1,
                    onCancel: ($event) => activeTab.value = "manual"
                  }, null, 8, ["onCancel"])) : createCommentVNode("", true)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
