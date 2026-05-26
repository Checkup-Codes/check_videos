import { defineComponent, ref, computed, onMounted, unref, withCtx, createVNode, withModifiers, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, createCommentVNode, createTextVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import Sortable from "sortablejs";
import axios from "axios";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
import { _ as _sfc_main$2 } from "./PageShell-DjZZ5koh.js";
import { _ as _sfc_main$3 } from "./PageHeader-FZ8QTap0.js";
import { _ as _sfc_main$4 } from "./ZoomableImage-iVeXa9el.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const inputClass = "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
const primaryBtnClass = "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    writes: {},
    uploadedImages: {},
    categories: {},
    sources: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      category: "base",
      related_id: null,
      images: [],
      processing: false
    });
    const previewImages = ref([]);
    const imageUploadError = ref(null);
    const uploadSuccess = ref(false);
    const uploadedImages = ref(props.uploadedImages);
    const selectedCategory = ref("");
    const selectedSource = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const allCategories = computed(() => {
      const cats = { ...props.categories };
      cats["journey"] = "Yolculuk";
      cats["workspace"] = "Çalışma Alanı";
      cats["certificates"] = "Sertifikalar";
      cats["seo"] = "SEO";
      return cats;
    });
    const filteredImages = computed(() => {
      let images = uploadedImages.value;
      if (selectedSource.value) {
        images = images.filter((img) => img.source === selectedSource.value);
      }
      if (selectedCategory.value) {
        images = images.filter((img) => img.category === selectedCategory.value);
      }
      return images;
    });
    const getSourceBadgeClass = (source) => {
      const classes = {
        write_images: "border-primary/30 bg-primary/10 text-primary",
        journey: "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300",
        workspace: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        seo: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300"
      };
      return classes[source] || "border-border bg-muted text-muted-foreground";
    };
    const handleImageUpload = (event) => {
      const input = event.target;
      if (input.files) {
        Array.from(input.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            var _a;
            previewImages.value.push({
              file,
              preview: (_a = e.target) == null ? void 0 : _a.result,
              title: file.name,
              alt_text: file.name
            });
            form.value.images.push(file);
          };
          reader.readAsDataURL(file);
        });
      }
      input.value = "";
    };
    const submitImages = async () => {
      var _a, _b;
      form.value.processing = true;
      imageUploadError.value = null;
      const formData = new FormData();
      formData.append("category", form.value.category);
      if (form.value.related_id) {
        formData.append("related_id", form.value.related_id);
      }
      form.value.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
        formData.append(`titles[${index}]`, previewImages.value[index].title);
        formData.append(`alt_texts[${index}]`, previewImages.value[index].alt_text);
      });
      try {
        const response = await axios.post(route("write-images.store"), formData, {
          headers: { "Content-Type": "multipart/form-data", "X-Requested-With": "XMLHttpRequest" }
        });
        const newImages = response.data.images.map((img) => ({
          id: img.id,
          source: "write_images",
          source_label: "Medya",
          category: img.category,
          category_label: props.categories[img.category] || img.category,
          image_path: img.image_path,
          full_url: img.full_url,
          title: img.title,
          alt_text: img.alt_text,
          related_title: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          deletable: true,
          editable: true
        }));
        uploadedImages.value = [...newImages, ...uploadedImages.value];
        previewImages.value = [];
        form.value.images = [];
        form.value.related_id = null;
        uploadSuccess.value = true;
        setTimeout(() => {
          uploadSuccess.value = false;
        }, 3e3);
      } catch (error) {
        imageUploadError.value = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resimler yüklenirken bir hata oluştu.";
      } finally {
        form.value.processing = false;
      }
    };
    const deleteImage = async (imageId) => {
      var _a, _b;
      try {
        await axios.delete(route("write-images.destroy", imageId));
        uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId);
        showToastMessage("Resim silindi");
      } catch (error) {
        showToastMessage(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resim silinirken bir hata oluştu.");
      }
    };
    const removePreviewImage = (index) => {
      previewImages.value.splice(index, 1);
      form.value.images.splice(index, 1);
    };
    const showToastMessage = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3e3);
    };
    const copyImagePath = async (url) => {
      try {
        await navigator.clipboard.writeText(url);
        showToastMessage("URL kopyalandı");
      } catch {
        showToastMessage("Kopyalama başarısız");
      }
    };
    const updateImage = async (image) => {
      var _a, _b;
      if (!image.editable) return;
      try {
        await axios.put(route("write-images.update", image.id), {
          title: image.title,
          alt_text: image.alt_text
        });
        showToastMessage("Güncellendi");
      } catch (error) {
        showToastMessage(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Güncelleme başarısız");
      }
    };
    onMounted(() => {
      const previewContainer = document.querySelector(".preview-container");
      if (previewContainer instanceof HTMLElement) {
        new Sortable(previewContainer, {
          animation: 150,
          onEnd(evt) {
            if (typeof evt.oldIndex === "number" && typeof evt.newIndex === "number") {
              const items = [...previewImages.value];
              const movedItem = items[evt.oldIndex];
              items.splice(evt.oldIndex, 1);
              items.splice(evt.newIndex, 0, movedItem);
              previewImages.value = items;
              form.value.images = previewImages.value.map((item) => item.file);
            }
          }
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Medya Yönetimi" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              width: "wide",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Medya Yönetimi",
                    description: "Tüm görselleri yükleyin, düzenleyin ve yönetin"
                  }, null, _parent3, _scopeId2));
                  _push3(`<section class="rounded-lg border border-border bg-card"${_scopeId2}><div class="border-b border-border px-4 py-3 sm:px-6"${_scopeId2}><h2 class="text-sm font-semibold text-foreground"${_scopeId2}>Resim Yükle</h2></div><div class="p-4 sm:p-6"${_scopeId2}><form class="space-y-5"${_scopeId2}><div class="space-y-2"${_scopeId2}><label for="category" class="text-xs font-medium text-foreground"${_scopeId2}>Kategori</label><select id="category" class="${ssrRenderClass(inputClass)}"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.categories, (name, value) => {
                    _push3(`<option${ssrRenderAttr("value", value)}${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, value) : ssrLooseEqual(form.value.category, value)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="space-y-2"${_scopeId2}><span class="text-xs font-medium text-foreground"${_scopeId2}>Dosyalar</span><label class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-primary/40 hover:bg-muted/50"${_scopeId2}><svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span class="mt-2 text-sm font-medium text-foreground"${_scopeId2}>Resim seç veya sürükle</span><span class="mt-1 text-xs text-muted-foreground"${_scopeId2}>PNG, JPG, GIF, WEBP — en fazla 5MB</span><input id="images" type="file" multiple accept="image/*" class="sr-only"${_scopeId2}></label></div>`);
                  if (previewImages.value.length > 0) {
                    _push3(`<div class="preview-container space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(previewImages.value, (image, index) => {
                      _push3(`<div class="rounded-lg border border-border bg-muted/20 p-4"${_scopeId2}><div class="flex gap-4"${_scopeId2}><div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border"${_scopeId2}><img${ssrRenderAttr("src", image.preview)} class="h-full w-full object-cover"${ssrRenderAttr("alt", `Önizleme ${index + 1}`)}${_scopeId2}><button type="button" class="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-muted-foreground shadow-sm hover:text-destructive"${_scopeId2}><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId2}></path></svg></button></div><div class="grid min-w-0 flex-1 gap-3 sm:grid-cols-2"${_scopeId2}><div class="space-y-1.5"${_scopeId2}><label class="text-xs font-medium text-foreground"${_scopeId2}>Başlık</label><input${ssrRenderAttr("value", image.title)} type="text" class="${ssrRenderClass(inputClass)}" placeholder="Resim başlığı"${_scopeId2}></div><div class="space-y-1.5"${_scopeId2}><label class="text-xs font-medium text-foreground"${_scopeId2}>Alt metin</label><input${ssrRenderAttr("value", image.alt_text)} type="text" class="${ssrRenderClass(inputClass)}" placeholder="Açıklama"${_scopeId2}></div></div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (imageUploadError.value) {
                    _push3(`<div class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(imageUploadError.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (uploadSuccess.value) {
                    _push3(`<div class="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400"${_scopeId2}> Resimler başarıyla yüklendi. </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex justify-end"${_scopeId2}><button type="submit"${ssrIncludeBooleanAttr(form.value.processing || !form.value.images.length) ? " disabled" : ""} class="${ssrRenderClass(primaryBtnClass)}"${_scopeId2}>`);
                  if (form.value.processing) {
                    _push3(`<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"${_scopeId2}></path></svg>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(form.value.processing ? "Yükleniyor..." : "Yükle")}</button></div></form></div></section><section class="rounded-lg border border-border bg-card"${_scopeId2}><div class="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6"${_scopeId2}><div${_scopeId2}><h2 class="text-sm font-semibold text-foreground"${_scopeId2}>Tüm Resimler</h2><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(filteredImages.value.length)} kayıt</p></div><div class="flex flex-wrap gap-2"${_scopeId2}><select class="${ssrRenderClass([inputClass, "w-auto min-w-[140px]"])}"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedSource.value) ? ssrLooseContain(selectedSource.value, "") : ssrLooseEqual(selectedSource.value, "")) ? " selected" : ""}${_scopeId2}>Tüm kaynaklar</option><!--[-->`);
                  ssrRenderList(__props.sources, (name, value) => {
                    _push3(`<option${ssrRenderAttr("value", value)}${ssrIncludeBooleanAttr(Array.isArray(selectedSource.value) ? ssrLooseContain(selectedSource.value, value) : ssrLooseEqual(selectedSource.value, value)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select><select class="${ssrRenderClass([inputClass, "w-auto min-w-[140px]"])}"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}${_scopeId2}>Tüm kategoriler</option><!--[-->`);
                  ssrRenderList(allCategories.value, (name, value) => {
                    _push3(`<option${ssrRenderAttr("value", value)}${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, value) : ssrLooseEqual(selectedCategory.value, value)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(name)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div><div class="p-4 sm:p-6"${_scopeId2}>`);
                  if (filteredImages.value.length > 0) {
                    _push3(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"${_scopeId2}><!--[-->`);
                    ssrRenderList(filteredImages.value, (image, imageIndex) => {
                      _push3(`<div class="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$4, {
                        src: image.image_path,
                        alt: image.alt_text || image.title || "",
                        gallery: filteredImages.value,
                        index: imageIndex,
                        "wrapper-class": "h-full w-full",
                        "img-class": "h-full w-full object-cover"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="pointer-events-none absolute left-2 top-2"${_scopeId2}><span class="${ssrRenderClass(["inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", getSourceBadgeClass(image.source)])}"${_scopeId2}>${ssrInterpolate(image.source_label)}</span></div><div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-2 pb-2 pt-6 opacity-100 transition-opacity group-hover:opacity-0"${_scopeId2}><p class="truncate text-xs font-medium text-foreground"${_scopeId2}>${ssrInterpolate(image.title)}</p><p class="truncate text-[10px] text-muted-foreground"${_scopeId2}>${ssrInterpolate(image.category_label)}</p></div><div class="absolute inset-0 flex flex-col bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100"${_scopeId2}>`);
                      if (image.editable) {
                        _push3(`<div class="min-h-0 flex-1 space-y-2 overflow-y-auto"${_scopeId2}><div class="space-y-1"${_scopeId2}><label class="text-[10px] font-medium text-muted-foreground"${_scopeId2}>Başlık</label><input${ssrRenderAttr("value", image.title)} type="text" class="${ssrRenderClass([inputClass, "h-8 text-xs"])}"${_scopeId2}></div><div class="space-y-1"${_scopeId2}><label class="text-[10px] font-medium text-muted-foreground"${_scopeId2}>Alt metin</label><input${ssrRenderAttr("value", image.alt_text)} type="text" class="${ssrRenderClass([inputClass, "h-8 text-xs"])}"${_scopeId2}></div></div>`);
                      } else {
                        _push3(`<div class="min-h-0 flex-1 overflow-y-auto"${_scopeId2}><p class="text-xs font-medium text-foreground"${_scopeId2}>${ssrInterpolate(image.title)}</p>`);
                        if (image.related_title) {
                          _push3(`<p class="mt-0.5 text-[10px] text-muted-foreground"${_scopeId2}>${ssrInterpolate(image.related_title)}</p>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<p class="mt-2 text-[10px] text-muted-foreground"${_scopeId2}>${ssrInterpolate(image.source_label)} üzerinden yönetilir</p></div>`);
                      }
                      _push3(`<div class="mt-2 flex justify-end gap-1 pt-2"${_scopeId2}><button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" title="URL kopyala"${_scopeId2}><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId2}></path></svg></button>`);
                      if (image.deletable) {
                        _push3(`<button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20" title="Sil"${_scopeId2}><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId2}></path></svg></button>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-12 text-center"${_scopeId2}><svg class="h-10 w-10 text-muted-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><p class="mt-3 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(selectedSource.value || selectedCategory.value ? "Bu filtreye uygun resim yok." : "Henüz resim yüklenmemiş.")}</p></div>`);
                  }
                  _push3(`</div></section>`);
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      title: "Medya Yönetimi",
                      description: "Tüm görselleri yükleyin, düzenleyin ve yönetin"
                    }),
                    createVNode("section", { class: "rounded-lg border border-border bg-card" }, [
                      createVNode("div", { class: "border-b border-border px-4 py-3 sm:px-6" }, [
                        createVNode("h2", { class: "text-sm font-semibold text-foreground" }, "Resim Yükle")
                      ]),
                      createVNode("div", { class: "p-4 sm:p-6" }, [
                        createVNode("form", {
                          class: "space-y-5",
                          onSubmit: withModifiers(submitImages, ["prevent"])
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", {
                              for: "category",
                              class: "text-xs font-medium text-foreground"
                            }, "Kategori"),
                            withDirectives(createVNode("select", {
                              id: "category",
                              "onUpdate:modelValue": ($event) => form.value.category = $event,
                              class: inputClass
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (name, value) => {
                                return openBlock(), createBlock("option", {
                                  key: value,
                                  value
                                }, toDisplayString(name), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, form.value.category]
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("span", { class: "text-xs font-medium text-foreground" }, "Dosyalar"),
                            createVNode("label", { class: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-primary/40 hover:bg-muted/50" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-8 w-8 text-muted-foreground",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])),
                              createVNode("span", { class: "mt-2 text-sm font-medium text-foreground" }, "Resim seç veya sürükle"),
                              createVNode("span", { class: "mt-1 text-xs text-muted-foreground" }, "PNG, JPG, GIF, WEBP — en fazla 5MB"),
                              createVNode("input", {
                                id: "images",
                                type: "file",
                                multiple: "",
                                accept: "image/*",
                                class: "sr-only",
                                onChange: handleImageUpload
                              }, null, 32)
                            ])
                          ]),
                          previewImages.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "preview-container space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(previewImages.value, (image, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "rounded-lg border border-border bg-muted/20 p-4"
                              }, [
                                createVNode("div", { class: "flex gap-4" }, [
                                  createVNode("div", { class: "relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border" }, [
                                    createVNode("img", {
                                      src: image.preview,
                                      class: "h-full w-full object-cover",
                                      alt: `Önizleme ${index + 1}`
                                    }, null, 8, ["src", "alt"]),
                                    createVNode("button", {
                                      type: "button",
                                      class: "absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-muted-foreground shadow-sm hover:text-destructive",
                                      onClick: ($event) => removePreviewImage(index)
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "h-3.5 w-3.5",
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
                                  ]),
                                  createVNode("div", { class: "grid min-w-0 flex-1 gap-3 sm:grid-cols-2" }, [
                                    createVNode("div", { class: "space-y-1.5" }, [
                                      createVNode("label", { class: "text-xs font-medium text-foreground" }, "Başlık"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => image.title = $event,
                                        type: "text",
                                        class: inputClass,
                                        placeholder: "Resim başlığı"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, image.title]
                                      ])
                                    ]),
                                    createVNode("div", { class: "space-y-1.5" }, [
                                      createVNode("label", { class: "text-xs font-medium text-foreground" }, "Alt metin"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                        type: "text",
                                        class: inputClass,
                                        placeholder: "Açıklama"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, image.alt_text]
                                      ])
                                    ])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          imageUploadError.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                          }, toDisplayString(imageUploadError.value), 1)) : createCommentVNode("", true),
                          uploadSuccess.value ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400"
                          }, " Resimler başarıyla yüklendi. ")) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-end" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: form.value.processing || !form.value.images.length,
                              class: primaryBtnClass
                            }, [
                              form.value.processing ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "h-4 w-4 animate-spin",
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
                                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                })
                              ])) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(form.value.processing ? "Yükleniyor..." : "Yükle"), 1)
                            ], 8, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ]),
                    createVNode("section", { class: "rounded-lg border border-border bg-card" }, [
                      createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-sm font-semibold text-foreground" }, "Tüm Resimler"),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(filteredImages.value.length) + " kayıt", 1)
                        ]),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => selectedSource.value = $event,
                            class: [inputClass, "w-auto min-w-[140px]"]
                          }, [
                            createVNode("option", { value: "" }, "Tüm kaynaklar"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sources, (name, value) => {
                              return openBlock(), createBlock("option", {
                                key: value,
                                value
                              }, toDisplayString(name), 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, selectedSource.value]
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
                            class: [inputClass, "w-auto min-w-[140px]"]
                          }, [
                            createVNode("option", { value: "" }, "Tüm kategoriler"),
                            (openBlock(true), createBlock(Fragment, null, renderList(allCategories.value, (name, value) => {
                              return openBlock(), createBlock("option", {
                                key: value,
                                value
                              }, toDisplayString(name), 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, selectedCategory.value]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "p-4 sm:p-6" }, [
                        filteredImages.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (image, imageIndex) => {
                            return openBlock(), createBlock("div", {
                              key: image.id,
                              class: "group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20"
                            }, [
                              createVNode(_sfc_main$4, {
                                src: image.image_path,
                                alt: image.alt_text || image.title || "",
                                gallery: filteredImages.value,
                                index: imageIndex,
                                "wrapper-class": "h-full w-full",
                                "img-class": "h-full w-full object-cover"
                              }, null, 8, ["src", "alt", "gallery", "index"]),
                              createVNode("div", { class: "pointer-events-none absolute left-2 top-2" }, [
                                createVNode("span", {
                                  class: ["inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", getSourceBadgeClass(image.source)]
                                }, toDisplayString(image.source_label), 3)
                              ]),
                              createVNode("div", { class: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-2 pb-2 pt-6 opacity-100 transition-opacity group-hover:opacity-0" }, [
                                createVNode("p", { class: "truncate text-xs font-medium text-foreground" }, toDisplayString(image.title), 1),
                                createVNode("p", { class: "truncate text-[10px] text-muted-foreground" }, toDisplayString(image.category_label), 1)
                              ]),
                              createVNode("div", { class: "absolute inset-0 flex flex-col bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100" }, [
                                image.editable ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "min-h-0 flex-1 space-y-2 overflow-y-auto"
                                }, [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("label", { class: "text-[10px] font-medium text-muted-foreground" }, "Başlık"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.title = $event,
                                      type: "text",
                                      class: [inputClass, "h-8 text-xs"],
                                      onChange: ($event) => updateImage(image)
                                    }, null, 42, ["onUpdate:modelValue", "onChange"]), [
                                      [vModelText, image.title]
                                    ])
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("label", { class: "text-[10px] font-medium text-muted-foreground" }, "Alt metin"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                      type: "text",
                                      class: [inputClass, "h-8 text-xs"],
                                      onChange: ($event) => updateImage(image)
                                    }, null, 42, ["onUpdate:modelValue", "onChange"]), [
                                      [vModelText, image.alt_text]
                                    ])
                                  ])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "min-h-0 flex-1 overflow-y-auto"
                                }, [
                                  createVNode("p", { class: "text-xs font-medium text-foreground" }, toDisplayString(image.title), 1),
                                  image.related_title ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-0.5 text-[10px] text-muted-foreground"
                                  }, toDisplayString(image.related_title), 1)) : createCommentVNode("", true),
                                  createVNode("p", { class: "mt-2 text-[10px] text-muted-foreground" }, toDisplayString(image.source_label) + " üzerinden yönetilir", 1)
                                ])),
                                createVNode("div", { class: "mt-2 flex justify-end gap-1 pt-2" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                                    title: "URL kopyala",
                                    onClick: ($event) => copyImagePath(image.full_url)
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3.5 w-3.5",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      })
                                    ]))
                                  ], 8, ["onClick"]),
                                  image.deletable ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    class: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20",
                                    title: "Sil",
                                    onClick: ($event) => deleteImage(image.id)
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3.5 w-3.5",
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
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-12 text-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-10 w-10 text-muted-foreground/60",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ])),
                          createVNode("p", { class: "mt-3 text-sm text-muted-foreground" }, toDisplayString(selectedSource.value || selectedCategory.value ? "Bu filtreye uygun resim yok." : "Henüz resim yüklenmemiş."), 1)
                        ]))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(``);
            if (showToast.value) {
              _push2(`<div class="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-popover px-4 py-2.5 text-sm text-popover-foreground shadow-lg"${_scopeId}><svg class="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> ${ssrInterpolate(toastMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, {
                width: "wide",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    title: "Medya Yönetimi",
                    description: "Tüm görselleri yükleyin, düzenleyin ve yönetin"
                  }),
                  createVNode("section", { class: "rounded-lg border border-border bg-card" }, [
                    createVNode("div", { class: "border-b border-border px-4 py-3 sm:px-6" }, [
                      createVNode("h2", { class: "text-sm font-semibold text-foreground" }, "Resim Yükle")
                    ]),
                    createVNode("div", { class: "p-4 sm:p-6" }, [
                      createVNode("form", {
                        class: "space-y-5",
                        onSubmit: withModifiers(submitImages, ["prevent"])
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", {
                            for: "category",
                            class: "text-xs font-medium text-foreground"
                          }, "Kategori"),
                          withDirectives(createVNode("select", {
                            id: "category",
                            "onUpdate:modelValue": ($event) => form.value.category = $event,
                            class: inputClass
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (name, value) => {
                              return openBlock(), createBlock("option", {
                                key: value,
                                value
                              }, toDisplayString(name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.value.category]
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("span", { class: "text-xs font-medium text-foreground" }, "Dosyalar"),
                          createVNode("label", { class: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-primary/40 hover:bg-muted/50" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-8 w-8 text-muted-foreground",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            createVNode("span", { class: "mt-2 text-sm font-medium text-foreground" }, "Resim seç veya sürükle"),
                            createVNode("span", { class: "mt-1 text-xs text-muted-foreground" }, "PNG, JPG, GIF, WEBP — en fazla 5MB"),
                            createVNode("input", {
                              id: "images",
                              type: "file",
                              multiple: "",
                              accept: "image/*",
                              class: "sr-only",
                              onChange: handleImageUpload
                            }, null, 32)
                          ])
                        ]),
                        previewImages.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "preview-container space-y-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(previewImages.value, (image, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "rounded-lg border border-border bg-muted/20 p-4"
                            }, [
                              createVNode("div", { class: "flex gap-4" }, [
                                createVNode("div", { class: "relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border" }, [
                                  createVNode("img", {
                                    src: image.preview,
                                    class: "h-full w-full object-cover",
                                    alt: `Önizleme ${index + 1}`
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-muted-foreground shadow-sm hover:text-destructive",
                                    onClick: ($event) => removePreviewImage(index)
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3.5 w-3.5",
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
                                ]),
                                createVNode("div", { class: "grid min-w-0 flex-1 gap-3 sm:grid-cols-2" }, [
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode("label", { class: "text-xs font-medium text-foreground" }, "Başlık"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.title = $event,
                                      type: "text",
                                      class: inputClass,
                                      placeholder: "Resim başlığı"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, image.title]
                                    ])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode("label", { class: "text-xs font-medium text-foreground" }, "Alt metin"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                      type: "text",
                                      class: inputClass,
                                      placeholder: "Açıklama"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, image.alt_text]
                                    ])
                                  ])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        imageUploadError.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                        }, toDisplayString(imageUploadError.value), 1)) : createCommentVNode("", true),
                        uploadSuccess.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400"
                        }, " Resimler başarıyla yüklendi. ")) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-end" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: form.value.processing || !form.value.images.length,
                            class: primaryBtnClass
                          }, [
                            form.value.processing ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "h-4 w-4 animate-spin",
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
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              })
                            ])) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(form.value.processing ? "Yükleniyor..." : "Yükle"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("section", { class: "rounded-lg border border-border bg-card" }, [
                    createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-sm font-semibold text-foreground" }, "Tüm Resimler"),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(filteredImages.value.length) + " kayıt", 1)
                      ]),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedSource.value = $event,
                          class: [inputClass, "w-auto min-w-[140px]"]
                        }, [
                          createVNode("option", { value: "" }, "Tüm kaynaklar"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.sources, (name, value) => {
                            return openBlock(), createBlock("option", {
                              key: value,
                              value
                            }, toDisplayString(name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedSource.value]
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
                          class: [inputClass, "w-auto min-w-[140px]"]
                        }, [
                          createVNode("option", { value: "" }, "Tüm kategoriler"),
                          (openBlock(true), createBlock(Fragment, null, renderList(allCategories.value, (name, value) => {
                            return openBlock(), createBlock("option", {
                              key: value,
                              value
                            }, toDisplayString(name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedCategory.value]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "p-4 sm:p-6" }, [
                      filteredImages.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (image, imageIndex) => {
                          return openBlock(), createBlock("div", {
                            key: image.id,
                            class: "group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20"
                          }, [
                            createVNode(_sfc_main$4, {
                              src: image.image_path,
                              alt: image.alt_text || image.title || "",
                              gallery: filteredImages.value,
                              index: imageIndex,
                              "wrapper-class": "h-full w-full",
                              "img-class": "h-full w-full object-cover"
                            }, null, 8, ["src", "alt", "gallery", "index"]),
                            createVNode("div", { class: "pointer-events-none absolute left-2 top-2" }, [
                              createVNode("span", {
                                class: ["inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", getSourceBadgeClass(image.source)]
                              }, toDisplayString(image.source_label), 3)
                            ]),
                            createVNode("div", { class: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-2 pb-2 pt-6 opacity-100 transition-opacity group-hover:opacity-0" }, [
                              createVNode("p", { class: "truncate text-xs font-medium text-foreground" }, toDisplayString(image.title), 1),
                              createVNode("p", { class: "truncate text-[10px] text-muted-foreground" }, toDisplayString(image.category_label), 1)
                            ]),
                            createVNode("div", { class: "absolute inset-0 flex flex-col bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100" }, [
                              image.editable ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "min-h-0 flex-1 space-y-2 overflow-y-auto"
                              }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("label", { class: "text-[10px] font-medium text-muted-foreground" }, "Başlık"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => image.title = $event,
                                    type: "text",
                                    class: [inputClass, "h-8 text-xs"],
                                    onChange: ($event) => updateImage(image)
                                  }, null, 42, ["onUpdate:modelValue", "onChange"]), [
                                    [vModelText, image.title]
                                  ])
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("label", { class: "text-[10px] font-medium text-muted-foreground" }, "Alt metin"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                    type: "text",
                                    class: [inputClass, "h-8 text-xs"],
                                    onChange: ($event) => updateImage(image)
                                  }, null, 42, ["onUpdate:modelValue", "onChange"]), [
                                    [vModelText, image.alt_text]
                                  ])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "min-h-0 flex-1 overflow-y-auto"
                              }, [
                                createVNode("p", { class: "text-xs font-medium text-foreground" }, toDisplayString(image.title), 1),
                                image.related_title ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-0.5 text-[10px] text-muted-foreground"
                                }, toDisplayString(image.related_title), 1)) : createCommentVNode("", true),
                                createVNode("p", { class: "mt-2 text-[10px] text-muted-foreground" }, toDisplayString(image.source_label) + " üzerinden yönetilir", 1)
                              ])),
                              createVNode("div", { class: "mt-2 flex justify-end gap-1 pt-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                                  title: "URL kopyala",
                                  onClick: ($event) => copyImagePath(image.full_url)
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-3.5 w-3.5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    })
                                  ]))
                                ], 8, ["onClick"]),
                                image.deletable ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  type: "button",
                                  class: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20",
                                  title: "Sil",
                                  onClick: ($event) => deleteImage(image.id)
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-3.5 w-3.5",
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
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-12 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-10 w-10 text-muted-foreground/60",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "1.5",
                            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          })
                        ])),
                        createVNode("p", { class: "mt-3 text-sm text-muted-foreground" }, toDisplayString(selectedSource.value || selectedCategory.value ? "Bu filtreye uygun resim yok." : "Henüz resim yüklenmemiş."), 1)
                      ]))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200",
                "enter-from-class": "translate-y-2 opacity-0",
                "leave-active-class": "transition-all duration-150",
                "leave-to-class": "translate-y-2 opacity-0"
              }, {
                default: withCtx(() => [
                  showToast.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-popover px-4 py-2.5 text-sm text-popover-foreground shadow-lg"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-4 w-4 text-emerald-500",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M5 13l4 4L19 7"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(toastMessage.value), 1)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Media/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
