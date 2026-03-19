import { defineComponent, ref, onMounted, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    screen: {},
    socialStats: {},
    socialMediaLinks: {}
  },
  setup(__props) {
    const props = __props;
    const isLoaded = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isLoaded.value = true;
      }, 100);
    });
    const seoTitle = computed(() => props.screen.seo.title);
    const seoDescription = computed(() => props.screen.seo.description);
    const logoPath = computed(() => props.screen.seo.logo);
    const platformIcons = {
      youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      medium: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
      tiktok: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z",
      linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    };
    const platformColors = {
      youtube: "from-red-500 to-red-600",
      instagram: "from-purple-500 via-pink-500 to-orange-500",
      twitter: "from-blue-400 to-blue-500",
      x: "from-gray-900 to-black",
      github: "from-gray-700 to-gray-900",
      medium: "from-green-600 to-green-700",
      tiktok: "from-black via-gray-900 to-pink-600",
      linkedin: "from-blue-600 to-blue-700"
    };
    computed(() => {
      if (!props.socialStats) return 0;
      return Object.values(props.socialStats).reduce((sum, stat) => sum + (stat.followers || 0), 0);
    });
    computed(() => {
      if (!props.socialStats) return 0;
      return Object.values(props.socialStats).reduce((sum, stat) => sum + (stat.total_posts || 0), 0);
    });
    computed(() => {
      if (!props.socialStats) return 0;
      return Object.values(props.socialStats).reduce((sum, stat) => sum + (stat.total_views || 0), 0);
    });
    computed(() => {
      if (!props.socialStats) return [];
      return Object.entries(props.socialStats).filter(([_, stat]) => stat.followers > 0 || stat.total_posts > 0);
    });
    const socialMediaLinks = computed(() => {
      return props.socialMediaLinks || [];
    });
    const getPlatformIcon = (platform) => {
      const platformLower = platform.toLowerCase();
      return platformIcons[platformLower] || platformIcons["medium"];
    };
    const getPlatformColor = (platform) => {
      const platformLower = platform.toLowerCase();
      return platformColors[platformLower] || "from-gray-600 to-gray-700";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: seoTitle.value }, null, _parent));
      _push(`<div class="flex min-h-screen flex-col items-center justify-around p-6"><div class="${ssrRenderClass(["w-full max-w-2xl transition-all duration-1000", isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"])}"><div class="text-center"><div class="mb-3 flex justify-center sm:mb-4"><div class="relative"><div class="absolute -inset-6 animate-pulse rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl"></div>`);
      if (logoPath.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", seoTitle.value)} class="relative h-40 w-40 rounded-full border-4 border-primary/20 object-cover shadow-2xl ring-4 ring-background transition-transform duration-500 hover:scale-105 sm:h-48 sm:w-48 md:h-56 md:w-56">`);
      } else {
        _push(`<div class="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 shadow-2xl sm:h-48 sm:w-48 md:h-56 md:w-56"><svg class="h-20 w-20 text-primary sm:h-24 sm:w-24 md:h-28 md:w-28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`);
      }
      _push(`<div class="absolute -bottom-2 -right-2 h-6 w-6 animate-pulse rounded-full border-4 border-background bg-green-500 shadow-lg"></div></div></div><h1 class="mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">${ssrInterpolate(seoTitle.value)}</h1><p class="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">${ssrInterpolate(seoDescription.value)}</p></div></div><div class="${ssrRenderClass(["w-full max-w-2xl transition-all duration-1000", isLoaded.value ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"])}">`);
      if (socialMediaLinks.value.length > 0) {
        _push(`<div class="flex flex-wrap justify-center gap-3 sm:gap-4"><!--[-->`);
        ssrRenderList(socialMediaLinks.value, (link, idx) => {
          _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer" style="${ssrRenderStyle({ animationDelay: `${idx * 100}ms` })}" class="${ssrRenderClass(["group relative flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:h-24 sm:w-24", getPlatformColor(link.platform)])}"><div class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10"></div><div class="relative flex flex-col items-center gap-1"><svg class="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24"><path${ssrRenderAttr("d", getPlatformIcon(link.platform))}></path></svg><span class="text-[10px] font-medium text-white sm:text-xs">${ssrInterpolate(link.platform)}</span></div></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center"><div class="mb-4 inline-flex rounded-full bg-muted/50 p-4"><svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></div><p class="text-sm text-muted-foreground">Henüz sosyal medya linki eklenmemiş</p></div>`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
