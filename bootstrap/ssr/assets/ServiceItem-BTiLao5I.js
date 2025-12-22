import { computed, ref, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
      return price ? `${parseFloat(price).toLocaleString()} USD` : "Uygun Değil";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "mb-2 rounded-md border border-border bg-card shadow-sm transition-colors hover:bg-accent/50" }, _attrs))} data-v-5af66f17><div class="flex cursor-pointer items-center justify-between p-4" data-v-5af66f17><div class="flex-1" data-v-5af66f17><div class="flex items-center gap-3" data-v-5af66f17><div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" data-v-5af66f17><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5af66f17><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-5af66f17></path></svg></div><span class="font-semibold text-foreground" data-v-5af66f17>${ssrInterpolate(__props.service.name)}</span></div>`);
      if (__props.service.description) {
        _push(`<p class="mt-1.5 pl-11 text-sm text-muted-foreground" data-v-5af66f17>${ssrInterpolate(__props.service.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2" data-v-5af66f17>`);
      if (__props.service.price) {
        _push(`<div class="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground" data-v-5af66f17>${ssrInterpolate(formatPrice(__props.service.price))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-1" data-v-5af66f17>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.id}`,
        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        title: "Görüntüle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5af66f17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-5af66f17${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-5af66f17${_scopeId}></path></svg>`);
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
        title: "Düzenle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5af66f17${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-5af66f17${_scopeId}></path></svg>`);
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
      _push(`</div>`);
      if (hasChildren.value) {
        _push(`<button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"${ssrRenderAttr("title", isOpen.value ? "Daralt" : "Genişlet")} data-v-5af66f17>`);
        if (isOpen.value) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5af66f17><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" data-v-5af66f17></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5af66f17><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-5af66f17></path></svg>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (isOpen.value && children.value.length) {
        _push(`<div class="rounded-b-md border-t border-border bg-muted/30 p-4 pt-3" data-v-5af66f17><p class="mb-2 text-xs font-medium text-muted-foreground" data-v-5af66f17>Alt Kategoriler:</p><ul class="ml-4 space-y-2" data-v-5af66f17><!--[-->`);
        ssrRenderList(children.value, (child) => {
          _push(ssrRenderComponent(ServiceItem, {
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
const ServiceItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5af66f17"]]);
export {
  ServiceItem as default
};
