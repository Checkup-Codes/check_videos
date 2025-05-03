import { ref, computed, onMounted, nextTick, withCtx, unref, createVNode, createBlock, toDisplayString, createCommentVNode, openBlock, withModifiers, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ExcalidrawComponent-CyjlPrja.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
/* empty css                             */
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    props.auth;
    const contentRef = ref(null);
    const showDraw = ref(false);
    const processedContent = computed(() => {
      if (!write.value.content) return "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(write.value.content, "text/html");
      const images = doc.querySelectorAll("img");
      images.forEach((img, index) => {
        const imageId = `content-img-${index}`;
        img.id = imageId;
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        img.setAttribute("importance", "low");
        if (!img.hasAttribute("width") && !img.hasAttribute("height")) {
          img.setAttribute("width", "800");
          img.setAttribute("height", "600");
        }
        const skeletonWrapper = doc.createElement("div");
        skeletonWrapper.className = "img-skeleton-wrapper relative";
        skeletonWrapper.style.width = "100%";
        skeletonWrapper.style.marginBottom = "1rem";
        skeletonWrapper.style.marginTop = "1rem";
        const skeleton = doc.createElement("div");
        skeleton.className = "skeleton img-skeleton absolute inset-0 h-full w-full rounded-lg";
        skeleton.id = `skeleton-${imageId}`;
        const imgParent = img.parentNode;
        if (imgParent) {
          const imgWrapper = doc.createElement("div");
          imgWrapper.className = "img-wrapper relative";
          imgWrapper.style.width = "100%";
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease-in-out";
          img.setAttribute(
            "onload",
            `
        this.style.opacity = '1';
        const skeleton = document.getElementById('skeleton-${imageId}');
        if (skeleton) skeleton.style.display = 'none';
      `
          );
          img.setAttribute(
            "onerror",
            `
        const skeleton = document.getElementById('skeleton-${imageId}');
        if (skeleton) {
          skeleton.style.display = 'none';
          skeleton.insertAdjacentHTML('afterend', '<div class="text-error text-sm py-2">Görsel yüklenemedi</div>');
        }
        this.style.display = 'none';
      `
          );
          const imgClone = img.cloneNode(true);
          imgWrapper.appendChild(imgClone);
          skeletonWrapper.appendChild(skeleton);
          skeletonWrapper.appendChild(imgWrapper);
          try {
            imgParent.insertBefore(skeletonWrapper, img);
            imgParent.removeChild(img);
          } catch (error) {
            console.error("DOM manipülasyon hatası:", error);
          }
        }
      });
      return doc.body.innerHTML;
    });
    onMounted(() => {
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
    });
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
        router.delete(route("writes.destroy", id));
      }
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("tr-TR", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card dark:bg-base-100 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700"${_scopeId}><div class="card-body p-6"${_scopeId}><div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="mb-3 w-full sm:mb-0"${_scopeId}><h1 class="break-words text-2xl font-bold"${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mt-2"${_scopeId}>`);
            if (write.value.category) {
              _push2(`<span class="badge badge-secondary"${_scopeId}>${ssrInterpolate(write.value.category.name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-2 flex flex-shrink-0 gap-2 sm:mt-0"${_scopeId}><button class="${ssrRenderClass(["btn", showDraw.value ? "btn-primary" : "btn-ghost", "btn-sm"])}"${_scopeId}>${ssrInterpolate(showDraw.value ? "Metni Göster" : "Çizim Göster")}</button>`);
            if (unref(props).auth.user) {
              _push2(`<div class="dropdown dropdown-end"${_scopeId}><button class="btn btn-ghost btn-sm dropdown-toggle"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"${_scopeId}></path></svg></button><ul class="dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow"${_scopeId}><li${_scopeId}><a${ssrRenderAttr("href", _ctx.route("writes.edit", write.value.id))}${_scopeId}>Düzenle</a></li><li${_scopeId}><a href="#" class="text-error"${_scopeId}>Sil</a></li></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="divider my-2"${_scopeId}></div>`);
            if (showDraw.value) {
              _push2(`<div class="min-h-[500px]"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { write: write.value }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="content-container"${_scopeId}>`);
              if (write.value.summary) {
                _push2(`<div class="alert alert-info mb-6"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(write.value.summary)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="article-content ql-editor"${_scopeId}>${processedContent.value ?? ""}</div></div>`);
            }
            _push2(`<div class="text-base-content/70 mt-6 flex flex-col space-y-2 p-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:space-y-0"${_scopeId}><div${_scopeId}>Oluşturma: ${ssrInterpolate(formatDate(write.value.created_at))}</div><div class="flex flex-wrap items-center gap-2"${_scopeId}><span class="flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg> ${ssrInterpolate(write.value.views_count)} görüntüleme </span>`);
            if (write.value.updated_at !== write.value.created_at) {
              _push2(`<span class="whitespace-nowrap"${_scopeId}> Son güncelleme: ${ssrInterpolate(formatDate(write.value.updated_at))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "card dark:bg-base-100 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("div", { class: "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "mb-3 w-full sm:mb-0" }, [
                      createVNode("h1", { class: "break-words text-2xl font-bold" }, toDisplayString(write.value.title), 1),
                      createVNode("div", { class: "mt-2" }, [
                        write.value.category ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "badge badge-secondary"
                        }, toDisplayString(write.value.category.name), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "mt-2 flex flex-shrink-0 gap-2 sm:mt-0" }, [
                      createVNode("button", {
                        onClick: toggleContent,
                        class: ["btn", showDraw.value ? "btn-primary" : "btn-ghost", "btn-sm"]
                      }, toDisplayString(showDraw.value ? "Metni Göster" : "Çizim Göster"), 3),
                      unref(props).auth.user ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "dropdown dropdown-end"
                      }, [
                        createVNode("button", { class: "btn btn-ghost btn-sm dropdown-toggle" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" })
                          ]))
                        ]),
                        createVNode("ul", { class: "dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow" }, [
                          createVNode("li", null, [
                            createVNode("a", {
                              href: _ctx.route("writes.edit", write.value.id)
                            }, "Düzenle", 8, ["href"])
                          ]),
                          createVNode("li", null, [
                            createVNode("a", {
                              href: "#",
                              class: "text-error",
                              onClick: withModifiers(($event) => deleteWrite(write.value.id), ["prevent"])
                            }, "Sil", 8, ["onClick"])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "divider my-2" }),
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
                      class: "alert alert-info mb-6"
                    }, [
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
                      createVNode("span", null, toDisplayString(write.value.summary), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "article-content ql-editor",
                      ref_key: "contentRef",
                      ref: contentRef,
                      innerHTML: processedContent.value
                    }, null, 8, ["innerHTML"])
                  ])),
                  createVNode("div", { class: "text-base-content/70 mt-6 flex flex-col space-y-2 p-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:space-y-0" }, [
                    createVNode("div", null, "Oluşturma: " + toDisplayString(formatDate(write.value.created_at)), 1),
                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          class: "h-4 w-4"
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
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
