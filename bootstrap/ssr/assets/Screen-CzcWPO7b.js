import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const project = computed(() => props.project || {});
    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      };
      return classes[status] || classes.pending;
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "Beklemede",
        active: "Aktif",
        completed: "Tamamlandı",
        cancelled: "İptal Edildi"
      };
      return labels[status] || "Bilinmiyor";
    };
    const getPaymentStatusClass = (status) => {
      const classes = {
        unpaid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        partial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      };
      return classes[status] || classes.unpaid;
    };
    const getPaymentStatusLabel = (status) => {
      const labels = {
        unpaid: "Ödenmedi",
        partial: "Kısmi Ödendi",
        paid: "Ödendi"
      };
      return labels[status] || "Bilinmiyor";
    };
    const formatPrice = (price) => {
      if (!price) return "0";
      return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const getServiceCompletionPercentage = (service) => {
      if (!service.todos || service.todos.length === 0) return 0;
      const completed = service.todos.filter((t) => t.is_completed).length;
      return Math.round(completed / service.todos.length * 100);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/projects" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Proje Detayı" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(project.value.project_name)}</h1></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/projects/${project.value.id}/edit`,
              class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
                } else {
                  return [
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Düzenle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6 border-t border-border pt-6"${_scopeId}><div${_scopeId}><h3 class="mb-4 text-sm font-semibold text-foreground"${_scopeId}>Kategori/Yazı Bağlantısı</h3>`);
            if (project.value.category) {
              _push2(`<div class="rounded-md border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"${_scopeId}></path></svg><span class="text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(project.value.category.name)}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/categories/${project.value.category.slug}`,
                class: "ml-auto text-xs text-primary hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Kategoriyi Görüntüle → `);
                  } else {
                    return [
                      createTextVNode(" Kategoriyi Görüntüle → ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>Bu projeye atanmış kategori bulunmamaktadır.</span></div>`);
            }
            _push2(`</div><div${_scopeId}><h3 class="mb-4 text-sm font-semibold text-foreground"${_scopeId}>Müşteri Bilgileri</h3>`);
            if (project.value.customer) {
              _push2(`<div class="rounded-md border border-border bg-muted/30 p-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Müşteri Adı</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.first_name)} ${ssrInterpolate(project.value.customer.last_name)}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>E-posta</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.email)}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Telefon</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.phone || "Telefon bilgisi yok")}</p></div></div></div>`);
            } else {
              _push2(`<div class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>Bu projeye atanmış müşteri bulunmamaktadır.</span></div>`);
            }
            _push2(`</div><div class="space-y-4 border-t border-border pt-6"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Servisler</h3>`);
            if (project.value.services && project.value.services.length) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(project.value.services, (service) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                _push2(`<div class="rounded-md border border-border bg-card p-4"${_scopeId}><div class="flex items-center justify-between gap-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(service.name)}</h4>`);
                if (service.description) {
                  _push2(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(service.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass([getStatusClass((_a = service.pivot) == null ? void 0 : _a.status), "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel((_b = service.pivot) == null ? void 0 : _b.status))}</span><span class="${ssrRenderClass([getPaymentStatusClass((_c = service.pivot) == null ? void 0 : _c.payment_status), "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getPaymentStatusLabel((_d = service.pivot) == null ? void 0 : _d.payment_status))}</span></div></div><div class="mt-4 space-y-3 border-t border-border pt-4"${_scopeId}><div class="grid grid-cols-2 gap-4 md:grid-cols-3"${_scopeId}>`);
                if ((_e = service.pivot) == null ? void 0 : _e.price) {
                  _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Fiyat</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatPrice(service.pivot.price))} ₺</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if ((_f = service.pivot) == null ? void 0 : _f.service_start_date) {
                  _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Başlangıç Tarihi</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatDate(service.pivot.service_start_date))}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if ((_g = service.pivot) == null ? void 0 : _g.service_end_date) {
                  _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Bitiş Tarihi</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatDate(service.pivot.service_end_date))}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if ((_h = service.pivot) == null ? void 0 : _h.notes) {
                  _push2(`<div class="rounded-md bg-muted/30 p-3"${_scopeId}><h5 class="mb-1 text-xs font-medium text-muted-foreground"${_scopeId}>Notlar</h5><p class="whitespace-pre-wrap text-sm text-foreground"${_scopeId}>${ssrInterpolate(service.pivot.notes)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="space-y-3 border-t border-border pt-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h5 class="text-xs font-medium text-foreground"${_scopeId}>TO-DO&#39;lar</h5><span class="text-xs font-semibold text-foreground"${_scopeId}> Tamamlanma: ${ssrInterpolate(getServiceCompletionPercentage(service))}% </span></div>`);
                if (service.todos && service.todos.length > 0) {
                  _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
                  ssrRenderList(service.todos, (todo) => {
                    _push2(`<div class="flex items-center gap-2 rounded-md border border-input bg-background p-2"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(todo.is_completed) ? " checked" : ""} disabled class="h-4 w-4 rounded border-input text-primary"${_scopeId}><span class="${ssrRenderClass([todo.is_completed ? "text-muted-foreground line-through" : "text-foreground", "flex-1 text-xs"])}"${_scopeId}>${ssrInterpolate(todo.title)}</span>`);
                    if (todo.completed_at) {
                      _push2(`<span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(formatDate(todo.completed_at))}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div class="flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg><span${_scopeId}>Henüz TO-DO eklenmemiş</span></div>`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Bu projeye atanmış servis bulunmamaktadır.</span></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/projects" }),
              createVNode(_sfc_main$3, { title: "Proje Detayı" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(project.value.project_name), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: `/projects/${project.value.id}/edit`,
                      class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    }, {
                      default: withCtx(() => [
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
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "space-y-6 border-t border-border pt-6" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "mb-4 text-sm font-semibold text-foreground" }, "Kategori/Yazı Bağlantısı"),
                      project.value.category ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "rounded-md border border-border bg-muted/30 p-4"
                      }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
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
                              d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            })
                          ])),
                          createVNode("span", { class: "text-sm font-medium text-foreground" }, toDisplayString(project.value.category.name), 1),
                          createVNode(unref(Link), {
                            href: `/categories/${project.value.category.slug}`,
                            class: "ml-auto text-xs text-primary hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kategoriyi Görüntüle → ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          })
                        ])),
                        createVNode("span", null, "Bu projeye atanmış kategori bulunmamaktadır.")
                      ]))
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "mb-4 text-sm font-semibold text-foreground" }, "Müşteri Bilgileri"),
                      project.value.customer ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "rounded-md border border-border bg-muted/30 p-4"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Müşteri Adı"),
                            createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.first_name) + " " + toDisplayString(project.value.customer.last_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "E-posta"),
                            createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.email), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Telefon"),
                            createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.phone || "Telefon bilgisi yok"), 1)
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          })
                        ])),
                        createVNode("span", null, "Bu projeye atanmış müşteri bulunmamaktadır.")
                      ]))
                    ]),
                    createVNode("div", { class: "space-y-4 border-t border-border pt-6" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Servisler"),
                      project.value.services && project.value.services.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(project.value.services, (service) => {
                          var _a, _b, _c, _d, _e, _f, _g, _h;
                          return openBlock(), createBlock("div", {
                            key: service.id,
                            class: "rounded-md border border-border bg-card p-4"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-4 w-4 text-primary",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                                    })
                                  ]))
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(service.name), 1),
                                  service.description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-1 text-xs text-muted-foreground"
                                  }, toDisplayString(service.description), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("span", {
                                  class: ["inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", getStatusClass((_a = service.pivot) == null ? void 0 : _a.status)]
                                }, toDisplayString(getStatusLabel((_b = service.pivot) == null ? void 0 : _b.status)), 3),
                                createVNode("span", {
                                  class: ["inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", getPaymentStatusClass((_c = service.pivot) == null ? void 0 : _c.payment_status)]
                                }, toDisplayString(getPaymentStatusLabel((_d = service.pivot) == null ? void 0 : _d.payment_status)), 3)
                              ])
                            ]),
                            createVNode("div", { class: "mt-4 space-y-3 border-t border-border pt-4" }, [
                              createVNode("div", { class: "grid grid-cols-2 gap-4 md:grid-cols-3" }, [
                                ((_e = service.pivot) == null ? void 0 : _e.price) ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Fiyat"),
                                  createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatPrice(service.pivot.price)) + " ₺", 1)
                                ])) : createCommentVNode("", true),
                                ((_f = service.pivot) == null ? void 0 : _f.service_start_date) ? (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Başlangıç Tarihi"),
                                  createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatDate(service.pivot.service_start_date)), 1)
                                ])) : createCommentVNode("", true),
                                ((_g = service.pivot) == null ? void 0 : _g.service_end_date) ? (openBlock(), createBlock("div", { key: 2 }, [
                                  createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Bitiş Tarihi"),
                                  createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatDate(service.pivot.service_end_date)), 1)
                                ])) : createCommentVNode("", true)
                              ]),
                              ((_h = service.pivot) == null ? void 0 : _h.notes) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "rounded-md bg-muted/30 p-3"
                              }, [
                                createVNode("h5", { class: "mb-1 text-xs font-medium text-muted-foreground" }, "Notlar"),
                                createVNode("p", { class: "whitespace-pre-wrap text-sm text-foreground" }, toDisplayString(service.pivot.notes), 1)
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "space-y-3 border-t border-border pt-4" }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("h5", { class: "text-xs font-medium text-foreground" }, "TO-DO'lar"),
                                  createVNode("span", { class: "text-xs font-semibold text-foreground" }, " Tamamlanma: " + toDisplayString(getServiceCompletionPercentage(service)) + "% ", 1)
                                ]),
                                service.todos && service.todos.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "space-y-2"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(service.todos, (todo) => {
                                    return openBlock(), createBlock("div", {
                                      key: todo.id,
                                      class: "flex items-center gap-2 rounded-md border border-input bg-background p-2"
                                    }, [
                                      createVNode("input", {
                                        type: "checkbox",
                                        checked: todo.is_completed,
                                        disabled: "",
                                        class: "h-4 w-4 rounded border-input text-primary"
                                      }, null, 8, ["checked"]),
                                      createVNode("span", {
                                        class: ["flex-1 text-xs", todo.is_completed ? "text-muted-foreground line-through" : "text-foreground"]
                                      }, toDisplayString(todo.title), 3),
                                      todo.completed_at ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-muted-foreground"
                                      }, toDisplayString(formatDate(todo.completed_at)), 1)) : createCommentVNode("", true)
                                    ]);
                                  }), 128))
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground"
                                }, [
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
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ])),
                                  createVNode("span", null, "Henüz TO-DO eklenmemiş")
                                ]))
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, "Bu projeye atanmış servis bulunmamaktadır.")
                      ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
