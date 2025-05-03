import { computed, ref, onMounted, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, renderSlot, resolveDynamicComponent, KeepAlive, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$5 } from "./FlashMessage-CRuOLMV3.js";
import _sfc_main$2 from "./SidebarLayoutWrite-Bb3iMkvD.js";
import _sfc_main$1 from "./SidebarLayoutCategory-CA_QOkNE.js";
import { _ as _sfc_main$4 } from "./ToggleSubSidebarButton-C4Kqliz4.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./TopSubsidebar-DqjiDOjY.js";
import "./WriteList-BUr_6Sxs.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./CategoryTree-jbxmBuN-.js";
const siteName = "Yazı Platformu";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutWritesCategories"
}, {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const isMobile = props.screen.isMobileSidebar;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = props.screen.name;
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
      var _a;
      const meta = {
        description: "",
        keywords: ""
      };
      if (props.write) {
        meta.description = props.write.meta_description || props.write.summary || truncateText((_a = props.write.content) == null ? void 0 : _a.replace(/<[^>]*>?/gm, ""), 160);
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
    const flashSuccess = ref(props.flash.success);
    const isSidebarCollapsed = ref(true);
    const sidebarComponents = {
      writes: _sfc_main$2,
      categories: _sfc_main$1
    };
    const sidebarComponent = computed(() => {
      if (isSidebarCollapsed.value && screenName) {
        return sidebarComponents[screenName] || null;
      }
      return null;
    });
    onMounted(() => {
      if (window.Inertia) {
        window.Inertia.visit = Object.assign(window.Inertia.visit, {
          preserveScroll: true,
          preserveState: true
        });
      }
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
      _push(ssrRenderComponent(_sfc_main$3, { message: flashSuccess.value }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$4, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$5, { isCollapsed: isSidebarCollapsed.value }, {
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
