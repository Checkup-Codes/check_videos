import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import "@inertiajs/inertia";
import _sfc_main$1 from "./SidebarLayoutBookmarks-CG2Vspjs.js";
const baseUrl = "http://check_videos.test/storage/bookmarks";
const _sfc_main = {
  __name: "ShowBookmarks",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = ref(props.category);
    const bookmarks = ref(props.bookmarks);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-subsidebar" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "hidden lg:block" }, null, _parent));
      _push(`<div class="mx-auto w-[97%] rounded-lg bg-white p-2 shadow-md"><div class="flex items-center justify-between"><div class="hidden text-sm text-gray-500 lg:block">Category: ${ssrInterpolate(category.value.name)}</div><div class="block lg:hidden"><button class="flex items-center p-2 text-black hover:text-gray-700"><svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Geri </button></div><a${ssrRenderAttr("href", `/writes/${category.value.id}/edit`)}><div class="m-2 rounded p-2 text-center font-bold text-black underline">Edit Write</div></a></div><div class="p-8"><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><!--[-->`);
      ssrRenderList(bookmarks.value, (bookmark) => {
        _push(`<div class="rounded-lg border p-4 shadow-sm"><a${ssrRenderAttr("href", bookmark.link)}>`);
        if (bookmark.img_src) {
          _push(`<img${ssrRenderAttr("src", `${baseUrl}/${bookmark.img_src}`)} alt="Bookmark Image" class="h-32 w-full rounded-t-lg object-cover">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4"><div class="text-lg font-bold">${ssrInterpolate(bookmark.title)}</div><p class="mt-2 text-gray-600">${ssrInterpolate(bookmark.description)}</p></div></a></div>`);
      });
      _push(`<!--]--></div></div><div class="flex"><button class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"> Delete Write </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/ShowBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
