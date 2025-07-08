import { inject, ref, watch, onMounted, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TopSubsidebar-DjuRh74I.js";
import WriteList from "./WriteList-CbhA-QfL.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DaB40CC2.js";
import { _ as _sfc_main$3 } from "./SubSidebarScreen-BKy3Ou2K.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutWrite"
}, {
  __name: "SidebarLayoutWrite",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const store = useStore();
    const { props } = usePage();
    const writes = inject("writes", []);
    const writeListRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const emit = __emit;
    const handleWidthToggle = (value) => {
      isNarrow.value = value;
      store.commit("Writes/SET_COLLAPSED", value);
    };
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "YAZILAR",
              href: "/writes/create",
              class: "border-base-200",
              onToggleWidth: handleWidthToggle
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: unref(writes),
                    route: _ctx.route,
                    isCollapsed: isNarrow.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(WriteList, {
                      ref_key: "writeListRef",
                      ref: writeListRef,
                      writes: unref(writes),
                      route: _ctx.route,
                      isCollapsed: isNarrow.value
                    }, null, 8, ["writes", "route", "isCollapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: "YAZILAR",
                href: "/writes/create",
                class: "border-base-200",
                onToggleWidth: handleWidthToggle
              }),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createVNode(WriteList, {
                    ref_key: "writeListRef",
                    ref: writeListRef,
                    writes: unref(writes),
                    route: _ctx.route,
                    isCollapsed: isNarrow.value
                  }, null, 8, ["writes", "route", "isCollapsed"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
