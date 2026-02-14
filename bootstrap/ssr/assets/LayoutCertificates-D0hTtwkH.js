import { computed, provide, mergeProps, withCtx, unref, createVNode, renderSlot, createBlock, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckLayout-3_RH6d5N.js";
import SidebarLayoutCertificate from "./SidebarLayoutCertificate-C3idRv1l.js";
import { _ as _sfc_main$2 } from "./FlashMessage-C3JOGPFR.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "LayoutCertificates",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "certificates";
    });
    const pageTitle = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.title) || "Sertifikalar";
    });
    provide("certificates", computed(() => page.props.certificates || []));
    const handleSidebarWidthChange = (isNarrow) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isCollapsed: true }, _attrs), {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            _push2(ssrRenderComponent(SidebarLayoutCertificate, {
              key: screenName.value,
              "onUpdate:isNarrow": handleSidebarWidthChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              (openBlock(), createBlock(KeepAlive, {
                max: 5,
                include: ["SidebarLayoutCertificate"]
              }, [
                (openBlock(), createBlock(SidebarLayoutCertificate, {
                  key: screenName.value,
                  "onUpdate:isNarrow": handleSidebarWidthChange
                }))
              ], 1024))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: pageTitle.value }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode(unref(Head), { title: pageTitle.value }, null, 8, ["title"]),
              createVNode(_sfc_main$2),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Certificates/_layouts/LayoutCertificates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
