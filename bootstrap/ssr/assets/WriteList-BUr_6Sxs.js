import { ref, computed, onActivated, nextTick, onDeactivated, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const STORAGE_KEY = "writeList_scrollPosition";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "WriteList" }, {
  __name: "WriteList",
  __ssrInlineRender: true,
  props: {
    writes: Array,
    route: Function
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const page = usePage();
    const isAdmin = page.props.isAdmin || false;
    const scrollContainer = ref(null);
    let isActive = false;
    const filteredWrites = computed(() => {
      return isAdmin ? props.writes : props.writes.filter((write) => write.status !== "private");
    });
    __expose({ filteredWrites, scrollContainer });
    const saveScrollPosition = () => {
      if (scrollContainer.value) {
        localStorage.setItem(STORAGE_KEY, scrollContainer.value.scrollTop.toString());
      }
    };
    const restoreScrollPosition = () => {
      if (!scrollContainer.value) return;
      const saved = parseInt(localStorage.getItem(STORAGE_KEY));
      if (!isNaN(saved)) scrollContainer.value.scrollTop = saved;
    };
    onActivated(() => {
      isActive = true;
      nextTick(restoreScrollPosition);
    });
    onDeactivated(() => {
      isActive = false;
      saveScrollPosition();
    });
    watch(
      () => props.writes,
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          nextTick(restoreScrollPosition);
        }
      },
      { deep: true }
    );
    onMounted(() => {
      var _a;
      isActive = true;
      nextTick(restoreScrollPosition);
      (_a = scrollContainer.value) == null ? void 0 : _a.addEventListener("scroll", saveScrollPosition);
      const handlePopState = () => {
        if (isActive) nextTick(restoreScrollPosition);
      };
      window.addEventListener("popstate", handlePopState);
      onUnmounted(() => {
        var _a2;
        isActive = false;
        (_a2 = scrollContainer.value) == null ? void 0 : _a2.removeEventListener("scroll", saveScrollPosition);
        window.removeEventListener("popstate", handlePopState);
        saveScrollPosition();
      });
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const getLinkClasses = (href) => {
      const isActive2 = window.location.pathname === href;
      return isActive2 ? "bg-base-200 text-base-content" : "bg-base-100 text-base-content hover:bg-base-200";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "h-full w-full space-y-3 overflow-y-auto p-4"
      }, _attrs))} data-v-435717b0><!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: __props.route("writes.show", { write: write.slug }),
          class: [getLinkClasses(`/writes/${write.slug}`), "block rounded-xl p-4 shadow transition hover:shadow-md"],
          onClick: saveScrollPosition
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-base-content flex items-center gap-2 font-semibold" data-v-435717b0${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span class="text-base-content" data-v-435717b0${_scopeId}>🔒</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="truncate" data-v-435717b0${_scopeId}>${ssrInterpolate(write.title)}</span></div><div class="text-base-content mt-1 flex items-center justify-between text-sm opacity-70" data-v-435717b0${_scopeId}><span data-v-435717b0${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span><span data-v-435717b0${_scopeId}>${ssrInterpolate(write.views_count)} görüntülenme</span></div>`);
            } else {
              return [
                createVNode("div", { class: "text-base-content flex items-center gap-2 font-semibold" }, [
                  write.status === "private" ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-base-content"
                  }, "🔒")) : createCommentVNode("", true),
                  createVNode("span", { class: "truncate" }, toDisplayString(write.title), 1)
                ]),
                createVNode("div", { class: "text-base-content mt-1 flex items-center justify-between text-sm opacity-70" }, [
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-435717b0"]]);
export {
  WriteList as default
};
