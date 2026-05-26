import { computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./ProjectsPageFrame-CSu_aWks.js";
import { _ as _sfc_main$2 } from "./ZoomableImage-iVeXa9el.js";
/* empty css                      */
import "./CheckScreen-ChCDBWK6.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const service = computed(() => page.props.service || {});
    const coverImage = computed(() => {
      var _a, _b;
      return ((_b = (_a = service.value.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) || null;
    });
    const galleryImages = computed(() => (service.value.images || []).slice(1));
    const allServiceImages = computed(() => service.value.images || []);
    const formatPrice = (price) => {
      if (!price) return "₺0";
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: service.value.name,
        description: service.value.price ? formatPrice(service.value.price) : ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (coverImage.value) {
              _push2(`<div class="mb-4 overflow-hidden rounded-md border border-border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                src: coverImage.value,
                alt: service.value.name,
                gallery: allServiceImages.value,
                index: 0,
                "wrapper-class": "w-full",
                "img-class": "aspect-[16/9] w-full object-cover"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (galleryImages.value.length) {
              _push2(`<div class="mb-4 flex gap-2 overflow-x-auto pb-1"${_scopeId}><!--[-->`);
              ssrRenderList(galleryImages.value, (image, galleryIndex) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: image.id,
                  src: image.image_path,
                  alt: image.alt_text || service.value.name,
                  gallery: allServiceImages.value,
                  index: galleryIndex + 1,
                  "wrapper-class": "h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border",
                  "img-class": "h-full w-full object-cover"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (service.value.description) {
              _push2(`<div class="quill-content prose prose-sm dark:prose-invert mb-4 rounded-md border border-border bg-card p-4"${_scopeId}>${service.value.description ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (service.value.parentCategory) {
              _push2(`<div class="mb-4 rounded-md border border-border p-3"${_scopeId}><p class="mb-1 text-xs text-muted-foreground"${_scopeId}>Üst kategori</p><p class="text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(service.value.parentCategory.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_a = service.value.subCategories) == null ? void 0 : _a.length) {
              _push2(`<div${_scopeId}><p class="mb-2 text-xs font-medium text-muted-foreground"${_scopeId}>Alt hizmetler</p><div class="divide-y divide-border rounded-md border border-border"${_scopeId}><!--[-->`);
              ssrRenderList(service.value.subCategories, (subCategory) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: subCategory.id,
                  href: `/services/${subCategory.id}`,
                  class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2, _c, _d;
                    if (_push3) {
                      _push3(`<div class="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30"${_scopeId2}>`);
                      if ((_b2 = (_a2 = subCategory.images) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.image_path) {
                        _push3(ssrRenderComponent(_sfc_main$2, {
                          src: subCategory.images[0].image_path,
                          alt: subCategory.name,
                          "wrapper-class": "h-full w-full",
                          "img-class": "h-full w-full object-cover"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="min-w-0 flex-1"${_scopeId2}><p class="truncate text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(subCategory.name)}</p>`);
                      if (subCategory.price) {
                        _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(formatPrice(subCategory.price))}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30" }, [
                          ((_d = (_c = subCategory.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.image_path) ? (openBlock(), createBlock(_sfc_main$2, {
                            key: 0,
                            src: subCategory.images[0].image_path,
                            alt: subCategory.name,
                            "wrapper-class": "h-full w-full",
                            "img-class": "h-full w-full object-cover"
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(subCategory.name), 1),
                          subCategory.price ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground"
                          }, toDisplayString(formatPrice(subCategory.price)), 1)) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              coverImage.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 overflow-hidden rounded-md border border-border"
              }, [
                createVNode(_sfc_main$2, {
                  src: coverImage.value,
                  alt: service.value.name,
                  gallery: allServiceImages.value,
                  index: 0,
                  "wrapper-class": "w-full",
                  "img-class": "aspect-[16/9] w-full object-cover"
                }, null, 8, ["src", "alt", "gallery"])
              ])) : createCommentVNode("", true),
              galleryImages.value.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mb-4 flex gap-2 overflow-x-auto pb-1"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(galleryImages.value, (image, galleryIndex) => {
                  return openBlock(), createBlock(_sfc_main$2, {
                    key: image.id,
                    src: image.image_path,
                    alt: image.alt_text || service.value.name,
                    gallery: allServiceImages.value,
                    index: galleryIndex + 1,
                    "wrapper-class": "h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border",
                    "img-class": "h-full w-full object-cover"
                  }, null, 8, ["src", "alt", "gallery", "index"]);
                }), 128))
              ])) : createCommentVNode("", true),
              service.value.description ? (openBlock(), createBlock("div", {
                key: 2,
                class: "quill-content prose prose-sm dark:prose-invert mb-4 rounded-md border border-border bg-card p-4",
                innerHTML: service.value.description
              }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
              service.value.parentCategory ? (openBlock(), createBlock("div", {
                key: 3,
                class: "mb-4 rounded-md border border-border p-3"
              }, [
                createVNode("p", { class: "mb-1 text-xs text-muted-foreground" }, "Üst kategori"),
                createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(service.value.parentCategory.name), 1)
              ])) : createCommentVNode("", true),
              ((_b = service.value.subCategories) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", { key: 4 }, [
                createVNode("p", { class: "mb-2 text-xs font-medium text-muted-foreground" }, "Alt hizmetler"),
                createVNode("div", { class: "divide-y divide-border rounded-md border border-border" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(service.value.subCategories, (subCategory) => {
                    return openBlock(), createBlock(unref(Link), {
                      key: subCategory.id,
                      href: `/services/${subCategory.id}`,
                      class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          createVNode("div", { class: "h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30" }, [
                            ((_b2 = (_a2 = subCategory.images) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.image_path) ? (openBlock(), createBlock(_sfc_main$2, {
                              key: 0,
                              src: subCategory.images[0].image_path,
                              alt: subCategory.name,
                              "wrapper-class": "h-full w-full",
                              "img-class": "h-full w-full object-cover"
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(subCategory.name), 1),
                            subCategory.price ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-muted-foreground"
                            }, toDisplayString(formatPrice(subCategory.price)), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }),
                      _: 2
                    }, 1032, ["href"]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
