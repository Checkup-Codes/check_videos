import { ref, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ShowEquipment",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const auth = ref(props.auth);
    const equipment = ref(props.equipment);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto min-h-screen p-8" }, _attrs))}><div class="mx-auto max-w-4xl"><div class="mb-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/equipments",
        class: "flex items-center text-blue-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId}></path></svg> Ekipmanlara Dön `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "mr-2 h-5 w-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createTextVNode(" Ekipmanlara Dön ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="rounded-lg bg-white p-6 shadow-lg"><div class="mb-6 flex items-start justify-between"><h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate(equipment.value.name)}</h1>`);
      if (auth.value.user) {
        _push(`<div class="flex space-x-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/equipments/${equipment.value.id}/edit`,
          class: "rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Düzenle `);
            } else {
              return [
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"> Sil </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 gap-6 md:grid-cols-2"><div><h3 class="mb-2 text-lg font-semibold text-gray-700">Özellikler</h3><div class="rounded-lg bg-gray-50 p-4"><p class="whitespace-pre-wrap text-gray-800">${ssrInterpolate(equipment.value.specs)}</p></div></div><div><h3 class="mb-2 text-lg font-semibold text-gray-700">Link</h3><div class="rounded-lg bg-gray-50 p-4"><a${ssrRenderAttr("href", equipment.value.link)} target="_blank" class="break-all text-blue-600 hover:text-blue-800 hover:underline">${ssrInterpolate(equipment.value.link)}</a></div></div></div><div class="mt-6 text-center"><a${ssrRenderAttr("href", equipment.value.link)} target="_blank" class="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"><svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> Ekipmanı Ziyaret Et </a></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Equipments/ShowEquipment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
