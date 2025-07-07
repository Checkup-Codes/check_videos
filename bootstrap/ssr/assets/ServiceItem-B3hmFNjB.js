import { computed, ref, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
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
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "mb-3 rounded-lg border border-base-300 shadow-sm" }, _attrs))} data-v-1bd2242d><div class="flex cursor-pointer items-center justify-between p-4" data-v-1bd2242d><div data-v-1bd2242d><div class="flex items-center" data-v-1bd2242d><div class="bg-primary/20 mr-3 rounded-full p-2" data-v-1bd2242d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd2242d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-1bd2242d></path></svg></div><span class="font-semibold" data-v-1bd2242d>${ssrInterpolate(__props.service.name)}</span></div>`);
      if (__props.service.description) {
        _push(`<p class="mt-1 pl-10 text-sm opacity-70" data-v-1bd2242d>${ssrInterpolate(__props.service.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-3" data-v-1bd2242d>`);
      if (__props.service.price) {
        _push(`<div class="badge badge-neutral" data-v-1bd2242d>${ssrInterpolate(formatPrice(__props.service.price))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex space-x-1" data-v-1bd2242d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.id}`,
        class: "btn btn-ghost btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd2242d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-1bd2242d${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-1bd2242d${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
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
        class: "btn btn-ghost btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd2242d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-1bd2242d${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
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
      _push(`</div>`);
      if (hasChildren.value) {
        _push(`<button class="btn btn-ghost btn-sm btn-circle" data-v-1bd2242d>`);
        if (isOpen.value) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd2242d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" data-v-1bd2242d></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd2242d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-1bd2242d></path></svg>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (isOpen.value && children.value.length) {
        _push(`<div class="rounded-b-lg bg-base-200 p-4 pt-2" data-v-1bd2242d><p class="my-2 text-sm font-medium opacity-70" data-v-1bd2242d>Alt Kategoriler:</p><ul class="ml-4 space-y-3" data-v-1bd2242d><!--[-->`);
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
const ServiceItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bd2242d"]]);
export {
  ServiceItem as default
};
