import { computed, ref, unref, withCtx, createTextVNode, createVNode, createBlock, withModifiers, createCommentVNode, openBlock, Fragment, renderList, withDirectives, vModelRadio, toDisplayString, Teleport, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderClass, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "CreateWorkspace",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const browserTitle = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || "Yeni Çalışma Alanı";
    });
    const form = useForm({
      images: [],
      status: "published",
      products: []
    });
    const imagePreviews = ref([]);
    const showProductModal = ref(false);
    const editingProductIndex = ref(null);
    const productForm = ref({ name: "", features: "", link: "" });
    const showDeleteConfirm = ref(false);
    const deleteProductIndex = ref(null);
    const deleteProductName = ref("");
    const isValidUrl = (string) => {
      if (!string) return true;
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };
    const hasProductError = (index) => {
      const product = form.products[index];
      return product.name.length > 255 || product.link && !isValidUrl(product.link) || product.link && product.link.length > 500;
    };
    const hasAnyProductError = computed(() => {
      return form.products.some((_, index) => hasProductError(index));
    });
    const handleImagesChange = (event) => {
      const files = Array.from(event.target.files);
      form.images = [...form.images, ...files];
      imagePreviews.value = [...imagePreviews.value, ...files.map((file) => URL.createObjectURL(file))];
    };
    const removeImage = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const openProductModal = (index = null) => {
      editingProductIndex.value = index;
      if (index !== null) {
        productForm.value = { ...form.products[index] };
      } else {
        productForm.value = { name: "", features: "", link: "" };
      }
      showProductModal.value = true;
    };
    const closeProductModal = () => {
      showProductModal.value = false;
      editingProductIndex.value = null;
      productForm.value = { name: "", features: "", link: "" };
    };
    const saveProduct = () => {
      if (!productForm.value.name || productForm.value.name.length > 255) return;
      if (productForm.value.link && (!isValidUrl(productForm.value.link) || productForm.value.link.length > 500)) return;
      if (editingProductIndex.value !== null) {
        form.products[editingProductIndex.value] = { ...productForm.value };
      } else {
        form.products.push({ ...productForm.value });
      }
      closeProductModal();
    };
    const confirmRemoveProduct = (index) => {
      deleteProductIndex.value = index;
      deleteProductName.value = form.products[index].name;
      showDeleteConfirm.value = true;
    };
    const removeProduct = () => {
      if (deleteProductIndex.value !== null) {
        form.products.splice(deleteProductIndex.value, 1);
      }
      showDeleteConfirm.value = false;
      deleteProductIndex.value = null;
      deleteProductName.value = "";
    };
    const submit = () => {
      if (hasAnyProductError.value) return;
      const formData = new FormData();
      form.images.forEach((image, index) => formData.append(`images[${index}]`, image));
      formData.append("status", form.status);
      form.products.forEach((product, index) => {
        formData.append(`products[${index}][name]`, product.name);
        if (product.features) formData.append(`products[${index}][features]`, product.features);
        if (product.link) formData.append(`products[${index}][link]`, product.link);
      });
      form.transform(() => formData).post("/workspace", { forceFormData: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: browserTitle.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 py-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>Yeni Çalışma Alanı</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Çalışma alanınızı ve ürünlerinizi ekleyin</p></div><form class="space-y-6"${_scopeId}><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Görseller</h2><div class="space-y-4"${_scopeId}><label class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-8 transition-colors hover:border-primary"${_scopeId}><svg class="mb-2 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><span class="text-sm font-medium text-foreground"${_scopeId}>Resim Yükle</span><span class="mt-1 text-xs text-muted-foreground"${_scopeId}>PNG, JPG, WEBP - max 5MB</span><input type="file" accept="image/*" multiple class="hidden"${_scopeId}></label>`);
            if (imagePreviews.value.length > 0) {
              _push2(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(imagePreviews.value, (preview, index) => {
                _push2(`<div class="group relative aspect-video overflow-hidden rounded-lg ring-1 ring-border"${_scopeId}><img${ssrRenderAttr("src", preview)} alt="Preview" class="h-full w-full object-cover"${_scopeId}><button type="button" class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Durum</h2><div class="flex gap-4"${_scopeId}><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "published")) ? " checked" : ""} value="published" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Yayınla</span></label><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "draft")) ? " checked" : ""} value="draft" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Taslak</span></label></div></div><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Ürünler</h2><button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Ürün Ekle </button></div>`);
            if (unref(form).products.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border py-8 text-center"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>Henüz ürün eklenmedi</p></div>`);
            } else {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).products, (product, index) => {
                _push2(`<div class="${ssrRenderClass([{ "border-destructive": hasProductError(index) }, "flex items-center justify-between rounded-lg border border-border bg-background p-4"])}"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}><h3 class="font-medium text-foreground"${_scopeId}>${ssrInterpolate(product.name)}</h3>`);
                if (product.features) {
                  _push2(`<p class="mt-1 truncate text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(product.features)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (product.link) {
                  _push2(`<a${ssrRenderAttr("href", product.link)} target="_blank" class="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"${_scopeId}><span${_scopeId}>Link</span><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (hasProductError(index)) {
                  _push2(`<div class="mt-2 text-xs text-destructive"${_scopeId}>`);
                  if (product.name.length > 255) {
                    _push2(`<p${_scopeId}>İsim 255 karakteri aşamaz (${ssrInterpolate(product.name.length)}/255)</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (product.link && !isValidUrl(product.link)) {
                    _push2(`<p${_scopeId}>Geçersiz URL formatı</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (product.link && product.link.length > 500) {
                    _push2(`<p${_scopeId}>Link 500 karakteri aşamaz (${ssrInterpolate(product.link.length)}/500)</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="ml-4 flex items-center gap-2"${_scopeId}><button type="button" class="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg></button><button type="button" class="rounded-lg p-2 text-destructive hover:bg-destructive/10"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (hasAnyProductError.value) {
              _push2(`<div class="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"${_scopeId}> Bazı ürünlerde hata var. Lütfen düzeltin. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/workspace",
              class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` İptal `);
                } else {
                  return [
                    createTextVNode(" İptal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing || hasAnyProductError.value) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
            ssrRenderTeleport(_push2, (_push3) => {
              if (showProductModal.value) {
                _push3(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"${_scopeId}><div class="w-full max-w-md rounded-xl bg-card p-6 shadow-xl"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(editingProductIndex.value !== null ? "Ürünü Düzenle" : "Yeni Ürün")}</h3><button class="text-muted-foreground hover:text-foreground"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>İsim <span class="text-destructive"${_scopeId}>*</span></label><input${ssrRenderAttr("value", productForm.value.name)} type="text" maxlength="255" placeholder="Ürün adı" class="${ssrRenderClass([{ "border-destructive": productForm.value.name.length > 255 }, "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}"${_scopeId}><p class="${ssrRenderClass([productForm.value.name.length > 255 ? "text-destructive" : "text-muted-foreground", "mt-1 text-xs"])}"${_scopeId}>${ssrInterpolate(productForm.value.name.length)}/255 </p></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Özellikler</label><textarea rows="3" placeholder="Ürün özellikleri..." class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}>${ssrInterpolate(productForm.value.features)}</textarea></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Satın Alma Linki</label><input${ssrRenderAttr("value", productForm.value.link)} type="url" maxlength="500" placeholder="https://..." class="${ssrRenderClass([{ "border-destructive": productForm.value.link && !isValidUrl(productForm.value.link) || productForm.value.link.length > 500 }, "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}"${_scopeId}><p class="${ssrRenderClass([productForm.value.link.length > 500 ? "text-destructive" : "text-muted-foreground", "mt-1 text-xs"])}"${_scopeId}>${ssrInterpolate(productForm.value.link.length)}/500 `);
                if (productForm.value.link && !isValidUrl(productForm.value.link)) {
                  _push3(`<span class="text-destructive"${_scopeId}> - Geçersiz URL</span>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</p></div></div><div class="mt-6 flex justify-end gap-3"${_scopeId}><button class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"${_scopeId}> İptal </button><button${ssrIncludeBooleanAttr(!productForm.value.name || productForm.value.name.length > 255 || productForm.value.link && (!isValidUrl(productForm.value.link) || productForm.value.link.length > 500)) ? " disabled" : ""} class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId}>${ssrInterpolate(editingProductIndex.value !== null ? "Güncelle" : "Ekle")}</button></div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
            ssrRenderTeleport(_push2, (_push3) => {
              if (showDeleteConfirm.value) {
                _push3(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"${_scopeId}><div class="w-full max-w-sm rounded-xl bg-card p-6 shadow-xl"${_scopeId}><h3 class="mb-2 text-lg font-semibold text-foreground"${_scopeId}>Ürünü Sil</h3><p class="mb-4 text-sm text-muted-foreground"${_scopeId}> &quot;${ssrInterpolate(deleteProductName.value)}&quot; ürününü silmek istediğinizden emin misiniz? </p><div class="flex justify-end gap-3"${_scopeId}><button class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"${_scopeId}> İptal </button><button class="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"${_scopeId}> Sil </button></div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode("div", { class: "space-y-6 py-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold text-foreground" }, "Yeni Çalışma Alanı"),
                  createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Çalışma alanınızı ve ürünlerinizi ekleyin")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold text-foreground" }, "Görseller"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("label", { class: "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-8 transition-colors hover:border-primary" }, [
                        (openBlock(), createBlock("svg", {
                          class: "mb-2 h-10 w-10 text-muted-foreground",
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
                        ])),
                        createVNode("span", { class: "text-sm font-medium text-foreground" }, "Resim Yükle"),
                        createVNode("span", { class: "mt-1 text-xs text-muted-foreground" }, "PNG, JPG, WEBP - max 5MB"),
                        createVNode("input", {
                          type: "file",
                          accept: "image/*",
                          multiple: "",
                          class: "hidden",
                          onChange: handleImagesChange
                        }, null, 32)
                      ]),
                      imagePreviews.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "group relative aspect-video overflow-hidden rounded-lg ring-1 ring-border"
                          }, [
                            createVNode("img", {
                              src: preview,
                              alt: "Preview",
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeImage(index),
                              class: "absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
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
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold text-foreground" }, "Durum"),
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("label", { class: "flex cursor-pointer items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          value: "published",
                          class: "h-4 w-4 border-input text-primary focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(form).status]
                        ]),
                        createVNode("span", { class: "text-sm text-foreground" }, "Yayınla")
                      ]),
                      createVNode("label", { class: "flex cursor-pointer items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          value: "draft",
                          class: "h-4 w-4 border-input text-primary focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(form).status]
                        ]),
                        createVNode("span", { class: "text-sm text-foreground" }, "Taslak")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                    createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Ürünler"),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => openProductModal(),
                        class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Ürün Ekle ")
                      ], 8, ["onClick"])
                    ]),
                    unref(form).products.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg border border-dashed border-border py-8 text-center"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Henüz ürün eklenmedi")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).products, (product, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: ["flex items-center justify-between rounded-lg border border-border bg-background p-4", { "border-destructive": hasProductError(index) }]
                        }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", { class: "font-medium text-foreground" }, toDisplayString(product.name), 1),
                            product.features ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 truncate text-sm text-muted-foreground"
                            }, toDisplayString(product.features), 1)) : createCommentVNode("", true),
                            product.link ? (openBlock(), createBlock("a", {
                              key: 1,
                              href: product.link,
                              target: "_blank",
                              class: "mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            }, [
                              createVNode("span", null, "Link"),
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                })
                              ]))
                            ], 8, ["href"])) : createCommentVNode("", true),
                            hasProductError(index) ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "mt-2 text-xs text-destructive"
                            }, [
                              product.name.length > 255 ? (openBlock(), createBlock("p", { key: 0 }, "İsim 255 karakteri aşamaz (" + toDisplayString(product.name.length) + "/255)", 1)) : createCommentVNode("", true),
                              product.link && !isValidUrl(product.link) ? (openBlock(), createBlock("p", { key: 1 }, "Geçersiz URL formatı")) : createCommentVNode("", true),
                              product.link && product.link.length > 500 ? (openBlock(), createBlock("p", { key: 2 }, "Link 500 karakteri aşamaz (" + toDisplayString(product.link.length) + "/500)", 1)) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "ml-4 flex items-center gap-2" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => openProductModal(index),
                              class: "rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
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
                                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                })
                              ]))
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => confirmRemoveProduct(index),
                              class: "rounded-lg p-2 text-destructive hover:bg-destructive/10"
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
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])
                        ], 2);
                      }), 128))
                    ])),
                    hasAnyProductError.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                    }, " Bazı ürünlerde hata var. Lütfen düzeltin. ")) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                    createVNode(unref(Link), {
                      href: "/workspace",
                      class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing || hasAnyProductError.value,
                      class: "rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
                  ])
                ], 32)
              ]),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                showProductModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
                  onClick: withModifiers(closeProductModal, ["self"])
                }, [
                  createVNode("div", { class: "w-full max-w-md rounded-xl bg-card p-6 shadow-xl" }, [
                    createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-foreground" }, toDisplayString(editingProductIndex.value !== null ? "Ürünü Düzenle" : "Yeni Ürün"), 1),
                      createVNode("button", {
                        onClick: closeProductModal,
                        class: "text-muted-foreground hover:text-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5",
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
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                          createTextVNode("İsim "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => productForm.value.name = $event,
                          type: "text",
                          maxlength: "255",
                          placeholder: "Ürün adı",
                          class: ["w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary", { "border-destructive": productForm.value.name.length > 255 }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, productForm.value.name]
                        ]),
                        createVNode("p", {
                          class: ["mt-1 text-xs", productForm.value.name.length > 255 ? "text-destructive" : "text-muted-foreground"]
                        }, toDisplayString(productForm.value.name.length) + "/255 ", 3)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Özellikler"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => productForm.value.features = $event,
                          rows: "3",
                          placeholder: "Ürün özellikleri...",
                          class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, productForm.value.features]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Satın Alma Linki"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => productForm.value.link = $event,
                          type: "url",
                          maxlength: "500",
                          placeholder: "https://...",
                          class: ["w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary", { "border-destructive": productForm.value.link && !isValidUrl(productForm.value.link) || productForm.value.link.length > 500 }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, productForm.value.link]
                        ]),
                        createVNode("p", {
                          class: ["mt-1 text-xs", productForm.value.link.length > 500 ? "text-destructive" : "text-muted-foreground"]
                        }, [
                          createTextVNode(toDisplayString(productForm.value.link.length) + "/500 ", 1),
                          productForm.value.link && !isValidUrl(productForm.value.link) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-destructive"
                          }, " - Geçersiz URL")) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 flex justify-end gap-3" }, [
                      createVNode("button", {
                        onClick: closeProductModal,
                        class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                      }, " İptal "),
                      createVNode("button", {
                        onClick: saveProduct,
                        disabled: !productForm.value.name || productForm.value.name.length > 255 || productForm.value.link && (!isValidUrl(productForm.value.link) || productForm.value.link.length > 500),
                        class: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      }, toDisplayString(editingProductIndex.value !== null ? "Güncelle" : "Ekle"), 9, ["disabled"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                showDeleteConfirm.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
                  onClick: withModifiers(($event) => showDeleteConfirm.value = false, ["self"])
                }, [
                  createVNode("div", { class: "w-full max-w-sm rounded-xl bg-card p-6 shadow-xl" }, [
                    createVNode("h3", { class: "mb-2 text-lg font-semibold text-foreground" }, "Ürünü Sil"),
                    createVNode("p", { class: "mb-4 text-sm text-muted-foreground" }, ' "' + toDisplayString(deleteProductName.value) + '" ürününü silmek istediğinizden emin misiniz? ', 1),
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode("button", {
                        onClick: ($event) => showDeleteConfirm.value = false,
                        class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                      }, " İptal ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: removeProduct,
                        class: "rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                      }, " Sil ")
                    ])
                  ])
                ], 8, ["onClick"])) : createCommentVNode("", true)
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Workspace/CreateWorkspace.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
