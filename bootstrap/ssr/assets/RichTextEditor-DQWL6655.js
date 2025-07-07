import { ref, onMounted, watch, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import Quill from "quill";
/* empty css                    */
import "../app2.js";
import "@inertiajs/vue3";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
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
    height: { type: String, default: "400px" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const quillEditor = ref(null);
    let quill;
    let isInitialContentSet = false;
    onMounted(() => {
      quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["clean"]
          ]
        },
        placeholder: props.placeholder,
        bounds: quillEditor.value
      });
      quill.on("text-change", () => {
        try {
          const content = quill.root.innerHTML;
          emit("update:modelValue", content);
        } catch (error) {
          console.error("Content update error:", error);
        }
      });
      setTimeout(() => {
        if (props.modelValue && !isInitialContentSet) {
          try {
            quill.root.innerHTML = props.modelValue;
            isInitialContentSet = true;
          } catch (error) {
            console.error("Initial content load error:", error);
          }
        }
      }, 100);
      quillEditor.value.style.height = props.height;
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        if (quill && newValue !== quill.root.innerHTML) {
          try {
            quill.root.innerHTML = newValue || "";
          } catch (error) {
            console.error("Content update error in watcher:", error);
          }
        }
      }
    );
    onUnmounted(() => {
      if (quill) {
        quill = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="label"><span class="label-text">${ssrInterpolate(__props.label)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative"><div class="${ssrRenderClass([{ "border-error": __props.error }, "ql-editor min-h-[300px] rounded border border-base-300 bg-base-100 p-3"])}" style="${ssrRenderStyle({ height: __props.height })}"></div></div>`);
      if (__props.error) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(__props.error)}</span></label>`);
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
