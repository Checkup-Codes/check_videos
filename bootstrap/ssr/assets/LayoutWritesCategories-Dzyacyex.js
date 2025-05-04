import { computed, ref, watch, onMounted, onBeforeUnmount, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, renderSlot, resolveDynamicComponent, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./FlashMessage-CRuOLMV3.js";
import SidebarLayoutWrite from "./SidebarLayoutWrite-B63NofaI.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-C7t0mOQX.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-Cyr5_ivY.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./PerformanceMonitorButton-D4ne0zEy.js";
import "./CheckSubsidebar-BZirZ79m.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./CategoryTree-JL8VdTcJ.js";
const siteName = "Yazı Platformu";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutWritesCategories"
}, {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const { props } = usePage();
    const isMobile = ((_a = props.screen) == null ? void 0 : _a.isMobileSidebar) || false;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = ((_b = props.screen) == null ? void 0 : _b.name) || "";
    const pageTitle = computed(() => {
      if (props.write) {
        return `${props.write.title} - ${siteName}`;
      } else if (props.category) {
        return `${props.category.name} - ${siteName}`;
      } else {
        return `${screenName.charAt(0).toUpperCase() + screenName.slice(1)} - ${siteName}`;
      }
    });
    const pageMeta = computed(() => {
      var _a2;
      const meta = {
        description: "",
        keywords: ""
      };
      if (props.write) {
        meta.description = props.write.meta_description || props.write.summary || truncateText(((_a2 = props.write.content) == null ? void 0 : _a2.replace(/<[^>]*>?/gm, "")) || "", 160);
        meta.keywords = props.write.seo_keywords || "";
      } else if (props.category) {
        meta.description = props.category.description || `${props.category.name} kategorisindeki yazılar`;
      } else {
        if (screenName === "writes") {
          meta.description = "Yazı platformunda paylaşılan tüm içerikler";
        } else if (screenName === "categories") {
          meta.description = "Yazı platformundaki tüm kategoriler";
        }
      }
      return meta;
    });
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const flashSuccess = ref(((_c = props.flash) == null ? void 0 : _c.success) || "");
    const isSidebarCollapsed = ref(true);
    watch(
      () => {
        var _a2;
        return (_a2 = props.flash) == null ? void 0 : _a2.success;
      },
      (newVal) => {
        if (newVal) {
          flashSuccess.value = newVal;
        }
      }
    );
    const sidebarComponents = {
      writes: SidebarLayoutWrite,
      categories: SidebarLayoutCategory
    };
    const sidebarComponent = computed(() => {
      if (isSidebarCollapsed.value && screenName) {
        return sidebarComponents[screenName] || null;
      }
      return null;
    });
    onMounted(() => {
      if (window.Inertia) {
        window.Inertia.visit = Object.assign(window.Inertia.visit || {}, {
          preserveScroll: true,
          preserveState: true
        });
      }
    });
    onBeforeUnmount(() => {
      flashSuccess.value = "";
    });
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    const collapseSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(pageTitle.value)}</title>`);
            if (pageMeta.value.description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", pageMeta.value.description)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (pageMeta.value.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", pageMeta.value.keywords)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(pageTitle.value), 1),
              pageMeta.value.description ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: pageMeta.value.description
              }, null, 8, ["content"])) : createCommentVNode("", true),
              pageMeta.value.keywords ? (openBlock(), createBlock("meta", {
                key: 1,
                name: "keywords",
                content: pageMeta.value.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, { isCollapsed: isSidebarCollapsed.value }, {
        sidebar: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(sidebarComponent.value), {
              key: unref(screenName),
              "onUpdate:isCollapsed": handleSidebarCollapse,
              class: unref(sidebarStyle)
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(KeepAlive, {
                max: 5,
                include: ["SidebarLayoutWrite", "SidebarLayoutCategory"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(sidebarComponent.value), {
                  key: unref(screenName),
                  "onUpdate:isCollapsed": handleSidebarCollapse,
                  class: unref(sidebarStyle)
                }, null, 40, ["class"]))
              ], 1024))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(isMobile) ? "hidden lg:block" : "block")}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: unref(isMobile) ? "hidden lg:block" : "block"
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
