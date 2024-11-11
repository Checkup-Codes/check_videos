import { computed, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "border-b border-gray-100 py-3 transition-colors duration-150 hover:bg-gray-50" }, _attrs))} data-v-dcc8aa5a><div class="flex cursor-pointer items-center justify-between" data-v-dcc8aa5a><div data-v-dcc8aa5a><span class="block font-semibold text-gray-800" data-v-dcc8aa5a>${ssrInterpolate(__props.service.name)}</span>`);
      if (__props.service.description) {
        _push(`<span class="block text-sm text-gray-500" data-v-dcc8aa5a>${ssrInterpolate(__props.service.description)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-2" data-v-dcc8aa5a>`);
      if (__props.service.price) {
        _push(`<span class="text-sm font-medium text-gray-600" data-v-dcc8aa5a>${ssrInterpolate(formatPrice(__props.service.price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (hasChildren.value) {
        _push(`<span class="text-sm font-medium text-blue-500" data-v-dcc8aa5a>${ssrInterpolate(isOpen.value ? "▲" : "▼")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        href: `/services/${__props.service.slug}`,
        class: "text-blue-400 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
              icon: "fa-solid fa-share-alt",
              class: "text-sm"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(FontAwesomeIcon), {
                icon: "fa-solid fa-share-alt",
                class: "text-sm"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (isOpen.value && children.value.length) {
        _push(`<ul class="ml-4 mt-2 border-l-2 border-gray-200 pl-4" data-v-dcc8aa5a><!--[-->`);
        ssrRenderList(children.value, (child) => {
          _push(ssrRenderComponent(ServiceItem, {
            key: child.id,
            service: child,
            "all-services": __props.allServices
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
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
const ServiceItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dcc8aa5a"]]);
export {
  ServiceItem as default
};
