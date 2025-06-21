import { computed, createSlots, withCtx, createVNode, unref, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$2 from "./LayoutWritesCategories-DD1Sv5UJ.js";
import Screen from "./Screen-CiKx1_BM.js";
import { _ as _sfc_main$1 } from "./PageMeta-Dly5tI55.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-DZopqfQI.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./WriteList-cXx0vZ9U.js";
import "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./PerformanceMonitorButton-8xVocVYa.js";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-x6qG5wqp.js";
import "./SidebarLayoutCategory-DPrunSAM.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CategoryTree-C87dy2Ue.js";
import "./ExcalidrawComponent-CBRfLf7m.js";
import "./CheckScreen-G62taWZ6.js";
import "./useGsapAnimation-DunE29St.js";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
import "./useProcessedQuillContent-DefVwcVW.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteByCategoryPage"
}, {
  __name: "WriteByCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = props.category || {};
    const write = props.write || {};
    const metaTitle = computed(() => {
      if (write.title && category.name) {
        return `${write.title} | ${category.name} Kategorisi`;
      } else if (write.title) {
        return write.title;
      } else if (category.name) {
        return `${category.name} Kategorisi`;
      }
      return "Kategori Yazısı";
    });
    const metaDescription = computed(() => {
      return write.meta_description || write.summary || `${category.name} kategorisinde yer alan "${write.title}" başlıklı yazı.`;
    });
    const metaKeywords = computed(() => {
      return [write.seo_keywords || "", write.tags || "", category.name || ""].filter(Boolean).join(", ");
    });
    const metaImage = computed(() => {
      return write.cover_image || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: metaTitle.value,
        description: metaDescription.value,
        keywords: metaKeywords.value,
        image: metaImage.value,
        type: "article"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, createSlots({
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Screen, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Screen)
            ];
          }
        }),
        _: 2
      }, [
        ((_a = _ctx.$page.props.auth) == null ? void 0 : _a.user) ? {
          name: "mobile-actions",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-end gap-2 p-2"${_scopeId}>`);
              if (unref(write).id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("writes.edit", { write: unref(write).slug }),
                  class: "btn btn-ghost btn-sm btn-circle",
                  title: "Düzenle"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "h-5 w-5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-end gap-2 p-2" }, [
                  unref(write).id ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("writes.edit", { write: unref(write).slug }),
                    class: "btn btn-ghost btn-sm btn-circle",
                    title: "Düzenle"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-5 w-5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        })
                      ]))
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
