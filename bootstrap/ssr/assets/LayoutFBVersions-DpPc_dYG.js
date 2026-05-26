import { computed, ref, watch, onMounted, onBeforeUnmount, provide, unref, withCtx, createVNode, renderSlot, openBlock, createBlock, KeepAlive, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./CheckLayout-ULa51pW8.js";
import SidebarLayoutVersion from "./SidebarLayoutVersion-BwfzjSi5.js";
import { _ as _sfc_main$1 } from "./FlashMessage-DLOdJQqX.js";
import { usePage, Head } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { u as useMobileSubsidebarLayout } from "../ssr.js";
import "./SubSidebarContent-QVixNVtK.js";
import "./VersionList-BsNahqEl.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutFBVersions"
}, {
  __name: "LayoutFBVersions",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const store = useStore();
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "versions";
    });
    const flashSuccess = computed(() => {
      var _a;
      return (_a = page.props.flash) == null ? void 0 : _a.message;
    });
    const titleName = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || "Versiyonlar";
    });
    const isNonIndexPage = computed(() => {
      const currentUrl = page.url || "";
      const isVersionShowPage = currentUrl.startsWith("/versions/") && currentUrl !== "/versions" && !currentUrl.includes("/versions/create") && !currentUrl.includes("/versions/edit") && !currentUrl.match(/\/versions\/\d+$/);
      const isVersionCreateEditPage = currentUrl === "/versions/create" || currentUrl.includes("/versions/edit");
      return isVersionShowPage || isVersionCreateEditPage;
    });
    const {
      shouldShowSidebarOnMobile,
      shouldShowMainContentOnMobile,
      showFullWidthMainOnMobile
    } = useMobileSubsidebarLayout({
      mode: "sidebar-first",
      isNonIndexPage: () => isNonIndexPage.value
    });
    const isSidebarCollapsed = ref(true);
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
    const versions = computed(() => page.props.versions || []);
    provide("versions", versions);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isCollapsed: isSidebarCollapsed.value,
        "is-narrow": isSidebarNarrow.value,
        "show-sidebar-on-mobile": unref(shouldShowSidebarOnMobile),
        "show-main-content-on-mobile": unref(shouldShowMainContentOnMobile)
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && isMounted.value && unref(shouldShowSidebarOnMobile) && screenName.value === "versions") {
              _push2(ssrRenderComponent(SidebarLayoutVersion, {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              isSidebarCollapsed.value && isMounted.value && unref(shouldShowSidebarOnMobile) && screenName.value === "versions" ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutVersion"]
              }, [
                (openBlock(), createBlock(SidebarLayoutVersion, {
                  key: screenName.value,
                  "onUpdate:isNarrow": handleSidebarWidthChange
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/LayoutFBVersions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
