import { ref, onMounted, onUnmounted, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "CheckScreen",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const isWideScreen = ref(false);
    const checkScreenWidth = () => {
      isWideScreen.value = window.innerWidth >= 1800;
    };
    onMounted(() => {
      checkScreenWidth();
      window.addEventListener("resize", checkScreenWidth);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });
    const computedClass = computed(() => {
      return `${props.infoClass} h-full overflow-hidden px-2 sm:px-4 lg:px-8`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: computedClass.value }, _attrs))}><div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]"><div class="${ssrRenderClass([{ "xl:mx-auto": isWideScreen.value }, "mx-auto max-w-full sm:max-w-[920px]"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckScreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
