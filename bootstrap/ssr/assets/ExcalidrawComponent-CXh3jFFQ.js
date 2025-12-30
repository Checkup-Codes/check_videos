import { ref, computed, watch, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import axios from "axios";
const _sfc_main = {
  __name: "ExcalidrawComponent",
  __ssrInlineRender: true,
  props: {
    write: {
      type: Object,
      default: () => ({})
    },
    auth: {
      type: Object,
      default: null
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const elementsRef = ref([]);
    const filesRef = ref({});
    const flashMessage = ref("");
    const excalidrawInstance = ref(null);
    const savedElements = ref(null);
    const savedFiles = ref(null);
    const isSaving = ref(false);
    const isInitialized = ref(false);
    const isDarkTheme = ref(document.documentElement.getAttribute("data-theme") === "dark");
    const writeDraws = computed(() => {
      var _a, _b;
      return ((_a = props.write) == null ? void 0 : _a.writeDraws) || ((_b = props.write) == null ? void 0 : _b.write_draws) || [];
    });
    watch(isDarkTheme, (newValue) => {
      if (excalidrawInstance.value) {
        excalidrawInstance.value.updateScene({ theme: newValue ? "dark" : "light" });
      }
    });
    const loadExcalidraw = () => {
      if (isInitialized.value) return;
      isInitialized.value = true;
      import("@excalidraw/excalidraw").then(({ Excalidraw }) => {
        import("react").then((React) => {
          import("react-dom/client").then((ReactDOMClient) => {
            var _a;
            const container = document.getElementById("excali");
            if (!container) return;
            const root = ReactDOMClient.createRoot(container);
            const draws = writeDraws.value || [];
            let initialElements = [];
            let initialFiles = {};
            if (draws.length > 0 && draws[0]) {
              if (draws[0].elements) {
                try {
                  initialElements = typeof draws[0].elements === "string" ? JSON.parse(draws[0].elements) : draws[0].elements;
                } catch (e) {
                  console.warn("Elements parse error:", e);
                  initialElements = [];
                }
              }
              if (draws[0].files) {
                try {
                  initialFiles = typeof draws[0].files === "string" ? JSON.parse(draws[0].files) : draws[0].files;
                } catch (e) {
                  console.warn("Files parse error:", e);
                  initialFiles = {};
                }
              }
            }
            savedElements.value = JSON.stringify(initialElements);
            savedFiles.value = JSON.stringify(initialFiles);
            filesRef.value = initialFiles;
            elementsRef.value = initialElements;
            const initialData = {
              elements: initialElements,
              files: initialFiles,
              scrollToContent: true,
              theme: isDarkTheme.value ? "dark" : "light"
            };
            const handleChange = (elements, appState, files) => {
              elementsRef.value = elements;
              if (files) {
                filesRef.value = files;
              }
            };
            const excalidrawElement = React.createElement(Excalidraw, {
              initialData,
              onChange: handleChange,
              viewModeEnabled: !((_a = props.auth) == null ? void 0 : _a.user),
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
    watch(writeDraws, (newDraws) => {
      if (newDraws && newDraws.length > 0 && !isInitialized.value) {
        loadExcalidraw();
      }
    }, { deep: true });
    onMounted(() => {
      var _a;
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
      if (writeDraws.value.length > 0 || ((_a = props.write) == null ? void 0 : _a.id)) {
        loadExcalidraw();
      }
      return () => observer.disconnect();
    });
    const hasUnsavedChanges = computed(() => {
      if (!savedElements.value) return false;
      const currentElements = JSON.stringify(elementsRef.value);
      const currentFiles = JSON.stringify(filesRef.value);
      return currentElements !== savedElements.value || currentFiles !== savedFiles.value;
    });
    const saveIfNeeded = async () => {
      var _a;
      if (!hasUnsavedChanges.value || isSaving.value || !((_a = props.write) == null ? void 0 : _a.id)) {
        return Promise.resolve(true);
      }
      const latestElements = elementsRef.value.length > 0 ? elementsRef.value : [];
      const elementsJson = JSON.stringify(latestElements);
      const filesJson = JSON.stringify(filesRef.value || {});
      isSaving.value = true;
      try {
        await axios.post(`/writes/${props.write.id}/draw`, {
          elements: elementsJson,
          files: filesJson,
          version: 1
        });
        savedElements.value = elementsJson;
        savedFiles.value = filesJson;
        setFlashMessage("Otomatik kaydedildi!");
        return true;
      } catch (error) {
        console.error("Auto-save failed:", error);
        setFlashMessage("Otomatik kaydetme başarısız oldu.");
        return false;
      } finally {
        isSaving.value = false;
      }
    };
    __expose({
      hasUnsavedChanges,
      saveIfNeeded
    });
    const setFlashMessage = (message) => {
      flashMessage.value = message;
      setTimeout(() => {
        flashMessage.value = "";
      }, 3e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-full w-full" }, _attrs))}>`);
      if ((_a = props.auth) == null ? void 0 : _a.user) {
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
