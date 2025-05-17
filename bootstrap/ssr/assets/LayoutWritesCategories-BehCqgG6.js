import { ref, watch, computed, onMounted, onBeforeUnmount, withCtx, unref, createVNode, renderSlot, resolveDynamicComponent, createBlock, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./FlashMessage-UOn86LUE.js";
import SidebarLayoutWrite from "./SidebarLayoutWrite-Dxt7CHAj.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-BMi4c-J_.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { usePage } from "@inertiajs/vue3";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-BB7K5bv_.js";
import "./PerformanceMonitorButton-Co6U4sf0.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./SubSidebarScreen-DnJaJXGw.js";
import "./CategoryTree-DZ94wjxJ.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutWritesCategories"
}, {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const { props } = usePage();
    const isMobile = ((_a = props.screen) == null ? void 0 : _a.isMobileSidebar) || false;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = ((_b = props.screen) == null ? void 0 : _b.name) || "";
    const flashSuccess = ref(((_c = props.flash) == null ? void 0 : _c.success) || "");
    const isSidebarCollapsed = ref(true);
    watch(
      () => {
        var _a2;
        return (_a2 = props.flash) == null ? void 0 : _a2.success;
      },
      (newVal) => {
        if (newVal) {
          flashSuccess.value = newVal;
        }
      }
    );
    const sidebarComponents = {
      writes: SidebarLayoutWrite,
      categories: SidebarLayoutCategory
    };
    const sidebarComponent = computed(() => {
      if (isSidebarCollapsed.value && screenName) {
        return sidebarComponents[screenName] || null;
      }
      return null;
    });
    onMounted(() => {
      if (window.Inertia) {
        window.Inertia.visit = Object.assign(window.Inertia.visit || {}, {
          preserveScroll: true,
          preserveState: true
        });
      }
    });
    onBeforeUnmount(() => {
      flashSuccess.value = "";
    });
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    const collapseSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, { isCollapsed: isSidebarCollapsed.value }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
              key: unref(screenName),
              "onUpdate:isCollapsed": handleSidebarCollapse,
              class: unref(sidebarStyle)
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(KeepAlive, {
                max: 5,
                include: ["SidebarLayoutWrite", "SidebarLayoutCategory"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(sidebarComponent.value), {
                  key: unref(screenName),
                  "onUpdate:isCollapsed": handleSidebarCollapse,
                  class: unref(sidebarStyle)
                }, null, 40, ["class"]))
              ], 1024))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(isMobile) ? "hidden lg:block" : "block")}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: unref(isMobile) ? "hidden lg:block" : "block"
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
