import { ref, onMounted, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ExcalidrawComponent",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const elementsRef = ref([]);
    const flashMessage = ref("");
    const writeDraws = ref(props.write.write_draws);
    ref(writeDraws.value.length > 0 ? writeDraws.value[0].id : null);
    onMounted(() => {
      loadInitialVersion();
    });
    const loadInitialVersion = () => {
      import("@excalidraw/excalidraw").then(({ Excalidraw }) => {
        import("react").then((React) => {
          import("react-dom/client").then((ReactDOMClient) => {
            const container = document.getElementById("excali");
            const root = ReactDOMClient.createRoot(container);
            const initialData = writeDraws.value.length > 0 ? {
              elements: JSON.parse(writeDraws.value[0].elements),
              scrollToContent: true
            } : {
              elements: [],
              scrollToContent: true
            };
            const handleChange = (elements) => {
              elementsRef.value = elements;
            };
            root.render(
              React.createElement(Excalidraw, {
                initialData,
                onChange: handleChange,
                viewModeEnabled: !props.auth.user
              })
            );
          });
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (flashMessage.value) {
        _push(`<div class="mt-4 rounded bg-green-200 p-3 text-green-800">${ssrInterpolate(flashMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-2 mt-4 flex justify-between space-x-4 rounded-md px-3 py-2 text-gray-400 shadow-lg shadow-blue-200 sm:mx-3 md:mx-10"><div class="flex"><label for="versionDropdown" class="my-auto font-semibold text-gray-700">Versiyon Seç:</label><select id="versionDropdown" class="mx-5 h-7 rounded-md border border-white bg-white py-0 pl-2 text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"><!--[-->`);
      ssrRenderList(writeDraws.value, (draw) => {
        _push(`<option${ssrRenderAttr("value", draw.id)}>Versiyon ${ssrInterpolate(draw.version)}</option>`);
      });
      _push(`<!--]--></select></div><div class="ml-auto flex items-center justify-end space-x-2">`);
      if (unref(props).auth.user) {
        _push(`<button class="rounded px-5 text-black hover:underline"> Sil </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(props).auth.user) {
        _push(`<button class="rounded px-5 text-black hover:underline"> Kaydet </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="excalidraw-container" class="relative h-[650px] w-full pt-3"><div id="excali" class="h-full w-full"></div></div><!--]-->`);
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
