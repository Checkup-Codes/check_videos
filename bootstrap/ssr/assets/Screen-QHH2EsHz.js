import { computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const customers = computed(() => props.customers || []);
    const formatDate = (dateString) => {
      if (!dateString) return "Not Available";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))} data-v-c040daca><h1 class="mb-8 text-3xl font-semibold text-gray-700" data-v-c040daca>Müşteriler</h1><div class="w-full max-w-screen-lg overflow-x-auto rounded-lg bg-white shadow-lg" data-v-c040daca><table class="min-w-full divide-y divide-gray-200" data-v-c040daca><thead class="bg-gray-100" data-v-c040daca><tr data-v-c040daca><th class="table-header" data-v-c040daca>ID</th><th class="table-header" data-v-c040daca>İlk İsmi</th><th class="table-header" data-v-c040daca>Soy Adı</th><th class="table-header" data-v-c040daca>E-posta</th><th class="table-header" data-v-c040daca>Oluşturulma Tarihi</th><th class="table-header" data-v-c040daca>Detay</th></tr></thead><tbody class="divide-y divide-gray-200" data-v-c040daca><!--[-->`);
      ssrRenderList(customers.value, (customer) => {
        _push(`<tr class="transition-colors hover:bg-gray-50" data-v-c040daca><td class="ellipsis-cell table-cell" data-v-c040daca>${ssrInterpolate(customer.id)}</td><td class="table-cell" data-v-c040daca>${ssrInterpolate(customer.first_name)}</td><td class="table-cell" data-v-c040daca>${ssrInterpolate(customer.last_name)}</td><td class="table-cell" data-v-c040daca>${ssrInterpolate(customer.email)}</td><td class="table-cell text-gray-500" data-v-c040daca>${ssrInterpolate(formatDate(customer.created_at))}</td><td class="table-cell text-blue-600" data-v-c040daca>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/customers/${customer.id}`,
          class: "hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Detaylar`);
            } else {
              return [
                createTextVNode("Detaylar")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c040daca"]]);
export {
  Screen as default
};
