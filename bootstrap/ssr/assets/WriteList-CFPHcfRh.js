import { inject, computed, ref, onActivated, onDeactivated, watch, nextTick, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import _sfc_main$1 from "./IconCalendar-BeMkwtmn.js";
import _sfc_main$2 from "./IconEye-C4IDtysD.js";
import _sfc_main$3 from "./IconLock-DLKK0TNF.js";
import _sfc_main$4 from "./IconLink-D_NS_GoN.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "WriteList" }, {
  __name: "WriteList",
  __ssrInlineRender: true,
  props: {
    writes: { type: Array, default: () => [] },
    route: { type: Function, default: null },
    isCollapsed: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const store = useStore();
    const props = __props;
    const injectedWrites = inject("writes", []);
    const writes = computed(() => {
      if (props.writes && props.writes.length > 0) {
        return props.writes;
      }
      const writesValue = (injectedWrites == null ? void 0 : injectedWrites.value) ?? injectedWrites;
      if (writesValue && Array.isArray(writesValue) && writesValue.length > 0) {
        return writesValue;
      }
      return [];
    });
    const page = usePage();
    const isAdmin = page.props.isAdmin || false;
    let isActive = false;
    const activeWrite = ref("");
    const adminFilter = computed(() => store.getters["Writes/filter"]);
    computed(() => {
      const url = page.url;
      return url.startsWith("/writes") && !url.startsWith("/categories");
    });
    const getWriteRoute = (write) => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("/categories/")) {
        const pathParts = currentPath.split("/").filter((part) => part.length > 0);
        if (pathParts.length >= 2 && pathParts[0] === "categories") {
          const categorySlug = pathParts[1];
          if (categorySlug && categorySlug !== "create" && categorySlug !== "edit") {
            return route("categories.showByCategory", { category: categorySlug, slug: write.slug });
          }
        }
      }
      return route("writes.show", { write: write.slug });
    };
    const getActiveWritePath = (write) => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("/categories/")) {
        const pathParts = currentPath.split("/").filter((part) => part.length > 0);
        if (pathParts.length >= 2 && pathParts[0] === "categories") {
          const categorySlug = pathParts[1];
          if (categorySlug && categorySlug !== "create" && categorySlug !== "edit") {
            return `/categories/${categorySlug}/${write.slug}`;
          }
        }
      }
      return `/writes/${write.slug}`;
    };
    const filteredWrites = computed(() => {
      let result = writes.value;
      if (!isAdmin) {
        result = result.filter((write) => write.status !== "private");
        return result;
      } else {
        if (adminFilter.value === "published") {
          result = result.filter((write) => write.status === "published");
        } else if (adminFilter.value === "link_only") {
          result = result.filter((write) => write.status === "link_only");
        } else if (adminFilter.value === "private") {
          result = result.filter((write) => write.status === "private");
        }
        return result;
      }
    });
    __expose({ filteredWrites });
    onActivated(() => {
      isActive = true;
      updateActiveWrite();
    });
    onDeactivated(() => {
      isActive = false;
    });
    watch(
      () => page.url,
      () => {
        nextTick(() => {
          updateActiveWrite();
        });
      }
    );
    const updateActiveWrite = () => {
      activeWrite.value = window.location.pathname;
    };
    onMounted(() => {
      isActive = true;
      updateActiveWrite();
      const handlePopState = () => {
        if (isActive) {
          updateActiveWrite();
        }
      };
      const handleNavigationEnd = () => {
        if (isActive) {
          updateActiveWrite();
        }
      };
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("inertia:finish", handleNavigationEnd);
      onUnmounted(() => {
        isActive = false;
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("inertia:finish", handleNavigationEnd);
      });
    });
    const formatDate = (date) => {
      const dateObj = new Date(date);
      const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
      const day = dateObj.getDate();
      const month = monthNames[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      return `${day} ${month} ${year}`;
    };
    const formatNumber = (num) => {
      return new Intl.NumberFormat("tr-TR").format(num);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-2" }, _attrs))} data-v-c783fde1><!--[-->`);
      ssrRenderList(filteredWrites.value, (write) => {
        _push(ssrRenderComponent(unref(Link), {
          key: write.id,
          href: getWriteRoute(write),
          class: [
            "block rounded-lg p-3",
            activeWrite.value === getActiveWritePath(write) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="${ssrRenderClass([activeWrite.value === getActiveWritePath(write) ? "text-primary-foreground" : "text-foreground", "line-clamp-2 text-sm font-medium leading-tight"])}" data-v-c783fde1${_scopeId}>${ssrInterpolate(write.title)}</h3><div class="${ssrRenderClass([activeWrite.value === getActiveWritePath(write) ? "text-primary-foreground/70" : "text-muted-foreground", "flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"])}" data-v-c783fde1${_scopeId}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3" data-v-c783fde1${_scopeId}><span class="flex items-center gap-1" data-v-c783fde1${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3 w-3 flex-shrink-0" }, null, _parent2, _scopeId));
              _push2(`<span class="truncate" data-v-c783fde1${_scopeId}>${ssrInterpolate(formatDate(write.created_at))}</span></span><span class="flex items-center gap-1" data-v-c783fde1${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3 flex-shrink-0" }, null, _parent2, _scopeId));
              _push2(`<span class="truncate" data-v-c783fde1${_scopeId}>${ssrInterpolate(formatNumber(write.views_count))} görüntülenme</span></span></div><div class="flex items-center gap-1 self-start sm:self-center" data-v-c783fde1${_scopeId}>`);
              if (write.status === "private") {
                _push2(`<span class="text-yellow-500 dark:text-yellow-400" title="Gizli yazı" data-v-c783fde1${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (write.status === "link_only") {
                _push2(`<span class="text-blue-500 dark:text-blue-400" title="Sadece link" data-v-c783fde1${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("h3", {
                  class: ["line-clamp-2 text-sm font-medium leading-tight", activeWrite.value === getActiveWritePath(write) ? "text-primary-foreground" : "text-foreground"]
                }, toDisplayString(write.title), 3),
                createVNode("div", {
                  class: ["flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between", activeWrite.value === getActiveWritePath(write) ? "text-primary-foreground/70" : "text-muted-foreground"]
                }, [
                  createVNode("div", { class: "flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3" }, [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(_sfc_main$1, { class: "h-3 w-3 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, toDisplayString(formatDate(write.created_at)), 1)
                    ]),
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(_sfc_main$2, { class: "h-3 w-3 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, toDisplayString(formatNumber(write.views_count)) + " görüntülenme", 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-1 self-start sm:self-center" }, [
                    write.status === "private" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-yellow-500 dark:text-yellow-400",
                      title: "Gizli yazı"
                    }, [
                      createVNode(_sfc_main$3, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true),
                    write.status === "link_only" ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-blue-500 dark:text-blue-400",
                      title: "Sadece link"
                    }, [
                      createVNode(_sfc_main$4, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (filteredWrites.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground" data-v-c783fde1><div data-v-c783fde1>Henüz yazı bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composables/WriteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WriteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c783fde1"]]);
export {
  WriteList as default
};
