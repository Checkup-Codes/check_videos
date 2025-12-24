import { computed, ref, provide, watch, onMounted, onBeforeUnmount, unref, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./FlashMessage-D-FCyLof.js";
import SidebarLayoutJourney from "./SidebarLayoutJourney-C_y6Q3RS.js";
import { usePage, Head } from "@inertiajs/vue3";
import { useStore } from "vuex";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./JourneyTimeline-Da0328av.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutJourney"
}, {
  __name: "LayoutJourney",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const store = useStore();
    const flashSuccess = computed(() => {
      var _a;
      return (_a = page.props.flash) == null ? void 0 : _a.message;
    });
    const titleName = computed(() => "Yolculuk");
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const isMobile = computed(() => windowWidth.value < 1024);
    const updateWindowWidth = () => {
      if (typeof window !== "undefined") {
        windowWidth.value = window.innerWidth;
      }
    };
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "journey";
    });
    const entries = computed(() => page.props.entries || []);
    const entriesByYear = computed(() => page.props.entriesByYear || {});
    provide("entries", entries);
    provide("entriesByYear", entriesByYear);
    const hasEntries = computed(() => {
      return entries.value.length > 0;
    });
    const shouldShowSidebar = computed(() => {
      return isLoggedIn.value || hasEntries.value;
    });
    const isNonIndexPage = computed(() => {
      const currentUrl = page.url || "";
      const isJourneyShowPage = currentUrl.startsWith("/journey/") && currentUrl !== "/journey" && !currentUrl.includes("/journey/create") && !currentUrl.includes("/journey/edit") && !currentUrl.match(/\/journey\/\d+\/edit$/);
      const isJourneyCreateEditPage = currentUrl === "/journey/create" || currentUrl.includes("/journey/edit");
      return isJourneyShowPage || isJourneyCreateEditPage;
    });
    const shouldShowSidebarOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return !isNonIndexPage.value;
    });
    const shouldShowMainContentOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return isNonIndexPage.value;
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
        "lg:ml-[-200px]": isSidebarNarrow.value && shouldShowSidebar.value,
        "lg:ml-[0px]": !isSidebarNarrow.value || !shouldShowSidebar.value
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
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: shouldShowSidebar.value,
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (shouldShowSidebar.value && isMounted.value && shouldShowSidebarOnMobile.value) {
              _push2(ssrRenderComponent(SidebarLayoutJourney, {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              shouldShowSidebar.value && isMounted.value && shouldShowSidebarOnMobile.value ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutJourney"]
              }, [
                (openBlock(), createBlock(SidebarLayoutJourney, {
                  key: screenName.value,
                  "onUpdate:isNarrow": handleSidebarWidthChange
                }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/_layouts/LayoutJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
