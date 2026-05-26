import { ref, watch, computed, onMounted, onBeforeUnmount, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, openBlock, createBlock, KeepAlive, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckLayout-ULa51pW8.js";
import { u as useSidebar, S as SidebarLayoutProject } from "./SidebarLayoutProject-BxkGg-K_.js";
import { _ as _sfc_main$1 } from "./FlashMessage-DLOdJQqX.js";
import _sfc_main$3 from "./ProjectsModuleTabs-j3soYPOi.js";
import { u as useMobileSubsidebarLayout } from "../ssr.js";
import "./SubSidebarContent-QVixNVtK.js";
import "vuex";
import "./stripHtml-wl3J5kls.js";
import "./ZoomableImage-iVeXa9el.js";
import "./IconBolt-Dji8lGsB.js";
import "./IconFolder-BkG6LNKa.js";
import "./IconUsers-FdijcrvF.js";
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
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || "Projeler";
    });
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
    const {
      shouldShowSidebarOnMobile,
      shouldShowMainContentOnMobile,
      showFullWidthMainOnMobile
    } = useMobileSubsidebarLayout({
      mode: "main-content-primary",
      isNonIndexPage: () => isNonIndexPage.value
    });
    const isSidebarNarrow = ref(false);
    const mainContentClass = computed(() => {
      const classes = {
        "transition-all duration-300": true,
        "lg:ml-0": true
      };
      if (showFullWidthMainOnMobile.value) {
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
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
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
        "is-narrow": isSidebarNarrow.value,
        "show-sidebar-on-mobile": unref(shouldShowSidebarOnMobile),
        "show-main-content-on-mobile": unref(shouldShowMainContentOnMobile)
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isCollapsed) && isMounted.value && unref(shouldShowSidebarOnMobile)) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(SidebarLayoutProject), {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isCollapsed) && isMounted.value && unref(shouldShowSidebarOnMobile) ? (openBlock(), createBlock(KeepAlive, {
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
            _push2(`<div class="${ssrRenderClass([unref(shouldShowMainContentOnMobile) ? "flex" : "hidden lg:flex", "h-full min-h-0 flex-col overflow-hidden", mainContentClass.value])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "lg:hidden shrink-0" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-0 flex-1 overflow-hidden"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: [unref(shouldShowMainContentOnMobile) ? "flex" : "hidden lg:flex", "h-full min-h-0 flex-col overflow-hidden", mainContentClass.value]
              }, [
                createVNode(_sfc_main$3, { class: "lg:hidden shrink-0" }),
                createVNode("div", { class: "min-h-0 flex-1 overflow-hidden" }, [
                  renderSlot(_ctx.$slots, "screen")
                ])
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
