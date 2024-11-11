import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SidebarLayoutProject",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const scrollPosition = ref(0);
    const scrollContainer = ref(null);
    const flashSuccess = ref(props.flash.success);
    const auth = props.auth;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-10 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fixed z-30 mt-14 w-full shadow-lg shadow-color-one lg:mt-0 lg:w-[27%]"><div class="flex cursor-pointer justify-between p-2 text-sm font-bold text-black"><div class="rounded border-b-4 border-blue-100 p-2">Projeler</div>`);
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
      _push(`</div><div class="h-[100vh] overflow-auto">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/services",
        class: getLinkClasses(`/services`)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="font-semibold"${_scopeId}>Servislerimiz</div><div class="mt-1 flex justify-between text-xs text-gray-500"${_scopeId}><span${_scopeId}>13 adet servis</span><span${_scopeId}>100 adet görüntülendi</span></div>`);
          } else {
            return [
              createVNode("div", { class: "font-semibold" }, "Servislerimiz"),
              createVNode("div", { class: "mt-1 flex justify-between text-xs text-gray-500" }, [
                createVNode("span", null, "13 adet servis"),
                createVNode("span", null, "100 adet görüntülendi")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth).user) {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/services/create",
          class: getLinkClasses(`/services/create`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold"${_scopeId}>Hizmet olustur</div><div class="mt-1 flex justify-between text-xs text-gray-500"${_scopeId}><span${_scopeId}>13 adet hizmet</span><span${_scopeId}>100 adet görüntülendi</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, "Hizmet olustur"),
                createVNode("div", { class: "mt-1 flex justify-between text-xs text-gray-500" }, [
                  createVNode("span", null, "13 adet hizmet"),
                  createVNode("span", null, "100 adet görüntülendi")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/projects",
          class: getLinkClasses(`/projects`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold"${_scopeId}>Projects</div><div class="mt-1 flex justify-between text-xs text-gray-500"${_scopeId}><span${_scopeId}>13 adet proje</span><span${_scopeId}>100 adet görüntülendi</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, "Projects"),
                createVNode("div", { class: "mt-1 flex justify-between text-xs text-gray-500" }, [
                  createVNode("span", null, "13 adet proje"),
                  createVNode("span", null, "100 adet görüntülendi")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/customers",
          class: getLinkClasses(`/customers`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold"${_scopeId}>Customers</div><div class="mt-1 flex justify-between text-xs text-gray-500"${_scopeId}><span${_scopeId}>13 adet Müşteri</span><span${_scopeId}>100 adet görüntülendi</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, "Customers"),
                createVNode("div", { class: "mt-1 flex justify-between text-xs text-gray-500" }, [
                  createVNode("span", null, "13 adet Müşteri"),
                  createVNode("span", null, "100 adet görüntülendi")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/SidebarLayoutProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
