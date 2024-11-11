import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "WriteList",
  __ssrInlineRender: true,
  props: {
    writes: Array,
    route: Function
  },
  setup(__props) {
    const scrollContainer = ref(null);
    const handleScroll = (event) => {
      localStorage.setItem("scrollPosition", event.target.scrollTop);
    };
    onMounted(() => {
      var _a;
      const savedScrollPosition = localStorage.getItem("scrollPosition");
      if (savedScrollPosition && scrollContainer.value) {
        scrollContainer.value.scrollTop = savedScrollPosition;
      }
      (_a = scrollContainer.value) == null ? void 0 : _a.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      var _a;
      (_a = scrollContainer.value) == null ? void 0 : _a.removeEventListener("scroll", handleScroll);
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    const getLinkClasses = (href) => {
      const isActive = window.location.pathname === href;
      return `
    border-b border-color-one px-4 py-3 block cursor-pointer p-2 text-sm rounded-sm transition-all duration-200
    ${isActive ? "bg-active-one hover:bg-hover-one text-gray-700" : "text-gray-700 hover:bg-color-one "}
  `;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "-z-10 h-screen overflow-auto pb-8 lg:py-0",
        ref_key: "scrollContainer",
        ref: scrollContainer
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.writes, (write) => {
        _push(`<div class="border-r-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: __props.route("writes.show", { write: write.slug }),
          class: getLinkClasses(`/writes/${write.slug}`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold"${_scopeId}>${ssrInterpolate(write.title)}</div><div class="mt-1 flex justify-between text-xs text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span${_scopeId}>${ssrInterpolate(write.views_count)} Görüntülenme</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "mt-1 flex justify-between text-xs text-gray-500" }, [
                  createVNode("span", null, toDisplayString(formatDate(write.created_at)), 1),
                  createVNode("span", null, toDisplayString(write.views_count) + " Görüntülenme", 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
