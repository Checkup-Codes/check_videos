import { computed, isRef, ref, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import _sfc_main$1 from "./SPPrice-DDe_ZJN3.js";
import Box from "./Box-D23LJ2w_.js";
import "../ssr.js";
import "@inertiajs/vue3";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const useMonthlyPayment = (total, interestRate, duration) => {
  const monthlyPayment = computed(() => {
    const principle = isRef(total) ? total.value : total;
    const monthlyInterest = (isRef(interestRate) ? interestRate.value : interestRate) / 100 / 12;
    const numberOfPaymentMonths = (isRef(duration) ? duration.value : duration) * 12;
    return principle * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPaymentMonths) / (Math.pow(1 + monthlyInterest, numberOfPaymentMonths) - 1);
  });
  const totalPaid = computed(() => {
    return (isRef(duration) ? duration.value : duration) * 12 * monthlyPayment.value;
  });
  const totalInterest = computed(() => totalPaid.value - (isRef(total) ? total.value : total));
  return { monthlyPayment, totalPaid, totalInterest };
};
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    softwareProduct: Object
  },
  setup(__props) {
    const props = __props;
    const interestRate = ref(2.5);
    const duration = ref(25);
    const { monthlyPayment, totalPaid, totalInterest } = useMonthlyPayment(
      props.softwareProduct.price,
      interestRate,
      duration
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col-reverse gap-4 p-5 md:grid md:grid-cols-12">`);
      _push(ssrRenderComponent(Box, { class: "flex w-full items-center md:col-span-7" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full text-center font-medium text-gray-500"${_scopeId}>Resim yok</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full text-center font-medium text-gray-500" }, "Resim yok")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col gap-4 md:col-span-5"><div><label class="label">Faiz oranı (${ssrInterpolate(interestRate.value)}%)</label><input${ssrRenderAttr("value", interestRate.value)} type="range" min="0.1" max="30" step="0.1" class="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"><label class="label">Süre (${ssrInterpolate(duration.value)} yıl)</label><input${ssrRenderAttr("value", duration.value)} type="range" min="3" max="35" step="1" class="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-100"><div class="mt-2 text-gray-600 dark:text-gray-300"><div class="text-gray-400">Aylık ödemeniz</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        price: unref(monthlyPayment),
        class: "text-3xl"
      }, null, _parent));
      _push(`</div><div class="mt-2 text-gray-500"><div class="flex justify-between"><div>Toplam ödeme</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        price: unref(totalPaid),
        class: "font-medium"
      }, null, _parent));
      _push(`</div></div><div class="flex justify-between"><div>Ödenen anapara</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        price: __props.softwareProduct.price,
        class: "font-medium"
      }, null, _parent));
      _push(`</div></div><div class="flex justify-between"><div>Ödenen faiz</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        price: unref(totalInterest),
        class: "font-medium"
      }, null, _parent));
      _push(`</div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
