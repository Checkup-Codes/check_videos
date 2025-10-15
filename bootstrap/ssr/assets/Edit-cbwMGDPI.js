import { unref, withCtx, createVNode, withModifiers, createBlock, openBlock, withDirectives, vModelText, vModelSelect, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CABjR99w.js";
import "vuex";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    seo: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.seo.title,
      description: props.seo.description,
      keywords: props.seo.keywords,
      og_title: props.seo.og_title,
      og_description: props.seo.og_description,
      og_image: props.seo.og_image,
      canonical_url: props.seo.canonical_url,
      robots: props.seo.robots,
      schema_org: props.seo.schema_org ? JSON.stringify(props.seo.schema_org, null, 2) : ""
    });
    const submit = () => {
      form.put(route("seo.update", props.seo.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "SEO Ayarları" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"${_scopeId}>SEO Ayarları</h2><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Arama motorları ve sosyal medya için optimizasyon ayarları </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "text-2xl font-bold tracking-tight text-gray-900 dark:text-white" }, "SEO Ayarları"),
                  createVNode("p", { class: "mt-1 text-sm text-gray-600 dark:text-gray-400" }, " Arama motorları ve sosyal medya için optimizasyon ayarları ")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6"${_scopeId}><div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"${_scopeId}><form class="space-y-8"${_scopeId}><div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20"${_scopeId}><svg class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Temel SEO</h3></div><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Arama motorları için temel optimizasyon ayarları </p></div><div class="space-y-6 p-6"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Sayfa Başlığı</label><input type="text"${ssrRenderAttr("value", unref(form).title)} class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="Örn: En İyi Web Tasarım Hizmetleri" required${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Arama sonuçlarında görünen başlık. 50-60 karakter arasında olmalıdır. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Meta Açıklama</label><textarea class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" rows="3" placeholder="Sayfanızın ne hakkında olduğunu açıklayan kısa bir metin..." required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Arama sonuçlarında başlığın altında görünen açıklama. 150-160 karakter arasında olmalıdır. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Anahtar Kelimeler</label><input type="text"${ssrRenderAttr("value", unref(form).keywords)} class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="web tasarım, seo, dijital pazarlama"${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Sayfanızla ilgili anahtar kelimeler. Virgülle ayırarak yazın. </p></div></div></div><div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20"${_scopeId}><svg class="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Sosyal Medya</h3></div><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Facebook, Twitter ve diğer sosyal platformlar için optimizasyon </p></div><div class="space-y-6 p-6"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Paylaşım Başlığı</label><input type="text"${ssrRenderAttr("value", unref(form).og_title)} class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="Sosyal medyada paylaşılırken görünecek başlık"${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Sosyal medyada paylaşıldığında görünecek başlık. Boş bırakılırsa sayfa başlığı kullanılır. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Paylaşım Açıklaması</label><textarea class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" rows="3" placeholder="Sosyal medyada paylaşılırken görünecek açıklama"${_scopeId}>${ssrInterpolate(unref(form).og_description)}</textarea><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Sosyal medyada paylaşıldığında görünecek açıklama. Boş bırakılırsa meta açıklama kullanılır. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Paylaşım Görseli</label><input type="text"${ssrRenderAttr("value", unref(form).og_image)} class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="https://example.com/image.jpg"${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Sosyal medyada paylaşıldığında görünecek görsel URL&#39;si. 1200x630 piksel boyutunda olmalıdır. </p></div></div></div><div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"${_scopeId}><div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20"${_scopeId}><svg class="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Gelişmiş Ayarlar</h3></div><p class="mt-1 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Teknik SEO ve arama motoru yönlendirme ayarları </p></div><div class="space-y-6 p-6"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Canonical URL</label><input type="text"${ssrRenderAttr("value", unref(form).canonical_url)} class="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="https://example.com/canonical-page"${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Bu sayfanın kanonik (resmi) URL&#39;si. Duplicate content sorunlarını önlemek için kullanılır. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Robots Direktifleri</label><select class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"${_scopeId}><option value="index, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, follow") : ssrLooseEqual(unref(form).robots, "index, follow")) ? " selected" : ""}${_scopeId}>index, follow - Sayfayı indeksle ve linkleri takip et</option><option value="noindex, follow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, follow") : ssrLooseEqual(unref(form).robots, "noindex, follow")) ? " selected" : ""}${_scopeId}>noindex, follow - Sayfayı indeksleme ama linkleri takip et</option><option value="index, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "index, nofollow") : ssrLooseEqual(unref(form).robots, "index, nofollow")) ? " selected" : ""}${_scopeId}>index, nofollow - Sayfayı indeksle ama linkleri takip etme</option><option value="noindex, nofollow"${ssrIncludeBooleanAttr(Array.isArray(unref(form).robots) ? ssrLooseContain(unref(form).robots, "noindex, nofollow") : ssrLooseEqual(unref(form).robots, "noindex, nofollow")) ? " selected" : ""}${_scopeId}> noindex, nofollow - Sayfayı indeksleme ve linkleri takip etme </option></select><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Arama motorlarına bu sayfayı nasıl işleyeceklerini söyler. </p></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Schema.org JSON-LD</label><textarea class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 font-mono text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" rows="6" placeholder="{&quot;@context&quot;: &quot;https://schema.org&quot;, &quot;@type&quot;: &quot;WebPage&quot;, &quot;name&quot;: &quot;Sayfa Adı&quot;, &quot;description&quot;: &quot;Sayfa açıklaması&quot;}"${_scopeId}>${ssrInterpolate(unref(form).schema_org)}</textarea><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Yapılandırılmış veri için JSON-LD formatında Schema.org markup&#39;ı. Arama motorlarının içeriği daha iyi anlamasını sağlar. </p></div></div></div><div class="flex justify-end"${_scopeId}><button type="submit" class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="-ml-1 mr-3 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Değişiklikleri Kaydet")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-8"
                  }, [
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800" }, [
                      createVNode("div", { class: "border-b border-gray-200 px-6 py-4 dark:border-gray-700" }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 text-blue-600 dark:text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Temel SEO")
                        ]),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600 dark:text-gray-400" }, " Arama motorları için temel optimizasyon ayarları ")
                      ]),
                      createVNode("div", { class: "space-y-6 p-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Sayfa Başlığı"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            placeholder: "Örn: En İyi Web Tasarım Hizmetleri",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Arama sonuçlarında görünen başlık. 50-60 karakter arasında olmalıdır. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Meta Açıklama"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            class: "w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            rows: "3",
                            placeholder: "Sayfanızın ne hakkında olduğunu açıklayan kısa bir metin...",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Arama sonuçlarında başlığın altında görünen açıklama. 150-160 karakter arasında olmalıdır. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Anahtar Kelimeler"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            placeholder: "web tasarım, seo, dijital pazarlama"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).keywords]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Sayfanızla ilgili anahtar kelimeler. Virgülle ayırarak yazın. ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800" }, [
                      createVNode("div", { class: "border-b border-gray-200 px-6 py-4 dark:border-gray-700" }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 text-green-600 dark:text-green-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Sosyal Medya")
                        ]),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600 dark:text-gray-400" }, " Facebook, Twitter ve diğer sosyal platformlar için optimizasyon ")
                      ]),
                      createVNode("div", { class: "space-y-6 p-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Paylaşım Başlığı"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).og_title = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            placeholder: "Sosyal medyada paylaşılırken görünecek başlık"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).og_title]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Sosyal medyada paylaşıldığında görünecek başlık. Boş bırakılırsa sayfa başlığı kullanılır. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Paylaşım Açıklaması"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).og_description = $event,
                            class: "w-full resize-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            rows: "3",
                            placeholder: "Sosyal medyada paylaşılırken görünecek açıklama"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).og_description]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Sosyal medyada paylaşıldığında görünecek açıklama. Boş bırakılırsa meta açıklama kullanılır. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Paylaşım Görseli"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).og_image = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            placeholder: "https://example.com/image.jpg"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).og_image]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Sosyal medyada paylaşıldığında görünecek görsel URL'si. 1200x630 piksel boyutunda olmalıdır. ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800" }, [
                      createVNode("div", { class: "border-b border-gray-200 px-6 py-4 dark:border-gray-700" }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 text-purple-600 dark:text-purple-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Gelişmiş Ayarlar")
                        ]),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600 dark:text-gray-400" }, " Teknik SEO ve arama motoru yönlendirme ayarları ")
                      ]),
                      createVNode("div", { class: "space-y-6 p-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Canonical URL"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).canonical_url = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            placeholder: "https://example.com/canonical-page"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).canonical_url]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Bu sayfanın kanonik (resmi) URL'si. Duplicate content sorunlarını önlemek için kullanılır. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Robots Direktifleri"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).robots = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          }, [
                            createVNode("option", { value: "index, follow" }, "index, follow - Sayfayı indeksle ve linkleri takip et"),
                            createVNode("option", { value: "noindex, follow" }, "noindex, follow - Sayfayı indeksleme ama linkleri takip et"),
                            createVNode("option", { value: "index, nofollow" }, "index, nofollow - Sayfayı indeksle ama linkleri takip etme"),
                            createVNode("option", { value: "noindex, nofollow" }, " noindex, nofollow - Sayfayı indeksleme ve linkleri takip etme ")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).robots]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Arama motorlarına bu sayfayı nasıl işleyeceklerini söyler. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Schema.org JSON-LD"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).schema_org = $event,
                            class: "w-full resize-none rounded-md border border-gray-300 px-3 py-2 font-mono text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500",
                            rows: "6",
                            placeholder: '{"@context": "https://schema.org", "@type": "WebPage", "name": "Sayfa Adı", "description": "Sayfa açıklaması"}'
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).schema_org]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Yapılandırılmış veri için JSON-LD formatında Schema.org markup'ı. Arama motorlarının içeriği daha iyi anlamasını sağlar. ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("button", {
                        type: "submit",
                        class: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
                        disabled: unref(form).processing
                      }, [
                        unref(form).processing ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "-ml-1 mr-3 h-4 w-4 animate-spin text-white",
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
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Değişiklikleri Kaydet"), 1)
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
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
