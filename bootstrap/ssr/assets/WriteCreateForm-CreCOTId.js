import { ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, withDirectives, vModelSelect, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./Form-C0ycMiS1.js";
import { _ as _sfc_main$3 } from "./RichTextEditor-BF3onje2.js";
import { _ as _sfc_main$4 } from "./Button-CWlX4hVa.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "WriteCreateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const categories = ref(props.categories);
    const form = useForm({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "draft",
      category_id: "",
      cover_image: "",
      seo_keywords: "",
      tags: "",
      views_count: 0,
      hasDraw: false
    });
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "",
      category_id: "",
      cover_image: "",
      seo_keywords: "",
      tags: ""
    });
    const validateForm = () => {
      errors.value.title = form.title ? "" : "Başlık zorunludur.";
      errors.value.slug = form.slug ? "" : "Slug zorunludur.";
      errors.value.content = form.content ? "" : "İçerik zorunludur.";
      errors.value.published_at = form.published_at ? "" : "Yayınlama tarihi zorunludur.";
      errors.value.summary = form.summary ? "" : "Özet zorunludur.";
      errors.value.category_id = form.category_id ? "" : "Kategori seçilmelidir.";
    };
    const createWrite = () => {
      validateForm();
      if (!Object.values(errors.value).some((error) => error !== "")) {
        form.post(route("writes.store")).then(() => {
        });
      }
    };
    watch(
      form,
      (newForm) => {
        if (newForm.title) errors.value.title = "";
        if (newForm.slug) errors.value.slug = "";
        if (newForm.content) errors.value.content = "";
        if (newForm.published_at) errors.value.published_at = "";
        if (newForm.summary) errors.value.summary = "";
        if (newForm.category_id) errors.value.category_id = "";
      },
      { deep: true }
    );
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5" }, _attrs))}><div class="container mx-auto p-4">`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmit: createWrite }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              id: "title",
              label: "Başlık",
              error: errors.value.title
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).slug,
              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
              id: "slug",
              label: "Slug",
              error: errors.value.slug
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: unref(form).content,
              "onUpdate:modelValue": ($event) => unref(form).content = $event,
              label: "İçerik",
              error: errors.value.content
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).published_at,
              "onUpdate:modelValue": ($event) => unref(form).published_at = $event,
              id: "published_at",
              label: "Yayınlama tarihi",
              type: "datetime-local",
              error: errors.value.published_at
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).summary,
              "onUpdate:modelValue": ($event) => unref(form).summary = $event,
              id: "summary",
              label: "Özet",
              textarea: "",
              rows: "3",
              error: errors.value.summary
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4"${_scopeId}><label for="status" class="mb-1 block text-sm font-bold text-gray-700"${_scopeId}>Durumu:</label><select id="status" class="mt-1 block w-full rounded border-gray-300"${_scopeId}><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}${_scopeId}>Yayında</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}${_scopeId}>Gizli</option></select>`);
            if (errors.value.status) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.status)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="category_id" class="mb-1 block text-sm font-bold text-gray-700"${_scopeId}>Kategori:</label><select id="category_id" class="mt-1 block w-full rounded border-gray-300"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Kategori seç</option><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.category_id) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).cover_image,
              "onUpdate:modelValue": ($event) => unref(form).cover_image = $event,
              id: "cover_image",
              label: "Kapak resmi",
              error: errors.value.cover_image
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).seo_keywords,
              "onUpdate:modelValue": ($event) => unref(form).seo_keywords = $event,
              id: "seo_keywords",
              label: "SEO Anahtar Kelimeleri",
              error: errors.value.seo_keywords
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).tags,
              "onUpdate:modelValue": ($event) => unref(form).tags = $event,
              id: "tags",
              label: "Etiketler",
              error: errors.value.tags
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4"${_scopeId}><label for="views_count" class="mb-1 block text-sm font-bold text-gray-700"${_scopeId}>Görüntülenme Sayısı:</label><input${ssrRenderAttr("value", unref(form).views_count)} type="number" id="views_count" class="mt-1 block w-full rounded border-gray-300" readonly${_scopeId}></div><div class="mb-4 flex items-center"${_scopeId}><label for="hasDraw" class="mb-1 mr-2 text-sm font-bold text-gray-700"${_scopeId}>Çizim Var Mı?</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} type="checkbox" id="hasDraw"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, { type: "submit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Write`);
                } else {
                  return [
                    createTextVNode("Create Write")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).title,
                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                id: "title",
                label: "Başlık",
                error: errors.value.title
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).slug,
                "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                id: "slug",
                label: "Slug",
                error: errors.value.slug
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$3, {
                modelValue: unref(form).content,
                "onUpdate:modelValue": ($event) => unref(form).content = $event,
                label: "İçerik",
                error: errors.value.content
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).published_at,
                "onUpdate:modelValue": ($event) => unref(form).published_at = $event,
                id: "published_at",
                label: "Yayınlama tarihi",
                type: "datetime-local",
                error: errors.value.published_at
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).summary,
                "onUpdate:modelValue": ($event) => unref(form).summary = $event,
                id: "summary",
                label: "Özet",
                textarea: "",
                rows: "3",
                error: errors.value.summary
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", {
                  for: "status",
                  class: "mb-1 block text-sm font-bold text-gray-700"
                }, "Durumu:"),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                  id: "status",
                  class: "mt-1 block w-full rounded border-gray-300"
                }, [
                  createVNode("option", { value: "draft" }, "Şablon"),
                  createVNode("option", { value: "published" }, "Yayında"),
                  createVNode("option", { value: "private" }, "Gizli")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(form).status]
                ]),
                errors.value.status ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-sm text-red-500"
                }, toDisplayString(errors.value.status), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", {
                  for: "category_id",
                  class: "mb-1 block text-sm font-bold text-gray-700"
                }, "Kategori:"),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                  id: "category_id",
                  class: "mt-1 block w-full rounded border-gray-300"
                }, [
                  createVNode("option", {
                    value: "",
                    disabled: ""
                  }, "Kategori seç"),
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                    return openBlock(), createBlock("option", {
                      key: category.id,
                      value: category.id
                    }, toDisplayString(category.name), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(form).category_id]
                ]),
                errors.value.category_id ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-sm text-red-500"
                }, toDisplayString(errors.value.category_id), 1)) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).cover_image,
                "onUpdate:modelValue": ($event) => unref(form).cover_image = $event,
                id: "cover_image",
                label: "Kapak resmi",
                error: errors.value.cover_image
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).seo_keywords,
                "onUpdate:modelValue": ($event) => unref(form).seo_keywords = $event,
                id: "seo_keywords",
                label: "SEO Anahtar Kelimeleri",
                error: errors.value.seo_keywords
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).tags,
                "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                id: "tags",
                label: "Etiketler",
                error: errors.value.tags
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", {
                  for: "views_count",
                  class: "mb-1 block text-sm font-bold text-gray-700"
                }, "Görüntülenme Sayısı:"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
                  type: "number",
                  id: "views_count",
                  class: "mt-1 block w-full rounded border-gray-300",
                  readonly: ""
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(form).views_count]
                ])
              ]),
              createVNode("div", { class: "mb-4 flex items-center" }, [
                createVNode("label", {
                  for: "hasDraw",
                  class: "mb-1 mr-2 text-sm font-bold text-gray-700"
                }, "Çizim Var Mı?"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => unref(form).hasDraw = $event,
                  type: "checkbox",
                  id: "hasDraw"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelCheckbox, unref(form).hasDraw]
                ])
              ]),
              createVNode(_sfc_main$4, { type: "submit" }, {
                default: withCtx(() => [
                  createTextVNode("Create Write")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Create/WriteCreateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
