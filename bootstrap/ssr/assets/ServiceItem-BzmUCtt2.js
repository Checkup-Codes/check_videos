import { computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ServiceItem",
  __ssrInlineRender: true,
  props: {
    service: {
      type: Object,
      required: true
    },
    allServices: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const hasChildren = computed(() => {
      return props.allServices.some((child) => child.sub_category_id === props.service.id);
    });
    const children = computed(() => {
      return props.allServices.filter((child) => child.sub_category_id === props.service.id);
    });
    const isOpen = ref(false);
    const formatPrice = (price) => {
      if (!price) return "₺0";
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(price);
    };
    const stripHtml = (html) => {
      if (!html) return "";
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm" }, _attrs))}><div class="flex items-center justify-between gap-3 p-4"><div class="${ssrRenderClass([{ "cursor-pointer": hasChildren.value }, "flex flex-1 items-center gap-3 min-w-0"])}"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 transition-all group-hover:from-primary/30 group-hover:to-primary/10"><svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="min-w-0 flex-1"><div class="flex items-center gap-2"><h3 class="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">${ssrInterpolate(__props.service.name)}</h3>`);
      if (hasChildren.value) {
        _push(`<button class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-all hover:bg-accent hover:text-foreground"${ssrRenderAttr("title", isOpen.value ? "Daralt" : "Genişlet")}><svg class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "h-3.5 w-3.5 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.service.description) {
        _push(`<p class="mt-1 line-clamp-1 text-xs text-muted-foreground">${ssrInterpolate(stripHtml(__props.service.description))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center gap-2 shrink-0">`);
      if (__props.service.price) {
        _push(`<div class="hidden items-center rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 text-xs font-semibold text-primary sm:flex">${ssrInterpolate(formatPrice(__props.service.price))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-0.5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.id}`,
        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        title: "Görüntüle",
        onClick: () => {
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }),
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.id}/edit`,
        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        title: "Düzenle",
        onClick: () => {
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (isOpen.value && children.value.length) {
        _push(`<div class="border-t border-border bg-muted/10 px-4 py-2"><ul class="space-y-0.5"><!--[-->`);
        ssrRenderList(children.value, (child) => {
          _push(`<li class="group/child flex items-center justify-between gap-2 rounded-md px-3 py-2 transition-colors hover:bg-accent/50">`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/services/${child.id}`,
            class: "flex min-w-0 flex-1 items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="h-3 w-3 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg><span class="truncate text-xs font-medium text-foreground group-hover/child:text-primary transition-colors"${_scopeId}>${ssrInterpolate(child.name)}</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "h-3 w-3 shrink-0 text-muted-foreground",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ])),
                  createVNode("span", { class: "truncate text-xs font-medium text-foreground group-hover/child:text-primary transition-colors" }, toDisplayString(child.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="flex items-center gap-2 shrink-0">`);
          if (child.price) {
            _push(`<span class="text-xs font-medium text-primary">${ssrInterpolate(formatPrice(child.price))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(unref(Link), {
            href: `/services/${child.id}/edit`,
            class: "opacity-0 transition-opacity group-hover/child:opacity-100",
            onClick: () => {
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Index/ServiceItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
