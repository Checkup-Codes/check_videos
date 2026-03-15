import { ref, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, withModifiers, createTextVNode, withDirectives, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import { _ as _sfc_main$2 } from "./InputError-BNVGxBhc.js";
import "vuex";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    seo: { type: Object, required: true },
    logo: { type: Object, default: null },
    screen: { type: Object, default: null },
    currentDomain: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const uploading = ref({
      logo: false,
      favicon: false,
      appleTouchIcon: false,
      ogImage: false
    });
    const logoInput = ref(null);
    const faviconInput = ref(null);
    const appleTouchIconInput = ref(null);
    const ogImageInput = ref(null);
    const form = useForm({
      site_name: props.seo.site_name || "",
      logo: props.seo.logo || "",
      tagline: props.seo.tagline || "",
      title: props.seo.title || "",
      description: props.seo.description || "",
      keywords: props.seo.keywords || "",
      author: props.seo.author || "",
      language: props.seo.language || "tr",
      locale: props.seo.locale || "tr_TR",
      og_title: props.seo.og_title || "",
      og_description: props.seo.og_description || "",
      og_image: props.seo.og_image || "",
      twitter_card: props.seo.twitter_card || "summary_large_image",
      twitter_site: props.seo.twitter_site || "",
      twitter_creator: props.seo.twitter_creator || "",
      favicon: props.seo.favicon || "",
      apple_touch_icon: props.seo.apple_touch_icon || "",
      theme_color: props.seo.theme_color || "#000000",
      canonical_url: props.seo.canonical_url || "",
      robots: props.seo.robots || "index, follow",
      schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : "",
      google_verification: props.seo.google_verification || "",
      bing_verification: props.seo.bing_verification || "",
      yandex_verification: props.seo.yandex_verification || "",
      google_analytics_id: props.seo.google_analytics_id || "",
      google_tag_manager_id: props.seo.google_tag_manager_id || ""
    });
    const submit = () => {
      form.put(route("seo.update"));
    };
    const uploadLogo = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.logo = true;
      const formData = new FormData();
      formData.append("logo", file);
      try {
        const response = await fetch(route("seo.upload-logo"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.logo = data.path;
      } catch (error) {
        console.error("Logo upload failed:", error);
      } finally {
        uploading.value.logo = false;
      }
    };
    const uploadFavicon = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.favicon = true;
      const formData = new FormData();
      formData.append("favicon", file);
      try {
        const response = await fetch(route("seo.upload-favicon"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.favicon = data.path;
      } catch (error) {
        console.error("Favicon upload failed:", error);
      } finally {
        uploading.value.favicon = false;
      }
    };
    const uploadAppleTouchIcon = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.appleTouchIcon = true;
      const formData = new FormData();
      formData.append("apple_touch_icon", file);
      try {
        const response = await fetch(route("seo.upload-apple-touch-icon"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.apple_touch_icon = data.path;
      } catch (error) {
        console.error("Apple Touch Icon upload failed:", error);
      } finally {
        uploading.value.appleTouchIcon = false;
      }
    };
    const uploadOgImage = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      uploading.value.ogImage = true;
      const formData = new FormData();
      formData.append("og_image", file);
      try {
        const response = await fetch(route("seo.upload-og-image"), {
          method: "POST",
          body: formData,
          headers: { "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content }
        });
        const data = await response.json();
        form.og_image = data.path;
      } catch (error) {
        console.error("OG Image upload failed:", error);
      } finally {
        uploading.value.ogImage = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: ((_b = (_a = __props.screen) == null ? void 0 : _a.seo) == null ? void 0 : _b.title) || "SEO Ayarları"
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-background p-4 md:p-6"${_scopeId}><div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>SEO Ayarları</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Google&#39;da nasıl görüneceğinizi yönetin </p></div><div class="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"${_scopeId}></path></svg><span class="text-sm font-medium text-primary"${_scopeId}>${ssrInterpolate(__props.currentDomain)}</span></div></div></div><form class="space-y-6"${_scopeId}><div class="rounded-lg border border-border bg-card p-6"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Temel Bilgiler</h2></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label for="site_name" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Site Adı <span class="text-destructive"${_scopeId}>*</span></label><input id="site_name"${ssrRenderAttr("value", unref(form).site_name)} type="text" required placeholder="Örn: İlber Ortaylı" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Google&#39;da ve tarayıcı sekmesinde görünecek</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.site_name,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="tagline" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Slogan </label><input id="tagline"${ssrRenderAttr("value", unref(form).tagline)} type="text" placeholder="Örn: Tarihçi, Yazar, Akademisyen" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Site adınızın altında görünecek kısa açıklama</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.tagline,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="description" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Site Açıklaması <span class="text-destructive"${_scopeId}>*</span></label><textarea id="description" required maxlength="160" rows="3" placeholder="Örn: Osmanlı tarihi, kültür ve sanat üzerine yazılar, videolar ve röportajlar. Prof. Dr. İlber Ortaylı&#39;nın resmi web sitesi." class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea><div class="mt-1 flex items-center justify-between"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Google arama sonuçlarında görünecek</p><span class="${ssrRenderClass(["text-xs font-medium", ((_c = unref(form).description) == null ? void 0 : _c.length) > 155 ? "text-destructive" : "text-muted-foreground"])}"${_scopeId}>${ssrInterpolate(((_d = unref(form).description) == null ? void 0 : _d.length) || 0)}/160 </span></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.description,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="keywords" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Anahtar Kelimeler </label><input id="keywords"${ssrRenderAttr("value", unref(form).keywords)} type="text" placeholder="Örn: tarih, osmanlı, kültür, sanat, akademisyen" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Virgülle ayırarak yazın</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.keywords,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="rounded-lg border border-border bg-card p-6"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div><div${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Logo ve Simgeler</h2><p class="text-xs text-muted-foreground"${_scopeId}>Sitenizin her yerinde kullanılacak logo ve simgeler</p></div></div><div class="space-y-6"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}> Site Logosu <span class="text-destructive"${_scopeId}>*</span></label>`);
            if (unref(form).logo) {
              _push2(`<div class="relative mb-3 inline-block"${_scopeId}><img${ssrRenderAttr("src", unref(form).logo)} class="h-20 rounded-lg border border-border bg-white p-2 object-contain" alt="Logo"${_scopeId}><button type="button" class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><input type="file" accept=".jpg,.jpeg,.png,.svg,.webp" class="hidden"${_scopeId}><button type="button"${ssrIncludeBooleanAttr(uploading.value.logo) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"${_scopeId}>`);
            if (!uploading.value.logo) {
              _push2(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (uploading.value.logo) {
              _push2(`<span${_scopeId}>Yükleniyor...</span>`);
            } else {
              _push2(`<span${_scopeId}>Logo Yükle</span>`);
            }
            _push2(`</button><span class="text-xs text-muted-foreground"${_scopeId}>veya</span><input${ssrRenderAttr("value", unref(form).logo)} type="text" placeholder="/storage/logo.png" class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Navbar, footer ve tüm sayfalarda kullanılacak (PNG veya SVG önerilir)</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.logo,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}> Favicon (Tarayıcı Simgesi) </label>`);
            if (unref(form).favicon) {
              _push2(`<div class="relative mb-3 inline-block"${_scopeId}><img${ssrRenderAttr("src", unref(form).favicon)} class="h-16 w-16 rounded-lg border border-border bg-white p-1 object-contain" alt="Favicon"${_scopeId}><button type="button" class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><input type="file" accept=".ico,.png,.svg" class="hidden"${_scopeId}><button type="button"${ssrIncludeBooleanAttr(uploading.value.favicon) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"${_scopeId}>`);
            if (!uploading.value.favicon) {
              _push2(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (uploading.value.favicon) {
              _push2(`<span${_scopeId}>Yükleniyor...</span>`);
            } else {
              _push2(`<span${_scopeId}>Favicon Yükle</span>`);
            }
            _push2(`</button><span class="text-xs text-muted-foreground"${_scopeId}>veya</span><input${ssrRenderAttr("value", unref(form).favicon)} type="text" placeholder="/storage/favicon.ico" class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Tarayıcı sekmesinde görünecek küçük simge (32x32 veya 64x64 önerilir)</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.favicon,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}> Apple Touch Icon </label>`);
            if (unref(form).apple_touch_icon) {
              _push2(`<div class="relative mb-3 inline-block"${_scopeId}><img${ssrRenderAttr("src", unref(form).apple_touch_icon)} class="h-20 w-20 rounded-lg border border-border bg-white p-1 object-contain" alt="Apple Touch Icon"${_scopeId}><button type="button" class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><input type="file" accept=".png" class="hidden"${_scopeId}><button type="button"${ssrIncludeBooleanAttr(uploading.value.appleTouchIcon) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"${_scopeId}>`);
            if (!uploading.value.appleTouchIcon) {
              _push2(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (uploading.value.appleTouchIcon) {
              _push2(`<span${_scopeId}>Yükleniyor...</span>`);
            } else {
              _push2(`<span${_scopeId}>Apple Icon Yükle</span>`);
            }
            _push2(`</button><span class="text-xs text-muted-foreground"${_scopeId}>veya</span><input${ssrRenderAttr("value", unref(form).apple_touch_icon)} type="text" placeholder="/storage/apple-touch-icon.png" class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>iPhone/iPad ana ekrana eklendiğinde görünecek (180x180 önerilir)</p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form).errors.apple_touch_icon,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="rounded-lg border border-border bg-card p-6"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg></div><div${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Sosyal Medya Paylaşımı</h2><p class="text-xs text-muted-foreground"${_scopeId}>Facebook, Twitter, WhatsApp&#39;ta nasıl görüneceğinizi belirleyin</p></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}> Paylaşım Görseli (1200x630 önerilir) </label>`);
            if (unref(form).og_image) {
              _push2(`<div class="relative mb-3 inline-block"${_scopeId}><img${ssrRenderAttr("src", unref(form).og_image)} class="h-32 rounded-lg border border-border object-cover" alt="OG Image"${_scopeId}><button type="button" class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-3"${_scopeId}><input type="file" accept=".jpg,.jpeg,.png,.webp" class="hidden"${_scopeId}><button type="button"${ssrIncludeBooleanAttr(uploading.value.ogImage) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"${_scopeId}>`);
            if (!uploading.value.ogImage) {
              _push2(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (uploading.value.ogImage) {
              _push2(`<span${_scopeId}>Yükleniyor...</span>`);
            } else {
              _push2(`<span${_scopeId}>Görsel Yükle</span>`);
            }
            _push2(`</button><span class="text-xs text-muted-foreground"${_scopeId}>veya</span><input${ssrRenderAttr("value", unref(form).og_image)} type="text" placeholder="https://ornek.com/gorsel.jpg" class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Siteniz paylaşıldığında gösterilecek görsel</p></div><div class="grid gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label for="twitter_site" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Twitter Hesabı </label><input id="twitter_site"${ssrRenderAttr("value", unref(form).twitter_site)} type="text" placeholder="@ilberortayli" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div><div${_scopeId}><label for="twitter_creator" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> İçerik Oluşturucu </label><input id="twitter_creator"${ssrRenderAttr("value", unref(form).twitter_creator)} type="text" placeholder="@ilberortayli" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}></div></div></div></div><div class="rounded-lg border border-border bg-card p-6"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg></div><div${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Google Ayarları</h2><p class="text-xs text-muted-foreground"${_scopeId}>Ziyaretçi takibi ve site doğrulama</p></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label for="google_analytics_id" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Google Analytics ID </label><input id="google_analytics_id"${ssrRenderAttr("value", unref(form).google_analytics_id)} type="text" placeholder="G-XXXXXXXXXX" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}><p class="mt-1 text-xs text-muted-foreground"${_scopeId}><a href="https://analytics.google.com" target="_blank" class="text-primary hover:underline"${_scopeId}>Google Analytics</a>&#39;ten alabilirsiniz </p></div><div${_scopeId}><label for="google_verification" class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Google Search Console Doğrulama Kodu </label><input id="google_verification"${ssrRenderAttr("value", unref(form).google_verification)} type="text" placeholder="abc123def456..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId}><p class="mt-1 text-xs text-muted-foreground"${_scopeId}><a href="https://search.google.com/search-console" target="_blank" class="text-primary hover:underline"${_scopeId}>Search Console</a>&#39;dan alabilirsiniz </p></div></div></div><div class="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><div class="flex-1"${_scopeId}><h3 class="font-semibold text-green-900 dark:text-green-100"${_scopeId}>Otomatik SEO Optimizasyonu Aktif</h3><p class="mt-1 text-sm text-green-700 dark:text-green-300"${_scopeId}> Siteniz Google&#39;da daha iyi görünmek için otomatik olarak yapılandırılmış veri kullanıyor. Yazılarınız, testleriniz ve sertifikalarınız Google&#39;da düzgün listelenecek. </p><div class="mt-3 flex flex-wrap gap-2"${_scopeId}><a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"${_scopeId}> Test Et <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a></div></div></div></div><div class="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}> Değişiklikler hemen aktif olacak </p><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span${_scopeId}>Kaydediliyor...</span>`);
            } else {
              _push2(`<span${_scopeId}>Kaydet</span>`);
            }
            _push2(`</button></div></form>`);
            if ((_e = _ctx.$page.props.flash) == null ? void 0 : _e.success) {
              _push2(`<div class="fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: ((_g = (_f = __props.screen) == null ? void 0 : _f.seo) == null ? void 0 : _g.title) || "SEO Ayarları"
              }, null, 8, ["title"]),
              createVNode("div", { class: "min-h-screen bg-background p-4 md:p-6" }, [
                createVNode("div", { class: "mx-auto max-w-4xl" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-foreground" }, "SEO Ayarları"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Google'da nasıl görüneceğinizi yönetin ")
                      ]),
                      createVNode("div", { class: "flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4 text-primary",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          })
                        ])),
                        createVNode("span", { class: "text-sm font-medium text-primary" }, toDisplayString(__props.currentDomain), 1)
                      ])
                    ])
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-primary",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ]))
                        ]),
                        createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Temel Bilgiler")
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "site_name",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, [
                            createTextVNode(" Site Adı "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "site_name",
                            "onUpdate:modelValue": ($event) => unref(form).site_name = $event,
                            type: "text",
                            required: "",
                            placeholder: "Örn: İlber Ortaylı",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).site_name]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Google'da ve tarayıcı sekmesinde görünecek"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.site_name,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "tagline",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, " Slogan "),
                          withDirectives(createVNode("input", {
                            id: "tagline",
                            "onUpdate:modelValue": ($event) => unref(form).tagline = $event,
                            type: "text",
                            placeholder: "Örn: Tarihçi, Yazar, Akademisyen",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).tagline]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Site adınızın altında görünecek kısa açıklama"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.tagline,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "description",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, [
                            createTextVNode(" Site Açıklaması "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            required: "",
                            maxlength: "160",
                            rows: "3",
                            placeholder: "Örn: Osmanlı tarihi, kültür ve sanat üzerine yazılar, videolar ve röportajlar. Prof. Dr. İlber Ortaylı'nın resmi web sitesi.",
                            class: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode("div", { class: "mt-1 flex items-center justify-between" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Google arama sonuçlarında görünecek"),
                            createVNode("span", {
                              class: ["text-xs font-medium", ((_h = unref(form).description) == null ? void 0 : _h.length) > 155 ? "text-destructive" : "text-muted-foreground"]
                            }, toDisplayString(((_i = unref(form).description) == null ? void 0 : _i.length) || 0) + "/160 ", 3)
                          ]),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.description,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "keywords",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, " Anahtar Kelimeler "),
                          withDirectives(createVNode("input", {
                            id: "keywords",
                            "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                            type: "text",
                            placeholder: "Örn: tarih, osmanlı, kültür, sanat, akademisyen",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).keywords]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Virgülle ayırarak yazın"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.keywords,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-primary",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Logo ve Simgeler"),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Sitenizin her yerinde kullanılacak logo ve simgeler")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                            createTextVNode(" Site Logosu "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          unref(form).logo ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative mb-3 inline-block"
                          }, [
                            createVNode("img", {
                              src: unref(form).logo,
                              class: "h-20 rounded-lg border border-border bg-white p-2 object-contain",
                              alt: "Logo"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => unref(form).logo = "",
                              class: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("input", {
                              type: "file",
                              ref_key: "logoInput",
                              ref: logoInput,
                              onChange: uploadLogo,
                              accept: ".jpg,.jpeg,.png,.svg,.webp",
                              class: "hidden"
                            }, null, 544),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => _ctx.$refs.logoInput.click(),
                              disabled: uploading.value.logo,
                              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            }, [
                              !uploading.value.logo ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])) : createCommentVNode("", true),
                              uploading.value.logo ? (openBlock(), createBlock("span", { key: 1 }, "Yükleniyor...")) : (openBlock(), createBlock("span", { key: 2 }, "Logo Yükle"))
                            ], 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).logo = $event,
                              type: "text",
                              placeholder: "/storage/logo.png",
                              class: "flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).logo]
                            ])
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Navbar, footer ve tüm sayfalarda kullanılacak (PNG veya SVG önerilir)"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.logo,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, " Favicon (Tarayıcı Simgesi) "),
                          unref(form).favicon ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative mb-3 inline-block"
                          }, [
                            createVNode("img", {
                              src: unref(form).favicon,
                              class: "h-16 w-16 rounded-lg border border-border bg-white p-1 object-contain",
                              alt: "Favicon"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => unref(form).favicon = "",
                              class: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("input", {
                              type: "file",
                              ref_key: "faviconInput",
                              ref: faviconInput,
                              onChange: uploadFavicon,
                              accept: ".ico,.png,.svg",
                              class: "hidden"
                            }, null, 544),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => _ctx.$refs.faviconInput.click(),
                              disabled: uploading.value.favicon,
                              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            }, [
                              !uploading.value.favicon ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])) : createCommentVNode("", true),
                              uploading.value.favicon ? (openBlock(), createBlock("span", { key: 1 }, "Yükleniyor...")) : (openBlock(), createBlock("span", { key: 2 }, "Favicon Yükle"))
                            ], 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).favicon = $event,
                              type: "text",
                              placeholder: "/storage/favicon.ico",
                              class: "flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).favicon]
                            ])
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Tarayıcı sekmesinde görünecek küçük simge (32x32 veya 64x64 önerilir)"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.favicon,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, " Apple Touch Icon "),
                          unref(form).apple_touch_icon ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative mb-3 inline-block"
                          }, [
                            createVNode("img", {
                              src: unref(form).apple_touch_icon,
                              class: "h-20 w-20 rounded-lg border border-border bg-white p-1 object-contain",
                              alt: "Apple Touch Icon"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => unref(form).apple_touch_icon = "",
                              class: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("input", {
                              type: "file",
                              ref_key: "appleTouchIconInput",
                              ref: appleTouchIconInput,
                              onChange: uploadAppleTouchIcon,
                              accept: ".png",
                              class: "hidden"
                            }, null, 544),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => _ctx.$refs.appleTouchIconInput.click(),
                              disabled: uploading.value.appleTouchIcon,
                              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            }, [
                              !uploading.value.appleTouchIcon ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])) : createCommentVNode("", true),
                              uploading.value.appleTouchIcon ? (openBlock(), createBlock("span", { key: 1 }, "Yükleniyor...")) : (openBlock(), createBlock("span", { key: 2 }, "Apple Icon Yükle"))
                            ], 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).apple_touch_icon = $event,
                              type: "text",
                              placeholder: "/storage/apple-touch-icon.png",
                              class: "flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).apple_touch_icon]
                            ])
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "iPhone/iPad ana ekrana eklendiğinde görünecek (180x180 önerilir)"),
                          createVNode(_sfc_main$2, {
                            message: unref(form).errors.apple_touch_icon,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-primary",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Sosyal Medya Paylaşımı"),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Facebook, Twitter, WhatsApp'ta nasıl görüneceğinizi belirleyin")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, " Paylaşım Görseli (1200x630 önerilir) "),
                          unref(form).og_image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative mb-3 inline-block"
                          }, [
                            createVNode("img", {
                              src: unref(form).og_image,
                              class: "h-32 rounded-lg border border-border object-cover",
                              alt: "OG Image"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => unref(form).og_image = "",
                              class: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("input", {
                              type: "file",
                              ref_key: "ogImageInput",
                              ref: ogImageInput,
                              onChange: uploadOgImage,
                              accept: ".jpg,.jpeg,.png,.webp",
                              class: "hidden"
                            }, null, 544),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => _ctx.$refs.ogImageInput.click(),
                              disabled: uploading.value.ogImage,
                              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            }, [
                              !uploading.value.ogImage ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])) : createCommentVNode("", true),
                              uploading.value.ogImage ? (openBlock(), createBlock("span", { key: 1 }, "Yükleniyor...")) : (openBlock(), createBlock("span", { key: 2 }, "Görsel Yükle"))
                            ], 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "veya"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                              type: "text",
                              placeholder: "https://ornek.com/gorsel.jpg",
                              class: "flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).og_image]
                            ])
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Siteniz paylaşıldığında gösterilecek görsel")
                        ]),
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "twitter_site",
                              class: "mb-1.5 block text-sm font-medium text-foreground"
                            }, " Twitter Hesabı "),
                            withDirectives(createVNode("input", {
                              id: "twitter_site",
                              "onUpdate:modelValue": ($event) => unref(form).twitter_site = $event,
                              type: "text",
                              placeholder: "@ilberortayli",
                              class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).twitter_site]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "twitter_creator",
                              class: "mb-1.5 block text-sm font-medium text-foreground"
                            }, " İçerik Oluşturucu "),
                            withDirectives(createVNode("input", {
                              id: "twitter_creator",
                              "onUpdate:modelValue": ($event) => unref(form).twitter_creator = $event,
                              type: "text",
                              placeholder: "@ilberortayli",
                              class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).twitter_creator]
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-6" }, [
                      createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-primary",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Google Ayarları"),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Ziyaretçi takibi ve site doğrulama")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "google_analytics_id",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, " Google Analytics ID "),
                          withDirectives(createVNode("input", {
                            id: "google_analytics_id",
                            "onUpdate:modelValue": ($event) => unref(form).google_analytics_id = $event,
                            type: "text",
                            placeholder: "G-XXXXXXXXXX",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).google_analytics_id]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, [
                            createVNode("a", {
                              href: "https://analytics.google.com",
                              target: "_blank",
                              class: "text-primary hover:underline"
                            }, "Google Analytics"),
                            createTextVNode("'ten alabilirsiniz ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "google_verification",
                            class: "mb-1.5 block text-sm font-medium text-foreground"
                          }, " Google Search Console Doğrulama Kodu "),
                          withDirectives(createVNode("input", {
                            id: "google_verification",
                            "onUpdate:modelValue": ($event) => unref(form).google_verification = $event,
                            type: "text",
                            placeholder: "abc123def456...",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).google_verification]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, [
                            createVNode("a", {
                              href: "https://search.google.com/search-console",
                              target: "_blank",
                              class: "text-primary hover:underline"
                            }, "Search Console"),
                            createTextVNode("'dan alabilirsiniz ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        (openBlock(), createBlock("svg", {
                          class: "mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h3", { class: "font-semibold text-green-900 dark:text-green-100" }, "Otomatik SEO Optimizasyonu Aktif"),
                          createVNode("p", { class: "mt-1 text-sm text-green-700 dark:text-green-300" }, " Siteniz Google'da daha iyi görünmek için otomatik olarak yapılandırılmış veri kullanıyor. Yazılarınız, testleriniz ve sertifikalarınız Google'da düzgün listelenecek. "),
                          createVNode("div", { class: "mt-3 flex flex-wrap gap-2" }, [
                            createVNode("a", {
                              href: "https://search.google.com/test/rich-results",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              class: "inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                            }, [
                              createTextVNode(" Test Et "),
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                })
                              ]))
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Değişiklikler hemen aktif olacak "),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "mr-2 h-4 w-4 animate-spin",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])) : createCommentVNode("", true),
                        unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Kaydediliyor...")) : (openBlock(), createBlock("span", { key: 2 }, "Kaydet"))
                      ], 8, ["disabled"])
                    ])
                  ], 32),
                  ((_j = _ctx.$page.props.flash) == null ? void 0 : _j.success) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg"
                  }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M5 13l4 4L19 7"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(_ctx.$page.props.flash.success), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seo/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
