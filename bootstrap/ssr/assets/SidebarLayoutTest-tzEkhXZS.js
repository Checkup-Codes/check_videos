import { inject, ref, computed, watch, onMounted, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$3 from "./TestList-D_f7BfrK.js";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DfwdLh-u.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-DMn-8f1h.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutTest"
}, {
  __name: "SidebarLayoutTest",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const store = useStore();
    const { props } = usePage();
    const tests = inject("tests", []);
    const testListRef = ref(null);
    const scrollableRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const route = computed(() => {
      return (test) => {
        return `/tests/${test.slug}`;
      };
    });
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
    });
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      localStorage.setItem("testSidebarScroll", scrollTop.toString());
    };
    onMounted(() => {
      if (scrollableRef.value) {
        scrollableRef.value.addEventListener && scrollableRef.value.addEventListener("scroll", handleScroll);
        if (scrollableRef.value.$el) {
          scrollableRef.value.$el.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem("testSidebarScroll");
          if (savedScroll) {
            scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: unref(tests),
                    route: route.value,
                    isCollapsed: isNarrow.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      ref_key: "testListRef",
                      ref: testListRef,
                      tests: unref(tests),
                      route: route.value,
                      isCollapsed: isNarrow.value
                    }, null, 8, ["tests", "route", "isCollapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    ref_key: "testListRef",
                    ref: testListRef,
                    tests: unref(tests),
                    route: route.value,
                    isCollapsed: isNarrow.value
                  }, null, 8, ["tests", "route", "isCollapsed"])
                ]),
                _: 1
              }, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_layouts/SidebarLayoutTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd6a3126"]]);
export {
  SidebarLayoutTest as default
};
