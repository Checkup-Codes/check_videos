import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const activeProjects = computed(() => props.projects.filter((p) => p.status === 1).length);
    const completedProjects = computed(() => props.projects.filter((p) => p.status === 2).length);
    const pendingProjects = computed(() => props.projects.filter((p) => p.status === 4).length);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
    };
    const getStatusText = (status) => {
      const statusMap = {
        1: "Devam Ediyor",
        2: "Tamamlandı",
        3: "İptal",
        4: "Beklemede"
      };
      return statusMap[status] || "Bilinmiyor";
    };
    const getStatusClass = (status) => {
      const statusClassMap = {
        1: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        2: "bg-green-500/10 text-green-600 dark:text-green-400",
        3: "bg-red-500/10 text-red-600 dark:text-red-400",
        4: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      };
      return statusClassMap[status] || "bg-muted text-muted-foreground";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-background"${_scopeId}><div class="mx-auto max-w-6xl px-4 py-6 sm:px-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-xl font-semibold text-foreground"${_scopeId}>Projeler</h1><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Tüm projelerinizi görüntüleyin ve yönetin</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/projects/create",
              class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Yeni Proje `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-3.5 w-3.5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Yeni Proje ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.projects.length > 0) {
              _push2(`<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"${_scopeId}><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Toplam</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(__props.projects.length)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10"${_scopeId}><svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Devam Eden</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(activeProjects.value)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10"${_scopeId}><svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Tamamlanan</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(completedProjects.value)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10"${_scopeId}><svg class="h-4 w-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Bekleyen</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(pendingProjects.value)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.projects.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"${_scopeId}><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted"${_scopeId}><svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><p class="mt-4 text-sm font-medium text-foreground"${_scopeId}>Henüz proje bulunmuyor</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>İlk projenizi oluşturmak için yukarıdaki butonu kullanın</p></div>`);
            } else {
              _push2(`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.projects, (project) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: project.id,
                  href: `/projects/${project.id}`,
                  class: "group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="mb-3 flex items-start justify-between gap-2"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><h3 class="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors"${_scopeId2}>${ssrInterpolate(project.project_name)}</h3>`);
                      if (project.description) {
                        _push3(`<p class="mt-1 text-xs text-muted-foreground line-clamp-2"${_scopeId2}>${ssrInterpolate(project.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><span class="${ssrRenderClass([getStatusClass(project.status), "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId2}>${ssrInterpolate(getStatusText(project.status))}</span></div>`);
                      if (project.customer) {
                        _push3(`<div class="mb-3 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5"${_scopeId2}><svg class="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId2}></path></svg><span class="text-xs text-foreground"${_scopeId2}>${ssrInterpolate(project.customer.first_name)} ${ssrInterpolate(project.customer.last_name)}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (project.services && project.services.length > 0) {
                        _push3(`<div class="mb-3"${_scopeId2}><div class="flex flex-wrap gap-1"${_scopeId2}><!--[-->`);
                        ssrRenderList(project.services.slice(0, 3), (service) => {
                          _push3(`<span class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"${_scopeId2}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId2}></path></svg> ${ssrInterpolate(service.name)}</span>`);
                        });
                        _push3(`<!--]-->`);
                        if (project.services.length > 3) {
                          _push3(`<span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"${_scopeId2}> +${ssrInterpolate(project.services.length - 3)}</span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"${_scopeId2}><div class="flex items-center gap-1"${_scopeId2}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(formatDate(project.created_at))}</span></div><div class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100"${_scopeId2}><span${_scopeId2}>Detaylar</span><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "mb-3 flex items-start justify-between gap-2" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", { class: "text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors" }, toDisplayString(project.project_name), 1),
                            project.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs text-muted-foreground line-clamp-2"
                            }, toDisplayString(project.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("span", {
                            class: ["shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", getStatusClass(project.status)]
                          }, toDisplayString(getStatusText(project.status)), 3)
                        ]),
                        project.customer ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-3.5 w-3.5 text-muted-foreground",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            })
                          ])),
                          createVNode("span", { class: "text-xs text-foreground" }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)
                        ])) : createCommentVNode("", true),
                        project.services && project.services.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-3"
                        }, [
                          createVNode("div", { class: "flex flex-wrap gap-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(project.services.slice(0, 3), (service) => {
                              return openBlock(), createBlock("span", {
                                key: service.id,
                                class: "inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(service.name), 1)
                              ]);
                            }), 128)),
                            project.services.length > 3 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            }, " +" + toDisplayString(project.services.length - 3), 1)) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground" }, [
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-3 w-3",
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
                            createVNode("span", null, toDisplayString(formatDate(project.created_at)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                            createVNode("span", null, "Detaylar"),
                            (openBlock(), createBlock("svg", {
                              class: "h-3 w-3",
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
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-background" }, [
                createVNode("div", { class: "mx-auto max-w-6xl px-4 py-6 sm:px-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-xl font-semibold text-foreground" }, "Projeler"),
                      createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Tüm projelerinizi görüntüleyin ve yönetin")
                    ]),
                    createVNode(unref(Link), {
                      href: "/projects/create",
                      class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-3.5 w-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Yeni Proje ")
                      ]),
                      _: 1
                    })
                  ]),
                  __props.projects.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
                  }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-primary",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Toplam"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(__props.projects.length), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-blue-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 10V3L4 14h7v7l9-11h-7z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Devam Eden"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(activeProjects.value), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-green-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Tamamlanan"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(completedProjects.value), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-yellow-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Bekleyen"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(pendingProjects.value), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  __props.projects.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"
                  }, [
                    createVNode("div", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-6 w-6 text-muted-foreground",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1.5",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "mt-4 text-sm font-medium text-foreground" }, "Henüz proje bulunmuyor"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "İlk projenizi oluşturmak için yukarıdaki butonu kullanın")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: project.id,
                        href: `/projects/${project.id}`,
                        class: "group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-3 flex items-start justify-between gap-2" }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("h3", { class: "text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors" }, toDisplayString(project.project_name), 1),
                              project.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-xs text-muted-foreground line-clamp-2"
                              }, toDisplayString(project.description), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("span", {
                              class: ["shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", getStatusClass(project.status)]
                            }, toDisplayString(getStatusText(project.status)), 3)
                          ]),
                          project.customer ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-3 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-3.5 w-3.5 text-muted-foreground",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              })
                            ])),
                            createVNode("span", { class: "text-xs text-foreground" }, toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)
                          ])) : createCommentVNode("", true),
                          project.services && project.services.length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mb-3"
                          }, [
                            createVNode("div", { class: "flex flex-wrap gap-1" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(project.services.slice(0, 3), (service) => {
                                return openBlock(), createBlock("span", {
                                  key: service.id,
                                  class: "inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-3 w-3",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                                    })
                                  ])),
                                  createTextVNode(" " + toDisplayString(service.name), 1)
                                ]);
                              }), 128)),
                              project.services.length > 3 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                              }, " +" + toDisplayString(project.services.length - 3), 1)) : createCommentVNode("", true)
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground" }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
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
                              createVNode("span", null, toDisplayString(formatDate(project.created_at)), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                              createVNode("span", null, "Detaylar"),
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
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
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
