import { ref, computed, onMounted, nextTick, withCtx, unref, createBlock, openBlock, createVNode, createCommentVNode, Fragment, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ExcalidrawComponent-BnIBvce5.js";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import { _ as _export_sfc } from "../app.js";
import { u as useGsapFadeIn } from "./useGsapAnimation-Bs-5qlag.js";
import { u as useProcessedQuillContent } from "./useProcessedQuillContent-D5H4f-K3.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowWriteScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    gsap.registerPlugin(ScrollTrigger);
    const { props } = usePage();
    const write = ref(props.write || {});
    const auth = props.auth;
    const contentRef = ref(null);
    const showDraw = ref(false);
    const isLoading = ref(true);
    const processedContent = useProcessedQuillContent(
      contentRef,
      computed(() => write.value.content)
    );
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
    };
    const deleteWrite = async (id) => {
      if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) {
        return;
      }
      try {
        await router.delete(route("writes.destroy", { write: id }));
      } catch (error) {
        console.error("Error deleting write:", error);
      }
    };
    const animateSkeleton = () => {
      const skeletons = document.querySelectorAll(".skeleton");
      gsap.to(skeletons, {
        opacity: 0.5,
        duration: 0.8,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    };
    onMounted(() => {
      animateSkeleton();
      setTimeout(() => {
        isLoading.value = false;
        useGsapFadeIn(contentRef, { duration: 0.8 });
      }, 800);
      nextTick(() => {
        const writeListElement = document.querySelector(".write-list-container");
        if (writeListElement) {
          const savedScrollTop = localStorage.getItem("writeListScrollPosition");
          if (savedScrollTop) {
            writeListElement.scrollTop = parseInt(savedScrollTop, 10);
          }
        }
      });
    });
    router.on("before", () => {
      const writeListElement = document.querySelector(".write-list-container");
      if (writeListElement) {
        localStorage.setItem("writeListScrollPosition", writeListElement.scrollTop.toString());
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200" data-v-6608f3cc${_scopeId}><div class="card-body p-4 sm:p-6" data-v-6608f3cc${_scopeId}><div class="mb-2 sm:mb-4" data-v-6608f3cc${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<div class="skeleton-wrapper" data-v-6608f3cc${_scopeId}><div class="skeleton h-8 w-3/4 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="mt-2" data-v-6608f3cc${_scopeId}><div class="skeleton h-4 w-24 rounded-lg" data-v-6608f3cc${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!--[--><h1 class="break-words text-xl font-bold sm:text-2xl" data-v-6608f3cc${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mt-2" data-v-6608f3cc${_scopeId}>`);
              if (write.value.category) {
                _push2(`<span class="badge badge-outline text-xs" data-v-6608f3cc${_scopeId}>${ssrInterpolate(write.value.category.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div><div class="sticky" data-v-6608f3cc${_scopeId}><div class="flex items-center justify-between" data-v-6608f3cc${_scopeId}>`);
            if (!isLoading.value) {
              _push2(`<button class="${ssrRenderClass([showDraw.value ? "btn-primary" : "btn-outline", "btn btn-sm grow-0 sm:grow-0"])}" data-v-6608f3cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-6608f3cc${_scopeId}>`);
              if (showDraw.value) {
                _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-6608f3cc${_scopeId}></path>`);
              } else {
                _push2(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6608f3cc${_scopeId}></path>`);
              }
              _push2(`</svg> ${ssrInterpolate(showDraw.value ? "Metni Göster" : "Çizimi Göster")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth).user && !isLoading.value) {
              _push2(`<div class="flex gap-2" data-v-6608f3cc${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("writes.edit", write.value.id),
                class: "btn btn-ghost btn-sm text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-6608f3cc${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-6608f3cc${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-1 h-4 w-4"
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
              _push2(`<button class="btn btn-ghost btn-sm text-xs text-error" data-v-6608f3cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-6608f3cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-6608f3cc${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider my-1" data-v-6608f3cc${_scopeId}></div>`);
            if (isLoading.value) {
              _push2(`<div class="skeleton-wrapper space-y-4" data-v-6608f3cc${_scopeId}><div class="skeleton h-4 w-full rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-4/6 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-full rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-3/4 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-5/6 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-32 w-full rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-2/3 rounded-lg" data-v-6608f3cc${_scopeId}></div><div class="skeleton h-4 w-full rounded-lg" data-v-6608f3cc${_scopeId}></div></div>`);
            } else {
              _push2(`<div data-v-6608f3cc${_scopeId}>`);
              if (showDraw.value) {
                _push2(`<div class="min-h-[500px]" data-v-6608f3cc${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, { write: write.value }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div class="content-container" data-v-6608f3cc${_scopeId}>`);
                if (write.value.summary) {
                  _push2(`<div class="alert alert-info mb-4 px-3 py-2 text-sm sm:mb-6 sm:p-4" data-v-6608f3cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 stroke-current" data-v-6608f3cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6608f3cc${_scopeId}></path></svg><span data-v-6608f3cc${_scopeId}>${ssrInterpolate(write.value.summary)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="article-content ql-editor" data-v-6608f3cc${_scopeId}>${unref(processedContent) ?? ""}</div></div>`);
              }
              _push2(`</div>`);
            }
            if (!isLoading.value) {
              _push2(`<div class="text-base-content/70 mt-4 flex flex-col space-y-2 p-2 text-xs sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-3 sm:text-sm" data-v-6608f3cc${_scopeId}><div data-v-6608f3cc${_scopeId}>Oluşturma: ${ssrInterpolate(formatDate(write.value.created_at))}</div><div class="flex flex-wrap items-center gap-2" data-v-6608f3cc${_scopeId}><span class="flex items-center gap-1" data-v-6608f3cc${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5 sm:h-4 sm:w-4" data-v-6608f3cc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-6608f3cc${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-6608f3cc${_scopeId}></path></svg> ${ssrInterpolate(write.value.views_count)} görüntüleme </span>`);
              if (write.value.updated_at !== write.value.created_at) {
                _push2(`<span class="whitespace-nowrap" data-v-6608f3cc${_scopeId}> Son güncelleme: ${ssrInterpolate(formatDate(write.value.updated_at))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "card border border-base-200 bg-base-100 shadow-md transition-all duration-200" }, [
                createVNode("div", { class: "card-body p-4 sm:p-6" }, [
                  createVNode("div", { class: "mb-2 sm:mb-4" }, [
                    isLoading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "skeleton-wrapper"
                    }, [
                      createVNode("div", { class: "skeleton h-8 w-3/4 rounded-lg" }),
                      createVNode("div", { class: "mt-2" }, [
                        createVNode("div", { class: "skeleton h-4 w-24 rounded-lg" })
                      ])
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("h1", { class: "break-words text-xl font-bold sm:text-2xl" }, toDisplayString(write.value.title), 1),
                      createVNode("div", { class: "mt-2" }, [
                        write.value.category ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "badge badge-outline text-xs"
                        }, toDisplayString(write.value.category.name), 1)) : createCommentVNode("", true)
                      ])
                    ], 64))
                  ]),
                  createVNode("div", { class: "sticky" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      !isLoading.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: toggleContent,
                        class: ["btn btn-sm grow-0 sm:grow-0", showDraw.value ? "btn-primary" : "btn-outline"]
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-4 w-4"
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
                      ], 2)) : createCommentVNode("", true),
                      unref(auth).user && !isLoading.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex gap-2"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("writes.edit", write.value.id),
                          class: "btn btn-ghost btn-sm text-xs"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "mr-1 h-4 w-4"
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
                          class: "btn btn-ghost btn-sm text-xs text-error"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "mr-1 h-4 w-4"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            })
                          ]))
                        ], 8, ["onClick"])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "divider my-1" }),
                  isLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "skeleton-wrapper space-y-4"
                  }, [
                    createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-5/6 rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-4/6 rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-full rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-3/4 rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-5/6 rounded-lg" }),
                    createVNode("div", { class: "skeleton h-32 w-full rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-2/3 rounded-lg" }),
                    createVNode("div", { class: "skeleton h-4 w-full rounded-lg" })
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    showDraw.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "min-h-[500px]"
                    }, [
                      createVNode(_sfc_main$2, { write: write.value }, null, 8, ["write"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "content-container"
                    }, [
                      write.value.summary ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "alert alert-info mb-4 px-3 py-2 text-sm sm:mb-6 sm:p-4"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0 stroke-current"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, toDisplayString(write.value.summary), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", {
                        class: "article-content ql-editor",
                        ref_key: "contentRef",
                        ref: contentRef,
                        innerHTML: unref(processedContent)
                      }, null, 8, ["innerHTML"])
                    ]))
                  ])),
                  !isLoading.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-base-content/70 mt-4 flex flex-col space-y-2 p-2 text-xs sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-3 sm:text-sm"
                  }, [
                    createVNode("div", null, "Oluşturma: " + toDisplayString(formatDate(write.value.created_at)), 1),
                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          class: "h-3.5 w-3.5 sm:h-4 sm:w-4"
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
                        ])),
                        createTextVNode(" " + toDisplayString(write.value.views_count) + " görüntüleme ", 1)
                      ]),
                      write.value.updated_at !== write.value.created_at ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "whitespace-nowrap"
                      }, " Son güncelleme: " + toDisplayString(formatDate(write.value.updated_at)), 1)) : createCommentVNode("", true)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6608f3cc"]]);
export {
  Screen as default
};
