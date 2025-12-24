import { computed, ref, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./FlashMessage-D-FCyLof.js";
import SidebarRendition from "./SidebarRendition-DdfzZZvV.js";
import { usePage, Head } from "@inertiajs/vue3";
import { useStore } from "vuex";
import "./SubSidebarScreen-DNe7gM-E.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "LayoutRendition",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const page = usePage();
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const isMobile = computed(() => windowWidth.value < 1024);
    const updateWindowWidth = () => {
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
      }
    };
    const screenName = computed(() => {
      var _a2;
      return ((_a2 = page.props.screen) == null ? void 0 : _a2.name) || "";
    });
    const titleName = computed(() => {
      return (screenName.value ? screenName.value.charAt(0).toUpperCase() + screenName.value.slice(1) + " - " : "") + "Rendition";
    });
    const flashSuccess = ref((_a = page.props.flash) == null ? void 0 : _a.success);
    const isSidebarCollapsed = ref(true);
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
    const shouldShowSidebarOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return !isNonIndexPage.value;
    });
    const shouldShowMainContentOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return isNonIndexPage.value;
    });
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
    const languagePacks = computed(() => page.props.languagePacks || []);
    provide("languagePacks", languagePacks);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: isSidebarCollapsed.value,
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value,
        class: currentTheme.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && isMounted.value && shouldShowSidebarOnMobile.value && (screenName.value === "words" || screenName.value === "packs")) {
              _push2(ssrRenderComponent(SidebarRendition, {
                key: screenName.value,
                "onUpdate:isCollapsed": handleSidebarCollapse
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              isSidebarCollapsed.value && isMounted.value && shouldShowSidebarOnMobile.value && (screenName.value === "words" || screenName.value === "packs") ? (openBlock(), createBlock(KeepAlive, {
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
            _push2(`<div class="${ssrRenderClass([shouldShowMainContentOnMobile.value ? "block" : "hidden lg:block"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: [shouldShowMainContentOnMobile.value ? "block" : "hidden lg:block"]
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
