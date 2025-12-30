import { ref, computed, onMounted, onUnmounted, withCtx, unref, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-DCMuX6bW.js";
import "./FlashMessage-C3JOGPFR.js";
const _sfc_main = {
  __name: "IndexJourney",
  __ssrInlineRender: true,
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    entriesByYear: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const selectedYear = ref(null);
    const isYearFilterOpen = ref(false);
    const isLargeScreen = ref(false);
    const years = computed(() => {
      return Object.keys(props.entriesByYear || {}).sort((a, b) => Number(b) - Number(a));
    });
    const showYearFilter = computed(() => years.value.length > 1);
    const filteredEntries = computed(() => {
      if (!selectedYear.value) return props.entries;
      return props.entries.filter((entry) => formatYear(entry.entry_date) === selectedYear.value);
    });
    const oldestYear = computed(() => years.value.length > 0 ? years.value[years.value.length - 1] : "-");
    const newestYear = computed(() => years.value.length > 0 ? years.value[0] : "-");
    const formatYear = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).getFullYear().toString();
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    const getYearCount = (year) => {
      var _a;
      return ((_a = props.entriesByYear[year]) == null ? void 0 : _a.length) || 0;
    };
    const toggleYearFilter = () => {
      isYearFilterOpen.value = !isYearFilterOpen.value;
    };
    const selectYear = (year) => {
      selectedYear.value = year;
      if (window.innerWidth < 1280) {
        isYearFilterOpen.value = false;
      }
    };
    const initializeYearFilterState = () => {
      const isLarge = window.innerWidth >= 1280;
      isLargeScreen.value = isLarge;
      if (isLarge && showYearFilter.value) {
        isYearFilterOpen.value = true;
      } else if (!isLarge) {
        isYearFilterOpen.value = false;
      }
    };
    let resizeHandler = null;
    onMounted(() => {
      initializeYearFilterState();
      resizeHandler = () => {
        initializeYearFilterState();
      };
      window.addEventListener("resize", resizeHandler);
    });
    onUnmounted(() => {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-background"${_scopeId}><div class="mx-auto max-w-4xl px-4 py-8 sm:px-6"${_scopeId}><h1 class="xl:-translate-x-[80px] mb-5 text-2xl font-bold text-foreground sm:text-3xl"${_scopeId}>Yolculuk</h1>`);
            if (filteredEntries.value.length > 0) {
              _push2(`<div class="${ssrRenderClass([{ "xl:-translate-x-[80px]": showYearFilter.value && isYearFilterOpen.value }, "relative transition-all duration-300"])}"${_scopeId}><div class="absolute bottom-0 left-3 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-border sm:left-4"${_scopeId}></div><div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(filteredEntries.value, (entry, index) => {
                _push2(`<div class="timeline-entry relative pl-10 sm:pl-12"${_scopeId}><div class="absolute left-1 top-4 flex h-5 w-5 items-center justify-center sm:left-2 sm:h-5 sm:w-5"${_scopeId}>`);
                if (index === 0) {
                  _push2(`<div class="absolute h-5 w-5 animate-ping rounded-full bg-primary/30"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="${ssrRenderClass([{ "bg-primary": index === 0 }, "relative h-3 w-3 rounded-full border-2 border-primary bg-background sm:h-3 sm:w-3"])}"${_scopeId}></div></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/journey/${entry.id}`,
                  class: "group block overflow-hidden rounded-xl bg-card ring-1 ring-border/50 transition-all duration-200 hover:ring-primary/40 hover:shadow-lg"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex flex-col sm:flex-row"${_scopeId2}>`);
                      if (entry.image) {
                        _push3(`<div class="relative w-full flex-shrink-0 sm:w-80 md:w-96 lg:w-[420px]"${_scopeId2}><div class="aspect-video w-full overflow-hidden"${_scopeId2}><img${ssrRenderAttr("src", `/storage/${entry.image}`)}${ssrRenderAttr("alt", entry.title)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"${_scopeId2}></div>`);
                        if (entry.status === "draft") {
                          _push3(`<span class="absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"${_scopeId2}> Taslak </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="relative hidden aspect-video w-80 flex-shrink-0 items-center justify-center bg-muted/50 sm:flex md:w-96 lg:w-[420px]"${_scopeId2}><svg class="h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg>`);
                        if (entry.status === "draft") {
                          _push3(`<span class="absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"${_scopeId2}> Taslak </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      }
                      _push3(`<div class="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5"${_scopeId2}><div class="flex items-center gap-2 text-xs text-muted-foreground"${_scopeId2}><svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(formatDate(entry.entry_date))}</span>`);
                      if (entry.status === "draft" && !entry.image) {
                        _push3(`<span class="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400 sm:hidden"${_scopeId2}> Taslak </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><h3 class="mt-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg"${_scopeId2}>${ssrInterpolate(entry.title)}</h3>`);
                      if (entry.description) {
                        _push3(`<p class="mt-2 line-clamp-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(entry.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary"${_scopeId2}><span${_scopeId2}>Devamını oku</span><svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex flex-col sm:flex-row" }, [
                          entry.image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative w-full flex-shrink-0 sm:w-80 md:w-96 lg:w-[420px]"
                          }, [
                            createVNode("div", { class: "aspect-video w-full overflow-hidden" }, [
                              createVNode("img", {
                                src: `/storage/${entry.image}`,
                                alt: entry.title,
                                class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              }, null, 8, ["src", "alt"])
                            ]),
                            entry.status === "draft" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"
                            }, " Taslak ")) : createCommentVNode("", true)
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "relative hidden aspect-video w-80 flex-shrink-0 items-center justify-center bg-muted/50 sm:flex md:w-96 lg:w-[420px]"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-12 w-12 text-muted-foreground/30",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            entry.status === "draft" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"
                            }, " Taslak ")) : createCommentVNode("", true)
                          ])),
                          createVNode("div", { class: "flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3.5 w-3.5 flex-shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])),
                              createVNode("span", null, toDisplayString(formatDate(entry.entry_date)), 1),
                              entry.status === "draft" && !entry.image ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400 sm:hidden"
                              }, " Taslak ")) : createCommentVNode("", true)
                            ]),
                            createVNode("h3", { class: "mt-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg" }, toDisplayString(entry.title), 1),
                            entry.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-2 line-clamp-2 text-sm text-muted-foreground"
                            }, toDisplayString(entry.description), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary" }, [
                              createVNode("span", null, "Devamını oku"),
                              (openBlock(), createBlock("svg", {
                                class: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div><div class="relative mt-6 pl-10 sm:pl-12"${_scopeId}><div class="absolute left-1 top-0 flex h-5 w-5 items-center justify-center sm:left-2"${_scopeId}><div class="h-2 w-2 rounded-full bg-border"${_scopeId}></div></div><p class="text-xs text-muted-foreground"${_scopeId}>Yolculuğun başlangıcı</p></div></div>`);
            } else {
              _push2(`<div class="py-16 text-center"${_scopeId}><div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"${_scopeId}><svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><p class="text-muted-foreground"${_scopeId}>${ssrInterpolate(selectedYear.value ? `${selectedYear.value} yılında kayıt bulunamadı` : "Henüz kayıt yok")}</p></div>`);
            }
            _push2(`</div>`);
            if (__props.entries.length > 0) {
              _push2(`<div class="border-t border-border bg-muted/30"${_scopeId}><div class="mx-auto max-w-4xl px-4 py-5 sm:px-6"${_scopeId}><div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="h-2 w-2 rounded-full bg-primary"${_scopeId}></div><span class="text-muted-foreground"${_scopeId}><strong class="text-foreground"${_scopeId}>${ssrInterpolate(__props.entries.length)}</strong> kayıt</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-2 w-2 rounded-full bg-primary/60"${_scopeId}></div><span class="text-muted-foreground"${_scopeId}><strong class="text-foreground"${_scopeId}>${ssrInterpolate(years.value.length)}</strong> yıl</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-2 w-2 rounded-full bg-primary/30"${_scopeId}></div><span class="text-muted-foreground"${_scopeId}>${ssrInterpolate(oldestYear.value)} - ${ssrInterpolate(newestYear.value)}</span></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showYearFilter.value) {
              _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:hidden"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (showYearFilter.value) {
              _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isYearFilterOpen.value }, "fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-72 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"])}"${_scopeId}><div class="flex h-full flex-col"${_scopeId}><div class="flex items-center justify-between border-b border-border p-4"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>Yıllar</h3><button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4"${_scopeId}><nav class="space-y-1"${_scopeId}><button class="${ssrRenderClass([selectedYear.value === null ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground", "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors"])}"${_scopeId}><span${_scopeId}>Tümü</span><span class="text-xs opacity-70"${_scopeId}>${ssrInterpolate(__props.entries.length)}</span></button><!--[-->`);
              ssrRenderList(years.value, (year) => {
                _push2(`<button class="${ssrRenderClass([selectedYear.value === year ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground", "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors"])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(year)}</span><span class="text-xs opacity-70"${_scopeId}>${ssrInterpolate(getYearCount(year))}</span></button>`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showYearFilter.value) {
              _push2(`<button class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:flex"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (showYearFilter.value) {
              _push2(`<div class="${ssrRenderClass([isYearFilterOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-28 z-30 hidden w-48 transition-all duration-300 ease-in-out xl:block"])}"${_scopeId}><div class="rounded-xl border border-border bg-popover/95 shadow-xl backdrop-blur-sm"${_scopeId}><div class="flex items-center justify-between border-b border-border px-4 py-3"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Yıllar</h3><button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-2" style="${ssrRenderStyle({ "max-height": "calc(100vh - 200px)" })}"${_scopeId}><nav class="space-y-0.5"${_scopeId}><button class="${ssrRenderClass([selectedYear.value === null ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground", "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors"])}"${_scopeId}><span${_scopeId}>Tümü</span><span class="opacity-70"${_scopeId}>${ssrInterpolate(__props.entries.length)}</span></button><!--[-->`);
              ssrRenderList(years.value, (year) => {
                _push2(`<button class="${ssrRenderClass([selectedYear.value === year ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground", "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors"])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(year)}</span><span class="opacity-70"${_scopeId}>${ssrInterpolate(getYearCount(year))}</span></button>`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showYearFilter.value && isYearFilterOpen.value) {
              _push2(`<div class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm xl:hidden"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-background" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 py-8 sm:px-6" }, [
                  createVNode("h1", { class: "xl:-translate-x-[80px] mb-5 text-2xl font-bold text-foreground sm:text-3xl" }, "Yolculuk"),
                  filteredEntries.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["relative transition-all duration-300", { "xl:-translate-x-[80px]": showYearFilter.value && isYearFilterOpen.value }]
                  }, [
                    createVNode("div", { class: "absolute bottom-0 left-3 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-border sm:left-4" }),
                    createVNode("div", { class: "space-y-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredEntries.value, (entry, index) => {
                        return openBlock(), createBlock("div", {
                          key: entry.id,
                          class: "timeline-entry relative pl-10 sm:pl-12"
                        }, [
                          createVNode("div", { class: "absolute left-1 top-4 flex h-5 w-5 items-center justify-center sm:left-2 sm:h-5 sm:w-5" }, [
                            index === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute h-5 w-5 animate-ping rounded-full bg-primary/30"
                            })) : createCommentVNode("", true),
                            createVNode("div", {
                              class: ["relative h-3 w-3 rounded-full border-2 border-primary bg-background sm:h-3 sm:w-3", { "bg-primary": index === 0 }]
                            }, null, 2)
                          ]),
                          createVNode(unref(Link), {
                            href: `/journey/${entry.id}`,
                            class: "group block overflow-hidden rounded-xl bg-card ring-1 ring-border/50 transition-all duration-200 hover:ring-primary/40 hover:shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col sm:flex-row" }, [
                                entry.image ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "relative w-full flex-shrink-0 sm:w-80 md:w-96 lg:w-[420px]"
                                }, [
                                  createVNode("div", { class: "aspect-video w-full overflow-hidden" }, [
                                    createVNode("img", {
                                      src: `/storage/${entry.image}`,
                                      alt: entry.title,
                                      class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  entry.status === "draft" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"
                                  }, " Taslak ")) : createCommentVNode("", true)
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "relative hidden aspect-video w-80 flex-shrink-0 items-center justify-center bg-muted/50 sm:flex md:w-96 lg:w-[420px]"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-12 w-12 text-muted-foreground/30",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "1.5",
                                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    })
                                  ])),
                                  entry.status === "draft" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900"
                                  }, " Taslak ")) : createCommentVNode("", true)
                                ])),
                                createVNode("div", { class: "flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5" }, [
                                  createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3.5 w-3.5 flex-shrink-0",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      })
                                    ])),
                                    createVNode("span", null, toDisplayString(formatDate(entry.entry_date)), 1),
                                    entry.status === "draft" && !entry.image ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400 sm:hidden"
                                    }, " Taslak ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h3", { class: "mt-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg" }, toDisplayString(entry.title), 1),
                                  entry.description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-2 line-clamp-2 text-sm text-muted-foreground"
                                  }, toDisplayString(entry.description), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary" }, [
                                    createVNode("span", null, "Devamını oku"),
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M9 5l7 7-7 7"
                                      })
                                    ]))
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "relative mt-6 pl-10 sm:pl-12" }, [
                      createVNode("div", { class: "absolute left-1 top-0 flex h-5 w-5 items-center justify-center sm:left-2" }, [
                        createVNode("div", { class: "h-2 w-2 rounded-full bg-border" })
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Yolculuğun başlangıcı")
                    ])
                  ], 2)) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-16 text-center"
                  }, [
                    createVNode("div", { class: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-8 w-8 text-muted-foreground",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1.5",
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "text-muted-foreground" }, toDisplayString(selectedYear.value ? `${selectedYear.value} yılında kayıt bulunamadı` : "Henüz kayıt yok"), 1)
                  ]))
                ]),
                __props.entries.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "border-t border-border bg-muted/30"
                }, [
                  createVNode("div", { class: "mx-auto max-w-4xl px-4 py-5 sm:px-6" }, [
                    createVNode("div", { class: "flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "h-2 w-2 rounded-full bg-primary" }),
                        createVNode("span", { class: "text-muted-foreground" }, [
                          createVNode("strong", { class: "text-foreground" }, toDisplayString(__props.entries.length), 1),
                          createTextVNode(" kayıt")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "h-2 w-2 rounded-full bg-primary/60" }),
                        createVNode("span", { class: "text-muted-foreground" }, [
                          createVNode("strong", { class: "text-foreground" }, toDisplayString(years.value.length), 1),
                          createTextVNode(" yıl")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "h-2 w-2 rounded-full bg-primary/30" }),
                        createVNode("span", { class: "text-muted-foreground" }, toDisplayString(oldestYear.value) + " - " + toDisplayString(newestYear.value), 1)
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              showYearFilter.value ? (openBlock(), createBlock("button", {
                key: 0,
                onClick: toggleYearFilter,
                class: "fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:hidden"
              }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "h-5 w-5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  })
                ]))
              ])) : createCommentVNode("", true),
              showYearFilter.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: ["fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-72 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden", { "translate-x-full": !isYearFilterOpen.value }]
              }, [
                createVNode("div", { class: "flex h-full flex-col" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border p-4" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "Yıllar"),
                    createVNode("button", {
                      onClick: toggleYearFilter,
                      class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "flex-1 overflow-y-auto p-4" }, [
                    createVNode("nav", { class: "space-y-1" }, [
                      createVNode("button", {
                        onClick: ($event) => selectYear(null),
                        class: ["flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors", selectedYear.value === null ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"]
                      }, [
                        createVNode("span", null, "Tümü"),
                        createVNode("span", { class: "text-xs opacity-70" }, toDisplayString(__props.entries.length), 1)
                      ], 10, ["onClick"]),
                      (openBlock(true), createBlock(Fragment, null, renderList(years.value, (year) => {
                        return openBlock(), createBlock("button", {
                          key: year,
                          onClick: ($event) => selectYear(year),
                          class: ["flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors", selectedYear.value === year ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"]
                        }, [
                          createVNode("span", null, toDisplayString(year), 1),
                          createVNode("span", { class: "text-xs opacity-70" }, toDisplayString(getYearCount(year)), 1)
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ])
                ])
              ], 2)) : createCommentVNode("", true),
              showYearFilter.value ? (openBlock(), createBlock("button", {
                key: 2,
                onClick: toggleYearFilter,
                class: "fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:flex"
              }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "h-5 w-5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  })
                ]))
              ])) : createCommentVNode("", true),
              showYearFilter.value ? (openBlock(), createBlock("div", {
                key: 3,
                class: ["fixed right-4 top-28 z-30 hidden w-48 transition-all duration-300 ease-in-out xl:block", isYearFilterOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"]
              }, [
                createVNode("div", { class: "rounded-xl border border-border bg-popover/95 shadow-xl backdrop-blur-sm" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border px-4 py-3" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Yıllar"),
                    createVNode("button", {
                      onClick: toggleYearFilter,
                      class: "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-3.5 w-3.5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ]))
                    ])
                  ]),
                  createVNode("div", {
                    class: "overflow-y-auto p-2",
                    style: { "max-height": "calc(100vh - 200px)" }
                  }, [
                    createVNode("nav", { class: "space-y-0.5" }, [
                      createVNode("button", {
                        onClick: ($event) => selectYear(null),
                        class: ["flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors", selectedYear.value === null ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"]
                      }, [
                        createVNode("span", null, "Tümü"),
                        createVNode("span", { class: "opacity-70" }, toDisplayString(__props.entries.length), 1)
                      ], 10, ["onClick"]),
                      (openBlock(true), createBlock(Fragment, null, renderList(years.value, (year) => {
                        return openBlock(), createBlock("button", {
                          key: year,
                          onClick: ($event) => selectYear(year),
                          class: ["flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors", selectedYear.value === year ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"]
                        }, [
                          createVNode("span", null, toDisplayString(year), 1),
                          createVNode("span", { class: "opacity-70" }, toDisplayString(getYearCount(year)), 1)
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ])
                ])
              ], 2)) : createCommentVNode("", true),
              showYearFilter.value && isYearFilterOpen.value ? (openBlock(), createBlock("div", {
                key: 4,
                onClick: toggleYearFilter,
                class: "fixed inset-0 z-30 bg-black/20 backdrop-blur-sm xl:hidden"
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/IndexJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
