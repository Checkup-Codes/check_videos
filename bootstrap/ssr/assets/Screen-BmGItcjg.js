import { ref, computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const result = props.result || {};
    const isGuest = props.isGuest || false;
    const copyButtonText = ref("Mesajı Kopyala");
    const resultAnswers = computed(() => {
      if (isGuest && result.answers) {
        return result.answers.map((answer, index) => ({
          id: `guest-answer-${index}`,
          question: answer.question,
          option: answer.option,
          is_correct: answer.is_correct
        }));
      }
      return result.answers || [];
    });
    const scoreColor = computed(() => {
      const score = result.score || 0;
      if (score >= 80) return "text-green-500";
      if (score >= 60) return "text-yellow-500";
      return "text-red-500";
    });
    const totalCircumference = computed(() => {
      return 2 * Math.PI * 56;
    });
    const scoreCircumference = computed(() => {
      const score = result.score || 0;
      return score / 100 * totalCircumference.value;
    });
    const getQuestionOptions = (question) => {
      if (!question || !question.options) return [];
      return question.options.sort((a, b) => (a.order || 0) - (b.order || 0));
    };
    const formatTime = (seconds) => {
      if (!seconds) return "";
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      if (minutes > 0) {
        return `${minutes} dakika ${secs} saniye`;
      }
      return `${secs} saniye`;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const canShare = computed(() => {
      return typeof navigator !== "undefined" && "share" in navigator;
    });
    const shareMessage = computed(() => {
      var _a, _b;
      const testTitle = ((_a = result.test) == null ? void 0 : _a.title) || "Test";
      const participantName = result.participant_name || "Ben";
      const score = Math.round(result.score || 0);
      const totalQuestions = result.total_questions || 0;
      const testSlug = (_b = result.test) == null ? void 0 : _b.slug;
      if (!testSlug) {
        return "";
      }
      const testUrl = window.location.origin + `/tests/${testSlug}/take`;
      return `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin? ${testUrl}`;
    });
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(shareMessage.value);
        copyButtonText.value = "Kopyalandı!";
        setTimeout(() => {
          copyButtonText.value = "Mesajı Kopyala";
        }, 2e3);
      } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = shareMessage.value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          copyButtonText.value = "Kopyalandı!";
          setTimeout(() => {
            copyButtonText.value = "Mesajı Kopyala";
          }, 2e3);
        } catch (err2) {
          console.error("Kopyalama hatası:", err2);
        }
        document.body.removeChild(textArea);
      }
    };
    const shareResult = async () => {
      var _a, _b;
      const testTitle = ((_a = result.test) == null ? void 0 : _a.title) || "Test";
      const participantName = result.participant_name || "Ben";
      const score = Math.round(result.score || 0);
      const totalQuestions = result.total_questions || 0;
      const testSlug = (_b = result.test) == null ? void 0 : _b.slug;
      if (!testSlug) {
        return;
      }
      const testUrl = window.location.origin + `/tests/${testSlug}/take`;
      const shareData = {
        title: `Test Sonucu: ${testTitle}`,
        text: `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin?`,
        url: testUrl
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Paylaşım hatası:", err);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl space-y-6 p-6"${_scopeId}><div class="space-y-4 rounded-lg border border-border bg-card p-6"${_scopeId}><div class="text-center"${_scopeId}><h1 class="mb-2 text-3xl font-bold text-foreground"${_scopeId}>Test Sonucu</h1><p class="text-muted-foreground"${_scopeId}>${ssrInterpolate((_a = unref(result).test) == null ? void 0 : _a.title)}</p></div><div class="flex justify-center"${_scopeId}><div class="relative h-32 w-32"${_scopeId}><svg class="h-32 w-32 -rotate-90 transform"${_scopeId}><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none" class="text-muted"${_scopeId}></circle><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none"${ssrRenderAttr("stroke-dasharray", `${scoreCircumference.value} ${totalCircumference.value}`)} class="${ssrRenderClass([scoreColor.value, "text-primary transition-all duration-500"])}"${_scopeId}></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center"${_scopeId}><span class="${ssrRenderClass([scoreColor.value, "text-3xl font-bold"])}"${_scopeId}>${ssrInterpolate(Math.round(unref(result).score))}</span><span class="text-xs text-muted-foreground"${_scopeId}>puan</span></div></div></div><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).correct_answers)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Doğru</div></div><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).total_questions - unref(result).correct_answers)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Yanlış</div></div><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).total_questions)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Toplam</div></div></div><div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"${_scopeId}>`);
            if (unref(result).time_taken) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(formatTime(unref(result).time_taken))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(result).completed_at) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(formatDate(unref(result).completed_at))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(isGuest)) {
              _push2(`<div class="border-t border-border pt-4"${_scopeId}><h3 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Sonucunu Paylaş</h3><div class="space-y-4"${_scopeId}><div class="rounded-md border border-input bg-background p-4"${_scopeId}><p class="mb-2 text-sm text-muted-foreground"${_scopeId}>Paylaşılabilir mesaj:</p><p class="whitespace-pre-wrap font-medium text-foreground" id="shareMessage"${_scopeId}>${ssrInterpolate(shareMessage.value)}</p></div><div class="flex gap-2"${_scopeId}><button class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(copyButtonText.value)}</button>`);
              if (canShare.value) {
                _push2(`<button class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg> Paylaş </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><h2 class="text-xl font-semibold text-foreground"${_scopeId}>Sorular ve Cevaplar</h2><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(resultAnswers.value, (answer, index) => {
              var _a2, _b2;
              _push2(`<div class="${ssrRenderClass([{
                "border-green-500 bg-green-50 dark:bg-green-950": answer.is_correct,
                "border-red-500 bg-red-50 dark:bg-red-950": !answer.is_correct
              }, "space-y-4 rounded-lg border border-border bg-card p-6"])}"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="mb-2 flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass([answer.is_correct ? "bg-green-500 text-white" : "bg-red-500 text-white", "rounded-md px-2 py-1 text-sm font-semibold"])}"${_scopeId}> Soru ${ssrInterpolate(index + 1)}</span>`);
              if (answer.is_correct) {
                _push2(`<span class="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Doğru </span>`);
              } else {
                _push2(`<span class="flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg> Yanlış </span>`);
              }
              _push2(`</div><p class="whitespace-pre-wrap text-lg font-medium text-foreground"${_scopeId}>${ssrInterpolate((_a2 = answer.question) == null ? void 0 : _a2.question_text)}</p></div></div><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(getQuestionOptions(answer.question), (option, optIndex) => {
                var _a3, _b3, _c2;
                _push2(`<div class="${ssrRenderClass([{
                  "border-green-500 bg-green-100 dark:bg-green-900": option.is_correct,
                  "border-red-500 bg-red-100 dark:bg-red-900": !option.is_correct && (answer.option_id === option.id || ((_a3 = answer.option) == null ? void 0 : _a3.id) === option.id),
                  "border-border bg-background": !option.is_correct && answer.option_id !== option.id && ((_b3 = answer.option) == null ? void 0 : _b3.id) !== option.id
                }, "flex items-start gap-3 rounded-lg border p-3"])}"${_scopeId}><span class="font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(String.fromCharCode(65 + optIndex))}.</span><span class="flex-1 whitespace-pre-wrap text-foreground"${_scopeId}>${ssrInterpolate(option.option_text)}</span><div class="flex gap-2"${_scopeId}>`);
                if (option.is_correct) {
                  _push2(`<span class="rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white"${_scopeId}> Doğru Cevap </span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (!option.is_correct && (answer.option_id === option.id || ((_c2 = answer.option) == null ? void 0 : _c2.id) === option.id)) {
                  _push2(`<span class="rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white"${_scopeId}> Sizin Cevabınız </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
              if ((_b2 = answer.question) == null ? void 0 : _b2.explanation) {
                _push2(`<div class="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950"${_scopeId}><div class="flex items-start gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><div${_scopeId}><p class="text-sm font-medium text-blue-900 dark:text-blue-100"${_scopeId}>Açıklama:</p><p class="mt-1 whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200"${_scopeId}>${ssrInterpolate(answer.question.explanation)}</p></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (!unref(isGuest)) {
              _push2(`<div class="flex gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/tests/${(_b = unref(result).test) == null ? void 0 : _b.slug}`,
                class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Teste Geri Dön `);
                  } else {
                    return [
                      createTextVNode(" Teste Geri Dön ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: "/tests",
                class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Diğer Testler `);
                  } else {
                    return [
                      createTextVNode(" Diğer Testler ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl space-y-6 p-6" }, [
                createVNode("div", { class: "space-y-4 rounded-lg border border-border bg-card p-6" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h1", { class: "mb-2 text-3xl font-bold text-foreground" }, "Test Sonucu"),
                    createVNode("p", { class: "text-muted-foreground" }, toDisplayString((_c = unref(result).test) == null ? void 0 : _c.title), 1)
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "relative h-32 w-32" }, [
                      (openBlock(), createBlock("svg", { class: "h-32 w-32 -rotate-90 transform" }, [
                        createVNode("circle", {
                          cx: "64",
                          cy: "64",
                          r: "56",
                          stroke: "currentColor",
                          "stroke-width": "8",
                          fill: "none",
                          class: "text-muted"
                        }),
                        createVNode("circle", {
                          cx: "64",
                          cy: "64",
                          r: "56",
                          stroke: "currentColor",
                          "stroke-width": "8",
                          fill: "none",
                          "stroke-dasharray": `${scoreCircumference.value} ${totalCircumference.value}`,
                          class: ["text-primary transition-all duration-500", scoreColor.value]
                        }, null, 10, ["stroke-dasharray"])
                      ])),
                      createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center" }, [
                        createVNode("span", {
                          class: ["text-3xl font-bold", scoreColor.value]
                        }, toDisplayString(Math.round(unref(result).score)), 3),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, "puan")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).correct_answers), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Doğru")
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).total_questions - unref(result).correct_answers), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Yanlış")
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).total_questions), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Toplam")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap justify-center gap-4 text-sm text-muted-foreground" }, [
                    unref(result).time_taken ? (openBlock(), createBlock("div", {
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
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(formatTime(unref(result).time_taken)), 1)
                    ])) : createCommentVNode("", true),
                    unref(result).completed_at ? (openBlock(), createBlock("div", {
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
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(formatDate(unref(result).completed_at)), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  unref(isGuest) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-t border-border pt-4"
                  }, [
                    createVNode("h3", { class: "mb-4 text-lg font-semibold text-foreground" }, "Sonucunu Paylaş"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "rounded-md border border-input bg-background p-4" }, [
                        createVNode("p", { class: "mb-2 text-sm text-muted-foreground" }, "Paylaşılabilir mesaj:"),
                        createVNode("p", {
                          class: "whitespace-pre-wrap font-medium text-foreground",
                          id: "shareMessage"
                        }, toDisplayString(shareMessage.value), 1)
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("button", {
                          onClick: copyToClipboard,
                          class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
                              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(copyButtonText.value), 1)
                        ]),
                        canShare.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: shareResult,
                          class: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
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
                              d: "M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ])),
                          createTextVNode(" Paylaş ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h2", { class: "text-xl font-semibold text-foreground" }, "Sorular ve Cevaplar"),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(resultAnswers.value, (answer, index) => {
                      var _a2, _b2;
                      return openBlock(), createBlock("div", {
                        key: answer.id || index,
                        class: ["space-y-4 rounded-lg border border-border bg-card p-6", {
                          "border-green-500 bg-green-50 dark:bg-green-950": answer.is_correct,
                          "border-red-500 bg-red-50 dark:bg-red-950": !answer.is_correct
                        }]
                      }, [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                              createVNode("span", {
                                class: ["rounded-md px-2 py-1 text-sm font-semibold", answer.is_correct ? "bg-green-500 text-white" : "bg-red-500 text-white"]
                              }, " Soru " + toDisplayString(index + 1), 3),
                              answer.is_correct ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"
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
                                    d: "M5 13l4 4L19 7"
                                  })
                                ])),
                                createTextVNode(" Doğru ")
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400"
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
                                    d: "M6 18L18 6M6 6l12 12"
                                  })
                                ])),
                                createTextVNode(" Yanlış ")
                              ]))
                            ]),
                            createVNode("p", { class: "whitespace-pre-wrap text-lg font-medium text-foreground" }, toDisplayString((_a2 = answer.question) == null ? void 0 : _a2.question_text), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(getQuestionOptions(answer.question), (option, optIndex) => {
                            var _a3, _b3, _c2;
                            return openBlock(), createBlock("div", {
                              key: option.id,
                              class: ["flex items-start gap-3 rounded-lg border p-3", {
                                "border-green-500 bg-green-100 dark:bg-green-900": option.is_correct,
                                "border-red-500 bg-red-100 dark:bg-red-900": !option.is_correct && (answer.option_id === option.id || ((_a3 = answer.option) == null ? void 0 : _a3.id) === option.id),
                                "border-border bg-background": !option.is_correct && answer.option_id !== option.id && ((_b3 = answer.option) == null ? void 0 : _b3.id) !== option.id
                              }]
                            }, [
                              createVNode("span", { class: "font-medium text-muted-foreground" }, toDisplayString(String.fromCharCode(65 + optIndex)) + ".", 1),
                              createVNode("span", { class: "flex-1 whitespace-pre-wrap text-foreground" }, toDisplayString(option.option_text), 1),
                              createVNode("div", { class: "flex gap-2" }, [
                                option.is_correct ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white"
                                }, " Doğru Cevap ")) : createCommentVNode("", true),
                                !option.is_correct && (answer.option_id === option.id || ((_c2 = answer.option) == null ? void 0 : _c2.id) === option.id) ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white"
                                }, " Sizin Cevabınız ")) : createCommentVNode("", true)
                              ])
                            ], 2);
                          }), 128))
                        ]),
                        ((_b2 = answer.question) == null ? void 0 : _b2.explanation) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950"
                        }, [
                          createVNode("div", { class: "flex items-start gap-2" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-medium text-blue-900 dark:text-blue-100" }, "Açıklama:"),
                              createVNode("p", { class: "mt-1 whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200" }, toDisplayString(answer.question.explanation), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ], 2);
                    }), 128))
                  ])
                ]),
                !unref(isGuest) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex gap-4"
                }, [
                  createVNode(unref(Link), {
                    href: `/tests/${(_d = unref(result).test) == null ? void 0 : _d.slug}`,
                    class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Teste Geri Dön ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: "/tests",
                    class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Diğer Testler ")
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Result/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
