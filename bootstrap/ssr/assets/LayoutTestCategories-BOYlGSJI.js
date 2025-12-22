import { ref, watch, computed, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./FlashMessage-CQHak4HA.js";
import SidebarLayoutTest from "./SidebarLayoutTest-BOaa4SWM.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-C3knlPuT.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import "./TestList-b5Xw0B8n.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DNDkVWuC.js";
import "./SubSidebarScreen-BaVEfKio.js";
import "./CategoryTree-DOrljEAa.js";
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
      } else {
        flashMessage.value = "";
      }
    }
  );
  return {
    flashMessage
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutTestCategories"
}, {
  __name: "LayoutTestCategories",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { isCollapsed, isMobile, sidebarStyle } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const store = useStore();
    const handleFlashClose = () => {
      flashMessage.value = "";
    };
    const page = usePage();
    const { props } = page;
    const screenName = ((_a = props.screen) == null ? void 0 : _a.name) || "";
    const sidebarComponents = {
      tests: SidebarLayoutTest,
      test_categories: SidebarLayoutCategory
    };
    computed(() => {
      return !!(props.auth && props.auth.user);
    });
    const shouldHideSidebarContent = computed(() => {
      const url = page.url;
      return url.includes("/take") || url.includes("/result");
    });
    const sidebarComponent = computed(() => {
      if (isCollapsed.value && screenName && !shouldHideSidebarContent.value) {
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
      "lg:ml-[-200px]": isSidebarNarrow.value && !shouldHideSidebarContent.value,
      "lg:ml-[00px]": !isSidebarNarrow.value && !shouldHideSidebarContent.value,
      "lg:ml-0": shouldHideSidebarContent.value
    }));
    const handleSidebarWidthChange = (isNarrow) => {
      isSidebarNarrow.value = isNarrow;
    };
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
      document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
    });
    provide("categories", props.categories || []);
    provide("tests", props.tests || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(flashMessage),
        onClose: handleFlashClose
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: !shouldHideSidebarContent.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!shouldHideSidebarContent.value && isMounted.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
                key: unref(screenName),
                class: unref(sidebarStyle),
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !shouldHideSidebarContent.value && isMounted.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutTest", "SidebarLayoutCategory"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(sidebarComponent.value), {
                  key: unref(screenName),
                  class: unref(sidebarStyle),
                  "onUpdate:isNarrow": handleSidebarWidthChange
                }, null, 40, ["class"]))
              ], 1024)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_layouts/LayoutTestCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
