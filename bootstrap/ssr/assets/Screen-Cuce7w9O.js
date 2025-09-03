import { ref, onMounted, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const auth = ref(props.auth);
    const equipments = ref(props.equipments);
    const flashSuccess = ref(props.flash.success);
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-4 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mx-auto min-h-screen p-8"><div><div class="flex justify-between"><h1 class="mb-4 text-2xl font-bold">Ekipmanlarım</h1>`);
      if (auth.value.user) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/equipments/create",
          class: "mx-2 rounded p-1 text-center font-bold text-black underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ekipman Ekle`);
            } else {
              return [
                createTextVNode("Ekipman Ekle")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><table class="mx-auto w-11/12 border border-gray-300 bg-white"><thead><tr><th class="border-b px-6 py-3 text-left">İsim</th><th class="border-b px-6 py-3 text-left">Özellikleri</th><th class="border-b px-6 py-3 text-left">Link</th>`);
      if (auth.value.user) {
        _push(`<th class="border-b px-6 py-3 text-left">Actions</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody><!--[-->`);
      ssrRenderList(equipments.value, (equipment) => {
        _push(`<tr class="hover:bg-gray-100"><td class="border-b px-6 py-4">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/equipments/${equipment.id}`,
          class: "text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(equipment.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(equipment.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td class="border-b px-6 py-4">${ssrInterpolate(equipment.specs)}</td><td class="border-b px-6 py-4"><a${ssrRenderAttr("href", equipment.link)} class="text-blue-600 hover:underline" target="_blank">Ziyaret Et</a></td>`);
        if (auth.value.user) {
          _push(`<td class="border-b px-6 py-4">`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/equipments/${equipment.id}/edit`,
            class: "text-blue-600 hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>Düzenle</span>`);
              } else {
                return [
                  createVNode("span", null, "Düzenle")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="ml-4 text-red-600 hover:underline">Sil</button></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Equipments/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
