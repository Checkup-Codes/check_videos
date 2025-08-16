import { ref, watch, computed, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./FlashMessage-CRU0HHDP.js";
import _sfc_main$1 from "./SidebarLayoutWrite-DSm9d_m_.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-Bdz45y_k.js";
import { _ as _sfc_main$3 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-CkQBRk3M.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./CategoryTree-CJ6HP-0T.js";
function useFlashMessage() {
  var _a;
  const { props } = usePage();
  const flashMessage = ref(((_a = props.flash) == null ? void 0 : _a.success) || "");
  watch(
    () => {
      var _a2;
      return (_a2 = props.flash) == null ? void 0 : _a2.success;
    },
    (newVal) => {
      if (newVal) {
        flashMessage.value = newVal;
        setTimeout(() => {
          flashMessage.value = "";
        }, 3e3);
      }
    }
  );
  return {
    flashMessage
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutWritesCategories"
}, {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { isCollapsed, isMobile, toggleSidebar, sidebarStyle } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const store = useStore();
    const { props } = usePage();
    const screenName = ((_a = props.screen) == null ? void 0 : _a.name) || "";
    const sidebarComponents = {
      writes: _sfc_main$1,
      categories: SidebarLayoutCategory
    };
    const sidebarComponent = computed(() => {
      if (isCollapsed.value && screenName) {
        return sidebarComponents[screenName] || null;
      }
      return null;
    });
    const isSidebarNarrow = ref(store.getters["Writes/isCollapsed"]);
    watch(
      () => store.getters["Writes/isCollapsed"],
      (val) => {
        isSidebarNarrow.value = val;
      },
      { immediate: true }
    );
    const mainContentClass = computed(() => ({
      "transition-all duration-300": true,
      "lg:ml-[-200px]": isSidebarNarrow.value,
      "lg:ml-[00px]": !isSidebarNarrow.value
    }));
    const handleSidebarWidthChange = (isNarrow) => {
      isSidebarNarrow.value = isNarrow;
    };
    provide("categories", props.categories || []);
    provide("writes", props.writes || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, { message: unref(flashMessage) }, null, _parent));
      if (!unref(isCollapsed)) {
        _push(ssrRenderComponent(_sfc_main$3, {
          isCollapsed: true,
          toggle: unref(toggleSidebar)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, { isCollapsed: true }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
              key: unref(screenName),
              class: unref(sidebarStyle),
              "onUpdate:isNarrow": handleSidebarWidthChange
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(KeepAlive, {
                max: 5,
                include: ["SidebarLayoutWrite", "SidebarLayoutCategory"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(sidebarComponent.value), {
                  key: unref(screenName),
                  class: unref(sidebarStyle),
                  "onUpdate:isNarrow": handleSidebarWidthChange
                }, null, 40, ["class"]))
              ], 1024))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([unref(isMobile) ? "hidden lg:block" : "block", mainContentClass.value])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: [unref(isMobile) ? "hidden lg:block" : "block", mainContentClass.value]
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
