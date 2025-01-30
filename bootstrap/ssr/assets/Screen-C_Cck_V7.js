import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const form = useForm({
      title: props.lesson.title,
      slug: props.lesson.slug,
      playlist_id: props.lesson.playlist_id
    });
    const deleteLesson = () => {
      if (confirm("Bu dersi silmek istediğinize emin misiniz?")) {
        form.delete(route("lessons.destroy", { lesson: props.lesson.id }), {
          onSuccess: () => {
            window.location.href = route("lessons.index");
          },
          onError: () => {
            alert("Ders silinirken bir hata oluştu.");
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg container mx-auto p-6" }, _attrs))}><h1 class="mb-4 text-2xl font-bold">Dersi Güncelle</h1><form><div class="mb-4"><label for="title" class="${ssrRenderClass(linkedStyle)}">İsim:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.title) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(unref(form).errors.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="slug" class="${ssrRenderClass(linkedStyle)}">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.slug) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="playlist_id" class="${ssrRenderClass(linkedStyle)}">Play List ID:</label><input${ssrRenderAttr("value", unref(form).playlist_id)} type="text" id="playlist_id" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.playlist_id) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(unref(form).errors.playlist_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><button type="submit" class="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">Dersi Güncelle</button></div></form><div class="mt-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "#",
        onClick: deleteLesson,
        class: "rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dersi Sil`);
          } else {
            return [
              createTextVNode("Dersi Sil")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
