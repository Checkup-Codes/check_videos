import { computed, ref, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
      if (!price) return "Fiyat yok";
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "group rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-sm" }, _attrs))}><div class="flex items-center justify-between gap-4 p-4"><div class="flex flex-1 items-center gap-3"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="min-w-0 flex-1"><div class="flex items-center gap-2"><h3 class="font-medium text-foreground">${ssrInterpolate(__props.service.name)}</h3>`);
      if (hasChildren.value) {
        _push(`<button class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"${ssrRenderAttr("title", isOpen.value ? "Daralt" : "Genişlet")}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.service.description) {
        _push(`<p class="mt-1 line-clamp-1 text-sm text-muted-foreground">${ssrInterpolate(__props.service.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center gap-3">`);
      if (__props.service.price) {
        _push(`<div class="hidden items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground sm:flex">${ssrInterpolate(formatPrice(__props.service.price))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.id}`,
        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        title: "Görüntüle",
        onClick: () => {
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }),
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
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
        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        title: "Düzenle",
        onClick: () => {
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
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
        _push(`<div class="border-t border-border bg-muted/30 px-4 pb-3 pt-3"><p class="mb-2 text-xs font-medium text-muted-foreground">Alt Kategoriler</p><ul class="space-y-2"><!--[-->`);
        ssrRenderList(children.value, (child) => {
          _push(ssrRenderComponent(_sfc_main, {
            key: child.id,
            service: child,
            "all-services": __props.allServices
          }, null, _parent));
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
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
