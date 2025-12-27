import { ref, onMounted, mergeProps, useSSRContext, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, createTextVNode, withDirectives, vModelText, createCommentVNode, vModelSelect, withModifiers } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./AuthenticatedLayout-BxMNcEld.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./TextInput-BZ7J6R6m.js";
import { _ as _sfc_main$6 } from "./InputError-BNVGxBhc.js";
import { _ as _sfc_main$3 } from "./Card-V_bTdXom.js";
import { b as _sfc_main$7 } from "../ssr.js";
import "vuex";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main$1 = {
  __name: "TextArea",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
        class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    seo: { type: Object, required: true },
    logo: { type: Object, default: null },
    screen: { type: Object, default: null }
  },
  setup(__props) {
    const props = __props;
    const uploading = ref({
      favicon: false,
      appleTouchIcon: false,
      ogImage: false
    });
    const form = useForm({
      site_name: props.seo.site_name || "",
      tagline: props.seo.tagline || "",
      title: props.seo.title || "",
      description: props.seo.description || "",
      keywords: props.seo.keywords || "",
      author: props.seo.author || "",
      language: props.seo.language || "tr",
      locale: props.seo.locale || "tr_TR",
      og_title: props.seo.og_title || "",
      og_description: props.seo.og_description || "",
      og_image: props.seo.og_image || "",
      twitter_card: props.seo.twitter_card || "summary_large_image",
      twitter_site: props.seo.twitter_site || "",
      twitter_creator: props.seo.twitter_creator || "",
      favicon: props.seo.favicon || "",
      apple_touch_icon: props.seo.apple_touch_icon || "",
      theme_color: props.seo.theme_color || "#000000",
      canonical_url: props.seo.canonical_url || "",
      robots: props.seo.robots || "index, follow",
      schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : "",
      google_verification: props.seo.google_verification || "",
      bing_verification: props.seo.bing_verification || "",
      yandex_verification: props.seo.yandex_verification || "",
      google_analytics_id: props.seo.google_analytics_id || "",
      google_tag_manager_id: props.seo.google_tag_manager_id || ""
    });
    const submit = () => {
      form.put(route("seo.update"));
    };
    const uploadFavicon = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.favicon = true;
      const formData = new FormData();
      formData.append("favicon", file);
      try {
        const response = await fetch(route("seo.upload-favicon"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.favicon = data.path;
      } catch (error) {
        console.error("Favicon upload failed:", error);
      } finally {
        uploading.value.favicon = false;
      }
    };
    const uploadAppleTouchIcon = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.appleTouchIcon = true;
      const formData = new FormData();
      formData.append("apple_touch_icon", file);
      try {
        const response = await fetch(route("seo.upload-apple-touch-icon"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.apple_touch_icon = data.path;
      } catch (error) {
        console.error("Apple Touch Icon upload failed:", error);
      } finally {
        uploading.value.appleTouchIcon = false;
      }
    };
    const uploadOgImage = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.ogImage = true;
      const formData = new FormData();
      formData.append("og_image", file);
      try {
        const response = await fetch(route("seo.upload-og-image"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.og_image = data.path;
      } catch (error) {
        console.error("OG Image upload failed:", error);
      } finally {
        uploading.value.ogImage = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: ((_b = (_a = __props.screen) == null ? void 0 : _a.seo) == null ? void 0 : _b.title) || "SEO Ayarları"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-background p-6"${_scopeId}><div class="mx-auto max-w-5xl"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>SEO Ayarları</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Sitenizin arama motorları ve sosyal medya için meta verilerini yönetin. </p></div><form class="space-y-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Site Kimliği" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "site_name",
                    value: "Site Adı"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "site_name",
                    modelValue: unref(form).site_name,
                    "onUpdate:modelValue": ($event) => unref(form).site_name = $event,
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Header&#39;da görünecek site adı</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.site_name,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "tagline",
                    value: "Slogan"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "tagline",
                    modelValue: unref(form).tagline,
                    "onUpdate:modelValue": ($event) => unref(form).tagline = $event,
                    class: "mt-1 block w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Kısa site açıklaması</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.tagline,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "title",
                    value: "Varsayılan Sayfa Başlığı"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "title",
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    class: "mt-1 block w-full",
                    required: "",
                    maxlength: "70"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-1 flex justify-between"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Ana sayfa için browser tab başlığı</p><span class="${ssrRenderClass(["text-xs", ((_a2 = unref(form).title) == null ? void 0 : _a2.length) > 60 ? "text-destructive" : "text-muted-foreground"])}"${_scopeId2}>${ssrInterpolate(((_b2 = unref(form).title) == null ? void 0 : _b2.length) || 0)}/70 </span></div>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.title,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "description",
                    value: "Site Açıklaması"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    id: "description",
                    modelValue: unref(form).description,
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    class: "mt-1 block w-full",
                    rows: "3",
                    required: "",
                    maxlength: "160"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-1 flex justify-between"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Arama sonuçlarında görünecek açıklama</p><span class="${ssrRenderClass(["text-xs", ((_c2 = unref(form).description) == null ? void 0 : _c2.length) > 155 ? "text-destructive" : "text-muted-foreground"])}"${_scopeId2}>${ssrInterpolate(((_d2 = unref(form).description) == null ? void 0 : _d2.length) || 0)}/160 </span></div>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.description,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "keywords",
                    value: "Anahtar Kelimeler"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "keywords",
                    modelValue: unref(form).keywords,
                    "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                    class: "mt-1 block w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Virgülle ayrılmış anahtar kelimeler</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.keywords,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "author",
                    value: "Yazar"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "author",
                    modelValue: unref(form).author,
                    "onUpdate:modelValue": ($event) => unref(form).author = $event,
                    class: "mt-1 block w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.author,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "language",
                    value: "Dil Kodu"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "language",
                    modelValue: unref(form).language,
                    "onUpdate:modelValue": ($event) => unref(form).language = $event,
                    class: "mt-1 block w-full",
                    placeholder: "tr"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.language,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "locale",
                    value: "Yerel Ayar"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "locale",
                    modelValue: unref(form).locale,
                    "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                    class: "mt-1 block w-full",
                    placeholder: "tr_TR"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.locale,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "site_name",
                          value: "Site Adı"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "site_name",
                          modelValue: unref(form).site_name,
                          "onUpdate:modelValue": ($event) => unref(form).site_name = $event,
                          class: "mt-1 block w-full",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Header'da görünecek site adı"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.site_name,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "tagline",
                          value: "Slogan"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "tagline",
                          modelValue: unref(form).tagline,
                          "onUpdate:modelValue": ($event) => unref(form).tagline = $event,
                          class: "mt-1 block w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Kısa site açıklaması"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.tagline,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(_sfc_main$4, {
                          for: "title",
                          value: "Varsayılan Sayfa Başlığı"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          class: "mt-1 block w-full",
                          required: "",
                          maxlength: "70"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "mt-1 flex justify-between" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Ana sayfa için browser tab başlığı"),
                          createVNode("span", {
                            class: ["text-xs", ((_e2 = unref(form).title) == null ? void 0 : _e2.length) > 60 ? "text-destructive" : "text-muted-foreground"]
                          }, toDisplayString(((_f2 = unref(form).title) == null ? void 0 : _f2.length) || 0) + "/70 ", 3)
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.title,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(_sfc_main$4, {
                          for: "description",
                          value: "Site Açıklaması"
                        }),
                        createVNode(_sfc_main$1, {
                          id: "description",
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          class: "mt-1 block w-full",
                          rows: "3",
                          required: "",
                          maxlength: "160"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "mt-1 flex justify-between" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Arama sonuçlarında görünecek açıklama"),
                          createVNode("span", {
                            class: ["text-xs", ((_g = unref(form).description) == null ? void 0 : _g.length) > 155 ? "text-destructive" : "text-muted-foreground"]
                          }, toDisplayString(((_h = unref(form).description) == null ? void 0 : _h.length) || 0) + "/160 ", 3)
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.description,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(_sfc_main$4, {
                          for: "keywords",
                          value: "Anahtar Kelimeler"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "keywords",
                          modelValue: unref(form).keywords,
                          "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                          class: "mt-1 block w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Virgülle ayrılmış anahtar kelimeler"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.keywords,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "author",
                          value: "Yazar"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "author",
                          modelValue: unref(form).author,
                          "onUpdate:modelValue": ($event) => unref(form).author = $event,
                          class: "mt-1 block w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.author,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "language",
                            value: "Dil Kodu"
                          }),
                          createVNode(_sfc_main$5, {
                            id: "language",
                            modelValue: unref(form).language,
                            "onUpdate:modelValue": ($event) => unref(form).language = $event,
                            class: "mt-1 block w-full",
                            placeholder: "tr"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.language,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            for: "locale",
                            value: "Yerel Ayar"
                          }),
                          createVNode(_sfc_main$5, {
                            id: "locale",
                            modelValue: unref(form).locale,
                            "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                            class: "mt-1 block w-full",
                            placeholder: "tr_TR"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.locale,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Görsel Varlıklar" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-6 md:grid-cols-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { value: "Favicon" }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-2 flex items-center gap-4"${_scopeId2}><div class="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted"${_scopeId2}>`);
                  if (unref(form).favicon) {
                    _push3(`<img${ssrRenderAttr("src", unref(form).favicon)} class="h-8 w-8 object-contain" alt="Favicon"${_scopeId2}>`);
                  } else {
                    _push3(`<svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg>`);
                  }
                  _push3(`</div><div${_scopeId2}><input type="file" accept=".ico,.png,.svg" class="hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => _ctx.$refs.faviconInput.click(),
                    loading: uploading.value.favicon
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Yükle `);
                      } else {
                        return [
                          createTextVNode(" Yükle ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>ICO, PNG, SVG (max 512KB)</p></div></div></div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { value: "Apple Touch Icon" }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-2 flex items-center gap-4"${_scopeId2}><div class="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted"${_scopeId2}>`);
                  if (unref(form).apple_touch_icon) {
                    _push3(`<img${ssrRenderAttr("src", unref(form).apple_touch_icon)} class="h-12 w-12 rounded-lg object-contain" alt="Apple Touch Icon"${_scopeId2}>`);
                  } else {
                    _push3(`<svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"${_scopeId2}></path></svg>`);
                  }
                  _push3(`</div><div${_scopeId2}><input type="file" accept=".png" class="hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => _ctx.$refs.appleTouchInput.click(),
                    loading: uploading.value.appleTouchIcon
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Yükle `);
                      } else {
                        return [
                          createTextVNode(" Yükle ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>PNG 180x180 (max 512KB)</p></div></div></div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "theme_color",
                    value: "Tema Rengi"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-2 flex items-center gap-3"${_scopeId2}><input type="color" id="theme_color"${ssrRenderAttr("value", unref(form).theme_color)} class="h-10 w-14 cursor-pointer rounded border border-border"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    modelValue: unref(form).theme_color,
                    "onUpdate:modelValue": ($event) => unref(form).theme_color = $event,
                    class: "w-28",
                    placeholder: "#000000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Mobil tarayıcı tema rengi</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-6 md:grid-cols-3" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, { value: "Favicon" }),
                        createVNode("div", { class: "mt-2 flex items-center gap-4" }, [
                          createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted" }, [
                            unref(form).favicon ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(form).favicon,
                              class: "h-8 w-8 object-contain",
                              alt: "Favicon"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              class: "h-8 w-8 text-muted-foreground",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", null, [
                            createVNode("input", {
                              type: "file",
                              ref: "faviconInput",
                              onChange: uploadFavicon,
                              accept: ".ico,.png,.svg",
                              class: "hidden"
                            }, null, 544),
                            createVNode(_sfc_main$7, {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => _ctx.$refs.faviconInput.click(),
                              loading: uploading.value.favicon
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Yükle ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "loading"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "ICO, PNG, SVG (max 512KB)")
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, { value: "Apple Touch Icon" }),
                        createVNode("div", { class: "mt-2 flex items-center gap-4" }, [
                          createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted" }, [
                            unref(form).apple_touch_icon ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(form).apple_touch_icon,
                              class: "h-12 w-12 rounded-lg object-contain",
                              alt: "Apple Touch Icon"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              class: "h-8 w-8 text-muted-foreground",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", null, [
                            createVNode("input", {
                              type: "file",
                              ref: "appleTouchInput",
                              onChange: uploadAppleTouchIcon,
                              accept: ".png",
                              class: "hidden"
                            }, null, 544),
                            createVNode(_sfc_main$7, {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => _ctx.$refs.appleTouchInput.click(),
                              loading: uploading.value.appleTouchIcon
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Yükle ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "loading"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "PNG 180x180 (max 512KB)")
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "theme_color",
                          value: "Tema Rengi"
                        }),
                        createVNode("div", { class: "mt-2 flex items-center gap-3" }, [
                          withDirectives(createVNode("input", {
                            type: "color",
                            id: "theme_color",
                            "onUpdate:modelValue": ($event) => unref(form).theme_color = $event,
                            class: "h-10 w-14 cursor-pointer rounded border border-border"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).theme_color]
                          ]),
                          createVNode(_sfc_main$5, {
                            modelValue: unref(form).theme_color,
                            "onUpdate:modelValue": ($event) => unref(form).theme_color = $event,
                            class: "w-28",
                            placeholder: "#000000"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Mobil tarayıcı tema rengi")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Open Graph (Sosyal Medya Paylaşımı)" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "og_title",
                    value: "OG Başlık"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "og_title",
                    modelValue: unref(form).og_title,
                    "onUpdate:modelValue": ($event) => unref(form).og_title = $event,
                    class: "mt-1 block w-full",
                    maxlength: "70"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Boş bırakılırsa site başlığı kullanılır</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.og_title,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "og_description",
                    value: "OG Açıklama"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "og_description",
                    modelValue: unref(form).og_description,
                    "onUpdate:modelValue": ($event) => unref(form).og_description = $event,
                    class: "mt-1 block w-full",
                    maxlength: "200"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Boş bırakılırsa site açıklaması kullanılır</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.og_description,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, { value: "OG Görsel (1200x630 önerilir)" }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-2"${_scopeId2}>`);
                  if (unref(form).og_image) {
                    _push3(`<div class="relative mb-3 inline-block"${_scopeId2}><img${ssrRenderAttr("src", unref(form).og_image)} class="h-32 rounded-lg border border-border object-cover" alt="OG Image"${_scopeId2}><button type="button" class="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId2}></path></svg></button></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}><input type="file" accept=".jpg,.jpeg,.png,.webp" class="hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => _ctx.$refs.ogImageInput.click(),
                    loading: uploading.value.ogImage
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Görsel Yükle `);
                      } else {
                        return [
                          createTextVNode(" Görsel Yükle ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="text-xs text-muted-foreground"${_scopeId2}>veya</span>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    modelValue: unref(form).og_image,
                    "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                    class: "flex-1",
                    placeholder: "https://..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "og_title",
                          value: "OG Başlık"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "og_title",
                          modelValue: unref(form).og_title,
                          "onUpdate:modelValue": ($event) => unref(form).og_title = $event,
                          class: "mt-1 block w-full",
                          maxlength: "70"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Boş bırakılırsa site başlığı kullanılır"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.og_title,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "og_description",
                          value: "OG Açıklama"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "og_description",
                          modelValue: unref(form).og_description,
                          "onUpdate:modelValue": ($event) => unref(form).og_description = $event,
                          class: "mt-1 block w-full",
                          maxlength: "200"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Boş bırakılırsa site açıklaması kullanılır"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.og_description,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(_sfc_main$4, { value: "OG Görsel (1200x630 önerilir)" }),
                        createVNode("div", { class: "mt-2" }, [
                          unref(form).og_image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative mb-3 inline-block"
                          }, [
                            createVNode("img", {
                              src: unref(form).og_image,
                              class: "h-32 rounded-lg border border-border object-cover",
                              alt: "OG Image"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => unref(form).og_image = "",
                              class: "absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                            }, [
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
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("input", {
                              type: "file",
                              ref: "ogImageInput",
                              onChange: uploadOgImage,
                              accept: ".jpg,.jpeg,.png,.webp",
                              class: "hidden"
                            }, null, 544),
                            createVNode(_sfc_main$7, {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => _ctx.$refs.ogImageInput.click(),
                              loading: uploading.value.ogImage
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Görsel Yükle ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "loading"]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                            createVNode(_sfc_main$5, {
                              modelValue: unref(form).og_image,
                              "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                              class: "flex-1",
                              placeholder: "https://..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Twitter Card" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"${_scopeId2}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      viewBox: "0 0 24 24",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "twitter_card",
                    value: "Kart Tipi"
                  }, null, _parent3, _scopeId2));
                  _push3(`<select id="twitter_card" class="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"${_scopeId2}><option value="summary"${ssrIncludeBooleanAttr(Array.isArray(unref(form).twitter_card) ? ssrLooseContain(unref(form).twitter_card, "summary") : ssrLooseEqual(unref(form).twitter_card, "summary")) ? " selected" : ""}${_scopeId2}>Summary</option><option value="summary_large_image"${ssrIncludeBooleanAttr(Array.isArray(unref(form).twitter_card) ? ssrLooseContain(unref(form).twitter_card, "summary_large_image") : ssrLooseEqual(unref(form).twitter_card, "summary_large_image")) ? " selected" : ""}${_scopeId2}>Summary Large Image</option><option value="app"${ssrIncludeBooleanAttr(Array.isArray(unref(form).twitter_card) ? ssrLooseContain(unref(form).twitter_card, "app") : ssrLooseEqual(unref(form).twitter_card, "app")) ? " selected" : ""}${_scopeId2}>App</option><option value="player"${ssrIncludeBooleanAttr(Array.isArray(unref(form).twitter_card) ? ssrLooseContain(unref(form).twitter_card, "player") : ssrLooseEqual(unref(form).twitter_card, "player")) ? " selected" : ""}${_scopeId2}>Player</option></select>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.twitter_card,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "twitter_site",
                    value: "Twitter Hesabı (@site)"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "twitter_site",
                    modelValue: unref(form).twitter_site,
                    "onUpdate:modelValue": ($event) => unref(form).twitter_site = $event,
                    class: "mt-1 block w-full",
                    placeholder: "@siteniz"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.twitter_site,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "twitter_creator",
                    value: "İçerik Oluşturucu (@creator)"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "twitter_creator",
                    modelValue: unref(form).twitter_creator,
                    "onUpdate:modelValue": ($event) => unref(form).twitter_creator = $event,
                    class: "mt-1 block w-full",
                    placeholder: "@kullanici"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.twitter_creator,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "twitter_card",
                          value: "Kart Tipi"
                        }),
                        withDirectives(createVNode("select", {
                          id: "twitter_card",
                          "onUpdate:modelValue": ($event) => unref(form).twitter_card = $event,
                          class: "mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        }, [
                          createVNode("option", { value: "summary" }, "Summary"),
                          createVNode("option", { value: "summary_large_image" }, "Summary Large Image"),
                          createVNode("option", { value: "app" }, "App"),
                          createVNode("option", { value: "player" }, "Player")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).twitter_card]
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.twitter_card,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "twitter_site",
                          value: "Twitter Hesabı (@site)"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "twitter_site",
                          modelValue: unref(form).twitter_site,
                          "onUpdate:modelValue": ($event) => unref(form).twitter_site = $event,
                          class: "mt-1 block w-full",
                          placeholder: "@siteniz"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.twitter_site,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "twitter_creator",
                          value: "İçerik Oluşturucu (@creator)"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "twitter_creator",
                          modelValue: unref(form).twitter_creator,
                          "onUpdate:modelValue": ($event) => unref(form).twitter_creator = $event,
                          class: "mt-1 block w-full",
                          placeholder: "@kullanici"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.twitter_creator,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Teknik SEO" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      }),
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "canonical_url",
                    value: "Canonical URL"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "canonical_url",
                    modelValue: unref(form).canonical_url,
                    "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event,
                    class: "mt-1 block w-full",
                    placeholder: "https://siteniz.com"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Ana site URL&#39;i (duplicate content önleme)</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.canonical_url,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "robots",
                    value: "Robots Direktifi"
                  }, null, _parent3, _scopeId2));
                  _push3(`<select id="robots" class="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"${_scopeId2}><option value="index, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, follow") : ssrLooseEqual(unref(form).robots, "index, follow")) ? " selected" : ""}${_scopeId2}>index, follow (Önerilen)</option><option value="index, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, nofollow") : ssrLooseEqual(unref(form).robots, "index, nofollow")) ? " selected" : ""}${_scopeId2}>index, nofollow</option><option value="noindex, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, follow") : ssrLooseEqual(unref(form).robots, "noindex, follow")) ? " selected" : ""}${_scopeId2}>noindex, follow</option><option value="noindex, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, nofollow") : ssrLooseEqual(unref(form).robots, "noindex, nofollow")) ? " selected" : ""}${_scopeId2}>noindex, nofollow</option></select>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.robots,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "schema_org",
                    value: "Schema.org JSON-LD"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    id: "schema_org",
                    modelValue: unref(form).schema_org,
                    "onUpdate:modelValue": ($event) => unref(form).schema_org = $event,
                    class: "mt-1 block w-full font-mono text-sm",
                    rows: "6",
                    placeholder: '{"@context": "https://schema.org", "@type": "Organization", ...}'
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Yapılandırılmış veri (JSON formatında)</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.schema_org,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "canonical_url",
                          value: "Canonical URL"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "canonical_url",
                          modelValue: unref(form).canonical_url,
                          "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event,
                          class: "mt-1 block w-full",
                          placeholder: "https://siteniz.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Ana site URL'i (duplicate content önleme)"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.canonical_url,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "robots",
                          value: "Robots Direktifi"
                        }),
                        withDirectives(createVNode("select", {
                          id: "robots",
                          "onUpdate:modelValue": ($event) => unref(form).robots = $event,
                          class: "mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        }, [
                          createVNode("option", { value: "index, follow" }, "index, follow (Önerilen)"),
                          createVNode("option", { value: "index, nofollow" }, "index, nofollow"),
                          createVNode("option", { value: "noindex, follow" }, "noindex, follow"),
                          createVNode("option", { value: "noindex, nofollow" }, "noindex, nofollow")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).robots]
                        ]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.robots,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(_sfc_main$4, {
                          for: "schema_org",
                          value: "Schema.org JSON-LD"
                        }),
                        createVNode(_sfc_main$1, {
                          id: "schema_org",
                          modelValue: unref(form).schema_org,
                          "onUpdate:modelValue": ($event) => unref(form).schema_org = $event,
                          class: "mt-1 block w-full font-mono text-sm",
                          rows: "6",
                          placeholder: '{"@context": "https://schema.org", "@type": "Organization", ...}'
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Yapılandırılmış veri (JSON formatında)"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.schema_org,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Arama Motoru Doğrulama" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "google_verification",
                    value: "Google Search Console"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "google_verification",
                    modelValue: unref(form).google_verification,
                    "onUpdate:modelValue": ($event) => unref(form).google_verification = $event,
                    class: "mt-1 block w-full",
                    placeholder: "doğrulama kodu"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>google-site-verification içeriği</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.google_verification,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "bing_verification",
                    value: "Bing Webmaster"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "bing_verification",
                    modelValue: unref(form).bing_verification,
                    "onUpdate:modelValue": ($event) => unref(form).bing_verification = $event,
                    class: "mt-1 block w-full",
                    placeholder: "doğrulama kodu"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>msvalidate.01 içeriği</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.bing_verification,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "yandex_verification",
                    value: "Yandex Webmaster"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "yandex_verification",
                    modelValue: unref(form).yandex_verification,
                    "onUpdate:modelValue": ($event) => unref(form).yandex_verification = $event,
                    class: "mt-1 block w-full",
                    placeholder: "doğrulama kodu"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>yandex-verification içeriği</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.yandex_verification,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "google_verification",
                          value: "Google Search Console"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "google_verification",
                          modelValue: unref(form).google_verification,
                          "onUpdate:modelValue": ($event) => unref(form).google_verification = $event,
                          class: "mt-1 block w-full",
                          placeholder: "doğrulama kodu"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "google-site-verification içeriği"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.google_verification,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "bing_verification",
                          value: "Bing Webmaster"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "bing_verification",
                          modelValue: unref(form).bing_verification,
                          "onUpdate:modelValue": ($event) => unref(form).bing_verification = $event,
                          class: "mt-1 block w-full",
                          placeholder: "doğrulama kodu"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "msvalidate.01 içeriği"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.bing_verification,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "yandex_verification",
                          value: "Yandex Webmaster"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "yandex_verification",
                          modelValue: unref(form).yandex_verification,
                          "onUpdate:modelValue": ($event) => unref(form).yandex_verification = $event,
                          class: "mt-1 block w-full",
                          placeholder: "doğrulama kodu"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "yandex-verification içeriği"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.yandex_verification,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Analytics & Tracking" }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "google_analytics_id",
                    value: "Google Analytics ID"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "google_analytics_id",
                    modelValue: unref(form).google_analytics_id,
                    "onUpdate:modelValue": ($event) => unref(form).google_analytics_id = $event,
                    class: "mt-1 block w-full",
                    placeholder: "G-XXXXXXXXXX veya UA-XXXXXXXX-X"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>GA4 veya Universal Analytics ID</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.google_analytics_id,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    for: "google_tag_manager_id",
                    value: "Google Tag Manager ID"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    id: "google_tag_manager_id",
                    modelValue: unref(form).google_tag_manager_id,
                    "onUpdate:modelValue": ($event) => unref(form).google_tag_manager_id = $event,
                    class: "mt-1 block w-full",
                    placeholder: "GTM-XXXXXXX"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>GTM container ID</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.google_tag_manager_id,
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "google_analytics_id",
                          value: "Google Analytics ID"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "google_analytics_id",
                          modelValue: unref(form).google_analytics_id,
                          "onUpdate:modelValue": ($event) => unref(form).google_analytics_id = $event,
                          class: "mt-1 block w-full",
                          placeholder: "G-XXXXXXXXXX veya UA-XXXXXXXX-X"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "GA4 veya Universal Analytics ID"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.google_analytics_id,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          for: "google_tag_manager_id",
                          value: "Google Tag Manager ID"
                        }),
                        createVNode(_sfc_main$5, {
                          id: "google_tag_manager_id",
                          modelValue: unref(form).google_tag_manager_id,
                          "onUpdate:modelValue": ($event) => unref(form).google_tag_manager_id = $event,
                          class: "mt-1 block w-full",
                          placeholder: "GTM-XXXXXXX"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "GTM container ID"),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.google_tag_manager_id,
                          class: "mt-1"
                        }, null, 8, ["message"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              type: "submit",
              variant: "primary",
              loading: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kaydet `);
                } else {
                  return [
                    createTextVNode(" Kaydet ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
            if ((_c = _ctx.$page.props.flash) == null ? void 0 : _c.success) {
              _push2(`<div class="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: ((_e = (_d = __props.screen) == null ? void 0 : _d.seo) == null ? void 0 : _e.title) || "SEO Ayarları"
              }, null, 8, ["title"]),
              createVNode("div", { class: "min-h-screen bg-background p-6" }, [
                createVNode("div", { class: "mx-auto max-w-5xl" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-foreground" }, "SEO Ayarları"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Sitenizin arama motorları ve sosyal medya için meta verilerini yönetin. ")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-8"
                  }, [
                    createVNode(_sfc_main$3, { title: "Site Kimliği" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          })
                        ]))
                      ]),
                      default: withCtx(() => {
                        var _a2, _b2, _c2, _d2;
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode(_sfc_main$4, {
                                for: "site_name",
                                value: "Site Adı"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "site_name",
                                modelValue: unref(form).site_name,
                                "onUpdate:modelValue": ($event) => unref(form).site_name = $event,
                                class: "mt-1 block w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Header'da görünecek site adı"),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.site_name,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$4, {
                                for: "tagline",
                                value: "Slogan"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "tagline",
                                modelValue: unref(form).tagline,
                                "onUpdate:modelValue": ($event) => unref(form).tagline = $event,
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Kısa site açıklaması"),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.tagline,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$4, {
                                for: "title",
                                value: "Varsayılan Sayfa Başlığı"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "title",
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                class: "mt-1 block w-full",
                                required: "",
                                maxlength: "70"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 flex justify-between" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Ana sayfa için browser tab başlığı"),
                                createVNode("span", {
                                  class: ["text-xs", ((_a2 = unref(form).title) == null ? void 0 : _a2.length) > 60 ? "text-destructive" : "text-muted-foreground"]
                                }, toDisplayString(((_b2 = unref(form).title) == null ? void 0 : _b2.length) || 0) + "/70 ", 3)
                              ]),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.title,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$4, {
                                for: "description",
                                value: "Site Açıklaması"
                              }),
                              createVNode(_sfc_main$1, {
                                id: "description",
                                modelValue: unref(form).description,
                                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                class: "mt-1 block w-full",
                                rows: "3",
                                required: "",
                                maxlength: "160"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "mt-1 flex justify-between" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Arama sonuçlarında görünecek açıklama"),
                                createVNode("span", {
                                  class: ["text-xs", ((_c2 = unref(form).description) == null ? void 0 : _c2.length) > 155 ? "text-destructive" : "text-muted-foreground"]
                                }, toDisplayString(((_d2 = unref(form).description) == null ? void 0 : _d2.length) || 0) + "/160 ", 3)
                              ]),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.description,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode(_sfc_main$4, {
                                for: "keywords",
                                value: "Anahtar Kelimeler"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "keywords",
                                modelValue: unref(form).keywords,
                                "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Virgülle ayrılmış anahtar kelimeler"),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.keywords,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_sfc_main$4, {
                                for: "author",
                                value: "Yazar"
                              }),
                              createVNode(_sfc_main$5, {
                                id: "author",
                                modelValue: unref(form).author,
                                "onUpdate:modelValue": ($event) => unref(form).author = $event,
                                class: "mt-1 block w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$6, {
                                message: unref(form).errors.author,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode(_sfc_main$4, {
                                  for: "language",
                                  value: "Dil Kodu"
                                }),
                                createVNode(_sfc_main$5, {
                                  id: "language",
                                  modelValue: unref(form).language,
                                  "onUpdate:modelValue": ($event) => unref(form).language = $event,
                                  class: "mt-1 block w-full",
                                  placeholder: "tr"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$6, {
                                  message: unref(form).errors.language,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$4, {
                                  for: "locale",
                                  value: "Yerel Ayar"
                                }),
                                createVNode(_sfc_main$5, {
                                  id: "locale",
                                  modelValue: unref(form).locale,
                                  "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                                  class: "mt-1 block w-full",
                                  placeholder: "tr_TR"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$6, {
                                  message: unref(form).errors.locale,
                                  class: "mt-1"
                                }, null, 8, ["message"])
                              ])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Görsel Varlıklar" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-6 md:grid-cols-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, { value: "Favicon" }),
                            createVNode("div", { class: "mt-2 flex items-center gap-4" }, [
                              createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted" }, [
                                unref(form).favicon ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(form).favicon,
                                  class: "h-8 w-8 object-contain",
                                  alt: "Favicon"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "h-8 w-8 text-muted-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  })
                                ]))
                              ]),
                              createVNode("div", null, [
                                createVNode("input", {
                                  type: "file",
                                  ref: "faviconInput",
                                  onChange: uploadFavicon,
                                  accept: ".ico,.png,.svg",
                                  class: "hidden"
                                }, null, 544),
                                createVNode(_sfc_main$7, {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: ($event) => _ctx.$refs.faviconInput.click(),
                                  loading: uploading.value.favicon
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Yükle ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "loading"]),
                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "ICO, PNG, SVG (max 512KB)")
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, { value: "Apple Touch Icon" }),
                            createVNode("div", { class: "mt-2 flex items-center gap-4" }, [
                              createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted" }, [
                                unref(form).apple_touch_icon ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(form).apple_touch_icon,
                                  class: "h-12 w-12 rounded-lg object-contain",
                                  alt: "Apple Touch Icon"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "h-8 w-8 text-muted-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  })
                                ]))
                              ]),
                              createVNode("div", null, [
                                createVNode("input", {
                                  type: "file",
                                  ref: "appleTouchInput",
                                  onChange: uploadAppleTouchIcon,
                                  accept: ".png",
                                  class: "hidden"
                                }, null, 544),
                                createVNode(_sfc_main$7, {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: ($event) => _ctx.$refs.appleTouchInput.click(),
                                  loading: uploading.value.appleTouchIcon
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Yükle ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "loading"]),
                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "PNG 180x180 (max 512KB)")
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "theme_color",
                              value: "Tema Rengi"
                            }),
                            createVNode("div", { class: "mt-2 flex items-center gap-3" }, [
                              withDirectives(createVNode("input", {
                                type: "color",
                                id: "theme_color",
                                "onUpdate:modelValue": ($event) => unref(form).theme_color = $event,
                                class: "h-10 w-14 cursor-pointer rounded border border-border"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).theme_color]
                              ]),
                              createVNode(_sfc_main$5, {
                                modelValue: unref(form).theme_color,
                                "onUpdate:modelValue": ($event) => unref(form).theme_color = $event,
                                class: "w-28",
                                placeholder: "#000000"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Mobil tarayıcı tema rengi")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Open Graph (Sosyal Medya Paylaşımı)" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "og_title",
                              value: "OG Başlık"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "og_title",
                              modelValue: unref(form).og_title,
                              "onUpdate:modelValue": ($event) => unref(form).og_title = $event,
                              class: "mt-1 block w-full",
                              maxlength: "70"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Boş bırakılırsa site başlığı kullanılır"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.og_title,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "og_description",
                              value: "OG Açıklama"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "og_description",
                              modelValue: unref(form).og_description,
                              "onUpdate:modelValue": ($event) => unref(form).og_description = $event,
                              class: "mt-1 block w-full",
                              maxlength: "200"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Boş bırakılırsa site açıklaması kullanılır"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.og_description,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode(_sfc_main$4, { value: "OG Görsel (1200x630 önerilir)" }),
                            createVNode("div", { class: "mt-2" }, [
                              unref(form).og_image ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "relative mb-3 inline-block"
                              }, [
                                createVNode("img", {
                                  src: unref(form).og_image,
                                  class: "h-32 rounded-lg border border-border object-cover",
                                  alt: "OG Image"
                                }, null, 8, ["src"]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => unref(form).og_image = "",
                                  class: "absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                                }, [
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
                                      d: "M6 18L18 6M6 6l12 12"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("input", {
                                  type: "file",
                                  ref: "ogImageInput",
                                  onChange: uploadOgImage,
                                  accept: ".jpg,.jpeg,.png,.webp",
                                  class: "hidden"
                                }, null, 544),
                                createVNode(_sfc_main$7, {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: ($event) => _ctx.$refs.ogImageInput.click(),
                                  loading: uploading.value.ogImage
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Görsel Yükle ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "loading"]),
                                createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                                createVNode(_sfc_main$5, {
                                  modelValue: unref(form).og_image,
                                  "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                                  class: "flex-1",
                                  placeholder: "https://..."
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Twitter Card" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          createVNode("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "twitter_card",
                              value: "Kart Tipi"
                            }),
                            withDirectives(createVNode("select", {
                              id: "twitter_card",
                              "onUpdate:modelValue": ($event) => unref(form).twitter_card = $event,
                              class: "mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            }, [
                              createVNode("option", { value: "summary" }, "Summary"),
                              createVNode("option", { value: "summary_large_image" }, "Summary Large Image"),
                              createVNode("option", { value: "app" }, "App"),
                              createVNode("option", { value: "player" }, "Player")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).twitter_card]
                            ]),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.twitter_card,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "twitter_site",
                              value: "Twitter Hesabı (@site)"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "twitter_site",
                              modelValue: unref(form).twitter_site,
                              "onUpdate:modelValue": ($event) => unref(form).twitter_site = $event,
                              class: "mt-1 block w-full",
                              placeholder: "@siteniz"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.twitter_site,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "twitter_creator",
                              value: "İçerik Oluşturucu (@creator)"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "twitter_creator",
                              modelValue: unref(form).twitter_creator,
                              "onUpdate:modelValue": ($event) => unref(form).twitter_creator = $event,
                              class: "mt-1 block w-full",
                              placeholder: "@kullanici"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.twitter_creator,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Teknik SEO" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "canonical_url",
                              value: "Canonical URL"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "canonical_url",
                              modelValue: unref(form).canonical_url,
                              "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event,
                              class: "mt-1 block w-full",
                              placeholder: "https://siteniz.com"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Ana site URL'i (duplicate content önleme)"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.canonical_url,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "robots",
                              value: "Robots Direktifi"
                            }),
                            withDirectives(createVNode("select", {
                              id: "robots",
                              "onUpdate:modelValue": ($event) => unref(form).robots = $event,
                              class: "mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            }, [
                              createVNode("option", { value: "index, follow" }, "index, follow (Önerilen)"),
                              createVNode("option", { value: "index, nofollow" }, "index, nofollow"),
                              createVNode("option", { value: "noindex, follow" }, "noindex, follow"),
                              createVNode("option", { value: "noindex, nofollow" }, "noindex, nofollow")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).robots]
                            ]),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.robots,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode(_sfc_main$4, {
                              for: "schema_org",
                              value: "Schema.org JSON-LD"
                            }),
                            createVNode(_sfc_main$1, {
                              id: "schema_org",
                              modelValue: unref(form).schema_org,
                              "onUpdate:modelValue": ($event) => unref(form).schema_org = $event,
                              class: "mt-1 block w-full font-mono text-sm",
                              rows: "6",
                              placeholder: '{"@context": "https://schema.org", "@type": "Organization", ...}'
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Yapılandırılmış veri (JSON formatında)"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.schema_org,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Arama Motoru Doğrulama" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "google_verification",
                              value: "Google Search Console"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "google_verification",
                              modelValue: unref(form).google_verification,
                              "onUpdate:modelValue": ($event) => unref(form).google_verification = $event,
                              class: "mt-1 block w-full",
                              placeholder: "doğrulama kodu"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "google-site-verification içeriği"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.google_verification,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "bing_verification",
                              value: "Bing Webmaster"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "bing_verification",
                              modelValue: unref(form).bing_verification,
                              "onUpdate:modelValue": ($event) => unref(form).bing_verification = $event,
                              class: "mt-1 block w-full",
                              placeholder: "doğrulama kodu"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "msvalidate.01 içeriği"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.bing_verification,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "yandex_verification",
                              value: "Yandex Webmaster"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "yandex_verification",
                              modelValue: unref(form).yandex_verification,
                              "onUpdate:modelValue": ($event) => unref(form).yandex_verification = $event,
                              class: "mt-1 block w-full",
                              placeholder: "doğrulama kodu"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "yandex-verification içeriği"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.yandex_verification,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, { title: "Analytics & Tracking" }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "google_analytics_id",
                              value: "Google Analytics ID"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "google_analytics_id",
                              modelValue: unref(form).google_analytics_id,
                              "onUpdate:modelValue": ($event) => unref(form).google_analytics_id = $event,
                              class: "mt-1 block w-full",
                              placeholder: "G-XXXXXXXXXX veya UA-XXXXXXXX-X"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "GA4 veya Universal Analytics ID"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.google_analytics_id,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              for: "google_tag_manager_id",
                              value: "Google Tag Manager ID"
                            }),
                            createVNode(_sfc_main$5, {
                              id: "google_tag_manager_id",
                              modelValue: unref(form).google_tag_manager_id,
                              "onUpdate:modelValue": ($event) => unref(form).google_tag_manager_id = $event,
                              class: "mt-1 block w-full",
                              placeholder: "GTM-XXXXXXX"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "GTM container ID"),
                            createVNode(_sfc_main$6, {
                              message: unref(form).errors.google_tag_manager_id,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_sfc_main$7, {
                        type: "submit",
                        variant: "primary",
                        loading: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Kaydet ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ], 32),
                  ((_f = _ctx.$page.props.flash) == null ? void 0 : _f.success) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg"
                  }, toDisplayString(_ctx.$page.props.flash.success), 1)) : createCommentVNode("", true)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seo/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
