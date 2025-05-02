import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import Quill from "quill";
/* empty css                    */
const _sfc_main = {
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    optional: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const quillEditor = ref(null);
    let quill;
    onMounted(() => {
      quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"]
          ]
        },
        placeholder: "İçeriği buraya yazın..."
      });
      quill.on("text-change", () => {
        emit("update:modelValue", quill.root.innerHTML);
      });
      if (props.modelValue) {
        quill.root.innerHTML = props.modelValue;
      }
      quillEditor.value.style.height = props.height;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="label"><span class="label-text">${ssrInterpolate(__props.label)}</span>`);
        if (__props.optional) {
          _push(`<span class="label-text-alt opacity-70">Opsiyonel</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative"><div class="${ssrRenderClass(["border-base-300 bg-base-100 min-h-[300px] rounded border p-3", { "border-error": __props.error }])}"></div></div>`);
      if (__props.error) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(__props.error)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.hint && !__props.error) {
        _push(`<label class="label"><span class="label-text-alt">${ssrInterpolate(__props.hint)}</span></label>`);
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
