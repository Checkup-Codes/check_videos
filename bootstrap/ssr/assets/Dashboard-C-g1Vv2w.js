import { defineComponent, computed, ref, onMounted, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import { Head, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: {},
    recentWrites: {},
    popularCategories: {},
    monthlyStats: {},
    allWrites: {}
  },
  setup(__props) {
    const props = __props;
    const store = useStore();
    const headingFont = computed(() => store.getters["Theme/getHeadingFont"]);
    const bodyFont = computed(() => store.getters["Theme/getBodyFont"]);
    const changeHeadingFont = (font) => {
      store.dispatch("Theme/changeHeadingFont", font);
    };
    const changeBodyFont = (font) => {
      store.dispatch("Theme/changeBodyFont", font);
    };
    let chartLoaded = ref(false);
    onMounted(() => {
      if (window.Chart && props.monthlyStats) {
        renderChart();
        chartLoaded.value = true;
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js";
        script.onload = () => {
          renderChart();
          chartLoaded.value = true;
        };
        document.head.appendChild(script);
      }
    });
    function renderChart() {
      const ctx = document.getElementById("monthlyStatsChart");
      if (!ctx) return;
      const monthNames = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ];
      const data = Object.keys(props.monthlyStats).map((month) => props.monthlyStats[month]);
      new window.Chart(ctx, {
        type: "line",
        data: {
          labels: monthNames,
          datasets: [
            {
              label: "Yazı Sayısı",
              data,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: "rgba(59, 130, 246, 1)"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between space-x-4"${_scopeId}><div class="space-y-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Toplam Kategori</p><p class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.stats.categories_count)}</p></div><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"${_scopeId}><svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"${_scopeId}></path></svg></div></div></div><div class="border-t bg-muted/50 px-6 py-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.index"),
              class: "text-sm font-medium text-primary hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tüm Kategorileri Gör → `);
                } else {
                  return [
                    createTextVNode(" Tüm Kategorileri Gör → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between space-x-4"${_scopeId}><div class="space-y-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Toplam Yazı</p><p class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.stats.writes_count)}</p></div><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"${_scopeId}><svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg></div></div></div><div class="border-t bg-muted/50 px-6 py-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.index"),
              class: "text-sm font-medium text-primary hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tüm Yazıları Gör → `);
                } else {
                  return [
                    createTextVNode(" Tüm Yazıları Gör → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between space-x-4"${_scopeId}><div class="space-y-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Yayında</p><p class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.stats.public_writes_count)}</p></div><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"${_scopeId}><svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></div></div></div><div class="border-t bg-muted/50 px-6 py-3"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.stats.writes_count > 0 ? Math.round(__props.stats.public_writes_count / __props.stats.writes_count * 100) : 0)}% toplam yazılardan </p></div></div><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between space-x-4"${_scopeId}><div class="space-y-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Özel</p><p class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.stats.private_writes_count)}</p></div><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"${_scopeId}><svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"${_scopeId}></path></svg></div></div></div><div class="border-t bg-muted/50 px-6 py-3"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.stats.writes_count > 0 ? Math.round(__props.stats.private_writes_count / __props.stats.writes_count * 100) : 0)}% toplam yazılardan </p></div></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-3"${_scopeId}><div class="rounded-lg border bg-card text-card-foreground shadow-sm lg:col-span-2"${_scopeId}><div class="border-b px-6 py-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Son Yazılarınız</h3></div><div class="divide-y"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentWrites, (write) => {
              _push2(`<div class="px-6 py-4 transition-colors hover:bg-accent"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("writes.show", write.id),
                class: "block space-y-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between gap-4"${_scopeId2}><p class="font-medium text-foreground"${_scopeId2}>${ssrInterpolate(write.title)}</p><span class="${ssrRenderClass([
                      write.status === "public" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                      "inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium"
                    ])}"${_scopeId2}>${ssrInterpolate(write.status === "public" ? "Yayında" : "Özel")}</span></div><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok")}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(formatDate(write.updated_at))}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                        createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(write.title), 1),
                        createVNode("span", {
                          class: [
                            "inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium",
                            write.status === "public" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          ]
                        }, toDisplayString(write.status === "public" ? "Yayında" : "Özel"), 3)
                      ]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok"), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(write.updated_at)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (__props.recentWrites.length === 0) {
              _push2(`<div class="px-6 py-8 text-center text-sm text-muted-foreground"${_scopeId}> Henüz yazı eklenmemiş. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="border-t bg-muted/50 px-6 py-3 text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.create"),
              class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Yazı Ekle `);
                } else {
                  return [
                    createTextVNode(" Yeni Yazı Ekle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="border-b px-6 py-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Popüler Kategoriler</h3></div><div class="divide-y"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularCategories, (category) => {
              _push2(`<div class="px-6 py-4 transition-colors hover:bg-accent"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.show", category.id),
                class: "flex items-center justify-between"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="font-medium text-foreground"${_scopeId2}>${ssrInterpolate(category.name)}</p><span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"${_scopeId2}>${ssrInterpolate(category.writes_count)}</span>`);
                  } else {
                    return [
                      createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(category.name), 1),
                      createVNode("span", { class: "inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary" }, toDisplayString(category.writes_count), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (__props.popularCategories.length === 0) {
              _push2(`<div class="px-6 py-8 text-center text-sm text-muted-foreground"${_scopeId}> Henüz kategori eklenmemiş. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="border-t bg-muted/50 px-6 py-3 text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.create"),
              class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Kategori `);
                } else {
                  return [
                    createTextVNode(" Yeni Kategori ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"${_scopeId}><h3 class="mb-4 text-lg font-semibold"${_scopeId}>Bu Yılki Yazı İstatistikleri</h3><div class="h-80"${_scopeId}><canvas id="monthlyStatsChart"${_scopeId}></canvas>`);
            if (!unref(chartLoaded)) {
              _push2(`<div class="flex h-full items-center justify-center"${_scopeId}><div class="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="rounded-lg border bg-card text-card-foreground shadow-sm"${_scopeId}><div class="border-b px-6 py-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Font Tercihleri</h3><p class="text-sm text-muted-foreground"${_scopeId}>Başlık ve içerik fontlarını özelleştirin</p></div><div class="space-y-6 p-6"${_scopeId}><div class="space-y-3"${_scopeId}><label class="text-sm font-medium"${_scopeId}>Başlık Fontu</label><div class="grid grid-cols-3 gap-3"${_scopeId}><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              headingFont.value === "inter" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>Inter</span>`);
            if (headingFont.value === "inter") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Tech şirketi standardı</p><p class="font-inter-semibold text-lg"${_scopeId}>Örnek Başlık</p></button><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              headingFont.value === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>Clash Display</span>`);
            if (headingFont.value === "new") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Minimalist ve modern</p><p class="font-clash text-lg"${_scopeId}>Örnek Başlık</p></button><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              headingFont.value === "classic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>System</span>`);
            if (headingFont.value === "classic") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Klasik sistem fontları</p><p class="text-lg" style="${ssrRenderStyle({ "font-family": "system-ui, -apple-system, sans-serif" })}"${_scopeId}>Örnek Başlık</p></button></div></div><div class="space-y-3"${_scopeId}><label class="text-sm font-medium"${_scopeId}>İçerik Fontu</label><div class="grid grid-cols-3 gap-3"${_scopeId}><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              bodyFont.value === "inter" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>Inter</span>`);
            if (bodyFont.value === "inter") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Mükemmel okunabilirlik</p><p class="font-inter text-sm"${_scopeId}>Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p></button><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              bodyFont.value === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>Satoshi</span>`);
            if (bodyFont.value === "new") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Okunabilir ve şık</p><p class="font-satoshi text-sm"${_scopeId}>Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p></button><button class="${ssrRenderClass([
              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
              bodyFont.value === "classic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
            ])}"${_scopeId}><div class="flex w-full items-center justify-between"${_scopeId}><span class="font-medium"${_scopeId}>System</span>`);
            if (bodyFont.value === "classic") {
              _push2(`<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary"${_scopeId}><svg class="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-xs text-muted-foreground"${_scopeId}>Klasik sistem fontları</p><p class="text-sm" style="${ssrRenderStyle({ "font-family": "system-ui, -apple-system, sans-serif" })}"${_scopeId}>Bu bir örnek içerik metnidir. Okunabilirliği test edin.</p></button></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between space-x-4" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Toplam Kategori"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.categories_count), 1)
                          ]),
                          createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-primary",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              })
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("categories.index"),
                          class: "text-sm font-medium text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tüm Kategorileri Gör → ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between space-x-4" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Toplam Yazı"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.writes_count), 1)
                          ]),
                          createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-primary",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              })
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("writes.index"),
                          class: "text-sm font-medium text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tüm Yazıları Gör → ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between space-x-4" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Yayında"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.public_writes_count), 1)
                          ]),
                          createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-primary",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              })
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.stats.writes_count > 0 ? Math.round(__props.stats.public_writes_count / __props.stats.writes_count * 100) : 0) + "% toplam yazılardan ", 1)
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between space-x-4" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Özel"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.private_writes_count), 1)
                          ]),
                          createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-primary",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              })
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.stats.writes_count > 0 ? Math.round(__props.stats.private_writes_count / __props.stats.writes_count * 100) : 0) + "% toplam yazılardan ", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-6 lg:grid-cols-3" }, [
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm lg:col-span-2" }, [
                      createVNode("div", { class: "border-b px-6 py-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Son Yazılarınız")
                      ]),
                      createVNode("div", { class: "divide-y" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentWrites, (write) => {
                          return openBlock(), createBlock("div", {
                            key: write.id,
                            class: "px-6 py-4 transition-colors hover:bg-accent"
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("writes.show", write.id),
                              class: "block space-y-2"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                  createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(write.title), 1),
                                  createVNode("span", {
                                    class: [
                                      "inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium",
                                      write.status === "public" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                    ]
                                  }, toDisplayString(write.status === "public" ? "Yayında" : "Özel"), 3)
                                ]),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(write.excerpt ? write.excerpt.substring(0, 80) + "..." : "İçerik yok"), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(write.updated_at)), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128)),
                        __props.recentWrites.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-6 py-8 text-center text-sm text-muted-foreground"
                        }, " Henüz yazı eklenmemiş. ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3 text-right" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("writes.create"),
                          class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Yeni Yazı Ekle ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                      createVNode("div", { class: "border-b px-6 py-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Popüler Kategoriler")
                      ]),
                      createVNode("div", { class: "divide-y" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.popularCategories, (category) => {
                          return openBlock(), createBlock("div", {
                            key: category.id,
                            class: "px-6 py-4 transition-colors hover:bg-accent"
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("categories.show", category.id),
                              class: "flex items-center justify-between"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "font-medium text-foreground" }, toDisplayString(category.name), 1),
                                createVNode("span", { class: "inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary" }, toDisplayString(category.writes_count), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128)),
                        __props.popularCategories.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-6 py-8 text-center text-sm text-muted-foreground"
                        }, " Henüz kategori eklenmemiş. ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "border-t bg-muted/50 px-6 py-3 text-right" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("categories.create"),
                          class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Yeni Kategori ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border bg-card p-6 text-card-foreground shadow-sm" }, [
                    createVNode("h3", { class: "mb-4 text-lg font-semibold" }, "Bu Yılki Yazı İstatistikleri"),
                    createVNode("div", { class: "h-80" }, [
                      createVNode("canvas", { id: "monthlyStatsChart" }),
                      !unref(chartLoaded) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex h-full items-center justify-center"
                      }, [
                        createVNode("div", { class: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" })
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border bg-card text-card-foreground shadow-sm" }, [
                    createVNode("div", { class: "border-b px-6 py-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold" }, "Font Tercihleri"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Başlık ve içerik fontlarını özelleştirin")
                    ]),
                    createVNode("div", { class: "space-y-6 p-6" }, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "text-sm font-medium" }, "Başlık Fontu"),
                        createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                          createVNode("button", {
                            onClick: ($event) => changeHeadingFont("inter"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              headingFont.value === "inter" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "Inter"),
                              headingFont.value === "inter" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Tech şirketi standardı"),
                            createVNode("p", { class: "font-inter-semibold text-lg" }, "Örnek Başlık")
                          ], 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => changeHeadingFont("new"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              headingFont.value === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "Clash Display"),
                              headingFont.value === "new" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Minimalist ve modern"),
                            createVNode("p", { class: "font-clash text-lg" }, "Örnek Başlık")
                          ], 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => changeHeadingFont("classic"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              headingFont.value === "classic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "System"),
                              headingFont.value === "classic" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Klasik sistem fontları"),
                            createVNode("p", {
                              class: "text-lg",
                              style: { "font-family": "system-ui, -apple-system, sans-serif" }
                            }, "Örnek Başlık")
                          ], 10, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "text-sm font-medium" }, "İçerik Fontu"),
                        createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                          createVNode("button", {
                            onClick: ($event) => changeBodyFont("inter"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              bodyFont.value === "inter" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "Inter"),
                              bodyFont.value === "inter" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Mükemmel okunabilirlik"),
                            createVNode("p", { class: "font-inter text-sm" }, "Bu bir örnek içerik metnidir. Okunabilirliği test edin.")
                          ], 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => changeBodyFont("new"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              bodyFont.value === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "Satoshi"),
                              bodyFont.value === "new" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Okunabilir ve şık"),
                            createVNode("p", { class: "font-satoshi text-sm" }, "Bu bir örnek içerik metnidir. Okunabilirliği test edin.")
                          ], 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => changeBodyFont("classic"),
                            class: [
                              "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                              bodyFont.value === "classic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"
                            ]
                          }, [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("span", { class: "font-medium" }, "System"),
                              bodyFont.value === "classic" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3 text-primary-foreground",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "3",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Klasik sistem fontları"),
                            createVNode("p", {
                              class: "text-sm",
                              style: { "font-family": "system-ui, -apple-system, sans-serif" }
                            }, "Bu bir örnek içerik metnidir. Okunabilirliği test edin.")
                          ], 10, ["onClick"])
                        ])
                      ])
                    ])
                  ])
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
