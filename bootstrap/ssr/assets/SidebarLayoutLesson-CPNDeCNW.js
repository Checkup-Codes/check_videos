import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SidebarLayoutLesson",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const scrollPosition = ref(0);
    const scrollContainer = ref(null);
    const flashSuccess = ref(props.flash.success);
    props.auth;
    const lessons = ref(props.lessons);
    const handleScroll = () => {
      scrollPosition.value = scrollContainer.value.scrollTop;
      localStorage.setItem("scrollPosition", scrollPosition.value);
    };
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      const savedScrollPosition = localStorage.getItem("scrollPosition");
      if (savedScrollPosition) {
        scrollContainer.value.scrollTop = savedScrollPosition;
      }
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const getLinkClasses = (href) => {
      return url === href ? "border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-sm bg-color-one text-black" : "border-b border-gray-200 px-4 py-3 hover:bg-hover-one block cursor-pointer p-2 text-sm rounded-md text-gray-700 hover:bg-color-one hover:shadow-sm transition-all duration-200";
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-10 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="shadow-color-one fixed z-30 mt-14 w-full shadow-lg lg:mt-0 lg:w-[27%]"><div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black"><div class="rounded border-b-4 border-blue-100 p-2">Derslerimiz</div>`);
      if (unref(props).auth.user) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/lessons/create",
          class: "underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Yeni Ders Ekle`);
            } else {
              return [
                createTextVNode("Yeni Ders Ekle")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-[100vh] overflow-auto"><div class="sticky top-0 z-20 bg-sidebar"><!--[-->`);
      ssrRenderList(lessons.value, (lesson) => {
        _push(`<div class="py-1">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("lessons.show", { lesson: lesson.slug }),
          class: [getLinkClasses(`/lessons/${lesson.slug}`), "px-2 py-1"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-between"${_scopeId}><div class="py-1 font-bold"${_scopeId}>${ssrInterpolate(lesson.title)}</div><div${_scopeId}>`);
              if (unref(props).auth.user) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("lessons.edit", { lesson: lesson.slug }),
                  class: "flex p-1 underline"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Dersi Güncelle`);
                    } else {
                      return [
                        createTextVNode("Dersi Güncelle")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex"${_scopeId}><div class="py-0.5 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(lesson.created_at))}</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("div", { class: "py-1 font-bold" }, toDisplayString(lesson.title), 1),
                  createVNode("div", null, [
                    unref(props).auth.user ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("lessons.edit", { lesson: lesson.slug }),
                      class: "flex p-1 underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Dersi Güncelle")
                      ]),
                      _: 2
                    }, 1032, ["href"])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "py-0.5 text-sm text-gray-400" }, toDisplayString(formatDate(lesson.created_at)), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/_layouts/SidebarLayoutLesson.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
