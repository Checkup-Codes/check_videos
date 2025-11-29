import { ref, inject, computed, onMounted, nextTick, onUnmounted, watch, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ExcalidrawComponent-kd23l8pv.js";
import { _ as _sfc_main$2 } from "./CheckScreen-juRHZR4N.js";
/* empty css                      */
import { u as useGsapFadeIn } from "./useGsapAnimation-B7nwxQKS.js";
import { u as useProcessedQuillContent } from "./useProcessedQuillContent-BIYDEgIN.js";
import { _ as _export_sfc } from "../ssr.js";
import "gsap";
import "gsap/ScrollTrigger.js";
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
    const { props } = usePage();
    const write = ref(props.write || {});
    const contentRef = ref(null);
    const excalidrawRef = ref(null);
    const showDraw = ref(false);
    const contentShouldLoad = ref(false);
    const injectedCategories = inject("categories", null);
    const allCategories = computed(() => {
      if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
        return injectedCategories;
      }
      if (props.categories && Array.isArray(props.categories) && props.categories.length > 0) {
        return props.categories;
      }
      return [];
    });
    const writeCategories = computed(() => {
      if (!write.value) {
        return [];
      }
      const categories = allCategories.value;
      if (categories.length === 0) {
        return [];
      }
      const categoryPaths = [];
      const categoryIds = /* @__PURE__ */ new Set();
      if (write.value.categories && Array.isArray(write.value.categories) && write.value.categories.length > 0) {
        write.value.categories.forEach((category) => {
          if (category && category.id && !categoryIds.has(category.id)) {
            categoryIds.add(category.id);
            const path = getCategoryPath(category.id, categories);
            if (path.length > 0) {
              categoryPaths.push(path);
            }
          }
        });
      }
      if (write.value.category && write.value.category.id && !categoryIds.has(write.value.category.id)) {
        categoryIds.add(write.value.category.id);
        const path = getCategoryPath(write.value.category.id, categories);
        if (path.length > 0) {
          categoryPaths.push(path);
        }
      }
      if (write.value.category_id && !categoryIds.has(write.value.category_id)) {
        categoryIds.add(write.value.category_id);
        const path = getCategoryPath(write.value.category_id, categories);
        if (path.length > 0) {
          categoryPaths.push(path);
        }
      }
      return categoryPaths;
    });
    const getCategoryPath = (categoryId, categories) => {
      if (!categoryId || !categories || categories.length === 0) {
        return [];
      }
      const category = categories.find((cat) => cat && cat.id === categoryId);
      if (!category) {
        return [];
      }
      const path = [category];
      let currentCategory = category;
      while (currentCategory && currentCategory.parent_id) {
        const parent = categories.find((cat) => cat && cat.id === currentCategory.parent_id);
        if (parent) {
          path.unshift(parent);
          currentCategory = parent;
        } else {
          break;
        }
      }
      return path;
    };
    const getCategoryRoute = (category) => {
      return route("categories.show", { category: category.slug });
    };
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
      if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
        if (!confirm("Kaydedilmemiş değişiklikler var. Metne dönmek istediğinizden emin misiniz?")) {
          return;
        }
      }
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
      const headerOffset = 80;
      const updateActiveHeading = () => {
        let currentHeading = null;
        let minDistance = Infinity;
        headings.forEach((heading) => {
          if (!heading.id) return;
          const rect = heading.getBoundingClientRect();
          const distanceFromTop = Math.abs(rect.top - headerOffset);
          if (rect.top <= headerOffset + 20 && rect.bottom > headerOffset) {
            if (distanceFromTop < minDistance) {
              minDistance = distanceFromTop;
              currentHeading = heading.id;
            }
          }
        });
        if (!currentHeading) {
          headings.forEach((heading) => {
            if (!heading.id) return;
            const rect = heading.getBoundingClientRect();
            if (rect.top <= headerOffset + 100) {
              const distance = Math.abs(rect.top - headerOffset);
              if (distance < minDistance) {
                minDistance = distance;
                currentHeading = heading.id;
              }
            }
          });
        }
        if (currentHeading) {
          activeHeadingId.value = currentHeading;
        }
      };
      headingObserver = new IntersectionObserver(
        (entries) => {
          updateActiveHeading();
        },
        {
          root: null,
          rootMargin: `-${headerOffset}px 0px -70% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        }
      );
      headings.forEach((heading) => {
        if (heading.id) {
          headingObserver.observe(heading);
        }
      });
      const handleScroll = () => {
        updateActiveHeading();
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      headingObserver._scrollHandler = handleScroll;
      updateActiveHeading();
    };
    const generateTableOfContents = () => {
      if (!contentRef.value) return;
      const headings = contentRef.value.querySelectorAll(
        ".heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6"
      );
      const toc = [];
      headings.forEach((heading) => {
        var _a, _b, _c;
        const headingId = heading.id || ((_c = (_b = (_a = heading.closest(".heading-wrapper")) == null ? void 0 : _a.querySelector("a.heading-anchor")) == null ? void 0 : _b.href) == null ? void 0 : _c.split("#")[1]) || `heading-${toc.length}`;
        if (!heading.id) {
          heading.id = headingId;
        }
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        if (text) {
          toc.push({
            id: headingId,
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
        const headerOffset = 80;
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const scrollPosition = elementTop - headerOffset;
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });
        if (window.innerWidth < 1536) {
          isTableOfContentsOpen.value = false;
        }
      }
    };
    const getTreeHeadingClass = (level) => {
      switch (level) {
        case 1:
          return "pl-0";
        case 2:
          return "pl-4";
        case 3:
          return "pl-6";
        case 4:
          return "pl-8";
        case 5:
          return "pl-10";
        case 6:
          return "pl-12";
        default:
          return "pl-0";
      }
    };
    const getActiveHeadingClass = (headingId) => {
      return "";
    };
    let contentObserver = null;
    let resizeHandler = null;
    let beforeUnloadHandler = null;
    onMounted(() => {
      initializeTableOfContentsState();
      resizeHandler = () => {
        initializeTableOfContentsState();
      };
      window.addEventListener("resize", resizeHandler);
      beforeUnloadHandler = (e) => {
        if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
          e.preventDefault();
          e.returnValue = "Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?";
          return e.returnValue;
        }
      };
      window.addEventListener("beforeunload", beforeUnloadHandler);
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
        if (headingObserver._scrollHandler) {
          window.removeEventListener("scroll", headingObserver._scrollHandler);
        }
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      if (beforeUnloadHandler) {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    });
    router.on("before", (event) => {
      if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
        if (!confirm("Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?")) {
          event.preventDefault();
          return;
        }
      }
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-[calc(100vh-3rem)] w-full lg:h-[calc(100vh-5.5rem)]" }, _attrs))} data-v-b24d74d8><div class="absolute left-4 top-[53px] z-10 lg:top-4" data-v-b24d74d8><button class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent" data-v-b24d74d8><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-b24d74d8><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-b24d74d8></path></svg> Metne Dön </button></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          ref_key: "excalidrawRef",
          ref: excalidrawRef,
          write: write.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-auto max-w-4xl" data-v-b24d74d8${_scopeId}><div class="bg-background transition-colors" data-v-b24d74d8${_scopeId}><div class="p-6 pt-12 sm:p-8 sm:pt-16" data-v-b24d74d8${_scopeId}><div class="mb-8" data-v-b24d74d8${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-b24d74d8${_scopeId}><div class="skeleton h-8 w-3/4 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-24 rounded-md" data-v-b24d74d8${_scopeId}></div></div>`);
              } else {
                _push2(`<!--[--><h1 class="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl" data-v-b24d74d8${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mb-6 flex flex-wrap items-center gap-3 text-sm" data-v-b24d74d8${_scopeId}><span class="inline-flex items-center gap-1.5 text-muted-foreground" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-b24d74d8${_scopeId}></path></svg><span class="font-medium" data-v-b24d74d8${_scopeId}>${ssrInterpolate(formatDate(write.value.created_at))}</span></span>`);
                if (writeCategories.value.length > 0) {
                  _push2(`<!--[--><span class="text-muted-foreground/40" data-v-b24d74d8${_scopeId}>•</span><div class="flex flex-wrap items-center gap-x-2 gap-y-1" data-v-b24d74d8${_scopeId}><!--[-->`);
                  ssrRenderList(writeCategories.value, (categoryPath, index) => {
                    _push2(`<!--[--><div class="inline-flex items-center gap-1" data-v-b24d74d8${_scopeId}><!--[-->`);
                    ssrRenderList(categoryPath, (category, catIndex) => {
                      _push2(`<!--[-->`);
                      _push2(ssrRenderComponent(unref(Link), {
                        href: getCategoryRoute(category),
                        class: "font-semibold text-primary transition-colors hover:underline"
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`${ssrInterpolate(category.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(category.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                      if (catIndex < categoryPath.length - 1) {
                        _push2(`<span class="text-muted-foreground/50" data-v-b24d74d8${_scopeId}>/</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<!--]-->`);
                    });
                    _push2(`<!--]--></div>`);
                    if (index < writeCategories.value.length - 1) {
                      _push2(`<span class="text-muted-foreground/40" data-v-b24d74d8${_scopeId}>,</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                if (write.value.hasDraw || write.value.writeDraws && write.value.writeDraws.length > 0) {
                  _push2(`<!--[--><span class="text-muted-foreground/40" data-v-b24d74d8${_scopeId}>•</span><button class="${ssrRenderClass([showDraw.value ? "bg-accent text-accent-foreground" : "", "inline-flex h-6 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}"${ssrRenderAttr("title", showDraw.value ? "Metne Dön" : "Çizime Git")} data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3" data-v-b24d74d8${_scopeId}>`);
                  if (showDraw.value) {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-b24d74d8${_scopeId}></path>`);
                  } else {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b24d74d8${_scopeId}></path>`);
                  }
                  _push2(`</svg><span class="hidden sm:inline" data-v-b24d74d8${_scopeId}>${ssrInterpolate(showDraw.value ? "Metne Dön" : "Çizime Git")}</span></button><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><!--]-->`);
              }
              _push2(`</div>`);
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-b24d74d8${_scopeId}><div class="skeleton h-4 w-full rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-32 w-full rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-b24d74d8${_scopeId}></div></div>`);
              } else {
                _push2(`<div data-v-b24d74d8${_scopeId}><div class="content-container" data-v-b24d74d8${_scopeId}>`);
                if (contentShouldLoad.value) {
                  _push2(`<div class="article-content ql-editor" data-v-b24d74d8${_scopeId}>${unref(processedContent) ?? ""}</div>`);
                } else {
                  _push2(`<div class="content-placeholder" data-v-b24d74d8${_scopeId}><div class="space-y-3" data-v-b24d74d8${_scopeId}><div class="skeleton h-4 w-full rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-b24d74d8${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-md" data-v-b24d74d8${_scopeId}></div></div></div>`);
                }
                _push2(`</div></div>`);
              }
              if (!isLoading.value) {
                _push2(`<div class="mt-10 flex items-center gap-2 border-t border-border/60 pt-6" data-v-b24d74d8${_scopeId}><div class="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-b24d74d8${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-b24d74d8${_scopeId}></path></svg><span class="font-medium text-foreground" data-v-b24d74d8${_scopeId}>${ssrInterpolate(formatNumber(write.value.views_count))}</span><span class="text-muted-foreground" data-v-b24d74d8${_scopeId}>görüntülenme</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:hidden" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-b24d74d8${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isTableOfContentsOpen.value }, "fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 2xl:hidden"])}" data-v-b24d74d8${_scopeId}><div class="flex h-full flex-col" data-v-b24d74d8${_scopeId}><div class="flex items-center justify-between border-b border-border p-4" data-v-b24d74d8${_scopeId}><h3 class="text-lg font-semibold text-foreground" data-v-b24d74d8${_scopeId}>İçindekiler</h3><button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-b24d74d8${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4" data-v-b24d74d8${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="py-8 text-center text-sm text-muted-foreground" data-v-b24d74d8${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<nav class="space-y-0.5" data-v-b24d74d8${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<a class="${ssrRenderClass([[
                      getTreeHeadingClass(item.level),
                      getActiveHeadingClass(item.id),
                      activeHeadingId.value === item.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    ], "block rounded-md px-2 py-1.5 text-sm transition-colors"])}" data-v-b24d74d8${_scopeId}>${ssrInterpolate(item.text)}</a>`);
                  });
                  _push2(`<!--]--></nav>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:flex" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-b24d74d8${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block"])}" data-v-b24d74d8${_scopeId}><div class="rounded-lg border border-border bg-popover shadow-lg" data-v-b24d74d8${_scopeId}><div class="flex items-center justify-between border-b border-border p-3" data-v-b24d74d8${_scopeId}><h3 class="text-sm font-semibold text-foreground" data-v-b24d74d8${_scopeId}>İçindekiler</h3><button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-b24d74d8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-b24d74d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-b24d74d8${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-3" style="${ssrRenderStyle({ "max-height": "calc(100vh - 220px)" })}" data-v-b24d74d8${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="py-4 text-center text-xs text-muted-foreground" data-v-b24d74d8${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<nav class="space-y-0.5" data-v-b24d74d8${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<a class="${ssrRenderClass([[
                      getTreeHeadingClass(item.level),
                      getActiveHeadingClass(item.id),
                      activeHeadingId.value === item.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    ], "block rounded-md px-2 py-1 text-xs transition-colors"])}" data-v-b24d74d8${_scopeId}>${ssrInterpolate(item.text)}</a>`);
                  });
                  _push2(`<!--]--></nav>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value) {
                _push2(`<div class="fixed inset-0 z-30 bg-black/20 2xl:hidden" data-v-b24d74d8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "mx-auto max-w-4xl" }, [
                  createVNode("div", { class: "bg-background transition-colors" }, [
                    createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                      createVNode("div", { class: "mb-8" }, [
                        isLoading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          createVNode("div", { class: "skeleton h-8 w-3/4 rounded-md" }),
                          createVNode("div", { class: "skeleton h-4 w-24 rounded-md" })
                        ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("h1", { class: "mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl" }, toDisplayString(write.value.title), 1),
                          createVNode("div", { class: "mb-6 flex flex-wrap items-center gap-3 text-sm" }, [
                            createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                "stroke-width": "2"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(write.value.created_at)), 1)
                            ]),
                            writeCategories.value.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode("span", { class: "text-muted-foreground/40" }, "•"),
                              createVNode("div", { class: "flex flex-wrap items-center gap-x-2 gap-y-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(writeCategories.value, (categoryPath, index) => {
                                  return openBlock(), createBlock(Fragment, { key: index }, [
                                    createVNode("div", { class: "inline-flex items-center gap-1" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(categoryPath, (category, catIndex) => {
                                        return openBlock(), createBlock(Fragment, {
                                          key: category.id
                                        }, [
                                          createVNode(unref(Link), {
                                            href: getCategoryRoute(category),
                                            class: "font-semibold text-primary transition-colors hover:underline"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(category.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["href"]),
                                          catIndex < categoryPath.length - 1 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-muted-foreground/50"
                                          }, "/")) : createCommentVNode("", true)
                                        ], 64);
                                      }), 128))
                                    ]),
                                    index < writeCategories.value.length - 1 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-muted-foreground/40"
                                    }, ",")) : createCommentVNode("", true)
                                  ], 64);
                                }), 128))
                              ])
                            ], 64)) : createCommentVNode("", true),
                            write.value.hasDraw || write.value.writeDraws && write.value.writeDraws.length > 0 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("span", { class: "text-muted-foreground/40" }, "•"),
                              createVNode("button", {
                                onClick: toggleContent,
                                class: ["inline-flex h-6 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", showDraw.value ? "bg-accent text-accent-foreground" : ""],
                                title: showDraw.value ? "Metne Dön" : "Çizime Git"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  class: "h-3 w-3"
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
                                createVNode("span", { class: "hidden sm:inline" }, toDisplayString(showDraw.value ? "Metne Dön" : "Çizime Git"), 1)
                              ], 10, ["title"])
                            ], 64)) : createCommentVNode("", true)
                          ])
                        ], 64))
                      ]),
                      isLoading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-5/6 rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-4/6 rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-3/4 rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-5/6 rounded-md" }),
                        createVNode("div", { class: "skeleton h-32 w-full rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-2/3 rounded-md" }),
                        createVNode("div", { class: "skeleton h-4 w-full rounded-md" })
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
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
                              createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                              createVNode("div", { class: "skeleton h-4 w-5/6 rounded-md" }),
                              createVNode("div", { class: "skeleton h-4 w-4/6 rounded-md" }),
                              createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                              createVNode("div", { class: "skeleton h-4 w-3/4 rounded-md" })
                            ])
                          ]))
                        ])
                      ])),
                      !isLoading.value ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-10 flex items-center gap-2 border-t border-border/60 pt-6"
                      }, [
                        createVNode("div", { class: "inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4 text-muted-foreground",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(formatNumber(write.value.views_count)), 1),
                          createVNode("span", { class: "text-muted-foreground" }, "görüntülenme")
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:hidden"
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
                  class: ["fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 2xl:hidden", { "translate-x-full": !isTableOfContentsOpen.value }]
                }, [
                  createVNode("div", { class: "flex h-full flex-col" }, [
                    createVNode("div", { class: "flex items-center justify-between border-b border-border p-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "İçindekiler"),
                      createVNode("button", {
                        onClick: toggleTableOfContents,
                        class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
                        class: "py-8 text-center text-sm text-muted-foreground"
                      }, " İçindekiler bulunamadı ")) : (openBlock(), createBlock("nav", {
                        key: 1,
                        class: "space-y-0.5"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tableOfContents.value, (item, index) => {
                          return openBlock(), createBlock("a", {
                            key: index,
                            onClick: withModifiers(($event) => scrollToHeading(item.id), ["prevent"]),
                            class: ["block rounded-md px-2 py-1.5 text-sm transition-colors", [
                              getTreeHeadingClass(item.level),
                              getActiveHeadingClass(item.id),
                              activeHeadingId.value === item.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            ]]
                          }, toDisplayString(item.text), 11, ["onClick"]);
                        }), 128))
                      ]))
                    ])
                  ])
                ], 2)) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 2,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:flex"
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
                  createVNode("div", { class: "rounded-lg border border-border bg-popover shadow-lg" }, [
                    createVNode("div", { class: "flex items-center justify-between border-b border-border p-3" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "İçindekiler"),
                      createVNode("button", {
                        onClick: toggleTableOfContents,
                        class: "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
                        class: "py-4 text-center text-xs text-muted-foreground"
                      }, " İçindekiler bulunamadı ")) : (openBlock(), createBlock("nav", {
                        key: 1,
                        class: "space-y-0.5"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(tableOfContents.value, (item, index) => {
                          return openBlock(), createBlock("a", {
                            key: index,
                            onClick: withModifiers(($event) => scrollToHeading(item.id), ["prevent"]),
                            class: ["block rounded-md px-2 py-1 text-xs transition-colors", [
                              getTreeHeadingClass(item.level),
                              getActiveHeadingClass(item.id),
                              activeHeadingId.value === item.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            ]]
                          }, toDisplayString(item.text), 11, ["onClick"]);
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b24d74d8"]]);
export {
  Screen as default
};
