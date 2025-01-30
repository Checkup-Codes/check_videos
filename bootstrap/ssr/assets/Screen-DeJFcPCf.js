import { ref, onMounted, withCtx, unref, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import { _ as _sfc_main$3 } from "./ExcalidrawComponent-DAVtiL__.js";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$4 } from "./TextScreen-CLLX-F4x.js";
import "./Button-CWlX4hVa.js";
import "@inertiajs/inertia";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const auth = props.auth;
    const showDraw = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showDraw.value = true;
      } else {
        showDraw.value = props.showDraw || false;
      }
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
    });
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
      const url = new URL(window.location.href);
      if (showDraw.value) {
        url.searchParams.set("draw", "1");
      } else {
        url.searchParams.delete("draw");
      }
      window.history.pushState({}, "", url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: write.value.title,
              onClick: toggleContent
            }, null, _parent2, _scopeId));
            if (showDraw.value) {
              _push2(ssrRenderComponent(_sfc_main$3, { write: write.value }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$4, {
                content: write.value.content,
                summary: write.value.summary,
                id: write.value.id,
                user: unref(auth).user
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: write.value.title,
                onClick: toggleContent
              }, null, 8, ["title"]),
              showDraw.value ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                write: write.value
              }, null, 8, ["write"])) : (openBlock(), createBlock(_sfc_main$4, {
                key: 1,
                content: write.value.content,
                summary: write.value.summary,
                id: write.value.id,
                user: unref(auth).user
              }, null, 8, ["content", "summary", "id", "user"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
