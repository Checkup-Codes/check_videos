import { ref, computed, watch, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
  setup(__props) {
    const props = __props;
    const elementsRef = ref([]);
    const filesRef = ref({});
    const flashMessage = ref("");
    const flashMessageType = ref("success");
    const excalidrawInstance = ref(null);
    const savedElements = ref(null);
    const savedFiles = ref(null);
    const isSaving = ref(false);
    const isInitialized = ref(false);
    const showUnsavedDialog = ref(false);
    const pendingNavigation = ref(null);
    const hasChanges = ref(false);
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
              var _a2;
              elementsRef.value = elements;
              if (files) {
                filesRef.value = files;
              }
              if ((_a2 = props.auth) == null ? void 0 : _a2.user) {
                hasChanges.value = true;
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
      var _a, _b;
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
      if ((_b = props.auth) == null ? void 0 : _b.user) {
        window.addEventListener("beforeunload", handleBeforeUnload);
        document.addEventListener("inertia:before", handleInertiaNavigate);
      }
      return () => observer.disconnect();
    });
    onBeforeUnmount(() => {
      var _a;
      if ((_a = props.auth) == null ? void 0 : _a.user) {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        document.removeEventListener("inertia:before", handleInertiaNavigate);
      }
    });
    const hasUnsavedChanges = computed(() => {
      if (!savedElements.value || !hasChanges.value) return false;
      const currentElements = JSON.stringify(elementsRef.value);
      const currentFiles = JSON.stringify(filesRef.value);
      return currentElements !== savedElements.value || currentFiles !== savedFiles.value;
    });
    const handleBeforeUnload = (e) => {
      var _a;
      if (((_a = props.auth) == null ? void 0 : _a.user) && hasUnsavedChanges.value) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    const handleInertiaNavigate = (event) => {
      var _a;
      if (((_a = props.auth) == null ? void 0 : _a.user) && hasUnsavedChanges.value && !showUnsavedDialog.value) {
        event.preventDefault();
        pendingNavigation.value = event.detail.visit;
        showUnsavedDialog.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-full w-full" }, _attrs))}>`);
      if ((_a = props.auth) == null ? void 0 : _a.user) {
        _push(`<div class="absolute left-32 top-[53px] z-10 lg:left-36 lg:top-4"><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50">`);
        if (!isSaving.value) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"></path></svg>`);
        } else {
          _push(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        }
        _push(` ${ssrInterpolate(isSaving.value ? "Kaydediliyor..." : "Kaydet")}</button>`);
        if (hasUnsavedChanges.value && !isSaving.value) {
          _push(`<div class="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Kaydedilmemiş değişiklikler </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashMessage.value) {
        _push(`<div class="${ssrRenderClass([flashMessageType.value === "success" ? "border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-200" : "border-red-300 bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-900/50 dark:text-red-200", "absolute left-32 top-[101px] z-20 rounded-lg border px-3 py-2 text-sm shadow-lg lg:left-36 lg:top-16"])}">${ssrInterpolate(flashMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showUnsavedDialog.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl"><div class="mb-4 flex items-start gap-3"><div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div class="flex-1"><h3 class="text-lg font-semibold text-foreground">Kaydedilmemiş Değişiklikler</h3><p class="mt-2 text-sm text-muted-foreground"> Çizimde kaydedilmemiş değişiklikleriniz var. Sayfadan ayrılırsanız bu değişiklikler kaybolacak. </p></div></div><div class="flex justify-end gap-2"><button class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"> İptal </button><button class="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"> Yine de Ayrıl </button></div></div></div>`);
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
