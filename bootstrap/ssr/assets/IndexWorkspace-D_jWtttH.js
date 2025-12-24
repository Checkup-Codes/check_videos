import { computed, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexWorkspace",
  __ssrInlineRender: true,
  props: {
    workspaces: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const page = usePage();
    const props = __props;
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const currentIndex = ref(0);
    const nextWorkspace = () => {
      if (currentIndex.value < props.workspaces.length - 1) {
        currentIndex.value++;
      }
    };
    const previousWorkspace = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-5xl py-8" data-v-9ab99a31${_scopeId}><div class="mb-12" data-v-9ab99a31${_scopeId}><h1 class="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-v-9ab99a31${_scopeId}>Çalışma Alanım</h1></div>`);
            if (__props.workspaces.length === 1) {
              _push2(`<div class="space-y-8" data-v-9ab99a31${_scopeId}><div class="overflow-hidden rounded-xl bg-card shadow-sm" data-v-9ab99a31${_scopeId}>`);
              if (isLoggedIn.value) {
                _push2(`<div class="flex items-center justify-end gap-2 p-4" data-v-9ab99a31${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/workspace/${__props.workspaces[0].id}/edit`,
                  class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-9ab99a31${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-9ab99a31${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "h-3.5 w-3.5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.workspaces[0].images && __props.workspaces[0].images.length > 0) {
                _push2(`<div class="space-y-2 p-4" data-v-9ab99a31${_scopeId}><!--[-->`);
                ssrRenderList(__props.workspaces[0].images, (image, index) => {
                  _push2(`<div class="group relative w-full overflow-hidden rounded-lg" data-v-9ab99a31${_scopeId}><img${ssrRenderAttr("src", `/storage/${image}`)}${ssrRenderAttr("alt", `Çalışma Alanı Resim ${index + 1}`)} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" data-v-9ab99a31${_scopeId}></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="flex aspect-video items-center justify-center bg-muted" data-v-9ab99a31${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9ab99a31${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-9ab99a31${_scopeId}></path></svg></div>`);
              }
              if (__props.workspaces[0].products && __props.workspaces[0].products.length > 0) {
                _push2(`<div class="p-6" data-v-9ab99a31${_scopeId}><div class="mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid" data-v-9ab99a31${_scopeId}><div class="col-span-4" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>Ürün Adı</span></div><div class="col-span-5" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>Özellikler</span></div><div class="col-span-3 flex justify-end" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>İşlem</span></div></div><div class="space-y-3" data-v-9ab99a31${_scopeId}><!--[-->`);
                ssrRenderList(__props.workspaces[0].products, (product) => {
                  _push2(`<div class="grid grid-cols-12 items-center gap-4 py-2" data-v-9ab99a31${_scopeId}><div class="col-span-12 md:col-span-4" data-v-9ab99a31${_scopeId}><span class="text-sm font-medium text-foreground" data-v-9ab99a31${_scopeId}>${ssrInterpolate(product.name)}</span></div><div class="col-span-12 md:col-span-5" data-v-9ab99a31${_scopeId}>`);
                  if (product.features) {
                    _push2(`<p class="text-sm text-muted-foreground" data-v-9ab99a31${_scopeId}>${ssrInterpolate(product.features)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="col-span-12 flex justify-end md:col-span-3" data-v-9ab99a31${_scopeId}>`);
                  if (product.link) {
                    _push2(`<a${ssrRenderAttr("href", product.link)} target="_blank" rel="noopener noreferrer" class="text-sm text-primary transition-colors hover:text-primary/80" data-v-9ab99a31${_scopeId}> Satın Al </a>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else if (__props.workspaces.length > 1) {
              _push2(`<div class="relative" data-v-9ab99a31${_scopeId}><div class="relative overflow-hidden rounded-xl bg-card shadow-sm" data-v-9ab99a31${_scopeId}>`);
              if (isLoggedIn.value) {
                _push2(`<div class="flex items-center justify-end gap-2 p-4" data-v-9ab99a31${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/workspace/${__props.workspaces[currentIndex.value].id}/edit`,
                  class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-9ab99a31${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-9ab99a31${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "h-3.5 w-3.5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle({ transform: `translateX(-${currentIndex.value * 100}%)` })}" data-v-9ab99a31${_scopeId}><!--[-->`);
              ssrRenderList(__props.workspaces, (workspace) => {
                _push2(`<div class="min-w-full flex-shrink-0" data-v-9ab99a31${_scopeId}>`);
                if (workspace.images && workspace.images.length > 0) {
                  _push2(`<div class="space-y-2 p-4" data-v-9ab99a31${_scopeId}><!--[-->`);
                  ssrRenderList(workspace.images, (image, index) => {
                    _push2(`<div class="group relative w-full overflow-hidden rounded-lg" data-v-9ab99a31${_scopeId}><img${ssrRenderAttr("src", `/storage/${image}`)}${ssrRenderAttr("alt", `Çalışma Alanı Resim ${index + 1}`)} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" data-v-9ab99a31${_scopeId}></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div class="flex aspect-video items-center justify-center bg-muted" data-v-9ab99a31${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9ab99a31${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-9ab99a31${_scopeId}></path></svg></div>`);
                }
                if (workspace.products && workspace.products.length > 0) {
                  _push2(`<div class="p-6" data-v-9ab99a31${_scopeId}><h2 class="mb-4 text-xl font-semibold text-foreground" data-v-9ab99a31${_scopeId}>Ürünler</h2><div class="mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid" data-v-9ab99a31${_scopeId}><div class="col-span-4" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>Ürün Adı</span></div><div class="col-span-5" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>Özellikler</span></div><div class="col-span-3 flex justify-end" data-v-9ab99a31${_scopeId}><span class="text-xs font-medium uppercase tracking-wider text-muted-foreground" data-v-9ab99a31${_scopeId}>İşlem</span></div></div><div class="space-y-3" data-v-9ab99a31${_scopeId}><!--[-->`);
                  ssrRenderList(workspace.products, (product) => {
                    _push2(`<div class="grid grid-cols-12 items-center gap-4 py-2" data-v-9ab99a31${_scopeId}><div class="col-span-12 md:col-span-4" data-v-9ab99a31${_scopeId}><span class="text-sm font-medium text-foreground" data-v-9ab99a31${_scopeId}>${ssrInterpolate(product.name)}</span></div><div class="col-span-12 md:col-span-5" data-v-9ab99a31${_scopeId}>`);
                    if (product.features) {
                      _push2(`<p class="text-sm text-muted-foreground" data-v-9ab99a31${_scopeId}>${ssrInterpolate(product.features)}</p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><div class="col-span-12 flex justify-end md:col-span-3" data-v-9ab99a31${_scopeId}>`);
                    if (product.link) {
                      _push2(`<a${ssrRenderAttr("href", product.link)} target="_blank" rel="noopener noreferrer" class="text-sm text-primary transition-colors hover:text-primary/80" data-v-9ab99a31${_scopeId}> Satın Al </a>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
              if (__props.workspaces.length > 1) {
                _push2(`<button${ssrIncludeBooleanAttr(currentIndex.value === 0) ? " disabled" : ""} class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30" aria-label="Önceki" data-v-9ab99a31${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9ab99a31${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-9ab99a31${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.workspaces.length > 1) {
                _push2(`<button${ssrIncludeBooleanAttr(currentIndex.value === __props.workspaces.length - 1) ? " disabled" : ""} class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30" aria-label="Sonraki" data-v-9ab99a31${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9ab99a31${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-9ab99a31${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.workspaces.length > 1) {
                _push2(`<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" data-v-9ab99a31${_scopeId}><!--[-->`);
                ssrRenderList(__props.workspaces, (workspace, index) => {
                  _push2(`<button class="${ssrRenderClass([currentIndex.value === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30", "h-2 rounded-full transition-all"])}"${ssrRenderAttr("aria-label", `Çalışma alanı ${index + 1}`)} data-v-9ab99a31${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center" data-v-9ab99a31${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9ab99a31${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-9ab99a31${_scopeId}></path></svg><h3 class="mb-2 text-lg font-medium text-foreground" data-v-9ab99a31${_scopeId}>Henüz çalışma alanı yok</h3><p class="text-sm text-muted-foreground" data-v-9ab99a31${_scopeId}>Çalışma alanları eklendiğinde burada görünecek.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-5xl py-8" }, [
                createVNode("div", { class: "mb-12" }, [
                  createVNode("h1", { class: "mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" }, "Çalışma Alanım")
                ]),
                __props.workspaces.length === 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-8"
                }, [
                  createVNode("div", { class: "overflow-hidden rounded-xl bg-card shadow-sm" }, [
                    isLoggedIn.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-end gap-2 p-4"
                    }, [
                      createVNode(unref(Link), {
                        href: `/workspace/${__props.workspaces[0].id}/edit`,
                        class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "h-3.5 w-3.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            })
                          ])),
                          createTextVNode(" Düzenle ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : createCommentVNode("", true),
                    __props.workspaces[0].images && __props.workspaces[0].images.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2 p-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.workspaces[0].images, (image, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "group relative w-full overflow-hidden rounded-lg"
                        }, [
                          createVNode("img", {
                            src: `/storage/${image}`,
                            alt: `Çalışma Alanı Resim ${index + 1}`,
                            class: "h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          }, null, 8, ["src", "alt"])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex aspect-video items-center justify-center bg-muted"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-16 w-16 text-muted-foreground/30",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1",
                          d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ]))
                    ])),
                    __props.workspaces[0].products && __props.workspaces[0].products.length > 0 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "p-6"
                    }, [
                      createVNode("div", { class: "mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid" }, [
                        createVNode("div", { class: "col-span-4" }, [
                          createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "Ürün Adı")
                        ]),
                        createVNode("div", { class: "col-span-5" }, [
                          createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "Özellikler")
                        ]),
                        createVNode("div", { class: "col-span-3 flex justify-end" }, [
                          createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "İşlem")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.workspaces[0].products, (product) => {
                          return openBlock(), createBlock("div", {
                            key: product.id,
                            class: "grid grid-cols-12 items-center gap-4 py-2"
                          }, [
                            createVNode("div", { class: "col-span-12 md:col-span-4" }, [
                              createVNode("span", { class: "text-sm font-medium text-foreground" }, toDisplayString(product.name), 1)
                            ]),
                            createVNode("div", { class: "col-span-12 md:col-span-5" }, [
                              product.features ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-muted-foreground"
                              }, toDisplayString(product.features), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-span-12 flex justify-end md:col-span-3" }, [
                              product.link ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: product.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                class: "text-sm text-primary transition-colors hover:text-primary/80"
                              }, " Satın Al ", 8, ["href"])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])) : __props.workspaces.length > 1 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "relative"
                }, [
                  createVNode("div", { class: "relative overflow-hidden rounded-xl bg-card shadow-sm" }, [
                    isLoggedIn.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-end gap-2 p-4"
                    }, [
                      createVNode(unref(Link), {
                        href: `/workspace/${__props.workspaces[currentIndex.value].id}/edit`,
                        class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "h-3.5 w-3.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            })
                          ])),
                          createTextVNode(" Düzenle ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "flex transition-transform duration-500 ease-in-out",
                      style: { transform: `translateX(-${currentIndex.value * 100}%)` }
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.workspaces, (workspace) => {
                        return openBlock(), createBlock("div", {
                          key: workspace.id,
                          class: "min-w-full flex-shrink-0"
                        }, [
                          workspace.images && workspace.images.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2 p-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(workspace.images, (image, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "group relative w-full overflow-hidden rounded-lg"
                              }, [
                                createVNode("img", {
                                  src: `/storage/${image}`,
                                  alt: `Çalışma Alanı Resim ${index + 1}`,
                                  class: "h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                }, null, 8, ["src", "alt"])
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex aspect-video items-center justify-center bg-muted"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-16 w-16 text-muted-foreground/30",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1",
                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ]))
                          ])),
                          workspace.products && workspace.products.length > 0 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "p-6"
                          }, [
                            createVNode("h2", { class: "mb-4 text-xl font-semibold text-foreground" }, "Ürünler"),
                            createVNode("div", { class: "mb-3 hidden grid-cols-12 gap-4 border-b border-border pb-2 md:grid" }, [
                              createVNode("div", { class: "col-span-4" }, [
                                createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "Ürün Adı")
                              ]),
                              createVNode("div", { class: "col-span-5" }, [
                                createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "Özellikler")
                              ]),
                              createVNode("div", { class: "col-span-3 flex justify-end" }, [
                                createVNode("span", { class: "text-xs font-medium uppercase tracking-wider text-muted-foreground" }, "İşlem")
                              ])
                            ]),
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(workspace.products, (product) => {
                                return openBlock(), createBlock("div", {
                                  key: product.id,
                                  class: "grid grid-cols-12 items-center gap-4 py-2"
                                }, [
                                  createVNode("div", { class: "col-span-12 md:col-span-4" }, [
                                    createVNode("span", { class: "text-sm font-medium text-foreground" }, toDisplayString(product.name), 1)
                                  ]),
                                  createVNode("div", { class: "col-span-12 md:col-span-5" }, [
                                    product.features ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-sm text-muted-foreground"
                                    }, toDisplayString(product.features), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "col-span-12 flex justify-end md:col-span-3" }, [
                                    product.link ? (openBlock(), createBlock("a", {
                                      key: 0,
                                      href: product.link,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      class: "text-sm text-primary transition-colors hover:text-primary/80"
                                    }, " Satın Al ", 8, ["href"])) : createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ], 4),
                    __props.workspaces.length > 1 ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: previousWorkspace,
                      disabled: currentIndex.value === 0,
                      class: "absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30",
                      "aria-label": "Önceki"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-5 w-5 text-foreground",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 19l-7-7 7-7"
                        })
                      ]))
                    ], 8, ["disabled"])) : createCommentVNode("", true),
                    __props.workspaces.length > 1 ? (openBlock(), createBlock("button", {
                      key: 2,
                      onClick: nextWorkspace,
                      disabled: currentIndex.value === __props.workspaces.length - 1,
                      class: "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-lg transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-30",
                      "aria-label": "Sonraki"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-5 w-5 text-foreground",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 5l7 7-7 7"
                        })
                      ]))
                    ], 8, ["disabled"])) : createCommentVNode("", true),
                    __props.workspaces.length > 1 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.workspaces, (workspace, index) => {
                        return openBlock(), createBlock("button", {
                          key: workspace.id,
                          onClick: ($event) => currentIndex.value = index,
                          class: ["h-2 rounded-full transition-all", currentIndex.value === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"],
                          "aria-label": `Çalışma alanı ${index + 1}`
                        }, null, 10, ["onClick", "aria-label"]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "rounded-xl border border-dashed border-border bg-card/50 py-16 text-center"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "mx-auto mb-4 h-16 w-16 text-muted-foreground/30",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])),
                  createVNode("h3", { class: "mb-2 text-lg font-medium text-foreground" }, "Henüz çalışma alanı yok"),
                  createVNode("p", { class: "text-sm text-muted-foreground" }, "Çalışma alanları eklendiğinde burada görünecek.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Workspace/IndexWorkspace.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndexWorkspace = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ab99a31"]]);
export {
  IndexWorkspace as default
};
