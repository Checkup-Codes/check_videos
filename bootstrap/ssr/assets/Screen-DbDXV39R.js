import { computed, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./ServiceItem-C5tCsXCT.js";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
import "./stripHtml-wl3J5kls.js";
import "./ZoomableImage-iVeXa9el.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const services = computed(() => page.props.services || []);
    const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl px-1 py-4 sm:px-2"${_scopeId}><div class="mb-4"${_scopeId}><h1 class="text-lg font-semibold text-foreground"${_scopeId}>Hizmetlerimiz</h1><p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(services.value.length)} kayıt</p></div>`);
            if (!parents.value.length) {
              _push2(`<div class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"${_scopeId}> Henüz hizmet yok. </div>`);
            } else {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(parents.value, (parent) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: parent.id,
                  service: parent,
                  "all-services": services.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl px-1 py-4 sm:px-2" }, [
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h1", { class: "text-lg font-semibold text-foreground" }, "Hizmetlerimiz"),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(services.value.length) + " kayıt", 1)
                ]),
                !parents.value.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
                }, " Henüz hizmet yok. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(parents.value, (parent) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      key: parent.id,
                      service: parent,
                      "all-services": services.value
                    }, null, 8, ["service", "all-services"]);
                  }), 128))
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
