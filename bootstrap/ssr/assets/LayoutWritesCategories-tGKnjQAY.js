import { ref, watch, computed, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckLayout-3_RH6d5N.js";
import SidebarLayoutWrite from "./SidebarLayoutWrite-C9IK3hLC.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-BUaAd-Ls.js";
import { _ as _sfc_main$1 } from "./FlashMessage-C3JOGPFR.js";
import { u as useSidebar } from "./useSidebar-D-dtiIC8.js";
import { useStore } from "vuex";
import "./WriteList-DVFMWbxG.js";
import "./IconCalendar-BeMkwtmn.js";
import "./IconEye-C4IDtysD.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./IconMenu-D3qnKg3d.js";
import "./IconFolder-BMytUC2M.js";
import "./IconX-B1Q85S0Q.js";
import "./IconFilter-Cx1-Qiq_.js";
import "./CategoryTree-B5h1I9f2.js";
import "./IconChevronDown-ClwhHkE5.js";
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
  name: "LayoutWritesCategories"
}, {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    const { isCollapsed } = useSidebar();
    const { flashMessage } = useFlashMessage();
    const store = useStore();
    const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const isMobile = computed(() => windowWidth.value < 1024);
    const updateWindowWidth = () => {
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
      }
    };
    const handleFlashClose = () => {
      flashMessage.value = "";
    };
    const page = usePage();
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "writes";
    });
    const sidebarComponents = {
      writes: SidebarLayoutWrite,
      categories: SidebarLayoutCategory
    };
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isNonIndexPage = computed(() => {
      const currentUrl = page.url || "";
      const isWriteShowPage = currentUrl.startsWith("/writes/") && currentUrl !== "/writes" && !currentUrl.includes("/writes/create") && !currentUrl.includes("/writes/edit");
      const isWriteCreateEditPage = currentUrl === "/writes/create" || currentUrl.includes("/writes/edit");
      const isCategoryShowPage = currentUrl.startsWith("/categories/") && currentUrl !== "/categories" && !currentUrl.includes("/categories/create") && !currentUrl.includes("/categories/edit");
      const isCategoryCreateEditPage = currentUrl === "/categories/create" || currentUrl.includes("/categories/edit");
      return isWriteShowPage || isWriteCreateEditPage || isCategoryShowPage || isCategoryCreateEditPage;
    });
    const shouldHideSidebarContent = computed(() => {
      if (isLoggedIn.value) {
        return false;
      }
      const currentUrl = page.url || "";
      const isWriteShowPageCheck = currentUrl.includes("/writes/") && !currentUrl.includes("/writes/create") && !currentUrl.includes("/writes/edit");
      const isCategoryShowPageCheck = currentUrl.includes("/categories/") && !currentUrl.includes("/categories/create") && !currentUrl.includes("/categories/edit");
      if (isWriteShowPageCheck || isCategoryShowPageCheck) {
        const currentWrite = page.props.write;
        if (currentWrite && currentWrite.status === "link_only") {
          return true;
        }
      }
      return false;
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
    const isMounted = ref(false);
    let removeRouterListener = null;
    onMounted(() => {
      isMounted.value = true;
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
        window.addEventListener("resize", updateWindowWidth);
      }
      removeRouterListener = router.on("success", (event) => {
        var _a, _b;
        const flash = page.props.flash;
        const url = event.detail.page.url || "";
        if ((flash == null ? void 0 : flash.success) && (url.includes("/writes") || url.includes("/categories"))) {
          const isCreatePage = url.includes("/create");
          const isEditPage = url.includes("/edit");
          if (!isCreatePage && !isEditPage) {
            store.dispatch("Writes/invalidateAndReload", {
              currentUserId: ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id) || null
            });
          }
        }
      });
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateWindowWidth);
      }
      if (removeRouterListener) {
        removeRouterListener();
      }
    });
    const categories = computed(() => page.props.categories || []);
    const writes = computed(() => page.props.writes || []);
    const currentUserId = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id) || null;
    });
    const storeWrites = computed(() => store.getters["Writes/writes"]);
    const storeCategories = computed(() => store.getters["Writes/categories"]);
    const sidebarDataLoaded = computed(() => store.getters["Writes/sidebarDataLoaded"]);
    const lastUserId = computed(() => store.getters["Writes/lastUserId"]);
    const combinedCategories = computed(() => {
      if (storeCategories.value && storeCategories.value.length > 0) {
        return storeCategories.value;
      }
      if (categories.value && categories.value.length > 0) {
        return categories.value;
      }
      return [];
    });
    const combinedWrites = computed(() => {
      if (storeWrites.value && storeWrites.value.length > 0) {
        return storeWrites.value;
      }
      if (writes.value && writes.value.length > 0) {
        return writes.value;
      }
      return [];
    });
    provide("categories", combinedCategories);
    provide("writes", combinedWrites);
    const loadSidebarDataOnce = async () => {
      const userId = currentUserId.value;
      const userChanged = userId !== lastUserId.value;
      if (categories.value.length > 0 || writes.value.length > 0) {
        store.dispatch("Writes/setSidebarDataFromProps", {
          writes: writes.value,
          categories: categories.value,
          currentUserId: userId
        });
        return;
      }
      if (!sidebarDataLoaded.value || userChanged) {
        await store.dispatch("Writes/loadSidebarData", { currentUserId: userId });
      }
    };
    watch([isMounted, shouldShowSidebarOnMobile, shouldHideSidebarContent], ([mounted, showSidebar, hideSidebar]) => {
      if (mounted && showSidebar && !hideSidebar) {
        loadSidebarDataOnce();
      }
    }, { immediate: true });
    watch(currentUserId, (newUserId, oldUserId) => {
      if (newUserId !== oldUserId && isMounted.value) {
        store.dispatch("Writes/loadSidebarData", { forceRefresh: true, currentUserId: newUserId });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
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
            if (shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && isMounted.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && isMounted.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutWrite", "SidebarLayoutCategory"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
