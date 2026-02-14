import { ref, watch, computed, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckLayout-3_RH6d5N.js";
import SidebarLayoutTest from "./SidebarLayoutTest-BC6c-YPn.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-DuiiNfDc.js";
import { _ as _sfc_main$1 } from "./FlashMessage-C3JOGPFR.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import "./TestList-jiEps3hm.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./IconMenu-BWjMD6eg.js";
import "./IconFolder-Q1UwPFvL.js";
import "./CategoryTree-BQUdblcd.js";
import "./IconChevronDown-phZsUDO_.js";
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
    const { isCollapsed } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const store = useStore();
    const handleFlashClose = () => {
      flashMessage.value = "";
    };
    const page = usePage();
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "tests";
    });
    const browserTitle = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || "Testler";
    });
    const sidebarComponents = {
      tests: SidebarLayoutTest,
      test_categories: SidebarLayoutCategory
    };
    computed(() => {
      return !!(page.props.auth && page.props.auth.user);
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
      const isTestShowPage = currentUrl.startsWith("/tests/") && currentUrl !== "/tests" && !currentUrl.includes("/tests/create") && !currentUrl.includes("/tests/edit") && !currentUrl.includes("/tests/take") && !currentUrl.includes("/tests/result");
      const isTestCreateEditPage = currentUrl === "/tests/create" || currentUrl.includes("/tests/edit");
      const isCategoryShowPage = currentUrl.startsWith("/test-categories/") && currentUrl !== "/test-categories" && !currentUrl.includes("/test-categories/create") && !currentUrl.includes("/test-categories/edit");
      const isCategoryCreateEditPage = currentUrl === "/test-categories/create" || currentUrl.includes("/test-categories/edit");
      return isTestShowPage || isTestCreateEditPage || isCategoryShowPage || isCategoryCreateEditPage;
    });
    const shouldHideSidebarContent = computed(() => {
      const url = page.url;
      return url.includes("/take") || url.includes("/result");
    });
    const shouldShowSidebarOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return !isNonIndexPage.value;
    });
    const shouldShowMainContentOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return isNonIndexPage.value;
    });
    const sidebarComponent = computed(() => {
      if (isCollapsed.value && screenName.value && !shouldHideSidebarContent.value && shouldShowSidebarOnMobile.value) {
        return sidebarComponents[screenName.value] || null;
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
    const mainContentClass = computed(() => {
      const classes = {
        "transition-all duration-300": true,
        "lg:ml-[-200px]": isSidebarNarrow.value && !shouldHideSidebarContent.value,
        "lg:ml-[00px]": !isSidebarNarrow.value && !shouldHideSidebarContent.value,
        "lg:ml-0": shouldHideSidebarContent.value
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
    const categories = computed(() => page.props.categories || []);
    const tests = computed(() => page.props.tests || []);
    provide("categories", categories);
    provide("tests", tests);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: browserTitle.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(flashMessage),
        onClose: handleFlashClose
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: !shouldHideSidebarContent.value,
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!shouldHideSidebarContent.value && isMounted.value && shouldShowSidebarOnMobile.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !shouldHideSidebarContent.value && isMounted.value && shouldShowSidebarOnMobile.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutTest", "SidebarLayoutCategory"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(sidebarComponent.value), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_layouts/LayoutTestCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
