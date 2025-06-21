import { computed, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "PageMeta"
}, {
  __name: "PageMeta",
  __ssrInlineRender: true,
  props: {
    /**
     * Page title (without site name)
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Page description (max 160 characters recommended)
     */
    description: {
      type: String,
      default: ""
    },
    /**
     * Comma-separated keywords
     */
    keywords: {
      type: String,
      default: ""
    },
    /**
     * Site name to append to title
     */
    siteName: {
      type: String,
      default: "Yazı Platformu"
    },
    /**
     * Page type for Open Graph
     */
    type: {
      type: String,
      default: "website"
    },
    /**
     * Image URL for social sharing
     */
    image: {
      type: String,
      default: ""
    },
    /**
     * Current page URL
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * Canonical URL
     */
    canonical: {
      type: String,
      default: ""
    },
    /**
     * Whether to include site name in title
     */
    appendSiteName: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    usePage();
    computed(() => {
      return props.url || window.location.href;
    });
    const computedTitle = computed(() => {
      if (!props.title) {
        return props.siteName;
      }
      return props.appendSiteName ? `${props.title} - ${props.siteName}` : props.title;
    });
    const computedDescription = computed(() => {
      const description = props.description || "";
      return description.length > 160 ? `${description.substring(0, 157)}...` : description;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Head), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(computedTitle.value)}</title><meta name="description"${ssrRenderAttr("content", computedDescription.value)}${_scopeId}>`);
            if (__props.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", __props.keywords)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:title"${ssrRenderAttr("content", computedTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", computedDescription.value)}${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.type)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.url)}${_scopeId}>`);
            if (__props.image) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", __props.image)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:site_name"${ssrRenderAttr("content", __props.siteName)}${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", computedTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", computedDescription.value)}${_scopeId}>`);
            if (__props.image) {
              _push2(`<meta name="twitter:image"${ssrRenderAttr("content", __props.image)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.canonical) {
              _push2(`<link rel="canonical"${ssrRenderAttr("href", __props.canonical)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(computedTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: computedDescription.value
              }, null, 8, ["content"]),
              __props.keywords ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "keywords",
                content: __props.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:title",
                content: computedTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: computedDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: __props.type
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: __props.url
              }, null, 8, ["content"]),
              __props.image ? (openBlock(), createBlock("meta", {
                key: 1,
                property: "og:image",
                content: __props.image
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:site_name",
                content: __props.siteName
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: computedTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: computedDescription.value
              }, null, 8, ["content"]),
              __props.image ? (openBlock(), createBlock("meta", {
                key: 2,
                name: "twitter:image",
                content: __props.image
              }, null, 8, ["content"])) : createCommentVNode("", true),
              __props.canonical ? (openBlock(), createBlock("link", {
                key: 3,
                rel: "canonical",
                href: __props.canonical
              }, null, 8, ["href"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PageMeta.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
