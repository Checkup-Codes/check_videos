import { defineComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CyMJCkQw.js";
import _sfc_main$4 from "./DeleteUserForm-Be_bBQG7.js";
import _sfc_main$3 from "./UpdatePasswordForm-BQubgQVL.js";
import _sfc_main$2 from "./UpdateProfileInformationForm-BdwUb7fq.js";
import { Head } from "@inertiajs/vue3";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./InputError-VJquj49g.js";
import "./TextInput-CuLS25i0.js";
import "./SecondaryButton-BnTdryPo.js";
import "./PrimaryButton-Cif9S6uF.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: { type: Boolean },
    status: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile - " }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}>Profile</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, "Profile")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              "must-verify-email": _ctx.mustVerifyEmail,
              status: _ctx.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$2, {
                      "must-verify-email": _ctx.mustVerifyEmail,
                      status: _ctx.status,
                      class: "max-w-xl"
                    }, null, 8, ["must-verify-email", "status"])
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$3, { class: "max-w-xl" })
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$4, { class: "max-w-xl" })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
