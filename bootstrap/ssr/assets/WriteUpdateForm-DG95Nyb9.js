import { ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./Form-C0ycMiS1.js";
import { _ as _sfc_main$3 } from "./RichTextEditor-BF3onje2.js";
import { _ as _sfc_main$4 } from "./Button-CWlX4hVa.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = props.write;
    const categories = ref(props.categories);
    const form = useForm({
      title: write.title,
      slug: write.slug,
      content: write.content,
      summary: write.summary,
      status: write.status,
      category_id: write.category_id,
      cover_image: write.cover_image,
      seo_keywords: write.seo_keywords,
      tags: write.tags,
      views_count: write.views_count,
      hasDraw: write.hasDraw ? true : false
    });
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      summary: "",
      category_id: "",
      status: "",
      cover_image: "",
      seo_keywords: "",
      tags: "",
      views_count: "",
      hasDraw: ""
    });
    const validateForm = () => {
      errors.value.title = form.title ? "" : "Başlık zorunludur.";
      errors.value.slug = form.slug ? "" : "Slug zorunludur.";
      errors.value.content = form.content ? "" : "İçerik zorunludur.";
      errors.value.summary = form.summary ? "" : "Özet zorunludur.";
      errors.value.category_id = form.category_id ? "" : "Kategori seçilmelidir.";
      errors.value.status = form.status ? "" : "Durum seçilmelidir.";
    };
    const updateWrite = () => {
      validateForm();
      if (!Object.values(errors.value).some((error) => error !== "")) {
        form.put(route("writes.update", { write: props.write.id })).then(() => {
        }).catch((error) => {
        });
      }
    };
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5" }, _attrs))}><div class="container mx-auto p-4">`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmit: updateWrite }, {
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
              modelValue: unref(form).summary,
              "onUpdate:modelValue": ($event) => unref(form).summary = $event,
              id: "summary",
              label: "Özet",
              textarea: "",
              rows: "3",
              error: errors.value.summary
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4"${_scopeId}><label for="category_id" class="mb-1 block text-sm font-bold"${_scopeId}>Kategori:</label><select id="category_id" class="mt-1 block w-full"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Kategori seç</option><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.category_id) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="status" class="mb-1 block text-sm font-bold"${_scopeId}>Durum:</label><select id="status" class="mt-1 block w-full"${_scopeId}><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}${_scopeId}>Yayında</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}${_scopeId}>Gizli</option></select>`);
            if (errors.value.status) {
              _push2(`<p class="text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.status)}</p>`);
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).views_count,
              "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
              id: "views_count",
              label: "Görüntülenme Sayısı",
              type: "number",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 flex items-center"${_scopeId}><label for="hasDraw" class="mb-1 mr-2 text-sm font-bold text-gray-700"${_scopeId}>Çizim Var Mı?</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} type="checkbox" id="hasDraw"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, { type: "submit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Yazıyı Güncelle`);
                } else {
                  return [
                    createTextVNode("Yazıyı Güncelle")
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
                  for: "category_id",
                  class: "mb-1 block text-sm font-bold"
                }, "Kategori:"),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                  id: "category_id",
                  class: "mt-1 block w-full"
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
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", {
                  for: "status",
                  class: "mb-1 block text-sm font-bold"
                }, "Durum:"),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                  id: "status",
                  class: "mt-1 block w-full"
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
              createVNode(_sfc_main$2, {
                modelValue: unref(form).views_count,
                "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
                id: "views_count",
                label: "Görüntülenme Sayısı",
                type: "number",
                readonly: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
                  createTextVNode("Yazıyı Güncelle")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
