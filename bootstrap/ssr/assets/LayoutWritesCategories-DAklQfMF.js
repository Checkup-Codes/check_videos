import { ref, watch, computed, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckLayout-3_RH6d5N.js";
import SidebarLayoutWrite from "./SidebarLayoutWrite-DjVfEKRE.js";
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
    const isIndexPage = computed(() => {
      const currentUrl = page.url || "";
      return currentUrl === "/writes" || currentUrl.startsWith("/writes?") || currentUrl === "/categories" || currentUrl.startsWith("/categories?");
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
      if (isCollapsed.value && screenName.value && !shouldHideSidebarContent.value && shouldShowSidebarOnMobile.value && (isIndexPage.value || isSidebarVisible.value)) {
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
      "lg:ml-[-200px]": isSidebarNarrow.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value),
      "lg:ml-[00px]": !isSidebarNarrow.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value),
      "lg:ml-0": shouldHideSidebarContent.value || !isIndexPage.value && !isSidebarVisible.value
      // Full width when sidebar is hidden or toggled off (except on index pages)
    }));
    const handleSidebarWidthChange = (isNarrow) => {
      isSidebarNarrow.value = isNarrow;
    };
    const isMounted = ref(false);
    const isSidebarVisible = ref(true);
    const showSidebarHint = ref(false);
    const isFirstLoad = ref(true);
    const isExternalReferrer = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return false;
      const referrer = document.referrer;
      const currentHost = window.location.hostname;
      if (!referrer) return true;
      try {
        const referrerUrl = new URL(referrer);
        const referrerHost = referrerUrl.hostname;
        const currentDomain = currentHost.split(".").slice(-2).join(".");
        const referrerDomain = referrerHost.split(".").slice(-2).join(".");
        return currentDomain !== referrerDomain;
      } catch (e) {
        return true;
      }
    };
    const getInitialSidebarState = () => {
      if (typeof window === "undefined") return true;
      if (isIndexPage.value) return true;
      const sessionPreference = sessionStorage.getItem("sidebar_visible");
      if (sessionPreference !== null) {
        return sessionPreference === "true";
      }
      const savedPreference = localStorage.getItem("sidebar_visible");
      if (savedPreference !== null) {
        return savedPreference === "true";
      }
      return !isExternalReferrer();
    };
    const shouldShowHint = () => {
      if (typeof window === "undefined") return false;
      if (isIndexPage.value) return false;
      const hintDismissed = localStorage.getItem("sidebar_hint_dismissed");
      if (hintDismissed === "true") return false;
      const savedPreference = localStorage.getItem("sidebar_visible");
      if (savedPreference !== null) return false;
      return isExternalReferrer();
    };
    const dismissSidebarHint = () => {
      showSidebarHint.value = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar_hint_dismissed", "true");
      }
    };
    const loadSidebarVisibility = () => {
      if (typeof window !== "undefined") {
        isSidebarVisible.value = getInitialSidebarState();
        isFirstLoad.value = false;
        sessionStorage.setItem("sidebar_visible", isSidebarVisible.value.toString());
        if (shouldShowHint() && !isSidebarVisible.value) {
          setTimeout(() => {
            showSidebarHint.value = true;
            setTimeout(() => {
              if (showSidebarHint.value) {
                dismissSidebarHint();
              }
            }, 8e3);
          }, 2e3);
        }
      }
    };
    let removeRouterListener = null;
    onMounted(() => {
      isMounted.value = true;
      document.body.style.overflow = "hidden";
      loadSidebarVisibility();
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
        window.addEventListener("resize", updateWindowWidth);
      }
      if (shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value)) {
        loadSidebarDataOnce();
      }
      removeRouterListener = router.on("navigate", (event) => {
        if (typeof window !== "undefined") {
          const sessionPreference = sessionStorage.getItem("sidebar_visible");
          if (sessionPreference !== null) {
            isSidebarVisible.value = sessionPreference === "true";
          }
        }
      });
      router.on("success", (event) => {
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
    const writes = computed(() => page.props.writes || page.props.allWrites || []);
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
      const storeIsEmpty = (!storeWrites.value || storeWrites.value.length === 0) && (!storeCategories.value || storeCategories.value.length === 0);
      if (!sidebarDataLoaded.value || userChanged || storeIsEmpty) {
        await store.dispatch("Writes/loadSidebarData", {
          currentUserId: userId,
          forceRefresh: storeIsEmpty
          // F5 sonrası force refresh
        });
      }
    };
    watch([isMounted, shouldShowSidebarOnMobile, shouldHideSidebarContent, isSidebarVisible, isIndexPage], async ([mounted, showSidebar, hideSidebar, visible, indexPage]) => {
      if (mounted && showSidebar && !hideSidebar && (indexPage || visible)) {
        await loadSidebarDataOnce();
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
      if (isLoggedIn.value && !shouldHideSidebarContent.value && !isIndexPage.value) {
        _push(`<div class="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">`);
        if (showSidebarHint.value) {
          _push(`<div class="absolute bottom-full right-0 mb-2 w-64 animate-in slide-in-from-bottom-2 rounded-lg border border-primary/20 bg-primary/10 p-3 shadow-lg backdrop-blur-sm"><div class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="flex-1"><p class="text-xs font-medium text-foreground">Daha fazla içerik keşfet!</p><p class="mt-1 text-xs text-muted-foreground">Sidebar&#39;ı açmak için tıklayın</p></div><button class="flex-shrink-0 text-muted-foreground hover:text-foreground"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"${ssrRenderAttr("title", isSidebarVisible.value ? "Sidebar'ı Gizle (Odaklanmış Okuma)" : "Sidebar'ı Göster (Daha Fazla İçerik)")}>`);
        if (isSidebarVisible.value) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value),
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && isMounted.value && (isIndexPage.value || isSidebarVisible.value)) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && isMounted.value && (isIndexPage.value || isSidebarVisible.value) ? (openBlock(), createBlock(KeepAlive, {
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
