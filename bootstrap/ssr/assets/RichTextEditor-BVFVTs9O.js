import { ref, onMounted, watch, onUnmounted, mergeProps, useSSRContext } from "vue";
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
const EMPTY_HTML = "<p><br></p>";
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
    let lastEmitted = null;
    const pendingImages = ref([]);
    const blobUrlMap = /* @__PURE__ */ new Map();
    const setEditorHtml = (html) => {
      if (!quill) return;
      const delta = quill.clipboard.convert({ html: html || "" });
      quill.setContents(delta, "silent");
    };
    const currentHtml = () => {
      if (!quill) return "";
      const html = quill.root.innerHTML;
      return html === EMPTY_HTML ? "" : html;
    };
    const emitContent = () => {
      const value = currentHtml();
      lastEmitted = value;
      emit("update:modelValue", value);
    };
    const insertImage = (imageUrl, altText = "") => {
      if (!quill) return;
      const range = quill.getSelection(true) || { index: quill.getLength() - 1 };
      quill.insertEmbed(range.index, "image", imageUrl, "user");
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        pendingImages.value.push({
          dataUrl,
          file,
          fileName: file.name
        });
        const range = quill.getSelection(true) || { index: quill.getLength() - 1 };
        quill.insertEmbed(range.index, "image", dataUrl, "user");
        quill.setSelection(range.index + 1);
        emit("images-changed", pendingImages.value);
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
        quill.setContents(delta, "silent");
        emitContent();
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
      const images = [];
      quill.getContents().ops.forEach((op) => {
        if (op.insert && op.insert.image) {
          images.push(op.insert.image);
        }
      });
      return images;
    };
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
    const findScrollParent = (el) => {
      let node = el == null ? void 0 : el.parentElement;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    };
    onMounted(() => {
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
        setEditorHtml(props.modelValue);
      }
      lastEmitted = currentHtml();
      quill.on("text-change", () => {
        emitContent();
      });
      quill.root.addEventListener("paste", (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = (clipboardData == null ? void 0 : clipboardData.items) || [];
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
        const scrollParent = findScrollParent(editorContainer.value);
        const editorTop = editor ? editor.scrollTop : 0;
        const parentTop = scrollParent ? scrollParent.scrollTop : 0;
        requestAnimationFrame(() => {
          if (editor) editor.scrollTop = editorTop;
          if (scrollParent) scrollParent.scrollTop = parentTop;
        });
      });
      quill.root.addEventListener("drop", (e) => {
        var _a;
        e.preventDefault();
        e.stopPropagation();
        const files = ((_a = e.dataTransfer) == null ? void 0 : _a.files) || [];
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
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        if (!quill) return;
        const incoming = newValue || "";
        if (incoming === lastEmitted) return;
        if (incoming === currentHtml()) return;
        setEditorHtml(incoming);
        lastEmitted = currentHtml();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-2c2b933a>`);
      if (__props.label) {
        _push(`<label class="mb-1 block text-sm font-medium text-foreground" data-v-2c2b933a>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="quill-editor-container rounded-md border border-input bg-background" style="${ssrRenderStyle({ height: __props.height })}" data-v-2c2b933a></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-xs text-destructive" data-v-2c2b933a>${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (pendingImages.value.length > 0) {
        _push(`<div class="mt-2 rounded-md border border-amber-500/20 bg-amber-500/5 p-2" data-v-2c2b933a><div class="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400" data-v-2c2b933a><svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2c2b933a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2c2b933a></path></svg><span data-v-2c2b933a>${ssrInterpolate(pendingImages.value.length)} resim kaydetme bekliyor (Formu kaydettiğinizde yüklenecek)</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-1 text-xs text-muted-foreground" data-v-2c2b933a> Maksimum dosya boyutu: 2MB. Desteklenen formatlar: JPEG, PNG, GIF, WebP, SVG </p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/RichTextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RichTextEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c2b933a"]]);
export {
  RichTextEditor as default
};
