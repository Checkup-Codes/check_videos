import { defineComponent, ref, onMounted, onUnmounted, watch, mergeProps, unref, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const currentPasswordRef = ref(null);
    const passwordRef = ref(null);
    const passwordConfirmationRef = ref(null);
    const errors = ref({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const validateForm = () => {
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      let hasErrors = false;
      if (!form.current_password || form.current_password.trim() === "") {
        errors.value.current_password = "Mevcut şifre zorunludur.";
        hasErrors = true;
      }
      if (!form.password || form.password.trim() === "") {
        errors.value.password = "Yeni şifre zorunludur.";
        hasErrors = true;
      } else if (form.password.length < 8) {
        errors.value.password = "Şifre en az 8 karakter olmalıdır.";
        hasErrors = true;
      }
      if (!form.password_confirmation || form.password_confirmation.trim() === "") {
        errors.value.password_confirmation = "Şifre onayı zorunludur.";
        hasErrors = true;
      } else if (form.password !== form.password_confirmation) {
        errors.value.password_confirmation = "Şifreler eşleşmiyor.";
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
          { ref: currentPasswordRef, error: errors.value.current_password },
          { ref: passwordRef, error: errors.value.password },
          { ref: passwordConfirmationRef, error: errors.value.password_confirmation }
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
    const updatePassword = () => {
      const hasErrors = validateForm();
      if (!hasErrors) {
        form.put(route("password.update"), {
          preserveScroll: true,
          onSuccess: () => {
            form.reset();
          },
          onError: (serverErrors) => {
            var _a, _b;
            Object.assign(errors.value, serverErrors);
            scrollToError();
            if (form.errors.password) {
              form.reset("password", "password_confirmation");
              (_a = passwordInput.value) == null ? void 0 : _a.focus();
            }
            if (form.errors.current_password) {
              form.reset("current_password");
              (_b = currentPasswordInput.value) == null ? void 0 : _b.focus();
            }
          }
        });
      }
    };
    let sidebarSubmitHandler = null;
    onMounted(() => {
      sidebarSubmitHandler = () => {
        updatePassword();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="border-t border-border pt-6"><h2 class="mb-4 text-sm font-semibold text-foreground">Şifre Güncelle</h2><form class="space-y-4"><div class="grid grid-cols-1 gap-4"><div><label for="current_password" class="mb-1 block text-sm font-medium text-foreground">Mevcut Şifre</label><input id="current_password"${ssrRenderAttr("value", unref(form).current_password)} type="password" autocomplete="current-password" placeholder="Mevcut şifrenizi girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.current_password || unref(form).errors.current_password }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.current_password || unref(form).errors.current_password) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.current_password || unref(form).errors.current_password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password" class="mb-1 block text-sm font-medium text-foreground">Yeni Şifre</label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" autocomplete="new-password" placeholder="Yeni şifrenizi girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.password || unref(form).errors.password }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.password || unref(form).errors.password) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.password || unref(form).errors.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password_confirmation" class="mb-1 block text-sm font-medium text-foreground">Şifre Onayı</label><input id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" autocomplete="new-password" placeholder="Yeni şifrenizi tekrar girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.password_confirmation || unref(form).errors.password_confirmation }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.password_confirmation || unref(form).errors.password_confirmation) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.password_confirmation || unref(form).errors.password_confirmation)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center justify-end gap-2 pt-2">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
