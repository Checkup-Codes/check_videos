import { computed, withCtx, unref, createVNode, withModifiers, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
import { _ as _sfc_main$2 } from "./ZoomableImage-iVeXa9el.js";
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
    const projects = computed(() => page.props.projects || []);
    const isGuestView = computed(() => !!page.props.isGuestView);
    const coverImage = (project) => {
      var _a, _b;
      return ((_b = (_a = project.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.image_path) || null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl px-1 py-4 sm:px-2"${_scopeId}><div class="mb-4 flex items-baseline justify-between gap-3"${_scopeId}><div${_scopeId}><h1 class="text-lg font-semibold text-foreground"${_scopeId}>Projeler</h1><p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(projects.value.length)} kayıt</p></div></div>`);
            if (projects.value.length === 0) {
              _push2(`<div class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"${_scopeId}> Henüz proje yok. </div>`);
            } else {
              _push2(`<div class="divide-y divide-border rounded-md border border-border"${_scopeId}><!--[-->`);
              ssrRenderList(projects.value, (project) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: project.id,
                  href: `/projects/${project.id}`,
                  class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a, _b;
                    if (_push3) {
                      _push3(`<div class="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30"${_scopeId2}>`);
                      if (coverImage(project)) {
                        _push3(ssrRenderComponent(_sfc_main$2, {
                          src: coverImage(project),
                          alt: project.project_name,
                          gallery: project.images || [],
                          "wrapper-class": "h-full w-full",
                          "img-class": "h-full w-full object-cover"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<div class="flex h-full w-full items-center justify-center text-muted-foreground"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg></div>`);
                      }
                      _push3(`</div><div class="min-w-0 flex-1"${_scopeId2}><p class="truncate text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(project.project_name)}</p>`);
                      if (!isGuestView.value && project.customer) {
                        _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(project.customer.first_name)} ${ssrInterpolate(project.customer.last_name)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if ((_a = project.services) == null ? void 0 : _a.length) {
                        _push3(`<span class="shrink-0 text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(project.services.length)} hizmet </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("div", {
                          class: "h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }, [
                          coverImage(project) ? (openBlock(), createBlock(_sfc_main$2, {
                            key: 0,
                            src: coverImage(project),
                            alt: project.project_name,
                            gallery: project.images || [],
                            "wrapper-class": "h-full w-full",
                            "img-class": "h-full w-full object-cover"
                          }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex h-full w-full items-center justify-center text-muted-foreground"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ]))
                          ]))
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(project.project_name), 1),
                          !isGuestView.value && project.customer ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "truncate text-xs text-muted-foreground"
                          }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)) : createCommentVNode("", true)
                        ]),
                        ((_b = project.services) == null ? void 0 : _b.length) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "shrink-0 text-xs text-muted-foreground"
                        }, toDisplayString(project.services.length) + " hizmet ", 1)) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl px-1 py-4 sm:px-2" }, [
                createVNode("div", { class: "mb-4 flex items-baseline justify-between gap-3" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-lg font-semibold text-foreground" }, "Projeler"),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(projects.value.length) + " kayıt", 1)
                  ])
                ]),
                projects.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
                }, " Henüz proje yok. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "divide-y divide-border rounded-md border border-border"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(projects.value, (project) => {
                    return openBlock(), createBlock(unref(Link), {
                      key: project.id,
                      href: `/projects/${project.id}`,
                      class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                    }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode("div", {
                            class: "h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30",
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }, [
                            coverImage(project) ? (openBlock(), createBlock(_sfc_main$2, {
                              key: 0,
                              src: coverImage(project),
                              alt: project.project_name,
                              gallery: project.images || [],
                              "wrapper-class": "h-full w-full",
                              "img-class": "h-full w-full object-cover"
                            }, null, 8, ["src", "alt", "gallery"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex h-full w-full items-center justify-center text-muted-foreground"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ]))
                            ]))
                          ], 8, ["onClick"]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(project.project_name), 1),
                            !isGuestView.value && project.customer ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "truncate text-xs text-muted-foreground"
                            }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)) : createCommentVNode("", true)
                          ]),
                          ((_a = project.services) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "shrink-0 text-xs text-muted-foreground"
                          }, toDisplayString(project.services.length) + " hizmet ", 1)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1032, ["href"]);
                  }), 128))
                ]))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
