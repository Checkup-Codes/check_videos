import { ref, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$3 } from "./TextScreen-CLLX-F4x.js";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import "./Button-CWlX4hVa.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const auth = props.auth;
    const navigateToWriteWithDraw = () => {
      const slug = write.value.slug;
      const url = `/writes/${slug}?draw=1`;
      Inertia.visit(url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: write.value.title,
              onClick: navigateToWriteWithDraw
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              content: write.value.content,
              summary: write.value.summary,
              id: write.value.id,
              user: unref(auth).user
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: write.value.title,
                onClick: navigateToWriteWithDraw
              }, null, 8, ["title"]),
              createVNode(_sfc_main$3, {
                content: write.value.content,
                summary: write.value.summary,
                id: write.value.id,
                user: unref(auth).user
              }, null, 8, ["content", "summary", "id", "user"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
