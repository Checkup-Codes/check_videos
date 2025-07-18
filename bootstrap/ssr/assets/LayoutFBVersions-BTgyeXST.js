import { computed, ref, unref, withCtx, createBlock, createCommentVNode, createVNode, openBlock, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./FlashMessage-CRU0HHDP.js";
import _sfc_main$4 from "./SidebarLayoutVersion-CODwvLUq.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CheckSubsidebar-DaB40CC2.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./VersionList-BfMi4ShN.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-BKy3Ou2K.js";
const _sfc_main = {
  __name: "LayoutFBVersions",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const page = usePage();
    const props = computed(() => page.props);
    const flashSuccess = computed(() => {
      var _a2;
      return (_a2 = props.value.flash) == null ? void 0 : _a2.message;
    });
    console.log(props.value);
    const sidebarStyle = computed(() => props.value.screen.isMobileSidebar ? "" : "hidden lg:block");
    const screenName = ((_a = props.value.screen) == null ? void 0 : _a.name) || "";
    const titleName = computed(() => {
      const name = screenName.value;
      return name ? name.charAt(0).toUpperCase() + name.slice(1) + "  " : "";
    });
    const isMobile = computed(() => {
      var _a2;
      return ((_a2 = props.screen) == null ? void 0 : _a2.isMobileSidebar) || false;
    });
    const isSidebarCollapsed = ref(true);
    const collapseSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, { isCollapsed: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && unref(screenName) === "versions") {
              _push2(ssrRenderComponent(_sfc_main$4, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: sidebarStyle.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass(isMobile.value ? "hidden lg:block" : "block")}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              isSidebarCollapsed.value && unref(screenName) === "versions" ? (openBlock(), createBlock(_sfc_main$4, {
                key: 0,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: sidebarStyle.value
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode("div", {
                class: isMobile.value ? "hidden lg:block" : "block"
              }, [
                renderSlot(_ctx.$slots, "screen")
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/LayoutFBVersions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
