import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$3 from "./DeleteUserForm-BO_TUPd8.js";
import _sfc_main$2 from "./UpdatePasswordForm-DUHglCIa.js";
import _sfc_main$1 from "./UpdateProfileInformationForm-Dp6jjNY2.js";
import { Head } from "@inertiajs/vue3";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: { type: Boolean },
    status: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Profil" }, null, _parent));
      _push(`<div class="mx-auto max-w-3xl space-y-6 py-6"><div class="mb-4"><h1 class="text-2xl font-semibold text-foreground">Profil</h1><p class="mt-1 text-sm text-muted-foreground">Hesap bilgilerinizi ve şifrenizi yönetin.</p></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "must-verify-email": __props.mustVerifyEmail,
        status: __props.status
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div></div>`);
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
