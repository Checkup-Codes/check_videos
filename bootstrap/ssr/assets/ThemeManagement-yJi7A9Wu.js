import { ref, computed, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useStore } from "vuex";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-HHDrlpa6.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "ThemeManagement",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useStore();
    const selectedTheme = ref(null);
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const availableThemes = computed(() => store.getters["Theme/getAvailableThemes"]);
    const customTheme = computed(() => store.getters["Theme/getCustomTheme"]);
    const changeTheme = (theme) => {
      store.dispatch("Theme/changeTheme", theme);
      selectedTheme.value = null;
    };
    const showThemeDetails = (theme) => {
      selectedTheme.value = theme;
    };
    const updateCustomTheme = () => {
      store.dispatch("Theme/updateCustomTheme", customTheme.value);
    };
    const getThemeIcon = (theme) => {
      const icons = {
        light: "☀️",
        dark: "🌙",
        lotr: "🧙‍♂️",
        neon: "💡",
        cyberpunk: "🤖",
        nature: "🌿",
        ocean: "🌊",
        sunset: "🌅",
        custom: "⚙️"
      };
      return icons[theme] || "🎨";
    };
    const getThemeName = (theme) => {
      const names = {
        light: "Açık Tema",
        dark: "Koyu Tema",
        lotr: "Lord of the Rings",
        neon: "Neon Teması",
        cyberpunk: "Cyberpunk",
        nature: "Doğa Teması",
        ocean: "Okyanus Teması",
        sunset: "Gün Batımı",
        custom: "Özel Tema"
      };
      return names[theme] || theme;
    };
    const getThemeDescription = (theme) => {
      const descriptions = {
        light: "Klasik açık tema, günlük kullanım için ideal",
        dark: "Göz yormayan koyu tema, gece kullanımı için mükemmel",
        lotr: "J.R.R. Tolkien'in efsanevi dünyasından ilham alınmış tema",
        neon: "Neon ışıklar ve parlak renklerle dolu futuristik tema",
        cyberpunk: "Cyberpunk dünyasından ilham alınmış neon ve karanlık tema",
        nature: "Doğanın huzur verici yeşil ve kahverengi tonları",
        ocean: "Okyanusun derinliklerinden ilham alınmış mavi tonlar",
        sunset: "Gün batımının sıcak turuncu ve pembe tonları",
        custom: "Kendi renklerinizi ve ayarlarınızı özelleştirin"
      };
      return descriptions[theme] || "Tema açıklaması";
    };
    const getThemeColors = (theme) => {
      const colors = {
        light: ["#570df8", "#f000b8", "#37cdbe", "#3d4451", "#ffffff"],
        dark: ["#570df8", "#f000b8", "#37cdbe", "#ffffff", "#1f2937"],
        lotr: ["#d4af37", "#8b4513", "#ffd700", "#2d1810", "#f5f5dc"],
        neon: ["#00ffff", "#ff00ff", "#00ff00", "#1a1a1a", "#0d0d0d"],
        cyberpunk: ["#ff0000", "#ffff00", "#0000ff", "#262626", "#141414"],
        nature: ["#22c55e", "#f97316", "#eab308", "#365314", "#f0fdf4"],
        ocean: ["#3b82f6", "#06b6d4", "#1d4ed8", "#1e3a8a", "#f0f9ff"],
        sunset: ["#fb923c", "#ec4899", "#fbbf24", "#9a3412", "#fff7ed"],
        custom: ["#570df8", "#f000b8", "#37cdbe", "#3d4451", "#ffffff"]
      };
      return colors[theme] || ["#000000", "#ffffff", "#cccccc", "#999999", "#666666"];
    };
    const getThemeColorDetails = (theme) => {
      const colorDetails = {
        light: {
          primary: { name: "Primary", value: "#570df8" },
          secondary: { name: "Secondary", value: "#f000b8" },
          accent: { name: "Accent", value: "#37cdbe" },
          neutral: { name: "Neutral", value: "#3d4451" },
          "base-100": { name: "Base 100", value: "#ffffff" }
        },
        dark: {
          primary: { name: "Primary", value: "#570df8" },
          secondary: { name: "Secondary", value: "#f000b8" },
          accent: { name: "Accent", value: "#37cdbe" },
          neutral: { name: "Neutral", value: "#ffffff" },
          "base-100": { name: "Base 100", value: "#1f2937" }
        },
        lotr: {
          primary: { name: "Primary (Altın)", value: "#d4af37" },
          secondary: { name: "Secondary (Kahve)", value: "#8b4513" },
          accent: { name: "Accent (Parlak Altın)", value: "#ffd700" },
          neutral: { name: "Neutral (Koyu Kahve)", value: "#2d1810" },
          "base-100": { name: "Base 100 (Bej)", value: "#f5f5dc" }
        }
      };
      return colorDetails[theme] || {};
    };
    const getThemeFeatures = (theme) => {
      const features = {
        light: ["Klasik açık tasarım", "Yüksek kontrast", "Günlük kullanım için optimize", "Hızlı okuma deneyimi"],
        dark: ["Göz yormayan koyu arka plan", "Gece kullanımı için ideal", "Enerji tasarrufu", "Modern görünüm"],
        lotr: [
          "Orta Çağ tarzı font (Cinzel)",
          "Altın ve kahverengi renk paleti",
          "Özel hover animasyonları",
          "Gradient arka planlar",
          "Kahverengi tonlarında gölgeler",
          "Yumuşak border radius"
        ]
      };
      return features[theme] || ["Tema özellikleri"];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-base-content"${_scopeId}>Tema Yönetimi</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-base-content" }, "Tema Yönetimi")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-base-200 shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-base-content"${_scopeId}><h1 class="mb-8 text-center text-4xl font-bold"${_scopeId}>Tema Yönetimi</h1><div class="card mb-8 bg-base-200 p-6"${_scopeId}><h2 class="mb-4 text-2xl font-semibold"${_scopeId}>Mevcut Tema</h2><div class="flex items-center gap-4"${_scopeId}><div class="text-3xl"${_scopeId}>${ssrInterpolate(getThemeIcon(currentTheme.value))}</div><div${_scopeId}><h3 class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(getThemeName(currentTheme.value))}</h3><p class="text-base-content/70"${_scopeId}>${ssrInterpolate(getThemeDescription(currentTheme.value))}</p></div></div></div><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(availableThemes.value, (theme) => {
              _push2(`<div class="card cursor-pointer bg-base-200 transition-all duration-300 hover:shadow-lg"${_scopeId}><div class="card-body"${_scopeId}><div class="mb-4 flex items-center gap-3"${_scopeId}><div class="text-2xl"${_scopeId}>${ssrInterpolate(getThemeIcon(theme))}</div><h3 class="card-title"${_scopeId}>${ssrInterpolate(getThemeName(theme))}</h3></div><div class="mb-4 grid grid-cols-5 gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(getThemeColors(theme), (color, index) => {
                _push2(`<div class="h-8 w-8 rounded border border-base-300" style="${ssrRenderStyle({ backgroundColor: color })}"${ssrRenderAttr("title", color)}${_scopeId}></div>`);
              });
              _push2(`<!--]--></div><p class="text-base-content/70 mb-4 text-sm"${_scopeId}>${ssrInterpolate(getThemeDescription(theme))}</p><div class="card-actions justify-end"${_scopeId}><button class="${ssrRenderClass(["btn btn-sm", currentTheme.value === theme ? "btn-primary" : "btn-outline"])}"${_scopeId}>${ssrInterpolate(currentTheme.value === theme ? "Aktif" : "Seç")}</button></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (selectedTheme.value && selectedTheme.value !== "custom") {
              _push2(`<div class="modal-open modal"${_scopeId}><div class="modal-box max-w-4xl"${_scopeId}><h3 class="mb-4 text-2xl font-bold"${_scopeId}>${ssrInterpolate(getThemeIcon(selectedTheme.value))} ${ssrInterpolate(getThemeName(selectedTheme.value))}</h3><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"${_scopeId}><div${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Renk Paleti</h4><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(getThemeColorDetails(selectedTheme.value), (color, name) => {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="h-8 w-8 rounded border border-base-300" style="${ssrRenderStyle({ backgroundColor: color.value })}"${_scopeId}></div><div class="flex-1"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(color.name)}</div><div class="text-base-content/70 text-sm"${_scopeId}>${ssrInterpolate(color.value)}</div></div></div>`);
              });
              _push2(`<!--]--></div></div><div${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Özellikler</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(getThemeFeatures(selectedTheme.value), (feature) => {
                _push2(`<div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(feature)}</span></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="mt-6"${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Örnek Bileşenler</h4><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><button class="btn btn-primary"${_scopeId}>Primary Button</button><button class="btn btn-secondary"${_scopeId}>Secondary Button</button><button class="btn btn-accent"${_scopeId}>Accent Button</button></div><div class="mt-4"${_scopeId}><div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Bu tema ile uyumlu alert örneği</span></div></div></div><div class="modal-action"${_scopeId}><button class="btn"${_scopeId}>Kapat</button><button class="${ssrRenderClass(["btn", currentTheme.value === selectedTheme.value ? "btn-primary" : "btn-outline"])}"${_scopeId}>${ssrInterpolate(currentTheme.value === selectedTheme.value ? "Aktif Tema" : "Bu Temayı Seç")}</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (selectedTheme.value === "custom") {
              _push2(`<div class="modal-open modal"${_scopeId}><div class="modal-box max-w-6xl"${_scopeId}><h3 class="mb-4 text-2xl font-bold"${_scopeId}>⚙️ Özel Tema Ayarları</h3><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"${_scopeId}><div${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Renk Ayarları</h4><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Primary Renk</span></label><input type="color"${ssrRenderAttr("value", customTheme.value.primary)} class="input-bordered input w-full"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Secondary Renk</span></label><input type="color"${ssrRenderAttr("value", customTheme.value.secondary)} class="input-bordered input w-full"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Accent Renk</span></label><input type="color"${ssrRenderAttr("value", customTheme.value.accent)} class="input-bordered input w-full"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Neutral Renk</span></label><input type="color"${ssrRenderAttr("value", customTheme.value.neutral)} class="input-bordered input w-full"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Base 100 Renk</span></label><input type="color"${ssrRenderAttr("value", customTheme.value["base-100"])} class="input-bordered input w-full"${_scopeId}></div></div></div><div${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Stil Ayarları</h4><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Border Radius</span></label><input type="range" min="0" max="2" step="0.1"${ssrRenderAttr("value", customTheme.value.borderRadius)} class="range range-primary"${_scopeId}><div class="text-base-content/70 text-sm"${_scopeId}>${ssrInterpolate(customTheme.value.borderRadius)}rem</div></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Animasyon Hızı</span></label><input type="range" min="0.1" max="1" step="0.1"${ssrRenderAttr("value", customTheme.value.animationSpeed)} class="range range-secondary"${_scopeId}><div class="text-base-content/70 text-sm"${_scopeId}>${ssrInterpolate(customTheme.value.animationSpeed)}s</div></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Neon Efekt</span></label><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(customTheme.value.neonEffect) ? ssrLooseContain(customTheme.value.neonEffect, null) : customTheme.value.neonEffect) ? " checked" : ""} class="toggle toggle-accent"${_scopeId}></div><div${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Gölge Efekti</span></label><select class="select-bordered select w-full"${_scopeId}><option value="0 4px 6px -1px rgba(0, 0, 0, 0.1)"${ssrIncludeBooleanAttr(Array.isArray(customTheme.value.shadow) ? ssrLooseContain(customTheme.value.shadow, "0 4px 6px -1px rgba(0, 0, 0, 0.1)") : ssrLooseEqual(customTheme.value.shadow, "0 4px 6px -1px rgba(0, 0, 0, 0.1)")) ? " selected" : ""}${_scopeId}>Hafif Gölge</option><option value="0 10px 15px -3px rgba(0, 0, 0, 0.1)"${ssrIncludeBooleanAttr(Array.isArray(customTheme.value.shadow) ? ssrLooseContain(customTheme.value.shadow, "0 10px 15px -3px rgba(0, 0, 0, 0.1)") : ssrLooseEqual(customTheme.value.shadow, "0 10px 15px -3px rgba(0, 0, 0, 0.1)")) ? " selected" : ""}${_scopeId}>Orta Gölge</option><option value="0 20px 25px -5px rgba(0, 0, 0, 0.1)"${ssrIncludeBooleanAttr(Array.isArray(customTheme.value.shadow) ? ssrLooseContain(customTheme.value.shadow, "0 20px 25px -5px rgba(0, 0, 0, 0.1)") : ssrLooseEqual(customTheme.value.shadow, "0 20px 25px -5px rgba(0, 0, 0, 0.1)")) ? " selected" : ""}${_scopeId}>Koyu Gölge</option><option value="0 0 20px rgba(0, 255, 255, 0.5)"${ssrIncludeBooleanAttr(Array.isArray(customTheme.value.shadow) ? ssrLooseContain(customTheme.value.shadow, "0 0 20px rgba(0, 255, 255, 0.5)") : ssrLooseEqual(customTheme.value.shadow, "0 0 20px rgba(0, 255, 255, 0.5)")) ? " selected" : ""}${_scopeId}>Neon Gölge</option></select></div></div></div></div><div class="mt-6"${_scopeId}><h4 class="mb-3 text-lg font-semibold"${_scopeId}>Önizleme</h4><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><button class="btn btn-primary"${_scopeId}>Primary Button</button><button class="btn btn-secondary"${_scopeId}>Secondary Button</button><button class="btn btn-accent"${_scopeId}>Accent Button</button></div><div class="mt-4"${_scopeId}><div class="card bg-base-200 p-4"${_scopeId}><h5 class="font-semibold"${_scopeId}>Örnek Card</h5><p class="text-base-content/70 text-sm"${_scopeId}>Bu bir örnek card&#39;tır.</p></div></div></div><div class="modal-action"${_scopeId}><button class="btn"${_scopeId}>Kapat</button><button class="btn btn-primary"${_scopeId}>Bu Temayı Uygula</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-base-200 shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-base-content" }, [
                      createVNode("h1", { class: "mb-8 text-center text-4xl font-bold" }, "Tema Yönetimi"),
                      createVNode("div", { class: "card mb-8 bg-base-200 p-6" }, [
                        createVNode("h2", { class: "mb-4 text-2xl font-semibold" }, "Mevcut Tema"),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode("div", { class: "text-3xl" }, toDisplayString(getThemeIcon(currentTheme.value)), 1),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xl font-semibold" }, toDisplayString(getThemeName(currentTheme.value)), 1),
                            createVNode("p", { class: "text-base-content/70" }, toDisplayString(getThemeDescription(currentTheme.value)), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(availableThemes.value, (theme) => {
                          return openBlock(), createBlock("div", {
                            key: theme,
                            class: "card cursor-pointer bg-base-200 transition-all duration-300 hover:shadow-lg",
                            onClick: ($event) => showThemeDetails(theme)
                          }, [
                            createVNode("div", { class: "card-body" }, [
                              createVNode("div", { class: "mb-4 flex items-center gap-3" }, [
                                createVNode("div", { class: "text-2xl" }, toDisplayString(getThemeIcon(theme)), 1),
                                createVNode("h3", { class: "card-title" }, toDisplayString(getThemeName(theme)), 1)
                              ]),
                              createVNode("div", { class: "mb-4 grid grid-cols-5 gap-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(getThemeColors(theme), (color, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "h-8 w-8 rounded border border-base-300",
                                    style: { backgroundColor: color },
                                    title: color
                                  }, null, 12, ["title"]);
                                }), 128))
                              ]),
                              createVNode("p", { class: "text-base-content/70 mb-4 text-sm" }, toDisplayString(getThemeDescription(theme)), 1),
                              createVNode("div", { class: "card-actions justify-end" }, [
                                createVNode("button", {
                                  onClick: withModifiers(($event) => changeTheme(theme), ["stop"]),
                                  class: ["btn btn-sm", currentTheme.value === theme ? "btn-primary" : "btn-outline"]
                                }, toDisplayString(currentTheme.value === theme ? "Aktif" : "Seç"), 11, ["onClick"])
                              ])
                            ])
                          ], 8, ["onClick"]);
                        }), 128))
                      ]),
                      selectedTheme.value && selectedTheme.value !== "custom" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "modal-open modal"
                      }, [
                        createVNode("div", { class: "modal-box max-w-4xl" }, [
                          createVNode("h3", { class: "mb-4 text-2xl font-bold" }, toDisplayString(getThemeIcon(selectedTheme.value)) + " " + toDisplayString(getThemeName(selectedTheme.value)), 1),
                          createVNode("div", { class: "grid grid-cols-1 gap-6 lg:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Renk Paleti"),
                              createVNode("div", { class: "space-y-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(getThemeColorDetails(selectedTheme.value), (color, name) => {
                                  return openBlock(), createBlock("div", {
                                    key: name,
                                    class: "flex items-center gap-3"
                                  }, [
                                    createVNode("div", {
                                      class: "h-8 w-8 rounded border border-base-300",
                                      style: { backgroundColor: color.value }
                                    }, null, 4),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(color.name), 1),
                                      createVNode("div", { class: "text-base-content/70 text-sm" }, toDisplayString(color.value), 1)
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Özellikler"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(getThemeFeatures(selectedTheme.value), (feature) => {
                                  return openBlock(), createBlock("div", {
                                    key: feature,
                                    class: "flex items-center gap-2"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-4 w-4 text-success",
                                      fill: "currentColor",
                                      viewBox: "0 0 20 20"
                                    }, [
                                      createVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                        "clip-rule": "evenodd"
                                      })
                                    ])),
                                    createVNode("span", null, toDisplayString(feature), 1)
                                  ]);
                                }), 128))
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-6" }, [
                            createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Örnek Bileşenler"),
                            createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                              createVNode("button", { class: "btn btn-primary" }, "Primary Button"),
                              createVNode("button", { class: "btn btn-secondary" }, "Secondary Button"),
                              createVNode("button", { class: "btn btn-accent" }, "Accent Button")
                            ]),
                            createVNode("div", { class: "mt-4" }, [
                              createVNode("div", { class: "alert alert-info" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  class: "h-6 w-6 shrink-0 stroke-current"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  })
                                ])),
                                createVNode("span", null, "Bu tema ile uyumlu alert örneği")
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "modal-action" }, [
                            createVNode("button", {
                              onClick: ($event) => selectedTheme.value = null,
                              class: "btn"
                            }, "Kapat", 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => changeTheme(selectedTheme.value),
                              class: ["btn", currentTheme.value === selectedTheme.value ? "btn-primary" : "btn-outline"]
                            }, toDisplayString(currentTheme.value === selectedTheme.value ? "Aktif Tema" : "Bu Temayı Seç"), 11, ["onClick"])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  selectedTheme.value === "custom" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "modal-open modal"
                  }, [
                    createVNode("div", { class: "modal-box max-w-6xl" }, [
                      createVNode("h3", { class: "mb-4 text-2xl font-bold" }, "⚙️ Özel Tema Ayarları"),
                      createVNode("div", { class: "grid grid-cols-1 gap-6 lg:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Renk Ayarları"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Primary Renk")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "color",
                                "onUpdate:modelValue": ($event) => customTheme.value.primary = $event,
                                class: "input-bordered input w-full",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.primary]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Secondary Renk")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "color",
                                "onUpdate:modelValue": ($event) => customTheme.value.secondary = $event,
                                class: "input-bordered input w-full",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.secondary]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Accent Renk")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "color",
                                "onUpdate:modelValue": ($event) => customTheme.value.accent = $event,
                                class: "input-bordered input w-full",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.accent]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Neutral Renk")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "color",
                                "onUpdate:modelValue": ($event) => customTheme.value.neutral = $event,
                                class: "input-bordered input w-full",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.neutral]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Base 100 Renk")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "color",
                                "onUpdate:modelValue": ($event) => customTheme.value["base-100"] = $event,
                                class: "input-bordered input w-full",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value["base-100"]]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Stil Ayarları"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Border Radius")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "range",
                                min: "0",
                                max: "2",
                                step: "0.1",
                                "onUpdate:modelValue": ($event) => customTheme.value.borderRadius = $event,
                                class: "range range-primary",
                                onInput: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.borderRadius]
                              ]),
                              createVNode("div", { class: "text-base-content/70 text-sm" }, toDisplayString(customTheme.value.borderRadius) + "rem", 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Animasyon Hızı")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "range",
                                min: "0.1",
                                max: "1",
                                step: "0.1",
                                "onUpdate:modelValue": ($event) => customTheme.value.animationSpeed = $event,
                                class: "range range-secondary",
                                onInput: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, customTheme.value.animationSpeed]
                              ]),
                              createVNode("div", { class: "text-base-content/70 text-sm" }, toDisplayString(customTheme.value.animationSpeed) + "s", 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Neon Efekt")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => customTheme.value.neonEffect = $event,
                                class: "toggle toggle-accent",
                                onChange: updateCustomTheme
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, customTheme.value.neonEffect]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Gölge Efekti")
                              ]),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => customTheme.value.shadow = $event,
                                class: "select-bordered select w-full",
                                onChange: updateCustomTheme
                              }, [
                                createVNode("option", { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }, "Hafif Gölge"),
                                createVNode("option", { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }, "Orta Gölge"),
                                createVNode("option", { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }, "Koyu Gölge"),
                                createVNode("option", { value: "0 0 20px rgba(0, 255, 255, 0.5)" }, "Neon Gölge")
                              ], 40, ["onUpdate:modelValue"]), [
                                [vModelSelect, customTheme.value.shadow]
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-6" }, [
                        createVNode("h4", { class: "mb-3 text-lg font-semibold" }, "Önizleme"),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                          createVNode("button", { class: "btn btn-primary" }, "Primary Button"),
                          createVNode("button", { class: "btn btn-secondary" }, "Secondary Button"),
                          createVNode("button", { class: "btn btn-accent" }, "Accent Button")
                        ]),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode("div", { class: "card bg-base-200 p-4" }, [
                            createVNode("h5", { class: "font-semibold" }, "Örnek Card"),
                            createVNode("p", { class: "text-base-content/70 text-sm" }, "Bu bir örnek card'tır.")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "modal-action" }, [
                        createVNode("button", {
                          onClick: ($event) => selectedTheme.value = null,
                          class: "btn"
                        }, "Kapat", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => changeTheme("custom"),
                          class: "btn btn-primary"
                        }, "Bu Temayı Uygula", 8, ["onClick"])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ThemeManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
