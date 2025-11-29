import { defineComponent, computed, mergeProps, useSSRContext, ref, onMounted, onBeforeUnmount, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-fSyVqwcY.js";
import { _ as _sfc_main$3 } from "./InputError-BNVGxBhc.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
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
const eyeRadius = 7;
const eyeCenterY = 32;
const eyeLeftX = 32;
const eyeRightX = 64;
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
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => {
          form.reset("password");
        }
      });
    };
    const leftEye = ref(null);
    const rightEye = ref(null);
    const passwordFocused = ref(false);
    function moveEyes(e) {
      const svg = document.getElementById("tom-face");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      [leftEye.value, rightEye.value].forEach((eye, i) => {
        if (!eye) return;
        const cx = i === 0 ? eyeLeftX : eyeRightX;
        const dx = mouseX - cx;
        const dy = mouseY - eyeCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 8;
        const ratio = dist > maxDist ? maxDist / dist : 1;
        eye.setAttribute("cx", (cx + dx * ratio * 0.2).toString());
        eye.setAttribute("cy", (eyeCenterY + dy * ratio * 0.2).toString());
      });
    }
    onMounted(() => {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousemove", moveEyes);
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      window.removeEventListener("mousemove", moveEyes);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Giriş Yap" }, null, _parent2, _scopeId));
            _push2(`<div class="w-full max-w-md space-y-6"${_scopeId}><div class="mb-8 flex select-none flex-col items-center"${_scopeId}><svg id="tom-face" width="100" height="70" viewBox="0 0 100 70" class="mb-2"${_scopeId}><ellipse cx="48" cy="40" rx="38" ry="28"${ssrRenderAttr("fill", "hsl(var(--muted))")}${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="2"${_scopeId}></ellipse><polygon points="10,30 28,10 36,32"${ssrRenderAttr("fill", "hsl(var(--muted))")}${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="2"${_scopeId}></polygon><polygon points="86,30 68,10 60,32"${ssrRenderAttr("fill", "hsl(var(--muted))")}${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="2"${_scopeId}></polygon><ellipse${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)} rx="12" ry="14" fill="hsl(var(--background))"${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="1.5"${_scopeId}></ellipse><ellipse${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)} rx="12" ry="14" fill="hsl(var(--background))"${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="1.5"${_scopeId}></ellipse>`);
            if (!passwordFocused.value) {
              _push2(`<circle${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)}${ssrRenderAttr("fill", "hsl(var(--foreground))")}${_scopeId}></circle>`);
            } else {
              _push2(`<!---->`);
            }
            if (!passwordFocused.value) {
              _push2(`<circle${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)}${ssrRenderAttr("fill", "hsl(var(--foreground))")}${_scopeId}></circle>`);
            } else {
              _push2(`<!---->`);
            }
            if (passwordFocused.value) {
              _push2(`<rect${ssrRenderAttr("x", eyeLeftX - 12)}${ssrRenderAttr("y", eyeCenterY - 14)} width="24" height="28" rx="12"${ssrRenderAttr("fill", "hsl(var(--muted))")}${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="1.5"${_scopeId}></rect>`);
            } else {
              _push2(`<!---->`);
            }
            if (passwordFocused.value) {
              _push2(`<rect${ssrRenderAttr("x", eyeRightX - 12)}${ssrRenderAttr("y", eyeCenterY - 14)} width="24" height="28" rx="12"${ssrRenderAttr("fill", "hsl(var(--muted))")}${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="1.5"${_scopeId}></rect>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<ellipse cx="48" cy="48" rx="6" ry="4" fill="hsl(var(--primary))"${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="1.5"${_scopeId}></ellipse><path d="M40 56 Q48 62 56 56"${ssrRenderAttr("stroke", "hsl(var(--foreground))")} stroke-width="2" fill="none"${_scopeId}></path></svg><h1 class="text-2xl font-semibold text-foreground"${_scopeId}>Giriş Yap</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Hesabınıza giriş yapın</p></div>`);
            if (__props.status) {
              _push2(`<div class="rounded-md border border-primary/50 bg-primary/10 px-4 py-3 text-sm text-primary"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="email" class="text-sm font-medium text-foreground"${_scopeId}> Email </label><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" class="${ssrRenderClass([{
              "border-destructive focus-visible:ring-destructive": unref(form).errors.email
            }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="ornek@email.com"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "mt-1",
                message: unref(form).errors.email
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label for="password" class="text-sm font-medium text-foreground"${_scopeId}> Şifre </label><input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" class="${ssrRenderClass([{
              "border-destructive focus-visible:ring-destructive": unref(form).errors.password
            }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="••••••••"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "mt-1",
                message: unref(form).errors.password
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><label class="flex cursor-pointer items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm text-foreground"${_scopeId}>Beni hatırla</span></label>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Şifremi unuttum `);
                  } else {
                    return [
                      createTextVNode(" Şifremi unuttum ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit" class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Giriş yapılıyor..." : "Giriş Yap")}</button></form></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Giriş Yap" }),
              createVNode("div", { class: "w-full max-w-md space-y-6" }, [
                createVNode("div", { class: "mb-8 flex select-none flex-col items-center" }, [
                  (openBlock(), createBlock("svg", {
                    id: "tom-face",
                    width: "100",
                    height: "70",
                    viewBox: "0 0 100 70",
                    class: "mb-2"
                  }, [
                    createVNode("ellipse", {
                      cx: "48",
                      cy: "40",
                      rx: "38",
                      ry: "28",
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "2"
                    }),
                    createVNode("polygon", {
                      points: "10,30 28,10 36,32",
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "2"
                    }),
                    createVNode("polygon", {
                      points: "86,30 68,10 60,32",
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "2"
                    }),
                    createVNode("ellipse", {
                      cx: eyeLeftX,
                      cy: eyeCenterY,
                      rx: "12",
                      ry: "14",
                      fill: "hsl(var(--background))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "1.5"
                    }),
                    createVNode("ellipse", {
                      cx: eyeRightX,
                      cy: eyeCenterY,
                      rx: "12",
                      ry: "14",
                      fill: "hsl(var(--background))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "1.5"
                    }),
                    !passwordFocused.value ? (openBlock(), createBlock("circle", {
                      key: 0,
                      ref_key: "leftEye",
                      ref: leftEye,
                      cx: eyeLeftX,
                      cy: eyeCenterY,
                      r: eyeRadius,
                      fill: "hsl(var(--foreground))"
                    }, null, 512)) : createCommentVNode("", true),
                    !passwordFocused.value ? (openBlock(), createBlock("circle", {
                      key: 1,
                      ref_key: "rightEye",
                      ref: rightEye,
                      cx: eyeRightX,
                      cy: eyeCenterY,
                      r: eyeRadius,
                      fill: "hsl(var(--foreground))"
                    }, null, 512)) : createCommentVNode("", true),
                    passwordFocused.value ? (openBlock(), createBlock("rect", {
                      key: 2,
                      x: eyeLeftX - 12,
                      y: eyeCenterY - 14,
                      width: "24",
                      height: "28",
                      rx: "12",
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "1.5"
                    }, null, 8, ["x", "y"])) : createCommentVNode("", true),
                    passwordFocused.value ? (openBlock(), createBlock("rect", {
                      key: 3,
                      x: eyeRightX - 12,
                      y: eyeCenterY - 14,
                      width: "24",
                      height: "28",
                      rx: "12",
                      fill: "hsl(var(--muted))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "1.5"
                    }, null, 8, ["x", "y"])) : createCommentVNode("", true),
                    createVNode("ellipse", {
                      cx: "48",
                      cy: "48",
                      rx: "6",
                      ry: "4",
                      fill: "hsl(var(--primary))",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "1.5"
                    }),
                    createVNode("path", {
                      d: "M40 56 Q48 62 56 56",
                      stroke: "hsl(var(--foreground))",
                      "stroke-width": "2",
                      fill: "none"
                    })
                  ])),
                  createVNode("h1", { class: "text-2xl font-semibold text-foreground" }, "Giriş Yap"),
                  createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Hesabınıza giriş yapın")
                ]),
                __props.status ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-primary/50 bg-primary/10 px-4 py-3 text-sm text-primary"
                }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("label", {
                      for: "email",
                      class: "text-sm font-medium text-foreground"
                    }, " Email "),
                    withDirectives(createVNode("input", {
                      id: "email",
                      type: "email",
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username",
                      class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
                        "border-destructive focus-visible:ring-destructive": unref(form).errors.email
                      }],
                      placeholder: "ornek@email.com"
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).email]
                    ]),
                    unref(form).errors.email ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 0,
                      class: "mt-1",
                      message: unref(form).errors.email
                    }, null, 8, ["message"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("label", {
                      for: "password",
                      class: "text-sm font-medium text-foreground"
                    }, " Şifre "),
                    withDirectives(createVNode("input", {
                      id: "password",
                      type: "password",
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "current-password",
                      onFocus: ($event) => passwordFocused.value = true,
                      onBlur: ($event) => passwordFocused.value = false,
                      class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
                        "border-destructive focus-visible:ring-destructive": unref(form).errors.password
                      }],
                      placeholder: "••••••••"
                    }, null, 42, ["onUpdate:modelValue", "onFocus", "onBlur"]), [
                      [vModelText, unref(form).password]
                    ]),
                    unref(form).errors.password ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 0,
                      class: "mt-1",
                      message: unref(form).errors.password
                    }, null, 8, ["message"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("label", { class: "flex cursor-pointer items-center gap-2" }, [
                      createVNode(_sfc_main$1, {
                        name: "remember",
                        checked: unref(form).remember,
                        "onUpdate:checked": ($event) => unref(form).remember = $event
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("span", { class: "text-sm text-foreground" }, "Beni hatırla")
                    ]),
                    __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Şifremi unuttum ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ]),
                  createVNode("button", {
                    type: "submit",
                    class: "inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    disabled: unref(form).processing
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("svg", {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("circle", {
                        class: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        "stroke-width": "4"
                      }),
                      createVNode("path", {
                        class: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      })
                    ])) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(unref(form).processing ? "Giriş yapılıyor..." : "Giriş Yap"), 1)
                  ], 8, ["disabled"])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
