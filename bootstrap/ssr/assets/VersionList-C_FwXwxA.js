import { mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "VersionList" }, {
  __name: "VersionList",
  __ssrInlineRender: true,
  props: {
    versions: { type: Array, required: true },
    currentUrl: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const isActive = (version) => {
      const href = `/versions/${version.version}`;
      return props.currentUrl === href || props.currentUrl.startsWith(href + "/");
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Tarih Yok";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }).format(date);
      } catch (error) {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-2" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.versions, (version) => {
        _push(ssrRenderComponent(unref(Link), {
          key: version.id,
          href: `/versions/${version.version}`,
          class: [
            "block rounded-lg p-3",
            isActive(version) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4 class="${ssrRenderClass([isActive(version) ? "text-primary-foreground" : "text-foreground", "text-[11px] font-medium leading-tight"])}"${_scopeId}>${ssrInterpolate(version.version)}</h4><div class="${ssrRenderClass([isActive(version) ? "text-primary-foreground/70" : "text-muted-foreground", "flex items-center gap-3 text-[10px]"])}"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><span class="truncate"${_scopeId}>${ssrInterpolate(formatDate(version.release_date))}</span></span></div>`);
            } else {
              return [
                createVNode("h4", {
                  class: ["text-[11px] font-medium leading-tight", isActive(version) ? "text-primary-foreground" : "text-foreground"]
                }, toDisplayString(version.version), 3),
                createVNode("div", {
                  class: ["flex items-center gap-3 text-[10px]", isActive(version) ? "text-primary-foreground/70" : "text-muted-foreground"]
                }, [
                  createVNode("span", { class: "flex items-center gap-1" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-3 w-3 flex-shrink-0",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ])),
                    createVNode("span", { class: "truncate" }, toDisplayString(formatDate(version.release_date)), 1)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.versions && __props.versions.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground"><div>Henüz versiyon bulunmuyor</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_components/VersionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
