import { ref, computed, onMounted, nextTick, onUnmounted, watch, mergeProps, withCtx, unref, createBlock, openBlock, createVNode, createCommentVNode, Fragment, toDisplayString, createTextVNode, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ExcalidrawComponent-D5caWS-O.js";
import { _ as _sfc_main$2 } from "./CheckScreen-faNUnK3u.js";
/* empty css                             */
import { u as useProcessedQuillContent } from "./useProcessedQuillContent-CwrhLhCz.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteByCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = ref(props.category || {});
    const write = ref(props.write || {});
    const contentRef = ref(null);
    const auth = props.auth || {};
    const showDraw = ref(false);
    const isLoading = ref(true);
    const contentShouldLoad = ref(false);
    const showTableOfContents = ref(false);
    const isTableOfContentsOpen = ref(false);
    const tableOfContents = ref([]);
    const activeHeadingId = ref(null);
    const isLargeScreen = ref(false);
    const processedContent = useProcessedQuillContent(
      contentRef,
      computed(() => contentShouldLoad.value ? write.value.content : "")
    );
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };
    const formatNumber = (num) => {
      return new Intl.NumberFormat("tr-TR").format(num);
    };
    let contentObserver = null;
    onMounted(() => {
      isLargeScreen.value = window.innerWidth >= 1536;
      contentShouldLoad.value = false;
      setTimeout(() => {
        isLoading.value = false;
        const contentPlaceholder = document.querySelector(".content-placeholder");
        if (contentPlaceholder) {
          contentObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !contentShouldLoad.value) {
                  contentShouldLoad.value = true;
                  nextTick(() => {
                    setupLinkHandling();
                    setTimeout(() => {
                      generateTableOfContents();
                      if (isLargeScreen.value && tableOfContents.value.length > 0) {
                        isTableOfContentsOpen.value = true;
                      }
                    }, 100);
                  });
                }
              });
            },
            {
              threshold: 0.1,
              rootMargin: "50px"
            }
          );
          contentObserver.observe(contentPlaceholder);
        } else {
          contentShouldLoad.value = true;
          nextTick(() => {
            setupLinkHandling();
            setTimeout(() => {
              generateTableOfContents();
              if (isLargeScreen.value && tableOfContents.value.length > 0) {
                isTableOfContentsOpen.value = true;
              }
            }, 100);
          });
        }
      }, 300);
      if (window.location.pathname.includes("categories")) {
        showDraw.value = true;
      } else {
        showDraw.value = props.showDraw || false;
      }
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
      if (!showDraw.value) {
        nextTick(() => {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  img.setAttribute("loading", "eager");
                  img.setAttribute("importance", "high");
                  observer.unobserve(img);
                }
              });
            },
            {
              rootMargin: "200px 0px",
              // Görünür alan dışında 200px önceden yüklemeye başla
              threshold: 0.01
              // %1'i görünür olduğunda tetikle
            }
          );
          const imgElements = document.querySelectorAll(".article-content img");
          imgElements.forEach((img) => observer.observe(img));
        });
      }
      if (write.value.content && write.value.content.includes("<img")) {
        const imgRegex = /<img[^>]+src="([^"]+)"/g;
        let match;
        while ((match = imgRegex.exec(write.value.content)) !== null) {
          const img = new Image();
          img.src = match[1];
        }
      }
    });
    onUnmounted(() => {
      if (contentObserver) {
        contentObserver.disconnect();
      }
    });
    const setupLinkHandling = () => {
      if (!contentRef.value) return;
      const links = contentRef.value.querySelectorAll("a");
      links.forEach((link) => {
        const url = link.getAttribute("href");
        if (url && !url.startsWith("/") && !url.startsWith("#")) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      });
    };
    const generateTableOfContents = () => {
      if (!contentRef.value) return;
      const headings = contentRef.value.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const toc = [];
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        if (text) {
          toc.push({
            id: heading.id,
            text,
            level
          });
        }
      });
      tableOfContents.value = toc;
      showTableOfContents.value = toc.length > 0;
    };
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
      const url = new URL(window.location.href);
      if (showDraw.value) {
        url.searchParams.set("draw", "1");
      } else {
        url.searchParams.delete("draw");
      }
      window.history.pushState({}, "", url);
    };
    const deleteWrite = (id) => {
      if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
        router.delete(route("writes.destroy", id), {
          onSuccess: () => {
            router.visit(route("categories.show", category.value.slug));
          }
        });
      }
    };
    const scrollToHeading = (id) => {
      const element = document.getElementById(id);
      if (element) {
        activeHeadingId.value = id;
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        if (window.innerWidth < 768) {
          isTableOfContentsOpen.value = false;
        }
      }
    };
    const getTreeHeadingClass = (level) => {
      switch (level) {
        case 1:
          return "pl-0";
        case 2:
          return "pl-4 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2";
        case 3:
          return "pl-8 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300";
        case 4:
          return "pl-12 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300";
        case 5:
          return "pl-16 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300";
        case 6:
          return "pl-20 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300";
        default:
          return "pl-0";
      }
    };
    const getActiveHeadingClass = (headingId) => {
      return activeHeadingId.value === headingId ? "bg-base-content/10 text-base-content border-l-2 border-base-content" : "";
    };
    const toggleTableOfContents = () => {
      isTableOfContentsOpen.value = !isTableOfContentsOpen.value;
    };
    watch(
      processedContent,
      () => {
        if (contentShouldLoad.value && processedContent.value) {
          nextTick(() => {
            generateTableOfContents();
          });
        }
      },
      { flush: "post" }
    );
    watch(showDraw, (newValue) => {
      if (newValue) {
        isTableOfContentsOpen.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (showDraw.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-screen w-full" }, _attrs))} data-v-bcc520cc><div class="absolute left-4 top-4 z-10" data-v-bcc520cc><button class="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content shadow-lg transition-all duration-200 hover:bg-base-200" data-v-bcc520cc><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-bcc520cc></path></svg> Metne Dön </button></div>`);
        _push(ssrRenderComponent(_sfc_main$1, { write: write.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-auto max-w-4xl" data-v-bcc520cc${_scopeId}><div class="bg-base-100 transition-all duration-200" data-v-bcc520cc${_scopeId}><div class="p-6 pt-12 sm:p-8 sm:pt-16" data-v-bcc520cc${_scopeId}><div class="mb-8" data-v-bcc520cc${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-bcc520cc${_scopeId}><div class="skeleton h-8 w-3/4 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-24 rounded" data-v-bcc520cc${_scopeId}></div></div>`);
              } else {
                _push2(`<!--[--><h1 class="mb-3 text-2xl font-bold text-base-content" data-v-bcc520cc${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="text-base-content/60 text-sm" data-v-bcc520cc${_scopeId}>${ssrInterpolate(formatDate(write.value.created_at))}</div><!--]-->`);
              }
              _push2(`</div>`);
              if (!isLoading.value) {
                _push2(`<div class="mb-6 flex items-center justify-between" data-v-bcc520cc${_scopeId}><button class="${ssrRenderClass([showDraw.value ? "border-primary bg-primary text-primary-content" : "text-base-content", "flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm transition-all duration-200 hover:bg-base-200"])}" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc${_scopeId}>`);
                if (showDraw.value) {
                  _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-bcc520cc${_scopeId}></path>`);
                } else {
                  _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bcc520cc${_scopeId}></path>`);
                }
                _push2(`</svg> ${ssrInterpolate(showDraw.value ? "Metni Göster" : "Çizimi Göster")}</button>`);
                if (unref(auth).user) {
                  _push2(`<div class="flex items-center gap-2" data-v-bcc520cc${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("writes.edit", write.value.id),
                    class: "flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-base-content transition-all duration-200 hover:bg-base-300",
                    title: "Düzenle"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-bcc520cc${_scopeId2}></path></svg>`);
                      } else {
                        return [
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
                              d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`<button class="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-error transition-all duration-200 hover:bg-error hover:text-error-content" title="Sil" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-bcc520cc${_scopeId}></path></svg></button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-bcc520cc${_scopeId}><div class="skeleton h-4 w-full rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-32 w-full rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-bcc520cc${_scopeId}></div></div>`);
              } else {
                _push2(`<div data-v-bcc520cc${_scopeId}><div class="content-container" data-v-bcc520cc${_scopeId}>`);
                if (contentShouldLoad.value) {
                  _push2(`<div class="article-content ql-editor" data-v-bcc520cc${_scopeId}>${unref(processedContent) ?? ""}</div>`);
                } else {
                  _push2(`<div class="content-placeholder" data-v-bcc520cc${_scopeId}><div class="space-y-3" data-v-bcc520cc${_scopeId}><div class="skeleton h-4 w-full rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-bcc520cc${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded" data-v-bcc520cc${_scopeId}></div></div></div>`);
                }
                _push2(`</div></div>`);
              }
              if (!isLoading.value) {
                _push2(`<div class="text-base-content/60 mt-8 text-sm" data-v-bcc520cc${_scopeId}>${ssrInterpolate(formatNumber(write.value.views_count))} görüntülenme </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:hidden" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-bcc520cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-bcc520cc${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isTableOfContentsOpen.value }, "fixed right-0 top-0 z-40 h-full w-80 transform bg-base-100 shadow-2xl transition-transform duration-300 2xl:hidden"])}" data-v-bcc520cc${_scopeId}><div class="flex h-full flex-col" data-v-bcc520cc${_scopeId}><div class="flex items-center justify-between border-b border-base-300 p-4" data-v-bcc520cc${_scopeId}><h3 class="text-lg font-semibold text-base-content" data-v-bcc520cc${_scopeId}>İçindekiler</h3><button class="btn btn-ghost btn-sm" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-bcc520cc${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4" data-v-bcc520cc${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="text-base-content/60 py-8 text-center text-sm" data-v-bcc520cc${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<div class="space-y-1" data-v-bcc520cc${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<div class="${ssrRenderClass([[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)], "cursor-pointer rounded-lg p-2 text-sm transition-colors hover:bg-base-200"])}" data-v-bcc520cc${_scopeId}><span class="text-base-content" data-v-bcc520cc${_scopeId}>${ssrInterpolate(item.text)}</span></div>`);
                  });
                  _push2(`<!--]--></div>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-4 z-50 flex hidden h-10 w-10 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:flex" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-bcc520cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-bcc520cc${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-4 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block"])}" data-v-bcc520cc${_scopeId}><div class="rounded-lg bg-base-100 shadow-lg" data-v-bcc520cc${_scopeId}><div class="flex items-center justify-between border-b border-base-300 p-3" data-v-bcc520cc${_scopeId}><h3 class="text-sm font-semibold text-base-content" data-v-bcc520cc${_scopeId}>İçindekiler</h3><button class="btn btn-ghost btn-xs" data-v-bcc520cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-bcc520cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-bcc520cc${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-3" style="${ssrRenderStyle({ "max-height": "calc(100vh - 120px)" })}" data-v-bcc520cc${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="text-base-content/60 py-4 text-center text-xs" data-v-bcc520cc${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<div class="space-y-1" data-v-bcc520cc${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<div class="${ssrRenderClass([[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)], "cursor-pointer rounded p-2 text-xs transition-colors hover:bg-base-200"])}" data-v-bcc520cc${_scopeId}><span class="text-base-content" data-v-bcc520cc${_scopeId}>${ssrInterpolate(item.text)}</span></div>`);
                  });
                  _push2(`<!--]--></div>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value) {
                _push2(`<div class="fixed inset-0 z-30 bg-black/20 2xl:hidden" data-v-bcc520cc${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "mx-auto max-w-4xl" }, [
                  createVNode("div", { class: "bg-base-100 transition-all duration-200" }, [
                    createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                      createVNode("div", { class: "mb-8" }, [
                        isLoading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          createVNode("div", { class: "skeleton h-8 w-3/4 rounded" }),
                          createVNode("div", { class: "skeleton h-4 w-24 rounded" })
                        ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("h1", { class: "mb-3 text-2xl font-bold text-base-content" }, toDisplayString(write.value.title), 1),
                          createVNode("div", { class: "text-base-content/60 text-sm" }, toDisplayString(formatDate(write.value.created_at)), 1)
                        ], 64))
                      ]),
                      !isLoading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6 flex items-center justify-between"
                      }, [
                        createVNode("button", {
                          onClick: toggleContent,
                          class: ["flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm transition-all duration-200 hover:bg-base-200", showDraw.value ? "border-primary bg-primary text-primary-content" : "text-base-content"]
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "h-4 w-4"
                          }, [
                            showDraw.value ? (openBlock(), createBlock("path", {
                              key: 0,
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            })) : (openBlock(), createBlock("path", {
                              key: 1,
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }))
                          ])),
                          createTextVNode(" " + toDisplayString(showDraw.value ? "Metni Göster" : "Çizimi Göster"), 1)
                        ], 2),
                        unref(auth).user ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("writes.edit", write.value.id),
                            class: "flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-base-content transition-all duration-200 hover:bg-base-300",
                            title: "Düzenle"
                          }, {
                            default: withCtx(() => [
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
                                  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                })
                              ]))
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => deleteWrite(write.value.id),
                            class: "flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-error transition-all duration-200 hover:bg-error hover:text-error-content",
                            title: "Sil"
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
                                d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      isLoading.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-3"
                      }, [
                        createVNode("div", { class: "skeleton h-4 w-full rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-5/6 rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-4/6 rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-full rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-3/4 rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-5/6 rounded" }),
                        createVNode("div", { class: "skeleton h-32 w-full rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-2/3 rounded" }),
                        createVNode("div", { class: "skeleton h-4 w-full rounded" })
                      ])) : (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("div", { class: "content-container" }, [
                          contentShouldLoad.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "article-content ql-editor",
                            ref_key: "contentRef",
                            ref: contentRef,
                            innerHTML: unref(processedContent)
                          }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "content-placeholder"
                          }, [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "skeleton h-4 w-full rounded" }),
                              createVNode("div", { class: "skeleton h-4 w-5/6 rounded" }),
                              createVNode("div", { class: "skeleton h-4 w-4/6 rounded" }),
                              createVNode("div", { class: "skeleton h-4 w-full rounded" }),
                              createVNode("div", { class: "skeleton h-4 w-3/4 rounded" })
                            ])
                          ]))
                        ])
                      ])),
                      !isLoading.value ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "text-base-content/60 mt-8 text-sm"
                      }, toDisplayString(formatNumber(write.value.views_count)) + " görüntülenme ", 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:hidden"
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
                      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    })
                  ]))
                ])) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: ["fixed right-0 top-0 z-40 h-full w-80 transform bg-base-100 shadow-2xl transition-transform duration-300 2xl:hidden", { "translate-x-full": !isTableOfContentsOpen.value }]
                }, [
                  createVNode("div", { class: "flex h-full flex-col" }, [
                    createVNode("div", { class: "flex items-center justify-between border-b border-base-300 p-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-base-content" }, "İçindekiler"),
                      createVNode("button", {
                        onClick: toggleTableOfContents,
                        class: "btn btn-ghost btn-sm"
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
                      tableOfContents.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-base-content/60 py-8 text-center text-sm"
                      }, " İçindekiler bulunamadı ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tableOfContents.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            onClick: ($event) => scrollToHeading(item.id),
                            class: ["cursor-pointer rounded-lg p-2 text-sm transition-colors hover:bg-base-200", [getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]]
                          }, [
                            createVNode("span", { class: "text-base-content" }, toDisplayString(item.text), 1)
                          ], 10, ["onClick"]);
                        }), 128))
                      ]))
                    ])
                  ])
                ], 2)) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 2,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-4 z-50 flex hidden h-10 w-10 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:flex"
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
                      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    })
                  ]))
                ])) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: ["fixed right-4 top-4 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block", isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"]
                }, [
                  createVNode("div", { class: "rounded-lg bg-base-100 shadow-lg" }, [
                    createVNode("div", { class: "flex items-center justify-between border-b border-base-300 p-3" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-base-content" }, "İçindekiler"),
                      createVNode("button", {
                        onClick: toggleTableOfContents,
                        class: "btn btn-ghost btn-xs"
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
                    createVNode("div", {
                      class: "overflow-y-auto p-3",
                      style: { "max-height": "calc(100vh - 120px)" }
                    }, [
                      tableOfContents.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-base-content/60 py-4 text-center text-xs"
                      }, " İçindekiler bulunamadı ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tableOfContents.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            onClick: ($event) => scrollToHeading(item.id),
                            class: ["cursor-pointer rounded p-2 text-xs transition-colors hover:bg-base-200", [getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]]
                          }, [
                            createVNode("span", { class: "text-base-content" }, toDisplayString(item.text), 1)
                          ], 10, ["onClick"]);
                        }), 128))
                      ]))
                    ])
                  ])
                ], 2)) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value ? (openBlock(), createBlock("div", {
                  key: 4,
                  onClick: toggleTableOfContents,
                  class: "fixed inset-0 z-30 bg-black/20 2xl:hidden"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bcc520cc"]]);
export {
  Screen as default
};
