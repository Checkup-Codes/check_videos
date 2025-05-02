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
      const container = event.target;
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (container.scrollTop < 0) {
        container.scrollTop = 0;
      } else if (container.scrollTop > maxScroll) {
        container.scrollTop = maxScroll;
      }
      localStorage.setItem("scrollPosition", container.scrollTop);
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
    block px-4 py-2 transition-colors duration-200
    text-sm font-medium
    ${isActive ? " bg-base-300" : " bg-base-100 border-base-300 text-base-content"}
  `;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.writes, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: getLinkClasses(`/writes/${write.slug}`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold"${_scopeId}>${ssrInterpolate(write.title)}</div><div class="flex items-center justify-between text-xs"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span${_scopeId}>${ssrInterpolate(write.views_count)} görüntülenme</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "flex items-center justify-between text-xs" }, [
                  createVNode("span", null, toDisplayString(formatDate(write.created_at)), 1),
                  createVNode("span", null, toDisplayString(write.views_count) + " görüntülenme", 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
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
