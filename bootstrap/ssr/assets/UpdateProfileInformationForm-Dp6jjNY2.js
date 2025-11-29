import { defineComponent, ref, onMounted, onUnmounted, watch, mergeProps, unref, withCtx, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {},
    status: {}
  },
  setup(__props) {
    const user = usePage().props.auth.user;
    const form = useForm({
      name: user.name,
      email: user.email
    });
    const nameRef = ref(null);
    const emailRef = ref(null);
    const errors = ref({
      name: "",
      email: ""
    });
    const validateForm = () => {
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      let hasErrors = false;
      if (!form.name || form.name.trim() === "") {
        errors.value.name = "İsim zorunludur.";
        hasErrors = true;
      }
      if (!form.email || form.email.trim() === "") {
        errors.value.email = "E-posta zorunludur.";
        hasErrors = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.value.email = "Geçerli bir e-posta adresi girin.";
        hasErrors = true;
      }
      if (hasErrors) {
        scrollToError();
      }
      return hasErrors;
    };
    const scrollToError = () => {
      nextTick(() => {
        const errorFields = [
          { ref: nameRef, error: errors.value.name },
          { ref: emailRef, error: errors.value.email }
        ];
        for (const field of errorFields) {
          if (field.error && field.ref.value) {
            field.ref.value.scrollIntoView({ behavior: "smooth", block: "center" });
            nextTick(() => {
              var _a;
              const inputElement = (_a = field.ref.value) == null ? void 0 : _a.querySelector("input");
              if (inputElement) {
                inputElement.focus();
              }
            });
            break;
          }
        }
      });
    };
    const submitForm = () => {
      const hasErrors = validateForm();
      if (!hasErrors) {
        form.patch(route("profile.update"), {
          onError: (serverErrors) => {
            Object.assign(errors.value, serverErrors);
            scrollToError();
          }
        });
      }
    };
    let sidebarSubmitHandler = null;
    onMounted(() => {
      sidebarSubmitHandler = () => {
        submitForm();
      };
      window.addEventListener("sidebarFormSubmit", sidebarSubmitHandler);
    });
    onUnmounted(() => {
      if (sidebarSubmitHandler) {
        window.removeEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      }
    });
    watch(
      () => form.processing,
      (processing) => {
        window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing } }));
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="border-t border-border pt-6"><h2 class="mb-4 text-sm font-semibold text-foreground">Profil Bilgileri</h2><form class="space-y-4"><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label for="name" class="mb-1 block text-sm font-medium text-foreground">İsim</label><input id="name" type="text"${ssrRenderAttr("value", unref(form).name)} autocomplete="name" placeholder="Adınız" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.name || unref(form).errors.name) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.name || unref(form).errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="email" class="mb-1 block text-sm font-medium text-foreground">E-posta</label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} autocomplete="username" placeholder="ornek@email.com" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.email || unref(form).errors.email }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.email || unref(form).errors.email) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.email || unref(form).errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div class="rounded-md border border-border bg-muted/50 p-3"><p class="text-sm text-foreground"> E-posta adresiniz doğrulanmamış. `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "text-sm font-medium text-primary underline-offset-4 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Doğrulama e-postasını tekrar gönder. `);
            } else {
              return [
                createTextVNode(" Doğrulama e-postasını tekrar gönder. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div class="mt-2 text-sm font-medium text-green-600 dark:text-green-400" style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}"> Yeni bir doğrulama bağlantısı e-posta adresinize gönderildi. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-end gap-2 pt-2">`);
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-muted-foreground">Kaydedildi.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">`);
      if (unref(form).processing) {
        _push(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
