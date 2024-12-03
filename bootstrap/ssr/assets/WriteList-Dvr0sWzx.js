import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    border-b border-accent-light px-4 py-3 block cursor-pointer p-2 text-sm rounded-sm transition-all duration-200
    ${isActive ? "bg-primary-200 shadow-inner hover:bg-primary-300 text-neutral-700" : "text-neutral-700 hover:bg-primary-200"}
  `;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]"
      }, _attrs))} data-v-6abc3b74><div class="min-h-full" data-v-6abc3b74><!--[-->`);
      ssrRenderList(__props.writes, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: getLinkClasses(`/writes/${write.slug}`)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="font-semibold" data-v-6abc3b74${_scopeId}>${ssrInterpolate(write.title)}</div><div class="flex items-center justify-between text-xs text-gray-500" data-v-6abc3b74${_scopeId}><span data-v-6abc3b74${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span data-v-6abc3b74${_scopeId}>${ssrInterpolate(write.views_count)} görüntülenme</span></div>`);
            } else {
              return [
                createVNode("div", { class: "font-semibold" }, toDisplayString(write.title), 1),
                createVNode("div", { class: "flex items-center justify-between text-xs text-gray-500" }, [
                  createVNode("span", null, toDisplayString(formatDate(write.created_at)), 1),
                  createVNode("span", null, toDisplayString(write.views_count) + " görüntülenme", 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6abc3b74"]]);
export {
  WriteList as default
};
