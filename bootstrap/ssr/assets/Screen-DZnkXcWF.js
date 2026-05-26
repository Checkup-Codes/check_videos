import { computed, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const customers = computed(() => page.props.customers || []);
    const getInitials = (firstName, lastName) => {
      const first = firstName ? firstName.charAt(0).toUpperCase() : "";
      const last = lastName ? lastName.charAt(0).toUpperCase() : "";
      return first + last || "?";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl px-1 py-4 sm:px-2"${_scopeId}><div class="mb-4"${_scopeId}><h1 class="text-lg font-semibold text-foreground"${_scopeId}>Müşteriler</h1><p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(customers.value.length)} kayıt</p></div>`);
            if (customers.value.length === 0) {
              _push2(`<div class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"${_scopeId}> Henüz müşteri yok. </div>`);
            } else {
              _push2(`<div class="divide-y divide-border rounded-md border border-border"${_scopeId}><!--[-->`);
              ssrRenderList(customers.value, (customer) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: customer.id,
                  href: `/customers/${customer.id}`,
                  class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground"${_scopeId2}>${ssrInterpolate(getInitials(customer.first_name, customer.last_name))}</div><div class="min-w-0 flex-1"${_scopeId2}><p class="truncate text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</p>`);
                      if (customer.email) {
                        _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(customer.email)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground" }, toDisplayString(getInitials(customer.first_name, customer.last_name)), 1),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1),
                          customer.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "truncate text-xs text-muted-foreground"
                          }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl px-1 py-4 sm:px-2" }, [
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h1", { class: "text-lg font-semibold text-foreground" }, "Müşteriler"),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(customers.value.length) + " kayıt", 1)
                ]),
                customers.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
                }, " Henüz müşteri yok. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "divide-y divide-border rounded-md border border-border"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                    return openBlock(), createBlock(unref(Link), {
                      key: customer.id,
                      href: `/customers/${customer.id}`,
                      class: "flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground" }, toDisplayString(getInitials(customer.first_name, customer.last_name)), 1),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "truncate text-sm font-medium text-foreground" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1),
                          customer.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "truncate text-xs text-muted-foreground"
                          }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
