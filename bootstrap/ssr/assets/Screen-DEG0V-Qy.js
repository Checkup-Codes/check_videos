import { computed, ref, onMounted, nextTick, onUnmounted, watch, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const test = props.test || {};
    const isAdmin = props.isAdmin || false;
    const testAnalysis = props.testAnalysis || null;
    const hasAnalysis = computed(() => {
      return !!(testAnalysis == null ? void 0 : testAnalysis.has_results);
    });
    const analysisStats = computed(() => {
      if (!hasAnalysis.value) return [];
      return [
        { label: "Deneme", value: testAnalysis.attempts_count },
        { label: "Son Skor", value: formatScore(testAnalysis.latest_score) },
        { label: "Ortalama", value: formatScore(testAnalysis.average_score) },
        { label: "En İyi", value: formatScore(testAnalysis.best_score) },
        { label: "Ort. Süre", value: testAnalysis.average_time_taken ? formatTime(testAnalysis.average_time_taken) : "-" }
      ];
    });
    const formatScore = (score) => {
      if (score === null || score === void 0) return "-";
      return `%${Math.round(Number(score))}`;
    };
    const formatTime = (seconds) => {
      if (!seconds) return "-";
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      if (minutes > 0) {
        return `${minutes}dk ${secs}sn`;
      }
      return `${secs}sn`;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Intl.DateTimeFormat("tr-TR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(dateString));
    };
    const showQuestions = ref(false);
    const isQuestionNavigationOpen = ref(false);
    const showQuestionNavigation = computed(() => test.questions && test.questions.length > 0 && showQuestions.value);
    const currentQuestionId = ref(null);
    const questionNavItemRefs = ref(/* @__PURE__ */ new Map());
    const mobileQuestionNavScrollRef = ref(null);
    const desktopQuestionNavScrollRef = ref(null);
    const isLargeScreen = ref(false);
    let questionObserver = null;
    let scrollHandler = null;
    let isScrollingProgrammatically = false;
    const setQuestionNavItemRef = (el, questionId) => {
      if (el) {
        questionNavItemRefs.value.set(questionId, el);
      } else {
        questionNavItemRefs.value.delete(questionId);
      }
    };
    const toggleQuestionNavigation = () => {
      isQuestionNavigationOpen.value = !isQuestionNavigationOpen.value;
    };
    const scrollToQuestion = (questionId) => {
      if (!questionId) return;
      const element = document.getElementById(`question-${questionId}`);
      if (!element) return;
      const scrollContainer = element.closest(".overflow-y-auto");
      if (!scrollContainer) return;
      isScrollingProgrammatically = true;
      currentQuestionId.value = questionId;
      nextTick(() => {
        scrollToActiveQuestionNavItem();
      });
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      const elementOffsetTop = elementRect.top - containerRect.top + scrollTop;
      const headerOffset = 80;
      scrollContainer.scrollTo({
        top: elementOffsetTop - headerOffset,
        behavior: "smooth"
      });
      setTimeout(() => {
        isScrollingProgrammatically = false;
      }, 600);
      if (window.innerWidth < 1280) {
        isQuestionNavigationOpen.value = false;
      }
    };
    const scrollToActiveQuestionNavItem = () => {
      if (!currentQuestionId.value) return;
      const activeItem = questionNavItemRefs.value.get(currentQuestionId.value);
      if (!activeItem) return;
      const scrollContainer = window.innerWidth >= 1280 ? desktopQuestionNavScrollRef.value : mobileQuestionNavScrollRef.value;
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
    const setupActiveQuestionTracking = () => {
      if (!test.questions || test.questions.length === 0) return;
      const questionElements = test.questions.map((q) => document.getElementById(`question-${q.id}`)).filter(Boolean);
      if (questionElements.length === 0) return;
      const headerOffset = 80;
      const updateActiveQuestion = () => {
        if (isScrollingProgrammatically) return;
        let currentQuestion = null;
        let closestDistance = Infinity;
        questionElements.forEach((element) => {
          if (!element) return;
          const rect = element.getBoundingClientRect();
          const distanceFromTop = rect.top - headerOffset;
          if (rect.top <= headerOffset + 50 && rect.bottom > 0) {
            if (distanceFromTop <= 50 && Math.abs(distanceFromTop) < closestDistance) {
              closestDistance = Math.abs(distanceFromTop);
              const questionId = element.id.replace("question-", "");
              currentQuestion = questionId;
            }
          }
        });
        if (!currentQuestion) {
          questionElements.forEach((element) => {
            if (!element) return;
            const rect = element.getBoundingClientRect();
            if (rect.top < headerOffset + 200 && rect.bottom > 0) {
              const distance = Math.abs(rect.top - headerOffset);
              if (distance < closestDistance) {
                closestDistance = distance;
                const questionId = element.id.replace("question-", "");
                currentQuestion = questionId;
              }
            }
          });
        }
        if (currentQuestion && currentQuestionId.value !== currentQuestion) {
          currentQuestionId.value = currentQuestion;
        }
      };
      questionObserver = new IntersectionObserver(
        () => {
          if (!isScrollingProgrammatically) {
            updateActiveQuestion();
          }
        },
        {
          root: null,
          rootMargin: `-${headerOffset + 10}px 0px -60% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        }
      );
      questionElements.forEach((element) => {
        if (element) {
          questionObserver.observe(element);
        }
      });
      scrollHandler = () => {
        if (!isScrollingProgrammatically) {
          updateActiveQuestion();
        }
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
      updateActiveQuestion();
    };
    const initializeQuestionNavigationState = () => {
      const isLarge = window.innerWidth >= 1280;
      isLargeScreen.value = isLarge;
      if (isLarge && showQuestionNavigation.value) {
        isQuestionNavigationOpen.value = true;
      } else if (!isLarge) {
        isQuestionNavigationOpen.value = false;
      }
    };
    onMounted(() => {
      initializeQuestionNavigationState();
      nextTick(() => {
        if (showQuestionNavigation.value) {
          setupActiveQuestionTracking();
        }
      });
      const resizeHandler = () => {
        initializeQuestionNavigationState();
      };
      window.addEventListener("resize", resizeHandler);
    });
    onUnmounted(() => {
      if (questionObserver) {
        questionObserver.disconnect();
        questionObserver = null;
      }
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    });
    watch(currentQuestionId, (newId, oldId) => {
      if (newId && newId !== oldId && !isScrollingProgrammatically) {
        nextTick(() => {
          scrollToActiveQuestionNavItem();
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{
              "xl:-translate-x-[100px]": showQuestionNavigation.value && isQuestionNavigationOpen.value
            }, "max-w-full space-y-6 p-3 pt-6 transition-all duration-300 sm:p-6 sm:pt-12 lg:max-w-[920px] lg:pt-16"])}"${_scopeId}><div class="space-y-4 rounded-lg border border-border/70 bg-card p-4 sm:p-5"${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="min-w-0"${_scopeId}><p class="text-xs font-medium text-muted-foreground"${_scopeId}>Test</p><h1 class="mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl"${_scopeId}>${ssrInterpolate(unref(test).title)}</h1></div><div class="grid gap-2 sm:flex sm:shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/tests/${unref(test).slug}/take`,
              class: "inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Testi Çöz `);
                } else {
                  return [
                    createTextVNode(" Testi Çöz ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (unref(test).description) {
              _push2(`<div class="text-sm leading-6 text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(test).description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-wrap gap-4 text-sm text-muted-foreground"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(test).total_questions)} soru</span></div>`);
            if (unref(test).total_points) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(test).total_points)} puan</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(test).time_limit) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(test).time_limit)} dakika</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (unref(isAdmin)) {
              _push2(`<section class="space-y-3 rounded-lg border border-border/70 bg-card p-4 sm:p-5"${_scopeId}><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h2 class="text-base font-semibold text-foreground"${_scopeId}>Kişisel analiz</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Bu test için giriş yaptığın sonuçlara göre hesaplanır.</p></div>`);
              if (hasAnalysis.value && unref(testAnalysis).latest_result_id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/tests/result/${unref(testAnalysis).latest_result_id}`,
                  class: "inline-flex h-9 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Son sonucu aç `);
                    } else {
                      return [
                        createTextVNode(" Son sonucu aç ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (hasAnalysis.value) {
                _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-2 lg:grid-cols-5"${_scopeId}><!--[-->`);
                ssrRenderList(analysisStats.value, (item) => {
                  _push2(`<div class="rounded-md border border-border/70 bg-background p-3"${_scopeId}><p class="text-xl font-semibold text-foreground"${_scopeId}>${ssrInterpolate(item.value)}</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(item.label)}</p></div>`);
                });
                _push2(`<!--]--></div><div class="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"${_scopeId}><div class="rounded-md border border-border/70 bg-background p-3"${_scopeId}><div class="flex items-center justify-between gap-3"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>En çok zorlandığın sorular</h3><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(((_a = unref(testAnalysis).weak_questions) == null ? void 0 : _a.length) || 0)} kayıt</span></div>`);
                if ((_b = unref(testAnalysis).weak_questions) == null ? void 0 : _b.length) {
                  _push2(`<div class="mt-3 space-y-2"${_scopeId}><!--[-->`);
                  ssrRenderList(unref(testAnalysis).weak_questions, (question, index) => {
                    _push2(`<div class="rounded-md border border-border/60 bg-card p-3"${_scopeId}><div class="flex items-start justify-between gap-3"${_scopeId}><p class="min-w-0 text-sm font-medium leading-5 text-foreground"${_scopeId}>${ssrInterpolate(index + 1)}. ${ssrInterpolate(question.question_text)}</p><span class="shrink-0 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"${_scopeId}>${ssrInterpolate(question.wrong_count)} yanlış </span></div><p class="mt-2 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(question.attempts_count)} denemede %${ssrInterpolate(question.wrong_rate)} hata oranı </p></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<p class="mt-3 text-sm text-muted-foreground"${_scopeId}>Bu testte tekrar eden yanlış görünmüyor.</p>`);
                }
                _push2(`</div><div class="rounded-md border border-border/70 bg-background p-3"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Son denemeler</h3><div class="mt-3 space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(unref(testAnalysis).recent_attempts, (attempt) => {
                  _push2(ssrRenderComponent(unref(Link), {
                    key: attempt.id,
                    href: `/tests/result/${attempt.id}`,
                    class: "flex items-center justify-between gap-3 rounded-md border border-border/60 bg-card px-3 py-2 transition-colors hover:bg-accent"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="min-w-0"${_scopeId2}><p class="text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(formatScore(attempt.score))}</p><p class="mt-0.5 truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(formatDate(attempt.completed_at))}</p></div><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(attempt.correct_answers)}/${ssrInterpolate(attempt.total_questions)}</span>`);
                      } else {
                        return [
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(formatScore(attempt.score)), 1),
                            createVNode("p", { class: "mt-0.5 truncate text-xs text-muted-foreground" }, toDisplayString(formatDate(attempt.completed_at)), 1)
                          ]),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(attempt.correct_answers) + "/" + toDisplayString(attempt.total_questions), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div></div></div></div>`);
              } else {
                _push2(`<div class="rounded-md border border-dashed border-border bg-background p-4"${_scopeId}><p class="text-sm font-medium text-foreground"${_scopeId}>Henüz analiz yok</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId}> Giriş yapmış halde testi çözdükten sonra deneme sayısı, skor geçmişi ve zorlandığın sorular burada görünür. </p></div>`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(test).questions && unref(test).questions.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h2 class="text-xl font-semibold text-foreground"${_scopeId}>Sorular</h2>`);
              if (!showQuestions.value) {
                _push2(`<button class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"${_scopeId}> Soruları Göster </button>`);
              } else {
                _push2(`<button class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"${_scopeId}> Soruları Gizle </button>`);
              }
              _push2(`</div><div class="${ssrRenderClass([{ "pointer-events-none select-none blur-sm": !showQuestions.value }, "max-w-full space-y-6 lg:max-w-[800px]"])}"${_scopeId}><!--[-->`);
              ssrRenderList(unref(test).questions, (question, index) => {
                _push2(`<div${ssrRenderAttr("id", `question-${question.id}`)} class="scroll-mt-24 rounded-lg border border-border bg-card p-4"${_scopeId}><div class="mb-4"${_scopeId}><span class="text-sm font-medium text-muted-foreground"${_scopeId}>Soru ${ssrInterpolate(index + 1)}</span><p class="mt-2 whitespace-pre-wrap text-foreground"${_scopeId}>${ssrInterpolate(question.question_text)}</p></div><div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(question.options, (option, optIndex) => {
                  _push2(`<div class="${ssrRenderClass([option.is_correct ? "border-green-500 bg-green-50 dark:bg-green-950" : "", "flex items-center gap-2 rounded-md border border-border bg-background p-2"])}"${_scopeId}><span class="text-sm font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(String.fromCharCode(65 + optIndex))}.</span><span class="whitespace-pre-wrap text-sm text-foreground"${_scopeId}>${ssrInterpolate(option.option_text)}</span>`);
                  if (option.is_correct) {
                    _push2(`<span class="ml-auto text-xs font-medium text-green-600 dark:text-green-400"${_scopeId}> ✓ Doğru </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                if (question.explanation) {
                  _push2(`<div class="mt-3 rounded-md bg-muted p-2 text-sm text-muted-foreground"${_scopeId}><strong${_scopeId}>Açıklama:</strong> <span class="whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(question.explanation)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/tests",
              class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Geri Dön `);
                } else {
                  return [
                    createTextVNode(" Geri Dön ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (showQuestionNavigation.value) {
              _push2(`<button class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:hidden"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (showQuestionNavigation.value) {
              _push2(`<div class="${ssrRenderClass([{ "translate-x-full": !isQuestionNavigationOpen.value }, "fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"])}"${_scopeId}><div class="flex h-full flex-col"${_scopeId}><div class="flex items-center justify-between border-b border-border p-4"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>Sorular</h3><button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="flex-1 overflow-y-auto p-4"${_scopeId}><nav class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(unref(test).questions, (question, index) => {
                _push2(`<button class="${ssrRenderClass([[
                  currentQuestionId.value === question.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                ], "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors"])}"${_scopeId}><span class="font-medium"${_scopeId}>Soru ${ssrInterpolate(index + 1)}</span></button>`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showQuestionNavigation.value) {
              _push2(`<button class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:flex"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (showQuestionNavigation.value) {
              _push2(`<div class="${ssrRenderClass([isQuestionNavigationOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0", "fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block"])}"${_scopeId}><div class="rounded-lg border border-border bg-popover shadow-lg"${_scopeId}><div class="flex items-center justify-between border-b border-border p-3"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Sorular</h3><button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="overflow-y-auto p-3" style="${ssrRenderStyle({ "max-height": "calc(100vh - 220px)" })}"${_scopeId}><nav class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(unref(test).questions, (question, index) => {
                _push2(`<button class="${ssrRenderClass([[
                  currentQuestionId.value === question.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                ], "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors"])}"${_scopeId}><span class="font-medium"${_scopeId}>Soru ${ssrInterpolate(index + 1)}</span></button>`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showQuestionNavigation.value && isQuestionNavigationOpen.value) {
              _push2(`<div class="fixed inset-0 z-30 bg-black/20 xl:hidden"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ["max-w-full space-y-6 p-3 pt-6 transition-all duration-300 sm:p-6 sm:pt-12 lg:max-w-[920px] lg:pt-16", {
                  "xl:-translate-x-[100px]": showQuestionNavigation.value && isQuestionNavigationOpen.value
                }]
              }, [
                createVNode("div", { class: "space-y-4 rounded-lg border border-border/70 bg-card p-4 sm:p-5" }, [
                  createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Test"),
                      createVNode("h1", { class: "mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl" }, toDisplayString(unref(test).title), 1)
                    ]),
                    createVNode("div", { class: "grid gap-2 sm:flex sm:shrink-0" }, [
                      createVNode(unref(Link), {
                        href: `/tests/${unref(test).slug}/take`,
                        class: "inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Testi Çöz ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  unref(test).description ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-sm leading-6 text-muted-foreground"
                  }, toDisplayString(unref(test).description), 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "flex flex-wrap gap-4 text-sm text-muted-foreground" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(unref(test).total_questions) + " soru", 1)
                    ]),
                    unref(test).total_points ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(unref(test).total_points) + " puan", 1)
                    ])) : createCommentVNode("", true),
                    unref(test).time_limit ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(unref(test).time_limit) + " dakika", 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                unref(isAdmin) ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "space-y-3 rounded-lg border border-border/70 bg-card p-4 sm:p-5"
                }, [
                  createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-base font-semibold text-foreground" }, "Kişisel analiz"),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Bu test için giriş yaptığın sonuçlara göre hesaplanır.")
                    ]),
                    hasAnalysis.value && unref(testAnalysis).latest_result_id ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: `/tests/result/${unref(testAnalysis).latest_result_id}`,
                      class: "inline-flex h-9 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Son sonucu aç ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ]),
                  hasAnalysis.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-2 lg:grid-cols-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(analysisStats.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.label,
                          class: "rounded-md border border-border/70 bg-background p-3"
                        }, [
                          createVNode("p", { class: "text-xl font-semibold text-foreground" }, toDisplayString(item.value), 1),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(item.label), 1)
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" }, [
                      createVNode("div", { class: "rounded-md border border-border/70 bg-background p-3" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "En çok zorlandığın sorular"),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(((_c = unref(testAnalysis).weak_questions) == null ? void 0 : _c.length) || 0) + " kayıt", 1)
                        ]),
                        ((_d = unref(testAnalysis).weak_questions) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(testAnalysis).weak_questions, (question, index) => {
                            return openBlock(), createBlock("div", {
                              key: question.question_id,
                              class: "rounded-md border border-border/60 bg-card p-3"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                                createVNode("p", { class: "min-w-0 text-sm font-medium leading-5 text-foreground" }, toDisplayString(index + 1) + ". " + toDisplayString(question.question_text), 1),
                                createVNode("span", { class: "shrink-0 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300" }, toDisplayString(question.wrong_count) + " yanlış ", 1)
                              ]),
                              createVNode("p", { class: "mt-2 text-xs text-muted-foreground" }, toDisplayString(question.attempts_count) + " denemede %" + toDisplayString(question.wrong_rate) + " hata oranı ", 1)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-3 text-sm text-muted-foreground"
                        }, "Bu testte tekrar eden yanlış görünmüyor."))
                      ]),
                      createVNode("div", { class: "rounded-md border border-border/70 bg-background p-3" }, [
                        createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Son denemeler"),
                        createVNode("div", { class: "mt-3 space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(testAnalysis).recent_attempts, (attempt) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: attempt.id,
                              href: `/tests/result/${attempt.id}`,
                              class: "flex items-center justify-between gap-3 rounded-md border border-border/60 bg-card px-3 py-2 transition-colors hover:bg-accent"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(formatScore(attempt.score)), 1),
                                  createVNode("p", { class: "mt-0.5 truncate text-xs text-muted-foreground" }, toDisplayString(formatDate(attempt.completed_at)), 1)
                                ]),
                                createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(attempt.correct_answers) + "/" + toDisplayString(attempt.total_questions), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "rounded-md border border-dashed border-border bg-background p-4"
                  }, [
                    createVNode("p", { class: "text-sm font-medium text-foreground" }, "Henüz analiz yok"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Giriş yapmış halde testi çözdükten sonra deneme sayısı, skor geçmişi ve zorlandığın sorular burada görünür. ")
                  ]))
                ])) : createCommentVNode("", true),
                unref(test).questions && unref(test).questions.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-foreground" }, "Sorular"),
                    !showQuestions.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: ($event) => showQuestions.value = true,
                      class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    }, " Soruları Göster ", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: ($event) => showQuestions.value = false,
                      class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    }, " Soruları Gizle ", 8, ["onClick"]))
                  ]),
                  createVNode("div", {
                    class: ["max-w-full space-y-6 lg:max-w-[800px]", { "pointer-events-none select-none blur-sm": !showQuestions.value }]
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(test).questions, (question, index) => {
                      return openBlock(), createBlock("div", {
                        key: question.id,
                        id: `question-${question.id}`,
                        class: "scroll-mt-24 rounded-lg border border-border bg-card p-4"
                      }, [
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("span", { class: "text-sm font-medium text-muted-foreground" }, "Soru " + toDisplayString(index + 1), 1),
                          createVNode("p", { class: "mt-2 whitespace-pre-wrap text-foreground" }, toDisplayString(question.question_text), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(question.options, (option, optIndex) => {
                            return openBlock(), createBlock("div", {
                              key: option.id,
                              class: ["flex items-center gap-2 rounded-md border border-border bg-background p-2", option.is_correct ? "border-green-500 bg-green-50 dark:bg-green-950" : ""]
                            }, [
                              createVNode("span", { class: "text-sm font-medium text-muted-foreground" }, toDisplayString(String.fromCharCode(65 + optIndex)) + ".", 1),
                              createVNode("span", { class: "whitespace-pre-wrap text-sm text-foreground" }, toDisplayString(option.option_text), 1),
                              option.is_correct ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "ml-auto text-xs font-medium text-green-600 dark:text-green-400"
                              }, " ✓ Doğru ")) : createCommentVNode("", true)
                            ], 2);
                          }), 128))
                        ]),
                        question.explanation ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 rounded-md bg-muted p-2 text-sm text-muted-foreground"
                        }, [
                          createVNode("strong", null, "Açıklama:"),
                          createTextVNode(),
                          createVNode("span", { class: "whitespace-pre-wrap" }, toDisplayString(question.explanation), 1)
                        ])) : createCommentVNode("", true)
                      ], 8, ["id"]);
                    }), 128))
                  ], 2)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex gap-4" }, [
                  createVNode(unref(Link), {
                    href: "/tests",
                    class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Geri Dön ")
                    ]),
                    _: 1
                  })
                ])
              ], 2),
              showQuestionNavigation.value ? (openBlock(), createBlock("button", {
                key: 0,
                onClick: toggleQuestionNavigation,
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
              showQuestionNavigation.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: ["fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden", { "translate-x-full": !isQuestionNavigationOpen.value }]
              }, [
                createVNode("div", { class: "flex h-full flex-col" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border p-4" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "Sorular"),
                    createVNode("button", {
                      onClick: toggleQuestionNavigation,
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
                    ref_key: "mobileQuestionNavScrollRef",
                    ref: mobileQuestionNavScrollRef,
                    class: "flex-1 overflow-y-auto p-4"
                  }, [
                    createVNode("nav", { class: "space-y-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(test).questions, (question, index) => {
                        return openBlock(), createBlock("button", {
                          key: question.id,
                          ref_for: true,
                          ref: (el) => setQuestionNavItemRef(el, question.id),
                          onClick: ($event) => scrollToQuestion(question.id),
                          class: ["flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors", [
                            currentQuestionId.value === question.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          ]]
                        }, [
                          createVNode("span", { class: "font-medium" }, "Soru " + toDisplayString(index + 1), 1)
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ], 512)
                ])
              ], 2)) : createCommentVNode("", true),
              showQuestionNavigation.value ? (openBlock(), createBlock("button", {
                key: 2,
                onClick: toggleQuestionNavigation,
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
              showQuestionNavigation.value ? (openBlock(), createBlock("div", {
                key: 3,
                class: ["fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block", isQuestionNavigationOpen.value ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"]
              }, [
                createVNode("div", { class: "rounded-lg border border-border bg-popover shadow-lg" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border p-3" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Sorular"),
                    createVNode("button", {
                      onClick: toggleQuestionNavigation,
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
                    ref_key: "desktopQuestionNavScrollRef",
                    ref: desktopQuestionNavScrollRef,
                    class: "overflow-y-auto p-3",
                    style: { "max-height": "calc(100vh - 220px)" }
                  }, [
                    createVNode("nav", { class: "space-y-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(test).questions, (question, index) => {
                        return openBlock(), createBlock("button", {
                          key: question.id,
                          ref_for: true,
                          ref: (el) => setQuestionNavItemRef(el, question.id),
                          onClick: ($event) => scrollToQuestion(question.id),
                          class: ["flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors", [
                            currentQuestionId.value === question.id ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          ]]
                        }, [
                          createVNode("span", { class: "font-medium" }, "Soru " + toDisplayString(index + 1), 1)
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ], 512)
                ])
              ], 2)) : createCommentVNode("", true),
              showQuestionNavigation.value && isQuestionNavigationOpen.value ? (openBlock(), createBlock("div", {
                key: 4,
                onClick: toggleQuestionNavigation,
                class: "fixed inset-0 z-30 bg-black/20 xl:hidden"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
