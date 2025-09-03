import { defineComponent, ref, computed, onMounted, unref, withCtx, createVNode, createBlock, createCommentVNode, withModifiers, withDirectives, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BVD_-FDO.js";
import { Head } from "@inertiajs/vue3";
import Sortable from "sortablejs";
import axios from "axios";
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
    const showToast = ref(false);
    const toastMessage = ref("");
    const filteredImages = computed(() => {
      if (!selectedCategory.value) {
        return uploadedImages.value;
      }
      return uploadedImages.value.filter((img) => img.category === selectedCategory.value);
    });
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
      if (form.value.category === "writes" && !form.value.related_id) {
        form.value.related_id = null;
      }
      form.value.processing = true;
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
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        uploadedImages.value = [...uploadedImages.value, ...response.data.images];
        previewImages.value = [];
        form.value.images = [];
        form.value.related_id = null;
        uploadSuccess.value = true;
        setTimeout(() => {
          uploadSuccess.value = false;
        }, 3e3);
      } catch (error) {
        const message = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resimler yüklenirken bir hata oluştu.";
        imageUploadError.value = message;
      } finally {
        form.value.processing = false;
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
      form.value.images.splice(index, 1);
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
    const updateImage = async (image) => {
      var _a, _b;
      try {
        const response = await axios.put(route("write-images.update", image.id), {
          title: image.title,
          alt_text: image.alt_text
        });
        showToastMessage("Resim bilgileri güncellendi");
        const index = uploadedImages.value.findIndex((img) => img.id === image.id);
        if (index !== -1) {
          uploadedImages.value[index] = response.data.image;
        }
      } catch (error) {
        const message = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Resim bilgileri güncellenirken bir hata oluştu.";
        showToastMessage(message);
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
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Resimler </label><div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600"${_scopeId}><div class="space-y-1 text-center"${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"${_scopeId}><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg><div class="flex text-sm text-gray-600 dark:text-gray-400"${_scopeId}><label for="images" class="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 dark:bg-gray-800 dark:text-blue-400"${_scopeId}><span${_scopeId}>Resim Yükle</span><input id="images" type="file" multiple accept="image/*" class="sr-only"${_scopeId}></label><p class="pl-1"${_scopeId}>veya sürükleyip bırakın</p></div><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>PNG, JPG, GIF - max 5MB</p></div></div></div>`);
            if (previewImages.value.length > 0) {
              _push2(`<div class="preview-container space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(previewImages.value, (image, index) => {
                _push2(`<div class="relative rounded-lg border border-gray-200 p-4 dark:border-gray-700"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="relative h-32 w-32"${_scopeId}><img${ssrRenderAttr("src", image.preview)} class="h-full w-full rounded-lg object-cover"${ssrRenderAttr("alt", `Preview ${index + 1}`)}${_scopeId}><button type="button" class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="flex-1 space-y-4"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Başlık </label><input${ssrRenderAttr("value", image.title)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" placeholder="Resim başlığı"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Alt Text </label><input${ssrRenderAttr("value", image.alt_text)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" placeholder="Resim açıklaması"${_scopeId}></div></div></div></div>`);
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
            _push2(`<div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(form.value.processing || !form.value.images.length) ? " disabled" : ""} class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"${_scopeId}>`);
            if (form.value.processing) {
              _push2(`<svg class="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(form.value.processing ? "Yükleniyor..." : "Resimleri Yükle")}</button></div></form></div></div><div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"${_scopeId}>Yüklenen Resimler</h3><select class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}${_scopeId}>Tüm Kategoriler</option><!--[-->`);
            ssrRenderList(_ctx.categories, (name, value) => {
              _push2(`<option${ssrRenderAttr("value", value)}${_scopeId}>${ssrInterpolate(name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="p-6"${_scopeId}>`);
            if (filteredImages.value.length > 0) {
              _push2(`<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(filteredImages.value, (image) => {
                _push2(`<div class="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"${_scopeId}><img${ssrRenderAttr("src", image.image_path)} class="h-full w-full object-cover"${ssrRenderAttr("alt", image.alt_text)}${_scopeId}><div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 transition-all group-hover:translate-y-full"${_scopeId}><p class="truncate text-sm text-white"${_scopeId}>${ssrInterpolate(image.title)}</p><p class="mt-1 text-xs text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.categories[image.category])}</p></div><div class="absolute inset-0 flex flex-col bg-black bg-opacity-75 p-3 opacity-0 transition-all group-hover:opacity-100"${_scopeId}><div class="flex-1 space-y-2"${_scopeId}><div${_scopeId}><label class="block text-xs font-medium text-gray-300"${_scopeId}>Başlık</label><input${ssrRenderAttr("value", image.title)} type="text" class="mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-medium text-gray-300"${_scopeId}>Alt Text</label><input${ssrRenderAttr("value", image.alt_text)} type="text" class="mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400"${_scopeId}></div></div><div class="flex justify-end space-x-2 pt-2"${_scopeId}><button class="rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600" title="Resim URL&#39;sini kopyala"${_scopeId}><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"${_scopeId}></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"${_scopeId}></path></svg></button><button class="rounded-full bg-red-500 p-1 text-white hover:bg-red-600" title="Resmi sil"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div></div>`);
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
                            "onUpdate:modelValue": ($event) => form.value.category = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (name, value) => {
                              return openBlock(), createBlock("option", {
                                key: value,
                                value
                              }, toDisplayString(name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.value.category]
                          ])
                        ]),
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
                          key: 0,
                          class: "preview-container space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(previewImages.value, (image, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "relative rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                            }, [
                              createVNode("div", { class: "flex gap-4" }, [
                                createVNode("div", { class: "relative h-32 w-32" }, [
                                  createVNode("img", {
                                    src: image.preview,
                                    class: "h-full w-full rounded-lg object-cover",
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
                                ]),
                                createVNode("div", { class: "flex-1 space-y-4" }, [
                                  createVNode("div", null, [
                                    createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" }, " Başlık "),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.title = $event,
                                      type: "text",
                                      class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300",
                                      placeholder: "Resim başlığı"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, image.title]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" }, " Alt Text "),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                      type: "text",
                                      class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300",
                                      placeholder: "Resim açıklaması"
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
                          class: "rounded-md bg-red-50 p-4 dark:bg-red-900"
                        }, [
                          createVNode("p", { class: "text-sm text-red-700 dark:text-red-200" }, toDisplayString(imageUploadError.value), 1)
                        ])) : createCommentVNode("", true),
                        uploadSuccess.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "rounded-md bg-green-50 p-4 dark:bg-green-900"
                        }, [
                          createVNode("p", { class: "text-sm text-green-700 dark:text-green-200" }, "Resimler başarıyla yüklendi!")
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-end" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: form.value.processing || !form.value.images.length,
                            class: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
                          }, [
                            form.value.processing ? (openBlock(), createBlock("svg", {
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
                            createTextVNode(" " + toDisplayString(form.value.processing ? "Yükleniyor..." : "Resimleri Yükle"), 1)
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
                            class: "group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                          }, [
                            createVNode("img", {
                              src: image.image_path,
                              class: "h-full w-full object-cover",
                              alt: image.alt_text
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 transition-all group-hover:translate-y-full" }, [
                              createVNode("p", { class: "truncate text-sm text-white" }, toDisplayString(image.title), 1),
                              createVNode("p", { class: "mt-1 text-xs text-gray-300" }, toDisplayString(_ctx.categories[image.category]), 1)
                            ]),
                            createVNode("div", { class: "absolute inset-0 flex flex-col bg-black bg-opacity-75 p-3 opacity-0 transition-all group-hover:opacity-100" }, [
                              createVNode("div", { class: "flex-1 space-y-2" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-gray-300" }, "Başlık"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => image.title = $event,
                                    type: "text",
                                    class: "mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400",
                                    onChange: ($event) => updateImage(image)
                                  }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                                    [vModelText, image.title]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-gray-300" }, "Alt Text"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => image.alt_text = $event,
                                    type: "text",
                                    class: "mt-1 block w-full rounded border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400",
                                    onChange: ($event) => updateImage(image)
                                  }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                                    [vModelText, image.alt_text]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex justify-end space-x-2 pt-2" }, [
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
