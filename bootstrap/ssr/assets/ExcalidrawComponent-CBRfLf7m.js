import { ref, watch, onMounted, unref, useSSRContext } from "vue";
import { ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ExcalidrawComponent",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const elementsRef = ref([]);
    const flashMessage = ref("");
    const writeDraws = ref(props.write.write_draws);
    const excalidrawInstance = ref(null);
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
            const initialData = writeDraws.value.length > 0 ? {
              elements: JSON.parse(writeDraws.value[0].elements),
              scrollToContent: true,
              theme: isDarkTheme.value ? "dark" : "light"
            } : {
              elements: [],
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (flashMessage.value) {
        _push(`<div class="rounded bg-green-200 p-3 text-green-800">${ssrInterpolate(flashMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-base-100"><div class="flex justify-between rounded-md px-1 py-2 text-base-content"><div class="ml-auto flex items-center justify-end space-x-2">`);
      if (unref(props).auth.user) {
        _push(`<button class="btn btn-primary btn-sm">Kaydet</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="excalidraw-container" class="h-[800px] w-full overflow-hidden rounded-lg border-2 border-base-300"><div id="excali" class="h-full w-full"></div></div></div><!--]-->`);
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
