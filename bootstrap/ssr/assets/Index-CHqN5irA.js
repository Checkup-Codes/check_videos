import { defineComponent, ref, computed, onMounted, unref, withCtx, createVNode, createBlock, createCommentVNode, withModifiers, withDirectives, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-D2X5tPi8.js";
import { Head } from "@inertiajs/vue3";
import Sortable from "sortablejs";
import axios from "axios";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    writes: {},
    uploadedImages: {},
    categories: {}
  },
  setup(__props) {
    const props = __props;
    const form = {
      category: "base",
      related_id: "",
      images: [],
      processing: false
    };
    const previewImages = ref([]);
    const imageUploadError = ref(null);
    const uploadSuccess = ref(false);
    const uploadedImages = ref(props.uploadedImages);
    const selectedCategory = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const filteredImages = computed(() => {
      if (!selectedCategory.value) {
        return uploadedImages.value;
      }
      return uploadedImages.value.filter((img) => img.category === selectedCategory.value);
    });
    const handleImageUpload = (event) => {
      var _a;
      const input = event.target;
      if (!((_a = input.files) == null ? void 0 : _a.length)) return;
      const files = Array.from(input.files);
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          imageUploadError.value = "Lütfen sadece resim dosyaları yükleyin.";
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          imageUploadError.value = "Resim boyutu 5MB'dan küçük olmalıdır.";
          return;
        }
      }
      imageUploadError.value = null;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          var _a2;
          if ((_a2 = e.target) == null ? void 0 : _a2.result) {
            previewImages.value.push({
              file,
              preview: e.target.result
            });
          }
        };
        reader.readAsDataURL(file);
      });
      form.images = [...form.images, ...files];
    };
    const submitImages = async () => {
      var _a, _b;
      if (form.category === "writes" && !form.related_id) {
        form.related_id = null;
      }
      form.processing = true;
      const formData = new FormData();
      formData.append("category", form.category);
      if (form.related_id) {
        formData.append("related_id", form.related_id);
      }
      form.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
      try {
        const response = await axios.post(route("write-images.store"), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        uploadedImages.value = [...uploadedImages.value, ...response.data.images];
        previewImages.value = [];
        form.images = [];
        form.related_id = null;
        uploadSuccess.value = true;
        setTimeout(() => {
          uploadSuccess.value = false;
        }, 3e3);
      } catch (error) {
        const message = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resimler yüklenirken bir hata oluştu.";
        imageUploadError.value = message;
      } finally {
        form.processing = false;
      }
    };
    const deleteImage = async (imageId) => {
      var _a, _b;
      try {
        await axios.delete(route("write-images.destroy", imageId));
        uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId);
      } catch (error) {
        const message = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resim silinirken bir hata oluştu.";
        imageUploadError.value = message;
      }
    };
    const removePreviewImage = (index) => {
      previewImages.value.splice(index, 1);
      form.images.splice(index, 1);
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
              form.images = previewImages.value.map((item) => item.file);
            }
          }
        });
      }
    });
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
        showToastMessage("Resim URL'si kopyalandı!");
      } catch (err) {
        showToastMessage("Resim URL'si kopyalanırken bir hata oluştu.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Medya Yönetimi" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}>Medya Yönetimi</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, "Medya Yönetimi")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}>Resim Yükleme</h3></div><div class="p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Kategori </label><select id="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.categories, (name, value) => {
              _push2(`<option${ssrRenderAttr("value", value)}${_scopeId}>${ssrInterpolate(name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
            if (form.category === "writes") {
              _push2(`<div${_scopeId}><label for="related_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Yazı Seçin </label><select id="related_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.related_id) ? ssrLooseContain(form.related_id, "") : ssrLooseEqual(form.related_id, "")) ? " selected" : ""}${_scopeId}>Yazı Seçin (Opsiyonel)</option><!--[-->`);
              ssrRenderList(_ctx.writes, (write) => {
                _push2(`<option${ssrRenderAttr("value", write.id)}${_scopeId}>${ssrInterpolate(write.title)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Resimler </label><div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600"${_scopeId}><div class="space-y-1 text-center"${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"${_scopeId}><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg><div class="flex text-sm text-gray-600 dark:text-gray-400"${_scopeId}><label for="images" class="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 dark:bg-gray-800 dark:text-blue-400"${_scopeId}><span${_scopeId}>Resim Yükle</span><input id="images" type="file" multiple accept="image/*" class="sr-only"${_scopeId}></label><p class="pl-1"${_scopeId}>veya sürükleyip bırakın</p></div><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>PNG, JPG, GIF - max 5MB</p></div></div></div>`);
            if (previewImages.value.length > 0) {
              _push2(`<div class="preview-container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(previewImages.value, (image, index) => {
                _push2(`<div class="relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"${_scopeId}><img${ssrRenderAttr("src", image.preview)} class="h-full w-full object-cover"${ssrRenderAttr("alt", `Preview ${index + 1}`)}${_scopeId}><button type="button" class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (imageUploadError.value) {
              _push2(`<div class="rounded-md bg-red-50 p-4 dark:bg-red-900"${_scopeId}><p class="text-sm text-red-700 dark:text-red-200"${_scopeId}>${ssrInterpolate(imageUploadError.value)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (uploadSuccess.value) {
              _push2(`<div class="rounded-md bg-green-50 p-4 dark:bg-green-900"${_scopeId}><p class="text-sm text-green-700 dark:text-green-200"${_scopeId}>Resimler başarıyla yüklendi!</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(form.processing || !form.images.length) ? " disabled" : ""} class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"${_scopeId}>`);
            if (form.processing) {
              _push2(`<svg class="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(form.processing ? "Yükleniyor..." : "Resimleri Yükle")}</button></div></form></div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}>Yüklenen Resimler</h3><select class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}${_scopeId}>Tüm Kategoriler</option><!--[-->`);
            ssrRenderList(_ctx.categories, (name, value) => {
              _push2(`<option${ssrRenderAttr("value", value)}${_scopeId}>${ssrInterpolate(name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="p-6"${_scopeId}>`);
            if (filteredImages.value.length > 0) {
              _push2(`<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(filteredImages.value, (image) => {
                _push2(`<div class="relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"${_scopeId}><img${ssrRenderAttr("src", image.image_path)} class="h-full w-full object-cover"${ssrRenderAttr("alt", image.alt_text)}${_scopeId}><div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2"${_scopeId}><p class="truncate text-sm text-white"${_scopeId}>${ssrInterpolate(image.title)}</p><p class="mt-1 text-xs text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.categories[image.category])}</p></div><div class="absolute right-2 top-2 flex space-x-2"${_scopeId}><button class="rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600" title="Resim URL&#39;sini kopyala"${_scopeId}><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"${_scopeId}></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"${_scopeId}></path></svg></button><button class="rounded-full bg-red-500 p-1 text-white hover:bg-red-600" title="Resmi sil"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(selectedCategory.value ? "Bu kategoride resim bulunamadı." : "Henüz resim yüklenmemiş.")}</div>`);
            }
            _push2(`</div></div></div></div>`);
            if (showToast.value) {
              _push2(`<div class="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-800 px-4 py-2 text-white shadow-lg"${_scopeId}><div class="flex items-center"${_scopeId}><svg class="mr-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"${_scopeId}></path></svg> ${ssrInterpolate(toastMessage.value)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                    createVNode("div", { class: "border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100" }, "Resim Yükleme")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitImages, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "category",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Kategori "),
                          withDirectives(createVNode("select", {
                            id: "category",
                            "onUpdate:modelValue": ($event) => form.category = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (name, value) => {
                              return openBlock(), createBlock("option", {
                                key: value,
                                value
                              }, toDisplayString(name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.category]
                          ])
                        ]),
                        form.category === "writes" ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", {
                            for: "related_id",
                            class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                          }, " Yazı Seçin "),
                          withDirectives(createVNode("select", {
                            id: "related_id",
                            "onUpdate:modelValue": ($event) => form.related_id = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          }, [
                            createVNode("option", { value: "" }, "Yazı Seçin (Opsiyonel)"),
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.writes, (write) => {
                              return openBlock(), createBlock("option", {
                                key: write.id,
                                value: write.id
                              }, toDisplayString(write.title), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.related_id]
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, " Resimler "),
                          createVNode("div", { class: "mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600" }, [
                            createVNode("div", { class: "space-y-1 text-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "mx-auto h-12 w-12 text-gray-400",
                                stroke: "currentColor",
                                fill: "none",
                                viewBox: "0 0 48 48"
                              }, [
                                createVNode("path", {
                                  d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",
                                  "stroke-width": "2",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round"
                                })
                              ])),
                              createVNode("div", { class: "flex text-sm text-gray-600 dark:text-gray-400" }, [
                                createVNode("label", {
                                  for: "images",
                                  class: "relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 dark:bg-gray-800 dark:text-blue-400"
                                }, [
                                  createVNode("span", null, "Resim Yükle"),
                                  createVNode("input", {
                                    id: "images",
                                    type: "file",
                                    multiple: "",
                                    accept: "image/*",
                                    class: "sr-only",
                                    onChange: handleImageUpload
                                  }, null, 32)
                                ]),
                                createVNode("p", { class: "pl-1" }, "veya sürükleyip bırakın")
                              ]),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "PNG, JPG, GIF - max 5MB")
                            ])
                          ])
                        ]),
                        previewImages.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "preview-container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(previewImages.value, (image, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                            }, [
                              createVNode("img", {
                                src: image.preview,
                                class: "h-full w-full object-cover",
                                alt: `Preview ${index + 1}`
                              }, null, 8, ["src", "alt"]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removePreviewImage(index),
                                class: "absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
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
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        imageUploadError.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "rounded-md bg-red-50 p-4 dark:bg-red-900"
                        }, [
                          createVNode("p", { class: "text-sm text-red-700 dark:text-red-200" }, toDisplayString(imageUploadError.value), 1)
                        ])) : createCommentVNode("", true),
                        uploadSuccess.value ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "rounded-md bg-green-50 p-4 dark:bg-green-900"
                        }, [
                          createVNode("p", { class: "text-sm text-green-700 dark:text-green-200" }, "Resimler başarıyla yüklendi!")
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-end" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: form.processing || !form.images.length,
                            class: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
                          }, [
                            form.processing ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "-ml-1 mr-2 h-4 w-4 animate-spin",
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
                            createTextVNode(" " + toDisplayString(form.processing ? "Yükleniyor..." : "Resimleri Yükle"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800" }, [
                    createVNode("div", { class: "border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100" }, "Yüklenen Resimler"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
                          class: "rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }, [
                          createVNode("option", { value: "" }, "Tüm Kategoriler"),
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (name, value) => {
                            return openBlock(), createBlock("option", {
                              key: value,
                              value
                            }, toDisplayString(name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedCategory.value]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      filteredImages.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (image) => {
                          return openBlock(), createBlock("div", {
                            key: image.id,
                            class: "relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                          }, [
                            createVNode("img", {
                              src: image.image_path,
                              class: "h-full w-full object-cover",
                              alt: image.alt_text
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2" }, [
                              createVNode("p", { class: "truncate text-sm text-white" }, toDisplayString(image.title), 1),
                              createVNode("p", { class: "mt-1 text-xs text-gray-300" }, toDisplayString(_ctx.categories[image.category]), 1)
                            ]),
                            createVNode("div", { class: "absolute right-2 top-2 flex space-x-2" }, [
                              createVNode("button", {
                                onClick: ($event) => copyImagePath(image.full_url),
                                class: "rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600",
                                title: "Resim URL'sini kopyala"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-4 w-4",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 20 20",
                                  fill: "currentColor"
                                }, [
                                  createVNode("path", { d: "M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" }),
                                  createVNode("path", { d: "M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" })
                                ]))
                              ], 8, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => deleteImage(image.id),
                                class: "rounded-full bg-red-500 p-1 text-white hover:bg-red-600",
                                title: "Resmi sil"
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
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center text-gray-500 dark:text-gray-400"
                      }, toDisplayString(selectedCategory.value ? "Bu kategoride resim bulunamadı." : "Henüz resim yüklenmemiş."), 1))
                    ])
                  ])
                ])
              ]),
              showToast.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed bottom-4 right-4 z-50 rounded-lg bg-gray-800 px-4 py-2 text-white shadow-lg"
              }, [
                createVNode("div", { class: "flex items-center" }, [
                  (openBlock(), createBlock("svg", {
                    class: "mr-2 h-5 w-5 text-green-400",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                      "clip-rule": "evenodd"
                    })
                  ])),
                  createTextVNode(" " + toDisplayString(toastMessage.value), 1)
                ])
              ])) : createCommentVNode("", true)
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
