import { ref, onMounted, nextTick, watch, onUnmounted, mergeProps, useSSRContext } from "vue";
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
    // Increased default height
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editorContainer = ref(null);
    let quill = null;
    const insertImage = (imageUrl, altText = "") => {
      if (!quill) return;
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", imageUrl);
      quill.setSelection(range.index + 1);
    };
    onMounted(async () => {
      await nextTick();
      if (!editorContainer.value) return;
      quill = new Quill(editorContainer.value, {
        theme: "snow",
        placeholder: props.placeholder,
        modules: {
          toolbar: [
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
          ]
        }
      });
      const toolbar = editorContainer.value.querySelector(".ql-toolbar");
      const container = editorContainer.value.querySelector(".ql-container");
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
        container.style.overflowY = "auto";
      }
      if (props.modelValue) {
        quill.root.innerHTML = props.modelValue;
      }
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        if (content === "<p><br></p>") {
          emit("update:modelValue", "");
        } else {
          emit("update:modelValue", content);
        }
      });
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        if (quill && quill.root.innerHTML !== newValue) {
          quill.root.innerHTML = newValue || "";
        }
      }
    );
    onUnmounted(() => {
      if (quill) {
        quill = null;
      }
    });
    __expose({
      insertImage
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-5146d812>`);
      if (__props.label) {
        _push(`<label class="mb-1 block text-sm font-medium text-foreground" data-v-5146d812>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="quill-editor-container rounded-md border border-input bg-background" style="${ssrRenderStyle({ height: __props.height })}" data-v-5146d812></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-xs text-destructive" data-v-5146d812>${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/RichTextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RichTextEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5146d812"]]);
export {
  RichTextEditor as default
};
