import { ref, watch, onMounted, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ExcalidrawComponent",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const { props } = usePage();
    const elementsRef = ref([]);
    const flashMessage = ref("");
    const writeDraws = ref(props.write.write_draws);
    const excalidrawInstance = ref(null);
    const savedElements = ref(null);
    ref(false);
    const isDarkTheme = ref(document.documentElement.getAttribute("data-theme") === "dark");
    watch(isDarkTheme, (newValue) => {
      if (excalidrawInstance.value) {
        excalidrawInstance.value.updateScene({ theme: newValue ? "dark" : "light" });
      }
    });
    onMounted(() => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "data-theme") {
            isDarkTheme.value = document.documentElement.getAttribute("data-theme") === "dark";
          }
        });
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
      });
      loadInitialVersion();
      return () => observer.disconnect();
    });
    const loadInitialVersion = () => {
      import("@excalidraw/excalidraw").then(({ Excalidraw }) => {
        import("react").then((React) => {
          import("react-dom/client").then((ReactDOMClient) => {
            const container = document.getElementById("excali");
            const root = ReactDOMClient.createRoot(container);
            const initialElements = writeDraws.value.length > 0 ? JSON.parse(writeDraws.value[0].elements) : [];
            savedElements.value = JSON.stringify(initialElements);
            const initialData = {
              elements: initialElements,
              scrollToContent: true,
              theme: isDarkTheme.value ? "dark" : "light"
            };
            const handleChange = (elements) => {
              elementsRef.value = elements;
            };
            const excalidrawElement = React.createElement(Excalidraw, {
              initialData,
              onChange: handleChange,
              viewModeEnabled: !props.auth.user,
              theme: isDarkTheme.value ? "dark" : "light",
              onMount: (excalidrawApi) => {
                excalidrawInstance.value = excalidrawApi;
              }
            });
            root.render(excalidrawElement);
          });
        });
      });
    };
    const hasUnsavedChanges = computed(() => {
      if (!savedElements.value) return false;
      const currentElements = JSON.stringify(elementsRef.value);
      return currentElements !== savedElements.value;
    });
    __expose({
      hasUnsavedChanges
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-full w-full" }, _attrs))}>`);
      if (unref(props).auth.user) {
        _push(`<div class="absolute left-32 top-[53px] z-10 lg:left-36 lg:top-4"><button class="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"></path></svg> Kaydet </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashMessage.value) {
        _push(`<div class="absolute left-32 top-[101px] z-20 rounded-lg border border-green-300 bg-green-100 px-3 py-2 text-sm text-green-800 shadow-lg lg:left-36 lg:top-16">${ssrInterpolate(flashMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="excalidraw-container" class="h-full w-full"><div id="excali" class="h-full w-full"></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ExcalidrawComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
