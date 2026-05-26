import { computed, ref, watch, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, openBlock, createBlock, KeepAlive, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./CheckLayout-ULa51pW8.js";
import { _ as _sfc_main$1 } from "./FlashMessage-DLOdJQqX.js";
import SidebarRendition from "./SidebarRendition-BQmWLPNl.js";
import { usePage, Head } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { u as useMobileSubsidebarLayout } from "../ssr.js";
import "./SubSidebarContent-QVixNVtK.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "LayoutRendition",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const page = usePage();
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const screenName = computed(() => {
      var _a2;
      return ((_a2 = page.props.screen) == null ? void 0 : _a2.name) || "";
    });
    const titleName = computed(() => {
      var _a2, _b2, _c, _d, _e, _f;
      return ((_c = (_b2 = (_a2 = page.props) == null ? void 0 : _a2.screen) == null ? void 0 : _b2.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || "Kelimeler";
    });
    const flashSuccess = ref((_a = page.props.flash) == null ? void 0 : _a.success);
    const flashError = ref((_b = page.props.flash) == null ? void 0 : _b.error);
    watch(
      () => {
        var _a2;
        return (_a2 = page.props.flash) == null ? void 0 : _a2.success;
      },
      (value) => {
        flashSuccess.value = value || null;
      }
    );
    watch(
      () => {
        var _a2;
        return (_a2 = page.props.flash) == null ? void 0 : _a2.error;
      },
      (value) => {
        flashError.value = value || null;
      }
    );
    const isSidebarCollapsed = ref(true);
    const isSidebarNarrow = ref(store.getters["Writes/isCollapsed"]);
    watch(
      () => store.getters["Writes/isCollapsed"],
      (val) => {
        isSidebarNarrow.value = val;
      },
      { immediate: true }
    );
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    const isNonIndexPage = computed(() => {
      const currentUrl = page.url || "";
      const isWordShowPage = currentUrl.startsWith("/rendition/words/") && currentUrl !== "/rendition/words" && !currentUrl.includes("/rendition/words/create") && !currentUrl.includes("/rendition/words/edit") && !currentUrl.match(/\/rendition\/words\/\d+$/);
      const isWordCreateEditPage = currentUrl === "/rendition/words/create" || currentUrl.includes("/rendition/words/edit");
      const isPackShowPage = currentUrl.startsWith("/rendition/packs/") && currentUrl !== "/rendition/packs" && !currentUrl.includes("/rendition/packs/create") && !currentUrl.includes("/rendition/packs/edit");
      const isPackCreateEditPage = currentUrl === "/rendition/packs/create" || currentUrl.includes("/rendition/packs/edit");
      return isWordShowPage || isWordCreateEditPage || isPackShowPage || isPackCreateEditPage;
    });
    const {
      shouldShowSidebarOnMobile,
      shouldShowMainContentOnMobile,
      showFullWidthMainOnMobile
    } = useMobileSubsidebarLayout({
      mode: "sidebar-first",
      isNonIndexPage: () => isNonIndexPage.value
    });
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
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
      document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
    });
    const languagePacks = computed(() => page.props.languagePacks || []);
    provide("languagePacks", languagePacks);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        message: flashSuccess.value,
        variant: "success"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        message: flashError.value,
        variant: "error"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: isSidebarCollapsed.value,
        "is-narrow": isSidebarNarrow.value,
        "show-sidebar-on-mobile": unref(shouldShowSidebarOnMobile),
        "show-main-content-on-mobile": unref(shouldShowMainContentOnMobile),
        class: currentTheme.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && isMounted.value && unref(shouldShowSidebarOnMobile) && (screenName.value === "words" || screenName.value === "packs")) {
              _push2(ssrRenderComponent(SidebarRendition, {
                key: screenName.value,
                "onUpdate:isCollapsed": handleSidebarCollapse
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              isSidebarCollapsed.value && isMounted.value && unref(shouldShowSidebarOnMobile) && (screenName.value === "words" || screenName.value === "packs") ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarRendition"]
              }, [
                (openBlock(), createBlock(SidebarRendition, {
                  key: screenName.value,
                  "onUpdate:isCollapsed": handleSidebarCollapse
                }))
              ], 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([unref(shouldShowMainContentOnMobile) ? "block" : "hidden lg:block", "h-full min-h-0 overflow-hidden", mainContentClass.value])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: [unref(shouldShowMainContentOnMobile) ? "block" : "hidden lg:block", "h-full min-h-0 overflow-hidden", mainContentClass.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/LayoutRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
