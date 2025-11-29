import { ref, onMounted, nextTick, watch, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import Quill from "quill";
/* empty css                      */
const _sfc_main = {
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    error: { type: String, default: "" },
    placeholder: { type: String, default: "İçeriği buraya yazın..." },
    height: { type: String, default: "400px" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editorContainer = ref(null);
    let quill = null;
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
      if (props.height) {
        const container = editorContainer.value.querySelector(".ql-container");
        if (container) {
          container.style.height = props.height;
        }
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="mb-1 block text-sm font-medium text-foreground">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="quill-editor-container"></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(__props.error)}</p>`);
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
export {
  _sfc_main as default
};
