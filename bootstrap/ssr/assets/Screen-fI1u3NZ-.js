import { ref, computed, onMounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import "./GoBackButton-u55EQwn1.js";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const itemsPerPage = 10;
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const category = ref(props.category || {});
    const writes = ref(props.writes || []);
    const auth = props.auth;
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const currentPage = ref(1);
    const filteredWrites = computed(() => {
      if (auth.user) {
        return writes.value;
      } else {
        return writes.value.filter((write) => write.status === "published");
      }
    });
    const paginatedWrites = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredWrites.value.slice(start, end);
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredWrites.value.length / itemsPerPage);
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    computed(() => {
      return category.value.status === "public" ? "Açık" : "Gizli";
    });
    const editCategory = () => {
      router.visit(route("categories.edit", { category: category.value.id }));
    };
    const getStatusText = (status) => {
      const statusMap = {
        published: "Yayında",
        draft: "Taslak",
        private: "Gizli",
        link_only: "Dış Bağlantı"
      };
      return statusMap[status] || status;
    };
    const deleteWrite = (write) => {
      if (confirm(`"${write.title}" yazısını silmek istediğinizden emin misiniz?`)) {
        router.delete(route("writes.destroy", write.id), {
          preserveScroll: true,
          onSuccess: () => {
            const index = writes.value.findIndex((w) => w.id === write.id);
            if (index > -1) {
              writes.value.splice(index, 1);
            }
          },
          onError: (errors) => {
            console.error("Yazı silinirken hata oluştu:", errors);
            alert("Yazı silinirken bir hata oluştu.");
          }
        });
      }
    };
    const truncateSummary = (summary) => {
      if (!summary) return "Açıklama bulunmamaktadır.";
      if (summary.includes("<") && summary.includes(">")) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = summary;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        return plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;
      }
      return summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    };
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6" data-v-d993781b${_scopeId}><div class="mb-6 flex items-center justify-between" data-v-d993781b${_scopeId}><div class="flex-1" data-v-d993781b${_scopeId}><h1 class="text-xl font-bold sm:text-2xl" data-v-d993781b${_scopeId}>${ssrInterpolate(category.value.name)} <span class="badge badge-outline ml-2" data-v-d993781b${_scopeId}>${ssrInterpolate(category.value.writes_count || writes.value.length)} yazı</span>`);
            if (category.value.status === "private") {
              _push2(`<span class="badge badge-warning ml-2" data-v-d993781b${_scopeId}>Gizli</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</h1>`);
            if (category.value.description) {
              _push2(`<p class="mt-2 text-sm text-gray-600" data-v-d993781b${_scopeId}>${ssrInterpolate(category.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(auth).user) {
              _push2(`<div class="flex gap-2" data-v-d993781b${_scopeId}><button class="btn btn-outline btn-sm" title="Kategoriyi Düzenle" data-v-d993781b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-d993781b${_scopeId}></path></svg> Düzenle </button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("writes.create", { category: category.value.id }),
                class: "btn btn-primary btn-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-d993781b${_scopeId2}></path></svg> Yeni Yazı `);
                  } else {
                    return [
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
                          d: "M12 4v16m8-8H4"
                        })
                      ])),
                      createTextVNode(" Yeni Yazı ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="divider my-2" data-v-d993781b${_scopeId}></div><div class="space-y-4" data-v-d993781b${_scopeId}><!--[-->`);
            ssrRenderList(paginatedWrites.value, (write) => {
              _push2(`<div class="card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md" data-v-d993781b${_scopeId}><div class="card-body p-4" data-v-d993781b${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-center" data-v-d993781b${_scopeId}>`);
              if (write.cover_image) {
                _push2(`<div class="flex-shrink-0" data-v-d993781b${_scopeId}><img${ssrRenderAttr("src", write.cover_image)} alt="Kapak Resmi" class="h-20 w-20 rounded-lg object-cover sm:h-16 sm:w-24" loading="lazy"${ssrRenderAttr("srcset", `${write.cover_image} 1x, ${write.cover_image} 2x`)} data-v-d993781b${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="min-w-0 flex-1" data-v-d993781b${_scopeId}><div class="flex items-start justify-between" data-v-d993781b${_scopeId}><div class="min-w-0 flex-1" data-v-d993781b${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.showByCategory", {
                  category: category.value.slug,
                  slug: write.slug
                }),
                class: "hover:text-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="mb-2 flex items-center gap-2" data-v-d993781b${_scopeId2}>`);
                    if (write.status === "link_only") {
                      _push3(`<span class="text-primary" title="Dış Bağlantı" data-v-d993781b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-d993781b${_scopeId2}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-d993781b${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (write.status === "private") {
                      _push3(`<span class="text-warning" title="Gizli Yazı" data-v-d993781b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-d993781b${_scopeId2}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-d993781b${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (write.status === "draft") {
                      _push3(`<span class="text-gray-500" title="Taslak" data-v-d993781b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-d993781b${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<h3 class="truncate text-lg font-semibold" data-v-d993781b${_scopeId2}>${ssrInterpolate(write.title)}</h3></div><p class="mb-2 line-clamp-2 text-sm text-gray-600" data-v-d993781b${_scopeId2}>${ssrInterpolate(truncateSummary(write.meta_description || write.summary))}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                        write.status === "link_only" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-primary",
                          title: "Dış Bağlantı"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        write.status === "private" ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-warning",
                          title: "Gizli Yazı"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        write.status === "draft" ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: "text-gray-500",
                          title: "Taslak"
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
                              d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        createVNode("h3", { class: "truncate text-lg font-semibold" }, toDisplayString(write.title), 1)
                      ]),
                      createVNode("p", { class: "mb-2 line-clamp-2 text-sm text-gray-600" }, toDisplayString(truncateSummary(write.meta_description || write.summary)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="flex flex-wrap items-center gap-3 text-xs text-gray-500" data-v-d993781b${_scopeId}><span class="flex items-center gap-1" data-v-d993781b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-d993781b${_scopeId}></path></svg> ${ssrInterpolate(formatDate(write.published_at || write.created_at))}</span>`);
              if (write.reading_time) {
                _push2(`<span class="flex items-center gap-1" data-v-d993781b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d993781b${_scopeId}></path></svg> ${ssrInterpolate(write.reading_time)} dk okuma </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="badge badge-outline badge-xs" data-v-d993781b${_scopeId}>${ssrInterpolate(getStatusText(write.status))}</span></div></div>`);
              if (unref(auth).user) {
                _push2(`<div class="ml-4 flex flex-col gap-1" data-v-d993781b${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("writes.edit", write.id),
                  class: "btn btn-ghost btn-xs",
                  title: "Yazıyı Düzenle"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-d993781b${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="btn btn-ghost btn-xs text-error" title="Yazıyı Sil" data-v-d993781b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d993781b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d993781b${_scopeId}></path></svg></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (totalPages.value > 1) {
              _push2(`<div class="mt-6 flex justify-center" data-v-d993781b${_scopeId}><div class="join" data-v-d993781b${_scopeId}><!--[-->`);
              ssrRenderList(totalPages.value, (page) => {
                _push2(`<button class="${ssrRenderClass(["btn btn-sm join-item", currentPage.value === page ? "btn-primary" : "btn-outline"])}" data-v-d993781b${_scopeId}>${ssrInterpolate(page)}</button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (filteredWrites.value.length === 0) {
              _push2(`<div class="alert alert-info mt-6" data-v-d993781b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-d993781b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d993781b${_scopeId}></path></svg><span data-v-d993781b${_scopeId}>Bu kategoriye ait ${ssrInterpolate(unref(auth).user ? "yazı" : "yayınlanmış yazı")} bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "text-xl font-bold sm:text-2xl" }, [
                      createTextVNode(toDisplayString(category.value.name) + " ", 1),
                      createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(category.value.writes_count || writes.value.length) + " yazı", 1),
                      category.value.status === "private" ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "badge badge-warning ml-2"
                      }, "Gizli")) : createCommentVNode("", true)
                    ]),
                    category.value.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-2 text-sm text-gray-600"
                    }, toDisplayString(category.value.description), 1)) : createCommentVNode("", true)
                  ]),
                  unref(auth).user ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex gap-2"
                  }, [
                    createVNode("button", {
                      onClick: editCategory,
                      class: "btn btn-outline btn-sm",
                      title: "Kategoriyi Düzenle"
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
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ])),
                      createTextVNode(" Düzenle ")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("writes.create", { category: category.value.id }),
                      class: "btn btn-primary btn-sm"
                    }, {
                      default: withCtx(() => [
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
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Yeni Yazı ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "divider my-2" }),
                createVNode("div", { class: "space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(paginatedWrites.value, (write) => {
                    return openBlock(), createBlock("div", {
                      key: write.id,
                      class: "card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md"
                    }, [
                      createVNode("div", { class: "card-body p-4" }, [
                        createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center" }, [
                          write.cover_image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex-shrink-0"
                          }, [
                            createVNode("img", {
                              src: write.cover_image,
                              alt: "Kapak Resmi",
                              class: "h-20 w-20 rounded-lg object-cover sm:h-16 sm:w-24",
                              loading: "lazy",
                              srcset: `${write.cover_image} 1x, ${write.cover_image} 2x`
                            }, null, 8, ["src", "srcset"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("div", { class: "flex items-start justify-between" }, [
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("categories.showByCategory", {
                                    category: category.value.slug,
                                    slug: write.slug
                                  }),
                                  class: "hover:text-primary"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                                      write.status === "link_only" ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-primary",
                                        title: "Dış Bağlantı"
                                      }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-4 w-4",
                                          viewBox: "0 0 20 20",
                                          fill: "currentColor"
                                        }, [
                                          createVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                                            "clip-rule": "evenodd"
                                          })
                                        ]))
                                      ])) : createCommentVNode("", true),
                                      write.status === "private" ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-warning",
                                        title: "Gizli Yazı"
                                      }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-4 w-4",
                                          viewBox: "0 0 20 20",
                                          fill: "currentColor"
                                        }, [
                                          createVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                            "clip-rule": "evenodd"
                                          })
                                        ]))
                                      ])) : createCommentVNode("", true),
                                      write.status === "draft" ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: "text-gray-500",
                                        title: "Taslak"
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
                                            d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                          })
                                        ]))
                                      ])) : createCommentVNode("", true),
                                      createVNode("h3", { class: "truncate text-lg font-semibold" }, toDisplayString(write.title), 1)
                                    ]),
                                    createVNode("p", { class: "mb-2 line-clamp-2 text-sm text-gray-600" }, toDisplayString(truncateSummary(write.meta_description || write.summary)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("div", { class: "flex flex-wrap items-center gap-3 text-xs text-gray-500" }, [
                                  createVNode("span", { class: "flex items-center gap-1" }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3 w-3",
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
                                    createTextVNode(" " + toDisplayString(formatDate(write.published_at || write.created_at)), 1)
                                  ]),
                                  write.reading_time ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "flex items-center gap-1"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3 w-3",
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
                                    createTextVNode(" " + toDisplayString(write.reading_time) + " dk okuma ", 1)
                                  ])) : createCommentVNode("", true),
                                  createVNode("span", { class: "badge badge-outline badge-xs" }, toDisplayString(getStatusText(write.status)), 1)
                                ])
                              ]),
                              unref(auth).user ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "ml-4 flex flex-col gap-1"
                              }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("writes.edit", write.id),
                                  class: "btn btn-ghost btn-xs",
                                  title: "Yazıyı Düzenle"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-3 w-3",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteWrite(write),
                                  class: "btn btn-ghost btn-xs text-error",
                                  title: "Yazıyı Sil"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-3 w-3",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                totalPages.value > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6 flex justify-center"
                }, [
                  createVNode("div", { class: "join" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(totalPages.value, (page) => {
                      return openBlock(), createBlock("button", {
                        key: page,
                        onClick: ($event) => currentPage.value = page,
                        class: ["btn btn-sm join-item", currentPage.value === page ? "btn-primary" : "btn-outline"]
                      }, toDisplayString(page), 11, ["onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                filteredWrites.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "alert alert-info mt-6"
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
                  createVNode("span", null, "Bu kategoriye ait " + toDisplayString(unref(auth).user ? "yazı" : "yayınlanmış yazı") + " bulunmamaktadır.", 1)
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d993781b"]]);
export {
  Screen as default
};
