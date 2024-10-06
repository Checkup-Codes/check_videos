import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { onMounted, mergeProps, useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "ExcalidrawComponent",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      import("@excalidraw/excalidraw").then(({ Excalidraw }) => {
        import("react").then((React) => {
          import("react-dom").then((ReactDOM) => {
            ReactDOM.render(React.createElement(Excalidraw), document.getElementById("excali"));
          });
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "excalidraw-container" }, _attrs))} data-v-7633edb0><div id="excali" data-v-7633edb0></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ExcalidrawComponent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ExcalidrawComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7633edb0"]]);
const _sfc_main = {
  __name: "Excalidraw",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(ExcalidrawComponent, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Excalidraw.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
