import { ref, inject, computed, onMounted, nextTick, watch, onUnmounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./ExcalidrawComponent-CXh3jFFQ.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
/* empty css                      */
import { u as useGsapFadeIn } from "./useGsapAnimation-B7nwxQKS.js";
import { u as useProcessedQuillContent } from "./useProcessedQuillContent-CBx4Gfs5.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
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
    const isContentLoading = ref(true);
    const contentLoadError = ref(null);
    const writeContent = ref("");
    const writeDraws = ref([]);
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
    const mobileTocScrollRef = ref(null);
    const desktopTocScrollRef = ref(null);
    const tocItemRefs = ref(/* @__PURE__ */ new Map());
    const initializeTableOfContentsState = () => {
      const isLarge = window.innerWidth >= 1280;
      isLargeScreen.value = isLarge;
      if (isLarge && showTableOfContents.value && tableOfContents.value.length > 0) {
        isTableOfContentsOpen.value = true;
      } else if (!isLarge) {
        isTableOfContentsOpen.value = false;
      }
    };
    const isLoading = computed(() => !write.value.title);
    const actualContent = computed(() => writeContent.value || write.value.content || "");
    const processedContent = useProcessedQuillContent(
      contentRef,
      computed(() => contentShouldLoad.value ? actualContent.value : "")
    );
    const loadWriteContent = async () => {
      if (!write.value.slug) return;
      try {
        isContentLoading.value = true;
        contentLoadError.value = null;
        const response = await fetch(`/api/writes/${write.value.slug}/content`);
        const data = await response.json();
        if (data.success) {
          writeContent.value = data.content;
          writeDraws.value = data.writeDraws || [];
          write.value = {
            ...write.value,
            content: data.content,
            writeDraws: data.writeDraws || [],
            hasDraw: data.hasDraw
          };
        } else {
          contentLoadError.value = data.error || "İçerik yüklenemedi";
        }
      } catch (error) {
        console.error("Error loading write content:", error);
        contentLoadError.value = "İçerik yüklenirken bir hata oluştu";
      } finally {
        isContentLoading.value = false;
      }
    };
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
    const getYoutubeEmbedUrl = (url) => {
      var _a, _b;
      if (!url) return "";
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = (_b = (_a = url.split("youtu.be/")[1]) == null ? void 0 : _a.split("?")[0]) == null ? void 0 : _b.split("&")[0];
      } else if (url.includes("youtube.com/watch")) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      } else if (url.includes("youtube.com/embed/")) {
        return url;
      }
      if (!videoId) return "";
      return `https://www.youtube.com/embed/${videoId}`;
    };
    const toggleContent = async () => {
      if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
        await excalidrawRef.value.saveIfNeeded();
      }
      showDraw.value = !showDraw.value;
      if (!showDraw.value && !contentShouldLoad.value) {
        contentShouldLoad.value = true;
      }
    };
    let headingObserver = null;
    let scrollHandler = null;
    let isScrollingProgrammatically = false;
    const setupActiveHeadingTracking = () => {
      if (!contentRef.value) return;
      if (headingObserver) {
        headingObserver.disconnect();
        headingObserver = null;
      }
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
      const headings = contentRef.value.querySelectorAll(
        ".heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6"
      );
      if (headings.length === 0) return;
      const headerOffset = 80;
      const updateActiveHeading = () => {
        if (isScrollingProgrammatically) return;
        let currentHeading = null;
        let closestDistance = Infinity;
        headings.forEach((heading) => {
          if (!heading.id) return;
          const rect = heading.getBoundingClientRect();
          const distanceFromTop = rect.top - headerOffset;
          if (rect.top <= headerOffset + 50 && rect.bottom > 0) {
            if (distanceFromTop <= 50 && Math.abs(distanceFromTop) < closestDistance) {
              closestDistance = Math.abs(distanceFromTop);
              currentHeading = heading.id;
            }
          }
        });
        if (!currentHeading) {
          headings.forEach((heading) => {
            if (!heading.id) return;
            const rect = heading.getBoundingClientRect();
            if (rect.top < headerOffset + 200 && rect.bottom > 0) {
              const distance = Math.abs(rect.top - headerOffset);
              if (distance < closestDistance) {
                closestDistance = distance;
                currentHeading = heading.id;
              }
            }
          });
        }
        if (currentHeading && activeHeadingId.value !== currentHeading) {
          activeHeadingId.value = currentHeading;
        }
      };
      headingObserver = new IntersectionObserver(
        (entries) => {
          if (!isScrollingProgrammatically) {
            updateActiveHeading();
          }
        },
        {
          root: null,
          rootMargin: `-${headerOffset + 10}px 0px -60% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        }
      );
      headings.forEach((heading) => {
        if (heading.id) {
          headingObserver.observe(heading);
        }
      });
      scrollHandler = () => {
        if (!isScrollingProgrammatically) {
          updateActiveHeading();
        }
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
      updateActiveHeading();
    };
    const generateTableOfContents = () => {
      if (!contentRef.value) return;
      const headings = contentRef.value.querySelectorAll(
        ".heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6"
      );
      const toc = [];
      const seenIds = /* @__PURE__ */ new Set();
      headings.forEach((heading) => {
        let headingId = heading.id;
        if (!headingId) {
          const wrapper = heading.closest(".heading-wrapper");
          if (wrapper) {
            const anchor = wrapper.querySelector("a.heading-anchor");
            if (anchor && anchor.href) {
              headingId = anchor.href.split("#")[1];
            }
          }
        }
        if (!headingId) {
          const text2 = heading.textContent.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 50);
          headingId = text2 || `heading-${toc.length}`;
          let uniqueId = headingId;
          let counter = 1;
          while (seenIds.has(uniqueId)) {
            uniqueId = `${headingId}-${counter}`;
            counter++;
          }
          headingId = uniqueId;
          if (!heading.id) {
            heading.id = headingId;
          }
        }
        if (seenIds.has(headingId)) {
          return;
        }
        seenIds.add(headingId);
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
    const setTocItemRef = (el, headingId) => {
      if (el) {
        tocItemRefs.value.set(headingId, el);
      } else {
        tocItemRefs.value.delete(headingId);
      }
    };
    const scrollToActiveTocItem = () => {
      if (!activeHeadingId.value) return;
      const activeItem = tocItemRefs.value.get(activeHeadingId.value);
      if (!activeItem) return;
      const scrollContainer = window.innerWidth >= 1280 ? desktopTocScrollRef.value : mobileTocScrollRef.value;
      if (!scrollContainer) return;
      const containerRect = scrollContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const isAboveViewport = itemRect.top < containerRect.top;
      const isBelowViewport = itemRect.bottom > containerRect.bottom;
      if (isAboveViewport || isBelowViewport) {
        scrollContainer.scrollTop;
        const itemOffsetTop = activeItem.offsetTop;
        const containerHeight = scrollContainer.clientHeight;
        const itemHeight = activeItem.offsetHeight;
        const targetScrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;
        scrollContainer.scrollTo({
          top: targetScrollTop,
          behavior: "smooth"
        });
      }
    };
    const scrollToHeading = (headingId) => {
      if (!headingId) return;
      let element = document.getElementById(headingId);
      if (!element && contentRef.value) {
        element = contentRef.value.querySelector(`#${headingId}`);
      }
      if (!element && contentRef.value) {
        const allHeadings = contentRef.value.querySelectorAll(
          ".heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6"
        );
        for (const heading of allHeadings) {
          if (heading.id === headingId) {
            element = heading;
            break;
          }
        }
      }
      if (!element) return;
      isScrollingProgrammatically = true;
      activeHeadingId.value = headingId;
      nextTick(() => {
        scrollToActiveTocItem();
      });
      const scrollContainer = element.closest(".overflow-y-auto");
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;
        const elementOffsetTop = elementRect.top - containerRect.top + scrollTop;
        const headerOffset = 80;
        scrollContainer.scrollTo({
          top: elementOffsetTop - headerOffset,
          behavior: "smooth"
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
      setTimeout(() => {
        isScrollingProgrammatically = false;
      }, 600);
      if (window.innerWidth < 1280) {
        isTableOfContentsOpen.value = false;
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
          excalidrawRef.value.saveIfNeeded();
        }
      };
      window.addEventListener("beforeunload", beforeUnloadHandler);
      loadWriteContent().then(() => {
        contentShouldLoad.value = false;
        const contentPlaceholder = document.querySelector(".content-placeholder");
        if (contentPlaceholder) {
          contentObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !contentShouldLoad.value && !isContentLoading.value) {
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
        } else if (!isContentLoading.value) {
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
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
    });
    watch(
      actualContent,
      (newContent) => {
        if (newContent && newContent.includes("<img")) {
          const imgRegex = /<img[^>]+src="([^"]+)"/g;
          let match;
          while ((match = imgRegex.exec(newContent)) !== null) {
            const img = new Image();
            img.src = match[1];
          }
        }
      },
      { immediate: true }
    );
    onUnmounted(() => {
      if (contentObserver) {
        contentObserver.disconnect();
      }
      if (headingObserver) {
        headingObserver.disconnect();
        headingObserver = null;
      }
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      if (beforeUnloadHandler) {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    });
    router.on("before", async (event) => {
      if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
        await excalidrawRef.value.saveIfNeeded();
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
    watch(activeHeadingId, (newId, oldId) => {
      if (newId && newId !== oldId && !isScrollingProgrammatically) {
        nextTick(() => {
          scrollToActiveTocItem();
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (showDraw.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-[calc(100vh-3rem)] w-full lg:h-[calc(100vh-5.5rem)]" }, _attrs))} data-v-7756ad9e><div class="absolute left-4 top-[53px] z-10 lg:top-4" data-v-7756ad9e><button class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent" data-v-7756ad9e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-7756ad9e><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-7756ad9e></path></svg> Metne Dön </button></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          ref_key: "excalidrawRef",
          ref: excalidrawRef,
          write: write.value,
          auth: unref(props).auth
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$2, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([{
                "xl:-translate-x-[100px]": !isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value
              }, "mx-auto max-w-4xl transition-all duration-300"])}" data-v-7756ad9e${_scopeId}><div class="bg-background transition-colors" data-v-7756ad9e${_scopeId}><div class="p-3 pt-6 sm:p-6 sm:pt-12 lg:p-8 lg:pt-16" data-v-7756ad9e${_scopeId}><div class="mb-8" data-v-7756ad9e${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-7756ad9e${_scopeId}><div class="skeleton h-8 w-3/4 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-24 rounded-md" data-v-7756ad9e${_scopeId}></div></div>`);
              } else {
                _push2(`<!--[--><h1 class="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl" data-v-7756ad9e${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mb-6 flex flex-wrap items-center gap-3 text-sm" data-v-7756ad9e${_scopeId}><span class="inline-flex items-center gap-1.5 text-muted-foreground" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-7756ad9e${_scopeId}></path></svg><span class="font-medium" data-v-7756ad9e${_scopeId}>${ssrInterpolate(formatDate(write.value.created_at))}</span></span>`);
                if (writeCategories.value.length > 0) {
                  _push2(`<!--[--><span class="text-muted-foreground/40" data-v-7756ad9e${_scopeId}>•</span><div class="flex flex-wrap items-center gap-x-2 gap-y-1" data-v-7756ad9e${_scopeId}><!--[-->`);
                  ssrRenderList(writeCategories.value, (categoryPath, index) => {
                    _push2(`<!--[--><div class="inline-flex items-center gap-1" data-v-7756ad9e${_scopeId}><!--[-->`);
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
                        _push2(`<span class="text-muted-foreground/50" data-v-7756ad9e${_scopeId}>/</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<!--]-->`);
                    });
                    _push2(`<!--]--></div>`);
                    if (index < writeCategories.value.length - 1) {
                      _push2(`<span class="text-muted-foreground/40" data-v-7756ad9e${_scopeId}>,</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                if (write.value.hasDraw || writeDraws.value && writeDraws.value.length > 0 || write.value.writeDraws && write.value.writeDraws.length > 0) {
                  _push2(`<!--[--><span class="text-muted-foreground/40" data-v-7756ad9e${_scopeId}>•</span><button class="${ssrRenderClass([showDraw.value ? "bg-accent text-accent-foreground" : "", "inline-flex h-6 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}"${ssrRenderAttr("title", showDraw.value ? "Metne Dön" : "Çizime Git")} data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3" data-v-7756ad9e${_scopeId}>`);
                  if (showDraw.value) {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-7756ad9e${_scopeId}></path>`);
                  } else {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7756ad9e${_scopeId}></path>`);
                  }
                  _push2(`</svg><span class="hidden sm:inline" data-v-7756ad9e${_scopeId}>${ssrInterpolate(showDraw.value ? "Metne Dön" : "Çizime Git")}</span></button><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><!--]-->`);
              }
              _push2(`</div>`);
              if (!isLoading.value && write.value.youtube_url) {
                _push2(`<div class="mb-8" data-v-7756ad9e${_scopeId}><div class="relative w-full overflow-hidden rounded-lg border border-border bg-muted/30" style="${ssrRenderStyle({ "padding-bottom": "56.25%" })}" data-v-7756ad9e${_scopeId}><iframe${ssrRenderAttr("src", getYoutubeEmbedUrl(write.value.youtube_url))} class="absolute inset-0 h-full w-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" data-v-7756ad9e${_scopeId}></iframe></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (isLoading.value) {
                _push2(`<div class="space-y-3" data-v-7756ad9e${_scopeId}><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-32 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div></div>`);
              } else {
                _push2(`<div data-v-7756ad9e${_scopeId}><div class="content-container" data-v-7756ad9e${_scopeId}>`);
                if (isContentLoading.value) {
                  _push2(`<div class="space-y-4" data-v-7756ad9e${_scopeId}><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-32 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-md" data-v-7756ad9e${_scopeId}></div></div>`);
                } else if (contentLoadError.value) {
                  _push2(`<div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center" data-v-7756ad9e${_scopeId}><p class="text-sm text-destructive" data-v-7756ad9e${_scopeId}>${ssrInterpolate(contentLoadError.value)}</p><button class="mt-2 text-sm text-primary hover:underline" data-v-7756ad9e${_scopeId}>Tekrar Dene</button></div>`);
                } else if (contentShouldLoad.value) {
                  _push2(`<div class="article-content ql-editor" data-v-7756ad9e${_scopeId}>${unref(processedContent) ?? ""}</div>`);
                } else {
                  _push2(`<div class="content-placeholder" data-v-7756ad9e${_scopeId}><div class="space-y-3" data-v-7756ad9e${_scopeId}><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-full rounded-md" data-v-7756ad9e${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-md" data-v-7756ad9e${_scopeId}></div></div></div>`);
                }
                _push2(`</div></div>`);
              }
              if (!isLoading.value) {
                _push2(`<div class="mt-10 flex items-center gap-2 border-t border-border/60 pt-6" data-v-7756ad9e${_scopeId}><div class="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-7756ad9e${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-7756ad9e${_scopeId}></path></svg><span class="font-medium text-foreground" data-v-7756ad9e${_scopeId}>${ssrInterpolate(formatNumber(write.value.views_count))}</span><span class="text-muted-foreground" data-v-7756ad9e${_scopeId}>görüntülenme</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:hidden" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-7756ad9e${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isTableOfContentsOpen.value }, "fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"])}" data-v-7756ad9e${_scopeId}><div class="flex h-full flex-col" data-v-7756ad9e${_scopeId}><div class="flex items-center justify-between border-b border-border p-4" data-v-7756ad9e${_scopeId}><h3 class="text-lg font-semibold text-foreground" data-v-7756ad9e${_scopeId}>İçindekiler</h3><button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-7756ad9e${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4" data-v-7756ad9e${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="py-8 text-center text-sm text-muted-foreground" data-v-7756ad9e${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<nav class="space-y-0.5" data-v-7756ad9e${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<a class="${ssrRenderClass([[
                      getTreeHeadingClass(item.level),
                      getActiveHeadingClass(item.id),
                      activeHeadingId.value === item.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    ], "block cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors"])}" data-v-7756ad9e${_scopeId}>${ssrInterpolate(item.text)}</a>`);
                  });
                  _push2(`<!--]--></nav>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<button class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:flex" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-7756ad9e${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && !showDraw.value) {
                _push2(`<div class="${ssrRenderClass([isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block"])}" data-v-7756ad9e${_scopeId}><div class="rounded-lg border border-border bg-popover shadow-lg" data-v-7756ad9e${_scopeId}><div class="flex items-center justify-between border-b border-border p-3" data-v-7756ad9e${_scopeId}><h3 class="text-sm font-semibold text-foreground" data-v-7756ad9e${_scopeId}>İçindekiler</h3><button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-7756ad9e${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-7756ad9e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-7756ad9e${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-3" style="${ssrRenderStyle({ "max-height": "calc(100vh - 220px)" })}" data-v-7756ad9e${_scopeId}>`);
                if (tableOfContents.value.length === 0) {
                  _push2(`<div class="py-4 text-center text-xs text-muted-foreground" data-v-7756ad9e${_scopeId}> İçindekiler bulunamadı </div>`);
                } else {
                  _push2(`<nav class="space-y-0.5" data-v-7756ad9e${_scopeId}><!--[-->`);
                  ssrRenderList(tableOfContents.value, (item, index) => {
                    _push2(`<a class="${ssrRenderClass([[
                      getTreeHeadingClass(item.level),
                      getActiveHeadingClass(item.id),
                      activeHeadingId.value === item.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    ], "block cursor-pointer rounded-md px-2 py-1 text-xs transition-colors"])}" data-v-7756ad9e${_scopeId}>${ssrInterpolate(item.text)}</a>`);
                  });
                  _push2(`<!--]--></nav>`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value) {
                _push2(`<div class="fixed inset-0 z-30 bg-black/20 xl:hidden" data-v-7756ad9e${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", {
                  class: ["mx-auto max-w-4xl transition-all duration-300", {
                    "xl:-translate-x-[100px]": !isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value
                  }]
                }, [
                  createVNode("div", { class: "bg-background transition-colors" }, [
                    createVNode("div", { class: "p-3 pt-6 sm:p-6 sm:pt-12 lg:p-8 lg:pt-16" }, [
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
                            write.value.hasDraw || writeDraws.value && writeDraws.value.length > 0 || write.value.writeDraws && write.value.writeDraws.length > 0 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
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
                      !isLoading.value && write.value.youtube_url ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-8"
                      }, [
                        createVNode("div", {
                          class: "relative w-full overflow-hidden rounded-lg border border-border bg-muted/30",
                          style: { "padding-bottom": "56.25%" }
                        }, [
                          createVNode("iframe", {
                            src: getYoutubeEmbedUrl(write.value.youtube_url),
                            class: "absolute inset-0 h-full w-full",
                            frameborder: "0",
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                            allowfullscreen: "",
                            loading: "lazy"
                          }, null, 8, ["src"])
                        ])
                      ])) : createCommentVNode("", true),
                      isLoading.value ? (openBlock(), createBlock("div", {
                        key: 1,
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
                      ])) : (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("div", { class: "content-container" }, [
                          isContentLoading.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-5/6 rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-4/6 rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-3/4 rounded-md" }),
                            createVNode("div", { class: "skeleton h-32 w-full rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-5/6 rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-full rounded-md" }),
                            createVNode("div", { class: "skeleton h-4 w-2/3 rounded-md" })
                          ])) : contentLoadError.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center"
                          }, [
                            createVNode("p", { class: "text-sm text-destructive" }, toDisplayString(contentLoadError.value), 1),
                            createVNode("button", {
                              onClick: loadWriteContent,
                              class: "mt-2 text-sm text-primary hover:underline"
                            }, "Tekrar Dene")
                          ])) : contentShouldLoad.value ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "article-content ql-editor",
                            ref_key: "contentRef",
                            ref: contentRef,
                            innerHTML: unref(processedContent)
                          }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("div", {
                            key: 3,
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
                        key: 3,
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
                ], 2),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:hidden"
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
                  class: ["fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden", { "translate-x-full": !isTableOfContentsOpen.value }]
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
                    createVNode("div", {
                      ref_key: "mobileTocScrollRef",
                      ref: mobileTocScrollRef,
                      class: "flex-1 overflow-y-auto p-4"
                    }, [
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
                            ref_for: true,
                            ref: (el) => setTocItemRef(el, item.id),
                            onClick: (e) => {
                              e.preventDefault();
                              scrollToHeading(item.id);
                            },
                            class: ["block cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors", [
                              getTreeHeadingClass(item.level),
                              getActiveHeadingClass(item.id),
                              activeHeadingId.value === item.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            ]]
                          }, toDisplayString(item.text), 11, ["onClick"]);
                        }), 128))
                      ]))
                    ], 512)
                  ])
                ], 2)) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && !showDraw.value ? (openBlock(), createBlock("button", {
                  key: 2,
                  onClick: toggleTableOfContents,
                  class: "fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:flex"
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
                  class: ["fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block", isTableOfContentsOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"]
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
                      ref_key: "desktopTocScrollRef",
                      ref: desktopTocScrollRef,
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
                            ref_for: true,
                            ref: (el) => setTocItemRef(el, item.id),
                            onClick: (e) => {
                              e.preventDefault();
                              scrollToHeading(item.id);
                            },
                            class: ["block cursor-pointer rounded-md px-2 py-1 text-xs transition-colors", [
                              getTreeHeadingClass(item.level),
                              getActiveHeadingClass(item.id),
                              activeHeadingId.value === item.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            ]]
                          }, toDisplayString(item.text), 11, ["onClick"]);
                        }), 128))
                      ]))
                    ], 512)
                  ])
                ], 2)) : createCommentVNode("", true),
                !isLoading.value && showTableOfContents.value && isTableOfContentsOpen.value && !showDraw.value ? (openBlock(), createBlock("div", {
                  key: 4,
                  onClick: toggleTableOfContents,
                  class: "fixed inset-0 z-30 bg-black/20 xl:hidden"
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7756ad9e"]]);
export {
  Screen as default
};
