import { ref, watch, computed, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./FlashMessage-BW5JKxN1.js";
import _sfc_main$1 from "./SidebarLayoutWrite-jJPhFWlF.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-CfdTiXOt.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import "./TopSubsidebar-jFf3ITV_.js";
import "./WriteList-cZOZxBc4.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-Dj7LcfAL.js";
import "./SubSidebarScreen-40SPmOW7.js";
import "./CategoryTree-CCIAyO4r.js";
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
    const { isCollapsed, isMobile, sidebarStyle } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const page = usePage();
    const { props } = page;
    const screenName = ((_a = props.screen) == null ? void 0 : _a.name) || "";
    const sidebarComponents = {
      writes: _sfc_main$1,
      categories: SidebarLayoutCategory
    };
    const isLoggedIn = computed(() => {
      return !!(props.auth && props.auth.user);
    });
    const shouldHideSidebarContent = computed(() => {
      var _a2;
      console.log("LayoutWritesCategories Debug:", {
        isLoggedIn: isLoggedIn.value,
        currentUrl: props.url,
        currentWrite: props.write,
        writeStatus: (_a2 = props.write) == null ? void 0 : _a2.status,
        screenName
      });
      if (isLoggedIn.value) {
        console.log("User is logged in, showing sidebar");
        return false;
      }
      const currentUrl = page.url || props.url || "";
      const isWriteShowPage = currentUrl.includes("/writes/") && !currentUrl.includes("/writes/create") && !currentUrl.includes("/writes/edit");
      const isCategoryShowPage = currentUrl.includes("/categories/") && !currentUrl.includes("/categories/create") && !currentUrl.includes("/categories/edit");
      console.log("Page check:", { currentUrl, isWriteShowPage, isCategoryShowPage });
      if (isWriteShowPage || isCategoryShowPage) {
        const currentWrite = props.write;
        console.log("Current write status:", currentWrite == null ? void 0 : currentWrite.status);
        if (currentWrite && currentWrite.status === "link_only") {
          console.log("Hiding sidebar for link-only write");
          return true;
        }
      }
      console.log("Showing sidebar (default)");
      return false;
    });
    watch(
      shouldHideSidebarContent,
      (newValue) => {
        console.log("shouldHideSidebarContent changed:", newValue);
      },
      { immediate: true }
    );
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
      // Full width when sidebar is hidden
    }));
    const handleSidebarWidthChange = (isNarrow) => {
      isSidebarNarrow.value = isNarrow;
    };
    onMounted(() => {
      document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
    });
    provide("categories", props.categories || []);
    provide("writes", props.writes || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, { message: unref(flashMessage) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        isCollapsed: !shouldHideSidebarContent.value,
        class: currentTheme.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!shouldHideSidebarContent.value) {
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
              !shouldHideSidebarContent.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutWrite", "SidebarLayoutCategory"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
