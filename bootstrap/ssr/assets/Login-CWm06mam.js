import { defineComponent, computed, mergeProps, useSSRContext, ref, onMounted, onBeforeUnmount, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-CH5-T2E2.js";
import { _ as _sfc_main$3 } from "./InputError-VJquj49g.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: { type: Boolean },
    value: {}
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
        value: _ctx.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, _ctx.value) : proxyChecked.value,
        class: "rounded shadow-sm"
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
      window.addEventListener("mousemove", moveEyes);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousemove", moveEyes);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-6 flex select-none flex-col items-center"${_scopeId}><svg id="tom-face" width="100" height="70" viewBox="0 0 100 70" class="mb-2"${_scopeId}><ellipse cx="48" cy="40" rx="38" ry="28" fill="#bfc9d1" stroke="#333" stroke-width="2"${_scopeId}></ellipse><polygon points="10,30 28,10 36,32" fill="#bfc9d1" stroke="#333" stroke-width="2"${_scopeId}></polygon><polygon points="86,30 68,10 60,32" fill="#bfc9d1" stroke="#333" stroke-width="2"${_scopeId}></polygon><ellipse${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)} rx="12" ry="14" fill="#fff" stroke="#333" stroke-width="1.5"${_scopeId}></ellipse><ellipse${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)} rx="12" ry="14" fill="#fff" stroke="#333" stroke-width="1.5"${_scopeId}></ellipse>`);
            if (!passwordFocused.value) {
              _push2(`<circle${ssrRenderAttr("cx", eyeLeftX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)} fill="#222"${_scopeId}></circle>`);
            } else {
              _push2(`<!---->`);
            }
            if (!passwordFocused.value) {
              _push2(`<circle${ssrRenderAttr("cx", eyeRightX)}${ssrRenderAttr("cy", eyeCenterY)}${ssrRenderAttr("r", eyeRadius)} fill="#222"${_scopeId}></circle>`);
            } else {
              _push2(`<!---->`);
            }
            if (passwordFocused.value) {
              _push2(`<rect${ssrRenderAttr("x", eyeLeftX - 12)}${ssrRenderAttr("y", eyeCenterY - 14)} width="24" height="28" rx="12" fill="#bfc9d1" stroke="#333" stroke-width="1.5"${_scopeId}></rect>`);
            } else {
              _push2(`<!---->`);
            }
            if (passwordFocused.value) {
              _push2(`<rect${ssrRenderAttr("x", eyeRightX - 12)}${ssrRenderAttr("y", eyeCenterY - 14)} width="24" height="28" rx="12" fill="#bfc9d1" stroke="#333" stroke-width="1.5"${_scopeId}></rect>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<ellipse cx="48" cy="48" rx="6" ry="4" fill="#e57373" stroke="#333" stroke-width="1.5"${_scopeId}></ellipse><path d="M40 56 Q48 62 56 56" stroke="#333" stroke-width="2" fill="none"${_scopeId}></path></svg></div>`);
            if (_ctx.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"${_scopeId}>${ssrInterpolate(_ctx.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6"${_scopeId}><div${_scopeId}><label for="email" class="label"${_scopeId}><span class="label-text text-base-content"${_scopeId}>Email</span></label><input id="email" type="email" class="input-bordered input w-full bg-base-100 text-base-content"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="password" class="label"${_scopeId}><span class="label-text text-base-content"${_scopeId}>Password</span></label><input id="password" type="password" class="input-bordered input w-full bg-base-100 text-base-content"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><label class="flex cursor-pointer items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-base-content"${_scopeId}>Remember me</span></label>`);
            if (_ctx.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "hover:text-primary-focus text-sm text-primary underline focus:outline-none"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end"${_scopeId}><button type="submit" class="${ssrRenderClass([{ "opacity-50": unref(form).processing }, "btn btn-primary w-full"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Log in </button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              createVNode("div", { class: "mb-6 flex select-none flex-col items-center" }, [
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
                    fill: "#bfc9d1",
                    stroke: "#333",
                    "stroke-width": "2"
                  }),
                  createVNode("polygon", {
                    points: "10,30 28,10 36,32",
                    fill: "#bfc9d1",
                    stroke: "#333",
                    "stroke-width": "2"
                  }),
                  createVNode("polygon", {
                    points: "86,30 68,10 60,32",
                    fill: "#bfc9d1",
                    stroke: "#333",
                    "stroke-width": "2"
                  }),
                  createVNode("ellipse", {
                    cx: eyeLeftX,
                    cy: eyeCenterY,
                    rx: "12",
                    ry: "14",
                    fill: "#fff",
                    stroke: "#333",
                    "stroke-width": "1.5"
                  }),
                  createVNode("ellipse", {
                    cx: eyeRightX,
                    cy: eyeCenterY,
                    rx: "12",
                    ry: "14",
                    fill: "#fff",
                    stroke: "#333",
                    "stroke-width": "1.5"
                  }),
                  !passwordFocused.value ? (openBlock(), createBlock("circle", {
                    key: 0,
                    ref_key: "leftEye",
                    ref: leftEye,
                    cx: eyeLeftX,
                    cy: eyeCenterY,
                    r: eyeRadius,
                    fill: "#222"
                  }, null, 512)) : createCommentVNode("", true),
                  !passwordFocused.value ? (openBlock(), createBlock("circle", {
                    key: 1,
                    ref_key: "rightEye",
                    ref: rightEye,
                    cx: eyeRightX,
                    cy: eyeCenterY,
                    r: eyeRadius,
                    fill: "#222"
                  }, null, 512)) : createCommentVNode("", true),
                  passwordFocused.value ? (openBlock(), createBlock("rect", {
                    key: 2,
                    x: eyeLeftX - 12,
                    y: eyeCenterY - 14,
                    width: "24",
                    height: "28",
                    rx: "12",
                    fill: "#bfc9d1",
                    stroke: "#333",
                    "stroke-width": "1.5"
                  }, null, 8, ["x", "y"])) : createCommentVNode("", true),
                  passwordFocused.value ? (openBlock(), createBlock("rect", {
                    key: 3,
                    x: eyeRightX - 12,
                    y: eyeCenterY - 14,
                    width: "24",
                    height: "28",
                    rx: "12",
                    fill: "#bfc9d1",
                    stroke: "#333",
                    "stroke-width": "1.5"
                  }, null, 8, ["x", "y"])) : createCommentVNode("", true),
                  createVNode("ellipse", {
                    cx: "48",
                    cy: "48",
                    rx: "6",
                    ry: "4",
                    fill: "#e57373",
                    stroke: "#333",
                    "stroke-width": "1.5"
                  }),
                  createVNode("path", {
                    d: "M40 56 Q48 62 56 56",
                    stroke: "#333",
                    "stroke-width": "2",
                    fill: "none"
                  })
                ]))
              ]),
              _ctx.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600 dark:text-green-400"
              }, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "email",
                    class: "label"
                  }, [
                    createVNode("span", { class: "label-text text-base-content" }, "Email")
                  ]),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    class: "input-bordered input w-full bg-base-100 text-base-content",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "password",
                    class: "label"
                  }, [
                    createVNode("span", { class: "label-text text-base-content" }, "Password")
                  ]),
                  withDirectives(createVNode("input", {
                    id: "password",
                    type: "password",
                    class: "input-bordered input w-full bg-base-100 text-base-content",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    onFocus: ($event) => passwordFocused.value = true,
                    onBlur: ($event) => passwordFocused.value = false
                  }, null, 40, ["onUpdate:modelValue", "onFocus", "onBlur"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("label", { class: "flex cursor-pointer items-center" }, [
                    createVNode(_sfc_main$1, {
                      name: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ml-2 text-sm text-base-content" }, "Remember me")
                  ]),
                  _ctx.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "hover:text-primary-focus text-sm text-primary underline focus:outline-none"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode("button", {
                    type: "submit",
                    class: ["btn btn-primary w-full", { "opacity-50": unref(form).processing }],
                    disabled: unref(form).processing
                  }, " Log in ", 10, ["disabled"])
                ])
              ], 32)
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
