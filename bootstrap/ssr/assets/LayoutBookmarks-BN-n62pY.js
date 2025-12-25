import { computed, provide, ref, watch, onMounted, onBeforeUnmount, unref, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CheckLayout-3_RH6d5N.js";
import SidebarLayoutBookmarks from "./SidebarLayoutBookmarks-BYKTJlEI.js";
import { _ as _sfc_main$1 } from "./FlashMessage-C3JOGPFR.js";
import { useStore } from "vuex";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./CategoryList-DHavE1bp.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutBookmarks"
}, {
  __name: "LayoutBookmarks",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const store = useStore();
    const categories = computed(() => page.props.categories || []);
    provide("categories", categories);
    const screenName = computed(() => {
      var _a;
      return ((_a = page.props.screen) == null ? void 0 : _a.name) || "bookmarks";
    });
    const flashSuccess = computed(() => {
      var _a;
      return (_a = page.props.flash) == null ? void 0 : _a.message;
    });
    const titleName = computed(() => {
      const name = screenName.value;
      return name ? name.charAt(0).toUpperCase() + name.slice(1) + " - Yer İmleri" : "Yer İmleri";
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
      const isBookmarkShowPage = currentUrl.startsWith("/bookmarks/") && currentUrl !== "/bookmarks" && !currentUrl.includes("/bookmarks/create") && !currentUrl.includes("/bookmarks/edit");
      const isBookmarkCreateEditPage = currentUrl === "/bookmarks/create" || currentUrl.includes("/bookmarks/edit");
      return isBookmarkShowPage || isBookmarkCreateEditPage;
    });
    const shouldShowSidebarOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return !isNonIndexPage.value;
    });
    const shouldShowMainContentOnMobile = computed(() => {
      if (!isMobile.value) return true;
      return isNonIndexPage.value;
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
        "lg:ml-[-200px]": isSidebarNarrow.value,
        "lg:ml-[0px]": !isSidebarNarrow.value
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
        isCollapsed: isSidebarCollapsed.value,
        "show-sidebar-on-mobile": shouldShowSidebarOnMobile.value,
        "show-main-content-on-mobile": shouldShowMainContentOnMobile.value
      }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && isMounted.value && shouldShowSidebarOnMobile.value && screenName.value === "bookmarks") {
              _push2(ssrRenderComponent(SidebarLayoutBookmarks, {
                key: screenName.value,
                "onUpdate:isNarrow": handleSidebarWidthChange
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              isSidebarCollapsed.value && isMounted.value && shouldShowSidebarOnMobile.value && screenName.value === "bookmarks" ? (openBlock(), createBlock(KeepAlive, {
                key: 0,
                max: 5,
                include: ["SidebarLayoutBookmarks"]
              }, [
                (openBlock(), createBlock(SidebarLayoutBookmarks, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/_layouts/LayoutBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
