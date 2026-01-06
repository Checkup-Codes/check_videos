import { defineComponent, computed, mergeProps, useSSRContext, ref, onMounted, onBeforeUnmount, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./InputError-BNVGxBhc.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: { type: Boolean },
    value: {},
    name: {}
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        name: __props.name,
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "h-4 w-4 rounded border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const eyeRadius = 6;
const eyeCenterY = 28;
const eyeLeftX = 35;
const eyeRightX = 65;
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
    const passwordFocused = ref(false);
    const leftEye = ref(null);
    const rightEye = ref(null);
    function moveEyes(e) {
      const svg = document.getElementById("cat-face");
      if (!svg || passwordFocused.value) return;
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      [leftEye.value, rightEye.value].forEach((eye, i) => {
        if (!eye) return;
        const cx = i === 0 ? eyeLeftX : eyeRightX;
        const dx = mouseX - cx;
        const dy = mouseY - eyeCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 6;
        const ratio = dist > maxDist ? maxDist / dist : 1;
        eye.setAttribute("cx", (cx + dx * ratio * 0.15).toString());
        eye.setAttribute("cy", (eyeCenterY + dy * ratio * 0.15).toString());
      });
    }
    onMounted(() => {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousemove", moveEyes);
      setTimeout(() => {
        isLoaded.value = true;
      }, 100);
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      window.removeEventListener("mousemove", moveEyes);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Giriş Yap" }, null, _parent));
      _push(`<div class="relative min-h-screen overflow-hidden bg-background px-4 pb-8 pt-8 sm:pt-8 lg:pt-5" data-v-d86cc215><div class="absolute inset-0 overflow-hidden" data-v-d86cc215><div class="animate-blob absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter" data-v-d86cc215></div><div class="animate-blob animation-delay-2000 absolute -right-20 top-20 h-72 w-72 rounded-full bg-secondary/10 mix-blend-multiply blur-3xl filter" data-v-d86cc215></div><div class="animate-blob animation-delay-4000 absolute -bottom-20 left-1/2 h-72 w-72 rounded-full bg-accent/10 mix-blend-multiply blur-3xl filter" data-v-d86cc215></div></div><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0", "relative z-10 mx-auto w-full max-w-md transform transition-all duration-700 ease-out"])}" data-v-d86cc215><div class="rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl" data-v-d86cc215><div class="mb-6 flex flex-col items-center" data-v-d86cc215><div class="${ssrRenderClass([isLoaded.value ? "scale-100" : "scale-75", "relative mb-4 transform transition-transform duration-500 hover:scale-105"])}" data-v-d86cc215><svg id="cat-face" width="100" height="80" viewBox="0 0 100 80" class="drop-shadow-lg" data-v-d86cc215><ellipse cx="50" cy="45" rx="35" ry="28" class="fill-muted stroke-foreground/20" stroke-width="2" data-v-d86cc215></ellipse><polygon points="18,35 30,8 40,35" class="fill-muted stroke-foreground/20" stroke-width="2" data-v-d86cc215></polygon><polygon points="22,32 30,14 36,32" class="fill-primary/20" data-v-d86cc215></polygon><polygon points="82,35 70,8 60,35" class="fill-muted stroke-foreground/20" stroke-width="2" data-v-d86cc215></polygon><polygon points="78,32 70,14 64,32" class="fill-primary/20" data-v-d86cc215></polygon><ellipse${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)} rx="10" ry="12" class="fill-background stroke-foreground/30" stroke-width="1" data-v-d86cc215></ellipse><ellipse${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)} rx="10" ry="12" class="fill-background stroke-foreground/30" stroke-width="1" data-v-d86cc215></ellipse>`);
      if (!passwordFocused.value) {
        _push(`<circle${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)} class="fill-foreground transition-all duration-100" data-v-d86cc215></circle>`);
      } else {
        _push(`<!---->`);
      }
      if (!passwordFocused.value) {
        _push(`<circle${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)} class="fill-foreground transition-all duration-100" data-v-d86cc215></circle>`);
      } else {
        _push(`<!---->`);
      }
      if (passwordFocused.value) {
        _push(`<g data-v-d86cc215><path${ssrRenderAttr("d", `M${eyeLeftX - 8} ${eyeCenterY} Q${eyeLeftX} ${eyeCenterY + 5} ${eyeLeftX + 8} ${eyeCenterY}`)} class="stroke-foreground" stroke-width="2" fill="none" data-v-d86cc215></path><path${ssrRenderAttr("d", `M${eyeRightX - 8} ${eyeCenterY} Q${eyeRightX} ${eyeCenterY + 5} ${eyeRightX + 8} ${eyeCenterY}`)} class="stroke-foreground" stroke-width="2" fill="none" data-v-d86cc215></path></g>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ellipse cx="50" cy="48" rx="5" ry="3" class="fill-primary" data-v-d86cc215></ellipse><path d="M44 54 Q50 60 56 54" class="stroke-foreground/60" stroke-width="1.5" fill="none" data-v-d86cc215></path><g class="stroke-foreground/30" stroke-width="1" data-v-d86cc215><line x1="20" y1="45" x2="35" y2="48" data-v-d86cc215></line><line x1="20" y1="50" x2="35" y2="50" data-v-d86cc215></line><line x1="20" y1="55" x2="35" y2="52" data-v-d86cc215></line><line x1="80" y1="45" x2="65" y2="48" data-v-d86cc215></line><line x1="80" y1="50" x2="65" y2="50" data-v-d86cc215></line><line x1="80" y1="55" x2="65" y2="52" data-v-d86cc215></line></g></svg></div><h1 class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "text-2xl font-bold text-foreground transition-all duration-500 delay-100"])}" data-v-d86cc215> Hoş Geldiniz </h1><p class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "mt-1 text-sm text-muted-foreground transition-all duration-500 delay-200"])}" data-v-d86cc215> Hesabınıza giriş yapın </p></div>`);
      if (__props.status) {
        _push(`<div class="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400" data-v-d86cc215>${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-5" data-v-d86cc215><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "space-y-2 transition-all duration-500 delay-300"])}" data-v-d86cc215><label for="email" class="text-sm font-medium text-foreground" data-v-d86cc215>Email</label><div class="relative" data-v-d86cc215><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-d86cc215><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d86cc215><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" data-v-d86cc215></path></svg></div><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" class="${ssrRenderClass([{ "border-destructive focus:ring-destructive/20": unref(form).errors.email }, "flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 pl-10 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"])}" placeholder="ornek@email.com" data-v-d86cc215></div>`);
      if (unref(form).errors.email) {
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form).errors.email
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "space-y-2 transition-all duration-500 delay-400"])}" data-v-d86cc215><label for="password" class="text-sm font-medium text-foreground" data-v-d86cc215>Şifre</label><div class="relative" data-v-d86cc215><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-d86cc215><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d86cc215><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-d86cc215></path></svg></div><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" class="${ssrRenderClass([{ "border-destructive focus:ring-destructive/20": unref(form).errors.password }, "flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 pl-10 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"])}" placeholder="••••••••" data-v-d86cc215></div>`);
      if (unref(form).errors.password) {
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form).errors.password
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "flex items-center justify-between transition-all duration-500 delay-500"])}" data-v-d86cc215><label class="flex cursor-pointer items-center gap-2" data-v-d86cc215>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "remember",
        checked: unref(form).remember,
        "onUpdate:checked": ($event) => unref(form).remember = $event
      }, null, _parent));
      _push(`<span class="text-sm text-muted-foreground" data-v-d86cc215>Beni hatırla</span></label>`);
      if (__props.canResetPassword) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("password.request"),
          class: "text-sm font-medium text-primary transition-colors hover:text-primary/80"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Şifremi unuttum `);
            } else {
              return [
                createTextVNode(" Şifremi unuttum ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="${ssrRenderClass([[
        isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        "transition-all duration-500 delay-600"
      ], "relative h-11 w-full overflow-hidden rounded-lg bg-primary font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-d86cc215><span class="relative z-10 flex items-center justify-center gap-2" data-v-d86cc215>`);
      if (unref(form).processing) {
        _push(`<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" data-v-d86cc215><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-d86cc215></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-d86cc215></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Giriş yapılıyor..." : "Giriş Yap")}</span></button></form><div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "my-6 flex items-center gap-3 transition-all duration-500 delay-700"])}" data-v-d86cc215><div class="h-px flex-1 bg-border" data-v-d86cc215></div><span class="text-xs text-muted-foreground" data-v-d86cc215>veya</span><div class="h-px flex-1 bg-border" data-v-d86cc215></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/join-us",
        class: ["flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background/50 font-medium text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", [
          isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          "transition-all duration-500 delay-800"
        ]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d86cc215${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-d86cc215${_scopeId}></path></svg> Kayıt Ol `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                })
              ])),
              createTextVNode(" Kayıt Ol ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass([isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "mt-6 text-center transition-all duration-500 delay-900"])}" data-v-d86cc215>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-sm text-muted-foreground transition-colors hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Ana Sayfaya Dön `);
          } else {
            return [
              createTextVNode(" ← Ana Sayfaya Dön ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d86cc215"]]);
export {
  Login as default
};
