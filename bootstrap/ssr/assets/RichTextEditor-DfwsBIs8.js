import { ref, onMounted, nextTick, onUnmounted, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import Quill from "quill";
/* empty css                      */
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    error: { type: String, default: "" },
    placeholder: { type: String, default: "İçeriği buraya yazın..." },
    height: { type: String, default: "500px" }
  },
  emits: ["update:modelValue", "images-changed"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editorContainer = ref(null);
    let quill = null;
    const pendingImages = ref([]);
    const blobUrlMap = /* @__PURE__ */ new Map();
    const insertImage = (imageUrl, altText = "") => {
      if (!quill) return;
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", imageUrl);
      quill.setSelection(range.index + 1);
    };
    const insertImageFromFile = (file) => {
      if (!quill) {
        console.error("Quill editor not initialized");
        return;
      }
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        alert(`Resim boyutu çok büyük: ${sizeMB}MB

Maksimum dosya boyutu: 2MB

Lütfen resmi küçültüp tekrar deneyin.`);
        return;
      }
      console.log("Inserting image from file:", file.name, file.type, file.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        console.log("Created data URL, length:", dataUrl.length);
        const imageData = {
          dataUrl,
          file,
          fileName: file.name
        };
        pendingImages.value.push(imageData);
        console.log("Pending images count:", pendingImages.value.length);
        const range = quill.getSelection(true) || { index: quill.getLength() };
        console.log("Inserting at position:", range.index);
        quill.insertEmbed(range.index, "image", dataUrl);
        quill.setSelection(range.index + 1);
        emit("images-changed", pendingImages.value);
        console.log("Image inserted successfully");
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
      };
      reader.readAsDataURL(file);
    };
    const getPendingImages = () => {
      return pendingImages.value;
    };
    const replaceDataUrls = (urlMapping) => {
      if (!quill) return;
      const delta = quill.getContents();
      let changed = false;
      delta.ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          const dataUrl = op.insert.image;
          if (urlMapping[dataUrl]) {
            op.insert.image = urlMapping[dataUrl];
            changed = true;
          }
        }
      });
      if (changed) {
        quill.setContents(delta);
        emit("update:modelValue", quill.root.innerHTML);
      }
    };
    const replaceBlobUrls = replaceDataUrls;
    const clearPendingImages = () => {
      pendingImages.value = [];
      blobUrlMap.clear();
      emit("images-changed", []);
    };
    const getImagesInContent = () => {
      if (!quill) return [];
      const delta = quill.getContents();
      const images = [];
      delta.ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          images.push(op.insert.image);
        }
      });
      return images;
    };
    onMounted(async () => {
      await nextTick();
      if (!editorContainer.value) return;
      quill = new Quill(editorContainer.value, {
        theme: "snow",
        placeholder: props.placeholder,
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image", "video"],
              // Image button'ı geri ekledik
              ["clean"]
            ],
            handlers: {
              image: imageHandler
              // Custom image handler
            }
          }
        }
      });
      const toolbar = editorContainer.value.querySelector(".ql-toolbar");
      const container = editorContainer.value.querySelector(".ql-container");
      const editor = editorContainer.value.querySelector(".ql-editor");
      if (toolbar) {
        toolbar.style.position = "sticky";
        toolbar.style.top = "0";
        toolbar.style.zIndex = "10";
        toolbar.style.backgroundColor = "hsl(var(--background))";
        toolbar.style.borderBottom = "1px solid hsl(var(--border))";
      }
      if (container) {
        const toolbarHeight = toolbar ? toolbar.offsetHeight : 42;
        container.style.height = `calc(${props.height} - ${toolbarHeight}px)`;
        container.style.overflow = "hidden";
        container.style.display = "flex";
        container.style.flexDirection = "column";
      }
      if (editor) {
        editor.style.overflowY = "auto";
        editor.style.overflowX = "hidden";
        editor.style.flex = "1";
        editor.style.maxHeight = "100%";
      }
      if (props.modelValue) {
        quill.root.innerHTML = props.modelValue;
      }
      let preventScroll = false;
      let savedScrollTop = 0;
      quill.on("text-change", (delta, oldDelta, source) => {
        const content = quill.root.innerHTML;
        if (content === "<p><br></p>") {
          emit("update:modelValue", "");
        } else {
          emit("update:modelValue", content);
        }
        if (preventScroll && editor) {
          requestAnimationFrame(() => {
            editor.scrollTop = savedScrollTop;
            preventScroll = false;
          });
        }
      });
      quill.root.addEventListener("paste", (e) => {
        if (editor) {
          savedScrollTop = editor.scrollTop;
          preventScroll = true;
        }
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf("image") !== -1) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) {
              insertImageFromFile(file);
            }
            return;
          }
        }
        setTimeout(() => {
          if (editor && preventScroll) {
            editor.scrollTop = savedScrollTop;
            preventScroll = false;
          }
        }, 0);
      });
      quill.root.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.indexOf("image") !== -1) {
            insertImageFromFile(file);
          }
        }
      });
      quill.root.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      let isEditorFocused = false;
      quill.on("selection-change", (range) => {
        isEditorFocused = range !== null;
      });
      const preventWindowScroll = (e) => {
        if (isEditorFocused && e.target === document) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };
      window.addEventListener("scroll", preventWindowScroll, { passive: false, capture: true });
      onUnmounted(() => {
        window.removeEventListener("scroll", preventWindowScroll, { capture: true });
      });
    });
    const imageHandler = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.setAttribute("multiple", "multiple");
      input.onchange = () => {
        const files = input.files;
        if (files && files.length > 0) {
          Array.from(files).forEach((file) => {
            if (file.type.indexOf("image") !== -1) {
              insertImageFromFile(file);
            }
          });
        }
      };
      input.click();
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (quill && quill.root.innerHTML !== newValue) {
          quill.root.innerHTML = newValue || "";
        }
      }
    );
    onUnmounted(() => {
      clearPendingImages();
      if (quill) {
        quill = null;
      }
    });
    __expose({
      insertImage,
      insertImageFromFile,
      getPendingImages,
      replaceBlobUrls,
      clearPendingImages,
      getImagesInContent,
      pendingImages
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-19c1f47a>`);
      if (__props.label) {
        _push(`<label class="mb-1 block text-sm font-medium text-foreground" data-v-19c1f47a>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="quill-editor-container rounded-md border border-input bg-background" style="${ssrRenderStyle({ height: __props.height })}" data-v-19c1f47a></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-xs text-destructive" data-v-19c1f47a>${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (pendingImages.value.length > 0) {
        _push(`<div class="mt-2 rounded-md border border-amber-500/20 bg-amber-500/5 p-2" data-v-19c1f47a><div class="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400" data-v-19c1f47a><svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-19c1f47a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-19c1f47a></path></svg><span data-v-19c1f47a>${ssrInterpolate(pendingImages.value.length)} resim kaydetme bekliyor (Formu kaydettiğinizde yüklenecek)</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-1 text-xs text-muted-foreground" data-v-19c1f47a> Maksimum dosya boyutu: 2MB. Desteklenen formatlar: JPEG, PNG, GIF, WebP, SVG </p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/RichTextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RichTextEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19c1f47a"]]);
export {
  RichTextEditor as default
};
