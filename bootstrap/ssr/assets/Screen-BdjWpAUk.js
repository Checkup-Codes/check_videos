import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const projects = props.projects;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))} data-v-ae254949><h1 class="mb-8 text-3xl font-semibold text-gray-700" data-v-ae254949>Projeler</h1><div class="max-w-full overflow-hidden rounded-lg shadow" data-v-ae254949><table class="w-full divide-gray-200 bg-white" data-v-ae254949><thead class="bg-gray-100" data-v-ae254949><tr data-v-ae254949><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" data-v-ae254949>Proje Adı</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" data-v-ae254949>Müşteri Adı</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" data-v-ae254949>E-posta</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" data-v-ae254949>Servisler</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white" data-v-ae254949><!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(`<tr class="transition-colors hover:bg-gray-50" data-v-ae254949><td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900" data-v-ae254949>${ssrInterpolate(project.project_name)}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700" data-v-ae254949>${ssrInterpolate(project.customer ? `${project.customer.first_name} ${project.customer.last_name}` : "N/A")}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700" data-v-ae254949>${ssrInterpolate(project.customer ? project.customer.email : "N/A")}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700" data-v-ae254949>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/projects/${project.id}`,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae254949"]]);
export {
  Screen as default
};
