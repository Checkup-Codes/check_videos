import { ref, watch, computed, onMounted, onBeforeUnmount, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./FlashMessage-D-FCyLof.js";
import { u as useSidebar, S as SidebarLayoutProject } from "./SidebarLayoutProject-iS8_o4aq.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "vuex";
import "./IconBolt-Dji8lGsB.js";
import "./IconFolder-BkG6LNKa.js";
import "./IconUsers-FdijcrvF.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
  name: "LayoutProjects"
}, {
  __name: "LayoutProjects",
  __ssrInlineRender: true,
  setup(__props) {
    const { isCollapsed } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const handleFlashClose = () => {
      flashMessage.value = "";
    };
    const page = usePage();
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "";
    });
    const titleName = computed(() => {
      return (screenName.value ? screenName.value.charAt(0).toUpperCase() + screenName.value.slice(1) + " - " : "") + "Projeler";
    });
    const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const isMobile = computed(() => windowWidth.value < 1024);
    const updateWindowWidth = () => {
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
      }
    };
    const isNonIndexPage = computed(() => {
      const currentUrl = page.url || "";
      const isServiceShowPage = currentUrl.startsWith("/services/") && currentUrl !== "/services" && !currentUrl.includes("/services/create") && !currentUrl.includes("/services/edit");
      const isServiceCreateEditPage = currentUrl === "/services/create" || currentUrl.includes("/services/edit");
      const isProjectShowPage = currentUrl.startsWith("/projects/") && currentUrl !== "/projects" && !currentUrl.includes("/projects/create") && !currentUrl.includes("/projects/edit");
      const isProjectCreateEditPage = currentUrl === "/projects/create" || currentUrl.includes("/projects/edit");
      const isCustomerShowPage = currentUrl.startsWith("/customers/") && currentUrl !== "/customers" && !currentUrl.includes("/customers/create") && !currentUrl.includes("/customers/edit");
      const isCustomerCreateEditPage = currentUrl === "/customers/create" || currentUrl.includes("/customers/edit");
      return isServiceShowPage || isServiceCreateEditPage || isProjectShowPage || isProjectCreateEditPage || isCustomerShowPage || isCustomerCreateEditPage;
    });
    const shouldShowSidebarOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return !isNonIndexPage.value;
    });
    const shouldShowMainContentOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return isNonIndexPage.value;
    });
    const isSidebarNarrow = ref(false);
    const mainContentClass = computed(() => {
      const classes = {
        "transition-all duration-300": true,
        "lg:ml-[-200px]": isSidebarNarrow.value,
        "lg:ml-[00px]": !isSidebarNarrow.value
      };
      if (isMobile.value && isNonIndexPage.value) {
        classes["w-full"] = true;
      }
      return classes;
    });
    const handleSidebarWidthChange = (isNarrow) => {
      isSidebarNarrow.value = isNarrow;
    };
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
        window.addEventListener("resize", updateWindowWidth);
      }
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateWindowWidth);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(flashMessage),
        onClose: handleFlashClose
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: unref(isCollapsed),
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isCollapsed) && isMounted.value && shouldShowSidebarOnMobile.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(SidebarLayoutProject), {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isCollapsed) && isMounted.value && shouldShowSidebarOnMobile.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutProject"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(SidebarLayoutProject), {
                  key: screenName.value,
                  "onUpdate:isNarrow": handleSidebarWidthChange
                }, null, 32))
              ], 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([shouldShowMainContentOnMobile.value ? "block" : "hidden lg:block", mainContentClass.value])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: [shouldShowMainContentOnMobile.value ? "block" : "hidden lg:block", mainContentClass.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/LayoutProjects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
