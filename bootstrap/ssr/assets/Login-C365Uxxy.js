import { defineComponent, ref, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-BNVGxBhc.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: { type: Boolean },
    status: {}
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const isLoaded = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isLoaded.value = true;
      }, 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Giriş Yap" }, null, _parent));
      _push(`<div class="fixed inset-0 flex items-center justify-center overflow-auto bg-gradient-to-br from-background via-background to-muted/20 px-4" data-v-1dd873d0><div class="absolute inset-0 overflow-hidden" data-v-1dd873d0><div class="animate-blob absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/10" data-v-1dd873d0></div><div class="animate-blob animation-delay-2000 absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/15 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/8" data-v-1dd873d0></div><div class="animate-blob animation-delay-4000 absolute -bottom-20 left-1/2 h-96 w-96 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/5" data-v-1dd873d0></div><div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" data-v-1dd873d0></div></div><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95", "relative z-10 my-auto w-full max-w-sm transform transition-all duration-700 ease-out"])}" data-v-1dd873d0><div class="rounded-3xl border border-border/50 bg-card/95 p-10 shadow-2xl backdrop-blur-xl dark:bg-card/90" data-v-1dd873d0><div class="mb-8 text-center" data-v-1dd873d0><div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg" data-v-1dd873d0><svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1dd873d0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-1dd873d0></path></svg></div><h1 class="mb-2 text-2xl font-bold text-foreground" data-v-1dd873d0>Giriş Yap</h1><p class="text-sm text-muted-foreground" data-v-1dd873d0>Hesabınıza erişin</p></div>`);
      if (__props.status) {
        _push(`<div class="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400" data-v-1dd873d0>${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-5" data-v-1dd873d0><div class="space-y-2" data-v-1dd873d0><label for="email" class="text-sm font-medium text-foreground" data-v-1dd873d0>Email</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" class="${ssrRenderClass([{ "border-destructive focus:ring-destructive/20": unref(form).errors.email }, "flex h-12 w-full rounded-xl border border-input bg-background/60 px-4 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-background/40"])}" placeholder="ornek@email.com" data-v-1dd873d0>`);
      if (unref(form).errors.email) {
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form).errors.email
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2" data-v-1dd873d0><label for="password" class="text-sm font-medium text-foreground" data-v-1dd873d0>Şifre</label><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" class="${ssrRenderClass([{ "border-destructive focus:ring-destructive/20": unref(form).errors.password }, "flex h-12 w-full rounded-xl border border-input bg-background/60 px-4 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-background/40"])}" placeholder="••••••••" data-v-1dd873d0>`);
      if (unref(form).errors.password) {
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form).errors.password
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="group relative mt-6 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/90 font-semibold text-sm text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-1dd873d0><span class="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" data-v-1dd873d0></span><span class="relative z-10 flex items-center gap-2" data-v-1dd873d0>`);
      if (unref(form).processing) {
        _push(`<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" data-v-1dd873d0><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-1dd873d0></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-1dd873d0></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Giriş yapılıyor..." : "Giriş Yap")}</span></button></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1dd873d0"]]);
export {
  Login as default
};
