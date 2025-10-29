import { ref, computed, onMounted, nextTick, onUnmounted, watch, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, Fragment, toDisplayString, createTextVNode, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ExcalidrawComponent-DE4tsr7U.js";
import { _ as _sfc_main$2 } from "./CheckScreen-BjSTIeRu.js";
/* empty css                             */
import { u as useGsapFadeIn } from "./useGsapAnimation-B7nwxQKS.js";
import { u as useProcessedQuillContent } from "./useProcessedQuillContent-CwrhLhCz.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { _ as _export_sfc } from "../ssr.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowWriteScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    gsap.registerPlugin(ScrollTrigger);
    const { props } = usePage();
    const write = ref(props.write || {});
    props.auth;
    const contentRef = ref(null);
    const showDraw = ref(false);
    const contentShouldLoad = ref(false);
    const isTableOfContentsOpen = ref(false);
    const tableOfContents = ref([]);
    const showTableOfContents = ref(false);
    const activeHeadingId = ref(null);
    const isLargeScreen = ref(false);
    const initializeTableOfContentsState = () => {
      const isLarge = window.innerWidth >= 1536;
      isLargeScreen.value = isLarge;
      if (isLarge && showTableOfContents.value && tableOfContents.value.length > 0) {
        isTableOfContentsOpen.value = true;
      } else if (!isLarge) {
        isTableOfContentsOpen.value = false;
      }
    };
    const isLoading = computed(() => !write.value.title);
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
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
      if (!showDraw.value && !contentShouldLoad.value) {
        contentShouldLoad.value = true;
      }
    };
    let headingObserver = null;
    const setupActiveHeadingTracking = () => {
      if (!contentRef.value) return;
      if (headingObserver) {
        headingObserver.disconnect();
      }
      const headings = contentRef.value.querySelectorAll("h1, h2, h3, h4, h5, h6");
      if (headings.length === 0) return;
      headingObserver = new IntersectionObserver(
        (entries) => {
          const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
          if (visibleHeadings.length > 0) {
            visibleHeadings.sort((a, b) => {
              if (a.intersectionRatio !== b.intersectionRatio) {
                return b.intersectionRatio - a.intersectionRatio;
              }
              return a.boundingClientRect.top - b.boundingClientRect.top;
            });
            const topHeading = visibleHeadings[0];
            if (topHeading.target.id) {
              activeHeadingId.value = topHeading.target.id;
            }
          }
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }
      );
      headings.forEach((heading) => {
        if (heading.id) {
          headingObserver.observe(heading);
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
    const toggleTableOfContents = () => {
      isTableOfContentsOpen.value = !isTableOfContentsOpen.value;
    };
    const scrollToHeading = (headingId) => {
      const element = document.getElementById(headingId);
      if (element) {
        activeHeadingId.value = headingId;
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
    let contentObserver = null;
    let resizeHandler = null;
    onMounted(() => {
      initializeTableOfContentsState();
      resizeHandler = () => {
        initializeTableOfContentsState();
      };
      window.addEventListener("resize", resizeHandler);
      contentShouldLoad.value = false;
      const contentPlaceholder = document.querySelector(".content-placeholder");
      if (contentPlaceholder) {
        contentObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !contentShouldLoad.value) {
                contentShouldLoad.value = true;
                nextTick(() => {
                  useGsapFadeIn(contentRef, { duration: 0.8 });
                  setTimeout(() => {
                    generateTableOfContents();
                    if (tableOfContents.value.length > 0) {
                      setupActiveHeadingTracking();
                      if (isLargeScreen.value) {
                        isTableOfContentsOpen.value = true;
                      }
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
          useGsapFadeIn(contentRef, { duration: 0.8 });
          setTimeout(() => {
            generateTableOfContents();
            if (tableOfContents.value.length > 0) {
              setupActiveHeadingTracking();
              if (isLargeScreen.value) {
                isTableOfContentsOpen.value = true;
              }
            }
          }, 100);
        });
      }
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
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
      if (headingObserver) {
        headingObserver.disconnect();
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
    });
    router.on("before", () => {
      const writeListElement = document.querySelector(".write-list-container");
      if (writeListElement) {
        localStorage.setItem("writeListScrollPosition", writeListElement.scrollTop.toString());
      }
    });
    watch(
      processedContent,
      () => {
        if (contentShouldLoad.value && processedContent.value) {
          nextTick(() => {
            generateTableOfContents();
            if (tableOfContents.value.length > 0) {
              setupActiveHeadingTracking();
              if (isLargeScreen.value) {
                isTableOfContentsOpen.value = true;
              }
            }
          });
        }
      },
      { flush: "post" }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (showDraw.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-screen w-full" }, _attrs))} data-v-d97bdc95><div class="absolute left-4 top-[53px] z-10 lg:top-4" data-v-d97bdc95><button class="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content shadow-lg transition-all duration-200 hover:bg-base-200" data-v-d97bdc95><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d97bdc95><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-d97bdc95></path></svg> Metne Dön </button></div>`);
        _push(ssrRenderComponent(_sfc_main$1, { write: write.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-auto max-w-4xl" data-v-d97bdc95${_scopeId}><div class="bg-base-100 transition-all duration-200" data-v-d97bdc95${_scopeId}><div class="p-6 pt-12 sm:p-8 sm:pt-16" data-v-d97bdc95${_scopeId}><div class="mb-8" data-v-d97bdc95${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-d97bdc95${_scopeId}><div class="skeleton h-8 w-3/4 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-24 rounded" data-v-d97bdc95${_scopeId}></div></div>`);
              } else {
                _push2(`<!--[--><h1 class="mb-3 text-2xl font-bold text-base-content" data-v-d97bdc95${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="text-base-content/60 text-sm" data-v-d97bdc95${_scopeId}>${ssrInterpolate(formatDate(write.value.created_at))}</div><!--]-->`);
              }
              _push2(`</div>`);
              if (!isLoading.value) {
                _push2(`<div class="mb-6 flex items-center justify-between" data-v-d97bdc95${_scopeId}><button class="${ssrRenderClass([showDraw.value ? "border-primary bg-primary text-primary-content" : "text-base-content", "flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm transition-all duration-200 hover:bg-base-200"])}" data-v-d97bdc95${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d97bdc95${_scopeId}>`);
                if (showDraw.value) {
                  _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-d97bdc95${_scopeId}></path>`);
                } else {
                  _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d97bdc95${_scopeId}></path>`);
                }
                _push2(`</svg> ${ssrInterpolate(showDraw.value ? "Metni Göster" : "Çizimi Göster")}</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-d97bdc95${_scopeId}><div class="skeleton h-4 w-full rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-32 w-full rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-d97bdc95${_scopeId}></div></div>`);
              } else {
                _push2(`<div data-v-d97bdc95${_scopeId}><div class="content-container" data-v-d97bdc95${_scopeId}>`);
                if (contentShouldLoad.value) {
                  _push2(`<div class="article-content ql-editor" data-v-d97bdc95${_scopeId}>${unref(processedContent) ?? ""}</div>`);
                } else {
                  _push2(`<div class="content-placeholder" data-v-d97bdc95${_scopeId}><div class="space-y-3" data-v-d97bdc95${_scopeId}><div class="skeleton h-4 w-full rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-full rounded" data-v-d97bdc95${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded" data-v-d97bdc95${_scopeId}></div></div></div>`);
                }
                _push2(`</div></div>`);
              }
              if (!isLoading.value) {
                _push2(`<div class="text-base-content/60 mt-8 text-sm" data-v-d97bdc95${_scopeId}>${ssrInterpolate(formatNumber(write.value.views_count))} görüntülenme </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:hidden" data-v-d97bdc95${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-d97bdc95${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-d97bdc95${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isTableOfContentsOpen.value }, "fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform bg-base-100 shadow-2xl transition-transform duration-300 2xl:hidden"])}" data-v-d97bdc95${_scopeId}><div class="flex h-full flex-col" data-v-d97bdc95${_scopeId}><div class="flex items-center justify-between border-b border-base-300 p-4" data-v-d97bdc95${_scopeId}><h3 class="text-lg font-semibold text-base-content" data-v-d97bdc95${_scopeId}>İçindekiler</h3><button class="btn btn-ghost btn-sm" data-v-d97bdc95${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d97bdc95${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d97bdc95${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4" data-v-d97bdc95${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="text-base-content/60 py-8 text-center text-sm" data-v-d97bdc95${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<div class="space-y-1" data-v-d97bdc95${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<div class="${ssrRenderClass([[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)], "cursor-pointer rounded-lg p-2 text-sm transition-colors hover:bg-base-200"])}" data-v-d97bdc95${_scopeId}><span class="text-base-content" data-v-d97bdc95${_scopeId}>${ssrInterpolate(item.text)}</span></div>`);
                  });
                  _push2(`<!--]--></div>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:flex" data-v-d97bdc95${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-d97bdc95${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-d97bdc95${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block"])}" data-v-d97bdc95${_scopeId}><div class="rounded-lg bg-base-100 shadow-lg" data-v-d97bdc95${_scopeId}><div class="flex items-center justify-between border-b border-base-300 p-3" data-v-d97bdc95${_scopeId}><h3 class="text-sm font-semibold text-base-content" data-v-d97bdc95${_scopeId}>İçindekiler</h3><button class="btn btn-ghost btn-xs" data-v-d97bdc95${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-d97bdc95${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d97bdc95${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-3" style="${ssrRenderStyle({ "max-height": "calc(100vh - 220px)" })}" data-v-d97bdc95${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="text-base-content/60 py-4 text-center text-xs" data-v-d97bdc95${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<div class="space-y-1" data-v-d97bdc95${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<div class="${ssrRenderClass([[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)], "cursor-pointer rounded p-2 text-xs transition-colors hover:bg-base-200"])}" data-v-d97bdc95${_scopeId}><span class="text-base-content" data-v-d97bdc95${_scopeId}>${ssrInterpolate(item.text)}</span></div>`);
                  });
                  _push2(`<!--]--></div>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value) {
                _push2(`<div class="fixed inset-0 z-30 bg-black/20 2xl:hidden" data-v-d97bdc95${_scopeId}></div>`);
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
                        ], 2)
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
                  class: ["fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform bg-base-100 shadow-2xl transition-transform duration-300 2xl:hidden", { "translate-x-full": !isTableOfContentsOpen.value }]
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
                  class: "fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:flex"
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
                  class: ["fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block", isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"]
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
                      style: { "max-height": "calc(100vh - 220px)" }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d97bdc95"]]);
export {
  Screen as default
};
