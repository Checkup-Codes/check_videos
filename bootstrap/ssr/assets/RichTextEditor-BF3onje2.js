import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import Quill from "quill";
/* empty css                    */
const _sfc_main = {
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    label: String,
    labelClass: {
      type: String,
      default: "block font-semibold mb-2 text-sm text-gray-700"
    },
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const quillEditor = ref(null);
    onMounted(() => {
      const quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: 'sub' }, { script: 'super' }],
            // [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
            // [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }]
            // ['link', 'image', 'video'],
            // ['clean'],
          ]
        }
      });
      quill.on("text-change", () => {
        emit("update:modelValue", quill.root.innerHTML);
      });
      if (props.modelValue) {
        quill.root.innerHTML = props.modelValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-6" }, _attrs))}><label class="${ssrRenderClass(__props.labelClass)}">${ssrInterpolate(__props.label)}</label><div class="h-96 rounded-md border border-gray-300 bg-gray-100 p-3 shadow-inner focus-within:border-indigo-500"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Inputs/RichTextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
